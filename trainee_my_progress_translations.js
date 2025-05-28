// trainee_my_progress_translations.js
'use strict';
document.addEventListener('DOMContentLoaded', function() {
    const pageTranslations = {
        he: {
            trainee_my_progress_page_title: "ההתקדמות שלי - פלטפורמת סימולציות סייבר",
            my_progress_header: "ההתקדמות שלי",
            my_progress_subtitle: "עקוב אחר הביצועים שלך, התגים שהשגת והישגיך בפלטפורמה.",
            // Summary Stats
            summary_stats_title: "סיכום ביצועים",
            total_scenarios_completed_label: "סה\"כ תרחישים שהושלמו:",
            average_score_label: "ציון ממוצע:",
            badges_earned_label: "תגים שהושגו:",
            // Completed Scenarios Table
            completed_scenarios_title: "תרחישים שהושלמו",
            table_header_scenario_name_myprog: "שם תרחיש", // Added _myprog to distinguish from other tables
            table_header_score_myprog: "ציון",
            table_header_date_completed_myprog: "תאריך השלמה",
            table_header_detailed_report_myprog: "דוח מפורט",
            view_report_link: "צפה בדוח",
            no_completed_scenarios: "עדיין לא השלמת אף תרחיש.",
            // Example completed scenarios
            completed_scenario1_name_key: "scenario_phishing_advanced", // Use keys from scenario management/main
            completed_scenario1_score: "85%",
            completed_scenario1_date: "2024-05-15",
            completed_scenario2_name_key: "scenario_data_leakage",
            completed_scenario2_score: "92%",
            completed_scenario2_date: "2024-05-10",
            completed_scenario3_name_key: "scenario_critical_infra_breach",
            completed_scenario3_score: "78%",
            completed_scenario3_date: "2024-04-28",
            // My Badges Section (can reuse badge titles/descriptions from trainee_dashboard_translations)
            my_badges_section_title_myprog: "התגים שלי", // To distinguish from dashboard if layout differs
            no_badges_earned_myprog: "עדיין לא השגת תגים. המשך להתאמן!",
            // Recent Achievements Section (can reuse achievement texts from trainee_dashboard_translations)
            recent_achievements_section_title_myprog: "הישגים אחרונים",
            no_recent_achievements_myprog: "אין הישגים אחרונים להציג.",
            // Scenario Progress Chart
            scenario_progress_chart_title: "התקדמות בתרחישים",
            chart_no_data_progress_chart: "אין נתונים להצגת גרף התקדמות.",
            chart_scenario_label_prefix: "תרחיש:", // For chart tooltips/labels if needed
            chart_progress_label: "התקדמות (%)", // For y-axis or dataset label
            // Skills Radar Chart
            skills_radar_chart_title: "מיומנויות סייבר",
            chart_no_data_skills_radar: "אין נתונים להצגת מיומנויות סייבר.",
            skills_radar_explanation: "מפת המיומנויות שלך",
            skills_radar_description: "גרף זה מציג את רמת המיומנות שלך בתחומי סייבר שונים, בהתבסס על ביצועים בתרחישים.",
            skill_category_threat_intel: "מודיעין איומים",
            skill_category_incident_response: "תגובה לאירועים",
            skill_category_threat_hunting: "זיהוי איומים",
            skill_category_network_security: "אבטחת רשת",
            skill_category_malware_analysis: "ניתוח נוזקות",
            current_skills_level: "רמת מיומנות נוכחית",
            // Navigation buttons
            go_back_to_mitigation_steps: "חזור לשלבי מיטיגציה",
            go_to_prep_materials_from_progress: "המשך לחומרי לימוד"
        },
        en: {
            trainee_my_progress_page_title: "My Progress - Cyber Simulation Platform",
            my_progress_header: "My Progress",
            my_progress_subtitle: "Track your performance, earned badges, and achievements on the platform.",
            summary_stats_title: "Performance Summary",
            total_scenarios_completed_label: "Total Scenarios Completed:",
            average_score_label: "Average Score:",
            badges_earned_label: "Badges Earned:",
            completed_scenarios_title: "Completed Scenarios",
            table_header_scenario_name_myprog: "Scenario Name",
            table_header_score_myprog: "Score",
            table_header_date_completed_myprog: "Completion Date",
            table_header_detailed_report_myprog: "Detailed Report",
            view_report_link: "View Report",
            no_completed_scenarios: "You haven't completed any scenarios yet.",
            completed_scenario1_name_key: "scenario_phishing_advanced",
            completed_scenario1_score: "85%",
            completed_scenario1_date: "2024-05-15",
            completed_scenario2_name_key: "scenario_data_leakage",
            completed_scenario2_score: "92%",
            completed_scenario2_date: "2024-05-10",
            completed_scenario3_name_key: "scenario_critical_infra_breach",
            completed_scenario3_score: "78%",
            completed_scenario3_date: "2024-04-28",
            my_badges_section_title_myprog: "My Badges",
            no_badges_earned_myprog: "You haven't earned any badges yet. Keep practicing!",
            recent_achievements_section_title_myprog: "Recent Achievements",
            no_recent_achievements_myprog: "No recent achievements to display.",
            scenario_progress_chart_title: "Scenario Progress",
            chart_no_data_progress_chart: "No data available for progress chart.",
            chart_scenario_label_prefix: "Scenario:",
            chart_progress_label: "Progress (%)",
            // Skills Radar Chart
            skills_radar_chart_title: "Cyber Skills",
            chart_no_data_skills_radar: "No data available for skills radar chart.",
            skills_radar_explanation: "Your Skills Map",
            skills_radar_description: "This chart shows your skill level in different cybersecurity domains, based on scenario performance.",
            skill_category_threat_intel: "Threat Intelligence",
            skill_category_incident_response: "Incident Response",
            skill_category_threat_hunting: "Threat Hunting",
            skill_category_network_security: "Network Security",
            skill_category_malware_analysis: "Malware Analysis",
            current_skills_level: "Current Skill Level",
            // Navigation buttons
            go_back_to_mitigation_steps: "Back to Mitigation Steps",
            go_to_prep_materials_from_progress: "Continue to Prep Materials"
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
            // console.log('trainee_my_progress_translations.js: Calling applyTranslationsGlobal after merge.');
            window.applyTranslationsGlobal();
        }
    } else {
        console.error('trainee_my_progress_translations.js: Global translations object (window.translations) not found.');
        window.translations = pageTranslations; // Fallback
        if (typeof window.applyTranslationsGlobal === 'function') {
            window.applyTranslationsGlobal();
        }
    }
});