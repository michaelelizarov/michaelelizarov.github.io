// trainee_prep_materials.js
'use strict';
document.addEventListener('DOMContentLoaded', () => {
    const prepMaterialsGrid = document.getElementById('prep-materials-grid');
    const noMaterialsMessage = document.getElementById('no-prep-materials-found');
    const searchInput = document.getElementById('search-prep-materials');
    const typeFilterSelect = document.getElementById('filter-prep-type');
    const getLocalizedString = typeof window.getTranslatedStringGlobal === 'function' ?
        window.getTranslatedStringGlobal :
        function(key, replacements = {}) { console.warn('getTranslatedStringGlobal not found for key:', key); return `[${key}]`; };
    const mockPrepMaterials = [
        {
            id: 'prep001',
            titleKey: 'prep_item1_title', // "הבנת רשתות TCP/IP - יסודות"
            descriptionKey: 'prep_item1_desc',
            type: 'article', // Matches filter value
            actionTextKey: 'prep_item1_action_text', // "קרא מאמר"
            url: '#', // Placeholder URL
            tagsKey: 'prep_item1_tags', // "רשתות, TCP/IP, יסודות"
            iconSvgKey: 'icon_article' // Mapped to an icon in createPrepMaterialCard
        },
        {
            id: 'prep002',
            titleKey: 'prep_item2_title', // "מדריך: שימוש בסיסי ב-Nmap"
            descriptionKey: 'prep_item2_desc',
            type: 'guide',
            actionTextKey: 'prep_item2_action_text', // "קרא מדריך"
            url: '#',
            tagsKey: 'prep_item2_tags', // "Nmap, סריקת רשתות, כלים"
            iconSvgKey: 'icon_guide'
        },
        {
            id: 'prep003',
            titleKey: 'prep_item3_title', // "סרטון: מבוא ל-Linux Terminal"
            descriptionKey: 'prep_item3_desc',
            type: 'video',
            actionTextKey: 'prep_item3_action_text', // "צפה בסרטון"
            url: 'https://example.com/linux_terminal_intro', // Example URL
            tagsKey: 'prep_item3_tags', // "לינוקס, טרמינל, פקודות"
            iconSvgKey: 'icon_video'
        },
        // Added items based on updated translations
        {
            id: 'prep004',
            titleKey: 'prep_item4_title', // "דף עזר: פקודות PowerShell נפוצות לאבטחה"
            descriptionKey: 'prep_item4_desc',
            type: 'cheatsheet', // New type
            actionTextKey: 'action_text_view_cheatsheet', // Specific action text from translations
            url: '#',
            tagsKey: 'prep_item4_tags', // "PowerShell, Windows, סקריפטים"
            iconSvgKey: 'icon_cheatsheet' // Will need a new icon mapping
        },
        {
            id: 'prep005',
            titleKey: 'prep_item5_title', // "מאמר: ניתוח לוגים – מתודולוגיות וכלים"
            descriptionKey: 'prep_item5_desc',
            type: 'article',
            actionTextKey: 'prep_item1_action_text', // "קרא מאמר" (reusing existing action)
            url: '#',
            tagsKey: 'prep_item5_tags', // "לוגים, SIEM, תגובה לאירועים"
            iconSvgKey: 'icon_article'
        }
    ];
    const iconMapPrep = { // Specific for prep materials, can be merged with content management later
        article: `<svg class="content-card-icon w-8 h-8 text-primary mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>`,
        guide: `<svg class="content-card-icon w-8 h-8 text-primary mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v11.494m0 0A7.5 7.5 0 0019.5 12H4.5A7.5 7.5 0 0012 17.747z"></path></svg>`,
        video: `<svg class="content-card-icon w-8 h-8 text-primary mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>`,
        tool: `<svg class="content-card-icon w-8 h-8 text-primary mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>`,
        cheatsheet: `<svg class="content-card-icon w-8 h-8 text-primary mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path></svg>` // Example icon for cheatsheet
    };
    function createPrepMaterialCard(material) {
        const card = document.createElement('div');
        card.className = 'content-card card p-0 rounded-xl shadow-lg overflow-hidden flex flex-col'; // Using content-card class for similar styling
        const contentDiv = document.createElement('div');
        contentDiv.className = 'p-5 flex-grow flex flex-col';
        const iconWrapper = document.createElement('div');
        iconWrapper.className = 'content-card-icon-wrapper'; // Assuming a class for icon styling
        iconWrapper.innerHTML = iconMapPrep[material.type] || iconMapPrep.article; // Use defined icon or default
        contentDiv.appendChild(iconWrapper);
        const title = document.createElement('h3');
        title.className = 'content-card-title'; // Using content-card class
        title.textContent = getLocalizedString(material.titleKey);
        contentDiv.appendChild(title);
        const description = document.createElement('p');
        description.className = 'content-card-description flex-grow'; // Using content-card class
        description.textContent = getLocalizedString(material.descriptionKey);
        contentDiv.appendChild(description);
        const tags = document.createElement('p');
        tags.className = 'text-xs text-subtitle mt-2';
        tags.innerHTML = `<strong>${getLocalizedString('tags_label_prefix') || 'Tags:'}</strong> ${getLocalizedString(material.tagsKey)}`;
        contentDiv.appendChild(tags);
        const footerDiv = document.createElement('div');
        footerDiv.className = 'content-card-footer p-4 border-t border-[var(--card-border-color)] mt-auto'; // Using content-card class
        const typeSpan = document.createElement('span');
        typeSpan.className = 'content-card-type'; // Using content-card class
        typeSpan.textContent = getLocalizedString(`filter_prep_type_${material.type}`) || material.type; // Use filter_prep_type keys for display
        const actionLink = document.createElement('a');
        actionLink.href = material.url || '#';
        if (material.url && material.url !== '#') {
            actionLink.target = '_blank';
            actionLink.rel = 'noopener noreferrer';
        }
        actionLink.className = 'content-card-button'; // Using content-card class
        let actionIconSvg = `<svg class="w-4 h-4 rtl:mr-1 ltr:ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>`; // Default open icon
        if (material.type === 'video') {
             actionIconSvg = `<svg class="w-4 h-4 rtl:mr-1 ltr:ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`; // Play icon
        }
        actionLink.innerHTML = `<span data-lang-key="${material.actionTextKey}">${getLocalizedString(material.actionTextKey)}</span> ${actionIconSvg}`;
        const footerFlex = document.createElement('div');
        footerFlex.className = 'flex justify-between items-center';
        footerFlex.appendChild(typeSpan);
        footerFlex.appendChild(actionLink);
        footerDiv.appendChild(footerFlex);
        card.appendChild(contentDiv);
        card.appendChild(footerDiv);
        return card;
    }
    function renderPrepMaterials() {
        if (!prepMaterialsGrid || !noMaterialsMessage) return;
        prepMaterialsGrid.innerHTML = '';
        const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
        const selectedType = typeFilterSelect ? typeFilterSelect.value : 'all';
        const filteredMaterials = mockPrepMaterials.filter(material => {
            const title = getLocalizedString(material.titleKey).toLowerCase();
            const description = getLocalizedString(material.descriptionKey).toLowerCase();
            const tags = material.tagsKey ? getLocalizedString(material.tagsKey).toLowerCase() : '';
            const matchesSearch = title.includes(searchTerm) || description.includes(searchTerm) || tags.includes(searchTerm);
            const matchesType = selectedType === 'all' || material.type === selectedType;
            return matchesSearch && matchesType;
        });
        if (filteredMaterials.length === 0) {
            noMaterialsMessage.classList.remove('hidden');
        } else {
            noMaterialsMessage.classList.add('hidden');
            filteredMaterials.forEach(material => {
                const card = createPrepMaterialCard(material);
                prepMaterialsGrid.appendChild(card);
            });
        }
    }
    function initializePage() {
         if (typeof getLocalizedString === 'function' && window.translations &&
            Object.keys(window.translations[window.currentLang || 'he'] || {}).length > 10) {
            renderPrepMaterials();
            if (searchInput) searchInput.addEventListener('input', renderPrepMaterials);
            if (typeFilterSelect) typeFilterSelect.addEventListener('change', renderPrepMaterials);
        } else {
            setTimeout(initializePage, 100);
        }
    }
    setTimeout(initializePage, 50);
    window.updatePageSpecificTranslations = function(langPack, lang) {
        renderPrepMaterials(); // Re-render cards to apply new language
    };
    // Ensure general keys are available if used by createPrepMaterialCard for defaults
    if (window.translations) {
        const he = window.translations.he;
        const en = window.translations.en;
        if(he && !he.tags_label_prefix) he.tags_label_prefix = "תגיות:";
        if(en && !en.tags_label_prefix) en.tags_label_prefix = "Tags:";
        // Add more generic keys here if used as fallbacks in card creation
    }
});