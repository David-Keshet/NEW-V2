import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://snyysiklfbaycdshgsif.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNueXlzaWtsZmJheWNkc2hnc2lmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU4MTc0NzMsImV4cCI6MjA1MTM5MzQ3M30.sb_publishable_bObF3nLuIySciLbV7XDpMA_K1ZkE2XJ';

export const supabase = createClient(supabaseUrl, supabaseKey);

// משתמשי דמו (Fallback)
export const DEMO_USERS = {
  admin: { username: 'admin', password: 'admin123', role: 'admin', full_name: 'מנהל מערכת' },
  user: { username: 'user', password: 'user123', role: 'user', full_name: 'משתמש רגיל' }
};

// פונקציית התחברות
export const loginUser = async (username, password) => {
  try {
    // ניסיון התחברות ל-Supabase
    const { data: users, error } = await supabase
      .from('bms_users')
      .select('*')
      .eq('username', username)
      .eq('password', password)
      .limit(1);

    if (error) {
      console.warn('Supabase error, using fallback:', error.message);
      // Fallback למשתמשי דמו
      if (DEMO_USERS[username] && DEMO_USERS[username].password === password) {
        return { 
          success: true, 
          user: DEMO_USERS[username],
          source: 'demo'
        };
      }
      return { success: false, error: 'שם משתמש או סיסמה שגויים' };
    }

    if (users && users.length > 0) {
      return { 
        success: true, 
        user: users[0],
        source: 'supabase'
      };
    } else {
      // Fallback למשתמשי דמו
      if (DEMO_USERS[username] && DEMO_USERS[username].password === password) {
        return { 
          success: true, 
          user: DEMO_USERS[username],
          source: 'demo'
        };
      }
      return { success: false, error: 'שם משתמש או סיסמה שגויים' };
    }
  } catch (error) {
    console.error('Login error:', error);
    // Fallback למשתמשי דמו
    if (DEMO_USERS[username] && DEMO_USERS[username].password === password) {
      return { 
        success: true, 
        user: DEMO_USERS[username],
        source: 'demo'
      };
    }
    return { success: false, error: 'אירעה שגיאה בהתחברות' };
  }
};
