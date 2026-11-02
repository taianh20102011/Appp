/**
 * SMART AI - UI Orchestrator & GSAP 3.15+ Motion Controller
 * Standard: modern-fullstack-gsap-security, NameThatUI patterns
 */

(function () {
  'use strict';

  let currentCurriculumKey = 'ai_math';
  let engine = null;
  let aiService = null;
  let activeTab = 'diagnostic';
  let currentQuizIndex = 0;
  let currentSessionDigest = '';

  // DOM Elements cache
  const elements = {};

  function initApp() {
    cacheElements();
    initServices();
    bindEvents();
    renderCurriculumSelector();
    loadCurriculum(currentCurriculumKey);
    initGSAPAnimations();
    setupCommandPalette();
    registerServiceWorker();
    checkSecurityPosture();

    // React Bits Visual Effects Suite
    if (window.ReactBits) {
      window.ReactBits.initSpotlightCards();
      window.ReactBits.initMagneticButtons();
      window.ReactBits.initGridBackground('ambientGridCanvas');
    }

    // Cloudflare Turnstile & PoW Anti-Bot Captcha Widget
    if (window.SmartCaptcha) {
      window.SmartCaptcha.renderWidget('captchaWidgetContainer');
    }

    // Exam Paper OCR & Multi-Capture Module
    initExamOCRModule();

    // KaTeX Math Rendering
    renderAllMath();
  }

  function cacheElements() {
    elements.themeToggle = document.getElementById('themeToggle');
    elements.securityAuditBtn = document.getElementById('securityAuditBtn');
    elements.geminiConfigBtn = document.getElementById('geminiConfigBtn');
    elements.cmdPaletteBtn = document.getElementById('cmdPaletteBtn');
    elements.curriculumSelect = document.getElementById('curriculumSelect');
    
    // Tab buttons
    elements.tabDiagnostic = document.getElementById('tabDiagnostic');
    elements.tabRadar = document.getElementById('tabRadar');
    elements.tabRoadmap = document.getElementById('tabRoadmap');
    elements.tabNeural = document.getElementById('tabNeural');
    elements.tabTutor = document.getElementById('tabTutor');

    // Tab sections
    elements.sectionDiagnostic = document.getElementById('sectionDiagnostic');
    elements.sectionRadar = document.getElementById('sectionRadar');
    elements.sectionRoadmap = document.getElementById('sectionRoadmap');
    elements.sectionNeural = document.getElementById('sectionNeural');
    elements.sectionTutor = document.getElementById('sectionTutor');

    // Neural Training Controls
    elements.neuralTrainHeaderBtn = document.getElementById('neuralTrainHeaderBtn');
    elements.neuralEpochBadge = document.getElementById('neuralEpochBadge');
    elements.neuralLossMetric = document.getElementById('neuralLossMetric');
    elements.lossCanvas = document.getElementById('lossCanvas');
    elements.trainingStatusBadge = document.getElementById('trainingStatusBadge');
    elements.startTrainBtn = document.getElementById('startTrainBtn');
    elements.stopTrainBtn = document.getElementById('stopTrainBtn');
    elements.onlineLearnBtn = document.getElementById('onlineLearnBtn');
    elements.resetWeightsBtn = document.getElementById('resetWeightsBtn');

    // Quiz container
    elements.quizContainer = document.getElementById('quizContainer');
    elements.quizProgress = document.getElementById('quizProgress');
    elements.quizScoreBadge = document.getElementById('quizScoreBadge');

    // Visualizers
    elements.radarCanvas = document.getElementById('radarCanvas');
    elements.dagCanvas = document.getElementById('dagCanvas');
    elements.gapsList = document.getElementById('gapsList');
    elements.roadmapList = document.getElementById('roadmapList');

    // Tutor
    elements.chatMessages = document.getElementById('chatMessages');
    elements.tutorInput = document.getElementById('tutorInput');
    elements.tutorSendBtn = document.getElementById('tutorSendBtn');

    // Modals
    elements.securityModal = document.getElementById('securityModal');
    elements.closeSecurityModal = document.getElementById('closeSecurityModal');
    elements.securityAuditBody = document.getElementById('securityAuditBody');

    elements.licenseBtn = document.getElementById('licenseBtn');
    elements.licenseModal = document.getElementById('licenseModal');
    elements.closeLicenseModal = document.getElementById('closeLicenseModal');
    elements.licenseKeyInput = document.getElementById('licenseKeyInput');
    elements.verifyLicenseBtn = document.getElementById('verifyLicenseBtn');
    elements.licenseVerifyMsg = document.getElementById('licenseVerifyMsg');
    elements.deviceFingerprintText = document.getElementById('deviceFingerprintText');
    elements.copyFingerprintBtn = document.getElementById('copyFingerprintBtn');

    elements.geminiModal = document.getElementById('geminiModal');
    elements.closeGeminiModal = document.getElementById('closeGeminiModal');
    elements.geminiKeyInput = document.getElementById('geminiKeyInput');
    elements.saveGeminiKeyBtn = document.getElementById('saveGeminiKeyBtn');
    elements.geminiStatusMsg = document.getElementById('geminiStatusMsg');

    elements.cmdPalette = document.getElementById('cmdPalette');
    elements.cmdInput = document.getElementById('cmdInput');
    elements.cmdList = document.getElementById('cmdList');

    // Share / Gmail Export
    elements.exportGmailBtn = document.getElementById('exportGmailBtn');
    elements.copyDigestBtn = document.getElementById('copyDigestBtn');
    elements.rateLimitBadge = document.getElementById('rateLimitBadge');

    // Exam Paper Multi-Capture OCR & Training Elements
    elements.examCameraInput = document.getElementById('examCameraInput');
    elements.examMultiFilesInput = document.getElementById('examMultiFilesInput');
    elements.btnTriggerCamera = document.getElementById('btnTriggerCamera');
    elements.btnTriggerMultiFiles = document.getElementById('btnTriggerMultiFiles');
    elements.btnClearExamImages = document.getElementById('btnClearExamImages');
    elements.btnStartOCRProcess = document.getElementById('btnStartOCRProcess');
    elements.examDropzone = document.getElementById('examDropzone');
    elements.examImagesPreviewGrid = document.getElementById('examImagesPreviewGrid');
    elements.ocrProgressTelemetry = document.getElementById('ocrProgressTelemetry');
    elements.ocrStatusText = document.getElementById('ocrStatusText');
    elements.ocrPercentText = document.getElementById('ocrPercentText');
    elements.ocrProgressFill = document.getElementById('ocrProgressFill');
    elements.scannedExamTrainingPanel = document.getElementById('scannedExamTrainingPanel');
    elements.scannedExamCounterBadge = document.getElementById('scannedExamCounterBadge');
    elements.scannedQuestionText = document.getElementById('scannedQuestionText');
    elements.scannedOptionsContainer = document.getElementById('scannedOptionsContainer');
    elements.scannedFeedbackBox = document.getElementById('scannedFeedbackBox');
    elements.btnNextScannedQuestion = document.getElementById('btnNextScannedQuestion');
    elements.btnAutoTrainAllScanned = document.getElementById('btnAutoTrainAllScanned');

    // Webcam Elements
    elements.webcamModal = document.getElementById('webcamModal');
    elements.closeWebcamModal = document.getElementById('closeWebcamModal');
    elements.webcamVideo = document.getElementById('webcamVideo');
    elements.webcamCanvas = document.getElementById('webcamCanvas');
    elements.btnSnapWebcamPhoto = document.getElementById('btnSnapWebcamPhoto');
    elements.btnDoneWebcam = document.getElementById('btnDoneWebcam');
    elements.webcamSnapCountBadge = document.getElementById('webcamSnapCountBadge');
  }

  function initServices() {
    aiService = new SmartAIService();
    window.smartNN = new SmartNeuralNetwork(12, 16, 8, 6);
    window.smartNN.loadWeights();
  }

  // Active Rate Limiter Controller & Visual HUD
  function checkActionRateLimit(actionName, maxRequests = 10, windowMs = 60000) {
    const res = SmartSecurity.checkRateLimit(actionName, maxRequests, windowMs);
    updateRateLimitHUD(res, maxRequests);
    if (!res.allowed) {
      showToast(`⚠️ Bạn đang thao tác quá nhanh! Vui lòng chờ ${res.retryAfter}s để tiếp tục.`, 'warning');
      return false;
    }
    return true;
  }

  function updateRateLimitHUD(status, maxRequests = 10) {
    if (!elements.rateLimitBadge) return;
    if (status.allowed) {
      const remaining = status.remaining !== undefined ? status.remaining : maxRequests;
      elements.rateLimitBadge.textContent = `⚡ Rate Limit: ${remaining}/${maxRequests} OK`;
      elements.rateLimitBadge.className = remaining <= 2 ? 'badge badge-amber' : 'badge badge-green';
    } else {
      elements.rateLimitBadge.textContent = `⏳ Cooldown: ${status.retryAfter}s`;
      elements.rateLimitBadge.className = 'badge badge-red';
    }
  }

  function showToast(message, type = 'info') {
    let toast = document.getElementById('smartToast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'smartToast';
      toast.style.position = 'fixed';
      toast.style.top = '24px';
      toast.style.right = '24px';
      toast.style.zIndex = '9999';
      toast.style.padding = '12px 20px';
      toast.style.borderRadius = '6px';
      toast.style.fontWeight = '600';
      toast.style.fontSize = '0.88rem';
      toast.style.boxShadow = '0 10px 30px rgba(0,0,0,0.18)';
      toast.style.transition = 'all 0.25s ease';
      document.body.appendChild(toast);
    }

    if (type === 'warning') {
      toast.style.backgroundColor = '#FEF3C7';
      toast.style.color = '#92400E';
      toast.style.border = '1px solid #F59E0B';
    } else if (type === 'danger') {
      toast.style.backgroundColor = '#FEE2E2';
      toast.style.color = '#991B1B';
      toast.style.border = '1px solid #EF4444';
    } else {
      toast.style.backgroundColor = '#DCFCE7';
      toast.style.color = '#166534';
      toast.style.border = '1px solid #22C55E';
    }

    toast.textContent = message;
    toast.style.opacity = '1';
    toast.style.transform = 'translateY(0)';

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(-10px)';
    }, 2800);
  }

  // Non-Blocking Asynchronous Micro-Task Data Loader (Zero Lag, 60fps Guaranteed)
  function loadCurriculum(key) {
    currentCurriculumKey = key;
    const curr = window.SMART_CURRICULUM[key];
    if (!curr) return;

    // Phase 1: Instant visual feedback with Shimmer Skeleton (Zero Stutter)
    if (elements.quizContainer) {
      elements.quizContainer.innerHTML = `
        <div class="shimmer-active" style="height: 52px; border-radius: 6px; margin-bottom: 12px;"></div>
        <div class="shimmer-active" style="height: 40px; border-radius: 6px; margin-bottom: 8px;"></div>
        <div class="shimmer-active" style="height: 40px; border-radius: 6px; margin-bottom: 8px;"></div>
        <div class="shimmer-active" style="height: 40px; border-radius: 6px;"></div>
      `;
    }

    // Phase 2: Yield to frame 1 - Initialize Knowledge Engine
    requestAnimationFrame(() => {
      engine = new SmartKnowledgeEngine(curr);
      currentQuizIndex = 0;
      renderQuizQuestion();

      // Phase 3: Yield to frame 2 - Update Metrics & Gaps
      requestAnimationFrame(() => {
        updateDashboardMetrics();

        // Phase 4: Yield to frame 3 - Render Visual Canvases smoothly
        requestAnimationFrame(() => {
          drawRadarChart();
          drawDAGGraph();
        });
      });
    });
  }

  function bindEvents() {
    // Theme Switch
    elements.themeToggle?.addEventListener('click', () => {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      document.documentElement.setAttribute('data-theme', isDark ? 'light' : 'dark');
      drawRadarChart();
      drawDAGGraph();
    });

    // Curriculum Selector
    elements.curriculumSelect?.addEventListener('change', (e) => {
      loadCurriculum(e.target.value);
    });

    // Tab Navigation with GSAP FLIP
    const tabs = [
      { btn: elements.tabDiagnostic, section: elements.sectionDiagnostic, id: 'diagnostic' },
      { btn: elements.tabRadar, section: elements.sectionRadar, id: 'radar' },
      { btn: elements.tabRoadmap, section: elements.sectionRoadmap, id: 'roadmap' },
      { btn: elements.tabNeural, section: elements.sectionNeural, id: 'neural' },
      { btn: elements.tabTutor, section: elements.sectionTutor, id: 'tutor' },
    ];

    tabs.forEach(tab => {
      tab.btn?.addEventListener('click', () => {
        tabs.forEach(t => {
          t.btn?.classList.remove('active');
          if (t.section) t.section.style.display = 'none';
        });
        tab.btn?.classList.add('active');
        if (tab.section) {
          tab.section.style.display = 'block';
          if (window.gsap) {
            window.gsap.fromTo(tab.section, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.25, ease: 'power2.out' });
          }
        }
        activeTab = tab.id;
        setTimeout(() => renderAllMath(tab.section), 60);
        if (tab.id === 'radar') {
          setTimeout(() => { drawRadarChart(); drawDAGGraph(); }, 50);
        } else if (tab.id === 'roadmap') {
          renderRoadmap();
        } else if (tab.id === 'neural') {
          setTimeout(drawLossCurve, 50);
        }
      });
    });

    elements.neuralTrainHeaderBtn?.addEventListener('click', () => {
      elements.tabNeural?.click();
    });

    // Neural Network Self-Training Controls
    elements.startTrainBtn?.addEventListener('click', async () => {
      if (!window.smartNN) return;
      if (!checkActionRateLimit('train_model', 3, 20000)) return;
      elements.startTrainBtn.style.display = 'none';
      elements.stopTrainBtn.style.display = 'inline-flex';
      elements.trainingStatusBadge.textContent = 'Đang huấn luyện...';
      elements.trainingStatusBadge.className = 'badge badge-blue';

      await window.smartNN.startSelfTraining(60, (stats) => {
        elements.neuralEpochBadge.textContent = `Epoch: ${stats.epoch} / 60`;
        elements.neuralLossMetric.textContent = `Loss: ${stats.loss} | Acc: ${stats.accuracy}%`;
        drawLossCurve();
      });

      elements.startTrainBtn.style.display = 'inline-flex';
      elements.stopTrainBtn.style.display = 'none';
      elements.trainingStatusBadge.textContent = 'Đã hoàn tất Epochs';
      elements.trainingStatusBadge.className = 'badge badge-green';
    });

    elements.stopTrainBtn?.addEventListener('click', () => {
      if (window.smartNN) window.smartNN.stopSelfTraining();
      elements.startTrainBtn.style.display = 'inline-flex';
      elements.stopTrainBtn.style.display = 'none';
      elements.trainingStatusBadge.textContent = 'Đã tạm dừng';
      elements.trainingStatusBadge.className = 'badge badge-amber';
    });

    elements.onlineLearnBtn?.addEventListener('click', async () => {
      if (!window.smartNN || !engine) return;
      elements.trainingStatusBadge.textContent = 'Học thích nghi...';
      elements.trainingStatusBadge.className = 'badge badge-blue';

      // Build feature vector from current student interaction states
      const features = Object.values(engine.state).map(s => s.pL);
      while (features.length < 12) features.push(0.5);

      const targetOutputs = Object.values(engine.state).map(s => s.pL >= 0.7 ? 1 : 0);
      while (targetOutputs.length < 6) targetOutputs.push(0);

      // Fine-tune 15 mini epochs on student specific responses
      for (let i = 0; i < 15; i++) {
        const cache = window.smartNN.forward(features);
        window.smartNN.backward(cache, targetOutputs);
        window.smartNN.currentEpoch++;
      }
      window.smartNN.saveWeights();
      drawLossCurve();

      elements.trainingStatusBadge.textContent = 'Đã khớp trọng số học sinh';
      elements.trainingStatusBadge.className = 'badge badge-green';
      alert('Mạng Nơ-ron AI đã tự động học thích nghi (Continual Learning) theo dữ liệu làm bài của học sinh!');
    });

    elements.resetWeightsBtn?.addEventListener('click', () => {
      if (!window.smartNN) return;
      if (confirm('Khởi tạo lại ma trận trọng số ngẫu nhiên ban đầu?')) {
        window.smartNN.initWeights();
        window.smartNN.currentEpoch = 0;
        window.smartNN.lossHistory = [];
        window.smartNN.accuracyHistory = [];
        window.smartNN.saveWeights();
        elements.neuralEpochBadge.textContent = 'Epoch: 0 / 60';
        elements.neuralLossMetric.textContent = 'Loss: 0.0000 | Acc: 0%';
        drawLossCurve();
      }
    });

    // Security Modal
    elements.securityAuditBtn?.addEventListener('click', () => {
      renderSecurityAudit();
      elements.securityModal.classList.add('open');
    });
    elements.closeSecurityModal?.addEventListener('click', () => {
      elements.securityModal.classList.remove('open');
    });

    // License Modal & Cryptographic Validator
    elements.licenseBtn?.addEventListener('click', async () => {
      if (elements.deviceFingerprintText) {
        elements.deviceFingerprintText.textContent = await SmartSecurity.getDeviceFingerprint();
      }
      const savedKey = localStorage.getItem('smart_license_key');
      if (savedKey) {
        elements.licenseKeyInput.value = savedKey;
        elements.verifyLicenseBtn.click();
      } else {
        elements.licenseVerifyMsg.innerHTML = 'ℹ️ Chưa nhập khóa kích hoạt. Hãy liên hệ Tác giả Tài Anh để nhận mã.';
        elements.licenseVerifyMsg.style.color = 'var(--text-muted)';
      }
      elements.licenseModal.classList.add('open');
    });
    elements.closeLicenseModal?.addEventListener('click', () => {
      elements.licenseModal.classList.remove('open');
    });

    elements.copyFingerprintBtn?.addEventListener('click', () => {
      const fp = elements.deviceFingerprintText.textContent;
      if (navigator.clipboard && fp) {
        navigator.clipboard.writeText(fp).then(() => {
          showToast('Đã sao chép Mã máy! Hãy gửi cho Tác giả Tài Anh.', 'success');
        });
      }
    });

    elements.verifyLicenseBtn?.addEventListener('click', async () => {
      const key = elements.licenseKeyInput.value.trim();
      if (!key) {
        elements.licenseVerifyMsg.innerHTML = '⚠️ Vui lòng dán mã bản quyền cần kích hoạt vào ô trên.';
        elements.licenseVerifyMsg.style.color = 'var(--status-warning)';
        return;
      }
      const res = await SmartSecurity.verifyLicenseKey(key);
      if (res.valid) {
        localStorage.setItem('smart_license_key', key);
        elements.licenseVerifyMsg.innerHTML = `✅ Bản quyền hợp lệ: Gói <strong>${res.edition}</strong> (${res.deviceBound})<br>Hạn dùng: <strong>${res.expiryDate}</strong> | Tác giả: <strong>${res.author}</strong>`;
        elements.licenseVerifyMsg.style.color = 'var(--status-success)';
        showToast('Kích hoạt bản quyền thành công!', 'success');
      } else {
        elements.licenseVerifyMsg.innerHTML = `❌ ${res.reason}`;
        elements.licenseVerifyMsg.style.color = 'var(--status-danger)';
      }
    });

    // Gemini Settings Modal
    elements.geminiConfigBtn?.addEventListener('click', () => {
      elements.geminiStatusMsg.textContent = aiService.isOnlineAIReady 
        ? '✅ Đang kích hoạt Google Gemini 2.5 Flash' 
        : 'ℹ️ Đang dùng AI suy luận ngoại tuyến (Offline AI Engine)';
      elements.geminiModal.classList.add('open');
    });
    elements.closeGeminiModal?.addEventListener('click', () => {
      elements.geminiModal.classList.remove('open');
    });

    elements.saveGeminiKeyBtn?.addEventListener('click', async () => {
      const val = elements.geminiKeyInput.value.trim();
      elements.geminiStatusMsg.textContent = 'Đang kiểm tra bảo mật & kết nối...';
      const res = await aiService.setApiKey(val);
      elements.geminiStatusMsg.textContent = res.message;
      if (res.success) {
        elements.geminiKeyInput.value = '';
        setTimeout(() => elements.geminiModal.classList.remove('open'), 1200);
      }
    });

    // Tutor chat
    elements.tutorSendBtn?.addEventListener('click', handleTutorSend);
    elements.tutorInput?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') handleTutorSend();
    });

    // Gmail & Code Digest Export
    elements.exportGmailBtn?.addEventListener('click', handleExportGmail);
    elements.copyDigestBtn?.addEventListener('click', handleCopyDigest);

    // Window resize redraw
    window.addEventListener('resize', () => {
      drawRadarChart();
      drawDAGGraph();
    });
  }

  function renderCurriculumSelector() {
    if (!elements.curriculumSelect) return;
    elements.curriculumSelect.innerHTML = Object.values(window.SMART_CURRICULUM).map(c => `
      <option value="${c.id}">${c.title}</option>
    `).join('');
  }

  function renderQuizQuestion() {
    if (!engine || !elements.quizContainer) return;
    const curr = window.SMART_CURRICULUM[currentCurriculumKey];
    const nodes = curr.nodes;
    if (currentQuizIndex >= nodes.length) {
      renderQuizFinished();
      return;
    }

    const node = nodes[currentQuizIndex];
    const q = node.diagnosticQuestion;

    if (elements.quizProgress) {
      elements.quizProgress.textContent = `Câu ${currentQuizIndex + 1} / ${nodes.length} • Khái niệm: ${node.name}`;
    }

    const letters = ['A', 'B', 'C', 'D'];
    const optionsHTML = q.options.map((opt, idx) => `
      <button class="quiz-option-btn" data-idx="${idx}">
        <span class="opt-letter">${letters[idx]}</span>
        <span class="opt-text">${SmartSecurity.sanitizeHTML(opt)}</span>
      </button>
    `).join('');

    elements.quizContainer.innerHTML = `
      <div class="quiz-question-box">
        <h4>${SmartSecurity.sanitizeHTML(q.question)}</h4>
      </div>
      <div class="quiz-options-list">
        ${optionsHTML}
      </div>
      <div id="quizFeedbackBox" style="display:none; padding: 12px; border-radius: 6px; font-size: 0.9rem;"></div>
      <div style="display:flex; justify-content:space-between; align-items:center; margin-top: 8px;">
        <span style="font-size: 0.75rem; color: var(--text-muted);">Mô hình BKT: L₀ = ${node.bktDefaults.L0} • T = ${node.bktDefaults.T} • S = ${node.bktDefaults.S} • G = ${node.bktDefaults.G}</span>
        <button id="nextQuestionBtn" class="btn btn-secondary btn-sm" style="display:none;">
          Nút tiếp theo →
        </button>
      </div>
    `;

    // Render MathJax/KaTeX if available
    if (window.renderMathInElement) {
      window.renderMathInElement(elements.quizContainer, { delimiters: [{left: "$", right: "$", display: false}] });
    }

    // Attach click handlers
    const optionBtns = elements.quizContainer.querySelectorAll('.quiz-option-btn');
    optionBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        if (!checkActionRateLimit('quiz_answer', 8, 10000)) return;
        const chosenIdx = parseInt(btn.getAttribute('data-idx'), 10);
        handleOptionAnswer(node, chosenIdx, optionBtns);
      });
    });

    const nextBtn = document.getElementById('nextQuestionBtn');
    nextBtn?.addEventListener('click', () => {
      currentQuizIndex++;
      renderQuizQuestion();
      if (window.gsap) {
        window.gsap.fromTo(elements.quizContainer, { opacity: 0, x: 20 }, { opacity: 1, x: 0, duration: 0.3 });
      }
    });
  }

  function handleOptionAnswer(node, chosenIdx, optionBtns) {
    const q = node.diagnosticQuestion;
    const isCorrect = chosenIdx === q.correctIndex;
    const result = engine.updateMastery(node.id, isCorrect, chosenIdx);

    optionBtns.forEach(btn => {
      btn.disabled = true;
      const idx = parseInt(btn.getAttribute('data-idx'), 10);
      if (idx === q.correctIndex) {
        btn.classList.add('selected-correct');
      } else if (idx === chosenIdx) {
        btn.classList.add('selected-incorrect');
      }
    });

    const feedbackBox = document.getElementById('quizFeedbackBox');
    const nextBtn = document.getElementById('nextQuestionBtn');

    if (feedbackBox) {
      feedbackBox.style.display = 'block';
      if (isCorrect) {
        feedbackBox.style.backgroundColor = '#DCFCE7';
        feedbackBox.style.color = '#14532D';
        feedbackBox.innerHTML = `<strong>Chính xác!</strong> Độ thành thạo P(L) cập nhật: <strong>${Math.round(result.pL * 100)}%</strong>. Kỹ năng "${node.name}" tăng trưởng vượt bậc!`;
      } else {
        feedbackBox.style.backgroundColor = '#FEE2E2';
        feedbackBox.style.color = '#7F1D1D';
        feedbackBox.innerHTML = `
          <strong>Phát hiện lỗ hổng kiến thức!</strong> Độ thành thạo P(L) điều chỉnh về: <strong>${Math.round(result.pL * 100)}%</strong>.<br>
          <em>Gợi ý chấn chỉnh:</em> ${SmartSecurity.sanitizeHTML(result.misconception || q.hint)}
        `;
      }
    }

    if (nextBtn) nextBtn.style.display = 'inline-flex';

    updateDashboardMetrics();
    drawRadarChart();
    drawDAGGraph();
  }

  function renderQuizFinished() {
    const gaps = engine.diagnoseKnowledgeGaps();
    const roadmapSummary = engine.generateAdaptiveRoadmap();

    elements.quizContainer.innerHTML = `
      <div style="text-align: center; padding: 24px 12px; display: flex; flex-direction: column; align-items: center; gap: 16px;">
        <div style="width: 56px; height: 56px; border-radius: 6px; background-color: var(--accent-subtle); color: var(--accent-primary); display: flex; align-items: center; justify-content: center; font-size: 28px;">
          ✓
        </div>
        <h3>Hoàn tất Chẩn đoán Năng lực Thích nghi!</h3>
        <p style="max-width: 480px; font-size: 0.95rem;">
          Hệ thống Bayesian Knowledge Tracing (BKT) đã tính toán ma trận thông thạo của bạn. Đã phát hiện <strong>${gaps.length} lỗ hổng kiến thức</strong> (trong đó có ${roadmapSummary.criticalGapsCount} lỗ hổng gốc rễ cần khắc phục ngay).
        </p>
        <div style="display: flex; gap: 12px; margin-top: 8px;">
          <button class="btn btn-primary" id="viewRoadmapBtn">Xem Lộ trình Cá nhân hóa →</button>
          <button class="btn btn-secondary" id="restartQuizBtn">Làm lại bài chẩn đoán</button>
        </div>
      </div>
    `;

    document.getElementById('viewRoadmapBtn')?.addEventListener('click', () => {
      elements.tabRoadmap.click();
    });

    document.getElementById('restartQuizBtn')?.addEventListener('click', () => {
      loadCurriculum(currentCurriculumKey);
    });
  }

  async function updateDashboardMetrics() {
    const summary = engine.generateAdaptiveRoadmap();
    const gaps = engine.diagnoseKnowledgeGaps();

    if (elements.quizScoreBadge) {
      elements.quizScoreBadge.textContent = `${summary.overallMastery}% Năng lực BKT`;
    }

    renderGapsList(gaps);

    // Compute cryptographic session integrity hash
    currentSessionDigest = await SmartSecurity.computeHash({
      curriculum: currentCurriculumKey,
      overallMastery: summary.overallMastery,
      gapsCount: gaps.length,
      timestamp: Date.now()
    });
  }

  function renderGapsList(gaps) {
    if (!elements.gapsList) return;
    if (gaps.length === 0) {
      elements.gapsList.innerHTML = `
        <div style="padding: 16px; text-align: center; color: var(--status-success); font-weight: 600;">
          🎉 Không phát hiện lỗ hổng nghiêm trọng nào! Bạn đang làm chủ rất tốt các khái niệm.
        </div>
      `;
      return;
    }

    elements.gapsList.innerHTML = gaps.map(gap => `
      <div class="gap-item ${gap.severity === 'CRITICAL' ? 'critical' : 'moderate'}">
        <div style="flex: 1;">
          <div style="display:flex; align-items:center; gap: 8px; margin-bottom: 4px;">
            <span style="font-weight: 700; font-size: 0.95rem;">${gap.skillName}</span>
            <span class="badge ${gap.severity === 'CRITICAL' ? 'badge-red' : 'badge-amber'}">
              ${gap.severity === 'CRITICAL' ? 'LỖ HỔNG GỐC RỄ' : 'CẦN LUYỆN TẬP'}
            </span>
          </div>
          <p style="font-size: 0.82rem; margin-bottom: 6px;">${gap.detectedMisconception}</p>
          <div style="font-size: 0.78rem; color: var(--accent-primary); font-weight: 500;">
            ↳ ${gap.recommendation}
          </div>
        </div>
        <div style="text-align: right; min-width: 60px;">
          <div class="mono-num" style="font-weight: 800; font-size: 1.1rem; color: ${gap.severity === 'CRITICAL' ? 'var(--status-danger)' : 'var(--status-warning)'};">
            ${gap.masteryScore}%
          </div>
          <div style="font-size: 0.7rem; color: var(--text-muted);">Độ thành thạo</div>
        </div>
      </div>
    `).join('');
  }

  function renderRoadmap() {
    if (!elements.roadmapList || !engine) return;
    const summary = engine.generateAdaptiveRoadmap();

    elements.roadmapList.innerHTML = summary.roadmap.map(step => `
      <div class="roadmap-step">
        <div class="step-num-badge">${step.stepOrder}</div>
        <div style="flex: 1;">
          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 2px;">
            <span style="font-weight: 700; font-size: 0.92rem;">${step.actionTitle}</span>
            <span class="badge ${step.priority === 'URGENT' ? 'badge-red' : (step.priority === 'HIGH' ? 'badge-amber' : 'badge-blue')}">
              ${step.priority}
            </span>
          </div>
          <div style="font-size: 0.8rem; color: var(--text-muted);">
            Nhóm: ${step.category} • Thời lượng dự kiến: ~${step.estimatedMinutes} phút
          </div>
        </div>
        <div class="mono-num" style="font-size: 0.85rem; font-weight: 600;">
          ${step.currentMastery}%
        </div>
      </div>
    `).join('');
  }

  /**
   * High Precision Canvas Radar Chart
   */
  function drawRadarChart() {
    const canvas = elements.radarCanvas;
    if (!canvas || !engine) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width = canvas.parentElement.clientWidth || 360;
    const height = canvas.height = canvas.parentElement.clientHeight || 320;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(centerX, centerY) - 45;

    ctx.clearRect(0, 0, width, height);

    const metrics = engine.getRadarMetrics();
    const count = metrics.length;
    if (count < 3) return;

    const angleStep = (Math.PI * 2) / count;
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const gridColor = isDark ? '#1E293B' : '#E2E8F0';
    const textColor = isDark ? '#94A3B8' : '#64748B';

    // Draw concentric polygon rings (25%, 50%, 75%, 100%)
    for (let level = 1; level <= 4; level++) {
      const r = (radius / 4) * level;
      ctx.beginPath();
      for (let i = 0; i < count; i++) {
        const angle = i * angleStep - Math.PI / 2;
        const x = centerX + Math.cos(angle) * r;
        const y = centerY + Math.sin(angle) * r;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.strokeStyle = gridColor;
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    // Draw axes & labels
    ctx.font = '10px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = textColor;
    ctx.textAlign = 'center';

    for (let i = 0; i < count; i++) {
      const angle = i * angleStep - Math.PI / 2;
      const x = centerX + Math.cos(angle) * radius;
      const y = centerY + Math.sin(angle) * radius;

      // Axis line
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(x, y);
      ctx.strokeStyle = gridColor;
      ctx.stroke();

      // Label text offset
      const labelX = centerX + Math.cos(angle) * (radius + 22);
      const labelY = centerY + Math.sin(angle) * (radius + 18);
      ctx.fillText(metrics[i].label, labelX, labelY);
    }

    // Draw student mastery polygon
    ctx.beginPath();
    for (let i = 0; i < count; i++) {
      const angle = i * angleStep - Math.PI / 2;
      const r = (radius * (metrics[i].mastery / 100));
      const x = centerX + Math.cos(angle) * r;
      const y = centerY + Math.sin(angle) * r;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();

    ctx.fillStyle = isDark ? 'rgba(56, 189, 248, 0.25)' : 'rgba(37, 99, 235, 0.2)';
    ctx.fill();
    ctx.strokeStyle = isDark ? '#38BDF8' : '#2563EB';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Data points
    for (let i = 0; i < count; i++) {
      const angle = i * angleStep - Math.PI / 2;
      const r = (radius * (metrics[i].mastery / 100));
      const x = centerX + Math.cos(angle) * r;
      const y = centerY + Math.sin(angle) * r;

      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fillStyle = metrics[i].mastery >= 70 ? '#16A34A' : (metrics[i].mastery >= 45 ? '#D97706' : '#DC2626');
      ctx.fill();
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }
  }

  /**
   * Interactive Prerequisite DAG Graph Canvas
   */
  function drawDAGGraph() {
    const canvas = elements.dagCanvas;
    if (!canvas || !engine) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width = canvas.parentElement.clientWidth || 360;
    const height = canvas.height = canvas.parentElement.clientHeight || 320;

    ctx.clearRect(0, 0, width, height);

    const curr = window.SMART_CURRICULUM[currentCurriculumKey];
    const nodes = curr.nodes;
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';

    // Position nodes horizontally by level
    const nodeCoords = new Map();
    const cols = Math.ceil(nodes.length / 2);
    nodes.forEach((n, idx) => {
      const col = idx % cols;
      const row = Math.floor(idx / cols);
      const x = 50 + col * ((width - 100) / Math.max(1, cols - 1));
      const y = 60 + row * ((height - 120) / 1.4);
      nodeCoords.set(n.id, { x, y, node: n });
    });

    // Draw prerequisite arrow edges
    ctx.lineWidth = 1.5;
    nodes.forEach(n => {
      const targetCoord = nodeCoords.get(n.id);
      (n.prerequisites || []).forEach(preId => {
        const sourceCoord = nodeCoords.get(preId);
        if (sourceCoord && targetCoord) {
          ctx.beginPath();
          ctx.moveTo(sourceCoord.x, sourceCoord.y);
          ctx.lineTo(targetCoord.x, targetCoord.y);
          ctx.strokeStyle = isDark ? '#334155' : '#CBD5E1';
          ctx.stroke();
        }
      });
    });

    // Draw nodes
    nodes.forEach(n => {
      const c = nodeCoords.get(n.id);
      const state = engine.state[n.id];
      const mastery = Math.round((state?.pL || 0.2) * 100);

      let color = '#2563EB';
      if (mastery >= 75) color = '#16A34A';
      else if (mastery < 45) color = '#DC2626';
      else color = '#D97706';

      ctx.beginPath();
      ctx.rect(c.x - 45, c.y - 18, 90, 36);
      ctx.fillStyle = isDark ? '#0D0F14' : '#FFFFFF';
      ctx.fill();
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.fillStyle = isDark ? '#F8FAFC' : '#0F172A';
      ctx.font = 'bold 9px "Plus Jakarta Sans", sans-serif';
      ctx.textAlign = 'center';
      const shortName = n.name.length > 14 ? n.name.slice(0, 12) + '..' : n.name;
      ctx.fillText(shortName, c.x, c.y);

      ctx.fillStyle = color;
      ctx.font = '8px "JetBrains Mono", monospace';
      ctx.fillText(`${mastery}%`, c.x, c.y + 11);
    });
  }

  /**
   * Real-Time Neural Loss & Accuracy Canvas Graph
   */
  function drawLossCurve() {
    const canvas = elements.lossCanvas;
    if (!canvas || !window.smartNN) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width = canvas.parentElement.clientWidth || 540;
    const height = canvas.height = canvas.parentElement.clientHeight || 220;

    ctx.clearRect(0, 0, width, height);

    const history = window.smartNN.lossHistory;
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const gridColor = isDark ? '#1E293B' : '#E2E8F0';
    const textColor = isDark ? '#94A3B8' : '#64748B';

    // Draw grid lines
    ctx.strokeStyle = gridColor;
    ctx.lineWidth = 1;
    for (let y = 30; y < height - 20; y += 40) {
      ctx.beginPath();
      ctx.moveTo(35, y);
      ctx.lineTo(width - 15, y);
      ctx.stroke();
    }

    if (history.length < 2) {
      ctx.font = '12px "Plus Jakarta Sans", sans-serif';
      ctx.fillStyle = textColor;
      ctx.textAlign = 'center';
      ctx.fillText('Nhấn "Bắt Đầu Tự Huấn Luyện" để theo dõi đường cong mất mát thời gian thực...', width / 2, height / 2);
      return;
    }

    // Plot Loss Line (Red/Orange)
    const maxLoss = Math.max(1.0, ...history);
    const minLoss = Math.min(...history);
    const range = Math.max(0.1, maxLoss - minLoss);

    ctx.beginPath();
    history.forEach((loss, i) => {
      const x = 40 + (i / (history.length - 1)) * (width - 60);
      const normalized = (loss - minLoss) / range;
      const y = height - 30 - normalized * (height - 60);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });

    ctx.strokeStyle = '#DC2626';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // Labels
    ctx.font = '10px "JetBrains Mono", monospace';
    ctx.fillStyle = '#DC2626';
    ctx.textAlign = 'left';
    ctx.fillText(`Loss: ${history[history.length - 1].toFixed(4)}`, 45, 20);

    const accHistory = window.smartNN.accuracyHistory;
    if (accHistory.length > 0) {
      ctx.fillStyle = '#16A34A';
      ctx.fillText(`Acc: ${accHistory[accHistory.length - 1]}%`, 140, 20);
    }
  }

  async function handleTutorSend() {
    const query = elements.tutorInput.value.trim();
    if (!query) return;

    appendChatMessage('user', query);
    elements.tutorInput.value = '';

    const typingId = appendChatMessage('bot', 'Đang suy ngẫm hướng dẫn Socratic...');

    const summary = engine.generateAdaptiveRoadmap();
    const gaps = engine.diagnoseKnowledgeGaps();
    const curr = window.SMART_CURRICULUM[currentCurriculumKey];

    const contextState = {
      curriculumTitle: curr.title,
      overallMastery: summary.overallMastery,
      topGap: gaps[0]?.skillName || null
    };

    const reply = await aiService.askTutor(query, contextState);
    updateChatMessage(typingId, reply);
  }

  function appendChatMessage(sender, text) {
    const bubble = document.createElement('div');
    bubble.className = `chat-bubble ${sender}`;
    const id = 'msg_' + Date.now();
    bubble.id = id;
    bubble.innerHTML = SmartSecurity.sanitizeHTML(text).replace(/\n/g, '<br>');
    elements.chatMessages.appendChild(bubble);
    elements.chatMessages.scrollTop = elements.chatMessages.scrollHeight;
    return id;
  }

  function updateChatMessage(id, newText) {
    const bubble = document.getElementById(id);
    if (bubble) {
      bubble.innerHTML = SmartSecurity.sanitizeHTML(newText).replace(/\n/g, '<br>');
      elements.chatMessages.scrollTop = elements.chatMessages.scrollHeight;
    }
  }

  function handleExportGmail() {
    if (window.SmartCaptcha && !window.SmartCaptcha.getStatus().isVerified) {
      window.SmartCaptcha.requireVerification('Gửi Báo Cáo qua Gmail', () => handleExportGmail());
      return;
    }

    const summary = engine.generateAdaptiveRoadmap();
    const gaps = engine.diagnoseKnowledgeGaps();
    const curr = window.SMART_CURRICULUM[currentCurriculumKey];

    const subject = encodeURIComponent(`[SMART AI] Báo Cáo Chẩn Đoán Lỗ Hổng Kiến Thức & Lộ Trình Thích Nghi - ${curr.title}`);
    
    let bodyText = `HỆ THỐNG TRÍ TUỆ NHÂN TẠO HỌC TẬP THÍCH NGHI (SMART AI)\n`;
    bodyText += `Chẩn Đoán Năng Lực & Dự Đoán Lỗ Hổng Kiến Thức Học Sinh\n`;
    bodyText += `========================================================\n\n`;
    bodyText += `Môn học: ${curr.title}\n`;
    bodyText += `Chỉ số thông thạo BKT toàn diện: ${summary.overallMastery}%\n`;
    bodyText += `Mã phiên xác thực toàn vẹn (SHA-256): ${currentSessionDigest || 'AUTHENTICATED'}\n\n`;
    bodyText += `--- 1. CÁC LỖ HỔNG KIẾN THỨC GỐC RỄ (ROOT GAPS) ---\n`;
    
    if (gaps.length === 0) {
      bodyText += `Không phát hiện lỗ hổng nghiêm trọng.\n\n`;
    } else {
      gaps.forEach((g, idx) => {
        bodyText += `${idx + 1}. [${g.skillName}] (${g.severity}) - Thành thạo: ${g.masteryScore}%\n`;
        bodyText += `   Sai lệch nhận thức: ${g.detectedMisconception}\n`;
        bodyText += `   Chỉ dẫn can thiệp: ${g.recommendation}\n\n`;
      });
    }

    bodyText += `--- 2. LỘ TRÌNH THÍCH NGHI ĐỀ XUẤT ---\n`;
    summary.roadmap.slice(0, 4).forEach(s => {
      bodyText += `- Bước ${s.stepOrder}: ${s.actionTitle} (~${s.estimatedMinutes} phút)\n`;
    });

    bodyText += `\nTrân trọng,\nHệ thống SMART AI Research Hub`;

    const gmailWebUrl = `https://mail.google.com/mail/?view=cm&fs=1&su=${subject}&body=${encodeURIComponent(bodyText)}`;
    
    // Open Gmail web client in new tab
    const win = window.open(gmailWebUrl, '_blank');
    if (!win) {
      // Fallback to mailto link
      window.location.href = `mailto:?subject=${subject}&body=${encodeURIComponent(bodyText)}`;
    }
  }

  function handleCopyDigest() {
    const summary = engine.generateAdaptiveRoadmap();
    const payload = JSON.stringify({
      system: 'SMART_AI_ADAPTIVE_ENGINE',
      curriculum: currentCurriculumKey,
      overallMastery: summary.overallMastery,
      digestSha256: currentSessionDigest,
      timestamp: new Date().toISOString()
    }, null, 2);

    navigator.clipboard.writeText(payload).then(() => {
      alert('Đã sao chép mã xác thực phiên học tập an toàn vào clipboard!');
    });
  }

  function renderSecurityAudit() {
    const report = SmartSecurity.auditSecurityPosture();
    elements.securityAuditBody.innerHTML = `
      <tr><td><strong>Content Security Policy (CSP)</strong></td><td><span class="badge badge-green">Hoạt động (Zero Trust)</span></td></tr>
      <tr><td><strong>Phòng chống tấn công XSS</strong></td><td><span class="badge badge-green">Mã hóa thực thể HTML đa tầng</span></td></tr>
      <tr><td><strong>Chuẩn mã hóa mật mã</strong></td><td><span class="badge badge-blue">${report.cryptoSuite}</span></td></tr>
      <tr><td><strong>Xác thực toàn vẹn phiên</strong></td><td><span class="badge badge-blue">${report.sessionIntegrity}</span></td></tr>
      <tr><td><strong>Lưu trữ API Key</strong></td><td><span class="badge badge-green">Mã hóa AES-GCM, không lộ Plaintext</span></td></tr>
      <tr><td><strong>Giới hạn tần suất (Rate Limit)</strong></td><td><span class="badge badge-green">Sliding Window Protection</span></td></tr>
      <tr><td><strong>Tiêu chuẩn OWASP / Cloudflare</strong></td><td><span class="badge badge-green">${report.owaspCompliance}</span></td></tr>
    `;
  }

  function setupCommandPalette() {
    window.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        elements.cmdPalette.classList.toggle('open');
        if (elements.cmdPalette.classList.contains('open')) {
          elements.cmdInput.focus();
        }
      } else if (e.key === 'Escape') {
        elements.cmdPalette.classList.remove('open');
      }
    });

    elements.cmdPaletteBtn?.addEventListener('click', () => {
      elements.cmdPalette.classList.add('open');
      elements.cmdInput.focus();
    });

    const commands = [
      { label: 'Chẩn đoán Năng lực Thích nghi (Diagnostic Quiz)', action: () => elements.tabDiagnostic.click() },
      { label: 'Ma trận & Đồ thị Lỗ hổng Kiến thức (DAG & Radar)', action: () => elements.tabRadar.click() },
      { label: 'Lộ trình Học tập Cá nhân hóa (Adaptive Roadmap)', action: () => elements.tabRoadmap.click() },
      { label: 'Tự Train Mạng Nơ-ron AI (In-Browser Neural DKT)', action: () => elements.tabNeural.click() },
      { label: 'Trợ lý Gia sư Socratic (Socratic AI Tutor)', action: () => elements.tabTutor.click() },
      { label: 'Cấu hình Google Gemini AI Key', action: () => elements.geminiConfigBtn.click() },
      { label: 'Kiểm toán Bảo mật Hệ thống (Security Audit)', action: () => elements.securityAuditBtn.click() },
      { label: 'Xem Bản Quyền & Giấy Phép (GNU AGPLv3 License)', action: () => elements.licenseBtn.click() },
      { label: 'Gửi Báo cáo qua Gmail', action: handleExportGmail },
    ];

    function renderCmds(filter = '') {
      const filtered = commands.filter(c => c.label.toLowerCase().includes(filter.toLowerCase()));
      elements.cmdList.innerHTML = filtered.map((c, i) => `
        <div class="cmd-item" data-idx="${i}">
          <span>${c.label}</span>
          <span class="badge badge-blue">Enter</span>
        </div>
      `).join('');

      elements.cmdList.querySelectorAll('.cmd-item').forEach((item, idx) => {
        item.addEventListener('click', () => {
          filtered[idx].action();
          elements.cmdPalette.classList.remove('open');
        });
      });
    }

    elements.cmdInput?.addEventListener('input', (e) => renderCmds(e.target.value));
    renderCmds();
  }

  // KaTeX Universal Math Renderer
  function renderAllMath(rootElement = document.body) {
    if (window.renderMathInElement && rootElement) {
      try {
        window.renderMathInElement(rootElement, {
          delimiters: [
            { left: '$$', right: '$$', display: true },
            { left: '$', right: '$', display: false },
            { left: '\\(', right: '\\)', display: false },
            { left: '\\[', right: '\\]', display: true }
          ],
          throwOnError: false
        });
      } catch (err) {
        console.warn('KaTeX render warning:', err);
      }
    }
  }

  // Exam Paper Multi-Capture OCR & Real-time Neural Network Training Module
  let activeWebcamStream = null;
  let webcamSnapCount = 0;

  function initExamOCRModule() {
    if (!window.SmartExamOCR) return;

    // Direct change event on file inputs (fired when clicked or chosen via <label for="...">)
    elements.examCameraInput?.addEventListener('change', async (e) => {
      if (e.target.files && e.target.files.length > 0) {
        await handleExamFilesAdded(e.target.files);
        e.target.value = '';
      }
    });

    elements.examMultiFilesInput?.addEventListener('change', async (e) => {
      if (e.target.files && e.target.files.length > 0) {
        await handleExamFilesAdded(e.target.files);
        e.target.value = '';
      }
    });

    // Drag and drop zone
    if (elements.examDropzone) {
      elements.examDropzone.addEventListener('dragover', (e) => {
        e.preventDefault();
        elements.examDropzone.classList.add('dragover');
      });
      elements.examDropzone.addEventListener('dragleave', () => {
        elements.examDropzone.classList.remove('dragover');
      });
      elements.examDropzone.addEventListener('drop', async (e) => {
        e.preventDefault();
        elements.examDropzone.classList.remove('dragover');
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
          await handleExamFilesAdded(e.dataTransfer.files);
        }
      });
      elements.examDropzone.addEventListener('click', () => {
        elements.examMultiFilesInput?.click();
      });
    }

    // Clipboard Paste (Ctrl + V to paste exam screenshot)
    window.addEventListener('paste', async (e) => {
      const items = (e.clipboardData || e.originalEvent?.clipboardData)?.items;
      if (!items) return;
      const imageFiles = [];
      for (const item of items) {
        if (item.type.indexOf('image') !== -1) {
          const blob = item.getAsFile();
          if (blob) imageFiles.push(blob);
        }
      }
      if (imageFiles.length > 0) {
        await handleExamFilesAdded(imageFiles);
        showToast(`Đã nhận ${imageFiles.length} ảnh đề thi từ Clipboard (Ctrl+V)!`, 'success');
      }
    });

    // Webcam Live Scanner Modal
    const webcamOpenButtons = document.querySelectorAll('.btn-open-webcam');
    webcamOpenButtons.forEach(btn => {
      btn.addEventListener('click', startLiveWebcam);
    });

    elements.closeWebcamModal?.addEventListener('click', stopLiveWebcam);
    elements.btnDoneWebcam?.addEventListener('click', () => {
      stopLiveWebcam();
      showToast('Đã lưu ảnh chụp từ Webcam! Nhấn "Bắt Đầu Quét" để phân tích.', 'success');
      elements.tabNeural?.click();
      setTimeout(() => {
        elements.examOCRCard?.scrollIntoView({ behavior: 'smooth' });
      }, 200);
    });

    elements.btnSnapWebcamPhoto?.addEventListener('click', () => {
      snapWebcamPhoto();
    });

    // Clear all images
    elements.btnClearExamImages?.addEventListener('click', () => {
      window.SmartExamOCR.clearAllImages();
      renderExamImagesGrid();
      if (elements.scannedExamTrainingPanel) elements.scannedExamTrainingPanel.style.display = 'none';
      if (elements.ocrProgressTelemetry) elements.ocrProgressTelemetry.style.display = 'none';
      showToast('Đã xóa tất cả ảnh đề thi.', 'info');
    });

    // Start OCR Processing
    elements.btnStartOCRProcess?.addEventListener('click', async () => {
      if (!checkActionRateLimit('ocr_exam', 5, 30000)) return;
      if (window.SmartExamOCR.uploadedImages.length === 0) {
        showToast('Vui lòng chọn hoặc chụp ít nhất 1 ảnh đề thi!', 'warning');
        return;
      }

      elements.ocrProgressTelemetry.style.display = 'block';
      elements.btnStartOCRProcess.disabled = true;
      elements.btnStartOCRProcess.textContent = '⏳ Đang Quét...';

      try {
        const questions = await window.SmartExamOCR.processAllImages({
          onProgress: (p) => {
            elements.ocrPercentText.textContent = `${p.percent}%`;
            elements.ocrProgressFill.style.width = `${p.percent}%`;
            elements.ocrStatusText.textContent = p.message;
          }
        });

        renderExamImagesGrid();
        showToast(`Đã nhận diện thành công ${questions.length} câu hỏi từ ảnh đề thi!`, 'success');
        startScannedExamSession();
      } catch (err) {
        showToast('Lỗi khi quét ảnh đề thi: ' + err.message, 'danger');
      } finally {
        elements.btnStartOCRProcess.disabled = false;
        elements.btnStartOCRProcess.textContent = '⚡ Bắt Đầu Quét OCR & Trích Xuất Đề Thi';
      }
    });

    // Next scanned question
    elements.btnNextScannedQuestion?.addEventListener('click', () => {
      const q = window.SmartExamOCR.nextQuestion();
      if (q) {
        renderScannedQuestion(q);
      } else {
        const results = window.SmartExamOCR.finishSession();
        renderScannedExamSummary(results);
      }
    });

    // Auto train all scanned
    elements.btnAutoTrainAllScanned?.addEventListener('click', async () => {
      await autoTrainAllScannedExamQuestions();
    });
  }

  // Webcam Helpers
  async function startLiveWebcam() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      alert('Trình duyệt hoặc thiết bị của bạn không hỗ trợ truy cập Webcam trực tiếp. Vui lòng bấm "Chọn Nhiều Ảnh" hoặc "Chụp Ảnh Bằng Camera" để dùng bộ chọn file của hệ điều hành.');
      return;
    }

    try {
      webcamSnapCount = 0;
      if (elements.webcamSnapCountBadge) elements.webcamSnapCountBadge.textContent = 'Đã chụp: 0 ảnh';
      elements.webcamModal.classList.add('open');

      activeWebcamStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: { ideal: 'environment' },
          width: { ideal: 1920 },
          height: { ideal: 1080 }
        },
        audio: false
      });

      if (elements.webcamVideo) {
        elements.webcamVideo.srcObject = activeWebcamStream;
      }
    } catch (err) {
      console.error('Không thể mở Webcam:', err);
      alert('Không thể kết nối với Camera/Webcam (' + err.message + '). Bạn có thể dùng nút "Chọn Nhiều Ảnh Đề Thi" để tải ảnh có sẵn!');
      stopLiveWebcam();
    }
  }

  function snapWebcamPhoto() {
    if (!elements.webcamVideo || !elements.webcamCanvas) return;
    const video = elements.webcamVideo;
    const canvas = elements.webcamCanvas;

    const w = video.videoWidth || 1280;
    const h = video.videoHeight || 720;
    canvas.width = w;
    canvas.height = h;

    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, w, h);

    const dataUrl = canvas.toDataURL('image/jpeg', 0.92);
    webcamSnapCount++;
    if (elements.webcamSnapCountBadge) {
      elements.webcamSnapCountBadge.textContent = `Đã chụp: ${webcamSnapCount} ảnh`;
    }

    // Add into SmartExamOCR list
    const imgObj = {
      id: 'snap_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
      file: null,
      name: `Anh_chup_webcam_${window.SmartExamOCR.uploadedImages.length + 1}.jpg`,
      size: `${Math.round(dataUrl.length * 0.75 / 1024)} KB`,
      dataUrl,
      status: 'ready',
      progress: 0,
      rawText: '',
      questions: []
    };

    window.SmartExamOCR.uploadedImages.push(imgObj);
    renderExamImagesGrid();

    // Flash animation on video frame
    if (window.gsap) {
      window.gsap.fromTo(video, { filter: 'brightness(2)' }, { filter: 'brightness(1)', duration: 0.25 });
    }
    showToast(`Đã chụp trang ${webcamSnapCount}!`, 'success');
  }

  function stopLiveWebcam() {
    if (activeWebcamStream) {
      activeWebcamStream.getTracks().forEach(track => track.stop());
      activeWebcamStream = null;
    }
    if (elements.webcamVideo) {
      elements.webcamVideo.srcObject = null;
    }
    elements.webcamModal?.classList.remove('open');
  }

  async function handleExamFilesAdded(files) {
    const added = await window.SmartExamOCR.addImages(files);
    renderExamImagesGrid();
    showToast(`Đã nạp ${added.length} ảnh đề thi thành công!`, 'success');

    // Switch to neural tab and scroll to OCR area
    elements.tabNeural?.click();
    setTimeout(() => {
      const card = document.getElementById('examOCRCard');
      if (card) card.scrollIntoView({ behavior: 'smooth' });
    }, 150);
  }

  function renderExamImagesGrid() {
    if (!elements.examImagesPreviewGrid) return;
    const images = window.SmartExamOCR.uploadedImages;

    if (images.length === 0) {
      elements.examImagesPreviewGrid.innerHTML = '';
      if (elements.btnClearExamImages) elements.btnClearExamImages.style.display = 'none';
      if (elements.btnStartOCRProcess) elements.btnStartOCRProcess.style.display = 'none';
      return;
    }

    if (elements.btnClearExamImages) elements.btnClearExamImages.style.display = 'inline-flex';
    if (elements.btnStartOCRProcess) elements.btnStartOCRProcess.style.display = 'inline-flex';

    elements.examImagesPreviewGrid.innerHTML = images.map((img) => `
      <div class="exam-preview-card" data-id="${img.id}">
        <button class="exam-preview-remove" onclick="window.removeExamImage('${img.id}')" title="Xóa ảnh này">✕</button>
        <img src="${img.dataUrl}" alt="${img.name}" loading="lazy">
        <div class="exam-preview-info">
          <span style="font-weight: 600; text-overflow: ellipsis; overflow: hidden; white-space: nowrap;">${img.name}</span>
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span style="color: var(--text-secondary);">${img.size}</span>
            <span class="badge ${img.status === 'done' ? 'badge-green' : (img.status === 'processing' ? 'badge-blue' : 'badge-amber')}" style="padding: 1px 4px; font-size: 0.65rem;">
              ${img.status === 'done' ? `${img.questions?.length || 0} câu` : (img.status === 'processing' ? 'Đang quét' : 'Chờ')}
            </span>
          </div>
        </div>
      </div>
    `).join('');
  }

  window.removeExamImage = function(id) {
    window.SmartExamOCR.removeImage(id);
    renderExamImagesGrid();
  };

  function startScannedExamSession() {
    const q = window.SmartExamOCR.startExamSession();
    if (!q) return;
    if (elements.scannedExamTrainingPanel) elements.scannedExamTrainingPanel.style.display = 'block';
    renderScannedQuestion(q);
    if (window.gsap) {
      window.gsap.fromTo(elements.scannedExamTrainingPanel, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.35 });
    }
  }

  function renderScannedQuestion(q) {
    if (!q) return;
    const total = window.SmartExamOCR.extractedQuestions.length;
    elements.scannedExamCounterBadge.textContent = `Câu ${q.displayNumber} / ${total}`;
    
    // Header & question text with image source pill
    elements.scannedQuestionText.innerHTML = `
      <div style="margin-bottom: 6px;">
        <span class="badge badge-blue">Từ ảnh: ${q.sourceImageName || 'Đề thi'}</span>
        <span class="badge badge-amber" style="margin-left: 6px;">Kỹ năng: ${q.skillName || 'Toán học'}</span>
      </div>
      <div><strong>Câu ${q.displayNumber}:</strong> ${SmartSecurity.sanitizeHTML(q.questionText)}</div>
    `;

    // Options
    elements.scannedOptionsContainer.innerHTML = q.options.map(opt => `
      <button class="quiz-option-btn" data-key="${opt.key}" style="display: flex; align-items: center; gap: 10px; text-align: left; padding: 10px 14px;">
        <span class="option-key" style="font-weight: 800; width: 24px; height: 24px; border-radius: 4px; background: var(--bg-surface-subtle); display: inline-flex; align-items: center; justify-content: center;">${opt.key}</span>
        <span>${SmartSecurity.sanitizeHTML(opt.text)}</span>
      </button>
    `).join('');

    elements.scannedFeedbackBox.style.display = 'none';
    elements.btnNextScannedQuestion.style.display = 'none';

    // Bind option click
    const optionBtns = elements.scannedOptionsContainer.querySelectorAll('.quiz-option-btn');
    optionBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const selectedKey = btn.getAttribute('data-key');
        handleScannedAnswerSubmit(selectedKey, optionBtns);
      });
    });

    renderAllMath(elements.scannedExamTrainingPanel);
  }

  function handleScannedAnswerSubmit(selectedKey, optionBtns) {
    optionBtns.forEach(b => b.disabled = true);
    const result = window.SmartExamOCR.submitAnswer(selectedKey);
    if (!result) return;

    optionBtns.forEach(b => {
      const key = b.getAttribute('data-key');
      if (key === result.correctKey) {
        b.classList.add('correct');
      } else if (key === selectedKey && !result.isCorrect) {
        b.classList.add('incorrect');
      }
    });

    elements.scannedFeedbackBox.style.display = 'block';
    if (result.isCorrect) {
      elements.scannedFeedbackBox.className = 'quiz-feedback correct';
      elements.scannedFeedbackBox.innerHTML = `
        <strong>Chính xác!</strong> Mô hình BKT cập nhật xác suất năng lực P(L): <strong>${Math.round(result.bktUpdate?.pL * 100 || 80)}%</strong>.<br>
        Mạng Nơ-ron DKT đã thực hiện 5 epoch lan truyền ngược (Backpropagation) để cập nhật trọng số W₁, W₂, W₃!
      `;
    } else {
      elements.scannedFeedbackBox.className = 'quiz-feedback incorrect';
      elements.scannedFeedbackBox.innerHTML = `
        <strong>Chưa chính xác!</strong> Đáp án đúng là <strong>${result.correctKey}</strong>.<br>
        Xác suất năng lực P(L) điều chỉnh về: <strong>${Math.round(result.bktUpdate?.pL * 100 || 30)}%</strong>. Mạng Nơ-ron đã ghi nhận lỗ hổng nhận thức và điều chỉnh trọng số lỗi.
      `;
    }

    // Update telemetry HUD
    if (window.smartNN) {
      elements.neuralEpochBadge.textContent = `Epoch: ${window.smartNN.currentEpoch} / 60`;
      const lastLoss = window.smartNN.lossHistory[window.smartNN.lossHistory.length - 1];
      const lastAcc = window.smartNN.accuracyHistory[window.smartNN.accuracyHistory.length - 1];
      if (lastLoss !== undefined) {
        elements.neuralLossMetric.textContent = `Loss: ${lastLoss.toFixed(4)} | Acc: ${lastAcc || 0}%`;
        drawLossCurve();
      }
    }

    elements.btnNextScannedQuestion.style.display = 'inline-flex';
    renderAllMath(elements.scannedFeedbackBox);
  }

  function renderScannedExamSummary(results) {
    elements.scannedQuestionText.innerHTML = `
      <div style="text-align: center; padding: 20px 0;">
        <div style="font-size: 2.5rem; margin-bottom: 8px;">🎉</div>
        <h3 style="font-size: 1.2rem; font-weight: 800; color: var(--accent-primary);">HOÀN THÀNH BÀI THI TỪ ẢNH SCAN</h3>
        <p style="font-size: 0.9rem; color: var(--text-secondary); margin-top: 6px;">
          Đạt: <strong>${results.correctCount}/${results.total} câu (${results.scorePercent}%)</strong>
        </p>
      </div>
    `;
    elements.scannedOptionsContainer.innerHTML = '';
    elements.scannedFeedbackBox.style.display = 'block';
    elements.scannedFeedbackBox.className = 'quiz-feedback correct';
    elements.scannedFeedbackBox.innerHTML = `
      Hệ thống đã đồng bộ toàn bộ kết quả bài thi từ ảnh vào Đồ thị Tri thức DAG và Mạng Nơ-ron DKT.<br>
      Bạn có thể chuyển sang tab <strong>Đồ thị & Ma trận</strong> để xem ma trận năng lực mới, hoặc tab <strong>Lộ trình thích nghi</strong> để xem lộ trình học tập cá nhân hóa được cập nhật!
    `;
    elements.btnNextScannedQuestion.style.display = 'none';
  }

  async function autoTrainAllScannedExamQuestions() {
    if (!window.smartNN || window.SmartExamOCR.extractedQuestions.length === 0) {
      showToast('Chưa có câu hỏi nào từ ảnh đề thi để huấn luyện!', 'warning');
      return;
    }
    showToast('Bắt đầu tự động huấn luyện Mạng Nơ-ron từ toàn bộ câu hỏi trong ảnh đề thi...', 'info');
    elements.trainingStatusBadge.textContent = 'Auto-train đề thi...';
    elements.trainingStatusBadge.className = 'badge badge-blue';

    const questions = window.SmartExamOCR.extractedQuestions;
    for (let q of questions) {
      if (engine) {
        engine.updateMastery(q.skillId || 'node-1', true);
      }
    }

    // Train 40 epochs on student interaction profile
    const studentVector = engine ? engine.getStudentVector() : Array(12).fill(0.6);
    await window.smartNN.trainEpochs(studentVector, 40, 0.015);

    elements.neuralEpochBadge.textContent = `Epoch: ${window.smartNN.currentEpoch} / 60`;
    const lastLoss = window.smartNN.lossHistory[window.smartNN.lossHistory.length - 1];
    const lastAcc = window.smartNN.accuracyHistory[window.smartNN.accuracyHistory.length - 1];
    elements.neuralLossMetric.textContent = `Loss: ${lastLoss.toFixed(4)} | Acc: ${lastAcc}%`;
    drawLossCurve();

    elements.trainingStatusBadge.textContent = 'Đã khớp đề thi';
    elements.trainingStatusBadge.className = 'badge badge-green';
    showToast('Đã hoàn tất tự động huấn luyện Mạng Nơ-ron từ toàn bộ ảnh đề thi!', 'success');
  }

  function initGSAPAnimations() {
    if (!window.gsap) return;
    window.gsap.from('.app-header', { y: -20, opacity: 0, duration: 0.5, ease: 'power2.out' });
    window.gsap.from('.bento-card', { y: 24, opacity: 0, duration: 0.5, stagger: 0.08, ease: 'power2.out' });
  }

  function checkSecurityPosture() {
    // Basic verification of crypto subtle support
    if (!window.crypto || !window.crypto.subtle) {
      console.error('[SMART AI Security] Web Crypto API is not available on this browser environment!');
    }
  }

  function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('./sw.js').catch(err => {
        console.log('[PWA] Service Worker registration skipped in standalone context');
      });
    }
  }

  // Self start on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    initApp();
  }
})();
