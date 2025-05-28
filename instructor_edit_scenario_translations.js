// instructor_edit_scenario_translations.js
'use strict';
document.addEventListener('DOMContentLoaded', function() {
    const pageTranslations = {
        he: {
            instructor_edit_scenario_page_title: "עריכת תרחיש - פלטפורמת סימולציות סייבר",
            edit_scenario_header: "עריכת תרחיש:", // Placeholder for scenario name
            edit_scenario_subtitle: "עדכן את פרטי התרחיש, תצורת הסביבה, שלבי התקיפה וההגנה.",
            // Wizard Steps Titles & Navigation
            edit_scenario_basic_details_title_numbered: "1. פרטי תרחיש בסיסיים",
            edit_scenario_environment_config_title_numbered: "2. תצורת סביבה וארכיטקטורה",
            edit_scenario_mitre_path_title_numbered: "3. נתיב תקיפה (MITRE ATT&CK)",
            edit_scenario_defense_systems_title_numbered: "4. מערכות הגנה",
            wizard_prev_button: "הקודם",
            wizard_next_button: "הבא",
            save_changes_button: "שמור שינויים",
            step_counter_text: "שלב {current} מתוך {total}",
            step_counter_text_initial: "שלב 1 מתוך 4", // Initial text before JS updates it
            // Step 1: Basic Details (Many keys can be reused from create_scenario if identical)
            scenario_name_label: "שם התרחיש", // Common with create
            scenario_difficulty_label: "רמת קושי", // Common with create
            scenario_description_label: "תיאור התרחיש", // Common with create
            mitre_tags_label_edit: "תגיות MITRE ATT&CK (מופרדות בפסיק)", // HTML uses mitre_tags_label
            mitre_tags_placeholder: "לדוגמה: T1566.001, TA0007, T1059.003", // Common (from app-global or create)
            mitre_tags_helper: "הזן מזהי טקטיקות (TAxxxx) או טכניקות (Txxxx, Txxxx.xxx).", // Common
            // Step 2: Environment & Architecture
            edit_architecture_note: "ניתן לערוך את מפת הארכיטקטורה. הרכיבים הקיימים יטענו אוטומטית. שינוי סוג תשתית או ספק ענן עשוי לאפס חלקים מהמפה.",
            loading_architecture_map: "טוען מפת ארכיטקטורה...", // Placeholder text in HTML
            // Environment config labels and options (can reuse most from create_scenario_translations)
            org_type_label: "סוג ארגון",
            org_type_generic: "כללי", org_type_finance: "פיננסי", org_type_government: "ממשלתי",
            org_type_military: "צבאי", org_type_healthcare: "בריאות", org_type_tech_startup: "סטארטאפ טכנולוגי",
            org_type_ecommerce: "מסחר אלקטרוני",
            service_type_label: "סוג שירות עיקרי",
            service_type_web_app: "אפליקציית ווב", service_type_saas: "פלטפורמת SaaS", service_type_internal: "מערכות פנימיות",
            service_type_api: "שירותי API", service_type_data: "עיבוד נתונים",
            infra_type_label: "סוג תשתית",
            infra_type_on_prem: "מקומי (On-Premise)", infra_type_cloud: "ענן", infra_type_hybrid: "היברידי",
            cloud_provider_label: "ספק ענן",
            cloud_aws: "AWS", cloud_azure: "Azure", cloud_gcp: "Google Cloud", cloud_other: "אחר",
            os_types_label: "מערכות הפעלה",
            os_windows_server: "Windows Server", os_linux_server: "Linux Server", os_windows_client: "Windows Client",
            os_linux_client: "Linux Client", os_macos_client: "macOS Client",
            containerization_label: "שימוש בקונטיינריזציה",
            option_no: "לא",
            option_yes_docker: "כן (Docker)", option_yes_k8s: "כן (Kubernetes)",
            open_source_defense_label: "שימוש בכלי קוד פתוח",
            option_no_oss: "ללא (רק כלים מסחריים)", option_partial_oss: "שילוב (מסחרי וקוד פתוח)", option_yes_oss: "כן (בעיקר קוד פתוח)",
            // Architecture zone titles and placeholders (can reuse from create_scenario_translations)
            zone_internet: "אינטרנט / חיצוני", drop_placeholder_internet: "גרור לכאן התקנים חיצוניים...",
            zone_management: "רשת ניהול", drop_placeholder_management: "SIEM, בקרה, סורקים...",
            zone_perimeter: "הגנה היקפית", drop_placeholder_perimeter: "FW, WAF, IPS...",
            zone_dmz: "DMZ", drop_placeholder_dmz: "שרתי Web, אפליקציה...",
            zone_internal_core: "שרתי ליבה", drop_placeholder_core: "AD, DNS...",
            zone_internal_apps: "שרתי יישומים", drop_placeholder_internal_apps: "שרתי אפליקציות פנימיים...",
            zone_internal_db: "בסיסי נתונים", drop_placeholder_db: "MySQL, MSSQL...",
            zone_internal_endpoints: "תחנות קצה", drop_placeholder_endpoints: "Windows, Linux, macOS...",
            zone_cloud_env_title_prefix: "סביבת ענן", drop_placeholder_cloud: "VMs, Storage, PaaS...",
            error_loading_arch_editor_placeholder: "שגיאה בטעינת עורך הארכיטקטורה.", // For JS, if placeholder fails
            error_no_drop_zones_arch_editor: "שגיאה: לא נמצאו אזורי גרירה במפת הארכיטקטורה.", // For JS
            // Step 3: MITRE Path
            edit_mitre_path_note: "ערוך את הטקטיקות והטכניקות המשמשות בתרחיש זה.",
            loading_mitre_data: "טוען נתוני MITRE...", // Common
            selected_mitre_path_preview_edit: "תצוגה מקדימה של הנתיב הנבחר:",
            no_techniques_selected_yet_edit: "טרם נבחרו טכניקות.",
            expand_button: "הרחב", // Common with create
            collapse_button: "צמצם", // Common with create
            // Step 4: Defense Systems
            edit_defense_systems_note: "עדכן את מערכות ההגנה הקיימות בסביבת התרחיש.",
            // Defense system labels, vendor options etc. can reuse keys from create_scenario_translations
            mandatory_systems_title: "מערכות הגנה חובה",
            optional_systems_title: "מערכות הגנה נוספות (אופציונלי)",
            select_vendor: "בחר וונדור...",
            select_optional: "בחר (אופציונלי)",
            firewall_vendor_label: "חומת אש (Firewall)",
                vendor_pa_select: "Palo Alto Networks", vendor_fortinet_select: "Fortinet FortiGate", /* ... all other vendors */
            epp_edr_vendor_label: "הגנת נקודות קצה (EPP/EDR)",
                vendor_ms_defender_edr_select: "Microsoft Defender for Endpoint", /* ... */
            siem_vendor_label: "מערכת SIEM / ניהול לוגים",
                vendor_splunk_select: "Splunk Enterprise Security", /* ... */
            waf_vendor_label: "WAF", /* ... */
            ips_ids_vendor_label: "IPS/IDS", /* ... */
            ndr_vendor_label: "NDR", /* ... */
            xdr_vendor_label: "XDR", /* ... */
            // Note: All specific vendor keys like vendor_sophos_select, vendor_pfsense_select, etc. are assumed to be reused from create_scenario_translations.js
            // Alerts & Confirmations
            error_loading_scenario_data_alert: "שגיאה: לא ניתן לטעון את נתוני התרחיש.",
            changes_saved_successfully_placeholder: "השינויים נשמרו (סימולציה).", // Placeholder, actual message in app-global or specific JS
            scenario_not_found_title: "שגיאה", // If scenario ID not found
            error_loading_scenario_data: "שגיאה בטעינת נתוני התרחיש.",
            // Page Navigation Buttons
            go_back_to_manage_scenarios_from_edit: "חזור לניהול תרחישים",
            go_to_monitor_simulations_from_edit: "המשך לניטור סימולציות"
        },
        en: {
            instructor_edit_scenario_page_title: "Edit Scenario - Cyber Simulation Platform",
            edit_scenario_header: "Editing Scenario:",
            edit_scenario_subtitle: "Update scenario details, environment configuration, attack paths, and defenses.",
            edit_scenario_basic_details_title_numbered: "1. Basic Scenario Details",
            scenario_name_label: "Scenario Name",
            scenario_difficulty_label: "Difficulty Level",
            scenario_description_label: "Scenario Description",
            mitre_tags_label_edit: "MITRE ATT&CK Tags (comma-separated)",
            mitre_tags_placeholder: "e.g., T1566.001, TA0007, T1059.003",
            mitre_tags_helper: "Enter Tactic IDs (TAxxxx) or Technique IDs (Txxxx, Txxxx.xxx).",
            edit_scenario_environment_config_title_numbered: "2. Environment & Architecture Configuration",
            edit_architecture_note: "The architecture map can be edited. Existing components will be loaded automatically. Changing infrastructure type or cloud provider may reset parts of the map.",
            loading_architecture_map: "Loading architecture map...",
            org_type_label: "Organization Type",
            org_type_generic: "Generic", org_type_finance: "Financial", org_type_government: "Government",
            org_type_military: "Military", org_type_healthcare: "Healthcare", org_type_tech_startup: "Tech Startup",
            org_type_ecommerce: "E-commerce",
            service_type_label: "Main Service Type",
            service_type_web_app: "Web Application", service_type_saas: "SaaS Platform", service_type_internal: "Internal Systems",
            service_type_api: "API Services", service_type_data: "Data Processing",
            infra_type_label: "Infrastructure Type",
            infra_type_on_prem: "On-Premise", infra_type_cloud: "Cloud", infra_type_hybrid: "Hybrid",
            cloud_provider_label: "Cloud Provider",
            cloud_aws: "AWS", cloud_azure: "Azure", cloud_gcp: "Google Cloud", cloud_other: "Other",
            os_types_label: "Operating Systems",
            os_windows_server: "Windows Server", os_linux_server: "Linux Server", os_windows_client: "Windows Client",
            os_linux_client: "Linux Client", os_macos_client: "macOS Client",
            containerization_label: "Use of Containerization",
            option_no: "No",
            option_yes_docker: "Yes (Docker)", option_yes_k8s: "Yes (Kubernetes)",
            open_source_defense_label: "Use of Open Source Tools",
            option_no_oss: "None (Commercial tools only)", option_partial_oss: "Combination (Commercial & Open Source)", option_yes_oss: "Yes (Mainly Open Source)",
            zone_internet: "Internet / External", drop_placeholder_internet: "Drag external devices here...",
            zone_management: "Management Network", drop_placeholder_management: "SIEM, Controllers, Scanners...",
            zone_perimeter: "Perimeter Defense", drop_placeholder_perimeter: "FW, WAF, IPS...",
            zone_dmz: "DMZ", drop_placeholder_dmz: "Web Servers, App Servers...",
            zone_internal_core: "Core Servers", drop_placeholder_core: "AD, DNS...",
            zone_internal_apps: "Application Servers", drop_placeholder_internal_apps: "Internal Application Servers...",
            zone_internal_db: "Database Servers", drop_placeholder_db: "MySQL, MSSQL...",
            zone_internal_endpoints: "Endpoints", drop_placeholder_endpoints: "Windows, Linux, macOS...",
            zone_cloud_env_title_prefix: "Cloud Environment", drop_placeholder_cloud: "VMs, Storage, PaaS...",
            error_loading_arch_editor_placeholder: "Error loading architecture editor.",
            error_no_drop_zones_arch_editor: "Error: No drop zones found in architecture map.",
            edit_scenario_mitre_path_title_numbered: "3. Attack Path (MITRE ATT&CK)",
            edit_mitre_path_note: "Edit the tactics and techniques used in this scenario.",
            loading_mitre_data: "Loading MITRE data...",
            selected_mitre_path_preview_edit: "Selected Path Preview:",
            no_techniques_selected_yet_edit: "No techniques selected yet.",
            expand_button: "Expand",
            collapse_button: "Collapse",
            edit_scenario_defense_systems_title_numbered: "4. Defense Systems",
            edit_defense_systems_note: "Update the defense systems present in the scenario environment.",
            mandatory_systems_title: "Mandatory Defense Systems",
            optional_systems_title: "Additional Defense Systems (Optional)",
            select_vendor: "Select vendor...",
            select_optional: "Select (optional)",
            firewall_vendor_label: "Firewall",
                vendor_pa_select: "Palo Alto Networks", vendor_fortinet_select: "Fortinet FortiGate", /* ... */
            epp_edr_vendor_label: "Endpoint Protection (EPP/EDR)",
                vendor_ms_defender_edr_select: "Microsoft Defender for Endpoint", /* ... */
            siem_vendor_label: "SIEM / Log Management",
                vendor_splunk_select: "Splunk Enterprise Security", /* ... */
            // Other vendor and system labels reused from create_scenario_translations
            wizard_prev_button: "Previous",
            wizard_next_button: "Next",
            save_changes_button: "Save Changes",
            step_counter_text: "Step {current} of {total}",
            step_counter_text_initial: "Step 1 of 4",
            error_loading_scenario_data_alert: "Error: Could not load scenario data.",
            changes_saved_successfully_placeholder: "Changes saved (simulated).",
            scenario_not_found_title: "Error",
            error_loading_scenario_data: "Error loading scenario data.",
            go_back_to_manage_scenarios_from_edit: "Back to Manage Scenarios",
            go_to_monitor_simulations_from_edit: "Continue to Monitor Simulations"
        }
    };
    // Merge these translations with the global translations
    if (window.translations) {
        if (window.translations.he) { Object.assign(window.translations.he, pageTranslations.he); }
        else { window.translations.he = pageTranslations.he; }
        if (window.translations.en) { Object.assign(window.translations.en, pageTranslations.en); }
        else { window.translations.en = pageTranslations.en; }
        // It's crucial to re-apply translations after merging page-specific ones,
        // especially if app-global.js might have already run.
        if (typeof window.applyTranslationsGlobal === 'function') {
            window.applyTranslationsGlobal();
        }
    } else {
        console.error('instructor_edit_scenario_translations.js: Global translations object (window.translations) not found.');
        window.translations = pageTranslations; // Fallback
        if (typeof window.applyTranslationsGlobal === 'function') {
            window.applyTranslationsGlobal();
        }
    }
});