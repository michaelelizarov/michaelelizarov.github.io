// landing_trainee_workshop_translations.js
'use strict';
document.addEventListener('DOMContentLoaded', function() {
    const pageTranslations = {
        he: {
            landing_trainee_workshop_page_title: "ברוכים הבאים לסדנא! - פלטפורמת סימולציות סייבר",
            landing_trainee_workshop_header: "ברוכים הבאים לסדנת הסייבר!",
            landing_trainee_workshop_subtitle: "התכוננו לעבוד בצוות ולשפר את כישורי הסייבר שלכם באמצעות תרחישים מציאותיים.",
            navigation_quick_access_workshop: "גישה מהירה לכלי הסדנה",
            trainee_landing_page_workshop_desc: "דף הסדנה הראשי",
            trainee_architecture_workshop_desc: "התחל מכאן - מפת המערכות",
            trainee_email_workshop_desc: "בדוק הודעות מהצוות",
            trainee_cti_workshop_desc: "מידע מודיעיני לצוות",
            trainee_questions_workshop_desc: "ענו יחד כצוות",
            trainee_communication_workshop_desc: "תקשורת קריטית!",
            trainee_ai_assistant_workshop_desc: "עזרה לכל הצוות",
            trainee_mitre_workshop_desc: "נתחו יחד",
            trainee_mitigation_workshop_desc: "פתרונות צוותיים",
            quick_start_guide_title_trainee_ws: "מדריך מהיר למערכת (סדנת צוות)",
            trainee_workshop_tutorial_intro: "פלטפורמה זו תעזור לכם לתרגל בצוות ולהתמקצע בתגובה לאירועי סייבר. הנה מה שחשוב לדעת:",
            tutorial_item_team_coordination: "עבודת צוות ותיאום:",
            tutorial_item_team_coordination_desc: "שתפו פעולה עם חברי הצוות שלכם באמצעות כלי התקשורת המובנים.",
            tutorial_item_using_sim_tools: "שימוש בכלים במהלך סימולציה:",
            tutorial_item_using_sim_tools_desc: "בכל תרחיש תקבלו גישה לכלים כמו סקירת ארכיטקטורה, לקוח דוא\"ל, מאגר מודיעין (CTI) ועוד.",
            tutorial_item_answering_questions: "מענה על שאלות מנחות והבנת MITRE ATT&CK:",
            tutorial_item_answering_questions_desc: "ענו על שאלות כדי להתקדם, להבין את שלבי התקיפה ולצבור נקודות.",
            tutorial_item_real_time_feedback: "משוב בזמן אמת:",
            tutorial_item_real_time_feedback_desc: "המאמן יכול לספק הנחיות ורמזים במהלך הסימולציה.",
            tutorial_item_time_management: "ניהול זמן:",
            tutorial_item_time_management_desc: "שימו לב למגבלות הזמן ותעדפו משימות בהתאם.",
            what_you_will_learn_title: "מה תלמדו כאן?",
            learn_item_incident_response: "תגובה לאירועי סייבר בזמן אמת.",
            learn_item_threat_identification: "זיהוי וניתוח איומים ווקטורי תקיפה.",
            learn_item_team_collaboration: "עבודת צוות ושיתוף פעולה בתרחישי חירום.",
            learn_item_mitre_application: "יישום עקרונות ממסגרת MITRE ATT&CK.",
            learn_item_decision_making: "קבלת החלטות תחת לחץ ובסביבה דינמית.",
            tips_for_success_title: "טיפים להצלחה",
            tip_1_communicate: "תקשרו באופן ברור ושוטף עם חברי הצוות שלכם.",
            tip_2_share_findings: "שתפו ממצאים חשובים עם כל הצוות.",
            tip_3_divide_tasks: "חלקו משימות באופן יעיל בין חברי הצוות.",
            tip_4_use_tools: "נצלו את כל הכלים העומדים לרשותכם (CTI, דוא\"ל, ארכיטקטורה).",
            tip_5_learn_from_mistakes: "אל תחששו לטעות - כל טעות היא הזדמנות ללמידה.",
            typical_scenario_flow_title: "מהלך תרחיש טיפוסי",
            flow_item_team_formation: "הקמת צוות ותדריך",
            flow_item_team_formation_desc: "התחברות כל חברי הצוות והבנת המשימה המשותפת.",
            flow_item_exploration: "חקירה ואיסוף מידע",
            flow_item_exploration_desc: "שימוש בכלים לניתוח המצב, כגון סקירת ארכיטקטורה, מיילים ופיד CTI.",
            flow_item_team_communication: "תקשורת ושיתוף מידע",
            flow_item_team_communication_desc: "שיתוף ממצאים בין חברי הצוות וגיבוש תמונת מצב משותפת.",
            flow_item_decision_points: "נקודות החלטה ופעולה",
            flow_item_decision_points_desc: "קבלת החלטות משותפות המשפיעות על התפתחות התרחיש.",
            flow_item_feedback_summary: "משוב וסיכום קבוצתי",
            flow_item_feedback_summary_desc: "קבלת ניקוד קבוצתי, ניתוח ביצועים, ודיון על שלבי המיטיגציה האפשריים.",
            go_to_architecture: "המשך לסקירת ארכיטקטורה"
        },
        en: {
            landing_trainee_workshop_page_title: "Welcome to Workshop! - Cyber Simulation Platform",
            landing_trainee_workshop_header: "Welcome to the Cyber Workshop!",
            landing_trainee_workshop_subtitle: "Get ready to work as a team and enhance your cyber skills through realistic scenarios.",
            navigation_quick_access_workshop: "Quick Access to Workshop Tools",
            trainee_landing_page_workshop_desc: "Workshop main page",
            trainee_architecture_workshop_desc: "Start here - systems map",
            trainee_email_workshop_desc: "Check team messages",
            trainee_cti_workshop_desc: "Intel for the team",
            trainee_questions_workshop_desc: "Answer together as team",
            trainee_communication_workshop_desc: "Critical communication!",
            trainee_ai_assistant_workshop_desc: "Help for all team",
            trainee_mitre_workshop_desc: "Analyze together",
            trainee_mitigation_workshop_desc: "Team solutions",
            quick_start_guide_title_trainee_ws: "Quick Start Guide (Team Workshop)",
            trainee_workshop_tutorial_intro: "This platform will help you practice as a team and become proficient in responding to cyber events. Here's what's important to know:",
            tutorial_item_team_coordination: "Teamwork and Coordination:",
            tutorial_item_team_coordination_desc: "Collaborate with your team members using the built-in communication tools.",
            tutorial_item_using_sim_tools: "Using Tools During a Simulation:",
            tutorial_item_using_sim_tools_desc: "In each scenario, you'll have access to tools like architecture overview, email client, CTI feed, and more.",
            tutorial_item_answering_questions: "Answering Guiding Questions & Understanding MITRE ATT&CK:",
            tutorial_item_answering_questions_desc: "Answer questions to progress, understand attack stages, and earn points.",
            tutorial_item_real_time_feedback: "Real-time Feedback:",
            tutorial_item_real_time_feedback_desc: "The instructor can provide guidance and hints during the simulation.",
            tutorial_item_time_management: "Time Management:",
            tutorial_item_time_management_desc: "Pay attention to time constraints and prioritize tasks accordingly.",
            what_you_will_learn_title: "What Will You Learn Here?",
            learn_item_incident_response: "Real-time incident response.",
            learn_item_threat_identification: "Identification and analysis of threats and attack vectors.",
            learn_item_team_collaboration: "Teamwork and collaboration in emergency scenarios.",
            learn_item_mitre_application: "Application of principles from the MITRE ATT&CK framework.",
            learn_item_decision_making: "Decision-making under pressure in dynamic environments.",
            tips_for_success_title: "Tips for Success",
            tip_1_communicate: "Communicate clearly and consistently with your team members.",
            tip_2_share_findings: "Share important findings with the entire team.",
            tip_3_divide_tasks: "Efficiently divide tasks among team members.",
            tip_4_use_tools: "Utilize all available tools (CTI, email, architecture).",
            tip_5_learn_from_mistakes: "Don't be afraid to make mistakes - every error is a learning opportunity.",
            typical_scenario_flow_title: "Typical Scenario Flow",
            flow_item_team_formation: "Team Formation & Briefing",
            flow_item_team_formation_desc: "All team members connect and understand the shared mission.",
            flow_item_exploration: "Investigation & Intel Gathering",
            flow_item_exploration_desc: "Use tools to analyze the situation, such as architecture review, emails, and CTI feed.",
            flow_item_team_communication: "Communication & Information Sharing",
            flow_item_team_communication_desc: "Share findings among team members and develop a common situational awareness.",
            flow_item_decision_points: "Decision Points & Actions",
            flow_item_decision_points_desc: "Make joint decisions that affect the scenario's development.",
            flow_item_feedback_summary: "Group Feedback & Summary",
            flow_item_feedback_summary_desc: "Receive team scores, performance analysis, and discuss possible mitigation steps.",
            go_to_architecture: "Continue to Architecture Overview"
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
            window.applyTranslationsGlobal();
        }
    } else {
        console.error('landing_trainee_workshop_translations.js: Global translations object (window.translations) not found.');
        window.translations = pageTranslations; // Fallback
        if (typeof window.applyTranslationsGlobal === 'function') {
            window.applyTranslationsGlobal();
        }
    }
});