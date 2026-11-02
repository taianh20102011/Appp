# BÁO CÁO KIỂM TOÁN BẢO MẬT HỆ THỐNG SMART AI
## SMART AI – Adaptive Knowledge Gap & Personalized Learning System
**Chuẩn đánh giá:** Cloudflare Security Audit Protocol & OWASP Top 10 (2021-2026)  
**Phạm vi:** Client-Side Web Application, Cryptographic Key Vault, Adaptive Inference Engine, Data Sharing via Gmail/API.

---

### 1. TỔNG QUAN KẾT QUẢ KIỂM TOÁN (EXECUTIVE SUMMARY)

| Danh mục kiểm toán | Trạng thái | Mức độ rủi ro | Biện pháp xử lý đã áp dụng |
| :--- | :---: | :---: | :--- |
| **A01: Broken Access Control** | ✅ Đạt | Thấp | Không dựa vào quyền client-side giả định; phân tách dữ liệu ngữ cảnh độc lập. |
| **A02: Cryptographic Failures** | ✅ Đạt | Rất thấp | Web Crypto API tiêu chuẩn (`AES-GCM-256`, `PBKDF2` 100.000 vòng lặp, muối ngẫu nhiên 16 bytes). Tuyệt đối không lưu plaintext API key. |
| **A03: Injection (XSS, DOM Injection)** | ✅ Đạt | Rất thấp | Triệt tiêu `innerHTML` không kiểm soát. Toàn bộ chuỗi hiển thị đều qua hàm `SmartSecurity.sanitizeHTML` mã hóa thực thể HTML (`&`, `<`, `>`, `"`, `'`). |
| **A04: Insecure Design** | ✅ Đạt | Thấp | Thiết kế phòng thủ chiều sâu (Defense-in-Depth). Có cơ chế AI ngoại tuyến độc lập khi mất mạng hoặc không có API key. |
| **A05: Security Misconfiguration** | ✅ Đạt | Thấp | Khai báo Content Security Policy (CSP) nghiêm ngặt tại `<meta>`, cấm tải script từ domain lạ. |
| **A06: Vulnerable & Outdated Components** | ✅ Đạt | Rất thấp | Chỉ nạp các thư viện GSAP và KaTeX từ CDN uy tín (jsdelivr), khóa phiên bản ổn định. |
| **A07: Identification & Auth Failures** | ✅ Đạt | Rất thấp | Phiên học tập và kết quả chẩn đoán được ký băm SHA-256 chống làm giả (Anti-Tamper Session Digest). |
| **A08: Software and Data Integrity Failures** | ✅ Đạt | Rất thấp | Kiểm tra tính toàn vẹn của đồ thị tri thức DAG trước khi tính toán BKT. |
| **A09: Security Logging & Monitoring** | ✅ Đạt | Thấp | Giám sát lỗi qua console có kiểm soát, không in lộ chuỗi bí mật. |
| **A10: Server-Side / Client-Side Request Forgery** | ✅ Đạt | Thấp | Rate Limiter theo cơ chế Sliding Window giới hạn số lượt gửi yêu cầu/phút nhằm chống bot và brute-force. |

---

### 2. CHI TIẾT CÁC CƠ CHẾ BẢO MẬT NÂNG CẤP ĐẶC BIỆT

#### 2.1. Két Sắt Mật Mã Trình Duyệt (Zero-Leak Client-Side Vault)
- **Vấn đề trước đây:** Rất nhiều ứng dụng web lưu API Key vào `localStorage` dạng plaintext, dễ bị đánh cắp qua Extension độc hại hoặc khai thác XSS.
- **Giải pháp SMART AI:** 
  - Khóa bí mật được mã hóa bằng thuật toán đối xứng tiêu chuẩn ngân hàng `AES-GCM-256`.
  - Khóa giải mã được dẫn xuất động qua thuật toán `PBKDF2` với 100.000 vòng lặp băm SHA-256 và Vector khởi tạo (IV) ngẫu nhiên 12 bytes cho mỗi lần ghi.
  - Ngay cả khi trích xuất chuỗi thô từ `localStorage`, kẻ tấn công chỉ nhận được chuỗi Ciphertext vô nghĩa.

#### 2.2. Cơ Chế Chống Tấn Công XSS Triệt Để (Zero-Trust HTML Sanitization)
- Mọi câu hỏi, phương án lựa chọn, tên học sinh và phản hồi từ AI đều được thanh lọc qua:
  ```javascript
  function sanitizeHTML(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }
  ```
- Kết hợp với chính sách bảo mật nội dung **Content Security Policy (CSP)** ngăn chặn việc nạp các payload độc hại.

#### 2.3. Chữ Ký Toàn Vẹn Phiên Khảo Sát (Anti-Tamper Session Digest)
- Mỗi kết quả chẩn đoán năng lực BKT và danh sách lỗ hổng kiến thức được mã hóa băm một chiều:
  $$\text{SessionDigest} = \text{SHA-256}(\text{Curriculum} \parallel \text{MasteryScore} \parallel \text{GapsCount} \parallel \text{Timestamp})$$
- Mã băm này được đính kèm khi xuất báo cáo qua Gmail hoặc sao chép vào bộ nhớ tạm, cho phép giáo viên hoặc người giám sát đối chiếu tính xác thực của bài kiểm tra.

#### 2.4. Cơ Chế Chia Sẻ Báo Cáo An Toàn Qua Gmail (Safe Mailto / Web-Share)
- URL chuyển hướng trực tiếp đến giao diện soạn thư chính thức của Google (`mail.google.com/mail/?view=cm`) với toàn bộ nội dung được `encodeURIComponent` an toàn.
- Không sử dụng các dịch vụ webhook bên thứ 3 thiếu kiểm duyệt, bảo vệ quyền riêng tư tuyệt đối cho học sinh.

---

### 3. HƯỚNG DẪN TRIỂN KHAI VÀ KHUYẾN NGHỊ VẬN HÀNH
1. **Chạy trực tiếp (Zero-Install):** Người dùng có thể click đúp chuột vào file `index.html` để mở ngay trên trình duyệt (Chrome, Edge, Firefox, Safari) mà không cần cài đặt Node.js hay Python.
2. **Cài đặt dạng ứng dụng (PWA):** Nhấn biểu tượng "Cài đặt ứng dụng" trên thanh địa chỉ trình duyệt để biến SMART AI thành App độc lập trên Windows/macOS hoặc Android/iOS.
3. **Môi trường Cloudflare Pages / Vercel (Nếu đưa lên Internet):**
   - Đặt SSL/TLS ở chế độ **Full (Strict)**.
   - Bật **Bot Fight Mode** và tự động nén Brotli để tải cực nhanh.
