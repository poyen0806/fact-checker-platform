# Fact Checker Platform

## 專案簡介
Fact Checker Platform 是一個用於驗證網路資訊真假的平台。使用者可以輸入要查證的文章連結，系統會根據 Google Fact Check API 回傳的數據來顯示查證結果。

本專案採用 **前後端分離架構**，技術棧如下：
- **前端（Frontend）**：Next.js + React + Tailwind CSS
- **後端（Backend）**：Node.js + Express
- **資料來源**：Google Fact Check API
- **測試（Testing）**：
  - 前端：尚未完成，計畫使用 Jest + React Testing Library。
  - 後端：Jest + Supertest
- **CI/CD**： 尚未實作，未來計畫整合 Jenkins 或 GitHub Actions 進行自動化部署。

---

## 目錄結構
```
fact-checker-platform/
├── frontend/                     # 前端（Next.js）
│   ├── app/                      # Next.js App Directory
│   │   ├── page.tsx              # 主頁面
│   │   ├── layout.tsx            # 頁面佈局
│   │   ├── globals.css           # 全局樣式
│   ├── public/                   # 靜態資源（尚未使用）
│   ├── package.json              # 前端相依套件
│   └── ...
│
├── backend/                      # 後端（Express.js）
│   ├── controllers/              # 控制器
│   ├── routes/                   # 路由
│   ├── services/                 # 服務層
│   ├── tests/                    # 單元測試
│   ├── server.js                 # 主要後端伺服器
│   ├── package.json              # 後端相依套件
│   ├── .env                      # 環境變數
│   └── ...
│
└── README.md                     # 總覽文件
```

---

## 環境需求
- Node.js 18+
- npm 9+
- Git
- Google Fact Check API Key

---

## 安裝與運行

### 1. Clone 專案
```sh
git clone https://github.com/poyen0806/fact-checker-platform.git
cd fact-checker-platform
```

### 2. 設定後端環境變數
在 `backend/.env` 中填入：
```
PORT=5000
GOOGLE_FACT_CHECK_API_KEY=your_api_key_here
```

### 3. 安裝並啟動後端
```sh
cd backend
npm install
npm run dev
```

### 4. 安裝並啟動前端
```sh
cd ../frontend
npm install
npm run dev
```

前端應該會運行在 `http://localhost:3000`，後端應該會運行在 `http://localhost:5000`。

---

## API 文件

### 1. 取得查證結果
**GET** `/api/fact-check?query=your-query`

#### Request
```sh
curl -X GET 'http://localhost:5000/fact-check?query=climate change'
```

#### Response
```json
{
  "claims": [
    {
      "text": "Postarea care sugerează o contradicție între un eveniment meteorologic local și discuțiile despre schimbările climatice globale",
      "claimant": "Viral social media post",
      "claimDate": "2025-01-26T00:00:00Z",
      "claimReview": [
        {
          "publisher": {
            "name": "Factual.ro",
            "site": "factual.ro"
          },
          "url": "https://www.factual.ro/dezinformari-retele-sociale/fals-furtuna-de-zapada-din-florida-si-incalzirea-globala/",
          "title": "FALS| Furtuna de zăpăda din Florida și încălzirea globală",
          "reviewDate": "2025-02-25T00:00:00Z",
          "textualRating": "FALS",
          "languageCode": "ro"
        }
      ]
    }
  ],
  "nextPageToken": "CAo"
}
```

---

## 測試

### 後端測試
```sh
cd backend
npm test
```

---

## 未來規劃
- [ ] 優化 UI/UX 設計
- [ ] 增加身份驗證（OAuth）
- [ ] 新增歷史查詢功能
- [ ] 實作 CI/CD，使用 Jenkins 或 GitHub Actions 自動化部署
- [ ] 實作單元測試與整合測試

---

## 貢獻
歡迎提交 Pull Request 或 Issues，一起改善這個專案！

