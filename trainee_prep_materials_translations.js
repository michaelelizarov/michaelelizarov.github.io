// trainee_prep_materials_translations.js
'use strict';
document.addEventListener('DOMContentLoaded', function() {
    const pageTranslations = {
        he: {
            trainee_prep_materials_page_title: "חומרי לימוד - פלטפורמת סימולציות סייבר",
            prep_materials_header: "חומרי לימוד והכנה",
            prep_materials_subtitle: "הכן את עצמך לתרחישים עם מגוון מאמרים, מדריכים וכלים שימושיים.",
            search_prep_materials_placeholder: "חפש חומר לימוד...",
            filter_prep_type_all: "כל הסוגים", // Matched to what JS might expect for "all"
            filter_prep_type_article: "מאמרים", // Value: article
            filter_prep_type_guide: "מדריכים",   // Value: guide
            filter_prep_type_video: "סרטונים",   // Value: video
            filter_prep_type_tool: "כלים",      // Value: tool
            filter_prep_type_cheatsheet: "דפי עזר (Cheatsheets)", // New type example
            no_prep_materials_found: "לא נמצאו חומרי לימוד התואמים את החיפוש או הסינון שלך.",
            // Based on mockPrepMaterials from trainee_prep_materials.js and HTML structure
            prep_item1_title: "הבנת רשתות TCP/IP - יסודות",
            prep_item1_desc: "מאמר מבוא מקיף על פרוטוקולי TCP/IP, מודל ה-OSI ומושגי יסוד ברשתות תקשורת.",
            prep_item1_type_display: "מאמר", // For display on card
            prep_item1_action_text: "קרא מאמר",
            prep_item1_tags: "רשתות, TCP/IP, יסודות",
            prep_item2_title: "מדריך: שימוש בסיסי ב-Nmap",
            prep_item2_desc: "למד כיצד להשתמש בכלי Nmap לסקירת רשתות וגילוי פורטים פתוחים ומערכות.",
            prep_item2_type_display: "מדריך",
            prep_item2_action_text: "קרא מדריך",
            prep_item2_tags: "Nmap, סריקת רשתות, כלים",
            prep_item3_title: "סרטון: מבוא ל-Linux Terminal",
            prep_item3_desc: "סדרת סרטונים קצרים המלמדים פקודות בסיסיות ושימושיות בעבודה עם מסוף לינוקס.",
            prep_item3_type_display: "סרטון",
            prep_item3_action_text: "צפה בסרטון",
            prep_item3_tags: "לינוקס, טרמינל, פקודות",
            // Adding more to make it clear for JS population and to show variety
            prep_item4_title: "דף עזר: פקודות PowerShell נפוצות לאבטחה",
            prep_item4_desc: "רשימה מרוכזת של פקודות PowerShell שימושיות לאנשי אבטחה לניהול, חקירה ואוטומציה.",
            prep_item4_type_display: "דף עזר",
            prep_item4_action_text: "הצג דף עזר",
            prep_item4_tags: "PowerShell, Windows, סקריפטים",
            prep_item5_title: "מאמר: ניתוח לוגים – מתודולוגיות וכלים",
            prep_item5_desc: "סקירה על חשיבות ניתוח לוגים בתגובה לאירועים, מתודולוגיות נפוצות וכלים מומלצים.",
            prep_item5_type_display: "מאמר",
            prep_item5_action_text: "קרא מאמר",
            prep_item5_tags: "לוגים, SIEM, תגובה לאירועים",
            // Action button tooltips for cards are from app-global (open_button, watch_button, read_button, go_to_site_button)
            // If specific ones are needed, they can be added here. For example:
            action_text_view_cheatsheet: "הצג דף עזר",
            // Navigation buttons
            go_back_to_my_progress: "חזור להתקדמות שלי", // Assuming "My Progress" is previous
            go_to_trainee_dashboard_from_prep: "חזור ללוח המחוונים" // Looping back to dashboard
        },
        en: {
            trainee_prep_materials_page_title: "Prep Materials - Cyber Simulation Platform",
            prep_materials_header: "Learning & Preparation Materials",
            prep_materials_subtitle: "Prepare yourself for scenarios with a variety of useful articles, guides, and tools.",
            search_prep_materials_placeholder: "Search learning material...",
            filter_prep_type_all: "All Types",
            filter_prep_type_article: "Articles",
            filter_prep_type_guide: "Guides",
            filter_prep_type_video: "Videos",
            filter_prep_type_tool: "Tools",
            filter_prep_type_cheatsheet: "Cheatsheets",
            no_prep_materials_found: "No learning materials found matching your search or filter.",
            prep_item1_title: "Understanding TCP/IP Networks - Basics",
            prep_item1_desc: "A comprehensive introductory article on TCP/IP protocols, the OSI model, and fundamental networking concepts.",
            prep_item1_type_display: "Article",
            prep_item1_action_text: "Read Article",
            prep_item1_tags: "Networking, TCP/IP, Basics",
            prep_item2_title: "Guide: Basic Usage of Nmap",
            prep_item2_desc: "Learn how to use the Nmap tool for network scanning, discovering open ports, and systems.",
            prep_item2_type_display: "Guide",
            prep_item2_action_text: "Read Guide",
            prep_item2_tags: "Nmap, Network Scanning, Tools",
            prep_item3_title: "Video: Introduction to the Linux Terminal",
            prep_item3_desc: "A series of short videos teaching basic and useful commands for working with the Linux terminal.",
            prep_item3_type_display: "Video",
            prep_item3_action_text: "Watch Video",
            prep_item3_tags: "Linux, Terminal, Commands",
            prep_item4_title: "Cheatsheet: Common PowerShell Commands for Security",
            prep_item4_desc: "A concise list of useful PowerShell commands for security professionals for management, investigation, and automation.",
            prep_item4_type_display: "Cheatsheet",
            prep_item4_action_text: "View Cheatsheet",
            prep_item4_tags: "PowerShell, Windows, Scripting",
            prep_item5_title: "Article: Log Analysis – Methodologies and Tools",
            prep_item5_desc: "An overview of the importance of log analysis in incident response, common methodologies, and recommended tools.",
            prep_item5_type_display: "Article",
            prep_item5_action_text: "Read Article",
            prep_item5_tags: "Logs, SIEM, Incident Response",
            action_text_view_cheatsheet: "View Cheatsheet",
            // Navigation buttons
            go_back_to_my_progress: "Back to My Progress",
            go_to_trainee_dashboard_from_prep: "Back to Dashboard"
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
            // console.log('trainee_prep_materials_translations.js: Calling applyTranslationsGlobal after merge.');
            window.applyTranslationsGlobal();
        }
    } else {
        console.error('trainee_prep_materials_translations.js: Global translations object (window.translations) not found.');
        window.translations = pageTranslations; // Fallback
        if (typeof window.applyTranslationsGlobal === 'function') {
            window.applyTranslationsGlobal();
        }
    }
});