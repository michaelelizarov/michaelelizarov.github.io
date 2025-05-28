// trainee_cti_translations.js
'use strict';
document.addEventListener('DOMContentLoaded', function() {
    const pageTranslations = {
        he: {
            trainee_cti_page_title: "מאגר מודיעין (CTI) - פלטפורמת סימולציות סייבר",
            cti_feed_header: "מאגר מודיעין סייבר (CTI)",
            cti_feed_subtitle: "הישאר מעודכן עם המידע האחרון על איומים, חולשות וקמפיינים פעילים.",
            search_cti_placeholder: "חפש בפיד המודיעין...",
            filter_cti_source_label: "מקור המידע:",
            cti_source_all: "כל המקורות",
            cti_source_internal: "מודיעין פנימי",
            cti_source_osint: "OSINT",
            cti_source_gov: "גורמי ממשל",
            cti_source_vendor: "יצרנים וספקים",
            filter_cti_severity_label: "רמת חומרה:",
            cti_severity_all: "כל הרמות",
            cti_severity_low: "נמוכה",
            cti_severity_medium: "בינונית",
            cti_severity_high: "גבוהה",
            cti_severity_critical: "קריטית",
            no_cti_items_found: "לא נמצאו עדכוני מודיעין התואמים את החיפוש או הסינון שלך.",
            iocs_section_title: "מזהי תקיפה (IOCs):",
            ioc_type_ip: "כתובת IP",
            ioc_type_domain: "דומיין",
            ioc_type_hash_md5: "MD5 Hash",
            ioc_type_hash_sha1: "SHA1 Hash",
            ioc_type_hash_sha256: "SHA256 Hash",
            ioc_type_url: "כתובת URL",
            ioc_type_email_sender: "כתובת מייל (שולח)",
            copy_ioc_tooltip: "העתק IOC", // Tooltip for copy button
            ioc_copied_message: "הועתק!", // Message after copying
            load_more_cti_button: "טען מידע נוסף",
            all_cti_loaded_message: "כל עדכוני המודיעין נטענו.",
            // Example CTI Feed Items (for JS mock data)
            cti_item1_title: "אזהרה: קמפיין פישינג חדש מתחזה לשירות הזרמת מדיה פופולרי",
            cti_item1_source_key: "cti_source_osint", // Matches filter key
            cti_item1_date: "2024-05-20",
            cti_item1_summary: "זוהה קמפיין פישינג המנסה לגנוב פרטי כניסה וכרטיסי אשראי ממשתמשי שירות הזרמת מדיה X. המיילים מכילים קישורים זדוניים לאתר מתחזה.",
            cti_item1_severity_key: "cti_severity_high",
            cti_item2_title: "חולשה קריטית (CVE-2024-XXXX) התגלתה בשרת Apache Tomcat",
            cti_item2_source_key: "cti_source_gov",
            cti_item2_date: "2024-05-18",
            cti_item2_summary: "צוות CERT לאומי מפרסם התראה על חולשת RCE קריטית בשרתי Tomcat. מומלץ לעדכן גרסה בהקדם.",
            cti_item2_severity_key: "cti_severity_critical",
            cti_item3_title: "עלייה בפעילות נוזקת הכופר 'LockBit 3.0'",
            cti_item3_source_key: "cti_source_vendor",
            cti_item3_date: "2024-05-15",
            cti_item3_summary: "יצרני אבטחה מדווחים על עלייה משמעותית בתקיפות המשתמשות בגרסה החדשה של LockBit, המכוונת בעיקר לארגונים קטנים ובינוניים.",
            cti_item3_severity_key: "cti_severity_high",
            cti_item4_title: "דוח מודיעין פנימי: פעילות חשודה ברשת הארגונית",
            cti_item4_source_key: "cti_source_internal",
            cti_item4_date: "2024-05-21",
            cti_item4_summary: "זוהתה תעבורה חריגה ממספר תחנות קצה לשרת חיצוני לא מזוהה. הנושא בבדיקה.",
            cti_item4_severity_key: "cti_severity_medium",
            // Navigation buttons
            go_back_to_email_client: "חזור ללקוח דוא\"ל",
            go_to_guiding_questions: "המשך לשאלות מנחות"
        },
        en: {
            trainee_cti_page_title: "CTI Feed - Cyber Simulation Platform",
            cti_feed_header: "Cyber Threat Intelligence (CTI) Feed",
            cti_feed_subtitle: "Stay updated with the latest information on threats, vulnerabilities, and active campaigns.",
            search_cti_placeholder: "Search CTI feed...",
            filter_cti_source_label: "Information Source:",
            cti_source_all: "All Sources",
            cti_source_internal: "Internal Intel",
            cti_source_osint: "OSINT",
            cti_source_gov: "Government Agencies",
            cti_source_vendor: "Security Vendors",
            filter_cti_severity_label: "Severity Level:",
            cti_severity_all: "All Levels",
            cti_severity_low: "Low",
            cti_severity_medium: "Medium",
            cti_severity_high: "High",
            cti_severity_critical: "Critical",
            no_cti_items_found: "No CTI updates found matching your search or filter.",
            iocs_section_title: "Indicators of Compromise (IOCs):",
            ioc_type_ip: "IP Address",
            ioc_type_domain: "Domain",
            ioc_type_hash_md5: "MD5 Hash",
            ioc_type_hash_sha1: "SHA1 Hash",
            ioc_type_hash_sha256: "SHA256 Hash",
            ioc_type_url: "URL",
            ioc_type_email_sender: "Email Sender",
            copy_ioc_tooltip: "Copy IOC",
            ioc_copied_message: "Copied!",
            load_more_cti_button: "Load More Information",
            all_cti_loaded_message: "All CTI updates have been loaded.",
            cti_item1_title: "Warning: New Phishing Campaign Impersonates Popular Streaming Service",
            cti_item1_source_key: "cti_source_osint",
            cti_item1_date: "2024-05-20",
            cti_item1_summary: "A phishing campaign has been identified attempting to steal login credentials and credit card details from users of streaming service X. Emails contain malicious links to a fake website.",
            cti_item1_severity_key: "cti_severity_high",
            cti_item2_title: "Critical Vulnerability (CVE-2024-XXXX) Discovered in Apache Tomcat Server",
            cti_item2_source_key: "cti_source_gov",
            cti_item2_date: "2024-05-18",
            cti_item2_summary: "National CERT issues an alert for a critical RCE vulnerability in Tomcat servers. It is recommended to update versions immediately.",
            cti_item2_severity_key: "cti_severity_critical",
            cti_item3_title: "Increase in 'LockBit 3.0' Ransomware Activity",
            cti_item3_source_key: "cti_source_vendor",
            cti_item3_date: "2024-05-15",
            cti_item3_summary: "Security vendors report a significant increase in attacks using the new version of LockBit, primarily targeting small and medium-sized businesses.",
            cti_item3_severity_key: "cti_severity_high",
            cti_item4_title: "Internal Intel Report: Suspicious Activity on Corporate Network",
            cti_item4_source_key: "cti_source_internal",
            cti_item4_date: "2024-05-21",
            cti_item4_summary: "Unusual traffic detected from several endpoints to an unidentified external server. Investigation in progress.",
            cti_item4_severity_key: "cti_severity_medium",
            // Navigation buttons
            go_back_to_email_client: "Back to Email Client",
            go_to_guiding_questions: "Continue to Guiding Questions"
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
            // console.log('trainee_cti_translations.js: Calling applyTranslationsGlobal after merge.');
            window.applyTranslationsGlobal();
        }
    } else {
        console.error('trainee_cti_translations.js: Global translations object (window.translations) not found.');
        window.translations = pageTranslations; // Fallback
        if (typeof window.applyTranslationsGlobal === 'function') {
            window.applyTranslationsGlobal();
        }
    }
});