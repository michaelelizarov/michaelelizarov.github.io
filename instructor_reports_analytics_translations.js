// instructor_reports_analytics_translations.js
'use strict';
document.addEventListener('DOMContentLoaded', function() {
    const pageTranslations = {
        he: {
            instructor_reports_analytics_page_title: "דוחות ואנליטיקה - פלטפורמת סימולציות סייבר",
            reports_analytics_header: "דוחות ואנליטיקה",
            reports_analytics_subtitle: "נתח ביצועי משתתפים, מגמות בתרחישים, וקבל תובנות לשיפור תהליכי ההכשרה.",
            start_date_label: "מתאריך:",
            end_date_label: "עד תאריך:",
            apply_date_range_button: "החל טווח תאריכים",
            export_report_button: "ייצא דוח (PDF)",
            kpi_completed_sims_title: "סה\"כ סימולציות שהושלמו",
            kpi_in_selected_range_subtext: "בטווח התאריכים הנבחר",
            kpi_avg_success_rate_title: "אחוז הצלחה ממוצע",
            kpi_across_all_scenarios_subtext: "בכלל התרחישים",
            kpi_avg_resolution_time_title: "זמן ממוצע לפתרון",
            kpi_per_scenario_subtext: "לתרחיש בודד",
            kpi_most_challenging_scenario_title: "התרחיש המאתגר ביותר",
            kpi_lowest_avg_score_subtext: "עם הציון הממוצע הנמוך ביותר",
            kpi_no_data_placeholder_short: "אין נתונים", // From HTML
            participant_performance_chart_title: "ביצועי משתתפים לאורך זמן",
            score_distribution_chart_title: "התפלגות ציונים לפי תרחיש",
            stage_completion_time_chart_title: "זמן ממוצע להשלמת שלבים (TOP 5 תרחישים)",
            resource_allocation_chart_title: "ניתוח הקצאת משאבים לפי תרחיש",
            chart_no_data_participant_perf: "אין נתונים לגרף ביצועי משתתפים.",
            chart_no_data_score_dist: "אין נתונים לגרף התפלגות ציונים.",
            chart_no_data_stage_complete: "אין נתונים לגרף זמן השלמת שלבים.",
            chart_no_data_resource_allocation: "אין נתונים לגרף הקצאת משאבים.",
            chart_dataset_avg_score: "ציון ממוצע",
            chart_dataset_time_minutes: "זמן (דקות)",
            // Pagination translations
            pagination_previous: "הקודם",
            pagination_next: "הבא",
            pagination_page_num: "עמוד {num}",
            minutes_suffix: "דקות",
            // Resource allocation chart labels
            resource_type_cpu: "מעבד (CPU)",
            resource_type_memory: "זיכרון",
            resource_type_storage: "אחסון",
            resource_type_network: "רשת",
            resource_type_other: "אחר",
            scenario_phishing_short: "פישינג", // Example for chart label
            scenario_ransomware_short: "כופרה",
            scenario_insider_short: "איום פנימי",
            scenario_web_breach_short: "פריצת Web",
            scenario_data_leak_short: "דלף מידע",
            stage_1_label: "שלב 1: זיהוי ראשוני",
            stage_2_label: "שלב 2: הכלה",
            stage_3_label: "שלב 3: מיגור",
            stage_4_label: "שלב 4: שחזור",
            stage_5_label: "שלב 5: הפקת לקחים",
            detailed_reports_table_title: "דוחות מפורטים",
            filter_all_scenarios: "כל התרחישים",
            filter_all_teams_users_detailed: "כל המשתמשים/צוותים",
            reports_table_header_user_team: "משתמש/צוות",
            reports_table_header_scenario: "תרחיש",
            reports_table_header_date: "תאריך",
            reports_table_header_score: "ציון",
            reports_table_header_completion_time: "זמן השלמה",
            reports_table_header_actions: "פעולות",
            loading_detailed_reports: "טוען דוחות מפורטים...",
            no_reports_found_filter: "לא נמצאו דוחות התואמים לסינון.", // New
            view_full_report_link: "צפה בדוח מלא",
            // Example data keys
            user_team_example_alpha: "צוות אלפא",
            user_team_example_beta: "צוות בטא",
            user_example_yossi: "יוסי כהן",
            scenario_example_ransom: "תרחיש כופרה מורכב",
            scenario_example_phishing: "תרחיש פישינג מתקדם",
            // Alerts
            export_report_success_alert: "הדוח יוצא בהצלחה (סימולציה).",
            export_report_error_alert: "שגיאה בייצוא הדוח.",
            // Navigation buttons
            go_back_to_monitor_simulations_short: "חזור לניטור סימולציות",
            go_to_content_management_short: "המשך לניהול תוכן"
        },
        en: {
            instructor_reports_analytics_page_title: "Reports & Analytics - Cyber Simulation Platform",
            reports_analytics_header: "Reports & Analytics",
            reports_analytics_subtitle: "Analyze participant performance, scenario trends, and gain insights to improve training processes.",
            start_date_label: "From Date:",
            end_date_label: "To Date:",
            apply_date_range_button: "Apply Date Range",
            export_report_button: "Export Report (PDF)",
            kpi_completed_sims_title: "Total Completed Simulations",
            kpi_in_selected_range_subtext: "In the selected date range",
            kpi_avg_success_rate_title: "Average Success Rate",
            kpi_across_all_scenarios_subtext: "Across all scenarios",
            kpi_avg_resolution_time_title: "Average Resolution Time",
            kpi_per_scenario_subtext: "Per scenario",
            kpi_most_challenging_scenario_title: "Most Challenging Scenario",
            kpi_lowest_avg_score_subtext: "With the lowest average score",
            kpi_no_data_placeholder_short: "N/A",
            participant_performance_chart_title: "Participant Performance Over Time",
            score_distribution_chart_title: "Score Distribution by Scenario",
            stage_completion_time_chart_title: "Average Stage Completion Time (Top 5 Scenarios)",
            resource_allocation_chart_title: "Resource Allocation Analysis by Scenario",
            chart_no_data_participant_perf: "No data for participant performance chart.",
            chart_no_data_score_dist: "No data for score distribution chart.",
            chart_no_data_stage_complete: "No data for stage completion time chart.",
            chart_no_data_resource_allocation: "No data for resource allocation chart.",
            chart_dataset_avg_score: "Average Score",
            chart_dataset_time_minutes: "Time (minutes)",
            // Pagination translations
            pagination_previous: "Previous",
            pagination_next: "Next",
            pagination_page_num: "Page {num}",
            minutes_suffix: "min",
            // Resource allocation chart labels
            resource_type_cpu: "CPU",
            resource_type_memory: "Memory",
            resource_type_storage: "Storage",
            resource_type_network: "Network",
            resource_type_other: "Other",
            scenario_phishing_short: "Phishing",
            scenario_ransomware_short: "Ransomware",
            scenario_insider_short: "Insider",
            scenario_web_breach_short: "Web Breach",
            scenario_data_leak_short: "Data Leak",
            stage_1_label: "Stage 1: Initial Detection",
            stage_2_label: "Stage 2: Containment",
            stage_3_label: "Stage 3: Eradication",
            stage_4_label: "Stage 4: Recovery",
            stage_5_label: "Stage 5: Lessons Learned",
            detailed_reports_table_title: "Detailed Reports",
            filter_all_scenarios: "All Scenarios",
            filter_all_teams_users_detailed: "All Users/Teams",
            reports_table_header_user_team: "User/Team",
            reports_table_header_scenario: "Scenario",
            reports_table_header_date: "Date",
            reports_table_header_score: "Score",
            reports_table_header_completion_time: "Completion Time",
            reports_table_header_actions: "Actions",
            loading_detailed_reports: "Loading detailed reports...",
            no_reports_found_filter: "No reports found matching the filters.",
            view_full_report_link: "View Full Report",
            user_team_example_alpha: "Alpha Team",
            user_team_example_beta: "Beta Team",
            user_example_yossi: "Yossi Cohen",
            scenario_example_ransom: "Complex Ransomware Scenario",
            scenario_example_phishing: "Advanced Phishing Scenario",
            export_report_success_alert: "Report exported successfully (mock).",
            export_report_error_alert: "Error exporting report.",
            go_back_to_monitor_simulations_short: "Back to Monitor Simulations",
            go_to_content_management_short: "Continue to Content Management"
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
        console.error('instructor_reports_analytics_translations.js: Global translations object (window.translations) not found.');
        window.translations = pageTranslations; // Fallback
        if (typeof window.applyTranslationsGlobal === 'function') {
            window.applyTranslationsGlobal();
        }
    }
});