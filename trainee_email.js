// trainee_email.js
'use strict';
document.addEventListener('DOMContentLoaded', () => {
    const emailListContainer = document.getElementById('email-list-container');
    const noEmailsMessage = document.getElementById('no-emails-message');
    const emailContentView = document.getElementById('email-content-view');
    const emailViewPlaceholder = document.getElementById('email-view-placeholder');
    const composeModal = document.getElementById('compose-modal');
    const composeEmailBtn = document.getElementById('compose-email-btn');
    const closeModalButtons = document.querySelectorAll('.modal-close-button'); // For compose modal
    const composeEmailForm = document.getElementById('compose-email-form');
    // Email action buttons (in email view header)
    const replyBtn = document.getElementById('email-action-reply');
    const replyAllBtn = document.getElementById('email-action-reply-all');
    const forwardBtn = document.getElementById('email-action-forward');
    const deleteBtn = document.getElementById('email-action-delete');
    let currentFolder = 'inbox'; // Default folder
    let currentSelectedEmailId = null;
    const getLocalizedString = typeof window.getTranslatedStringGlobal === 'function' ?
        window.getTranslatedStringGlobal :
        function(key, replacements = {}) { console.warn('getTranslatedStringGlobal not found for key:', key); return `[${key}]`; };
    const mockEmails = [
        { id: 'email1', folder: 'inbox', senderKey: 'mock_email1_sender', subjectKey: 'mock_email1_subject', snippetKey: 'mock_email1_snippet', bodyKey: 'mock_email1_body_intro', timestamp: '2024-05-21 10:30', isRead: false, to: 'trainee@example.com', attachments: [] },
        { id: 'email2', folder: 'inbox', senderKey: 'mock_email2_sender', subjectKey: 'mock_email2_subject', snippetKey: 'mock_email2_snippet', bodyKey: 'mock_email2_body_intro', timestamp: '2024-05-21 09:15', isRead: true, to: 'trainee@example.com', attachments: [] },
        { id: 'email3', folder: 'inbox', senderKey: 'mock_email3_sender', subjectKey: 'mock_email3_subject', snippetKey: 'mock_email3_snippet', bodyKey: 'mock_email3_body_intro', timestamp: '2024-05-20 16:00', isRead: false, to: 'trainee@example.com', attachments: [{ nameKey: 'mock_attachment1_name', url: '#' }] }, // Example with attachment
        { id: 'email4', folder: 'sent', senderKey: 'trainee@example.com', subjectKey: 'mock_email4_subject', snippetKey: 'mock_email4_snippet', bodyKey: 'mock_email4_body_intro', timestamp: '2024-05-20 14:00', isRead: true, to: getLocalizedString('mock_email4_sender'), attachments: [] },
        { id: 'email5', folder: 'inbox', senderKey: 'mock_email5_sender', subjectKey: 'mock_email5_subject', snippetKey: 'mock_email5_snippet', bodyKey: 'mock_email5_body_intro', timestamp: '2024-05-19 11:00', isRead: false, to: 'trainee@example.com', attachments: [] },
        // Add more emails for different folders (drafts, junk, archive)
        { id: 'email6', folder: 'drafts', senderKey: 'trainee@example.com', subjectKey: 'draft_meeting_notes_subject', snippetKey: 'draft_meeting_notes_snippet', bodyKey: 'draft_meeting_notes_body', timestamp: '2024-05-18 17:00', isRead: true, to: 'colleague@example.com', attachments: [] },
        { id: 'email7', folder: 'junk', senderKey: 'spam.king@example.net', subjectKey: 'junk_win_prize_subject', snippetKey: 'junk_win_prize_snippet', bodyKey: 'junk_win_prize_body', timestamp: '2024-05-17 08:00', isRead: false, to: 'trainee@example.com', attachments: [] },
    ];
    // Add new translation keys used in mockEmails
     if (window.translations) {
        const he = window.translations.he; const en = window.translations.en;
        if (he) {
            he.draft_meeting_notes_subject = he.draft_meeting_notes_subject || "טיוטה: סיכום פגישת אבטחה";
            he.draft_meeting_notes_snippet = he.draft_meeting_notes_snippet || "הנקודות העיקריות מהפגישה של היום היו...";
            he.draft_meeting_notes_body = he.draft_meeting_notes_body || "גוף המייל של טיוטת סיכום הפגישה.";
            he.junk_win_prize_subject = he.junk_win_prize_subject || "זכית בפרס!!!";
            he.junk_win_prize_snippet = he.junk_win_prize_snippet || "לקוח יקר, הודעה חשובה מחכה לך. לחץ כאן...";
            he.junk_win_prize_body = he.junk_win_prize_body || "פרטים מלאים על זכייתך המדהימה!";
        }
        if (en) {
            en.draft_meeting_notes_subject = en.draft_meeting_notes_subject || "Draft: Security Meeting Summary";
            en.draft_meeting_notes_snippet = en.draft_meeting_notes_snippet || "The main points from today's meeting were...";
            en.draft_meeting_notes_body = en.draft_meeting_notes_body || "Body of the draft meeting summary email.";
            en.junk_win_prize_subject = en.junk_win_prize_subject || "YOU WON A PRIZE!!!";
            en.junk_win_prize_snippet = en.junk_win_prize_snippet || "Dear customer, an important message awaits you. Click here...";
            en.junk_win_prize_body = en.junk_win_prize_body || "Full details of your amazing prize!";
        }
    }
    function renderEmailList(folder) {
        if (!emailListContainer || !noEmailsMessage) return;
        emailListContainer.innerHTML = '';
        currentFolder = folder;
        // Update active folder styling
        document.querySelectorAll('.email-folder-item').forEach(el => {
            el.classList.toggle('active', el.dataset.folder === folder);
        });
        const emailsInFolder = mockEmails.filter(email => email.folder === folder);
        if (emailsInFolder.length === 0) {
            noEmailsMessage.classList.remove('hidden');
            noEmailsMessage.textContent = getLocalizedString('no_emails_in_folder');
        } else {
            noEmailsMessage.classList.add('hidden');
            emailsInFolder.sort((a,b) => new Date(b.timestamp) - new Date(a.timestamp)); // Sort by newest first
            emailsInFolder.forEach(email => {
                const item = document.createElement('div');
                item.className = `email-list-item p-3 border-b border-[var(--card-border-color)] cursor-pointer hover:bg-[var(--card-hover-bg)] dark:hover:bg-slate-700/50 ${email.isRead ? 'read' : 'font-semibold'}`;
                item.dataset.emailId = email.id;
                item.innerHTML = `
                    <div class="flex justify-between items-center mb-1">
                        <span class="text-sm text-header truncate max-w-[60%]">${getLocalizedString(email.senderKey) || email.senderKey}</span>
                        <span class="text-xs text-subtitle">${new Date(email.timestamp).toLocaleString(window.currentLang === 'he' ? 'he-IL' : 'en-US', { day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit' })}</span>
                    </div>
                    <h4 class="text-sm text-text-color truncate mb-1">${getLocalizedString(email.subjectKey)}</h4>
                    <p class="text-xs text-subtitle truncate">${getLocalizedString(email.snippetKey)}</p>
                `;
                item.addEventListener('click', () => displayEmailContent(email.id));
                emailListContainer.appendChild(item);
            });
        }
        // Hide email view placeholder if we have emails or if a specific email should be displayed
        if (emailViewPlaceholder) emailViewPlaceholder.classList.toggle('hidden', emailsInFolder.length > 0 || currentSelectedEmailId !== null);
        if (emailsInFolder.length === 0) {
            if (emailContentView) emailContentView.classList.add('hidden'); // Hide content view if folder is empty
        }
    }
    function displayEmailContent(emailId) {
        currentSelectedEmailId = emailId;
        const email = mockEmails.find(e => e.id === emailId);
        if (!email || !emailContentView || !emailViewPlaceholder) return;
        email.isRead = true; // Mark as read
        renderEmailList(currentFolder); // Re-render list to reflect read status
        emailViewPlaceholder.classList.add('hidden');
        emailContentView.classList.remove('hidden');
        const attachmentsHTML = email.attachments && email.attachments.length > 0 ?
            email.attachments.map(att => `
                <a href="${att.url}" download class="attachment-link inline-flex items-center text-sm text-primary hover:underline mr-2 mb-2 p-1 border border-primary/50 rounded-md">
                    <svg class="w-4 h-4 rtl:ml-1 ltr:mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                    ${getLocalizedString(att.nameKey) || att.nameKey}
                </a>`).join('') : '';
        emailContentView.innerHTML = `
            <div class="email-view-header p-4 border-b border-[var(--card-border-color)]">
                <h3 class="text-xl font-semibold text-header mb-2">${getLocalizedString(email.subjectKey)}</h3>
                <div class="text-sm text-subtitle">
                    <p><strong>${getLocalizedString('email_from_label')}</strong> ${getLocalizedString(email.senderKey) || email.senderKey}</p>
                    <p><strong>${getLocalizedString('email_to_label')}</strong> ${email.to}</p>
                    ${email.cc ? `<p><strong>${getLocalizedString('email_cc_label')}</strong> ${email.cc}</p>` : ''}
                    <p><strong>${getLocalizedString('email_date_label')}</strong> ${new Date(email.timestamp).toLocaleString(window.currentLang === 'he' ? 'he-IL' : 'en-US', { dateStyle: 'medium', timeStyle: 'short' })}</p>
                </div>
            </div>
            <div class="email-view-body p-4 prose dark:prose-invert max-w-none overflow-y-auto">
                <p>${getLocalizedString(email.bodyKey).replace(/\n/g, '<br>') || "Email body not found."}</p>
            </div>
            ${attachmentsHTML ? `
            <div class="email-view-attachments p-4 border-t border-[var(--card-border-color)]">
                <strong class="text-sm text-subtitle block mb-2">${getLocalizedString('email_attachments_label')}</strong>
                ${attachmentsHTML}
            </div>` : ''}
        `;
        // Update action buttons state
        updateEmailActionButtons(true);
    }
    function updateEmailActionButtons(emailSelected) {
        const buttons = [replyBtn, replyAllBtn, forwardBtn, deleteBtn];
        buttons.forEach(btn => {
            if (btn) btn.disabled = !emailSelected;
        });
    }
    // Event listeners for folders
    document.querySelectorAll('.email-folder-item').forEach(folderEl => {
        folderEl.addEventListener('click', () => {
            const folderName = folderEl.dataset.folder;
            currentSelectedEmailId = null; // Clear selected email when changing folder
            renderEmailList(folderName);
            if (emailContentView) emailContentView.classList.add('hidden');
            if (emailViewPlaceholder) emailViewPlaceholder.classList.remove('hidden');
            updateEmailActionButtons(false);
        });
    });
    // Event listeners for email actions
    if (replyBtn) replyBtn.addEventListener('click', () => alert('Reply (mock action)'));
    if (replyAllBtn) replyAllBtn.addEventListener('click', () => alert('Reply All (mock action)'));
    if (forwardBtn) forwardBtn.addEventListener('click', () => alert('Forward (mock action)'));
    if (deleteBtn) deleteBtn.addEventListener('click', () => {
        if(currentSelectedEmailId && confirm(getLocalizedString('confirm_delete_email_prefix', {emailSubject: getLocalizedString(mockEmails.find(e=>e.id===currentSelectedEmailId)?.subjectKey)}))) { // Add confirm_delete_email_prefix key
            mockEmails = mockEmails.filter(e => e.id !== currentSelectedEmailId);
            currentSelectedEmailId = null;
            renderEmailList(currentFolder);
            if(emailContentView) emailContentView.classList.add('hidden');
            if(emailViewPlaceholder) emailViewPlaceholder.classList.remove('hidden');
            updateEmailActionButtons(false);
            alert('Email deleted (mock action)');
        }
    });
    // Compose Modal Logic
    if (composeEmailBtn) {
        composeEmailBtn.addEventListener('click', () => {
            if(composeModal && composeEmailForm){
                composeEmailForm.reset();
                const modalTitle = composeModal.querySelector('.modal-title');
                if(modalTitle) modalTitle.textContent = getLocalizedString('compose_modal_title');
                openModal(composeModal);
            }
        });
    }
    if (composeEmailForm) {
        composeEmailForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const to = composeEmailForm.elements['composeTo'].value;
            const subject = composeEmailForm.elements['composeSubject'].value;
            const body = composeEmailForm.elements['composeBody'].value;
            // Mock sending email
            const newSentEmail = {
                id: `sent_${Date.now()}`,
                folder: 'sent',
                senderKey: 'trainee@example.com', // Assuming trainee is sender
                subjectKey: subject, // For dynamic subjects, store raw value
                snippetKey: body.substring(0, 50) + '...',
                bodyKey: body,
                timestamp: new Date().toISOString(),
                isRead: true,
                to: to
            };
            // Add subject and body to translations if they are meant to be static keys
            // Otherwise, they are treated as raw strings for display
             if(window.translations){
                if(!window.translations.he[subject]) window.translations.he[subject] = subject;
                if(!window.translations.en[subject]) window.translations.en[subject] = subject;
                if(!window.translations.he[body]) window.translations.he[body] = body;
                if(!window.translations.en[body]) window.translations.en[body] = body;
                 if(!window.translations.he[newSentEmail.snippetKey]) window.translations.he[newSentEmail.snippetKey] = newSentEmail.snippetKey;
                 if(!window.translations.en[newSentEmail.snippetKey]) window.translations.en[newSentEmail.snippetKey] = newSentEmail.snippetKey;
            }
            mockEmails.push(newSentEmail);
            console.log("Mock Email Sent:", newSentEmail);
            alert(getLocalizedString('email_sent_successfully_alert')); // Add this key
            closeModal(composeModal);
            if (currentFolder === 'sent') { // Refresh if currently viewing sent folder
                renderEmailList('sent');
            }
        });
    }
    function initializePage() {
        if (typeof getLocalizedString === 'function' && window.translations &&
            Object.keys(window.translations[window.currentLang || 'he'] || {}).length > 10) {
            renderEmailList(currentFolder); // Render default folder
            updateEmailActionButtons(false); // Disable actions initially
            // Translate folder counts if static HTML elements for count exist
            document.querySelectorAll('.email-folder-item .folder-count').forEach(el => {
                const folder = el.closest('.email-folder-item')?.dataset.folder;
                if (folder) {
                    el.textContent = `(${mockEmails.filter(m => m.folder === folder && !m.isRead).length})`;
                }
            });
        } else {
            setTimeout(initializePage, 150);
        }
    }
    setTimeout(initializePage, 100);
    window.updatePageSpecificTranslations = function(langPack, lang) {
        initializePage();
        if(currentSelectedEmailId) { // Re-render selected email if one is open
            displayEmailContent(currentSelectedEmailId);
        }
        // Re-translate compose modal title if open
        if(composeModal && !composeModal.classList.contains('hidden')){
            const modalTitle = composeModal.querySelector('.modal-title');
            if(modalTitle) modalTitle.textContent = getLocalizedString('compose_modal_title');
        }
    };
    // Add new translation keys used in this JS
    if(window.translations){
        const he = window.translations.he; const en = window.translations.en;
        if(he){
            he.confirm_delete_email_prefix = he.confirm_delete_email_prefix || "האם למחוק את המייל '{emailSubject}'?";
            he.email_sent_successfully_alert = he.email_sent_successfully_alert || "המייל נשלח (סימולציה).";
        }
        if(en){
            en.confirm_delete_email_prefix = en.confirm_delete_email_prefix || "Delete email '{emailSubject}'?";
            en.email_sent_successfully_alert = en.email_sent_successfully_alert || "Email sent (mock).";
        }
    }
});