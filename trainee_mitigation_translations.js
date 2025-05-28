// trainee_mitigation_translations.js
'use strict';
document.addEventListener('DOMContentLoaded', function() {
    const pageTranslations = {
        he: {
            trainee_mitigation_page_title: "שלבי מיטיגציה - פלטפורמת סימולציות סייבר",
            mitigation_steps_header: "שלבי מיטיגציה מומלצים",
            mitigation_steps_subtitle: "להלן המלצות לפעולות מידיות, לטווח קצר ולטווח ארוך להתמודדות עם האיום שזוהה ולמניעת הישנותו.",
            mitigation_immediate_actions_title: "פעולות מידיות (Containment & Eradication)",
            mitigation_short_term_title: "המלצות לטווח קצר (Hardening & Prevention)",
            mitigation_long_term_title: "אסטרטגיה לטווח ארוך (Resilience & Improvement)",
            no_mitigation_steps_available: "לא נמצאו המלצות מיטיגציה עבור תרחיש זה כעת.",
            // Example Immediate Actions
            mit_step_immediate1_text: "בודד את המערכות הנגועות מהרשת כדי למנוע התפשטות נוספת.",
            mit_step_immediate2_text: "חסום כתובות IP ודומיינים זדוניים שזוהו ב-Firewall ובשרתי ה-DNS.",
            mit_step_immediate3_text: "שנה סיסמאות לכל החשבונות החשודים כפרוצים או בעלי גישה למערכות הנגועות.",
            mit_step_immediate4_text: "הפעל סריקות אנטי-וירוס ו-EDR מעמיקות על כל המערכות הרלוונטיות.",
            // Example Short-Term Recommendations
            mit_step_short_term1_text: "התקן עדכוני אבטחה קריטיים לכל המערכות והתוכנות הרלוונטיות (Patch Management).",
            mit_step_short_term2_text: "חזק את מדיניות הסיסמאות ואכוף שימוש באימות רב-שלבי (MFA) בכל מקום אפשרי.",
            mit_step_short_term3_text: "בצע סקירת הרשאות משתמשים וצמצם גישה לרמת המינימום ההכרחי (Least Privilege).",
            mit_step_short_term4_text: "הגבר את רמת הניטור והלוגים עבור מערכות קריטיות וחשופות.",
            // Example Long-Term Strategy
            mit_step_long_term1_text: "פתח ותחזק תוכנית תגובה לאירועים (IR Plan) מקיפה ומתורגלת.",
            mit_step_long_term2_text: "השקע בהדרכות סייבר והעלאת מודעות עובדים באופן שוטף.",
            mit_step_long_term3_text: "שקול הטמעת פתרונות אבטחה מתקדמים כגון XDR, SOAR, ופתרונות הגנה על זהויות.",
            mit_step_long_term4_text: "בצע סקרי סיכונים ובדיקות חדירות (PT) תקופתיות לאיתור וטיפול בחולשות.",
            // Navigation buttons
            go_back_to_mitre_view: "חזור לנתיב התקיפה (MITRE)",
            go_to_my_progress_from_mitigation: "המשך להתקדמות שלי"
        },
        en: {
            trainee_mitigation_page_title: "Mitigation Steps - Cyber Simulation Platform",
            mitigation_steps_header: "Recommended Mitigation Steps",
            mitigation_steps_subtitle: "Below are recommendations for immediate, short-term, and long-term actions to address the identified threat and prevent recurrence.",
            mitigation_immediate_actions_title: "Immediate Actions (Containment & Eradication)",
            mitigation_short_term_title: "Short-Term Recommendations (Hardening & Prevention)",
            mitigation_long_term_title: "Long-Term Strategy (Resilience & Improvement)",
            no_mitigation_steps_available: "No mitigation recommendations available for this scenario at the moment.",
            mit_step_immediate1_text: "Isolate affected systems from the network to prevent further spread.",
            mit_step_immediate2_text: "Block identified malicious IP addresses and domains at the firewall and DNS servers.",
            mit_step_immediate3_text: "Change passwords for all accounts suspected of compromise or with access to affected systems.",
            mit_step_immediate4_text: "Run in-depth antivirus and EDR scans on all relevant systems.",
            mit_step_short_term1_text: "Install critical security updates for all relevant systems and software (Patch Management).",
            mit_step_short_term2_text: "Strengthen password policies and enforce multi-factor authentication (MFA) wherever possible.",
            mit_step_short_term3_text: "Conduct a user permissions review and reduce access to the minimum necessary level (Least Privilege).",
            mit_step_short_term4_text: "Increase monitoring and logging levels for critical and exposed systems.",
            mit_step_long_term1_text: "Develop and maintain a comprehensive and rehearsed Incident Response (IR) Plan.",
            mit_step_long_term2_text: "Invest in ongoing cybersecurity training and awareness programs for employees.",
            mit_step_long_term3_text: "Consider implementing advanced security solutions such as XDR, SOAR, and identity protection solutions.",
            mit_step_long_term4_text: "Conduct regular risk assessments and penetration tests (PT) to identify and address vulnerabilities.",
            // Navigation buttons
            go_back_to_mitre_view: "Back to Attack Path (MITRE)",
            go_to_my_progress_from_mitigation: "Continue to My Progress"
        }
    };
    if (window.translations) {
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
        if (typeof window.applyTranslationsGlobal === 'function') {
            // console.log('trainee_mitigation_translations.js: Calling applyTranslationsGlobal after merge.');
            window.applyTranslationsGlobal();
        }
    } else {
        console.error('trainee_mitigation_translations.js: Global translations object (window.translations) not found.');
        window.translations = pageTranslations; // Fallback
        if (typeof window.applyTranslationsGlobal === 'function') {
            window.applyTranslationsGlobal();
        }
    }
});