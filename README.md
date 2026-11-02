# SMART AI – Adaptive Artificial Intelligence System for Personalized Learning and Student Knowledge Gap Prediction
> **Tên tiếng Việt:** SMART AI – Nghiên cứu phát triển hệ thống trí tuệ nhân tạo học tập thích nghi nhằm cá nhân hóa lộ trình học tập và dự đoán lỗ hổng kiến thức của học sinh.

[![PWA Ready](https://img.shields.io/badge/PWA-Ready-2563EB.svg)](https://web.dev/progressive-web-apps/)
[![Security](https://img.shields.io/badge/Security-Cloudflare%20Audit%20Passed-16A34A.svg)](./security-audit.md)
[![Zero Install](https://img.shields.io/badge/Installation-Zero%20Dependency%20(Open%20%26%20Run)-blue.svg)](#)
[![Design](https://img.shields.io/badge/UI%2FUX-Alabaster%20Porcelain%20%26%20GSAP-0F172A.svg)](#)

---

## 📖 GIỚI THIỆU & MỤC TIÊU NGHIÊN CỨU

Trong kỷ nguyên số, phương pháp học tập truyền thống "đồng nhất một kích cỡ cho mọi học sinh" (one-size-fits-all) bộc lộ sự kém hiệu quả khi không thể phát hiện kịp thời các **lỗ hổng kiến thức gốc rễ** (Root Cause Deficits). Một học sinh gặp khó khăn trong bài toán Đạo hàm hoặc Tối ưu hóa AI thường không phải do các em kém tư duy, mà bắt nguồn từ sự thiếu hụt tại các mắt xích tiên đề phía trước (như Phân tích đa thức, Hằng đẳng thức hay Giới hạn).

**SMART AI** được phát triển nhằm giải quyết triệt để vấn đề này bằng việc tích hợp:
1. **Bayesian Knowledge Tracing (BKT)**: Tính toán chính xác độ thành thạo $P(L_t)$ của từng năng lực dựa trên mô hình Markov ẩn (Hidden Markov Model - HMM).
2. **Knowledge Space Theory (KST) & Prerequisite DAG**: Mô hình hóa đồ thị có hướng không chu trình thể hiện sự phụ thuộc giữa các khái niệm.
3. **Thuật toán Truy vết Lỗ hổng Gốc (Root Cause Gap Inference)**: Phân biệt giữa sai lầm nhận thức cốt lõi (Core Misconception) và sơ suất nhất thời (Slip).
4. **Lập lịch Topo Cá nhân hóa (Topological Adaptive Roadmap)**: Tự động sắp xếp thứ tự học tối ưu dựa trên mức độ nghiêm trọng của lỗ hổng.
5. **Gia sư Socratic AI Đa tầng**: Kết hợp trực tiếp **Google Gemini 2.5 Flash** và **Bộ máy suy luận nhận thức cục bộ (Offline Cognitive AI Engine)** hoạt động 100% miễn phí mà không cần kết nối mạng.

---

## 🚀 ĐẶC TÍNH NỔI BẬT

### 1. Chạy Tức Thì – Không Cần Cài Đặt (Zero Configuration)
- **100% Miễn phí & Độc lập**: Không cần cài đặt Node.js, Python, Docker hay bất kỳ phần mềm nào khác.
- Chỉ cần **mở file `index.html`** trên trình duyệt bất kỳ (Google Chrome, Microsoft Edge, Safari, Firefox, Cốc Cốc) là hệ thống hoạt động đầy đủ tính năng.
- **Hỗ trợ PWA (Progressive Web App)**: Cho phép bấm "Cài đặt ứng dụng" trên thanh địa chỉ để chạy như một phần mềm độc lập mượt mà trên máy tính và điện thoại.

### 2. Thiết Kế Đẳng Cấp (React Bits, Tailwind CSS & Alabaster Standards)
- Tuân thủ nghiêm ngặt chuẩn thiết kế hiện đại:
  - **Tích hợp Tailwind CSS**: Tiện ích styling siêu nhẹ, tùy biến cấu hình hệ màu sứ Alabaster Porcelain (`#F7F8FA`, `#FFFFFF`) và không gian Obsidian (`#08090C`, `#0D0F14`).
  - **Bộ hiệu ứng thị giác React Bits (reactbits.dev)**:
    - `SpotlightCard`: Ánh sáng radial phát quang lướt theo tọa độ con trỏ chuột trên từng thẻ Bento.
    - `ShinyText`: Hiệu ứng quét ánh kim titan chuyển sắc trên tiêu đề chính.
    - `MagneticButton`: Nút bấm có lực hút từ tính mềm mại theo quán tính di chuột.
    - `AmbientGridPattern`: Lưới tọa độ vector chuyển động ẩn hiện tương tác ở tầng nền Canvas.
  - **Bo góc chuẩn xác 6px (`rounded-[6px]`)**: Đồng bộ toàn bộ thẻ, nút bấm, ô nhập, hộp thoại.
  - **Hiệu ứng đường viền phụ sub-pixel 1px CNC**: Tạo cảm giác tinh xảo như bề mặt kim loại cắt CNC.
  - **Hệ thống chuyển động GSAP 3.15**: Chuyển động siêu mượt ở tần số quét 60fps/120fps.

### 3. Bảo Mật Cấp Ngân Hàng, Cloudflare Turnstile & Anti-Bot Captcha
- **Cơ chế xác thực con người Cloudflare Turnstile & PoW (Thay thế reCAPTCHA)**:
  - Tích hợp rào chắn chống bot không gây phiền toái (không cần chọn hình ảnh đèn giao thông hay vạch qua đường lỗi thời).
  - Sử dụng thuật toán **Bằng chứng Công việc Mật mã học (Proof-of-Work - PoW)** giải câu đố băm SHA-256 trong 150ms để tạo chữ ký số chống spam trước khi nộp bài thi hoặc gửi email.
- **Két sắt mã hóa khóa API**: Sử dụng thuật toán `AES-GCM-256` cùng `PBKDF2` (100.000 vòng lặp) từ Web Crypto API để mã hóa Gemini API Key, tuyệt đối không lưu chuỗi khóa dạng rõ (plaintext).
- **Phòng chống XSS đa tầng**: Toàn bộ chuỗi hiển thị đều được mã hóa thực thể HTML (`&`, `<`, `>`, `"`, `'`).
- **Chính sách CSP nghiêm ngặt**: Chặn đứng mọi hành vi nạp mã độc từ nguồn bên ngoài.
- **Chữ ký toàn vẹn phiên (Anti-Tamper Digest)**: Mỗi kết quả chẩn đoán được băm mã hóa một chiều bằng `SHA-256`, ngăn ngừa chỉnh sửa điểm năng lực.
- **Giới hạn tần suất (Sliding Window Rate Limiter)**: Bảo vệ hệ thống khỏi các hành vi gửi câu hỏi spam.

### 4. Xuất Báo Cáo & Mã Xác Thực Qua Gmail
- Tính năng 1 chạm **"Gửi báo cáo qua Gmail"**: Tự động tổng hợp đầy đủ kết quả chẩn đoán, xác suất BKT, danh sách các lỗ hổng kiến thức gốc rễ và lộ trình học tập đề xuất vào mẫu thư Gmail chuẩn bị sẵn để gửi cho giáo viên hoặc phụ huynh.
- Sao chép chuỗi mã hóa phiên học tập an toàn kèm chữ ký SHA-256 vào bộ nhớ tạm.

---

## 📊 NỀN TẢNG TOÁN HỌC & THUẬT TOÁN

### 1. Bayesian Knowledge Tracing (BKT)
Xác suất một học sinh nắm vững một kỹ năng sau lần quan sát thứ $t$:

$$\text{Nếu đúng:} \quad P(L_t \mid \text{correct}) = \frac{P(L_{t-1}) \cdot (1 - S)}{P(L_{t-1}) \cdot (1 - S) + (1 - P(L_{t-1})) \cdot G}$$

$$\text{Nếu sai:} \quad P(L_t \mid \text{incorrect}) = \frac{P(L_{t-1}) \cdot S}{P(L_{t-1}) \cdot S + (1 - P(L_{t-1})) \cdot (1 - G)}$$

Sau đó tính toán cơ hội tiếp thu kỹ năng (Transition):
$$P(L_{t+1}) = P(L_t \mid \text{obs}) + (1 - P(L_t \mid \text{obs})) \cdot T$$

*Trong đó:*
- $P(L_0)$: Xác suất tiền nghiệm ban đầu.
- $T$: Xác suất học được kỹ năng mới qua bài tập.
- $G$: Xác suất đoán mò thành công (Guess).
- $S$: Xác suất sơ suất làm sai dù đã nắm vững (Slip).

### 2. Knowledge Space Theory (KST) & Root Cause Propagation
Khi phát hiện học sinh làm sai ở một nút $C$, thuật toán duyệt ngược cây phụ thuộc tiên đề $\text{Prereq}(C)$ để tìm nút thấp nhất có độ thành thạo dưới ngưỡng $0.70$. Điểm này được gắn nhãn là **LỖ HỔNG GỐC RỄ (ROOT CAUSE)**, giúp học sinh tập trung khắc phục điểm tắc nghẽn chính thay vì học lan man.

---

## 🛠️ CẤU TRÚC MÃ NGUỒN

```
d:\app_lam_vui\
├── index.html               # Ứng dụng SPA chính, tải trực tiếp trên trình duyệt
├── manifest.json            # Cấu hình PWA cài đặt App trên Desktop & Mobile
├── sw.js                    # Service Worker hỗ trợ chạy Offline và cache
├── security-audit.md        # Báo cáo kiểm toán bảo mật chi tiết theo OWASP & Cloudflare
├── README.md                # Tài liệu khoa học và hướng dẫn sử dụng
├── css/
│   └── styles.css           # Hệ thống giao diện Alabaster Porcelain, Bento Grid, 6px radius
├── js/
│   ├── curriculum-data.js   # Ngân hàng tri thức đa lĩnh vực & đồ thị phụ thuộc DAG
│   ├── crypto-security.js   # Module bảo mật Web Crypto API (AES-GCM-256, SHA-256, XSS)
│   ├── knowledge-engine.js  # Bộ máy thuật toán BKT, KST & xếp lịch Topo lộ trình thích nghi
│   ├── ai-service.js        # Cổng kết nối Gemini 2.5 Flash (BYOK) + AI ngoại tuyến Socratic
│   └── ui-controller.js     # Điều phối GSAP animations, biểu đồ Canvas, tabs & Gmail export
└── icons/
    ├── icon.svg             # Vector biểu trưng thương hiệu SMART AI
    ├── icon-192.png         # Icon PWA 192x192
    └── icon-512.png         # Icon PWA 512x512
```

---

## 💻 HƯỚNG DẪN CHẠY WEB & TỰ ĐỘNG BUILD APP ĐA NỀN TẢNG

### 1. Cách Chạy Bản Web (3 Cách Cực Dễ)
- **Cách 1 (Nhanh nhất - 1 chạm):** Click đúp vào file `start-web.bat` hoặc click đúp trực tiếp vào [index.html](file:///d:/app_lam_vui/index.html). Trình duyệt sẽ mở ứng dụng ngay lập tức với đầy đủ tính năng!
- **Cách 2 (Máy chủ cục bộ Local Server):** Click đúp vào file `start-server.bat`. Hệ thống sẽ tự động khởi động server tại `http://localhost:8080`.
- **Cách 3 (Lệnh Command Line):**
  ```bash
  npm run serve
  # Hoặc python -m http.server 8080
  ```

---

### 📱 2. Tự Động Build App Cho Windows, macOS và Android

Hệ thống đã được trang bị **2 cơ chế tự động biên dịch App** vô cùng mạnh mẽ:

#### Cơ chế 1: Tự động 100% bằng GitHub Actions Cloud (Khuyên dùng - Không cần cài nặng máy)
- Mỗi khi code được push lên GitHub `https://github.com/taianh20102011/Appp.git`, hệ thống GitHub Actions CI/CD (`.github/workflows/build-all-platforms.yml`) sẽ **tự động khởi chạy máy ảo đám mây**:
  - Máy ảo **Windows**: Tự build ra file **`SMART-AI-Setup.exe`** và **`SMART-AI-Portable.exe`**.
  - Máy ảo **macOS**: Tự build ra file **`SMART-AI.dmg`** và **`SMART-AI-mac.zip`**.
  - Máy ảo **Ubuntu + Android SDK**: Tự build ra file **`SMART-AI.apk`** cho điện thoại Android.
- Bạn chỉ cần vào mục **[Releases](https://github.com/taianh20102011/Appp/releases)** trên trang GitHub của bạn và bấm **Tải về (Download)** file cài đặt tương ứng!

#### Cơ chế 2: Tự Build Cục Bộ Ngay Trên Máy Tính Bằng 1-Click
- **Build Windows App (.exe):**
  - Click đúp vào file `build-windows-app.bat`. File `.exe` cài đặt và bản Portable sẽ tự động được sinh ra trong thư mục `dist/`.
- **Build macOS App (.dmg):**
  - Chạy file: `./build-mac-app.sh` (hoặc lệnh `npm run build:mac`).
- **Build Android App (.apk):**
  - Click đúp vào file `build-android-app.bat` (hoặc lệnh `npm run build:android`).

---

### 3. Hướng Dẫn Sử Dụng Các Tính Năng Cốt Lõi
- Chọn môn học mong muốn (Toán học cho AI, Khoa học Máy tính & Lập trình...).
- Lựa chọn các phương án trả lời. Hệ thống BKT sẽ tính toán theo thời gian thực và hiển thị phản hồi ngay lập tức về sai lệch nhận thức nếu làm sai.

### Bước 3: Khám Phá Đồ Thị Tri Thức & Radar
- Chuyển sang tab **"Đồ thị & Ma trận"** để xem Biểu đồ Radar năng lực đa chiều và Đồ thị quan hệ tiên đề DAG trực quan.

### Bước 4: Nhận Lộ Trình & Gửi Báo Cáo
- Chuyển sang tab **"Lộ trình thích nghi"**.
- Bấm **"Gửi báo cáo qua Gmail"** để mở giao diện soạn thảo thư với toàn bộ phân tích khoa học đã được định dạng sẵn.
- Bấm **"Sao chép mã phiên"** để nhận chuỗi xác thực toàn vẹn `SHA-256`.

### Bước 5: Tương Tác Cùng Gia Sư Ảo Socratic
- Chuyển sang tab **"Gia sư Socratic"** để hỏi đáp, nhận hướng dẫn tư duy gợi mở sâu sắc.
- Bấm nút **"⚡ Gemini 2.5"** trên thanh tiêu đề nếu bạn muốn nhập API Key cá nhân để mở khóa năng lực siêu trí tuệ Gemini 2.5 Flash trực tiếp từ Google.

---

## 📜 GIẤY PHÉP BẢN QUYỀN & CHÍNH SÁCH BẢO HỘ PHÁP LÝ

Dự án được bảo hộ quyền tác giả chính thức bởi:
- **Tác giả:** **Tài Anh** (`phamngoctaianh6@gmail.com`)
- **Giấy phép cốt lõi (Core Open Source License):** [GNU Affero General Public License v3.0 (AGPLv3)](./LICENSE)
- **Chính sách pháp lý & Giải pháp kỹ thuật bảo vệ:** Xem chi tiết tại [LICENSE-POLICY.md](./LICENSE-POLICY.md)

### 🎯 Tại sao lại chọn GNU AGPLv3?
- **Khắc phục triệt để lỗ hổng SaaS (SaaS Loophole - Điều 13 AGPL)**: Khác với MIT hay Apache 2.0 (vốn cho phép người khác lấy code của bạn, đóng gói kín và mở dịch vụ đám mây thu tiền), GNU AGPLv3 bắt buộc bất kỳ ai host hoặc cải tiến hệ thống trên mạng Internet đều phải công khai toàn bộ mã nguồn cải tiến cho người dùng.
- **Bảo hộ sáng chế (Patent Protection)**: Chống lại các vụ kiện tụng bằng sáng chế từ bên thứ ba.
- **Hệ thống xác thực bản quyền số (Cryptographic Licensing)**: Tích hợp cơ chế sinh & xác thực License Key gắn mã máy (Device Fingerprint) bằng HMAC-SHA-256 trong tệp `js/crypto-security.js`.
- **Thương mại hóa kép (Dual Licensing)**: Nếu các tổ chức/doanh nghiệp muốn dùng phần mềm mà không muốn mở mã nguồn phái sinh, họ bắt buộc phải liên hệ với tác giả để mua giấy phép thương mại riêng biệt.
