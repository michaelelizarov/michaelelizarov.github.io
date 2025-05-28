// instructor_monitor_simulations_translations.js
'use strict';
document.addEventListener('DOMContentLoaded', function() {
    const pageTranslations = {
        he: {
            instructor_monitor_simulations_page_title: "מעקב וניטור סימולציות - פלטפורמת סימולציות סייבר",
            monitor_simulations_header: "מעקב וניטור סימולציות",
            monitor_simulations_subtitle: "עקוב בזמן אמת אחר סימולציות פעילות, נהל אותן וצפה בהיסטוריית סימולציות קודמות.",
            kpi_active_sim_count_title: "סה\"כ סימולציות פעילות",
            kpi_running_now_subtext: "רצות כעת במערכת",
            kpi_active_participants_title: "סה\"כ משתתפים פעילים",
            kpi_currently_in_sim_subtext: "משתתפים בסימולציות פעילות",
            kpi_avg_time_in_sim_title: "זמן ממוצע בסימולציה",
            kpi_for_active_sims_subtext: "עבור סימולציות פעילות",
            kpi_avg_completion_rate_title: "אחוז השלמה ממוצע",
            kpi_for_active_sims_progress_subtext: "של התקדמות בסימולציות הפעילות",
            // minutes_suffix is in app-global.js, use that instead of minutes_suffix_short
            active_simulations_list_title: "רשימת סימולציות פעילות",
            search_sim_name_placeholder: "חפש לפי שם סימולציה/תרחיש...",
            filter_all_scenarios: "כל התרחישים",
            filter_all_teams_users: "כל הצוותים/משתמשים",
            // apply_filters_button is in app-global.js
            table_header_sim_name: "שם סימולציה",
            table_header_scenario_name_col: "תרחיש",
            table_header_team_user_col: "צוות/משתמש",
            table_header_progress: "התקדמות",
            table_header_time_left: "זמן שנותר",
            table_header_status_col: "סטטוס",
            table_header_focus: "התמקדות",
            table_header_actions_col: "פעולות",
            loading_active_simulations: "טוען סימולציות פעילות...",
            no_active_simulations_found_filter: "לא נמצאו סימולציות פעילות התואמות לסינון.", // New
            // Statuses like status_running, status_paused etc. are in app-global.js
            focus_on_simulation_tooltip: "התמקד בסימולציה", // New
            pause_sim_tooltip: "השהה סימולציה",
            stop_sim_tooltip: "עצור סימולציה",
            // view_details_tooltip is in app-global.js
            past_simulations_list_title: "היסטוריית סימולציות",
            table_header_final_score: "ציון סופי",
            table_header_completion_date: "תאריך סיום",
            loading_past_simulations: "טוען היסטוריית סימולציות...",
            no_past_simulations_found_filter: "לא נמצאו סימולציות קודמות התואמות לסינון.", // New
            status_stopped_by_instructor: "נעצרה ע\"י מדריך", // Can be specific if needed, or use a generic "stopped"
            status_error_on_sim: "שגיאה בסימולציה", // Can be specific, or use global "status_error"
            view_report_tooltip: "צפה בדוח",
            delete_log_tooltip: "מחק לוג",
            // Example data for JS mock data (keys that might be specific to this page's display)
            sim_name_example_active_1: "מתקפת כופר על בנק לאומי",
            sim_name_example_active_2: "תרגול זיהוי פישינג - רמה מתקדמת",
            sim_name_example_past_1: "פריצה לשרתי החברה (2024-04-15)",
            scenario_name_ransomware_corp: "מתקפת כופר ארגונית", // Example if scenario name is a key
            team_alpha_display: "צוות אלפא", // Example if team name is a key
            user_dana_display: "דנה כהן", // Example if user name is a key
            // Confirmation and alert messages
            confirm_pause_simulation: "האם אתה בטוח שברצונך להשהות את הסימולציה '{simName}'?",
            confirm_stop_simulation: "האם אתה בטוח שברצונך לעצור את הסימולציה '{simName}'? פעולה זו אינה הפיכה.",
            confirm_delete_log: "האם אתה בטוח שברצונך למחוק את הלוג של הסימולציה '{simName}'?",
            alert_simulation_paused: "הסימולציה הושהתה בהצלחה (סימולציה).",
            alert_simulation_stopped: "הסימולציה נעצרה בהצלחה (סימולציה).",
            alert_log_deleted: "הלוג נמחק בהצלחה (סימולציה).",
            // Navigation buttons
            go_back_to_manage_scenarios_short: "חזור לניהול תרחישים",
            go_to_reports_analytics_short: "המשך לדוחות ואנליטיקה"
        },
        en: {
            instructor_monitor_simulations_page_title: "Monitor Simulations - Cyber Simulation Platform",
            monitor_simulations_header: "Monitor Simulations",
            monitor_simulations_subtitle: "Track active simulations in real-time, manage them, and view past simulation history.",
            kpi_active_sim_count_title: "Total Active Simulations",
            kpi_running_now_subtext: "Currently running in the system",
            kpi_active_participants_title: "Total Active Participants",
            kpi_currently_in_sim_subtext: "Participants in active simulations",
            kpi_avg_time_in_sim_title: "Avg. Time in Simulation",
            kpi_for_active_sims_subtext: "For active simulations",
            kpi_avg_completion_rate_title: "Avg. Completion Rate",
            kpi_for_active_sims_progress_subtext: "Progress in active simulations",
            active_simulations_list_title: "Active Simulations List",
            search_sim_name_placeholder: "Search by simulation/scenario name...",
            filter_all_scenarios: "All Scenarios",
            filter_all_teams_users: "All Teams/Users",
            table_header_sim_name: "Simulation Name",
            table_header_scenario_name_col: "Scenario",
            table_header_team_user_col: "Team/User",
            table_header_progress: "Progress",
            table_header_time_left: "Time Left",
            table_header_status_col: "Status",
            table_header_focus: "Focus",
            table_header_actions_col: "Actions",
            loading_active_simulations: "Loading active simulations...",
            no_active_simulations_found_filter: "No active simulations found matching the filters.",
            focus_on_simulation_tooltip: "Focus on simulation",
            pause_sim_tooltip: "Pause Simulation",
            stop_sim_tooltip: "Stop Simulation",
            past_simulations_list_title: "Past Simulations History",
            table_header_final_score: "Final Score",
            table_header_completion_date: "Completion Date",
            loading_past_simulations: "Loading past simulations history...",
            no_past_simulations_found_filter: "No past simulations found matching the filters.",
            status_stopped_by_instructor: "Stopped by Instructor",
            status_error_on_sim: "Error in Simulation",
            view_report_tooltip: "View Report",
            delete_log_tooltip: "Delete Log",
            sim_name_example_active_1: "Ransomware Attack on National Bank",
            sim_name_example_active_2: "Advanced Phishing Detection Drill",
            sim_name_example_past_1: "Company Server Breach (2024-04-15)",
            scenario_name_ransomware_corp: "Corporate Ransomware Attack",
            team_alpha_display: "Alpha Team",
            user_dana_display: "Dana Cohen",
            confirm_pause_simulation: "Are you sure you want to pause simulation '{simName}'?",
            confirm_stop_simulation: "Are you sure you want to stop simulation '{simName}'? This action cannot be undone.",
            confirm_delete_log: "Are you sure you want to delete the log for simulation '{simName}'?",
            alert_simulation_paused: "Simulation paused successfully (mock).",
            alert_simulation_stopped: "Simulation stopped successfully (mock).",
            alert_log_deleted: "Log deleted successfully (mock).",
            go_back_to_manage_scenarios_short: "Back to Manage Scenarios",
            go_to_reports_analytics_short: "Continue to Reports & Analytics"
        }
    };
    if (window.translations) {
        if (window.translations.he) { Object.assign(window.translations.he, pageTranslations.he); }
        else { window.translations.he = pageTranslations.he; }
        if (window.translations.en) { Object.assign(window.translations.en, pageTranslations.en); }
        else { window.translations.en = pageTranslations.en; }
        if (typeof window.applyTranslationsGlobal === 'function') {
            window.applyTranslationsGlobal();
        }
    } else {
        console.error('instructor_monitor_simulations_translations.js: Global translations object (window.translations) not found.');
        window.translations = pageTranslations; // Fallback
        if (typeof window.applyTranslationsGlobal === 'function') {
            window.applyTranslationsGlobal();
        }
    }
});