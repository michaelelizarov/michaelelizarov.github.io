// trainee_communication.js
'use strict';
document.addEventListener('DOMContentLoaded', () => {
    const channelsListEl = document.getElementById('channels-list');
    const directMessagesListEl = document.getElementById('direct-messages-list');
    const chatMessagesContainerEl = document.getElementById('chat-messages-container');
    const noMessagesInChatEl = document.getElementById('no-messages-in-chat'); // The placeholder paragraph
    const chatForm = document.getElementById('chat-form');
    const chatInput = document.getElementById('chat-input');
    const sendChatMessageBtn = document.getElementById('send-chat-message-btn'); // Correct ID from HTML
    const activeChatTitleEl = document.getElementById('active-chat-title');
    // Action buttons in chat header
    const videoCallBtn = document.getElementById('video-call-btn');
    const voiceCallBtn = document.getElementById('voice-call-btn');
    const getLocalizedString = typeof window.getTranslatedStringGlobal === 'function' ?
        window.getTranslatedStringGlobal :
        function(key, replacements = {}) { console.warn('getTranslatedStringGlobal not found for key:', key); return `[${key}]`; };
    let currentChatContext = { type: null, id: null, name: '' }; // type: 'channel' or 'dm', id: channel/user id, name: display name
    let currentUser = { id: 'trainee_user_id', nameKey: 'current_user_self_name' }; // Example current user, add 'current_user_self_name' to translations (e.g., "אני")
    const mockChannels = [
        { id: 'channel_general_alpha', nameKey: 'channel_general_name', unread: 2 },
        { id: 'channel_tech_discuss', nameKey: 'channel_technical_name', unread: 0 }
    ];
    const mockDirectMessagesUsers = [ // Users available for DM
        { id: 'instructor01', nameKey: 'user_contact_instructor_name', avatar: 'avatar_instructor.webp', online: true },
        { id: 'teammate_yossi', nameKey: 'user_contact_teammate1_name', avatar: 'avatar3.webp', online: false },
        { id: 'teammate_shira', nameKey: 'user_contact_teammate2_name', avatar: 'avatar4.webp', online: true },
    ];
    let mockMessages = [
        { chatId: 'channel_general_alpha', senderId: 'teammate_yossi', senderNameKey: 'user_contact_teammate1_name', textKey: 'chat_message_user1_hello', timestamp: new Date(Date.now() - 5 * 60000).toISOString() },
        { chatId: 'channel_general_alpha', senderId: 'teammate_shira', senderNameKey: 'user_contact_teammate2_name', textKey: 'chat_message_user2_response', timestamp: new Date(Date.now() - 4 * 60000).toISOString() },
        { chatId: 'channel_general_alpha', senderId: 'instructor01', senderNameKey: 'user_contact_instructor_name', textKey: 'chat_message_instructor_hint', timestamp: new Date(Date.now() - 3 * 60000).toISOString() },
        { chatId: 'dm_instructor01', senderId: 'instructor01', senderNameKey: 'user_contact_instructor_name', textKey: 'instructor_dm_greeting', timestamp: new Date(Date.now() - 10 * 60000).toISOString() },
        { chatId: 'dm_instructor01', senderId: currentUser.id, senderNameKey: currentUser.nameKey, textKey: 'trainee_dm_reply_to_instructor', timestamp: new Date(Date.now() - 9 * 60000).toISOString() },
    ];
    // Add new translation keys used in mockMessages
    if(window.translations){
        const he = window.translations.he; const en = window.translations.en;
        if(he){
            he.current_user_self_name = he.current_user_self_name || "אני";
            he.instructor_dm_greeting = he.instructor_dm_greeting || "היי, רק רציתי לבדוק איך הולך לך התרחיש. יש שאלות?";
            he.trainee_dm_reply_to_instructor = he.trainee_dm_reply_to_instructor || "הכל בסדר בינתיים, תודה!";
        }
        if(en){
            en.current_user_self_name = en.current_user_self_name || "Me";
            en.instructor_dm_greeting = en.instructor_dm_greeting || "Hi, just wanted to check how the scenario is going. Any questions?";
            en.trainee_dm_reply_to_instructor = en.trainee_dm_reply_to_instructor || "All good for now, thanks!";
        }
    }
    function renderChannelList() {
        if (!channelsListEl) return;
        channelsListEl.innerHTML = '';
        if (mockChannels.length === 0) {
            channelsListEl.innerHTML = `<li class="text-xs text-subtitle px-3 py-1.5" data-lang-key="no_channels_available">${getLocalizedString('no_channels_available')}</li>`;
            return;
        }
        mockChannels.forEach(channel => {
            const li = document.createElement('li');
            const button = document.createElement('button');
            button.className = 'chat-list-item';
            button.dataset.chatId = channel.id;
            button.dataset.chatType = 'channel';
            button.dataset.chatNameKey = channel.nameKey;
            button.innerHTML = `
                <span class="chat-list-item-icon">#</span>
                <span class="chat-list-item-name truncate">${getLocalizedString(channel.nameKey)}</span>
                ${channel.unread > 0 ? `<span class="chat-list-item-unread">${channel.unread}</span>` : ''}
            `;
            button.addEventListener('click', () => setActiveChat('channel', channel.id, getLocalizedString(channel.nameKey)));
            li.appendChild(button);
            channelsListEl.appendChild(li);
        });
    }
    function renderDirectMessagesList() {
        if (!directMessagesListEl) return;
        directMessagesListEl.innerHTML = '';
        if (mockDirectMessagesUsers.length === 0) {
            directMessagesListEl.innerHTML = `<li class="text-xs text-subtitle px-3 py-1.5" data-lang-key="no_direct_messages_available">${getLocalizedString('no_direct_messages_available')}</li>`;
            return;
        }
        mockDirectMessagesUsers.forEach(user => {
            const li = document.createElement('li');
            const button = document.createElement('button');
            button.className = 'chat-list-item';
            button.dataset.chatId = `dm_${user.id}`; // Convention for DM chat ID
            button.dataset.chatType = 'dm';
            button.dataset.chatNameKey = user.nameKey; // To display name in chat header
            button.innerHTML = `
                <img src="${user.avatar}" alt="${getLocalizedString(user.nameKey)}" class="chat-list-item-avatar">
                <span class="chat-list-item-name truncate">${getLocalizedString(user.nameKey)}</span>
                <span class="chat-list-item-status ${user.online ? 'online' : 'offline'}"></span>
            `;
            button.addEventListener('click', () => setActiveChat('dm', `dm_${user.id}`, getLocalizedString(user.nameKey)));
            li.appendChild(button);
            directMessagesListEl.appendChild(li);
        });
    }
    function setActiveChat(type, id, name) {
        currentChatContext = { type, id, name };
        if (activeChatTitleEl) {
            activeChatTitleEl.textContent = name;
        }
        document.querySelectorAll('.chat-list-item').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.chatId === id);
        });
        displayMessages(id);
    }
    function displayMessages(chatId) {
        if (!chatMessagesContainerEl || !noMessagesInChatEl) return;
        chatMessagesContainerEl.innerHTML = '';
        const messagesToDisplay = mockMessages.filter(msg => msg.chatId === chatId).sort((a,b) => new Date(a.timestamp) - new Date(b.timestamp));
        if (messagesToDisplay.length === 0) {
            noMessagesInChatEl.classList.remove('hidden');
        } else {
            noMessagesInChatEl.classList.add('hidden');
            messagesToDisplay.forEach(msg => {
                const div = document.createElement('div');
                const isCurrentUserMsg = msg.senderId === currentUser.id;
                div.className = `chat-message ${isCurrentUserMsg ? 'sent' : 'received'}`;
                const senderName = isCurrentUserMsg ? getLocalizedString(currentUser.nameKey) : getLocalizedString(msg.senderNameKey);
                div.innerHTML = `
                    <div class="message-bubble">
                        ${!isCurrentUserMsg ? `<div class="message-sender">${senderName}</div>` : ''}
                        <div class="message-text">${getLocalizedString(msg.textKey) || msg.textKey}</div>
                        <div class="message-timestamp">${new Date(msg.timestamp).toLocaleTimeString(window.currentLang === 'he' ? 'he-IL' : 'en-US', { hour: 'numeric', minute: '2-digit' })}</div>
                    </div>
                `;
                chatMessagesContainerEl.appendChild(div);
            });
            chatMessagesContainerEl.scrollTop = chatMessagesContainerEl.scrollHeight; // Scroll to bottom
        }
    }
    if (chatForm) {
        chatForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const messageText = chatInput.value.trim();
            if (messageText && currentChatContext.id) {
                const newMessage = {
                    chatId: currentChatContext.id,
                    senderId: currentUser.id,
                    senderNameKey: currentUser.nameKey,
                    textKey: messageText, // Storing raw text as key for simplicity in mock
                    timestamp: new Date().toISOString()
                };
                // Add this new message text to translations dynamically for demo purposes
                if(window.translations){
                    if(!window.translations.he[messageText]) window.translations.he[messageText] = messageText;
                    if(!window.translations.en[messageText]) window.translations.en[messageText] = messageText;
                }
                mockMessages.push(newMessage);
                displayMessages(currentChatContext.id);
                chatInput.value = '';
            }
        });
    }
    // Mock actions for video/voice call buttons
    if (videoCallBtn) videoCallBtn.addEventListener('click', () => {
        if (currentChatContext.name) alert(getLocalizedString('starting_video_call_with', {contact: currentChatContext.name})); // Add this key
        else alert(getLocalizedString('select_chat_for_video_call')); // Add this key
    });
    if (voiceCallBtn) voiceCallBtn.addEventListener('click', () => {
         if (currentChatContext.name) alert(getLocalizedString('starting_voice_call_with', {contact: currentChatContext.name})); // Add this key
         else alert(getLocalizedString('select_chat_for_voice_call')); // Add this key
    });
    function initializePage() {
        if (typeof getLocalizedString === 'function' && window.translations &&
            Object.keys(window.translations[window.currentLang || 'he'] || {}).length > 10) {
            renderChannelList();
            renderDirectMessagesList();
            if (mockChannels.length > 0) { // Default to first channel if available
                setActiveChat('channel', mockChannels[0].id, getLocalizedString(mockChannels[0].nameKey));
            } else if (mockDirectMessagesUsers.length > 0) { // Or first DM
                setActiveChat('dm', `dm_${mockDirectMessagesUsers[0].id}`, getLocalizedString(mockDirectMessagesUsers[0].nameKey));
            } else {
                displayMessages(null); // Show "no messages" for the empty state
                if (activeChatTitleEl) activeChatTitleEl.textContent = '';
            }
        } else {
            setTimeout(initializePage, 150);
        }
    }
    setTimeout(initializePage, 100);
    window.updatePageSpecificTranslations = function(langPack, lang) {
        initializePage(); // Re-render lists and current chat
    };
    // Add new translation keys for this JS file if not already global
    if (window.translations) {
        const he = window.translations.he; const en = window.translations.en;
        if(he){
            he.starting_video_call_with = he.starting_video_call_with || "מתחיל שיחת וידאו עם {contact}... (סימולציה)";
            he.select_chat_for_video_call = he.select_chat_for_video_call || "אנא בחר שיחה להתחלת שיחת וידאו.";
            he.starting_voice_call_with = he.starting_voice_call_with || "מתחיל שיחת קול עם {contact}... (סימולציה)";
            he.select_chat_for_voice_call = he.select_chat_for_voice_call || "אנא בחר שיחה להתחלת שיחת קול.";
        }
        if(en){
            en.starting_video_call_with = en.starting_video_call_with || "Starting video call with {contact}... (mock)";
            en.select_chat_for_video_call = en.select_chat_for_video_call || "Please select a chat to start a video call.";
            en.starting_voice_call_with = en.starting_voice_call_with || "Starting voice call with {contact}... (mock)";
            en.select_chat_for_voice_call = en.select_chat_for_voice_call || "Please select a chat to start a voice call.";
        }
    }
});