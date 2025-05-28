// trainee_communication_translations.js
'use strict';
document.addEventListener('DOMContentLoaded', function() {
    const pageTranslations = {
        he: {
            trainee_communication_page_title: "תקשורת צוותית - פלטפורמת סימולציות סייבר",
            communication_header: "כלי תקשורת",
            communication_subtitle: "תקשר עם חברי הצוות שלך ועם המדריך במהלך התרחיש.",
            channels_list_header: "ערוצים",
            direct_messages_list_header: "הודעות ישירות",
            no_channels_available: "אין ערוצים זמינים.",
            no_direct_messages_available: "אין הודעות ישירות.",
            // Example Channel/User Names for JS mock data
            channel_general_name: "כללי - צוות אלפא",
            channel_technical_name: "דיונים טכניים",
            user_contact_instructor_name: "מדריך התרחיש",
            user_contact_teammate1_name: "חבר צוות: יוסי כהן",
            user_contact_teammate2_name: "חבר צוות: שירה לוי",
            chat_input_placeholder: "הקלד את הודעתך כאן...",
            send_chat_message_button_tooltip: "שלח הודעה",
            start_video_call_button_tooltip: "התחל שיחת וידאו",
            start_voice_call_button_tooltip: "התחל שיחת קול",
            // Example chat messages for JS mock data
            chat_message_user1_hello: "היי כולם, מישהו ראה את ההתראה האחרונה ב-SIEM?",
            chat_message_user2_response: "כן, אני בודק את זה עכשיו. נראה כמו ניסיון גישה לא מורשה לשרת DB01.",
            chat_message_instructor_hint: "רמז מהמדריך: שימו לב לתעבורה יוצאת חשודה מ-WEB02.",
            chat_message_user1_q: "מישהו יודע מה ה-IP של WEB02?",
            chat_message_user2_a: "בודק בסקירת ארכיטקטורה, שנייה...",
            chat_message_user2_ip: "מצאתי, 10.1.5.20. אני בודק לוגים משם.",
            no_messages_in_chat: "אין הודעות בשיחה זו עדיין. התחל את השיחה!",
            // Navigation buttons
            go_back_to_questions: "חזור לשאלות מנחות",
            go_to_ai_assistant_from_chat: "המשך לעוזר AI"
        },
        en: {
            trainee_communication_page_title: "Team Communication - Cyber Simulation Platform",
            communication_header: "Communication Tools",
            communication_subtitle: "Communicate with your team members and the instructor during the scenario.",
            channels_list_header: "Channels",
            direct_messages_list_header: "Direct Messages",
            no_channels_available: "No channels available.",
            no_direct_messages_available: "No direct messages available.",
            channel_general_name: "General - Alpha Team",
            channel_technical_name: "Technical Discussions",
            user_contact_instructor_name: "Scenario Instructor",
            user_contact_teammate1_name: "Teammate: Yossi Cohen",
            user_contact_teammate2_name: "Teammate: Shira Levi",
            chat_input_placeholder: "Type your message here...",
            send_chat_message_button_tooltip: "Send Message",
            start_video_call_button_tooltip: "Start Video Call",
            start_voice_call_button_tooltip: "Start Voice Call",
            chat_message_user1_hello: "Hey everyone, did anyone see the latest SIEM alert?",
            chat_message_user2_response: "Yeah, I'm looking into it now. Looks like an unauthorized access attempt to DB01 server.",
            chat_message_instructor_hint: "Hint from Instructor: Pay attention to suspicious outbound traffic from WEB02.",
            chat_message_user1_q: "Does anyone know the IP for WEB02?",
            chat_message_user2_a: "Checking the architecture overview, one sec...",
            chat_message_user2_ip: "Found it, 10.1.5.20. I'm checking logs from there.",
            no_messages_in_chat: "No messages in this chat yet. Start the conversation!",
            // Navigation buttons
            go_back_to_questions: "Back to Guiding Questions",
            go_to_ai_assistant_from_chat: "Continue to AI Assistant"
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
            // console.log('trainee_communication_translations.js: Calling applyTranslationsGlobal after merge.');
            window.applyTranslationsGlobal();
        }
    } else {
        console.error('trainee_communication_translations.js: Global translations object (window.translations) not found.');
        window.translations = pageTranslations; // Fallback
        if (typeof window.applyTranslationsGlobal === 'function') {
            window.applyTranslationsGlobal();
        }
    }
});