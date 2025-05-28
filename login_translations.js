// login_translations.js
'use strict';
document.addEventListener('DOMContentLoaded', function() {
    const pageTranslations = {
        he: {
            login_page_title: "התחברות - פלטפורמת סימולציות סייבר",
            login_title: "התחברות למערכת",
            email_label: "כתובת מייל",
            password_label: "סיסמה",
            user_type_label: "סוג משתמש",
            user_type_trainee: "משתמש רגיל (חניך)",
            user_type_trainee_workshop: "משתמש סדנא",
            user_type_instructor: "מאמן",
            login_button: "התחבר",
            forgot_password: "שכחת סיסמה?",
            email_placeholder: "you@example.com",
            password_placeholder: "••••••••",
            login_error_empty_fields: "אנא מלא את כל השדות.",
            login_error_generic: "ההתחברות נכשלה. אנא נסה שוב.",
            login_error_unknown_usertype: "סוג משתמש לא ידוע.", // Key for unknown user type
            password_reset_title: "איפוס סיסמה",
            password_reset_instruction: "הזן את כתובת המייל שלך ונשלח לך הוראות לאיפוס הסיסמה",
            password_reset_error_empty_email: "אנא הזן את כתובת המייל שלך.",
            send_reset_link: "שלח קישור",
            cancel_button: "ביטול",
            sending: "שולח...",
            thank_you: "תודה!",
            password_reset_sent: "אם המייל קיים במערכת, נשלח אליו קישור לאיפוס הסיסמה.",
            close_button: "סגור",
            footer_copyright: "פלטפורמת סימולציות סייבר. כל הזכויות שמורות.",
            theme_toggle_sr: "החלף ערכת נושא",
            lang_toggle_sr: "החלף שפה"
        },
        en: {
            login_page_title: "Login - Cyber Simulation Platform",
            login_title: "System Login",
            email_label: "Email Address",
            password_label: "Password",
            user_type_label: "User Type",
            user_type_trainee: "Trainee",
            user_type_trainee_workshop: "Workshop Trainee",
            user_type_instructor: "Instructor",
            login_button: "Login",
            forgot_password: "Forgot password?",
            email_placeholder: "you@example.com",
            password_placeholder: "••••••••",
            login_error_empty_fields: "Please fill in all fields.",
            login_error_generic: "Login failed. Please try again.",
            login_error_unknown_usertype: "Unknown user type selected.", // Key for unknown user type
            password_reset_title: "Password Reset",
            password_reset_instruction: "Enter your email address and we'll send you instructions to reset your password",
            password_reset_error_empty_email: "Please enter your email address.",
            send_reset_link: "Send Link",
            cancel_button: "Cancel",
            sending: "Sending...",
            thank_you: "Thank you!",
            password_reset_sent: "If the email exists in our system, we'll send a password reset link.",
            close_button: "Close",
            footer_copyright: "Cyber Simulation Platform. All rights reserved.",
            theme_toggle_sr: "Toggle theme",
            lang_toggle_sr: "Toggle language"
        }
    };
    if (window.translations) {
        // Deep merge page-specific translations into the global object
        if (window.translations.he) {
            Object.assign(window.translations.he, pageTranslations.he);
        } else {
            window.translations.he = pageTranslations.he;
        }
        if (window.translations.en) {
            Object.assign(window.translations.en, pageTranslations.en);
        } else {
            window.translations.en = pageTranslations.en;
        }
        // console.log('login_translations.js: Page-specific translations merged.');
        // After merging, explicitly call applyTranslationsGlobal if it's available
        if (typeof window.applyTranslationsGlobal === 'function') {
            // console.log('login_translations.js: Calling applyTranslationsGlobal after merge.');
            window.applyTranslationsGlobal();
        } else {
            // console.warn('login_translations.js: window.applyTranslationsGlobal is not defined at the time of merge completion.');
        }
    } else {
        // This case should ideally not happen if app-global.js loads first and defines window.translations
        console.error('login_translations.js: Global translations object (window.translations) not found. Page-specific translations cannot be loaded effectively.');
        // Fallback: Make these translations available globally, and hope app-global.js picks them up if it loads later.
        window.translations = pageTranslations;
         // And then try to apply, in case app-global is already loaded but translations were not yet set.
        if (typeof window.applyTranslationsGlobal === 'function') {
            window.applyTranslationsGlobal();
        }
    }
});