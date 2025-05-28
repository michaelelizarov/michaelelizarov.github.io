// landing_instructor_translations.js
'use strict';
document.addEventListener('DOMContentLoaded', function() {
    const pageTranslations = {
        he: {
            landing_instructor_page_title: "עמוד נחיתה מדריך - פלטפורמת סימולציות סייבר",
            landing_instructor_header: "ברוכים הבאים, מדריכים!",
            landing_instructor_subtitle: "זהו עמוד הנחיתה שלכם. מכאן תוכלו להתחיל לנהל את הפלטפורמה ביעילות.",
            navigation_quick_access: "גישה מהירה לכלי הניהול",
            navigation_sidebar_explanation: "כלים אלו זמינים גם בסרגל הניווט הצדדי",
            nav_landing_page_title: "עמוד הבית",
            nav_landing_page_desc: "הדף הראשי שלך עם סקירה כללית",
            nav_instructor_main_title: "לוח בקרה",
            nav_instructor_main_desc: "מרכז הבקרה הראשי שלך",
            nav_cost_resource_title: "עלויות ומשאבים",
            nav_cost_resource_desc: "ניהול עלויות ומשאבי ענן",
            nav_instructor_manage_users_teams_title: "משתמשים וצוותים",
            nav_instructor_manage_users_teams_desc: "הוספה ועריכת משתמשים",
            nav_instructor_manage_scenarios_title: "תרחישים",
            nav_instructor_manage_scenarios_desc: "יצירה ועריכת תרחישים",
            nav_instructor_monitor_simulations_title: "ניטור",
            nav_instructor_monitor_simulations_desc: "מעקב בזמן אמת",
            nav_instructor_reports_analytics_title: "דוחות",
            nav_instructor_reports_analytics_desc: "נתונים ותובנות",
            nav_instructor_content_management_title: "תוכן לימודי",
            nav_instructor_content_management_desc: "חומרי עזר ומדריכים",
            quick_start_guide_title: "מדריך מהיר למערכת",
            instructor_tutorial_intro: "פלטפורמה זו מאפשרת לכם ליצור, לנהל ולנטר סימולציות סייבר מתקדמות. להלן סקירה של האזורים המרכזיים:",
            tutorial_item_manage_users: "ניהול משתמשים וצוותים:",
            tutorial_item_manage_users_desc: "הוספה, עריכה והקצאת משתתפים לצוותים ולתרחישים.",
            tutorial_item_manage_scenarios_content: "יצירה וניהול תרחישים ותוכן:",
            tutorial_item_manage_scenarios_content_desc: "בניית תרחישים מותאמים אישית, כולל מפות ארכיטקטורה, נתיבי תקיפה (MITRE) והגדרת מערכות הגנה.",
            tutorial_item_monitor_simulations: "ניטור סימולציות:",
            tutorial_item_monitor_simulations_desc: "מעקב בזמן אמת אחר התקדמות החניכים, התערבות במידת הצורך ומתן משוב.",
            tutorial_item_view_reports: "הפקת דוחות ואנליטיקה:",
            tutorial_item_view_reports_desc: "ניתוח ביצועי חניכים וצוותים, אפקטיביות תרחישים וקבלת תובנות לשיפור.",
            tutorial_item_cost_management: "ניהול עלויות ומשאבים:",
            tutorial_item_cost_management_desc: "מעקב אחר צריכת משאבי ענן ועלויות סימולציה.",
            tutorial_item_content_management_nav: "ניהול תוכן לימודי:",
            tutorial_item_content_management_nav_desc: "הוספה וניהול של חומרי עזר, מאמרים ומדריכים עבור החניכים.",
            key_features_title: "תכונות מרכזיות",
            feature_dynamic_scenarios: "בניית תרחישים דינמיים ומותאמים.",
            feature_team_ind_training: "תמיכה באימון פרטני וצוותי.",
            feature_real_time_monitoring: "ניטור בזמן אמת והתערבות מדריך.",
            feature_detailed_analytics: "דוחות מפורטים ואנליטיקה לשיפור מתמיד.",
            feature_mitre_integration: "שילוב מסגרת MITRE ATT&CK.",
            tips_for_instructors_title: "טיפים למדריך",
            tip_1_start_simple: "התחל עם תרחישים פשוטים והעלה את רמת המורכבות בהדרגה.",
            tip_2_clear_objectives: "הגדר מטרות למידה ברורות לכל תרחיש.",
            tip_3_encourage_collaboration: "עודד שיתוף פעולה ותקשורת בתרחישים צוותיים.",
            tip_4_provide_feedback: "ספק משוב בונה ומיידי לחניכים.",
            go_to_instructor_dashboard_button: "המשך ללוח המחוונים"
        },
        en: {
            landing_instructor_page_title: "Instructor Landing Page - Cyber Simulation Platform",
            landing_instructor_header: "Welcome, Instructors!",
            landing_instructor_subtitle: "This is your landing page. From here, you can efficiently manage the platform.",
            navigation_quick_access: "Quick Access to Management Tools",
            navigation_sidebar_explanation: "These tools are also available in the side navigation bar",
            nav_landing_page_title: "Home Page",
            nav_landing_page_desc: "Your main page with general overview",
            nav_instructor_main_title: "Dashboard",
            nav_instructor_main_desc: "Your main control center",
            nav_cost_resource_title: "Costs & Resources",
            nav_cost_resource_desc: "Manage costs and cloud resources",
            nav_instructor_manage_users_teams_title: "Users & Teams",
            nav_instructor_manage_users_teams_desc: "Add and edit users",
            nav_instructor_manage_scenarios_title: "Scenarios",
            nav_instructor_manage_scenarios_desc: "Create and edit scenarios",
            nav_instructor_monitor_simulations_title: "Monitoring",
            nav_instructor_monitor_simulations_desc: "Real-time monitoring",
            nav_instructor_reports_analytics_title: "Reports",
            nav_instructor_reports_analytics_desc: "Data and insights",
            nav_instructor_content_management_title: "Learning Content",
            nav_instructor_content_management_desc: "Learning materials and guides",
            quick_start_guide_title: "Quick Start Guide",
            instructor_tutorial_intro: "This platform allows you to create, manage, and monitor advanced cyber simulations. Here's an overview of the main areas:",
            tutorial_item_manage_users: "Manage Users & Teams:",
            tutorial_item_manage_users_desc: "Add, edit, and assign participants to teams and scenarios.",
            tutorial_item_manage_scenarios_content: "Create & Manage Scenarios and Content:",
            tutorial_item_manage_scenarios_content_desc: "Build custom scenarios, including architecture maps, MITRE ATT&CK paths, and defense system configurations.",
            tutorial_item_monitor_simulations: "Monitor Simulations:",
            tutorial_item_monitor_simulations_desc: "Real-time tracking of trainee progress, intervention capabilities, and feedback provision.",
            tutorial_item_view_reports: "Generate Reports & Analytics:",
            tutorial_item_view_reports_desc: "Analyze trainee and team performance, scenario effectiveness, and gain insights for improvement.",
            tutorial_item_cost_management: "Cost & Resource Management:",
            tutorial_item_cost_management_desc: "Track cloud resource consumption and simulation costs.",
            tutorial_item_content_management_nav: "Manage Learning Content:",
            tutorial_item_content_management_nav_desc: "Add and manage auxiliary materials, articles, and guides for trainees.",
            key_features_title: "Key Features",
            feature_dynamic_scenarios: "Dynamic and customizable scenario building.",
            feature_team_ind_training: "Support for individual and team-based training.",
            feature_real_time_monitoring: "Real-time monitoring and instructor intervention.",
            feature_detailed_analytics: "Detailed reports and analytics for continuous improvement.",
            feature_mitre_integration: "MITRE ATT&CK framework integration.",
            tips_for_instructors_title: "Tips for Instructors",
            tip_1_start_simple: "Start with simple scenarios and gradually increase complexity.",
            tip_2_clear_objectives: "Define clear learning objectives for each scenario.",
            tip_3_encourage_collaboration: "Encourage collaboration and communication in team scenarios.",
            tip_4_provide_feedback: "Provide constructive and timely feedback to trainees.",
            go_to_instructor_dashboard_button: "Continue to Dashboard"
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
        // After merging, explicitly call applyTranslationsGlobal if it's available
        if (typeof window.applyTranslationsGlobal === 'function') {
            // console.log('landing_instructor_translations.js: Calling applyTranslationsGlobal after merge.');
            window.applyTranslationsGlobal();
        } else {
            // console.warn('landing_instructor_translations.js: window.applyTranslationsGlobal is not defined at the time of merge completion.');
        }
    } else {
        console.error('landing_instructor_translations.js: Global translations object (window.translations) not found.');
        window.translations = pageTranslations; // Fallback
        if (typeof window.applyTranslationsGlobal === 'function') {
            window.applyTranslationsGlobal();
        }
    }
});