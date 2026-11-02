/**
 * SMART AI - Knowledge Space Theory (KST) Curriculum Database
 * Multi-domain Knowledge Graph DAGs (Directed Acyclic Graphs) with Prerequisite Dependencies
 */

window.SMART_CURRICULUM = {
  ai_math: {
    id: "ai_math",
    title: "Toán học cho Trí tuệ Nhân tạo & Khoa học Dữ liệu",
    titleEn: "Mathematics for AI & Data Science",
    description: "Lộ trình từ đại số cơ bản, vi tích phân đến tối ưu hóa mô hình AI đa chiều.",
    icon: "brain-circuit",
    nodes: [
      {
        id: "m_alg_basics",
        name: "Đại số & Biến đổi biểu thức cơ bản",
        category: "Nền tảng",
        prerequisites: [],
        weight: 1.0,
        bktDefaults: { L0: 0.25, T: 0.15, S: 0.08, G: 0.15 },
        diagnosticQuestion: {
          id: "q_m1",
          question: "Rút gọn biểu thức $P = \\frac{x^2 - 4}{x - 2}$ với $x \\neq 2$:",
          options: ["x - 2", "x + 2", "x^2 + 2", "4x - 2"],
          correctIndex: 1,
          hint: "Sử dụng hằng đẳng thức hiệu hai bình phương $a^2 - b^2 = (a-b)(a+b)$.",
          misconceptions: {
            0: "Lẫn lộn dấu trong hằng đẳng thức $a^2 - b^2$.",
            2: "Chưa phân tích được đa thức thành nhân tử.",
            3: "Cộng trừ tùy tiện hệ số và ẩn số."
          }
        }
      },
      {
        id: "m_linear_eq",
        name: "Phương trình tuyến tính & Ma trận 2D",
        category: "Đại số tuyến tính",
        prerequisites: ["m_alg_basics"],
        weight: 1.2,
        bktDefaults: { L0: 0.2, T: 0.14, S: 0.1, G: 0.2 },
        diagnosticQuestion: {
          id: "q_m2",
          question: "Tích vô hướng của 2 vector $\\mathbf{u} = [2, -3]$ và $\\mathbf{v} = [4, 1]$ là:",
          options: ["5", "11", "8", "-5"],
          correctIndex: 0,
          hint: "Tích vô hướng $\\mathbf{u} \\cdot \\mathbf{v} = u_1 v_1 + u_2 v_2 = 2(4) + (-3)(1) = 8 - 3 = 5$.",
          misconceptions: {
            1: "Cộng nhầm dấu của số âm $(-3) \\times 1 = -3$ thành $+3$.",
            2: "Chỉ nhân phần tử đầu tiên mà bỏ qua phần tử thứ hai.",
            3: "Tính sai dấu chung của biểu thức."
          }
        }
      },
      {
        id: "m_derivatives",
        name: "Đạo hàm & Quy tắc Dây chuyền (Chain Rule)",
        category: "Giải tích",
        prerequisites: ["m_alg_basics"],
        weight: 1.4,
        bktDefaults: { L0: 0.15, T: 0.12, S: 0.12, G: 0.15 },
        diagnosticQuestion: {
          id: "q_m3",
          question: "Đạo hàm của hàm số hợp $f(x) = (3x^2 - 1)^4$ là:",
          options: [
            "4(3x^2 - 1)^3",
            "24x(3x^2 - 1)^3",
            "12x(3x^2 - 1)^3",
            "24(3x - 1)^3"
          ],
          correctIndex: 1,
          hint: "Quy tắc dây chuyền $(u^n)' = n \\cdot u^{n-1} \\cdot u'$. Ở đây $u = 3x^2 - 1 \\Rightarrow u' = 6x$.",
          misconceptions: {
            0: "Quên nhân với đạo hàm của hàm hợp bên trong $u' = 6x$.",
            2: "Nhân sai hệ số đạo hàm bên trong ($3 \\times 4$ thay vì $6x \\times 4$).",
            3: "Mất lũy thừa bậc hai của biến $x$ trong ngoặc."
          }
        }
      },
      {
        id: "m_grad_descent",
        name: "Gradient Descent & Cực trị hàm đa biến",
        category: "Tối ưu hóa AI",
        prerequisites: ["m_linear_eq", "m_derivatives"],
        weight: 1.8,
        bktDefaults: { L0: 0.1, T: 0.1, S: 0.15, G: 0.1 },
        diagnosticQuestion: {
          id: "q_m4",
          question: "Trong thuật toán Gradient Descent với learning rate $\\alpha$, trọng số $w$ được cập nhật theo công thức nào?",
          options: [
            "w_{new} = w_{old} + \\alpha \\nabla L(w)",
            "w_{new} = w_{old} - \\alpha \\nabla L(w)",
            "w_{new} = w_{old} \\times \\nabla L(w)",
            "w_{new} = w_{old} - \\frac{1}{\\alpha} \\nabla L(w)"
          ],
          correctIndex: 1,
          hint: "Gradient chỉ hướng tăng nhanh nhất, do đó để giảm thiểu mất mát (loss) ta phải đi ngược chiều gradient: dấu '-'.",
          misconceptions: {
            0: "Nhầm lẫn giữa Gradient Ascent (tăng hàm mục tiêu) và Gradient Descent (giảm hàm mất mát).",
            2: "Hiểu sai phép cập nhật bước lặp là phép nhân thay vì phép cộng/trừ vector.",
            3: "Nhầm vị trí hệ số tốc độ học $\\alpha$."
          }
        }
      },
      {
        id: "m_prob_dist",
        name: "Xác suất Bayes & Phân phối Gauss",
        category: "Xác suất Thống kê",
        prerequisites: ["m_alg_basics"],
        weight: 1.3,
        bktDefaults: { L0: 0.2, T: 0.12, S: 0.12, G: 0.2 },
        diagnosticQuestion: {
          id: "q_m5",
          question: "Công thức định lý Bayes biểu diễn xác suất hậu nghiệm $P(A|B)$ là:",
          options: [
            "P(A|B) = \\frac{P(B|A) \\cdot P(A)}{P(B)}",
            "P(A|B) = \\frac{P(A|B) \\cdot P(B)}{P(A)}",
            "P(A|B) = P(A \\cap B) \\cdot P(B)",
            "P(A|B) = \\frac{P(A) + P(B)}{P(A \\cap B)}"
          ],
          correctIndex: 0,
          hint: "Định lý Bayes: $P(A|B) = \\frac{P(B|A) P(A)}{P(B)}$.",
          misconceptions: {
            1: "Đảo ngược điều kiện tiền nghiệm và hậu nghiệm.",
            2: "Nhầm giữa xác suất đồng thời và xác suất có điều kiện.",
            3: "Cộng xác suất thay vì tỉ số nhân."
          }
        }
      },
      {
        id: "m_deep_loss",
        name: "Cross-Entropy Loss & Tối ưu hóa Neural Network",
        category: "Tối ưu hóa AI",
        prerequisites: ["m_grad_descent", "m_prob_dist"],
        weight: 2.0,
        bktDefaults: { L0: 0.08, T: 0.09, S: 0.15, G: 0.1 },
        diagnosticQuestion: {
          id: "q_m6",
          question: "Khi huấn luyện bài toán phân loại đa lớp (Multi-class Classification), hàm mất mát tiêu chuẩn kết hợp với Softmax là:",
          options: [
            "Mean Squared Error (MSE)",
            "Categorical Cross-Entropy",
            "Hinge Loss",
            "Cosine Similarity Loss"
          ],
          correctIndex: 1,
          hint: "Cross-Entropy đo lường sự sai khác giữa phân phối xác suất dự đoán (Softmax) và nhãn thật One-hot.",
          misconceptions: {
            0: "MSE chỉ phù hợp cho bài toán hồi quy (Regression), kém hiệu quả khi dùng với Softmax.",
            2: "Hinge loss chủ yếu dùng trong SVM (Support Vector Machines).",
            3: "Cosine similarity đo góc giữa 2 vector, không phải hàm mất mát xác suất chuẩn."
          }
        }
      }
    ]
  },

  prog_cs: {
    id: "prog_cs",
    title: "Khoa học Máy tính & Kỹ thuật Lập trình Hiện đại",
    titleEn: "Computer Science & Modern Software Engineering",
    description: "Từ cấu trúc dữ liệu, thuật toán đến kiến trúc phân tán và an toàn hệ thống.",
    icon: "code",
    nodes: [
      {
        id: "cs_logic_syntax",
        name: "Tư duy Logic & Biến / Điều kiện cơ bản",
        category: "Cơ bản",
        prerequisites: [],
        weight: 1.0,
        bktDefaults: { L0: 0.35, T: 0.2, S: 0.06, G: 0.2 },
        diagnosticQuestion: {
          id: "q_cs1",
          question: "Trong JavaScript/TypeScript, giá trị nào sau đây KHÔNG phải là 'falsy'?",
          options: ["0", "'' (chuỗi rỗng)", "[] (mảng rỗng)", "null"],
          correctIndex: 2,
          hint: "Mảng rỗng `[]` và đối tượng rỗng `{}` trong JavaScript là object nên luôn truthy.",
          misconceptions: {
            0: "Số 0 là falsy.",
            1: "Chuỗi rỗng '' có độ dài 0 là falsy.",
            3: "null là falsy."
          }
        }
      },
      {
        id: "cs_data_struct",
        name: "Cấu trúc dữ liệu mảng & Bảng băm (Hash Map)",
        category: "Cấu trúc dữ liệu",
        prerequisites: ["cs_logic_syntax"],
        weight: 1.3,
        bktDefaults: { L0: 0.25, T: 0.15, S: 0.1, G: 0.15 },
        diagnosticQuestion: {
          id: "q_cs2",
          question: "Độ phức tạp thời gian trung bình (Average Time Complexity) khi tìm kiếm phần tử trong Hash Table là:",
          options: ["O(1)", "O(log N)", "O(N)", "O(N log N)"],
          correctIndex: 0,
          hint: "Hàm băm tính chỉ số trực tiếp từ key, do đó tra cứu trung bình là thời gian hằng số O(1).",
          misconceptions: {
            1: "O(log N) là độ phức tạp của tìm kiếm nhị phân hoặc cây tìm kiếm cân bằng BST.",
            2: "O(N) chỉ là trường hợp xấu nhất (Worst-case) khi xảy ra xung đột băm toàn phần.",
            3: "O(N log N) là độ phức tạp của các thuật toán sắp xếp tối ưu."
          }
        }
      },
      {
        id: "cs_recursion_dp",
        name: "Đệ quy & Quy hoạch động (Dynamic Programming)",
        category: "Thuật toán",
        prerequisites: ["cs_data_struct"],
        weight: 1.8,
        bktDefaults: { L0: 0.15, T: 0.1, S: 0.15, G: 0.1 },
        diagnosticQuestion: {
          id: "q_cs3",
          question: "Hai đặc trưng cốt lõi để một bài toán giải được bằng Quy hoạch động (DP) là:",
          options: [
            "Cấu trúc con tối ưu (Optimal Substructure) và Bài toán con gối nhau (Overlapping Subproblems)",
            "Đồ thị liên thông và Không có chu trình",
            "Tìm kiếm tham lam và Sắp xếp topo",
            "Tính tất định và Độ phức tạp hằng số"
          ],
          correctIndex: 0,
          hint: "DP giải quyết các bài toán có bài toán con lặp lại bằng cách ghi nhớ (Memoization/Tabulation) kết hợp cấu trúc tối ưu.",
          misconceptions: {
            1: "Đó là tính chất của DAG trong lý thuyết đồ thị.",
            2: "Tham lam (Greedy) chọn lựa chọn tốt nhất cục bộ, khác DP xem xét toàn thể.",
            3: "DP không nhất thiết có độ phức tạp hằng số."
          }
        }
      },
      {
        id: "cs_async_concurrency",
        name: "Bất đồng bộ & Event Loop trong kiến trúc phần mềm",
        category: "Hệ thống",
        prerequisites: ["cs_logic_syntax"],
        weight: 1.5,
        bktDefaults: { L0: 0.2, T: 0.12, S: 0.12, G: 0.15 },
        diagnosticQuestion: {
          id: "q_cs4",
          question: "Thứ tự thực thi trong JavaScript Event Loop giữa Microtask (Promise.then) và Macrotask (setTimeout) là gì?",
          options: [
            "Tất cả Macrotask chạy trước, sau đó mới tới Microtask.",
            "Tất cả Microtask trong hàng đợi được xử lý hết trước khi chuyển sang Macrotask tiếp theo.",
            "Chạy luân phiên ngẫu nhiên 1 Microtask rồi 1 Macrotask.",
            "Phụ thuộc hoàn toàn vào tốc độ của vi xử lý CPU."
          ],
          correctIndex: 1,
          hint: "Microtask Queue (Promise callbacks, queueMicrotask) luôn được vét cạn (drain) sau mỗi tick của Call Stack trước khi lấy Macrotask tiếp theo.",
          misconceptions: {
            0: "Microtask có độ ưu tiên cao hơn Macrotask.",
            2: "Event loop tuân thủ thứ tự hàng đợi nghiêm ngặt chứ không ngẫu nhiên.",
            3: "Được định nghĩa bởi chuẩn đặc tả ECMAScript/HTML5, không phụ thuộc CPU."
          }
        }
      },
      {
        id: "cs_web_security",
        name: "Bảo mật Web: XSS, CSRF, CSP & Mã hóa",
        category: "Bảo mật",
        prerequisites: ["cs_async_concurrency"],
        weight: 1.7,
        bktDefaults: { L0: 0.15, T: 0.12, S: 0.1, G: 0.15 },
        diagnosticQuestion: {
          id: "q_cs5",
          question: "Để ngăn chặn tấn công Cross-Site Scripting (Stored XSS) triệt để khi hiển thị nội dung người dùng nhập vào DOM, kỹ thuật hiệu quả nhất là:",
          options: [
            "Sử dụng innerHTML kết hợp mã hóa Base64",
            "Mã hóa/thoát ký tự HTML (HTML entity encoding) hoặc dùng textContent/thư viện DOMPurify",
            "Dùng HTTP Header Access-Control-Allow-Origin: *",
            "Lưu dữ liệu vào localStorage thay vì sessionStorage"
          ],
          correctIndex: 1,
          hint: "Thoát các ký tự nguy hiểm (<, >, &, \", ') hoặc dùng textContent đảm bảo trình duyệt diễn giải chuỗi là dữ liệu thuần, không thực thi mã script.",
          misconceptions: {
            0: "innerHTML với Base64 vẫn giải mã và chạy script độc hại bình thường.",
            2: "CORS bảo vệ tài nguyên API cross-origin, không bảo vệ DOM khỏi XSS.",
            3: "localStorage thậm chí còn dễ bị đánh cắp hơn qua XSS token theft."
          }
        }
      }
    ]
  }
};
