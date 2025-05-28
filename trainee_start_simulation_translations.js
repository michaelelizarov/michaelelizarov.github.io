// trainee_start_simulation_translations.js
'use strict';
document.addEventListener('DOMContentLoaded', function() {
    const pageTranslations = {
        he: {
            trainee_start_simulation_page_title: "הכנת סימולציה - פלטפורמת סייבר",
            preparing_environment_title: "מכין את סביבת הסימולציה שלך...",
            scenario_label: "תרחיש:",
            difficulty_label: "רמת קושי:",
            duration_label: "משך משוער:",
            description_label: "תיאור:",
            team_lobby_title_prefix: "לובי",
            team_alpha_lobby_name: "צוות אלפא", // Example
            team_lobby_waiting_text: "ממתין לשאר חברי הצוות להצטרף ולהכנת הסביבה...",
            team_member_status_connected: "מחובר",
            team_member_status_pending: "ממתין...",
            team_member1_name: "דנה כהן", // Example
            team_member2_name: "יאיר גולן", // Example
            team_member3_name_waiting: "שירה לוי (ממתין)", // Example
            team_member4_name_waiting: "אביתר מלכה (ממתין)", // Example
            team_lobby_live: "חי", // New translation for the live indicator
            // Scenario name keys (examples, should match trainee_main.js data)
            scenario_name_ransomware: "מתקפת כופר ארגונית",
            scenario_name_phishing: "זיהוי פישינג מתקדם",
            scenario_name_web_breach: "פריצה לשרתי WEB",
            scenario_name_mystery_easy_01: "אתגר סייבר #101",
            cancel_and_return_link: "ביטול וחזרה ללוח המחוונים",
            // New loading status messages
            loading_status_initializing: "מאתחל רכיבים...",
            loading_status_vm: "מקצה מכונות וירטואליות...",
            loading_status_network: "מגדיר תצורות רשת...",
            loading_status_assets: "טוען נכסים וכלים...",
            loading_status_finalizing: "מבצע בדיקות אחרונות...",
            loading_status_ready: "הסביבה מוכנה! מתחיל סימולציה...",
            // Scenario details section
            scenario_assets: "נכסים בתרחיש:",
            scenario_tools: "כלים זמינים:",
            user_role: "תפקיד:",
            // Team member roles for various scenarios
            role_ir_lead: "מוביל תגובה לאירועים",
            role_systems_admin: "מנהל מערכות",
            role_security_analyst: "אנליסט אבטחה",
            role_soc_manager: "מנהל SOC",
            role_lead_investigator: "חוקר ראשי",
            role_threat_hunter: "צייד איומים",
            role_email_security: "אבטחת אימייל",
            role_web_security_lead: "מוביל אבטחת Web",
            role_network_analyst: "אנליסט רשת",
            role_application_security: "אבטחת אפליקציות",
            role_devops_engineer: "מהנדס DevOps",
            role_junior_analyst: "אנליסט זוטר",
            // Footer and common text
            footer_copyright_text: "פלטפורמת סימולציות סייבר. כל הזכויות שמורות.",
            platform_title_sidebar: "סימולציות סייבר"
        },
        en: {
            trainee_start_simulation_page_title: "Preparing Simulation - Cyber Platform",
            preparing_environment_title: "Preparing Your Simulation Environment...",
            scenario_label: "Scenario:",
            difficulty_label: "Difficulty:",
            duration_label: "Est. Duration:",
            description_label: "Description:",
            team_lobby_title_prefix: "Lobby",
            team_alpha_lobby_name: "Alpha Team", // Example
            team_lobby_waiting_text: "Waiting for other team members to join and environment setup...",
            team_member_status_connected: "Connected",
            team_member_status_pending: "Pending...",
            team_member1_name: "Dana Cohen", // Example
            team_member2_name: "Yair Golan", // Example
            team_member3_name_waiting: "Shira Levi (Pending)", // Example
            team_member4_name_waiting: "Avitar Malka (Pending)", // Example
            team_lobby_live: "Live", // New translation for the live indicator
            // Scenario name keys
            scenario_name_ransomware: "Corporate Ransomware Attack",
            scenario_name_phishing: "Advanced Phishing Detection",
            scenario_name_web_breach: "Web Server Breach",
            scenario_name_mystery_easy_01: "Cyber Challenge #101",
            cancel_and_return_link: "Cancel and return to dashboard",
            // New loading status messages
            loading_status_initializing: "Initializing components...",
            loading_status_vm: "Allocating virtual machines...",
            loading_status_network: "Configuring network settings...",
            loading_status_assets: "Loading assets and tools...",
            loading_status_finalizing: "Performing final checks...",
            loading_status_ready: "Environment ready! Starting simulation...",
            // Scenario details section
            scenario_assets: "Scenario Assets:",
            scenario_tools: "Available Tools:",
            user_role: "Role:",
            // Team member roles for various scenarios
            role_ir_lead: "IR Lead",
            role_systems_admin: "Systems Administrator",
            role_security_analyst: "Security Analyst",
            role_soc_manager: "SOC Manager",
            role_lead_investigator: "Lead Investigator",
            role_threat_hunter: "Threat Hunter",
            role_email_security: "Email Security Specialist",
            role_web_security_lead: "Web Security Lead",
            role_network_analyst: "Network Analyst",
            role_application_security: "Application Security",
            role_devops_engineer: "DevOps Engineer",
            role_junior_analyst: "Junior Analyst",
            // Footer and common text
            footer_copyright_text: "Cyber Simulation Platform. All rights reserved.",
            platform_title_sidebar: "Cyber Simulations"
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
    } else {
        window.translations = pageTranslations;
    }
    
    // Force applying translations on load
    setTimeout(() => {
        if (typeof window.applyTranslationsGlobal === 'function') {
            window.applyTranslationsGlobal();
        }
    }, 100);
});