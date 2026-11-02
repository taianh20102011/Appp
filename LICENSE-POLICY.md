# CHÍNH SÁCH BẢN QUYỀN & HỆ THỐNG BẢO VỆ MÃ NGUỒN SMART AI
## SMART AI – Adaptive Learning & Student Knowledge Gap Prediction
**Bản quyền tác giả (Copyright):** © 2026 Tài Anh (`phamngoctaianh6@gmail.com`)  
**Giấy phép cốt lõi (Core License):** GNU Affero General Public License v3.0 (GNU AGPLv3)

---

### PHẦN 1: PHÂN TÍCH PHÁP LÝ & VÌ SAO GNU AGPLv3 LÀ GIẤY PHÉP TỐI ƯU VÀ AN NINH NHẤT

| Loại giấy phép | Mức độ tự do | Bảo vệ khỏi đóng mã nguồn (Copyleft) | Bảo vệ khỏi lỗ hổng dịch vụ đám mây (SaaS Loophole) | Bảo vệ bằng sáng chế (Patent Protection) |
| :--- | :---: | :---: | :---: | :---: |
| **MIT License** | Rất cao | ❌ Không (Ai cũng có thể lấy bán kín) | ❌ Không bảo vệ | ❌ Không có điều khoản rõ ràng |
| **Apache 2.0** | Cao | ❌ Không (Cho phép đóng mã thương mại) | ❌ Không bảo vệ | ✅ Có bảo hộ sáng chế |
| **GPLv3** | Chặt chẽ | ✅ Có (Bắt buộc mở mã khi phân phối file) | ❌ **Hổng SaaS**: Chạy trên web/cloud không phải mở mã | ✅ Có bảo hộ sáng chế |
| **GNU AGPLv3** *(Đang áp dụng)* | **Chặt chẽ & An ninh nhất** | ✅ **Bắt buộc 100% mở mã nguồn sản phẩm phái sinh** | ✅ **Chặn đứng lỗ hổng SaaS (Mục 13 AGPL)** | ✅ **Bảo hộ sáng chế & bản quyền tối đa** |

#### 🎯 Tại sao GNU AGPLv3 là "Bức tường thép" cho dự án Web & Trí Tuệ Nhân Tạo?
1. **Khắc phục lỗ hổng SaaS (SaaS Loophole - Điều 13 AGPLv3)**:
   - Với GPL thông thường hoặc MIT, một công ty lớn có thể lấy toàn bộ code AI của bạn, đặt lên máy chủ đám mây của họ để bán dịch vụ thu tiền hàng triệu USD mà không cần chia sẻ lại 1 dòng code nào (vì họ chỉ cho người dùng "tương tác qua mạng" chứ không gửi file cài đặt).
   - **GNU AGPLv3 bịt kín lỗ hổng này**: Bất kỳ ai sửa đổi hoặc host mã nguồn SMART AI trên máy chủ mạng (Web server/Cloud/SaaS) **đều bắt buộc theo luật phải công khai toàn bộ mã nguồn cải tiến** cho người dùng mạng tải về miễn phí. Kẻ gian không thể "đánh cắp" thuật toán biến thành của riêng.
2. **Quyền sở hữu trí tuệ của tác giả Tài Anh được giữ nguyên**:
   - Tên tác giả `Tài Anh` và email `phamngoctaianh6@gmail.com` cùng thông cáo bản quyền phải luôn hiển thị trang trọng trên mọi phiên bản phái sinh.
3. **Cơ chế chống kiện tụng bằng sáng chế (Patent Retaliation)**:
   - Bất kỳ ai sử dụng mã nguồn này nếu quay lại kiện tác giả về bằng sáng chế sẽ bị tự động tước bỏ toàn bộ quyền sử dụng mã nguồn ngay lập tức.

---

### PHẦN 2: CÁC BIỆN PHÁP BẢO VỆ PHÁP LÝ VÀ KỸ THUẬT NÂNG CAO

