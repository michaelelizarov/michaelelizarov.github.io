// trainee_mitigation.js
'use strict';
document.addEventListener('DOMContentLoaded', () => {
    const immediateActionsList = document.getElementById('immediate-actions-list');
    const shortTermRecsList = document.getElementById('short-term-recs-list');
    const longTermStrategyList = document.getElementById('long-term-strategy-list');
    // Placeholders for "no steps" messages if needed (e.g., if data could be empty)
    // const noImmediateStepsMsg = document.getElementById('no-immediate-steps-msg');
    const getLocalizedString = typeof window.getTranslatedStringGlobal === 'function' ?
        window.getTranslatedStringGlobal :
        function(key, replacements = {}) { console.warn('getTranslatedStringGlobal not found for key:', key); return `[${key}]`; };
    const mockMitigationSteps = {
        immediate: [
            { textKey: 'mit_step_immediate1_text', icon: '⚠️' },
            { textKey: 'mit_step_immediate2_text', icon: '🚫' },
            { textKey: 'mit_step_immediate3_text', icon: '🔑' },
            { textKey: 'mit_step_immediate4_text', icon: '🔍' }
        ],
        shortTerm: [
            { textKey: 'mit_step_short_term1_text', icon: '🩹' },
            { textKey: 'mit_step_short_term2_text', icon: '🛡️' },
            { textKey: 'mit_step_short_term3_text', icon: '📄' },
            { textKey: 'mit_step_short_term4_text', icon: '📊' }
        ],
        longTerm: [
            { textKey: 'mit_step_long_term1_text', icon: '📜' },
            { textKey: 'mit_step_long_term2_text', icon: '🎓' },
            { textKey: 'mit_step_long_term3_text', icon: '💡' },
            { textKey: 'mit_step_long_term4_text', icon: '🔬' }
        ]
    };
    function populateStepList(listElement, steps) {
        if (!listElement) return;
        listElement.innerHTML = ''; // Clear any static content
        if (!steps || steps.length === 0) {
            // Handle no steps for this category if needed (e.g., show a message)
            // For now, assuming mock data will always have steps.
            const listItem = document.createElement('li');
            listItem.className = 'text-subtitle text-sm';
            listItem.textContent = getLocalizedString('no_mitigation_steps_in_category'); // Add this key
            listElement.appendChild(listItem);
            return;
        }
        steps.forEach(step => {
            const listItem = document.createElement('li');
            listItem.className = 'flex items-start gap-2 py-1';
            const iconSpan = document.createElement('span');
            iconSpan.className = 'mitigation-step-icon text-lg text-primary'; // Added text-primary
            iconSpan.textContent = step.icon || '➡️'; // Default icon
            const textSpan = document.createElement('span');
            textSpan.className = 'mitigation-step-text text-text-color';
            textSpan.textContent = getLocalizedString(step.textKey);
            listItem.appendChild(iconSpan);
            listItem.appendChild(textSpan);
            listElement.appendChild(listItem);
        });
    }
    function renderMitigationSteps() {
        populateStepList(immediateActionsList, mockMitigationSteps.immediate);
        populateStepList(shortTermRecsList, mockMitigationSteps.shortTerm);
        populateStepList(longTermStrategyList, mockMitigationSteps.longTerm);
    }
    function initializePage() {
         if (typeof getLocalizedString === 'function' && window.translations &&
            Object.keys(window.translations[window.currentLang || 'he'] || {}).length > 10) {
            renderMitigationSteps();
        } else {
            setTimeout(initializePage, 150);
        }
    }
    setTimeout(initializePage, 100); // Initial call
    window.updatePageSpecificTranslations = function(langPack, lang) {
        renderMitigationSteps(); // Re-render steps with new language
    };
    // Add new translation keys used by this JS
    if (window.translations) {
        const he = window.translations.he; const en = window.translations.en;
        if(he) {
            he.no_mitigation_steps_in_category = he.no_mitigation_steps_in_category || "אין המלצות בקטגוריה זו.";
        }
        if(en) {
            en.no_mitigation_steps_in_category = en.no_mitigation_steps_in_category || "No recommendations in this category.";
        }
    }
});