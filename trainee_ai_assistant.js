// trainee_ai_assistant.js
'use strict';
document.addEventListener('DOMContentLoaded', () => {
    const chatMessagesContainer = document.getElementById('ai-chat-messages-container');
    const noMessagesEl = document.getElementById('no-ai-messages-placeholder'); // Placeholder for "no messages"
    const chatForm = document.getElementById('ai-chat-form');
    const chatInput = document.getElementById('ai-chat-input');
    // Send button is part of the form, submission is handled.
    const getLocalizedString = typeof window.getTranslatedStringGlobal === 'function' ?
        window.getTranslatedStringGlobal :
        function(key, replacements = {}) { console.warn('getTranslatedStringGlobal not found for key:', key); return `[${key}]`; };
    let currentUser = { id: 'trainee_user_id', nameKey: 'current_user_self_name_ai' }; // Specific key for AI chat if needed, or reuse global "Me"
    let mockAiChatMessages = [
        { 
            id: 'msg_ai_greet', 
            sender: 'ai', 
            textKey: 'ai_greeting_message', 
            timestamp: new Date(Date.now() - 10 * 60000).toISOString(),
            examples: [
                'user_q1_ai',
                'user_q2_ai', 
                'user_q3_ai'
            ]
        },
        // Example pre-loaded conversation if desired
        // { id: 'msg_user_1', sender: 'user', textKey: 'user_q1_ai', timestamp: new Date(Date.now() - 9 * 60000).toISOString() },
        // { id: 'msg_ai_1', sender: 'ai', textKey: 'ai_response_q1', timestamp: new Date(Date.now() - 8 * 60000).toISOString() },
    ];
    // Ensure 'current_user_self_name_ai' key exists or use a generic one
    if(window.translations) {
        const he = window.translations.he; const en = window.translations.en;
        if(he && !he.current_user_self_name_ai) he.current_user_self_name_ai = "אני";
        if(en && !en.current_user_self_name_ai) en.current_user_self_name_ai = "Me";
    }
    function displayAiMessages() {
        if (!chatMessagesContainer || !noMessagesEl) return;
        chatMessagesContainer.innerHTML = ''; // Clear previous messages
        const messagesToDisplay = [...mockAiChatMessages].sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
        if (messagesToDisplay.length === 0) {
            noMessagesEl.classList.remove('hidden');
            noMessagesEl.textContent = getLocalizedString('no_ai_messages_yet');
        } else {
            noMessagesEl.classList.add('hidden');
            messagesToDisplay.forEach(msg => {
                const messageDiv = document.createElement('div');
                const isUserMessage = msg.sender === 'user';
                messageDiv.className = `chat-message ${isUserMessage ? 'sent' : 'received'}`;
                const senderName = isUserMessage ? getLocalizedString(currentUser.nameKey) : getLocalizedString('ai_assistant_sender_name') || 'AI Assistant'; // Add 'ai_assistant_sender_name'
                const messageText = getLocalizedString(msg.textKey) || msg.textKey; // Display raw text if key not found (user input)
                messageDiv.innerHTML = `
                    <div class="message-bubble">
                        ${!isUserMessage ? `
                        <div class="flex items-center gap-2 mb-2">
                            <div class="ai-avatar">
                                <svg viewBox="0 0 24 24"><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"></path><path d="M11 11h2v6h-2zm0-4h2v2h-2z"></path></svg>
                            </div>
                            <div class="message-sender">${senderName}</div>
                        </div>` : ''}
                        <div class="message-text">${messageText.replace(/\n/g, '<br>')}</div>
                        ${msg.examples ? `
                        <div class="examples-container mt-3">
                            <div class="text-sm text-subtitle mb-2">${getLocalizedString('example_questions')}:</div>
                            ${msg.examples.map(ex => `
                                <button class="example-question-btn" data-key="${ex}">
                                    ${getLocalizedString(ex)}
                                </button>
                            `).join('')}
                        </div>` : ''}
                        <div class="message-timestamp">${new Date(msg.timestamp).toLocaleTimeString(window.currentLang === 'he' ? 'he-IL' : 'en-US', { hour: 'numeric', minute: '2-digit' })}</div>
                    </div>
                `;
                chatMessagesContainer.appendChild(messageDiv);
            });
            chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight; // Scroll to the bottom
        }
    }
    if (chatForm) {
        chatForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const userMessageText = chatInput.value.trim();
            if (userMessageText) {
                const newUserMessage = {
                    id: `msg_user_${Date.now()}`,
                    sender: 'user',
                    textKey: userMessageText, // Store raw user text as key for display purposes
                    timestamp: new Date().toISOString()
                };
                // Add user message text to translations dynamically for demo (not for production)
                if(window.translations){
                    if(!window.translations.he[userMessageText]) window.translations.he[userMessageText] = userMessageText;
                    if(!window.translations.en[userMessageText]) window.translations.en[userMessageText] = userMessageText;
                }
                mockAiChatMessages.push(newUserMessage);
                displayAiMessages();
                chatInput.value = '';
                // Simulate AI response
                setTimeout(() => {
                    let aiResponseKey = 'ai_generic_response'; // Default generic response key
                    if (userMessageText.toLowerCase().includes(getLocalizedString('keyword_hash_meaning', {}, 'en').toLowerCase()) || userMessageText.includes("SHA256")) {
                        aiResponseKey = 'ai_response_q1';
                    } else if (userMessageText.toLowerCase().includes(getLocalizedString('keyword_analyze_file', {}, 'en').toLowerCase())) {
                        aiResponseKey = 'ai_response_q2';
                    } else if (userMessageText.toLowerCase().includes(getLocalizedString('keyword_check_ip_malicious', {}, 'en').toLowerCase())) {
                        aiResponseKey = 'ai_response_q3';
                    }
                    const aiMessage = {
                        id: `msg_ai_${Date.now()}`,
                        sender: 'ai',
                        textKey: aiResponseKey,
                        timestamp: new Date().toISOString()
                    };
                    mockAiChatMessages.push(aiMessage);
                    displayAiMessages();
                }, 1000 + Math.random() * 1000); // Simulate delay
            }
        });
    }
    function initializePage() {
         if (typeof getLocalizedString === 'function' && window.translations &&
            Object.keys(window.translations[window.currentLang || 'he'] || {}).length > 10) {
            displayAiMessages();
        } else {
            setTimeout(initializePage, 150);
        }
    }
    setTimeout(initializePage, 100);
    window.updatePageSpecificTranslations = function(langPack, lang) {
        initializePage(); // Re-render chat with new language
    };
    // Add new translation keys used in this JS, including keywords for AI response logic
    if (window.translations) {
        const he = window.translations.he; const en = window.translations.en;
        if(he){
            he.ai_assistant_sender_name = he.ai_assistant_sender_name || "עוזר AI";
            he.ai_generic_response = he.ai_generic_response || "אני עדיין לומד, אך אני מבין ששאלת על כך. אנסה לחפש מידע נוסף.";
            he.keyword_hash_meaning = he.keyword_hash_meaning || "משמעות hash";
            he.keyword_analyze_file = he.keyword_analyze_file || "לנתח קובץ";
            he.keyword_check_ip_malicious = he.keyword_check_ip_malicious || "לבדוק IP";
        }
        if(en){
            en.ai_assistant_sender_name = en.ai_assistant_sender_name || "AI Assistant";
            en.ai_generic_response = en.ai_generic_response || "I'm still learning, but I understand you asked about that. I'll try to find more information.";
            en.keyword_hash_meaning = en.keyword_hash_meaning || "meaning of hash";
            en.keyword_analyze_file = en.keyword_analyze_file || "analyze file";
            en.keyword_check_ip_malicious = en.keyword_check_ip_malicious || "check IP";
        }
    }
    // הוספת אירוע ללחיצה על דוגמאות שאלה
    document.addEventListener('click', (e) => {
        if(e.target.closest('.example-question-btn')) {
            const questionKey = e.target.dataset.key;
            chatInput.value = getLocalizedString(questionKey);
        }
    });
});