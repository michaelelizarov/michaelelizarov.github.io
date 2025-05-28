// trainee_architecture_translations.js
'use strict';
document.addEventListener('DOMContentLoaded', function() {
    const pageTranslations = {
        he: {
            trainee_architecture_page_title: "סקירת ארכיטקטורה - פלטפורמת סימולציות סייבר",
            architecture_overview_header: "סקירת ארכיטקטורת התרחיש",
            architecture_overview_subtitle: "הבן את מבנה הרשת והרכיבים המרכזיים בתרחיש הנוכחי.",
            diagram_section_title: "דיאגרמת רשת",
            diagram_placeholder_alt: "דיאגרמת רשת של התרחיש",
            diagram_description: "הדיאגרמה מציגה את הרכיבים המרכזיים והחיבורים ביניהם. לחץ על רכיבים ברשימה למטה למידע נוסף.",
            diagram_description_interactive: "הדיאגרמה מציגה את הרכיבים המרכזיים והחיבורים ביניהם. עיין ברשימת הרכיבים למטה למידע נוסף על כל אחד.",
            components_list_title: "רשימת רכיבי מפתח",
            no_components_to_display: "טוען רכיבים...",
            zone_internet: "אינטרנט / חיצוני",
            zone_management: "רשת ניהול",
            zone_perimeter: "הגנה היקפית",
            zone_dmz: "DMZ",
            zone_internal_core: "שרתי ליבה",
            zone_internal_apps: "שרתי יישומים",
            zone_internal_db: "בסיסי נתונים",
            zone_internal_endpoints: "תחנות קצה",
            zone_cloud_env_title_prefix: "סביבת ענן",
            zone_empty_placeholder_trainee: "[טוען רכיבים...]",
            component_firewall_name: "חומת אש (Firewall) ראשית",
            component_firewall_desc: "מגינה על הרשת הפנימית מפני איומים חיצוניים, מסננת תעבורה.",
            component_web_server_name: "שרת Web ציבורי (Apache)",
            component_web_server_desc: "מארח את אתר החברה הראשי, חשוף לאינטרנט.",
            component_db_server_name: "שרת בסיס נתונים (MySQL)",
            component_db_server_desc: "מאחסן מידע לקוחות ונתונים עסקיים רגישים.",
            component_workstation_ceo_name: "תחנת עבודה - מנכ\"ל",
            component_workstation_ceo_desc: "מחשב אישי של מנכ\"ל החברה, מכיל מידע רגיש.",
            component_ad_server_name: "שרת Active Directory",
            component_ad_server_desc: "מנהל זהויות והרשאות ברשת הארגונית.",
            component_email_server_name: "שרת דוא\"ל (Exchange)",
            component_email_server_desc: "מטפל בכל תעבורת הדואר האלקטרוני של הארגון.",
            component_siem_server_name: "מערכת SIEM",
            component_siem_server_desc: "אוספת ומנתחת לוגים מכלל רכיבי הרשת לצורך זיהוי איומים.",
            component_vpn_gateway_name: "שער VPN",
            component_vpn_gateway_desc: "מאפשר גישה מאובטחת מרחוק לרשת הארגונית.",
            component_dns_server_name: "שרת DNS חיצוני",
            component_dns_server_desc: "ממיר שמות דומיין לכתובות IP, משמש כנקודת תיווך בין האינטרנט לרשת.",
            component_app_server_name: "שרת אפליקציה",
            component_app_server_desc: "מארח יישומים עסקיים ומספק שירותי אפליקציה למשתמשים.",
            component_file_server_name: "שרת קבצים",
            component_file_server_desc: "מאחסן ומנהל קבצים משותפים של הארגון.",
            component_crm_server_name: "שרת CRM פנימי",
            component_crm_server_desc: "מנהל את מערכת ניהול קשרי הלקוחות הפנימית של הארגון.",
            component_workstation_finance_name: "תחנת עבודה - מנהל כספים",
            component_workstation_finance_desc: "מחשב אישי של מנהל הכספים, מכיל מידע פיננסי רגיש.",
            component_workstation_dev_name: "תחנת עבודה - מפתח",
            component_workstation_dev_desc: "מחשב אישי של מפתח תוכנה, מכיל קוד מקור וכלי פיתוח.",
            component_av_server_name: "שרת ניהול אנטי-וירוס",
            component_av_server_desc: "מנהל ומפיץ עדכוני אנטי-וירוס לכל תחנות הקצה ברשת.",
            go_back_to_available_scenarios_from_arch: "חזור לתרחישים זמינים",
            go_back_to_workshop_flow_from_arch: "חזור להסבר על הסדנה",
            go_to_email_client_from_arch: "המשך ללקוח דוא\"ל",
            error_loading_arch_data: "שגיאה בטעינת נתוני הארכיטקטורה",
            footer_copyright_text: "פלטפורמת סימולציות סייבר. כל הזכויות שמורות."
        },
        en: {
            trainee_architecture_page_title: "Architecture Overview - Cyber Simulation Platform",
            architecture_overview_header: "Scenario Architecture Overview",
            architecture_overview_subtitle: "Understand the network structure and key components in the current scenario.",
            diagram_section_title: "Network Diagram",
            diagram_placeholder_alt: "Scenario network diagram",
            diagram_description: "The diagram shows the main components and their connections. Click on components in the list below for more information.",
            diagram_description_interactive: "The diagram shows the main components and their connections. Refer to the component list below for more information on each.",
            components_list_title: "Key Components List",
            no_components_to_display: "Loading components...",
            zone_internet: "Internet / External",
            zone_management: "Management Network",
            zone_perimeter: "Perimeter Defense",
            zone_dmz: "DMZ",
            zone_internal_core: "Core Servers",
            zone_internal_apps: "Application Servers",
            zone_internal_db: "Database Servers",
            zone_internal_endpoints: "Endpoints",
            zone_cloud_env_title_prefix: "Cloud Environment",
            zone_empty_placeholder_trainee: "[Loading components...]",
            component_firewall_name: "Main Firewall",
            component_firewall_desc: "Protects the internal network from external threats, filters traffic.",
            component_web_server_name: "Public Web Server (Apache)",
            component_web_server_desc: "Hosts the main company website, exposed to the internet.",
            component_db_server_name: "Database Server (MySQL)",
            component_db_server_desc: "Stores customer information and sensitive business data.",
            component_workstation_ceo_name: "CEO Workstation",
            component_workstation_ceo_desc: "Personal computer of the company CEO, contains sensitive information.",
            component_ad_server_name: "Active Directory Server",
            component_ad_server_desc: "Manages identities and permissions in the corporate network.",
            component_email_server_name: "Email Server (Exchange)",
            component_email_server_desc: "Handles all email traffic for the organization.",
            component_siem_server_name: "SIEM System",
            component_siem_server_desc: "Collects and analyzes logs from all network components to identify threats.",
            component_vpn_gateway_name: "VPN Gateway",
            component_vpn_gateway_desc: "Allows secure remote access to the corporate network.",
            component_dns_server_name: "External DNS Server",
            component_dns_server_desc: "Translates domain names to IP addresses, serves as an intermediary between the internet and the network.",
            component_app_server_name: "Application Server",
            component_app_server_desc: "Hosts business applications and provides application services to users.",
            component_file_server_name: "File Server",
            component_file_server_desc: "Stores and manages shared organizational files.",
            component_crm_server_name: "Internal CRM Server",
            component_crm_server_desc: "Manages the organization's internal customer relationship management system.",
            component_workstation_finance_name: "Finance Manager Workstation",
            component_workstation_finance_desc: "Personal computer of the finance manager, contains sensitive financial information.",
            component_workstation_dev_name: "Developer Workstation",
            component_workstation_dev_desc: "Personal computer of a software developer, contains source code and development tools.",
            component_av_server_name: "Anti-virus Management Server",
            component_av_server_desc: "Manages and distributes anti-virus updates to all endpoints in the network.",
            go_back_to_available_scenarios_from_arch: "Back to Available Scenarios",
            go_back_to_workshop_flow_from_arch: "Back to Workshop Explanation",
            go_to_email_client_from_arch: "Continue to Email Client",
            error_loading_arch_data: "Error loading architecture data",
            footer_copyright_text: "Cyber Simulation Platform. All rights reserved."
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
        console.error('trainee_architecture_translations.js: Global translations object (window.translations) not found.');
        window.translations = pageTranslations; // Fallback
        if (typeof window.applyTranslationsGlobal === 'function') {
            window.applyTranslationsGlobal();
        }
    }
});