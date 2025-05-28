// instructor_cost_resource_translations.js
'use strict';
document.addEventListener('DOMContentLoaded', function() {
    const pageTranslations = {
        he: {
            instructor_cost_resource_page_title: "ניהול עלויות ומשאבים - פלטפורמת סימולציות סייבר",
            cost_resource_header: "ניהול עלויות ומשאבים",
            cost_resource_subtitle: "עקוב אחר צריכת משאבי ענן ועלויות סימולציה, ונהל הקצאות.",
            kpi_total_monthly_cost: "עלות חודשית נוכחית",
            kpi_estimated_cost: "עלות משוערת לסוף החודש",
            kpi_active_instances: "מכונות פעילות (VMs)",
            kpi_total_vcpu_used: "סה\"כ vCPU בשימוש:",
            kpi_storage_used: "אחסון בשימוש",
            kpi_total_allocated_storage: "סה\"כ אחסון מוקצה:",
            kpi_simulation_hours_monthly: "שעות סימולציה (חודשי)",
            kpi_avg_cost_per_hour: "עלות ממוצעת לשעה:",
            currency_symbol_nis: "₪", // Retained as JS uses it
            cost_trend_chart_title: "מגמת עלויות (6 חודשים אחרונים)",
            resource_allocation_chart_title: "הקצאת משאבים לפי סוג",
            chart_no_data_cost_trend: "אין נתונים זמינים לגרף מגמת עלויות.",
            chart_no_data_resource_allocation: "אין נתונים זמינים לגרף הקצאת משאבים.",
            chart_label_compute: "חישוב (Compute)",
            chart_label_storage: "אחסון (Storage)",
            chart_label_network: "רשת (Network)",
            chart_label_licensing: "רישוי (Licensing)",
            chart_label_other: "אחר",
            chart_cost_breakdown_title: "פירוט עלויות",
            chart_dataset_monthly_cost: "עלות חודשית",
            detailed_cost_breakdown_title: "פירוט עלויות לפי סימולציה/משאב",
            filter_by_simulation: "לפי סימולציה",
            filter_by_resource_type: "לפי סוג משאב",
            filter_by_user_team: "לפי משתמש/צוות",
            loading_cost_data: "טוען נתוני עלויות...",
            no_cost_data_available: "אין נתוני עלויות זמינים להצגה.", // New key
            cost_table_header_simulation_name: "שם סימולציה/תרחיש",
            cost_table_header_resource_type: "סוג משאב",
            cost_table_header_cost: "עלות ($)",
            cost_table_header_start_date: "תאריך התחלה",
            // Example data for the table (as used by the updated JS)
            sim_example_1_name: "מתקפת כופר ארגונית (צוות אלפא)", // Still here for reference, though JS might use other keys for new mock data
            sim_example_1_type: "VM Type A, Storage",
            // New keys for mock data added in instructor_cost_resource.js
            scenario_data_leakage: "תרחיש דליפת מידע",
            vm_type_c_key: "VM Type C, DB",
            scenario_insider_threat: "איום פנימי",
            various_small_tools_key: "כלים קטנים שונים",
            // Navigation buttons
            go_back_to_instructor_main: "חזור ללוח המחוונים",
            go_to_manage_users_teams: "המשך לניהול משתמשים וצוותים"
        },
        en: {
            instructor_cost_resource_page_title: "Cost & Resource Management - Cyber Simulation Platform",
            cost_resource_header: "Cost & Resource Management",
            cost_resource_subtitle: "Track cloud resource consumption, simulation costs, and manage allocations.",
            kpi_total_monthly_cost: "Current Monthly Cost",
            kpi_estimated_cost: "Estimated end-of-month cost",
            kpi_active_instances: "Active Instances (VMs)",
            kpi_total_vcpu_used: "Total vCPUs in use:",
            kpi_storage_used: "Storage Used",
            kpi_total_allocated_storage: "Total allocated storage:",
            kpi_simulation_hours_monthly: "Simulation Hours (Monthly)",
            kpi_avg_cost_per_hour: "Avg. cost per hour:",
            currency_symbol_nis: "$", // Defaulting to $ for EN
            cost_trend_chart_title: "Cost Trend (Last 6 Months)",
            resource_allocation_chart_title: "Resource Allocation by Type",
            chart_no_data_cost_trend: "No data available for cost trend chart.",
            chart_no_data_resource_allocation: "No data available for resource allocation chart.",
            chart_label_compute: "Compute",
            chart_label_storage: "Storage",
            chart_label_network: "Network",
            chart_label_licensing: "Licensing",
            chart_label_other: "Other",
            chart_cost_breakdown_title: "Cost Breakdown",
            chart_dataset_monthly_cost: "Monthly Cost",
            detailed_cost_breakdown_title: "Detailed Cost Breakdown by Simulation/Resource",
            filter_by_simulation: "By Simulation",
            filter_by_resource_type: "By Resource Type",
            filter_by_user_team: "By User/Team",
            loading_cost_data: "Loading cost data...",
            no_cost_data_available: "No detailed cost data available.", // New key
            cost_table_header_simulation_name: "Simulation/Scenario Name",
            cost_table_header_resource_type: "Resource Type",
            cost_table_header_cost: "Cost ($)",
            cost_table_header_start_date: "Start Date",
            sim_example_1_name: "Corporate Ransomware (Alpha Team)",
            sim_example_1_type: "VM Type A, Storage",
            scenario_data_leakage: "Data Leakage Scenario",
            vm_type_c_key: "VM Type C, DB",
            scenario_insider_threat: "Insider Threat",
            various_small_tools_key: "Various Small Tools",
            // Navigation buttons
            go_back_to_instructor_main: "Back to Dashboard",
            go_to_manage_users_teams: "Continue to Manage Users & Teams"
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
            // console.log('instructor_cost_resource_translations.js: Calling applyTranslationsGlobal after merge.');
            window.applyTranslationsGlobal();
        }
    } else {
        console.error('instructor_cost_resource_translations.js: Global translations object (window.translations) not found.');
        window.translations = pageTranslations; // Fallback
        if (typeof window.applyTranslationsGlobal === 'function') {
            window.applyTranslationsGlobal();
        }
    }
});