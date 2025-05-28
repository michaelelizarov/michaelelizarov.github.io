// instructor_manage_users_teams_translations.js
'use strict';
document.addEventListener('DOMContentLoaded', function() {
    const pageTranslations = {
        he: {
            instructor_manage_users_teams_page_title: "ניהול משתמשים וצוותים - פלטפורמת סימולציות סייבר",
            manage_users_teams_header: "ניהול משתמשים וצוותים",
            manage_users_teams_subtitle: "נהל משתמשים רשומים, צור צוותים והקצה להם משתמשים ותרחישים.",
            add_new_user_button: "הוסף משתמש חדש",
            create_new_team_button: "צור צוות חדש",
            users_list_title: "רשימת משתמשים",
            search_users_placeholder: "חפש משתמש...",
            table_header_user_name: "שם מלא",
            table_header_user_email: "דוא\"ל",
            table_header_user_role: "תפקיד",
            table_header_user_team: "צוות",
            table_header_join_date: "תאריך הצטרפות",
            table_header_actions: "פעולות",
            loading_users: "טוען משתמשים...",
            role_trainee: "מתלמד",
            role_instructor: "מדריך",
            role_admin: "אדמין",
            no_team_assigned: "לא משויך",
            no_users_available: "אין משתמשים זמינים להצגה.", // New
            teams_list_title: "רשימת צוותים",
            search_teams_placeholder: "חפש צוות...",
            table_header_team_name: "שם הצוות",
            table_header_team_leader: "מוביל צוות",
            table_header_team_members_count: "מס' חברים",
            table_header_team_active_scenario: "תרחיש פעיל",
            loading_teams: "טוען צוותים...",
            no_active_scenario: "אין תרחיש פעיל",
            no_teams_available: "אין צוותים זמינים להצגה.", // New
            no_team_leader: "ללא מוביל", // New
            user_modal_add_title: "הוספת משתמש חדש",
            user_modal_edit_title: "עריכת פרטי משתמש",
            user_fullname_label: "שם מלא",
            user_email_label: "כתובת דוא\"ל",
            user_role_label_form: "תפקיד",
            user_password_label: "סיסמה",
            password_leave_blank_placeholder: "השאר ריק כדי לא לשנות (בעריכה)",
            save_user_button: "שמור משתמש",
            team_modal_add_title: "יצירת צוות חדש",
            team_modal_edit_title: "עריכת פרטי צוות",
            team_name_label: "שם הצוות",
            team_leader_label_form: "מוביל צוות",
            select_team_leader_optional: "בחר מוביל צוות (אופציונלי)",
            team_members_label: "חברי צוות",
            loading_users_for_team: "טוען רשימת משתמשים...",
            no_users_to_assign_to_team: "אין משתמשים זמינים לשיוך לצוות.", // New
            save_team_button: "שמור צוות",
            // Dynamic alerts / confirmations
            confirm_delete_prefix: "האם אתה בטוח שברצונך למחוק {type} '{itemName}'?",
            user_singular: "משתמש",
            team_singular: "צוות",
            alert_user_added_successfully: "המשתמש נוסף בהצלחה (סימולציה)!",
            alert_user_updated_successfully: "פרטי המשתמש עודכנו בהצלחה (סימולציה)!",
            alert_team_created_successfully: "הצוות נוצר בהצלחה (סימולציה)!",
            alert_team_updated_successfully: "פרטי הצוות עודכנו בהצלחה (סימולציה)!",
            // Example data keys (some might be used by JS for rendering)
            user_example_1_name: "ישראל ישראלי", // Retained for JS mock data if used
            user_example_2_name: "דנה לוי",   // Retained for JS mock data if used
            team_alpha: "צוות אלפא",
            team_beta: "צוות בטא",
            team_gamma: "צוות גמא",
            team_delta: "צוות דלתא",
            team_epsilon: "צוות אפסילון",
            team_zeta: "צוות זטא",
            team_eta: "צוות אטא",
            team_theta: "צוות תטא",
            team_iota: "צוות יוטא",
            instructor_lead: "מדריך ראשי", // For created_by in scenarios table
            instructor_guest: "מדריך אורח",
            instructor_dev_team: "צוות פיתוח",
            scenario_corporate_breach: "פריצה לרשת ארגונית",
            scenario_phishing_advanced: "פישינג מתקדם",
            scenario_web_breach: "פריצת שרת ווב",
            scenario_ddos_mitigation: "התמודדות עם DDoS",
            scenario_cloud_security: "אבטחת ענן",
            scenario_incident_response_drill: "תרגול תגובה לאירוע",
            // Navigation buttons
            go_back_to_cost_resource: "חזור לניהול עלויות ומשאבים",
            go_to_manage_scenarios: "המשך לניהול תרחישים"
        },
        en: {
            instructor_manage_users_teams_page_title: "Manage Users & Teams - Cyber Simulation Platform",
            manage_users_teams_header: "Manage Users & Teams",
            manage_users_teams_subtitle: "Manage registered users, create teams, and assign them users and scenarios.",
            add_new_user_button: "Add New User",
            create_new_team_button: "Create New Team",
            users_list_title: "Users List",
            search_users_placeholder: "Search user...",
            table_header_user_name: "Full Name",
            table_header_user_email: "Email",
            table_header_user_role: "Role",
            table_header_user_team: "Team",
            table_header_join_date: "Join Date",
            table_header_actions: "Actions",
            loading_users: "Loading users...",
            role_trainee: "Trainee",
            role_instructor: "Instructor",
            role_admin: "Admin",
            no_team_assigned: "Not assigned",
            no_users_available: "No users available to display.", // New
            teams_list_title: "Teams List",
            search_teams_placeholder: "Search team...",
            table_header_team_name: "Team Name",
            table_header_team_leader: "Team Leader",
            table_header_team_members_count: "# Members",
            table_header_team_active_scenario: "Active Scenario",
            loading_teams: "Loading teams...",
            no_active_scenario: "No active scenario",
            no_teams_available: "No teams available to display.", // New
            no_team_leader: "No leader", // New
            user_modal_add_title: "Add New User",
            user_modal_edit_title: "Edit User Details",
            user_fullname_label: "Full Name",
            user_email_label: "Email Address",
            user_role_label_form: "Role",
            user_password_label: "Password",
            password_leave_blank_placeholder: "Leave blank to keep current (on edit)",
            save_user_button: "Save User",
            team_modal_add_title: "Create New Team",
            team_modal_edit_title: "Edit Team Details",
            team_name_label: "Team Name",
            team_leader_label_form: "Team Leader",
            select_team_leader_optional: "Select team leader (optional)",
            team_members_label: "Team Members",
            loading_users_for_team: "Loading user list...",
            no_users_to_assign_to_team: "No users available to assign to team.", // New
            save_team_button: "Save Team",
            // Dynamic alerts / confirmations
            confirm_delete_prefix: "Are you sure you want to delete {type} '{itemName}'?",
            user_singular: "user",
            team_singular: "team",
            alert_user_added_successfully: "User added successfully (mock)!",
            alert_user_updated_successfully: "User details updated successfully (mock)!",
            alert_team_created_successfully: "Team created successfully (mock)!",
            alert_team_updated_successfully: "Team details updated successfully (mock)!",
            user_example_1_name: "Israel Israeli",
            user_example_2_name: "Dana Levi",
            team_alpha: "Alpha Team",
            team_beta: "Beta Team",
            team_gamma: "Gamma Team",
            team_delta: "Delta Team",
            team_epsilon: "Epsilon Team",
            team_zeta: "Zeta Team",
            team_eta: "Eta Team",
            team_theta: "Theta Team",
            team_iota: "Iota Team",
            instructor_lead: "Lead Instructor",
            instructor_guest: "Guest Instructor",
            instructor_dev_team: "Dev Team",
            scenario_corporate_breach: "Corporate Network Breach",
            scenario_phishing_advanced: "Advanced Phishing",
            scenario_web_breach: "Web Server Breach",
            scenario_ddos_mitigation: "DDoS Mitigation",
            scenario_cloud_security: "Cloud Security Incident",
            scenario_incident_response_drill: "Incident Response Drill",
            // Navigation buttons
            go_back_to_cost_resource: "Back to Cost & Resource Management",
            go_to_manage_scenarios: "Continue to Manage Scenarios"
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
            // console.log('instructor_manage_users_teams_translations.js: Calling applyTranslationsGlobal after merge.');
            window.applyTranslationsGlobal();
        }
    } else {
        console.error('instructor_manage_users_teams_translations.js: Global translations object (window.translations) not found.');
        window.translations = pageTranslations; // Fallback
        if (typeof window.applyTranslationsGlobal === 'function') {
            window.applyTranslationsGlobal();
        }
    }
});