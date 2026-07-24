# Quy Trình Chuẩn Deploy Website Base44 Từ GitHub Lên Cloudflare Workers / Pages (SOP)

Tài liệu này tổng hợp chi tiết nguyên nhân, giải pháp và quy trình từng bước (Step-by-Step) để đưa bất kỳ dự án source code nào xuất từ **Base44** lên **Cloudflare Workers / Pages** chạy độc lập (Standalone SPA), mượt mà và 100% không bị lỗi màn hình trắng hay lỗi API (405 Method Not Allowed / 404 Not Found).

---

## 📌 1. BẢN CHẤT VẤN ĐỀ (Vì sao dự án Base44 bị lỗi khi đưa lên Cloudflare?)

Source code xuất từ Base44 chứa 2 thư viện gốc:
1. **`@base44/vite-plugin`**: Chèn các script canvas visual editor & telemetry analytics ngầm.
2. **`@base44/sdk`**: Chứa bộ đếm thời gian ngầm (`createAnalyticsModule`) tự động gửi HTTP POST định kỳ tới `/api/apps/.../analytics/track/batch`.

Khi đưa lên Cloudflare phồng phục vụ trang tĩnh (Static Assets SPA):
- **Lỗi 1 - Màn hình trắng không hiển thị gì**: `AuthContext.jsx` cố gọi API `/api/apps/public/...` không tồn tại, bị lỗi làm kẹt ứng dụng React.
- **Lỗi 2 - Lỗi 405 (Method Not Allowed)**: SDK và Vite plugin liên tục gửi HTTP POST `/api/apps/.../analytics/track/batch`. Cloudflare chỉ phục vụ file tĩnh nên từ chối method POST tới URL này.
- **Lỗi 3 - Lỗi 404 / Unexpected Token `<`**: Các hàm gọi dữ liệu `base44.entities.<Entity>.list()` gửi request GET `/api/...`. Cloudflare trả về file `index.html` (SPA fallback), làm Axios bị lỗi khi parse HTML thành JSON.

---

## 📋 2. QUY TRÌNH NĂM BƯỚC CHUẨN BỊ SOURCE CODE (SOP CHECKLIST)

### 🔹 BƯỚC 1: Tắt Plugin Analytics & Visual Editor trong `vite.config.js`

