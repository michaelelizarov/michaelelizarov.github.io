// trainee_main_translations.js
'use strict';
document.addEventListener('DOMContentLoaded', function() {
    const pageTranslations = {
        he: {
            trainee_main_page_title: "תרחישים זמינים - פלטפורמת סימולציות סייבר",
            available_scenarios_header: "תרחישים זמינים",
            available_scenarios_subtitle: "בחר תרחיש כדי להתחיל את האימון שלך. בהצלחה!",
            search_scenario_label_short: "חיפוש",
            search_scenarios_placeholder: "חפש תרחיש...",
            filter_by_difficulty_label: "סינון לפי רמת קושי:",
            filter_by_category_label: "סינון לפי קטגוריה:",
            category_all: "כל הקטגוריות",
            category_phishing: "פישינג",
            category_ransomware: "כופר",
            category_data_breach: "דליפת מידע",
            category_network_attack: "תקיפת רשת",
            category_web_security: "אבטחת ווב",
            category_cloud_security: "אבטחת ענן",
            category_insider_threat: "איום פנימי",
            no_scenarios_found: "לא נמצאו תרחישים התואמים את החיפוש או הסינון שלך.",
            mystery_scenario_title: "תרחיש מסתורין",
            mystery_scenario_desc_easy: "אתגר את עצמך בתרחיש לא ידוע ברמת קושי קלה.",
            mystery_scenario_desc_medium: "אתגר את עצמך בתרחיש לא ידוע ברמת קושי בינונית.",
            mystery_scenario_desc_hard: "אתגר את עצמך בתרחיש לא ידוע ברמת קושי גבוהה.",
            mystery_scenario_desc_expert: "רק למקצוענים! אתגר סודי ברמת קושי מומחה. האם אתה מוכן?",
            tags_label_prefix: "תגיות:",
            duration_label_prefix: "משך משוער:",
            scenario1_title: "מתקפת פישינג ממוקדת",
            scenario1_desc: "זהה ונתח הודעת פישינג מתוחכמת שנשלחה לארגון. הבן את הטקטיקות ודרכי ההתמודדות.",
            scenario1_tags: "פישינג, הנדסה חברתית, אבטחת דוא\"ל",
            scenario1_duration: "45-60 דקות",
            scenario2_title: "ניתוח אירוע כופר",
            scenario2_desc: "תחנת קצה בארגון הוצפנה. נתח את האירוע, הבן את וקטור התקיפה והצע דרכי התאוששות.",
            scenario2_tags: "כופר, נוזקות, תגובה לאירועים",
            scenario2_duration: "60-90 דקות",
            scenario3_title: "חדירה לשרת Web",
            scenario3_desc: "שרת Web ציבורי נפרץ. זהה את נקודת החולשה, הערך את הנזק והמלץ על תיקונים.",
            scenario3_tags: "אבטחת ווב, SQL Injection, חולשות שרתים",
            scenario3_duration: "75-100 דקות",
            scenario4_title: "דליפת מידע עקב תצורה לקויה בענן",
            scenario4_desc: "נתונים רגישים נחשפו כתוצאה מתצורה שגויה של שירות אחסון בענן. חקור את האירוע והמלץ על צעדים למניעה.",
            scenario4_tags: "אבטחת ענן, AWS S3, תצורה לקויה",
            scenario4_duration: "60-75 דקות",
            scenario5_title: "איום פנימי: גניבת נתונים על ידי עובד",
            scenario5_desc: "עובד ממורמר מנסה לגנוב מידע סודי של החברה. זהה את הפעילות החשודה ועצור את הדלף.",
            scenario5_tags: "איום פנימי, DLP, ניטור משתמשים",
            scenario5_duration: "90-120 דקות",
            scenario6_title: "מתקפת DDoS על שירות חיוני",
            scenario6_desc: "שירות אונליין קריטי של הארגון תחת מתקפת DDoS. נתח את סוג המתקפה והפעל מנגנוני הגנה.",
            scenario6_tags: "DDoS, תקיפת רשת, הגנת רשת",
            scenario6_duration: "45-60 דקות",
            go_back_to_trainee_dashboard: "חזור ללוח המחוונים",
            go_to_architecture_overview: "המשך לסקירת ארכיטקטורה"
        },
        en: {
            trainee_main_page_title: "Available Scenarios - Cyber Simulation Platform",
            available_scenarios_header: "Available Scenarios",
            available_scenarios_subtitle: "Choose a scenario to begin your training. Good luck!",
            search_scenario_label_short: "Search",
            search_scenarios_placeholder: "Search scenario...",
            filter_by_difficulty_label: "Filter by Difficulty:",
            filter_by_category_label: "Filter by Category:",
            category_all: "All Categories",
            category_phishing: "Phishing",
            category_ransomware: "Ransomware",
            category_data_breach: "Data Breach",
            category_network_attack: "Network Attack",
            category_web_security: "Web Security",
            category_cloud_security: "Cloud Security",
            category_insider_threat: "Insider Threat",
            no_scenarios_found: "No scenarios found matching your search or filter.",
            mystery_scenario_title: "Mystery Scenario",
            mystery_scenario_desc_easy: "Challenge yourself with an unknown scenario at an easy difficulty level.",
            mystery_scenario_desc_medium: "Challenge yourself with an unknown scenario at a medium difficulty level.",
            mystery_scenario_desc_hard: "Challenge yourself with an unknown scenario at a hard difficulty level.",
            mystery_scenario_desc_expert: "For professionals only! Secret challenge at expert difficulty level. Are you ready?",
            tags_label_prefix: "Tags:",
            duration_label_prefix: "Est. Duration:",
            scenario1_title: "Targeted Phishing Attack",
            scenario1_desc: "Identify and analyze a sophisticated phishing email sent to an organization. Understand tactics and countermeasures.",
            scenario1_tags: "Phishing, Social Engineering, Email Security",
            scenario1_duration: "45-60 minutes",
            scenario2_title: "Ransomware Incident Analysis",
            scenario2_desc: "An endpoint in the organization has been encrypted. Analyze the incident, understand the attack vector, and propose recovery methods.",
            scenario2_tags: "Ransomware, Malware, Incident Response",
            scenario2_duration: "60-90 minutes",
            scenario3_title: "Web Server Breach Investigation",
            scenario3_desc: "A public web server has been breached. Identify the vulnerability, assess the damage, and recommend fixes.",
            scenario3_tags: "Web Security, SQL Injection, Server Vulnerabilities",
            scenario3_duration: "75-100 minutes",
            scenario4_title: "Cloud Misconfiguration Data Leak",
            scenario4_desc: "Sensitive data was exposed due to a misconfigured cloud storage service. Investigate and recommend preventive measures.",
            scenario4_tags: "Cloud Security, AWS S3, Misconfiguration",
            scenario4_duration: "60-75 minutes",
            scenario5_title: "Insider Threat: Data Exfiltration by Employee",
            scenario5_desc: "A disgruntled employee is attempting to steal confidential company information. Detect the suspicious activity and stop the leak.",
            scenario5_tags: "Insider Threat, DLP, User Monitoring",
            scenario5_duration: "90-120 minutes",
            scenario6_title: "DDoS Attack on Critical Service",
            scenario6_desc: "A critical online service of the organization is under a DDoS attack. Analyze the attack type and activate defense mechanisms.",
            scenario6_tags: "DDoS, Network Attack, Network Defense",
            scenario6_duration: "45-60 minutes",
            go_back_to_trainee_dashboard: "Back to Dashboard",
            go_to_architecture_overview: "Continue to Architecture Overview"
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
        console.error('trainee_main_translations.js: Global translations object (window.translations) not found.');
        window.translations = pageTranslations; // Fallback
        if (typeof window.applyTranslationsGlobal === 'function') {
            window.applyTranslationsGlobal();
        }
    }
});