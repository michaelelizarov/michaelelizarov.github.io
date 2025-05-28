// instructor_manage_scenarios_translations.js
'use strict';
document.addEventListener('DOMContentLoaded', function() {
    const pageTranslations = {
        he: {
            instructor_manage_scenarios_page_title: "ניהול תרחישים - פלטפורמת סימולציות סייבר",
            manage_scenarios_header: "ניהול תרחישים",
            manage_scenarios_subtitle: "נהל את מאגר התרחישים, ערוך קיימים, והוסף חדשים למערכת.",
            create_new_scenario_button: "צור תרחיש חדש",
            search_scenario_label: "חיפוש לפי שם",
            search_scenario_placeholder: "הכנס שם תרחיש...",
            filter_difficulty_label: "סינון לפי רמת קושי",
            // difficulty_all, difficulty_easy_badge, difficulty_medium_badge etc. are in app-global.js
            filter_status_label: "סינון לפי סטטוס",
            // status_all, status_published, status_draft etc. are in app-global.js
            // apply_filters_button is in app-global.js
            scenarios_list_title: "רשימת תרחישים",
            table_header_scenario_name: "שם התרחיש",
            table_header_difficulty: "רמת קושי",
            table_header_status: "סטטוס",
            table_header_created_by: "נוצר ע\"י",
            table_header_last_modified: "עדכון אחרון",
            table_header_participants_teams: "משתתפים/צוותים",
            table_header_actions: "פעולות",
            loading_scenarios: "טוען תרחישים...",
            no_scenarios_found_filter: "לא נמצאו תרחישים התואמים את הסינון.", // For JS dynamic message
            // Keys for mock scenario data (used by JS to display names)
            scenario_critical_infra_breach: "פריצה לתשתית קריטית",
            desc_critical_infra: "תרחיש מורכב של פריצה לתשתיות לאומיות חיוניות.",
            scenario_phishing_advanced: "פישינג מתקדם נגד ארגון פיננסי",
            desc_phishing_advanced: "זיהוי ונטרול קמפיין פישינג מתוחכם הכולל הנדסה חברתית.",
            scenario_data_leakage: "חקירת אירוע דליפת מידע רגיש",
            desc_data_leakage: "איתור מקור דליפת מידע מסווג והערכת הנזק.",
            scenario_insider_threat: "איום פנימי חוצה ארגון",
            desc_insider_threat: "זיהוי פעילות זדונית מצד גורם פנים בעל הרשאות גבוהות.",
            scenario_web_server_compromise: "פריצה לשרת Web והשתלטות",
            desc_web_server_compromise: "התמודדות עם פריצה דרך חולשת אפליקציית ווב והתפשטות ברשת.",
            scenario_supply_chain_attack: "מתקפת שרשרת אספקה מתוחכמת",
            desc_supply_chain_attack: "חקירת מתקפה שמקורה בספק צד שלישי והשפעתה על הארגון.",
            scenario_apt_simulation: "סימולציית תקיפת APT ממושכת",
            desc_apt_simulation: "התמודדות עם קמפיין תקיפה מתמשך מצד גורם מדינתי.",
            scenario_iot_botnet_disruption: "שיבוש רשת IoT באמצעות בוטנט",
            desc_iot_botnet_disruption: "זיהוי, ניתוח ונטרול בוטנט הפועל על התקני IoT.",
            scenario_cloud_misconfiguration_exploit: "ניצול תצורה שגויה בענן",
            desc_cloud_misconfiguration_exploit: "איתור ותיקון פרצת אבטחה הנובעת מתצורה לקויה של שירותי ענן.",
            scenario_ot_network_attack: "תקיפה על רשת תפעולית (OT)",
            desc_ot_network_attack: "הגנה על מערכות בקרה תעשייתיות מפני ניסיון חדירה ושיבוש.",
            // Specific difficulties/statuses if needed for mock data beyond global keys
            difficulty_high: "גבוהה",
            difficulty_low: "נמוכה",
            difficulty_low_badge: "נמוכה",
            difficulty_high_badge: "גבוהה",
            // status_active, status_inactive, etc. should come from global
            // Assign Scenario Modal
            assign_scenario_modal_title: "הקצאת תרחיש",
            assign_to_label: "הקצה ל:",
            assign_to_type_user: "משתמש בודד",
            assign_to_type_team: "צוות",
            assign_select_user_label: "בחר משתמש:",
            assign_select_user_placeholder: "טוען משתמשים...",
            assign_select_team_label: "בחר צוות:",
            assign_select_team_placeholder: "טוען צוותים...",
            assign_scenario_button_modal: "הקצה תרחיש",
            scenario_to_assign_label_modal: "תרחיש להקצאה:",
            assign_tooltip: "הקצה תרחיש", // Tooltip for action button
            view_mitre_tooltip: "צפה בנתיב MITRE", // Tooltip for action button
            confirm_delete_scenario_prefix: "האם אתה בטוח שברצונך למחוק את התרחיש '{scenarioName}'?", // For JS
            alert_scenario_assigned_successfully: "התרחיש הוקצה בהצלחה (סימולציה)!", // For JS
            // Creator names (can be shared or specific if context matters)
            instructor_lead: "מדריך ראשי",
            instructor_guest: "מדריך אורח",
            instructor_dev_team: "צוות פיתוח",
            unknown_user: "לא ידוע",
            // Navigation buttons
            go_back_to_manage_users_teams: "חזור לניהול משתמשים וצוותים",
            go_to_monitor_simulations: "המשך לניטור סימולציות"
        },
        en: {
            instructor_manage_scenarios_page_title: "Manage Scenarios - Cyber Simulation Platform",
            manage_scenarios_header: "Manage Scenarios",
            manage_scenarios_subtitle: "Manage the scenario repository, edit existing ones, and add new ones to the system.",
            create_new_scenario_button: "Create New Scenario",
            search_scenario_label: "Search by name",
            search_scenario_placeholder: "Enter scenario name...",
            filter_difficulty_label: "Filter by difficulty",
            filter_status_label: "Filter by status",
            // apply_filters_button is in app-global.js
            scenarios_list_title: "Scenarios List",
            table_header_scenario_name: "Scenario Name",
            table_header_difficulty: "Difficulty",
            table_header_status: "Status",
            table_header_created_by: "Created By",
            table_header_last_modified: "Last Modified",
            table_header_participants_teams: "Participants/Teams",
            table_header_actions: "Actions",
            loading_scenarios: "Loading scenarios...",
            no_scenarios_found_filter: "No scenarios found matching the filters.",
            scenario_critical_infra_breach: "Critical Infrastructure Breach",
            desc_critical_infra: "A complex scenario of a breach into national critical infrastructures.",
            scenario_phishing_advanced: "Advanced Phishing Against Financial Org",
            desc_phishing_advanced: "Identify and neutralize a sophisticated phishing campaign involving social engineering.",
            scenario_data_leakage: "Sensitive Data Leakage Investigation",
            desc_data_leakage: "Locate the source of a classified data leak and assess the damage.",
            scenario_insider_threat: "Cross-Organizational Insider Threat",
            desc_insider_threat: "Identify malicious activity by an insider with high privileges.",
            scenario_web_server_compromise: "Web Server Compromise and Takeover",
            desc_web_server_compromise: "Handle a breach via web application vulnerability and network spread.",
            scenario_supply_chain_attack: "Sophisticated Supply Chain Attack",
            desc_supply_chain_attack: "Investigate an attack originating from a third-party supplier and its impact.",
            scenario_apt_simulation: "Prolonged APT Attack Simulation",
            desc_apt_simulation: "Deal with a persistent attack campaign from a state-sponsored actor.",
            scenario_iot_botnet_disruption: "IoT Botnet Disruption",
            desc_iot_botnet_disruption: "Identify, analyze, and neutralize a botnet operating on IoT devices.",
            scenario_cloud_misconfiguration_exploit: "Cloud Misconfiguration Exploit",
            desc_cloud_misconfiguration_exploit: "Find and fix a security breach stemming from a cloud service misconfiguration.",
            scenario_ot_network_attack: "Operational Technology (OT) Network Attack",
            desc_ot_network_attack: "Defend industrial control systems against an intrusion and disruption attempt.",
            difficulty_high: "High",
            difficulty_low: "Low",
            difficulty_low_badge: "Low",
            difficulty_high_badge: "High",
            assign_scenario_modal_title: "Assign Scenario",
            assign_to_label: "Assign to:",
            assign_to_type_user: "Single User",
            assign_to_type_team: "Team",
            assign_select_user_label: "Select User:",
            assign_select_user_placeholder: "Loading users...",
            assign_select_team_label: "Select Team:",
            assign_select_team_placeholder: "Loading teams...",
            assign_scenario_button_modal: "Assign Scenario",
            scenario_to_assign_label_modal: "Scenario to Assign:",
            assign_tooltip: "Assign Scenario",
            view_mitre_tooltip: "View MITRE Path",
            confirm_delete_scenario_prefix: "Are you sure you want to delete scenario '{scenarioName}'?",
            alert_scenario_assigned_successfully: "Scenario assigned successfully (mock)!",
            instructor_lead: "Lead Instructor",
            instructor_guest: "Guest Instructor",
            instructor_dev_team: "Dev Team",
            unknown_user: "Unknown",
            // Navigation buttons
            go_back_to_manage_users_teams: "Back to Manage Users & Teams",
            go_to_monitor_simulations: "Continue to Monitor Simulations"
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
            // console.log('instructor_manage_scenarios_translations.js: Calling applyTranslationsGlobal after merge.');
            window.applyTranslationsGlobal();
        }
    } else {
        console.error('instructor_manage_scenarios_translations.js: Global translations object (window.translations) not found.');
        window.translations = pageTranslations; // Fallback
        if (typeof window.applyTranslationsGlobal === 'function') {
            window.applyTranslationsGlobal();
        }
    }
});