Mở file [`vite.config.js`](file:///d:/beauty-salon/vite.config.js) và tắt toàn bộ tùy chọn theo dõi ngầm:

```javascript
import base44 from "@base44/vite-plugin"
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  logLevel: 'error',
  plugins: [
    base44({
      legacySDKImports: process.env.BASE44_LEGACY_SDK_IMPORTS === 'true',
      hmrNotifier: false,
      navigationNotifier: false,
      analyticsTracker: false,
      visualEditAgent: false
    }),
    react(),
  ]
});
```

---

### 🔹 BƯỚC 2: Vô hiệu hóa bộ đếm SDK & Thêm Proxy Standalone trong `src/api/base44Client.js`

Mở file [`src/api/base44Client.js`](file:///d:/beauty-salon/src/api/base44Client.js) và cập nhật như sau:

```javascript
import { createClient } from '@base44/sdk';
import { appParams } from '@/lib/app-params';

const { appId, token, functionsVersion, appBaseUrl } = appParams;
const isStandalone = !appId && !appBaseUrl;

export const base44 = createClient({
  appId: appId || 'standalone',
  token,
  functionsVersion,
  serverUrl: '',
  requiresAuth: false,
  appBaseUrl: appBaseUrl || ''
});

// 1. Tắt bộ đếm thời gian gửi Analytics ngầm của Base44 SDK (Ngăn lỗi 405 track/batch)
if (base44.analytics) {
  try {
    base44.analytics.cleanup();
    base44.analytics.track = () => {};
  } catch (e) {
    // Ignore cleanup errors
  }
}

// 2. Ở chế độ Standalone không có Base44 backend, dùng Proxy để trả dữ liệu rỗng lập tức
// Giúp trang web tự động dùng FALLBACK_* data mà không phát bất kỳ request API rác nào
if (isStandalone && base44.entities) {
  base44.entities = new Proxy(base44.entities, {
    get() {
      return {
        list: async () => [],
        filter: async () => [],
        get: async () => null,
        create: async (data) => ({ id: "local", ...data }),
        update: async (id, data) => ({ id, ...data }),
        delete: async () => true,
      };
    }
  });
}
```

---

### 🔹 BƯỚC 3: Cập nhật Xử lý Auth an toàn trong `src/lib/AuthContext.jsx`

Mở file [`src/lib/AuthContext.jsx`](file:///d:/beauty-salon/src/lib/AuthContext.jsx), sửa hàm `checkAppState` để không chặn giao diện khi API vắng mặt:

```javascript
  const checkAppState = async () => {
    try {
      setIsLoadingPublicSettings(true);
      setAuthError(null);
      
      // Nếu không có appId (chạy Standalone trên Cloudflare), bỏ qua kiểm tra API
      if (!appParams.appId) {
        setIsLoadingPublicSettings(false);
        setIsLoadingAuth(false);
        setAuthChecked(true);
        return;
      }

      const appClient = createAxiosClient({
        baseURL: `/api/apps/public`,
        headers: { 'X-App-Id': appParams.appId },
        token: appParams.token,
        interceptResponses: true
      });
      
      try {
        const publicSettings = await appClient.get(`/prod/public-settings/by-id/${appParams.appId}`);
        setAppPublicSettings(publicSettings);
        if (appParams.token) {
          await checkUserAuth();
        } else {
          setIsLoadingAuth(false);
          setIsAuthenticated(false);
          setAuthChecked(true);
        }
        setIsLoadingPublicSettings(false);
      } catch (appError) {
        // Fallback an toàn: Không set authError gây kẹt màn hình trắng
        console.warn('Base44 public settings unavailable, using static fallback mode.');
        setAuthError(null);
        setIsLoadingPublicSettings(false);
        setIsLoadingAuth(false);
      }
    } catch (error) {
      setAuthError(null);
      setIsLoadingPublicSettings(false);
      setIsLoadingAuth(false);
    }
  };
```

---

### 🔹 BƯỚC 4: Tạo File Cấu hình Cloudflare `wrangler.jsonc`

Tạo file mới [`wrangler.jsonc`](file:///d:/beauty-salon/wrangler.jsonc) tại **thư mục gốc** dự án:

```jsonc
{
  "$schema": "node_modules/wrangler/config-schema.json",
  "name": "viet-beauty-salon",
  "compatibility_date": "2026-07-24",
  "observability": {
    "enabled": true
  },
  "assets": {
    "directory": "./dist",
    "not_found_handling": "single-page-application"
  },
  "compatibility_flags": [
    "nodejs_compat"
  ]
}
```

---

### 🔹 BƯỚC 5: Kiểm tra `package.json`

Đảm bảo trong [`package.json`](file:///d:/beauty-salon/package.json) có script `build` và `deploy`:

```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview",
  "deploy": "npm run build && wrangler deploy"
}
```

---

## 🚀 3. CÁC BƯỚC DEPLOY TRÊN CLOUDFLARE DASHBOARD

1. **Push code đã sửa lên GitHub**:
   ```bash
   git add .
   git commit -m "Configure Base44 project for Cloudflare Workers standalone deployment"
   git push origin main
   ```

2. **Cấu hình trên Cloudflare Dashboard**:
   - Truy cập **Workers & Pages** ➔ Chọn project của bạn.
   - Kết nối tới đúng Repository trên GitHub.
   - Vào **Settings** ➔ **Build & Deployments**:
     - **Framework preset**: `Vite`
     - **Build command**: `npm run build`
     - **Build output directory**: `dist`
     - **Root directory**: `/` (để trống)

3. **Kiểm tra kết quả**:
   - Mở website bằng **Tab ẩn danh (Incognito Mode)** hoặc xóa cache trình duyệt (`Ctrl + Shift + R`).
   - Mở **F12 (DevTools Console)** ➔ Đảm bảo không còn bất kỳ lỗi 405 / 404 rác nào. Trang web hiển thị mượt mà.
