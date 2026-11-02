/**
 * SMART AI - Adaptive Learning & Knowledge Tracing (BKT + KST) Scientific AI Engine
 * Mathematical Core:
 * - Bayesian Knowledge Tracing (Corbett & Anderson formulation)
 * - Knowledge Space Theory (Prerequisite DAG & Root-Cause Gap Tracing)
 * - Misconception Classification & Dynamic Learning Path Synthesis
 */

class SmartKnowledgeEngine {
  constructor(curriculumData) {
    this.curriculum = curriculumData;
    this.state = {}; // Track skill states: { [skillId]: { pL: number, history: [], gaps: [] } }
    this.initEngine();
  }

  /**
   * Initializes the BKT states for all nodes in the active curriculum
   */
  initEngine() {
    this.state = {};
    if (!this.curriculum || !this.curriculum.nodes) return;

    this.curriculum.nodes.forEach(node => {
      const bkt = node.bktDefaults || { L0: 0.2, T: 0.1, S: 0.1, G: 0.2 };
      this.state[node.id] = {
        id: node.id,
        name: node.name,
        category: node.category,
        pL: bkt.L0, // Initial belief of mastery
        params: { ...bkt },
        history: [], // [{ timestamp, isCorrect, chosenIdx }]
        status: 'unassessed' // 'mastered', 'proficient', 'gap_detected', 'critical_gap'
      };
    });
  }

  /**
   * Step update via Corbett & Anderson Bayesian Knowledge Tracing
   * @param {string} skillId 
   * @param {boolean} isCorrect 
   * @param {number} chosenOptionIdx 
   */
  updateMastery(skillId, isCorrect, chosenOptionIdx = null) {
    const skillState = this.state[skillId];
    if (!skillState) return null;

    const { pL, params } = skillState;
    const { T, S, G } = params;

    let pL_given_obs = 0;

    if (isCorrect) {
      // P(L_t | correct) = (P(L) * (1 - S)) / [ P(L)*(1 - S) + (1 - P(L))*G ]
      const numerator = pL * (1 - S);
      const denominator = (pL * (1 - S)) + ((1 - pL) * G);
      pL_given_obs = denominator > 0 ? (numerator / denominator) : pL;
    } else {
      // P(L_t | incorrect) = (P(L) * S) / [ P(L)*S + (1 - P(L))*(1 - G) ]
      const numerator = pL * S;
      const denominator = (pL * S) + ((1 - pL) * (1 - G));
      pL_given_obs = denominator > 0 ? (numerator / denominator) : pL;
    }

    // Skill Transition / Learning Opportunity: P(L_next) = P(L_given_obs) + (1 - P(L_given_obs)) * T
    const newPL = pL_given_obs + (1 - pL_given_obs) * T;
    // Bound within [0.01, 0.99]
    skillState.pL = Math.max(0.01, Math.min(0.99, newPL));

    // Update Status
    if (skillState.pL >= 0.85) {
      skillState.status = 'mastered';
    } else if (skillState.pL >= 0.65) {
      skillState.status = 'proficient';
    } else if (skillState.pL < 0.40) {
      skillState.status = 'critical_gap';
    } else {
      skillState.status = 'gap_detected';
    }

    // Record response
    const nodeDef = this.curriculum.nodes.find(n => n.id === skillId);
    let misconception = null;
    if (!isCorrect && chosenOptionIdx !== null && nodeDef && nodeDef.diagnosticQuestion) {
      misconception = nodeDef.diagnosticQuestion.misconceptions?.[chosenOptionIdx] || null;
    }

    skillState.history.push({
      timestamp: Date.now(),
      isCorrect,
      chosenIdx: chosenOptionIdx,
      resultingPL: skillState.pL,
      misconception
    });

    // Prerequisite feedback: propagate back
    if (!isCorrect) {
      this.propagatePrerequisiteDecay(skillId);
    }

    return {
      skillId,
      pL: skillState.pL,
      status: skillState.status,
      misconception
    };
  }

  /**
   * If student fails a concept, reduce prior probability of its immediate unverified prerequisites
   */
  propagatePrerequisiteDecay(skillId) {
    const nodeDef = this.curriculum.nodes.find(n => n.id === skillId);
    if (!nodeDef || !nodeDef.prerequisites) return;

    nodeDef.prerequisites.forEach(preId => {
      const preState = this.state[preId];
      if (preState && preState.status !== 'mastered') {
        // Light backward decay: indicates potential hidden deficiency
        preState.pL = Math.max(0.05, preState.pL * 0.88);
        if (preState.pL < 0.45) preState.status = 'critical_gap';
      }
    });
  }

