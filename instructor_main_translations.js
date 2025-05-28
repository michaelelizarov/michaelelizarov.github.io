// instructor_main_translations.js
'use strict';
document.addEventListener('DOMContentLoaded', function() {
    const pageTranslations = {
        he: {
            // Page specific
            instructor_dashboard_page_title: "לוח מחוונים מדריך - פלטפורמת סימולציות סייבר",
            instructor_dashboard_header: "לוח מחוונים",
            welcome_message_instructor: "ברוך הבא, מדריך ראשי",
            profile_image_alt_key: "תמונת פרופיל מדריך",
            // KPIs - Titles, Subtexts, Links
            kpi_active_simulations_title: "סימולציות פעילות",
            kpi_active_simulations_subtext: "סימולציות רצות כעת",
            kpi_view_all_link: "צפה בכולן",
            kpi_total_scenarios_title: "סה\"כ תרחישים",
            kpi_total_scenarios_subtext: "תרחישים זמינים במערכת",
            kpi_instructor_manage_scenarios_link: "נהל תרחישים",
            kpi_active_participants_teams_title: "משתתפים פעילים (צוותים)",
            kpi_active_participants_teams_subtext: "משתתפים מחוברים כעת / סה\"כ צוותים פעילים",
            kpi_instructor_manage_users_teams_link: "נהל משתמשים וצוותים",
            kpi_avg_score_title: "ממוצע ציונים",
            kpi_avg_score_subtext: "בכלל התרחישים שהושלמו",
            kpi_view_detailed_reports_link: "צפה בדוחות מפורטים",
            kpi_new_scenarios_monthly_title: "תרחישים חדשים החודש",
            kpi_new_scenarios_monthly_subtext: "נוספו למאגר",
            kpi_instructor_manage_scenarios_link_alt: "נהל מאגר תרחישים",
            kpi_pending_review_title: "תרחישים לבדיקה",
            kpi_pending_review_subtext: "ממתינים לאישור סופי",
            kpi_review_scenarios_link: "עבור לבדיקה",
            kpi_avg_completion_time_title: "זמן ממוצע להשלמה",
            // kpi_avg_completion_time_value is dynamic, suffix from global
            kpi_avg_completion_time_subtext: "ממוצע זמן לסיום תרחיש",
            kpi_view_time_metrics_link: "צפה במדדי זמן",
            kpi_monthly_simulations_title: "סימולציות חודשיות",
            kpi_monthly_simulations_subtext: "שיפור של 22% מהחודש הקודם",
            kpi_view_trends_link: "צפה במגמות",
            // Recent Activity Table
            recent_activity_title: "פעילות אחרונה",
            table_header_user_team: "משתמש/צוות",
            table_header_action: "פעולה",
            table_header_scenario: "תרחיש",
            table_header_time: "זמן",
            activity1_user: "צוות אלפא",
            activity1_action: "התחיל סימולציה",
            activity1_scenario: "מתקפת כופר ארגונית",
            activity1_time: "לפני 5 דקות",
            activity2_user: "דנה כהן",
            activity2_action: "סיימה תרחיש בהצלחה",
            activity2_scenario: "זיהוי פישינג מתקדם",
            activity2_time: "לפני 30 דקות",
            activity3_user: "מדריך ראשי",
            activity3_action: "יצר תרחיש חדש",
            activity3_scenario: "פריצה לשרתי WEB",
            activity3_time: "לפני שעה",
            activity4_user: "צוות בטא",
            activity4_action: "הגיש תשובה לשאלה 3",
            activity4_scenario: "חקירת אירוע דלף מידע",
            activity4_time: "לפני שעתיים",
            activity5_user: "אבי כהן",
            activity5_action: "הצטרף לסימולציה",
            activity5_scenario: "מתקפת כופר ארגונית",
            activity5_time: "לפני 3 שעות",
            activity6_user: "מדריך משנה",
            activity6_action: "עדכן פרטי תרחיש",
            activity6_scenario: "איום פנימי (Insider Threat)",
            activity6_time: "לפני 4 שעות",
            // Chart related keys
            chart_scenario_progress_title: "התקדמות ממוצעת בתרחישים",
            chart_resource_util_title: "ניצול משאבים בזמן אמת",
            chart_dataset_completion_rate: "שיעור השלמה (%)",
            chart_dataset_utilization_percent: "ניצול (%)",
            scenario_alpha_label: "תרחיש אלפא", // Example label for chart
            scenario_beta_label: "תרחיש בטא",   // Example label for chart
            scenario_gamma_label: "תרחיש גמא",  // Example label for chart
            scenario_delta_label: "תרחיש דלתא", // Example label for chart
            scenario_epsilon_label: "תרחיש אפסילון", // Example label for chart
            resource_cpu_label: "מעבד (CPU)",     // Example label for chart
            resource_memory_label: "זיכרון (Memory)", // Example label for chart
            resource_disk_label: "קלט/פלט דיסק (Disk I/O)", // Example label for chart
            resource_network_label: "רשת (Network)",   // Example label for chart
            chart_no_data_scenario_progress: "אין נתונים זמינים לגרף התקדמות תרחישים.",
            chart_no_data_resource_utilization: "אין נתונים זמינים לגרף ניצול משאבים.",
            // Navigation buttons
            go_back_to_instructor_landing: "חזור לעמוד הנחיתה",
            go_to_cost_resource_management: "המשך לניהול עלויות ומשאבים"
            // KPI Values like "5", "24", "82%" are dynamic and set by JS, not translated directly as keys.
        },
        en: {
            // Page specific
            instructor_dashboard_page_title: "Instructor Dashboard - Cyber Simulation Platform",
            instructor_dashboard_header: "Dashboard",
            welcome_message_instructor: "Welcome, Lead Instructor",
            profile_image_alt_key: "Instructor profile image",
            // KPIs - Titles, Subtexts, Links
            kpi_active_simulations_title: "Active Simulations",
            kpi_active_simulations_subtext: "Simulations currently running",
            kpi_view_all_link: "View All",
            kpi_total_scenarios_title: "Total Scenarios",
            kpi_total_scenarios_subtext: "Scenarios available in the system",
            kpi_instructor_manage_scenarios_link: "Manage Scenarios",
            kpi_active_participants_teams_title: "Active Participants (Teams)",
            kpi_active_participants_teams_subtext: "Participants currently connected / Total active teams",
            kpi_instructor_manage_users_teams_link: "Manage Users & Teams",
            kpi_avg_score_title: "Average Score",
            kpi_avg_score_subtext: "Across all completed scenarios",
            kpi_view_detailed_reports_link: "View Detailed Reports",
            kpi_new_scenarios_monthly_title: "New Scenarios This Month",
            kpi_new_scenarios_monthly_subtext: "Added to the repository",
            kpi_instructor_manage_scenarios_link_alt: "Manage Scenario Repository",
            kpi_pending_review_title: "Scenarios Pending Review",
            kpi_pending_review_subtext: "Awaiting final approval",
            kpi_review_scenarios_link: "Go to Review",
            kpi_avg_completion_time_title: "Avg. Completion Time",
            kpi_avg_completion_time_subtext: "Average time to complete a scenario",
            kpi_view_time_metrics_link: "View Time Metrics",
            kpi_monthly_simulations_title: "Monthly Simulations",
            kpi_monthly_simulations_subtext: "22% improvement from last month",
            kpi_view_trends_link: "View Trends",
            // Recent Activity Table
            recent_activity_title: "Recent Activity",
            table_header_user_team: "User/Team",
            table_header_action: "Action",
            table_header_scenario: "Scenario",
            table_header_time: "Time",
            activity1_user: "Alpha Team",
            activity1_action: "Started simulation",
            activity1_scenario: "Corporate Ransomware Attack",
            activity1_time: "5 minutes ago",
            activity2_user: "Dana Cohen",
            activity2_action: "Successfully completed scenario",
            activity2_scenario: "Advanced Phishing Detection",
            activity2_time: "30 minutes ago",
            activity3_user: "Lead Instructor",
            activity3_action: "Created new scenario",
            activity3_scenario: "Web Server Breach",
            activity3_time: "1 hour ago",
            activity4_user: "Beta Team",
            activity4_action: "Submitted answer for question 3",
            activity4_scenario: "Data Leak Investigation",
            activity4_time: "2 hours ago",
            activity5_user: "Avi Cohen",
            activity5_action: "Joined simulation",
            activity5_scenario: "Corporate Ransomware Attack",
            activity5_time: "3 hours ago",
            activity6_user: "Assistant Instructor",
            activity6_action: "Updated scenario details",
            activity6_scenario: "Insider Threat",
            activity6_time: "4 hours ago",
            // Chart related keys
            chart_scenario_progress_title: "Average Scenario Progress",
            chart_resource_util_title: "Real-time Resource Utilization",
            chart_dataset_completion_rate: "Completion Rate (%)",
            chart_dataset_utilization_percent: "Utilization (%)",
            scenario_alpha_label: "Scenario Alpha",
            scenario_beta_label: "Scenario Beta",
            scenario_gamma_label: "Scenario Gamma",
            scenario_delta_label: "Scenario Delta",
            scenario_epsilon_label: "Scenario Epsilon",
            resource_cpu_label: "CPU",
            resource_memory_label: "Memory",
            resource_disk_label: "Disk I/O",
            resource_network_label: "Network",
            chart_no_data_scenario_progress: "No data available for scenario progress chart.",
            chart_no_data_resource_utilization: "No data available for resource utilization chart.",
            // Navigation buttons
            go_back_to_instructor_landing: "Back to Landing Page",
            go_to_cost_resource_management: "Continue to Cost & Resource Management"
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
            // console.log('instructor_main_translations.js: Calling applyTranslationsGlobal after merge.');
            window.applyTranslationsGlobal();
        }
    } else {
        console.error('instructor_main_translations.js: Global translations object (window.translations) not found.');
        window.translations = pageTranslations; // Fallback
        if (typeof window.applyTranslationsGlobal === 'function') {
            window.applyTranslationsGlobal();
        }
    }
});