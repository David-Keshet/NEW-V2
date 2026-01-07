import React, { useState, useEffect } from 'react';
import { loginUser } from '../config/supabase';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Add Tailwind CSS CDN script
    const script1 = document.createElement('script');
    script1.src = 'https://cdn.tailwindcss.com?plugins=forms,container-queries';
    script1.async = true;
    document.head.appendChild(script1);

    // Add Tailwind config script
    const script2 = document.createElement('script');
    script2.id = 'tailwind-config';
    script2.textContent = `
      tailwind.config = {
        darkMode: "class",
        theme: {
          extend: {
            colors: {
              "primary": "#3b82f6",
              "primary-hover": "#2563eb",
              "background-light": "#0f172a",
              "background-off": "#020617",
              "background-dark": "#0f172a",
              "surface-dark": "#1e293b",
              "text-main": "#f1f5f9",
              "text-secondary": "#94a3b8",
              "border-subtle": "#334155",
            },
            fontFamily: {
              "display": ["Manrope", "Noto Sans Hebrew", "sans-serif"],
              "sans": ["Manrope", "Noto Sans Hebrew", "sans-serif"],
            },
            borderRadius: {
              "DEFAULT": "0.25rem",
              "lg": "0.5rem",
              "xl": "0.75rem",
              "2xl": "1rem",
              "full": "9999px"
            },
          },
        },
      }
    `;
    document.head.appendChild(script2);

    // Add Google Fonts
    const fontLink1 = document.createElement('link');
    fontLink1.href = 'https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&family=Noto+Sans+Hebrew:wght@100..900&display=swap';
    fontLink1.rel = 'stylesheet';
    document.head.appendChild(fontLink1);

    const fontLink2 = document.createElement('link');
    fontLink2.href = 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap';
    fontLink2.rel = 'stylesheet';
    document.head.appendChild(fontLink2);

    // Add custom styles
    const style = document.createElement('style');
    style.textContent = `
      * {
        box-sizing: border-box;
      }
      
      html, body {
        margin: 0;
        padding: 0;
        background-color: #020617 !important;
        color: #f1f5f9 !important;
      }
      
      #root {
        min-height: 100vh;
        background-color: #020617 !important;
      }
      
      .App {
        background-color: #020617 !important;
        min-height: 100vh;
      }
      
      ::-webkit-scrollbar {
        width: 8px;
      }
      ::-webkit-scrollbar-track {
        background: #0f172a; 
      }
      ::-webkit-scrollbar-thumb {
        background: #334155; 
        border-radius: 4px;
      }
      ::-webkit-scrollbar-thumb:hover {
        background: #475569; 
      }
      input:-webkit-autofill,
      input:-webkit-autofill:hover, 
      input:-webkit-autofill:focus, 
      input:-webkit-autofill:active{
        -webkit-box-shadow: 0 0 0 30px #1e293b inset !important;
        -webkit-text-fill-color: #f1f5f9 !important;
        caret-color: white;
      }
    `;
    document.head.appendChild(style);

    // Set HTML attributes
    document.documentElement.classList.add('dark');
    document.documentElement.setAttribute('dir', 'rtl');
    document.documentElement.setAttribute('lang', 'he');

    return () => {
      // Cleanup scripts and styles if component unmounts
      document.head.removeChild(script1);
      document.head.removeChild(script2);
      document.head.removeChild(fontLink1);
      document.head.removeChild(fontLink2);
      document.head.removeChild(style);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!username || !password) {
      setError('אנא הכנס שם משתמש וסיסמה');
      setLoading(false);
      return;
    }

    try {
      const result = await loginUser(username, password);
      
      if (result.success) {
        console.log('Login successful:', result.user);
        // כאן ניתן להוסיף ניווט לדף הבית או שמירת טוקן
        alert(`התחברות הצליחה! ברוך הבא ${result.user.full_name}`);
        // ניתן להשתמש ב-navigate או useNavigate מ-React Router
      } else {
        setError(result.error || 'התחברות נכשלה');
      }
    } catch (err) {
      setError('אירעה שגיאה בלתי צפויה');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-background-off font-display text-text-main antialiased h-screen overflow-hidden flex flex-col">
      <div className="flex h-full w-full flex-1 overflow-hidden">
        {/* Login Form Side */}
        <div className="flex flex-1 flex-col justify-center items-center bg-background-off px-6 py-12 lg:px-20 overflow-y-auto relative border-l border-white/5">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-l from-primary to-blue-900"></div>
          
          <div className="w-full max-w-[420px] flex flex-col gap-8">
            {/* Logo and Title */}
            <div className="flex items-center gap-3 mb-2">
              <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-blue-500/10 text-primary border border-blue-500/20 shadow-sm shadow-blue-900/20">
                <span className="material-symbols-outlined text-[26px]">grid_view</span>
              </div>
              <span className="text-2xl font-bold tracking-tight text-white">CRM Pro</span>
            </div>

            {/* Welcome Text */}
            <div className="flex flex-col gap-3">
              <h1 className="text-white tracking-tight text-3xl font-extrabold leading-tight">
                כניסה למערכת
              </h1>
              <p className="text-slate-400 text-base font-normal leading-relaxed">
                הזינו את פרטי המשתמש שלכם כדי לגשת ללוח הבקרה ולניהול המשימות.
              </p>
              
              {/* Error Message */}
              {error && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg text-sm font-medium">
                  {error}
                </div>
              )}
            </div>

            {/* Login Form */}
            <form className="flex flex-col gap-5 w-full mt-2" onSubmit={handleSubmit}>
              {/* Username Field */}
              <div className="flex flex-col gap-2">
                <label className="text-slate-300 text-sm font-bold leading-normal" htmlFor="username">
                  שם משתמש
                </label>
                <div className="relative group">
                  <input
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-2 focus:ring-primary/40 border border-slate-700 bg-surface-dark focus:border-primary h-12 placeholder:text-slate-500 px-4 pl-12 text-sm font-medium leading-normal transition-all duration-200 shadow-sm group-hover:border-slate-600"
                    id="username"
                    type="text"
                    placeholder="הכנס שם משתמש"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-primary transition-colors">
                    <span className="material-symbols-outlined text-[20px]">person</span>
                  </div>
                </div>
              </div>

              {/* Password Field */}
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <label className="text-slate-300 text-sm font-bold leading-normal" htmlFor="password">
                    סיסמה
                  </label>
                  <a className="text-primary text-sm font-semibold hover:underline hover:text-primary-hover transition-colors" href="#">
                    שכחתם סיסמה?
                  </a>
                </div>
                <div className="relative group">
                  <input
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-2 focus:ring-primary/40 border border-slate-700 bg-surface-dark focus:border-primary h-12 placeholder:text-slate-500 px-4 pl-12 text-sm font-medium leading-normal transition-all duration-200 shadow-sm group-hover:border-slate-600"
                    id="password"
                    type="password"
                    placeholder="******"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-primary transition-colors">
                    <span className="material-symbols-outlined text-[20px]">lock</span>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                className="mt-4 flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 px-5 bg-primary hover:bg-primary-hover text-white text-base font-bold leading-normal tracking-wide transition-all duration-200 shadow-lg shadow-blue-900/30 active:scale-[0.98] border border-blue-400/10 disabled:opacity-50 disabled:cursor-not-allowed"
                type="submit"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="animate-spin mr-2">⟳</span>
                    <span className="truncate">מתחבר...</span>
                  </>
                ) : (
                  <>
                    <span className="truncate">התחברות</span>
                    <span className="material-symbols-outlined mr-2 text-[20px] rtl:-scale-x-100">login</span>
                  </>
                )}
              </button>
            </form>

            {/* Integrations Section */}
            <div className="flex flex-col gap-5 mt-8 pt-8 border-t border-dashed border-slate-800">
              <p className="text-xs font-bold text-slate-500 text-center uppercase tracking-widest">
                אינטגרציות פעילות
              </p>
              <div className="flex flex-wrap justify-center gap-6 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                <div className="flex items-center gap-1.5" title="Supabase Database">
                  <span className="material-symbols-outlined text-emerald-500">database</span>
                </div>
                <div className="flex items-center gap-1.5" title="WhatsApp Integration">
                  <span className="material-symbols-outlined text-green-500">chat</span>
                </div>
                <div className="flex items-center gap-1.5" title="PDF/Docs">
                  <span className="material-symbols-outlined text-red-500">picture_as_pdf</span>
                </div>
                <div className="flex items-center gap-1.5" title="GitHub">
                  <span className="material-symbols-outlined text-white">code</span>
                </div>
                <div className="flex items-center gap-1.5" title="Vercel">
                  <span className="material-symbols-outlined text-white">rocket_launch</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Visual Preview Side */}
        <div className="hidden lg:flex flex-1 relative bg-background-light items-center justify-center p-8 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-slate-950 z-0"></div>
          <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] bg-blue-600/10 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-[-20%] right-[-20%] w-[60%] h-[60%] bg-indigo-600/10 rounded-full blur-[100px]"></div>
          
          <div className="relative z-10 w-full max-w-xl aspect-[16/10] rounded-2xl overflow-hidden shadow-2xl shadow-black/50 ring-1 ring-white/10 bg-slate-800/20 backdrop-blur-xl p-1 transition-transform duration-700 hover:scale-[1.01]">
            <div className="w-full h-full bg-slate-900/50 rounded-xl border border-white/5 flex flex-col relative overflow-hidden">
              <div className="flex h-full">
                {/* Sidebar */}
                <div className="w-16 h-full border-l border-white/5 bg-slate-800/80 flex flex-col items-center py-5 gap-5">
                  <div className="w-9 h-9 rounded-xl bg-blue-500/20 flex items-center justify-center text-primary text-xs font-bold ring-1 ring-blue-500/30">
                    CRM
                  </div>
                  <div className="w-full h-px bg-white/5 my-1"></div>
                  <div className="w-8 h-8 rounded-lg bg-slate-700/50"></div>
                  <div className="w-8 h-8 rounded-lg bg-slate-700/50"></div>
                  <div className="w-8 h-8 rounded-lg bg-slate-700/50"></div>
                </div>

                {/* Main Content */}
                <div className="flex-1 flex flex-col">
                  {/* Header */}
                  <div className="h-14 border-b border-white/5 bg-slate-800/80 flex items-center px-6 justify-between">
                    <div className="h-4 w-32 bg-slate-700/50 rounded-md"></div>
                    <div className="flex gap-3">
                      <div className="h-8 w-8 rounded-full bg-slate-700/50"></div>
                    </div>
                  </div>

                  {/* Content Area */}
                  <div className="p-5 flex gap-4 h-full overflow-hidden">
                    <div className="flex-1 bg-slate-800/30 rounded-lg p-2 flex flex-col gap-3 border border-white/5">
                      <div className="h-20 bg-slate-800 rounded shadow-sm border border-white/5 p-3">
                        <div className="h-2 w-16 bg-blue-500/30 rounded mb-2"></div>
                        <div className="h-2 w-full bg-slate-700 rounded"></div>
                        <div className="h-2 w-2/3 bg-slate-700 rounded mt-2"></div>
                      </div>
                      <div className="h-16 bg-slate-800 rounded shadow-sm border border-white/5 p-3 opacity-60">
                        <div className="h-2 w-10 bg-emerald-500/30 rounded mb-2"></div>
                      </div>
                    </div>
                    <div className="flex-1 bg-slate-800/30 rounded-lg p-2 flex flex-col gap-3 border border-white/5">
                      <div className="h-28 bg-slate-800 rounded shadow-sm border border-white/5 p-3 relative">
                        <div className="absolute top-3 left-3 w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[10px] ring-1 ring-emerald-500/30">
                          ✓
                        </div>
                        <div className="h-2 w-20 bg-slate-700 rounded mb-3 ml-6"></div>
                        <div className="h-10 bg-slate-900/50 rounded mt-2 border border-white/5"></div>
                      </div>
                    </div>
                    <div className="flex-1 bg-slate-800/30 rounded-lg p-2 opacity-50 border border-white/5">
                      <div className="h-16 bg-slate-800 rounded shadow-sm border border-white/5"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Feature Card */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-slate-900/90 text-white px-5 py-3 rounded-xl text-sm font-medium backdrop-blur-md shadow-2xl flex items-center justify-between border border-slate-700/80 ring-1 ring-white/5">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary p-1.5 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20">
                      <span className="material-symbols-outlined text-[18px]">view_kanban</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold text-sm text-slate-100">ניהול משימות מתקדם</span>
                      <span className="text-slate-400 text-[11px]">סנכרון מלא עם WhatsApp</span>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-slate-500 text-[18px]">arrow_back</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