  /**
   * Identifies Knowledge Gaps and identifies Root Causes in the DAG
   */
  diagnoseKnowledgeGaps() {
    const gaps = [];
    const nodeMap = new Map(this.curriculum.nodes.map(n => [n.id, n]));

    for (const skillId in this.state) {
      const state = this.state[skillId];
      const nodeDef = nodeMap.get(skillId);
      if (!nodeDef) continue;

      if (state.pL < 0.70) {
        // Trace upstream to find if any prerequisite is also failing
        const brokenPrerequisites = (nodeDef.prerequisites || []).filter(preId => {
          const preState = this.state[preId];
          return preState && preState.pL < 0.70;
        });

        const isRootGap = brokenPrerequisites.length === 0 && (nodeDef.prerequisites || []).length > 0;
        const lastAttempt = state.history[state.history.length - 1];

        gaps.push({
          skillId,
          skillName: nodeDef.name,
          category: nodeDef.category,
          masteryScore: Math.round(state.pL * 100),
          severity: state.pL < 0.40 ? 'CRITICAL' : 'MODERATE',
          isRootCause: brokenPrerequisites.length > 0 ? false : true,
          brokenPrerequisites: brokenPrerequisites.map(id => nodeMap.get(id)?.name || id),
          detectedMisconception: lastAttempt?.misconception || 'Chưa củng cố kỹ năng giải toán & suy luận cốt lõi',
          recommendation: this.getRemediationHint(nodeDef, lastAttempt?.misconception)
        });
      }
    }

    // Sort: Critical root causes first
    gaps.sort((a, b) => {
      if (a.isRootCause && !b.isRootCause) return -1;
      if (!a.isRootCause && b.isRootCause) return 1;
      return a.masteryScore - b.masteryScore;
    });

    return gaps;
  }

  getRemediationHint(nodeDef, misconception) {
    if (misconception) {
      return `Chấn chỉnh lỗ hổng: "${misconception}". Xem lại lý thuyết "${nodeDef.name}".`;
    }
    return `Ôn tập nền tảng "${nodeDef.name}" trước khi thực hiện các bài toán nâng cao kế tiếp.`;
  }

  /**
   * Synthesizes an individualized adaptive learning sequence based on topological sort
   */
  generateAdaptiveRoadmap() {
    const gaps = this.diagnoseKnowledgeGaps();
    const roadmapSteps = [];
    const visited = new Set();
    const nodeMap = new Map(this.curriculum.nodes.map(n => [n.id, n]));

    // Topological sort resolver respecting prerequisite chain
    const scheduleNode = (nodeId) => {
      if (visited.has(nodeId)) return;
      const node = nodeMap.get(nodeId);
      if (!node) return;

      // Ensure all prerequisites are scheduled first
      (node.prerequisites || []).forEach(preId => scheduleNode(preId));

      visited.add(nodeId);
      const state = this.state[nodeId];
      const mastery = Math.round((state?.pL || 0.2) * 100);

      let stepType = 'REVIEW';
      let priority = 'NORMAL';
      if (mastery < 40) {
        stepType = 'INTENSIVE_REMEDIAL';
        priority = 'URGENT';
      } else if (mastery < 70) {
        stepType = 'PRACTICE_TARGETED';
        priority = 'HIGH';
      } else {
        stepType = 'ADVANCED_CHALLENGE';
        priority = 'LOW';
      }

      roadmapSteps.push({
        stepOrder: roadmapSteps.length + 1,
        skillId: node.id,
        skillName: node.name,
        category: node.category,
        currentMastery: mastery,
        stepType,
        priority,
        estimatedMinutes: mastery < 50 ? 25 : 15,
        actionTitle: stepType === 'INTENSIVE_REMEDIAL' 
          ? `Lấp lỗ hổng gốc: ${node.name}` 
          : (stepType === 'PRACTICE_TARGETED' ? `Rèn luyện thích nghi: ${node.name}` : `Đạt cảnh giới tinh thông: ${node.name}`)
      });
    };

    // Schedule all nodes
    this.curriculum.nodes.forEach(node => scheduleNode(node.id));

    return {
      roadmap: roadmapSteps,
      criticalGapsCount: gaps.filter(g => g.severity === 'CRITICAL').length,
      estimatedTotalStudyHours: Math.ceil(roadmapSteps.reduce((acc, s) => acc + s.estimatedMinutes, 0) / 60),
      overallMastery: Math.round(
        Object.values(this.state).reduce((sum, s) => sum + s.pL, 0) / Math.max(1, Object.keys(this.state).length) * 100
      )
    };
  }

  /**
   * Generates radar chart series format
   */
  getRadarMetrics() {
    return this.curriculum.nodes.map(n => {
      const state = this.state[n.id];
      return {
        label: n.name.length > 22 ? n.name.slice(0, 20) + '…' : n.name,
        fullName: n.name,
        category: n.category,
        mastery: Math.round((state?.pL || 0.2) * 100)
      };
    });
  }
}

window.SmartKnowledgeEngine = SmartKnowledgeEngine;
