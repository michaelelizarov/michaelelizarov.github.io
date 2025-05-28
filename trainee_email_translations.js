// trainee_email_translations.js
'use strict';
document.addEventListener('DOMContentLoaded', function() {
    const pageTranslations = {
        he: {
            trainee_email_page_title: "לקוח דוא\"ל - פלטפורמת סימולציות סייבר",
            email_client_header: "לקוח דוא\"ל",
            compose_new_email_button: "מייל חדש",
            // Folders
            folder_inbox: "דואר נכנס",
            folder_sent: "נשלח",
            folder_drafts: "טיוטות",
            folder_junk: "דואר זבל",
            folder_archive: "ארכיון",
            // Email list headers/actions (not table headers, but conceptual)
            email_list_search_placeholder: "חפש בדוא\"ל...",
            no_emails_in_folder: "אין הודעות להצגה בתיקייה זו.",
            // Email view actions
            action_reply: "השב",
            action_reply_all: "השב לכולם",
            action_forward: "העבר",
            action_delete_email: "מחק",
            action_mark_as_unread: "סמן כלא נקרא",
            action_move_to_folder: "העבר לתיקייה...", // Will need a sub-menu or modal
            // Email content display
            email_subject_label: "נושא:",
            email_from_label: "מאת:",
            email_to_label: "אל:",
            email_cc_label: "עותק:",
            email_date_label: "תאריך:",
            email_attachments_label: "קבצים מצורפים:",
            download_attachment_button: "הורד קובץ מצורף",
            // Compose Modal
            compose_modal_title: "כתיבת הודעה חדשה",
            compose_to_label: "אל:",
            compose_to_placeholder: "כתובות נמענים (מופרד בפסיק)",
            compose_cc_label: "עותק (אופציונלי):",
            compose_cc_placeholder: "כתובות נמענים לעותק",
            compose_bcc_label: "עותק מוסתר (אופציונלי):",
            compose_bcc_placeholder: "כתובות נמענים לעותק מוסתר",
            compose_subject_label: "נושא:",
            compose_subject_placeholder: "הקלד את נושא ההודעה",
            compose_body_placeholder: "הקלד את תוכן ההודעה כאן...",
            send_email_button: "שלח",
            save_draft_button: "שמור טיוטה",
            discard_draft_button: "בטל טיוטה",
            attach_file_button_label: "צרף קובץ", // For a potential attach button
            // Mock Email Data (example subjects, senders, snippets for JS)
            mock_email1_subject: "הודעה חשובה בנוגע לחשבונך",
            mock_email1_sender: "security-alert@internal.example.com",
            mock_email1_snippet: "לקוח יקר, זיהינו פעילות חריגה בחשבונך...",
            mock_email1_body_intro: "אנו כותבים לך כדי ליידע אותך על עדכון אבטחה קריטי.",
            mock_email2_subject: "עדכון דחוף נדרש - נא ללחוץ על הקישור",
            mock_email2_sender: "it-support@company-portal.co", // Suspicious domain
            mock_email2_snippet: "נא לעדכן את פרטיך בהקדם דרך הקישור המצורף...",
            mock_email2_body_intro: "עקב שדרוג מערכות, כל המשתמשים נדרשים לאמת מחדש את פרטי הכניסה שלהם.",
            mock_email3_subject: "סיכום פגישת צוות אבטחה",
            mock_email3_sender: "lead.analyst@internal.example.com",
            mock_email3_snippet: "מצורף סיכום הפגישה מהיום בבוקר. נא לעבור על נקודות הפעולה...",
            mock_email3_body_intro: "תודה לכל מי שהשתתף בפגישה הפוריה היום.",
            mock_email4_subject: "Fwd: חשבונית לתשלום - הזמנה #INV00456",
            mock_email4_sender: "accounting@partner-site.net",
            mock_email4_snippet: "שלום, מצורפת חשבונית לתשלום עבור הזמנה אחרונה. נא לאשר...",
            mock_email4_body_intro: "נא למצוא קובץ מצורף.",
            mock_attachment1_name: "חשבונית_סופית.pdf",
            mock_email5_subject: "הזמנה לוובינר: איומי סייבר מתפתחים ב-2024",
            mock_email5_sender: "events@cybersecurity-weekly.com",
            mock_email5_snippet: "אנו שמחים להזמינך לוובינר מיוחד שיעסוק באיומים החדשים...",
            mock_email5_body_intro: "אל תחמיצו את ההזדמנות ללמוד מהמומחים המובילים בתחום.",
            // Navigation buttons
            go_back_to_architecture: "חזור לסקירת ארכיטקטורה",
            go_to_cti_feed_from_email: "המשך למאגר מודיעין (CTI)"
        },
        en: {
            trainee_email_page_title: "Email Client - Cyber Simulation Platform",
            email_client_header: "Email Client",
            compose_new_email_button: "New Email",
            folder_inbox: "Inbox",
            folder_sent: "Sent",
            folder_drafts: "Drafts",
            folder_junk: "Junk Email",
            folder_archive: "Archive",
            email_list_search_placeholder: "Search email...",
            no_emails_in_folder: "No messages to display in this folder.",
            action_reply: "Reply",
            action_reply_all: "Reply All",
            action_forward: "Forward",
            action_delete_email: "Delete",
            action_mark_as_unread: "Mark as Unread",
            action_move_to_folder: "Move to folder...",
            email_subject_label: "Subject:",
            email_from_label: "From:",
            email_to_label: "To:",
            email_cc_label: "Cc:",
            email_date_label: "Date:",
            email_attachments_label: "Attachments:",
            download_attachment_button: "Download Attachment",
            compose_modal_title: "Compose New Message",
            compose_to_label: "To:",
            compose_to_placeholder: "Recipient addresses (comma-separated)",
            compose_cc_label: "Cc (optional):",
            compose_cc_placeholder: "Cc recipient addresses",
            compose_bcc_label: "Bcc (optional):",
            compose_bcc_placeholder: "Bcc recipient addresses",
            compose_subject_label: "Subject:",
            compose_subject_placeholder: "Enter message subject",
            compose_body_placeholder: "Type your message content here...",
            send_email_button: "Send",
            save_draft_button: "Save Draft",
            discard_draft_button: "Discard Draft",
            attach_file_button_label: "Attach File",
            mock_email1_subject: "Important Account Notification",
            mock_email1_sender: "security-alert@internal.example.com",
            mock_email1_snippet: "Dear customer, we detected unusual activity on your account...",
            mock_email1_body_intro: "We are writing to inform you about a critical security update.",
            mock_email2_subject: "Urgent Update Required - Please Click Link",
            mock_email2_sender: "it-support@company-portal.co",
            mock_email2_snippet: "Please update your details promptly via the attached link...",
            mock_email2_body_intro: "Due to a system upgrade, all users are required to re-verify their login credentials.",
            mock_email3_subject: "Security Team Meeting Summary",
            mock_email3_sender: "lead.analyst@internal.example.com",
            mock_email3_snippet: "Attached is the summary of this morning's meeting. Please review the action items...",
            mock_email3_body_intro: "Thanks to everyone who participated in today's productive meeting.",
            mock_email4_subject: "Fwd: Invoice for Payment - Order #INV00456",
            mock_email4_sender: "accounting@partner-site.net",
            mock_email4_snippet: "Hello, attached is an invoice for payment for a recent order. Please confirm...",
            mock_email4_body_intro: "Please find attached file.",
            mock_attachment1_name: "Final_Invoice.pdf",
            mock_email5_subject: "Invitation: Webinar on Emerging Cyber Threats in 2024",
            mock_email5_sender: "events@cybersecurity-weekly.com",
            mock_email5_snippet: "We are pleased to invite you to a special webinar discussing new threats...",
            mock_email5_body_intro: "Don't miss this opportunity to learn from leading industry experts.",
            // Navigation buttons
            go_back_to_architecture: "Back to Architecture Overview",
            go_to_cti_feed_from_email: "Continue to CTI Feed"
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
            // console.log('trainee_email_translations.js: Calling applyTranslationsGlobal after merge.');
            window.applyTranslationsGlobal();
        }
    } else {
        console.error('trainee_email_translations.js: Global translations object (window.translations) not found.');
        window.translations = pageTranslations; // Fallback
        if (typeof window.applyTranslationsGlobal === 'function') {
            window.applyTranslationsGlobal();
        }
    }
});