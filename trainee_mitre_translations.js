// trainee_mitre_translations.js
'use strict';
document.addEventListener('DOMContentLoaded', function() {
    const pageTranslations = {
        he: {
            trainee_mitre_page_title: "נתיב תקיפה (MITRE ATT&CK) - פלטפורמת סימולציות",
            mitre_attack_flow_header: "נתיב התקיפה בתרחיש (MITRE ATT&CK)",
            mitre_attack_flow_subtitle: "להלן סקירה של הטקטיקות והטכניקות שזוהו בתרחיש זה, ממופות למסגרת MITRE ATT&CK.",
            mitre_legend_identified_technique: "טכניקה שזוהתה בתרחיש", // For a potential legend
            // Tactic Names (reusing keys from instructor_create_scenario or app-global if available, or define here)
            // Assuming these keys exist from previous files or app-global:
            // mitre_tactic_reconnaissance: "איסוף מודיעין (Reconnaissance)",
            // mitre_tactic_resource_development: "פיתוח משאבים (Resource Development)",
            // mitre_tactic_initial_access: "גישה ראשונית (Initial Access)",
            // mitre_tactic_execution: "הפעלה (Execution)",
            // mitre_tactic_persistence: "הישארות (Persistence)",
            // mitre_tactic_privilege_escalation: "הסלמת הרשאות (Privilege Escalation)",
            // mitre_tactic_defense_evasion: "התחמקות מהגנות (Defense Evasion)",
            // mitre_tactic_credential_access: "גישה לפרטי הזדהות (Credential Access)",
            // mitre_tactic_discovery: "גילוי (Discovery)",
            // mitre_tactic_lateral_movement: "תנועה רוחבית (Lateral Movement)",
            // mitre_tactic_collection: "איסוף (Collection)",
            // mitre_tactic_command_and_control: "שליטה ובקרה (Command and Control)",
            // mitre_tactic_exfiltration: "הוצאת מידע (Exfiltration)",
            // mitre_tactic_impact: "השפעה (Impact)",
            // Example Technique Names & Descriptions from the static HTML
            // These should ideally map to the actual technique IDs for consistency (e.g., T1566)
            // For now, creating keys based on the provided HTML text.
            tech_phishing_name: "T1566 - פישינג",
            tech_phishing_desc: "ניסיון לגרום למשתמש לפתוח קובץ זדוני או ללחוץ על קישור מתחזה.",
            tech_exploit_public_facing_name: "T1190 - ניצול אפליקציה ציבורית",
            tech_exploit_public_facing_desc: "ניצול חולשות ביישומים הפונים לאינטרנט.",
            tech_command_scripting_name: "T1059 - Command and Scripting Interpreter",
            tech_command_scripting_desc: "שימוש במפרשי פקודות (כמו PowerShell, Bash) להרצת קוד.",
            tech_scheduled_task_name: "T1053 - Scheduled Task/Job",
            tech_scheduled_task_desc: "יצירת משימות מתוזמנות להפעלה אוטומטית של קוד.",
            tech_os_credential_dumping_name: "T1003 - OS Credential Dumping",
            tech_os_credential_dumping_desc: "גניבת פרטי הזדהות ממערכת ההפעלה.",
            tech_exfiltration_over_c2_name: "T1041 - Exfiltration Over C2 Channel",
            tech_exfiltration_over_c2_desc: "הוצאת מידע דרך ערוץ שליטה ובקרה קיים.",
            tech_data_encrypted_impact_name: "T1486 - Data Encrypted for Impact",
            tech_data_encrypted_impact_desc: "הצפנת נתונים כדי לשבש פעילות או לדרוש כופר.",
            // Add more for any other techniques shown statically in the HTML table
            // Navigation buttons
            go_back_to_ai_assistant: "חזור לעוזר AI",
            go_to_mitigation_steps_from_mitre: "המשך לשלבי מיטיגציה"
        },
        en: {
            trainee_mitre_page_title: "Attack Path (MITRE ATT&CK) - Simulation Platform",
            mitre_attack_flow_header: "Scenario Attack Path (MITRE ATT&CK)",
            mitre_attack_flow_subtitle: "Below is an overview of the tactics and techniques identified in this scenario, mapped to the MITRE ATT&CK framework.",
            mitre_legend_identified_technique: "Technique identified in scenario",
            tech_phishing_name: "T1566 - Phishing",
            tech_phishing_desc: "Attempting to trick a user into opening a malicious file or clicking a deceptive link.",
            tech_exploit_public_facing_name: "T1190 - Exploit Public-Facing Application",
            tech_exploit_public_facing_desc: "Exploiting weaknesses in internet-facing applications.",
            tech_command_scripting_name: "T1059 - Command and Scripting Interpreter",
            tech_command_scripting_desc: "Using command interpreters (like PowerShell, Bash) to execute code.",
            tech_scheduled_task_name: "T1053 - Scheduled Task/Job",
            tech_scheduled_task_desc: "Creating scheduled tasks for automatic code execution.",
            tech_os_credential_dumping_name: "T1003 - OS Credential Dumping",
            tech_os_credential_dumping_desc: "Stealing credential material from the operating system.",
            tech_exfiltration_over_c2_name: "T1041 - Exfiltration Over C2 Channel",
            tech_exfiltration_over_c2_desc: "Exfiltrating data through an existing command and control channel.",
            tech_data_encrypted_impact_name: "T1486 - Data Encrypted for Impact",
            tech_data_encrypted_impact_desc: "Encrypting data to disrupt operations or demand ransom.",
            // Navigation buttons
            go_back_to_ai_assistant: "Back to AI Assistant",
            go_to_mitigation_steps_from_mitre: "Continue to Mitigation Steps"
        }
    };
    if (window.translations) {
        if (window.translations.he) {
            // Merge tactic names if they are defined globally (e.g., from app-global or mitre_builder_translations)
            const globalHeTactics = {
                mitre_tactic_reconnaissance: window.translations.he.mitre_tactic_reconnaissance || "איסוף מודיעין",
                mitre_tactic_resource_development: window.translations.he.mitre_tactic_resource_development || "פיתוח משאבים",
                mitre_tactic_initial_access: window.translations.he.mitre_tactic_initial_access || "גישה ראשונית",
                mitre_tactic_execution: window.translations.he.mitre_tactic_execution || "הפעלה",
                mitre_tactic_persistence: window.translations.he.mitre_tactic_persistence || "הישארות",
                mitre_tactic_privilege_escalation: window.translations.he.mitre_tactic_privilege_escalation || "הסלמת הרשאות",
                mitre_tactic_defense_evasion: window.translations.he.mitre_tactic_defense_evasion || "התחמקות מהגנות",
                mitre_tactic_credential_access: window.translations.he.mitre_tactic_credential_access || "גישה לפרטי הזדהות",
                mitre_tactic_discovery: window.translations.he.mitre_tactic_discovery || "גילוי",
                mitre_tactic_lateral_movement: window.translations.he.mitre_tactic_lateral_movement || "תנועה רוחבית",
                mitre_tactic_collection: window.translations.he.mitre_tactic_collection || "איסוף",
                mitre_tactic_command_and_control: window.translations.he.mitre_tactic_command_and_control || "שליטה ובקרה",
                mitre_tactic_exfiltration: window.translations.he.mitre_tactic_exfiltration || "הוצאת מידע",
                mitre_tactic_impact: window.translations.he.mitre_tactic_impact || "השפעה",
            };
            Object.assign(window.translations.he, globalHeTactics, pageTranslations.he);
        } else {
            window.translations.he = pageTranslations.he;
        }
        if (window.translations.en) {
             const globalEnTactics = {
                mitre_tactic_reconnaissance: window.translations.en.mitre_tactic_reconnaissance || "Reconnaissance",
                mitre_tactic_resource_development: window.translations.en.mitre_tactic_resource_development || "Resource Development",
                mitre_tactic_initial_access: window.translations.en.mitre_tactic_initial_access || "Initial Access",
                mitre_tactic_execution: window.translations.en.mitre_tactic_execution || "Execution",
                mitre_tactic_persistence: window.translations.en.mitre_tactic_persistence || "Persistence",
                mitre_tactic_privilege_escalation: window.translations.en.mitre_tactic_privilege_escalation || "Privilege Escalation",
                mitre_tactic_defense_evasion: window.translations.en.mitre_tactic_defense_evasion || "Defense Evasion",
                mitre_tactic_credential_access: window.translations.en.mitre_tactic_credential_access || "Credential Access",
                mitre_tactic_discovery: window.translations.en.mitre_tactic_discovery || "Discovery",
                mitre_tactic_lateral_movement: window.translations.en.mitre_tactic_lateral_movement || "Lateral Movement",
                mitre_tactic_collection: window.translations.en.mitre_tactic_collection || "Collection",
                mitre_tactic_command_and_control: window.translations.en.mitre_tactic_command_and_control || "Command and Control",
                mitre_tactic_exfiltration: window.translations.en.mitre_tactic_exfiltration || "Exfiltration",
                mitre_tactic_impact: window.translations.en.mitre_tactic_impact || "Impact",
            };
            Object.assign(window.translations.en, globalEnTactics, pageTranslations.en);
        } else {
            window.translations.en = pageTranslations.en;
        }
        if (typeof window.applyTranslationsGlobal === 'function') {
            // console.log('trainee_mitre_translations.js: Calling applyTranslationsGlobal after merge.');
            window.applyTranslationsGlobal();
        }
    } else {
        console.error('trainee_mitre_translations.js: Global translations object (window.translations) not found.');
        window.translations = pageTranslations; // Fallback
        if (typeof window.applyTranslationsGlobal === 'function') {
            window.applyTranslationsGlobal();
        }
    }
});