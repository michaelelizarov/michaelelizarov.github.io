// instructor_simulation_monitor_detail_translations.js
'use strict';
document.addEventListener('DOMContentLoaded', function() {
    const pageTranslations = {
        he: {
            instructor_sim_monitor_detail_page_title: "פרטי סימולציה - פלטפורמת סימולציות סייבר",
            back_to_sim_list_link: "חזור לרשימת הסימולציות",
            sim_detail_header_prefix: "ניטור סימולציה:", // For h2
            scenario_name_placeholder_title: "[טוען שם תרחיש...]", // Placeholder for dynamic scenario name
            sim_detail_team_user_prefix: "צוות/משתמש:", // For p tag under h2
            team_user_name_placeholder: "[טוען שם צוות/משתמש...]", // Placeholder for dynamic team/user name
            // sim_status_running is already in global/monitor_simulations_translations
            pause_simulation_button: "השהה סימולציה", // Button text
            resume_simulation_button: "המשך סימולציה", // Button text for when paused
            stop_simulation_button: "עצור סימולציה",  // Button text
            send_message_hint_button: "שלח הודעה/רמז", // Button text (already in instructor_monitor_simulations_translations, ensure consistency)
            scenario_progress_timeline_title: "ציר זמן התקדמות בתרחיש",
            loading_timeline: "טוען ציר זמן...",
            // Example Timeline Stages (from HTML, ensure keys are unique if structure differs)
            timeline_stage1_title: "שלב 1: זיהוי ראשוני",
            timeline_stage1_desc_completed: "הושלם בהצלחה - {time}",
            timeline_stage1_desc_inprogress: "בתהליך... (התחלה: {time})",
            timeline_stage1_desc_pending: "ממתין",
            // ... (add keys for other stages: stage2_title, stage2_desc_completed etc. up to stage7)
            timeline_stage_default_title: "שלב {number}",
            timeline_status_completed: "הושלם",
            timeline_status_in_progress: "בתהליך",
            timeline_status_pending: "ממתין",
            timeline_status_error: "שגיאה",
            key_events_log_title: "לוג אירועים מרכזיים",
            loading_event_log: "טוען לוג אירועים...",
            no_events_to_display: "אין אירועים להצגה.",
            // Example Log Event Actors (can be dynamic, but provide common ones)
            log_actor_system: "מערכת",
            log_actor_instructor: "מדריך",
            // Example Log Messages (can be dynamic, or use general keys with parameters)
            log_event_sim_start: "הסימולציה התחילה.",
            log_event_user_action: "משתמש {userName} ביצע פעולה: {actionDetails}.",
            log_event_hint_sent: "רמז נשלח: {hintContent}.",
            log_event_error_occurred: "אירעה שגיאה: {errorDetails}.",
            current_score_and_kpis_title: "ניקוד ו-KPIs",
            kpi_current_score_label: "ניקוד נוכחי:",
            kpi_time_elapsed_label: "זמן שחלף:",
            kpi_alerts_triggered_label: "התראות שהופעלו:",
            kpi_hints_used_label: "רמזים בשימוש:",
            kpi_tasks_completed_label: "משימות שהושלמו:", // New KPI example
            // Navigation buttons
            go_back_to_monitor_list: "חזור לרשימת הסימולציות",
            go_to_reports_analytics_from_detail: "המשך לדוחות ואנליטיקה",
            enter_message_hint_prompt: "נא להזין את תוכן ההודעה/הרמז:",
            sim_status_running: "רצה",
            sim_status_paused: "מושהה", 
            sim_status_completed: "הושלמה",
            sim_status_error: "שגיאה"
        },
        en: {
            instructor_sim_monitor_detail_page_title: "Simulation Details - Cyber Simulation Platform",
            back_to_sim_list_link: "Back to Simulations List",
            sim_detail_header_prefix: "Monitoring Simulation:",
            scenario_name_placeholder_title: "[Loading Scenario Name...]",
            sim_detail_team_user_prefix: "Team/User:",
            team_user_name_placeholder: "[Loading Team/User Name...]",
            pause_simulation_button: "Pause Simulation",
            resume_simulation_button: "Resume Simulation",
            stop_simulation_button: "Stop Simulation",
            send_message_hint_button: "Send Message/Hint",
            scenario_progress_timeline_title: "Scenario Progress Timeline",
            loading_timeline: "Loading timeline...",
            timeline_stage1_title: "Stage 1: Initial Detection",
            timeline_stage1_desc_completed: "Successfully completed - {time}",
            timeline_stage1_desc_inprogress: "In progress... (Started: {time})",
            timeline_stage1_desc_pending: "Pending",
            timeline_stage_default_title: "Stage {number}",
            timeline_status_completed: "Completed",
            timeline_status_in_progress: "In Progress",
            timeline_status_pending: "Pending",
            timeline_status_error: "Error",
            key_events_log_title: "Key Events Log",
            loading_event_log: "Loading event log...",
            no_events_to_display: "No events to display.",
            log_actor_system: "System",
            log_actor_instructor: "Instructor",
            log_event_sim_start: "Simulation started.",
            log_event_user_action: "User {userName} performed action: {actionDetails}.",
            log_event_hint_sent: "Hint sent: {hintContent}.",
            log_event_error_occurred: "An error occurred: {errorDetails}.",
            current_score_and_kpis_title: "Current Score & KPIs",
            kpi_current_score_label: "Current Score:",
            kpi_time_elapsed_label: "Time Elapsed:",
            kpi_alerts_triggered_label: "Alerts Triggered:",
            kpi_hints_used_label: "Hints Used:",
            kpi_tasks_completed_label: "Tasks Completed:",
            // Navigation buttons
            go_back_to_monitor_list: "Back to Simulations List",
            go_to_reports_analytics_from_detail: "Continue to Reports & Analytics",
            enter_message_hint_prompt: "Please enter the message/hint content:",
            sim_status_running: "Running",
            sim_status_paused: "Paused",
            sim_status_completed: "Completed",
            sim_status_error: "Error"
        }
    };
    // Placeholder keys for timeline stages from original HTML example
    // This ensures they can be translated if used directly by JS
    const timelineStageKeys = {
        he: {
            timeline_stage2_title: "שלב 2: בידוד המערכת הנגועה",
            timeline_stage3_title: "שלב 3: ניתוח הנוזקה",
            timeline_stage4_title: "שלב 4: ניקוי והסרה",
            timeline_stage5_title: "שלב 5: התאוששות ותחקור",
            timeline_stage6_title: "שלב 6: עדכון מדיניות",
            timeline_stage7_title: "שלב 7: סגירת אירוע",
            // Descriptions (can be parameterized with {time} or status)
            timeline_stage2_desc_pending: "ממתין",
            // ... add all relevant stage titles and description patterns
        },
        en: {
            timeline_stage2_title: "Stage 2: Isolate Affected System",
            timeline_stage3_title: "Stage 3: Malware Analysis",
            timeline_stage4_title: "Stage 4: Containment & Eradication",
            timeline_stage5_title: "Stage 5: Recovery & Post-Mortem",
            timeline_stage6_title: "Stage 6: Policy Update",
            timeline_stage7_title: "Stage 7: Incident Closure",
            timeline_stage2_desc_pending: "Pending",
            // ...
        }
    };
    if (window.translations) {
        if (window.translations.he) {
            Object.assign(window.translations.he, pageTranslations.he, timelineStageKeys.he);
        } else {
            window.translations.he = {...pageTranslations.he, ...timelineStageKeys.he};
        }
        if (window.translations.en) {
            Object.assign(window.translations.en, pageTranslations.en, timelineStageKeys.en);
        } else {
            window.translations.en = {...pageTranslations.en, ...timelineStageKeys.en};
        }
        if (typeof window.applyTranslationsGlobal === 'function') {
            // console.log('instructor_simulation_monitor_detail_translations.js: Calling applyTranslationsGlobal after merge.');
            window.applyTranslationsGlobal();
        }
    } else {
        console.error('instructor_simulation_monitor_detail_translations.js: Global translations object (window.translations) not found.');
        window.translations = pageTranslations; // Fallback
        if (window.translations.he) Object.assign(window.translations.he, timelineStageKeys.he);
        if (window.translations.en) Object.assign(window.translations.en, timelineStageKeys.en);
        if (typeof window.applyTranslationsGlobal === 'function') {
            window.applyTranslationsGlobal();
        }
    }
});