Để bảo vệ phần mềm toàn diện, việc kết hợp giữa **Pháp lý** và **Kỹ thuật mật mã** là tiêu chuẩn của các hệ thống an ninh hiện đại:

#### 1. Đăng ký Bản quyền Tác giả tại Việt Nam (Cục Bản Quyền Tác Giả - COV)
- **Cơ quan thẩm quyền:** Cục Bản quyền tác giả (Bộ Văn hóa, Thể thao và Du lịch).
- **Hồ sơ gồm:**
  1. Tờ khai đăng ký quyền tác giả cho chương trình máy tính.
  2. 02 đĩa CD/USB chứa mã nguồn (`index.html`, `js/`, `css/`).
  3. 02 bản in toàn bộ mã nguồn trên giấy A4 kèm tài liệu mô tả giao diện (có thể in từ `README.md` và `security-audit.md`).
  4. Bản sao CCCD của tác giả Tài Anh.
- **Giá trị:** Khi có Giấy chứng nhận đăng ký quyền tác giả, bất kỳ cá nhân hay tổ chức nào sao chép trái phép mà không tuân thủ AGPLv3 sẽ bị xử lý vi phạm sở hữu trí tuệ theo Điều 28 & Điều 200 Luật Sở hữu trí tuệ Việt Nam.

#### 2. Kỹ thuật Xác thực Bản quyền Kỹ thuật số (Cryptographic Digital Licensing Key)
- Dự án SMART AI được trang bị thuật toán sinh và kiểm tra License Key bằng mật mã học **HMAC-SHA-256** tích hợp ngay trong [js/crypto-security.js](file:///d:/app_lam_vui/js/crypto-security.js):
  - Khóa bản quyền có cấu trúc: `SMART-AI-[EDITION]-[EXPIRY_TIMESTAMP]-[HMAC_SIGNATURE]`
  - Ràng buộc trực tiếp với dấu vân tay trình duyệt/máy tính (Hardware/Browser Fingerprint).
  - Có thể kích hoạt các gói: `COMMUNITY`, `ACADEMIC_RESEARCH`, hoặc `ENTERPRISE_PRO`.

#### 3. Làm rối mã nguồn (Code Obfuscation) khi xuất bản thương mại
- Trước khi đóng gói cho khách hàng hoặc đưa lên production, mã JavaScript có thể chạy qua công cụ Obfuscator:
  - Đổi tên toàn bộ biến hàm thành ký tự vô nghĩa (`_0x4a12`, `_0x8b3f`).
  - Mã hóa chuỗi String sang mảng Hex / Base64.
  - Chèn mã tự bảo vệ (Self-Defending): nếu người dùng mở F12 DevTools hoặc cố tình sửa logic thì chương trình tự động khóa luồng.

#### 4. Ký số Mã nguồn (Code Signing Certificate)
- Khi đóng gói dưới dạng ứng dụng máy tính (.exe qua Electron/Tauri hoặc PWA Signed Package), tệp tin được ký bằng Chứng thư số (Sectigo, DigiCert) để ngăn chặn hệ điều hành Windows Defender báo cờ vàng "Unknown Publisher", đảm bảo uy tín tối đa cho tác giả.

---

### PHẦN 3: ĐIỀU KHOẢN KÉP CHO THƯƠNG MẠI (COMMERCIAL DUAL-LICENSING)
Nếu một doanh nghiệp hoặc tổ chức muốn sử dụng SMART AI nhưng **KHÔNG MUỐN công khai mã nguồn** của họ theo yêu cầu của AGPLv3, họ **BẮT BUỘC** phải liên hệ trực tiếp với tác giả **Tài Anh** (`phamngoctaianh6@gmail.com`) để mua Giấy phép Thương mại Độc quyền (Commercial Proprietary License). Mọi hành vi tự ý đóng mã mà không có sự đồng ý bằng văn bản của tác giả đều là vi phạm pháp luật quốc tế.
