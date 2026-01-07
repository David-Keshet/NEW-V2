# CRM Login - BMS 2025

דף התחברות מודרני למערכת CRM עם חיבור ל-Supabase והגדרות Vercel.

## 🚀 תכונות

- ✅ עיצוב מודרני עם Tailwind CSS
- ✅ חיבור למסד נתונים Supabase
- ✅ תמיכה בעברית ו-RTL
- ✅ מצב טעינה והודעות שגיאה
- ✅ משתמשי דמו (Fallback)
- ✅ מוכן לפריסה ב-Vercel

## 📋 דרישות מקדימות

- Node.js 16+
- npm או yarn

## 🛠️ התקנה והפעלה

### 1. התקנת תלותיות
```bash
npm install
```

### 2. הפעלת שרת פיתוח
```bash
npm start
```
האפליקציה תפעל ב- http://localhost:3000

### 3. בנייה לפריסה
```bash
npm run build
```

## 🔐 פרטי התחברות

### משתמשי דמו (Fallback):
- **admin** / **admin123** - מנהל מערכת
- **user** / **user123** - משתמש רגיל

### חיבור ל-Supabase:
- **URL**: https://snyysiklfbaycdshgsif.supabase.co
- **טבלה**: bms_users
- **שדות**: id, username, password, full_name, role, email

## 🌐 פריסה ב-Vercel

### שיטה 1: CLI
```bash
# התקנת Vercel CLI
npm i -g vercel

# פריסה
npm run deploy
```

### שיטה 2: GitHub Integration
1. חבר את ה-repo ל-Vercel
2. Vercel יזהה אוטומטית את פרויקט React
3. הגדר משתני סביבה ב-dashboard של Vercel

## 📁 מבנה הפרויקט

```
login/
├── 📄 package.json              # קובץ הגדרות
├── 📄 vercel.json              # הגדרות Vercel
├── 📁 public/                  # קבצים סטטיים
├── 📁 src/
│   ├── 📄 App.js              # קומפוננטה ראשית
│   ├── 📄 index.js            # נקודת כניסה
│   ├── 📁 components/         # קומפוננטות
│   │   └── 📄 LoginPage.jsx   # דף התחברות
│   ├── 📁 config/             # הגדרות
│   │   └── 📄 supabase.js     # חיבור ל-Supabase
│   └── 📁 styles/             # סטיילים
└── 📁 node_modules/           # תלותיות
```

## 🔧 הגדרות סביבה

ניתן להגדיר את המשתנים הבאים בקובץ `.env`:

```env
REACT_APP_SUPABASE_URL=https://snyysiklfbaycdshgsif.supabase.co
REACT_APP_SUPABASE_ANON_KEY=your-key-here
```

## 📝 הערות חשובות

- הסיסמאות כרגע נשמרות כטקסט פשוט (לא מומלץ לפרודקשן!)
- מומלץ להוסיף הצפנת סיסמאות (bcrypt)
- יש fallback למשתמשי דמו אם Supabase לא זמין
- המערכת תומכת בעברית מלאה ו-RTL

## 🤝 תרומות

1. Fork את הפרויקט
2. צור branch (`git checkout -b feature/AmazingFeature`)
3. Commit (`git commit -m 'Add some AmazingFeature'`)
4. Push (`git push origin feature/AmazingFeature`)
5. פתח Pull Request

## 📄 רישיון

פרויקט זה הוא חלק ממערכת BMS 2025

---

🚀 **BMS 2025 - Business Management System**
