// instructor_create_scenario_translations.js
'use strict';
document.addEventListener('DOMContentLoaded', function() {
    const pageTranslations = {
        he: {
            instructor_create_scenario_page_title: "יצירת תרחיש חדש - פלטפורמת סימולציות סייבר",
            instructor_create_scenario_title_main: "יצירת תרחיש חדש", // Main header for the page
            // Components Sidebar
            available_components_title: "רכיבים זמינים",
            components_network_devices: "התקני רשת",
            components_security_tools: "כלי אבטחה",
            components_servers: "שרתים",
            components_endpoints: "תחנות קצה",
            components_cloud_services: "שירותי ענן",
            component_pfsense_firewall_os: "pfSense (קוד פתוח)",
            component_elastic_siem_os: "Elastic SIEM (קוד פתוח)",
            component_wazuh_siem_ids_os: "Wazuh (SIEM/IDS - קוד פתוח)",
            component_modsecurity_waf_os: "ModSecurity (קוד פתוח)",
            component_suricata_ids_ips_os: "Suricata (IDS/IPS - קוד פתוח)",
            component_snort_ids_ips_os: "Snort (IDS/IPS - קוד פתוח)",
            // Architecture Map Section
            architecture_map_title_no_num: "מפת ארכיטקטורה",
            architecture_note_drag: "גרור רכיבים מהרשימה בצד והצב אותם באזורים המתאימים.",
            architecture_note_dynamic: "מבנה האזורים והרכיבים הזמינים עשוי להשתנות בהתאם לבחירותיך בתצורת הסביבה.",
            architecture_note_future: "\"מיגנוט\" וחיבורים ויזואליים יתווספו בשלבים מתקדמים יותר.",
            zone_internet: "אינטרנט / חיצוני",
            drop_placeholder_internet: "גרור לכאן התקנים חיצוניים...",
            zone_management: "רשת ניהול",
            drop_placeholder_management: "SIEM, בקרה, סורקים...",
            zone_perimeter: "הגנה היקפית",
            drop_placeholder_perimeter: "FW, WAF, IPS...",
            zone_dmz: "DMZ",
            drop_placeholder_dmz: "שרתי Web, אפליקציה...",
            zone_internal_core: "שרתי ליבה",
            drop_placeholder_core: "AD, DNS...",
            zone_internal_apps: "שרתי יישומים",
            drop_placeholder_internal_apps: "שרתי אפליקציות פנימיים...",
            zone_internal_db: "בסיסי נתונים",
            drop_placeholder_db: "MySQL, MSSQL...",
            zone_internal_endpoints: "תחנות קצה",
            drop_placeholder_endpoints: "Windows, Linux, macOS...",
            zone_cloud_env_title_prefix: "סביבת ענן",
            drop_placeholder_cloud: "VMs, Storage, PaaS...",
            remove_item_tooltip: "הסר פריט",
            // Basic Scenario Details Section
            scenario_basic_details_title_numbered: "1. פרטי תרחיש בסיסיים",
            scenario_name_label: "שם התרחיש",
            scenario_name_placeholder_key: "הכנס שם תרחיש", // Placeholder for JS if needed, HTML has direct text
            scenario_difficulty_label: "רמת קושי",
            // difficulty options (easy, medium, hard, expert) are in app-global.js
            scenario_description_label: "תיאור התרחיש",
            scenario_desc_placeholder_key: "הכנס תיאור מפורט של התרחיש...", // Placeholder for JS
            mitre_tags_label: "תגיות MITRE ATT&CK (מופרדות בפסיק)",
            mitre_tags_placeholder: "לדוגמה: T1566.001, TA0007, T1059.003", // from app-global.js
            mitre_tags_helper: "הזן מזהי טקטיקות (TAxxxx) או טכניקות (Txxxx, Txxxx.xxx).",
            // Environment Configuration Section
            environment_config_title_numbered: "2. תצורת סביבה",
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
            select_os: "--בחר מערכת הפעלה--",
            os_windows_server: "Windows Server", os_linux_server: "Linux Server", os_windows_client: "Windows Client",
            os_linux_client: "Linux Client", os_macos_client: "macOS Client",
            os_types_helper: "לחץ על Ctrl (או Cmd ב-Mac) כדי לבחור מספר אפשרויות",
            containerization_label: "שימוש בקונטיינריזציה",
            option_no: "לא", // Reused
            option_yes_docker: "כן (Docker)", option_yes_k8s: "כן (Kubernetes)",
            open_source_defense_label: "שימוש בכלי קוד פתוח",
            option_no_oss: "ללא (רק כלים מסחריים)", option_partial_oss: "שילוב (מסחרי וקוד פתוח)", option_yes_oss: "כן (בעיקר קוד פתוח)",
            // Defense Systems Section
            security_systems_config_title_numbered: "3. בחירת מערכות הגנה ייעודיות",
            mandatory_systems_title: "מערכות הגנה חובה",
            optional_systems_title: "מערכות הגנה נוספות (אופציונלי)",
            select_vendor: "בחר וונדור...",
            select_optional: "בחר (אופציונלי)",
            firewall_vendor_label: "חומת אש (Firewall)",
                vendor_pa_select: "Palo Alto Networks", vendor_fortinet_select: "Fortinet FortiGate", vendor_cisco_asa_select: "Cisco ASA",
                vendor_checkpoint_select: "Check Point", vendor_juniper_srx_select: "Juniper SRX", vendor_sophos_select: "Sophos XG Firewall",
                vendor_watchguard_select: "WatchGuard Firebox", vendor_sonicwall_select: "SonicWall NSA",
                vendor_pfsense_select: "pfSense (קוד פתוח)", vendor_opnsense_select: "OPNsense (קוד פתוח)",
            epp_edr_vendor_label: "הגנת נקודות קצה (EPP/EDR)",
                vendor_ms_defender_edr_select: "Microsoft Defender for Endpoint", vendor_crowdstrike_select: "CrowdStrike Falcon",
                vendor_sentinelone_select: "SentinelOne Singularity", vendor_carbonblack_select: "VMware Carbon Black",
                vendor_symantec_select: "Broadcom Symantec SEP", vendor_trendmicro_select: "Trend Micro Apex One",
                vendor_mcafee_select: "McAfee Endpoint Security", vendor_sophos_edr_select: "Sophos Intercept X",
                vendor_osquery_select: "osquery + Fleet/Kolide (קוד פתוח)", vendor_wazuh_agent_select: "Wazuh Agent (קוד פתוח)",
            siem_vendor_label: "מערכת SIEM / ניהול לוגים",
                vendor_splunk_select: "Splunk Enterprise Security", vendor_elastic_select: "Elastic SIEM (ELK)",
                vendor_qradar_select: "IBM QRadar", vendor_azure_sentinel_select: "Microsoft Sentinel",
                vendor_chronicle_select: "Google Chronicle SOAR", vendor_logrhythm_select: "LogRhythm Axon",
                vendor_arcsight_select: "ArcSight ESM", vendor_exabeam_select: "Exabeam Fusion SIEM",
                vendor_wazuh_select: "Wazuh (קוד פתוח)", vendor_graylog_select: "Graylog (קוד פתוח)",
            waf_vendor_label: "WAF",
                vendor_cloudflare_waf: "Cloudflare WAF", vendor_aws_waf: "AWS WAF", vendor_azure_waf: "Azure WAF",
                vendor_imperva_waf: "Imperva WAF", vendor_f5_waf: "F5 BIG-IP ASM", vendor_barracuda_waf: "Barracuda WAF",
                vendor_signalsciences_waf: "Signal Sciences WAF", vendor_radware_waf: "Radware AppWall",
                vendor_modsecurity: "ModSecurity (קוד פתוח)",
            ips_ids_vendor_label: "IPS/IDS",
                vendor_cisco_firepower: "Cisco Firepower (NGIPS)", vendor_fortinet_ips: "Fortinet FortiGate IPS",
                vendor_tippingpoint: "Trend Micro TippingPoint", vendor_mcafee_nsp: "McAfee Network Security Platform",
                vendor_darktrace_ips: "Darktrace Antigena (Network)",
                vendor_suricata: "Suricata (קוד פתוח)", vendor_snort: "Snort (קוד פתוח)", vendor_zeek_ids: "Zeek (Bro) IDS (קוד פתוח)",
            ndr_vendor_label: "NDR",
                vendor_darktrace_ndr: "Darktrace Enterprise Immune System", vendor_vectra_ndr: "Vectra AI Platform",
                vendor_extrahop_ndr: "ExtraHop Reveal(x)", vendor_corelight_ndr: "Corelight (מבוסס Zeek)",
                vendor_cisco_stealthwatch_ndr: "Cisco Secure Network Analytics (Stealthwatch)",
                vendor_splunk_ueba_ndr: "Splunk UBA/NDR capabilities", vendor_ms_defender_iot_ndr: "Microsoft Defender for IoT (NDR for OT/IoT)",
                vendor_zeek_ndr: "Zeek (Bro) (קוד פתוח)",
            xdr_vendor_label: "XDR",
                vendor_pa_cortex: "Palo Alto Cortex XDR", vendor_ms_365_defender: "Microsoft 365 Defender (XDR)",
                vendor_cybereason_xdr: "Cybereason XDR Platform", vendor_rapid7_idr: "Rapid7 InsightIDR (XDR capabilities)",
                vendor_trellix_xdr: "Trellix Helix XDR", vendor_cisco_xdr: "Cisco XDR", vendor_fortinet_xdr: "Fortinet FortiXDR",
            // MITRE Path Section
            mitre_path_section_title_numbered: "4. בניית נתיב תקיפה (MITRE ATT&CK)",
            expand_button: "הרחב",
            collapse_button: "צמצם", // New
            mitre_select_techniques_prompt: "בחר טכניקות עבור כל טקטיקה רלוונטית לתרחיש זה.",
            loading_mitre_data: "טוען נתוני MITRE...",
            selected_mitre_path_preview: "תצוגה מקדימה של הנתיב הנבחר:",
            no_techniques_selected_yet: "טרם נבחרו טכניקות.",
            // MITRE Tactics (reusing from app-global now)
            // MITRE Techniques (example keys - actual keys are Txxxx, these are for display name)
            mitre_technique_phishing: "פישינג (T1566)",
            mitre_technique_command_and_scripting_interpreter: "מפרש פקודות וסקריפטים (T1059)",
            // Action Buttons
            preview_scenario_button: "תצוגה מקדימה",
            save_scenario_button: "שמור תרחיש",
            // Suggestion Pane
            suggestion_pane_text: "אם אינך רואה את המוצר המוכר לך כאן, אנא רשום לנו אותו ואנחנו נדאג שהוא יופיע!",
            // Keys from instructor_create_scenario_translations.js that are relevant here
            define_attack_path_title: "הגדרת נתיב תקיפה חדש", // Might be useful if MITRE part becomes complex
            attack_path_name_label: "שם נתיב התקיפה:",
            attack_path_name_placeholder: "לדוגמה: מתקפת כופר מורכבת עם דגש על הרשאות",
            save_attack_path_button: "שמור נתיב תקיפה",
            clear_selection_button: "נקה בחירה נוכחית",
            select_tactics_techniques_title: "בחר טקטיקות וטכניקות",
            selected_path_empty_placeholder: "הנתיב הנבחר יוצג כאן לאחר בחירת טכניקות...",
            alert_enter_path_name: "אנא הזן שם עבור נתיב התקיפה.",
            alert_select_techniques: "אנא בחר לפחות טכניקה אחת עבור נתיב התקיפה.",
            alert_path_saved_successfully: "נתיב התקיפה '{pathName}' נשמר בהצלחה (סימולציה).",
            // All mitre_tactic_taXXXX and mitre_tech_tXXXX keys are in app-global.js
        },
        en: {
            instructor_create_scenario_page_title: "Create New Scenario - Cyber Simulation Platform",
            instructor_create_scenario_title_main: "Create New Scenario",
            available_components_title: "Available Components",
            components_network_devices: "Network Devices",
            components_security_tools: "Security Tools",
            components_servers: "Servers",
            components_endpoints: "Endpoints",
            components_cloud_services: "Cloud Services",
            component_pfsense_firewall_os: "pfSense (Open Source)",
            component_elastic_siem_os: "Elastic SIEM (Open Source)",
            component_wazuh_siem_ids_os: "Wazuh (SIEM/IDS - Open Source)",
            component_modsecurity_waf_os: "ModSecurity (Open Source)",
            component_suricata_ids_ips_os: "Suricata (IDS/IPS - Open Source)",
            component_snort_ids_ips_os: "Snort (IDS/IPS - Open Source)",
            architecture_map_title_no_num: "Architecture Map",
            architecture_note_drag: "Drag components from the side list and drop them into the appropriate zones.",
            architecture_note_dynamic: "The zone structure and available components may change based on your environment configuration choices.",
            architecture_note_future: "\"Magnetization\" and visual connections will be added in later stages.",
            zone_internet: "Internet / External",
            drop_placeholder_internet: "Drag external devices here...",
            zone_management: "Management Network",
            drop_placeholder_management: "SIEM, Controllers, Scanners...",
            zone_perimeter: "Perimeter Defense",
            drop_placeholder_perimeter: "FW, WAF, IPS...",
            zone_dmz: "DMZ",
            drop_placeholder_dmz: "Web Servers, App Servers...",
            zone_internal_core: "Core Servers",
            drop_placeholder_core: "AD, DNS...",
            zone_internal_apps: "Application Servers",
            drop_placeholder_internal_apps: "Internal Application Servers...",
            zone_internal_db: "Database Servers",
            drop_placeholder_db: "MySQL, MSSQL...",
            zone_internal_endpoints: "Endpoints",
            drop_placeholder_endpoints: "Windows, Linux, macOS...",
            zone_cloud_env_title_prefix: "Cloud Environment",
            drop_placeholder_cloud: "VMs, Storage, PaaS...",
            remove_item_tooltip: "Remove item",
            scenario_basic_details_title_numbered: "1. Basic Scenario Details",
            scenario_name_label: "Scenario Name",
            scenario_name_placeholder_key: "Enter scenario name",
            scenario_difficulty_label: "Difficulty Level",
            scenario_description_label: "Scenario Description",
            scenario_desc_placeholder_key: "Enter a detailed description of the scenario...",
            mitre_tags_label: "MITRE ATT&CK Tags (comma-separated)",
            mitre_tags_placeholder: "e.g., T1566.001, TA0007, T1059.003", // from app-global.js
            mitre_tags_helper: "Enter Tactic IDs (TAxxxx) or Technique IDs (Txxxx, Txxxx.xxx).",
            environment_config_title_numbered: "2. Environment Configuration",
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
            select_os: "--Please select an OS--",
            os_windows_server: "Windows Server", os_linux_server: "Linux Server", os_windows_client: "Windows Client",
            os_linux_client: "Linux Client", os_macos_client: "macOS Client",
            os_types_helper: "Press Ctrl (or Cmd on Mac) to select multiple options",
            containerization_label: "Use of Containerization",
            option_no: "No", // Reused
            option_yes_docker: "Yes (Docker)", option_yes_k8s: "Yes (Kubernetes)",
            open_source_defense_label: "Use of Open Source Tools",
            option_no_oss: "None (Commercial tools only)", option_partial_oss: "Combination (Commercial & Open Source)", option_yes_oss: "Yes (Mainly Open Source)",
            security_systems_config_title_numbered: "3. Select Specific Defense Systems",
            mandatory_systems_title: "Mandatory Defense Systems",
            optional_systems_title: "Additional Defense Systems (Optional)",
            select_vendor: "Select vendor...",
            select_optional: "Select (optional)",
            firewall_vendor_label: "Firewall",
                vendor_pa_select: "Palo Alto Networks", vendor_fortinet_select: "Fortinet FortiGate", vendor_cisco_asa_select: "Cisco ASA",
                vendor_checkpoint_select: "Check Point", vendor_juniper_srx_select: "Juniper SRX", vendor_sophos_select: "Sophos XG Firewall",
                vendor_watchguard_select: "WatchGuard Firebox", vendor_sonicwall_select: "SonicWall NSA",
                vendor_pfsense_select: "pfSense (Open Source)", vendor_opnsense_select: "OPNsense (Open Source)",
            epp_edr_vendor_label: "Endpoint Protection (EPP/EDR)",
                vendor_ms_defender_edr_select: "Microsoft Defender for Endpoint", vendor_crowdstrike_select: "CrowdStrike Falcon",
                vendor_sentinelone_select: "SentinelOne Singularity", vendor_carbonblack_select: "VMware Carbon Black",
                vendor_symantec_select: "Broadcom Symantec SEP", vendor_trendmicro_select: "Trend Micro Apex One",
                vendor_mcafee_select: "McAfee Endpoint Security", vendor_sophos_edr_select: "Sophos Intercept X",
                vendor_osquery_select: "osquery + Fleet/Kolide (Open Source)", vendor_wazuh_agent_select: "Wazuh Agent (Open Source)",
            siem_vendor_label: "SIEM / Log Management",
                vendor_splunk_select: "Splunk Enterprise Security", vendor_elastic_select: "Elastic SIEM (ELK)",
                vendor_qradar_select: "IBM QRadar", vendor_azure_sentinel_select: "Microsoft Sentinel",
                vendor_chronicle_select: "Google Chronicle SOAR", vendor_logrhythm_select: "LogRhythm Axon",
                vendor_arcsight_select: "ArcSight ESM", vendor_exabeam_select: "Exabeam Fusion SIEM",
                vendor_wazuh_select: "Wazuh (Open Source)", vendor_graylog_select: "Graylog (Open Source)",
            waf_vendor_label: "WAF",
                vendor_cloudflare_waf: "Cloudflare WAF", vendor_aws_waf: "AWS WAF", vendor_azure_waf: "Azure WAF",
                vendor_imperva_waf: "Imperva WAF", vendor_f5_waf: "F5 BIG-IP ASM", vendor_barracuda_waf: "Barracuda WAF",
                vendor_signalsciences_waf: "Signal Sciences WAF", vendor_radware_waf: "Radware AppWall",
                vendor_modsecurity: "ModSecurity (Open Source)",
            ips_ids_vendor_label: "IPS/IDS",
                vendor_cisco_firepower: "Cisco Firepower (NGIPS)", vendor_fortinet_ips: "Fortinet FortiGate IPS",
                vendor_tippingpoint: "Trend Micro TippingPoint", vendor_mcafee_nsp: "McAfee Network Security Platform",
                vendor_darktrace_ips: "Darktrace Antigena (Network)",
                vendor_suricata: "Suricata (Open Source)", vendor_snort: "Snort (Open Source)", vendor_zeek_ids: "Zeek (Bro) IDS (Open Source)",
            ndr_vendor_label: "NDR",
                vendor_darktrace_ndr: "Darktrace Enterprise Immune System", vendor_vectra_ndr: "Vectra AI Platform",
                vendor_extrahop_ndr: "ExtraHop Reveal(x)", vendor_corelight_ndr: "Corelight (Zeek-based)",
                vendor_cisco_stealthwatch_ndr: "Cisco Secure Network Analytics (Stealthwatch)",
                vendor_splunk_ueba_ndr: "Splunk UBA/NDR capabilities", vendor_ms_defender_iot_ndr: "Microsoft Defender for IoT (NDR for OT/IoT)",
                vendor_zeek_ndr: "Zeek (Bro) (Open Source)",
            xdr_vendor_label: "XDR",
                vendor_pa_cortex: "Palo Alto Cortex XDR", vendor_ms_365_defender: "Microsoft 365 Defender (XDR)",
                vendor_cybereason_xdr: "Cybereason XDR Platform", vendor_rapid7_idr: "Rapid7 InsightIDR (XDR capabilities)",
                vendor_trellix_xdr: "Trellix Helix XDR", vendor_cisco_xdr: "Cisco XDR", vendor_fortinet_xdr: "Fortinet FortiXDR",
            mitre_path_section_title_numbered: "4. Build Attack Path (MITRE ATT&CK)",
            expand_button: "Expand",
            collapse_button: "Collapse", // New
            mitre_select_techniques_prompt: "Select techniques for each relevant tactic for this scenario.",
            loading_mitre_data: "Loading MITRE data...",
            selected_mitre_path_preview: "Selected Path Preview:",
            no_techniques_selected_yet: "No techniques selected yet.",
            mitre_technique_phishing: "Phishing (T1566)",
            mitre_technique_command_and_scripting_interpreter: "Command and Scripting Interpreter (T1059)",
            preview_scenario_button: "Preview Scenario",
            save_scenario_button: "Save Scenario",
            suggestion_pane_text: "If you don't see a familiar product here, please let us know and we'll make sure it appears!",
            define_attack_path_title: "Define New Attack Path",
            attack_path_name_label: "Attack Path Name:",
            attack_path_name_placeholder: "e.g., Complex Ransomware Attack with Privilege Focus",
            save_attack_path_button: "Save Attack Path",
            clear_selection_button: "Clear Current Selection",
            select_tactics_techniques_title: "Select Tactics & Techniques",
            selected_path_empty_placeholder: "The selected path will be displayed here once techniques are chosen...",
            alert_enter_path_name: "Please enter a name for the attack path.",
            alert_select_techniques: "Please select at least one technique for the attack path.",
            alert_path_saved_successfully: "Attack path '{pathName}' saved successfully (simulation)."
        }
    };
    if (window.translations) {
        if (window.translations.he) { Object.assign(window.translations.he, pageTranslations.he); }
        else { window.translations.he = pageTranslations.he; }
        if (window.translations.en) { Object.assign(window.translations.en, pageTranslations.en); }
        else { window.translations.en = pageTranslations.en; }
        // Merge MITRE tactics and techniques from app-global if they are not already page-specific
        // This assumes mitre_tactic_taXXXX and mitre_tech_tXXXX keys are primarily in app-global.js
        // The specific named techniques like 'mitre_technique_phishing' can be page specific if only used here.
        if (typeof window.applyTranslationsGlobal === 'function') {
            window.applyTranslationsGlobal();
        }
    } else {
        console.error('instructor_create_scenario_translations.js: Global translations object (window.translations) not found.');
        window.translations = pageTranslations; // Fallback
        if (typeof window.applyTranslationsGlobal === 'function') {
            window.applyTranslationsGlobal();
        }
    }
});