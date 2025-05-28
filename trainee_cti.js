// trainee_cti.js
'use strict';
document.addEventListener('DOMContentLoaded', () => {
    const ctiFeedContainer = document.getElementById('cti-feed-container');
    const noCtiItemsMessage = document.getElementById('no-cti-items-msg');
    const loadMoreCtiBtn = document.getElementById('load-more-cti-btn');
    const allCtiLoadedMsg = document.getElementById('all-cti-loaded-msg');
    const searchInput = document.getElementById('cti-search-input');
    const sourceFilter = document.getElementById('cti-filter-source');
    const severityFilter = document.getElementById('cti-filter-severity');
    const getLocalizedString = typeof window.getTranslatedStringGlobal === 'function' ?
        window.getTranslatedStringGlobal :
        function(key, replacements = {}) { console.warn('getTranslatedStringGlobal not found for key:', key); return `[${key}]`; };
    const ITEMS_PER_PAGE = 3; // Number of CTI items to load at a time
    let renderedItemsCount = 0;
    let currentFilters = { searchTerm: '', source: 'all', severity: 'all' };
    const mockCtiFeeds = [
        {
            id: 'cti001', titleKey: 'cti_item1_title', sourceKey: 'cti_source_osint', date: '2024-05-20',
            summaryKey: 'cti_item1_summary', severityKey: 'cti_severity_high',
            iocs: [
                { typeKey: 'ioc_type_domain', value: 'suspicious-stream.net' },
                { typeKey: 'ioc_type_ip', value: '192.168.10.15' }
            ]
        },
        {
            id: 'cti002', titleKey: 'cti_item2_title', sourceKey: 'cti_source_gov', date: '2024-05-18',
            summaryKey: 'cti_item2_summary', severityKey: 'cti_severity_critical',
            iocs: [
                { typeKey: 'ioc_type_url', value: 'http://vulnerable-tomcat.example.com/exploit' },
                { typeKey: 'ioc_type_hash_sha256', value: 'a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2' }
            ]
        },
        {
            id: 'cti003', titleKey: 'cti_item3_title', sourceKey: 'cti_source_vendor', date: '2024-05-15',
            summaryKey: 'cti_item3_summary', severityKey: 'cti_severity_high',
            iocs: [
                { typeKey: 'ioc_type_domain', value: 'lockbit-c2-server.com' },
                { typeKey: 'ioc_type_hash_md5', value: 'abcdef1234567890abcdef1234567890' }
            ]
        },
        {
            id: 'cti004', titleKey: 'cti_item4_title', sourceKey: 'cti_source_internal', date: '2024-05-21',
            summaryKey: 'cti_item4_summary', severityKey: 'cti_severity_medium',
            iocs: [
                { typeKey: 'ioc_type_ip', value: '10.0.5.123' },
                { typeKey: 'ioc_type_domain', value: 'unusual-external-host.io' }
            ]
        },
        // Add more mock CTI feeds if needed to test "load more"
        {
            id: 'cti005', titleKey: 'cti_item_new_malware_variant', sourceKey: 'cti_source_vendor', date: '2024-05-22',
            summaryKey: 'cti_item_new_malware_summary', severityKey: 'cti_severity_high',
            iocs: [{ typeKey: 'ioc_type_hash_sha256', value: 'ffeeddccbbaa99887766554433221100aabbccddeeff0011223344556677' }]
        }
    ];
    // Add new translation keys used for additional mock CTI items
    if(window.translations){
        const he = window.translations.he; const en = window.translations.en;
        if(he){
            he.cti_item_new_malware_variant = he.cti_item_new_malware_variant || "וריאנט חדש של נוזקה 'ZeusVariantX' זוהה בפעולה";
            he.cti_item_new_malware_summary = he.cti_item_new_malware_summary || "הנוזקה מנצלת חולשות בדפדפנים ישנים. כוללת יכולות גניבת סיסמאות ופרטי כרטיסי אשראי.";
        }
        if(en){
            en.cti_item_new_malware_variant = en.cti_item_new_malware_variant || "New Malware Variant 'ZeusVariantX' Detected in the Wild";
            en.cti_item_new_malware_summary = en.cti_item_new_malware_summary || "The malware exploits vulnerabilities in outdated browsers. Includes capabilities for password and credit card theft.";
        }
    }
    function copyToClipboard(text, buttonElement) {
        navigator.clipboard.writeText(text).then(() => {
            const originalText = buttonElement.innerHTML;
            buttonElement.innerHTML = `<span class="text-xs text-green-500">${getLocalizedString('ioc_copied_message')}</span>`;
            setTimeout(() => {
                buttonElement.innerHTML = originalText; // Restore original icon/text
            }, 1500);
        }).catch(err => {
            console.error('Failed to copy IOC: ', err);
        });
    }
    function createCtiItemDOM(item) {
        const article = document.createElement('article');
        article.className = 'cti-feed-item card p-4 rounded-lg shadow-md mb-4';
        // Determine severity color
        let borderClass = 'border-gray-300';
        let darkBorderClass = 'dark-border-gray-600';
        
        switch(item.severityKey) {
            case 'cti_severity_critical':
                borderClass = 'border-red-600';
                darkBorderClass = 'dark-border-red-400';
                break;
            case 'cti_severity_high':
                borderClass = 'border-orange-500';
                darkBorderClass = 'dark-border-orange-400';
                break;
            case 'cti_severity_medium':
                borderClass = 'border-yellow-500';
                darkBorderClass = 'dark-border-yellow-400';
                break;
            case 'cti_severity_low':
                borderClass = 'border-blue-500';
                darkBorderClass = 'dark-border-blue-400';
                break;
        }
        
        article.classList.add('border-s-4', borderClass);
        if (document.body.classList.contains('dark-theme')) {
            article.classList.add(darkBorderClass);
        }
        let iocsHTML = '';
        if (item.iocs && item.iocs.length > 0) {
            const iocItemsHTML = item.iocs.map(ioc => `
                <li class="flex justify-between items-center py-1">
                    <span class="text-sm"><strong>${getLocalizedString(ioc.typeKey)}:</strong> ${ioc.value}</span>
                    <button type="button" class="copy-ioc-btn text-primary hover:text-primary-dark text-xs p-1 rounded" title="${getLocalizedString('copy_ioc_tooltip')}" data-ioc-value="${ioc.value}">
                        <svg class="w-3 h-3 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
                    </button>
                </li>
            `).join('');
            iocsHTML = `
                <div class="mt-3 pt-2 border-t border-[var(--card-border-color)]">
                    <h5 class="text-sm font-semibold text-header mb-1" data-lang-key="iocs_section_title">${getLocalizedString('iocs_section_title')}</h5>
                    <ul class="list-none p-0 space-y-0.5">${iocItemsHTML}</ul>
                </div>
            `;
        }
        article.innerHTML = `
            <header class="mb-2">
                <h3 class="text-lg font-semibold text-header">${getLocalizedString(item.titleKey)}</h3>
                <p class="text-xs text-subtitle">
                    <span data-lang-key="cti_source_label_prefix">${getLocalizedString('cti_source_label_prefix') || 'מקור:'}</span> ${getLocalizedString(item.sourceKey)} |
                    <span data-lang-key="cti_date_label_prefix">${getLocalizedString('cti_date_label_prefix') || 'תאריך:'}</span> ${item.date} |
                    <span data-lang-key="cti_severity_label_prefix">${getLocalizedString('cti_severity_label_prefix') || 'חומרה:'}</span> <span class="font-medium">${getLocalizedString(item.severityKey)}</span>
                </p>
            </header>
            <p class="text-sm text-text-color mb-1">${getLocalizedString(item.summaryKey)}</p>
            ${iocsHTML}
        `;
        // Add event listeners for copy buttons
        article.querySelectorAll('.copy-ioc-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent card click if any
                copyToClipboard(button.dataset.iocValue, button);
            });
        });
        return article;
    }
    function renderCtiFeed(append = false) {
        if (!ctiFeedContainer || !noCtiItemsMessage || !loadMoreCtiBtn || !allCtiLoadedMsg) return;
        const filteredItems = mockCtiFeeds.filter(item => {
            const title = getLocalizedString(item.titleKey).toLowerCase();
            const summary = getLocalizedString(item.summaryKey).toLowerCase();
            const iocMatch = item.iocs ? item.iocs.some(ioc => ioc.value.toLowerCase().includes(currentFilters.searchTerm)) : false;
            const matchesSearch = currentFilters.searchTerm === '' || title.includes(currentFilters.searchTerm) || summary.includes(currentFilters.searchTerm) || iocMatch;
            const matchesSource = currentFilters.source === 'all' || item.sourceKey === currentFilters.source;
            const matchesSeverity = currentFilters.severity === 'all' || item.severityKey === currentFilters.severity;
            return matchesSearch && matchesSource && matchesSeverity;
        });
        if (!append) {
            ctiFeedContainer.innerHTML = '';
            renderedItemsCount = 0;
        }
        const itemsToRenderNow = filteredItems.slice(renderedItemsCount, renderedItemsCount + ITEMS_PER_PAGE);
        if (renderedItemsCount === 0 && itemsToRenderNow.length === 0) {
            noCtiItemsMessage.classList.remove('hidden');
            noCtiItemsMessage.textContent = getLocalizedString('no_cti_items_found');
            loadMoreCtiBtn.classList.add('hidden');
            allCtiLoadedMsg.classList.add('hidden');
            return;
        }
        noCtiItemsMessage.classList.add('hidden');
        itemsToRenderNow.forEach(item => {
            const itemDOM = createCtiItemDOM(item);
            ctiFeedContainer.appendChild(itemDOM);
        });
        renderedItemsCount += itemsToRenderNow.length;
        if (renderedItemsCount >= filteredItems.length) {
            loadMoreCtiBtn.classList.add('hidden');
            allCtiLoadedMsg.classList.remove('hidden');
            allCtiLoadedMsg.textContent = getLocalizedString('all_cti_loaded_message');
        } else {
            loadMoreCtiBtn.classList.remove('hidden');
            loadMoreCtiBtn.textContent = getLocalizedString('load_more_cti_button');
            allCtiLoadedMsg.classList.add('hidden');
        }
    }
    function handleFilterChange() {
        currentFilters.searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
        currentFilters.source = sourceFilter ? sourceFilter.value : 'all';
        currentFilters.severity = severityFilter ? severityFilter.value : 'all';
        renderCtiFeed(false); // Re-render from the beginning with new filters
    }
    function initializePage() {
        if (typeof getLocalizedString === 'function' && window.translations &&
            Object.keys(window.translations[window.currentLang || 'he'] || {}).length > 10) {
            renderCtiFeed(); // Initial render
            if (loadMoreCtiBtn) loadMoreCtiBtn.addEventListener('click', () => renderCtiFeed(true));
            if (searchInput) searchInput.addEventListener('input', handleFilterChange);
            if (sourceFilter) sourceFilter.addEventListener('change', handleFilterChange);
            if (severityFilter) severityFilter.addEventListener('change', handleFilterChange);
        } else {
            setTimeout(initializePage, 150);
        }
    }
    setTimeout(initializePage, 100);
    window.updatePageSpecificTranslations = function(langPack, lang) {
        // Re-render with current filters, preserving loaded state
        const currentRenderedCount = renderedItemsCount;
        const currentSearch = currentFilters.searchTerm;
        const currentSource = currentFilters.source;
        const currentSeverity = currentFilters.severity;
        renderCtiFeed(false); // This resets renderedItemsCount and applies new lang to filters if they are dynamic
        // To maintain the illusion of state, we might need to re-render up to currentRenderedCount
        // For simplicity now, it just re-renders the first page with new language.
        // A more complex state management would be needed to keep "Load More" state across lang changes.
        // OR, just re-filter and re-render the first page:
        currentFilters.searchTerm = searchInput ? searchInput.value.toLowerCase() : ''; // Search term might need re-translation if keys
        currentFilters.source = sourceFilter ? sourceFilter.value : 'all';
        currentFilters.severity = severityFilter ? severityFilter.value : 'all';
        renderCtiFeed(false);
    };
    // Add new translation keys for this JS file
    if (window.translations) {
        const he = window.translations.he; const en = window.translations.en;
        if(he){
            he.cti_source_label_prefix = he.cti_source_label_prefix || "מקור:";
            he.cti_date_label_prefix = he.cti_date_label_prefix || "תאריך:";
            he.cti_severity_label_prefix = he.cti_severity_label_prefix || "חומרה:";
        }
        if(en){
            en.cti_source_label_prefix = en.cti_source_label_prefix || "Source:";
            en.cti_date_label_prefix = en.cti_date_label_prefix || "Date:";
            en.cti_severity_label_prefix = en.cti_severity_label_prefix || "Severity:";
        }
    }
});