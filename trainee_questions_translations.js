// trainee_questions_translations.js
'use strict';
document.addEventListener('DOMContentLoaded', function() {
    const pageTranslations = {
        he: {
            trainee_questions_page_title: "שאלות מנחות - פלטפורמת סימולציות סייבר",
            guiding_questions_header: "שאלות מנחות",
            guiding_questions_subtitle: "ענה על השאלות הבאות כדי להתקדם בתרחיש ולבחון את הבנתך.",
            question_text_placeholder: "טוען שאלה...", // Placeholder for question text area
            answers_container_placeholder: "טוען אפשרויות תשובה...", // Placeholder if answers are dynamically loaded
            submit_answer_button: "הגש תשובה",
            next_question_button: "לשאלה הבאה",
            finish_scenario_button_questions: "סיים תרחיש (מעבר ל-MITRE)", // Button after last question
            feedback_correct_title: "תשובה נכונה!",
            feedback_incorrect_title: "תשובה לא נכונה",
            feedback_default_correct: "כל הכבוד! המשך כך.",
            feedback_default_incorrect: "נסה שוב. חשוב על הרמזים שקיבלת.",
            current_score_label: "ניקוד נוכחי בתרחיש:",
            // Example Question 1
            question1_text: "לאחר שקראת את המייל הראשוני מ-CEO, מהי הפעולה הראשונה והחשובה ביותר שעליך לבצע בהתחשב במידע שהוצג?",
            question1_ans1_text: "לחסום מיידית את כתובת השולח.",
            question1_ans2_text: "לבדוק את הלוגים של שרת הדואר לאיתור מיילים דומים.",
            question1_ans3_text: "לדווח על האירוע למנהל האבטחה ולהמתין להנחיות.",
            question1_ans4_text: "ללחוץ על הקישור במייל בסביבה מבודדת (sandbox) כדי לבדוק לאן הוא מוביל.",
            question1_feedback_correct: "נכון מאוד! דיווח למנהל האבטחה הוא צעד קריטי ראשוני לתיאום התגובה.",
            question1_feedback_incorrect: "לא בדיוק. אמנם שאר הפעולות חשובות, אך דיווח ותיאום הם הצעד הראשון לפני פעולות טכניות מיידיות שעלולות לשבש חקירה.",
            // Example Question 2
            question2_text: "בסקירת ה-CTI feed, זוהה IOC מסוג IP Address החשוד כשרת C&C. מהי הבדיקה היעילה ביותר שניתן לבצע מיידית כדי לאמת חשד זה?",
            question2_ans1_text: "חיפוש ה-IP ב-VirusTotal או מאגרי מוניטין דומים.",
            question2_ans2_text: "סריקת ה-IP עם Nmap לאיתור פורטים פתוחים.",
            question2_ans3_text: "חסימת ה-IP ב-Firewall הארגוני.",
            question2_ans4_text: "ניסיון לגלוש ל-IP דרך דפדפן.",
            question2_feedback_correct: "בדיקה במאגרי מוניטין כמו VirusTotal יכולה לספק אינדיקציה מהירה אם ה-IP ידוע כזדוני.",
            question2_feedback_incorrect: "בעוד ששאר הפעולות אפשריות, בדיקת מוניטין היא לרוב המהירה והיעילה ביותר לאימות ראשוני של IOC.",
            // Example Question 3 (Final question example)
            question3_text: "לאחר ניתוח כלל הממצאים, מהי הטקטיקה הראשית של MITRE ATT&CK שבאה לידי ביטוי בתקיפה זו?",
            question3_ans1_text: "Initial Access (TA0001)",
            question3_ans2_text: "Execution (TA0002)",
            question3_ans3_text: "Persistence (TA0003)",
            question3_ans4_text: "Defense Evasion (TA0005)",
            question3_feedback_correct: "ניתוח נכון! אכן, הטקטיקה הבולטת ביותר כאן היא Initial Access.",
            question3_feedback_incorrect: "חשוב שוב על הפעולות הראשוניות של התוקף כפי שהתגלו.",
            no_questions_available: "לא נמצאו שאלות עבור תרחיש זה כעת.",
            // Navigation buttons
            go_back_to_cti_feed: "חזור למאגר מודיעין (CTI)",
            go_to_communication_from_questions: "המשך לתקשורת צוותית"
        },
        en: {
            trainee_questions_page_title: "Guiding Questions - Cyber Simulation Platform",
            guiding_questions_header: "Guiding Questions",
            guiding_questions_subtitle: "Answer the following questions to progress in the scenario and test your understanding.",
            question_text_placeholder: "Loading question...",
            answers_container_placeholder: "Loading answer options...",
            submit_answer_button: "Submit Answer",
            next_question_button: "Next Question",
            finish_scenario_button_questions: "Finish Scenario (Proceed to MITRE)",
            feedback_correct_title: "Correct Answer!",
            feedback_incorrect_title: "Incorrect Answer",
            feedback_default_correct: "Well done! Keep it up.",
            feedback_default_incorrect: "Try again. Consider the hints you've received.",
            current_score_label: "Current Scenario Score:",
            question1_text: "After reading the initial email from the CEO, what is the first and most important action you should take given the information presented?",
            question1_ans1_text: "Immediately block the sender's email address.",
            question1_ans2_text: "Check the mail server logs for similar emails.",
            question1_ans3_text: "Report the incident to the security manager and await instructions.",
            question1_ans4_text: "Click the link in the email in a sandbox environment to see where it leads.",
            question1_feedback_correct: "Absolutely right! Reporting to the security manager is a critical first step for coordinating the response.",
            question1_feedback_incorrect: "Not quite. While other actions are important, reporting and coordination are the first steps before immediate technical actions that might disrupt an investigation.",
            question2_text: "In reviewing the CTI feed, an IP Address IOC was identified as a suspected C&C server. What is the most effective immediate check to verify this suspicion?",
            question2_ans1_text: "Search the IP in VirusTotal or similar reputation databases.",
            question2_ans2_text: "Scan the IP with Nmap to find open ports.",
            question2_ans3_text: "Block the IP in the organizational firewall.",
            question2_ans4_text: "Attempt to browse to the IP via a web browser.",
            question2_feedback_correct: "Checking reputation databases like VirusTotal can quickly indicate if the IP is known to be malicious.",
            question2_feedback_incorrect: "While other actions are possible, a reputation check is often the quickest and most effective for initial IOC verification.",
            question3_text: "After analyzing all findings, what is the primary MITRE ATT&CK Tactic demonstrated in this attack?",
            question3_ans1_text: "Initial Access (TA0001)",
            question3_ans2_text: "Execution (TA0002)",
            question3_ans3_text: "Persistence (TA0003)",
            question3_ans4_text: "Defense Evasion (TA0005)",
            question3_feedback_correct: "Correct analysis! Indeed, the most prominent tactic here is Initial Access.",
            question3_feedback_incorrect: "Think again about the attacker's initial actions as discovered.",
            no_questions_available: "No questions available for this scenario at the moment.",
            // Navigation buttons
            go_back_to_cti_feed: "Back to CTI Feed",
            go_to_communication_from_questions: "Continue to Team Communication"
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
            // console.log('trainee_questions_translations.js: Calling applyTranslationsGlobal after merge.');
            window.applyTranslationsGlobal();
        }
    } else {
        console.error('trainee_questions_translations.js: Global translations object (window.translations) not found.');
        window.translations = pageTranslations; // Fallback
        if (typeof window.applyTranslationsGlobal === 'function') {
            window.applyTranslationsGlobal();
        }
    }
});