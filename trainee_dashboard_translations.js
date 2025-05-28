// trainee_dashboard_translations.js
'use strict';
document.addEventListener('DOMContentLoaded', function() {
    const pageTranslations = {
        he: {
            trainee_dashboard_page_title: "לוח מחוונים - פלטפורמת סימולציות סייבר",
            trainee_dashboard_header: "לוח המחוונים שלך",
            trainee_dashboard_welcome: "ברוך הבא, {userName}! מוכן לאתגר הבא?", // {userName} will be a placeholder
            recent_scenarios_title: "תרחישים אחרונים שהתחלת",
            view_all_scenarios_link: "צפה בכל התרחישים",
            no_recent_scenarios: "עדיין לא התחלת אף תרחיש.",
            // Example recent scenarios (JS will use titleKeys from scenario management if possible)
            recent_scenario1_title: "חקירת אירוע דלף מידע", // Example, actual key from other files
            recent_scenario1_progress: "התקדמות: 60%",
            recent_scenario2_title: "ניסיון פריצה לשרת Apache",
            recent_scenario2_progress: "הושלם",
            recent_scenario3_title: "מתקפת פישינג ממוקדת",
            recent_scenario3_progress: "התקדמות: 25%",
            recent_scenario4_title: "איום פנימי: גניבת נתונים",
            recent_scenario4_progress: "התקדמות: 80%",
            recent_scenario5_title: "ניתוח אירוע כופר",
            recent_scenario5_progress: "ממתין להתחלה",
            // Keys for JS-generated progress status for recent scenarios
            recent_scenario_completed_status_badge: "הושלם",
            recent_scenario_pending_status_badge: "ממתין להתחלה",
            recent_scenario_progress_text: "התקדמות: {progress}%",
            my_badges_title: "התגים שלי",
            no_badges_earned: "עדיין לא זכית באף תג. השלם תרחישים כדי לזכות!",
            // Example badges (more will be added by JS)
            badge_first_scenario_title: "מתחיל דרכו",
            badge_first_scenario_desc: "השלמת את התרחיש הראשון שלך!",
            badge_phishing_expert_title: "מומחה פישינג",
            badge_phishing_expert_desc: "זיהית והתמודדת עם 5 מתקפות פישינג.",
            badge_perfect_score_title: "ניקוד מושלם",
            badge_perfect_score_desc: "קיבלת 100% בתרחיש.",
            badge_team_player_title: "שחקן צוות",
            badge_team_player_desc: "השלמת בהצלחה 3 תרחישים צוותיים.",
            badge_incident_handler_title: "מטפל אירועים",
            badge_incident_handler_desc: "טיפלת ב-10 אירועים שונים.",
            badge_quick_thinker_title: "חושב מהר",
            badge_quick_thinker_desc: "השלמת תרחיש בפחות ממחצית הזמן הממוצע.",
            course_progress_title: "ההתקדמות שלי בקורסים", // "קורסים" can be interpreted as paths or series of scenarios
            no_course_progress: "אינך רשום כרגע לאף מסלול התקדמות.",
            // Example course progress (more will be added by JS)
            course1_title: "מסלול אנליסט SOC רמה 1",
            course1_progress_text: "הושלמו 3 מתוך 5 תרחישים",
            course2_title: "התמחות בתגובה לאירועי כופר",
            course2_progress_text: "הושלם 1 מתוך 4 תרחישים",
            course3_title: "אבטחת יישומי ווב (OWASP)",
            course3_progress_text: "הושלמו 0 מתוך 6 תרחישים",
            course4_title: "ניתוח נוזקות למתחילים",
            course4_progress_text: "הושלמו 2 מתוך 3 תרחישים",
            course5_title: "חקירת אירועי ענן",
            course5_progress_text: "הושלם 1 מתוך 5 תרחישים",
            glossary_title: "מילון מונחים מהיר",
            no_glossary_terms: "מילון המונחים יתעדכן בקרוב.",
            // Example glossary terms (more will be added by JS)
            glossary_term1_term: "פישינג (Phishing)",
            glossary_term1_def: "ניסיון לגניבת מידע רגיש (כמו סיסמאות או פרטי אשראי) על ידי התחזות לגורם לגיטימי.",
            glossary_term2_term: "תוכנת כופר (Ransomware)",
            glossary_term2_def: "סוג של נוזקה המצפינה קבצים במחשב הקורבן ודורשת תשלום כופר עבור שחרורם.",
            glossary_term3_term: "MITRE ATT&CK",
            glossary_term3_def: "מאגר ידע גלובלי של טקטיקות וטכניקות תקיפה המשמש אנשי סייבר להבנה ותיאור של התנהגות תוקפים.",
            glossary_term4_term: "SIEM (Security Information and Event Management)",
            glossary_term4_def: "מערכת לאיסוף, ניתוח והתראה על אירועי אבטחת מידע בזמן אמת ממקורות שונים ברשת.",
            glossary_term5_term: "Zero-Day Vulnerability",
            glossary_term5_def: "חולשת אבטחה בתוכנה שאינה מוכרת לציבור או ליצרן, ולכן אין לה עדיין תיקון (patch).",
            recent_achievements_title: "הישגים אחרונים",
            no_recent_achievements: "עדיין אין לך הישגים אחרונים להציג.",
            // Example achievements (more will be added by JS)
            achievement1_text: "השלמת את התרחיש \"ניתוח אירוע כופר\" עם ציון 92%!",
            achievement1_time: "לפני יומיים",
            achievement2_text: "זכית בתג \"מתחיל דרכו\".",
            achievement2_time: "לפני 3 ימים",
            achievement3_text: "התקדמות ל-40% במסלול \"אנליסט SOC רמה 1\".",
            achievement3_time: "אתמול",
            achievement4_text: "זיהוי נכון של 5 איומי פישינג בתרגול.",
            achievement4_time: "לפני 4 ימים",
            achievement5_text: "השלמת תרחיש \"פריצה לשרת Web\" בפעם הראשונה.",
            achievement5_time: "היום",
            // CTI Feed Snippet
            cti_feed_snippet_title: "עדכוני מודיעין אחרונים (CTI)",
            no_cti_updates: "אין עדכוני מודיעין חדשים כרגע.",
            // Example CTI entries
            cti_entry1_title: "קמפיין פישינג חדש מזהה משתמשי Office 365",
            cti_entry1_source: "מקור: KrebsOnSecurity",
            cti_entry2_title: "חולשת Zero-Day התגלתה בשרת Apache Struts",
            cti_entry2_source: "מקור: CISA Alert",
            cti_entry3_title: "עלייה בתקיפות כופר המנצלות RDP חשוף",
            cti_entry3_source: "מקור: BleepingComputer",
            // Navigation buttons
            go_back_to_trainee_landing: "חזור לעמוד הנחיתה",
            go_to_available_scenarios_from_dashboard: "עבור לתרחישים זמינים"
        },
        en: {
            trainee_dashboard_page_title: "Dashboard - Cyber Simulation Platform",
            trainee_dashboard_header: "Your Dashboard",
            trainee_dashboard_welcome: "Welcome, {userName}! Ready for the next challenge?",
            recent_scenarios_title: "Recently Started Scenarios",
            view_all_scenarios_link: "View All Scenarios",
            no_recent_scenarios: "You haven't started any scenarios yet.",
            recent_scenario1_title: "Data Leak Investigation",
            recent_scenario1_progress: "Progress: 60%",
            recent_scenario2_title: "Apache Server Breach Attempt",
            recent_scenario2_progress: "Completed",
            recent_scenario3_title: "Targeted Phishing Attack",
            recent_scenario3_progress: "Progress: 25%",
            recent_scenario4_title: "Insider Threat: Data Theft",
            recent_scenario4_progress: "Progress: 80%",
            recent_scenario5_title: "Ransomware Incident Analysis",
            recent_scenario5_progress: "Waiting to Start",
            recent_scenario_completed_status_badge: "Completed",
            recent_scenario_pending_status_badge: "Pending Start",
            recent_scenario_progress_text: "Progress: {progress}%",
            my_badges_title: "My Badges",
            no_badges_earned: "You haven't earned any badges yet. Complete scenarios to earn them!",
            badge_first_scenario_title: "Pathfinder",
            badge_first_scenario_desc: "Completed your first scenario!",
            badge_phishing_expert_title: "Phishing Expert",
            badge_phishing_expert_desc: "Identified and handled 5 phishing attacks.",
            badge_perfect_score_title: "Perfect Score",
            badge_perfect_score_desc: "Achieved 100% in a scenario.",
            badge_team_player_title: "Team Player",
            badge_team_player_desc: "Successfully completed 3 team scenarios.",
            badge_incident_handler_title: "Incident Handler",
            badge_incident_handler_desc: "Handled 10 different incidents.",
            badge_quick_thinker_title: "Quick Thinker",
            badge_quick_thinker_desc: "Completed a scenario in less than half the average time.",
            course_progress_title: "My Course Progress",
            no_course_progress: "You are not currently enrolled in any progress paths.",
            course1_title: "SOC Analyst Level 1 Path",
            course1_progress_text: "3 of 5 scenarios completed",
            course2_title: "Ransomware Incident Response Specialization",
            course2_progress_text: "1 of 4 scenarios completed",
            course3_title: "Web Application Security (OWASP)",
            course3_progress_text: "0 of 6 scenarios completed",
            course4_title: "Beginner Malware Analysis",
            course4_progress_text: "2 of 3 scenarios completed",
            course5_title: "Cloud Incident Investigation",
            course5_progress_text: "1 of 5 scenarios completed",
            glossary_title: "Quick Glossary",
            no_glossary_terms: "The glossary will be updated soon.",
            glossary_term1_term: "Phishing",
            glossary_term1_def: "An attempt to steal sensitive information (like passwords or credit card details) by impersonating a legitimate entity.",
            glossary_term2_term: "Ransomware",
            glossary_term2_def: "A type of malware that encrypts files on a victim's computer and demands a ransom payment for their release.",
            glossary_term3_term: "MITRE ATT&CK",
            glossary_term3_def: "A global knowledge base of adversary tactics and techniques used by cyber professionals to understand and describe attacker behavior.",
            glossary_term4_term: "SIEM (Security Information and Event Management)",
            glossary_term4_def: "A system for collecting, analyzing, and alerting on security information and events in real-time from various network sources.",
            glossary_term5_term: "Zero-Day Vulnerability",
            glossary_term5_def: "A software security vulnerability that is unknown to the public or the vendor, and therefore has no patch available yet.",
            recent_achievements_title: "Recent Achievements",
            no_recent_achievements: "You have no recent achievements to display yet.",
            achievement1_text: "Completed \"Ransomware Incident Analysis\" with a score of 92%!",
            achievement1_time: "2 days ago",
            achievement2_text: "Earned the \"Pathfinder\" badge.",
            achievement2_time: "3 days ago",
            achievement3_text: "Progressed to 40% in the \"SOC Analyst Level 1 Path\".",
            achievement3_time: "Yesterday",
            achievement4_text: "Correctly identified 5 phishing threats in practice.",
            achievement4_time: "4 days ago",
            achievement5_text: "Completed \"Web Server Breach\" scenario for the first time.",
            achievement5_time: "Today",
            // CTI Feed Snippet
            cti_feed_snippet_title: "Latest CTI Updates",
            no_cti_updates: "No new CTI updates at the moment.",
            cti_entry1_title: "New Phishing Campaign Targets Office 365 Users",
            cti_entry1_source: "Source: KrebsOnSecurity",
            cti_entry2_title: "Zero-Day Vulnerability Discovered in Apache Struts Server",
            cti_entry2_source: "Source: CISA Alert",
            cti_entry3_title: "Rise in Ransomware Attacks Exploiting Exposed RDP",
            cti_entry3_source: "Source: BleepingComputer",
            // Navigation buttons
            go_back_to_trainee_landing: "Back to Landing Page",
            go_to_available_scenarios_from_dashboard: "Go to Available Scenarios"
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
        console.error('trainee_dashboard_translations.js: Global translations object (window.translations) not found.');
        window.translations = pageTranslations; // Fallback
        if (typeof window.applyTranslationsGlobal === 'function') {
            window.applyTranslationsGlobal();
        }
    }
});