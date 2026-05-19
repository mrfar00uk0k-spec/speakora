# English Test Platform — Setup & Deploy Guide

## خطوات التشغيل على جهازك (Local)

### 1. نزل المتطلبات
تأكد عندك Node.js مثبت:
```bash
node --version   # لازم يكون 18 أو أحدث
```

### 2. ثبت الـ packages
```bash
cd english-test
npm install
```

### 3. حط الـ API Key
افتح ملف `.env.local` وحط مفتاحك:
```
CLAUDE_API_KEY=sk-ant-api03-xxxxxxxxxxxxxxxx
```
اجيب مفتاحك من: https://console.anthropic.com

### 4. شغل المشروع
```bash
npm run dev
```
افتح المتصفح على: http://localhost:3000

---

## الرفع على Vercel (مجاناً)

### الطريقة السهلة:

**1. ارفع الكود على GitHub:**
```bash
git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/english-test.git
git push -u origin main
```

**2. افتح vercel.com:**
- اضغط "New Project"
- اختار الـ repo من GitHub
- اضغط Deploy

**3. حط الـ API Key في Vercel:**
- روح Settings → Environment Variables
- اضف: `CLAUDE_API_KEY` = مفتاحك
- اضغط Redeploy

**خلاص! موقعك شغال على النت 🎉**

---

## هيكل المشروع

```
english-test/
├── pages/
│   ├── index.jsx          ← الموقع كاملاً
│   ├── _app.js            ← Next.js wrapper
│   └── api/
│       └── ai.js          ← Backend: بيبعت للـ Claude API بأمان
├── .env.local             ← API Key (مش بيترفع على GitHub)
├── .gitignore
└── package.json
```

---

## ليه الطريقة دي آمنة؟

- الـ API Key موجود بس على السيرفر (في .env.local)
- المتصفح بيبعت للـ `/api/ai` اللي على سيرفرك
- السيرفر هو اللي يبعت لـ Claude API بالـ key
- أي حد يفتح DevTools مش هيشوف الـ key

---

## مشكلة؟

- تأكد `.env.local` موجود وفيه الـ key
- تأكد عملت `npm install`
- في Vercel: تأكد حطيت الـ Environment Variable وعملت Redeploy
