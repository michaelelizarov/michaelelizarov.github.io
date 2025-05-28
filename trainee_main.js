// trainee_main.js
'use strict';
document.addEventListener('DOMContentLoaded', () => {
    const scenarioCardsContainer = document.getElementById('scenario-cards-container');
    const noScenariosMessage = document.getElementById('no-scenarios-found');
    const searchInput = document.getElementById('search-scenarios');
    const difficultyFilterSelect = document.getElementById('filter-difficulty-scenarios');
    const categoryFilterSelect = document.getElementById('filter-category-scenarios');
    const getLocalizedString = typeof window.getTranslatedStringGlobal === 'function' ?
        window.getTranslatedStringGlobal :
        function(key, replacements = {}) { console.warn('getTranslatedStringGlobal not found for key:', key); return `[${key}]`; };
    const mockScenarios = [
        {
            id: 'sim001', titleKey: 'scenario1_title', descriptionKey: 'scenario1_desc',
            difficulty: 'easy', tagsKey: 'scenario1_tags', durationKey: 'scenario1_duration',
            imageUrl: 'scenario_phishing.webp', category: 'phishing'
        },
        {
            id: 'sim002', titleKey: 'scenario2_title', descriptionKey: 'scenario2_desc',
            difficulty: 'medium', tagsKey: 'scenario2_tags', durationKey: 'scenario2_duration',
            imageUrl: 'scenario_ransomware.webp', category: 'ransomware'
        },
        {
            id: 'sim003', titleKey: 'scenario3_title', descriptionKey: 'scenario3_desc',
            difficulty: 'hard', tagsKey: 'scenario3_tags', durationKey: 'scenario3_duration',
            imageUrl: 'scenario_web_breach.webp', category: 'web_security'
        },
        {
            id: 'sim004', titleKey: 'scenario4_title', descriptionKey: 'scenario4_desc',
            difficulty: 'medium', tagsKey: 'scenario4_tags', durationKey: 'scenario4_duration',
            imageUrl: 'scenario_cloud_security.webp', category: 'cloud_security'
        },
        {
            id: 'sim005', titleKey: 'scenario5_title', descriptionKey: 'scenario5_desc',
            difficulty: 'hard', tagsKey: 'scenario5_tags', durationKey: 'scenario5_duration',
            imageUrl: 'scenario_insider_threat.webp', category: 'insider_threat'
        },
        {
            id: 'sim006', titleKey: 'scenario6_title', descriptionKey: 'scenario6_desc',
            difficulty: 'easy', tagsKey: 'scenario6_tags', durationKey: 'scenario6_duration',
            imageUrl: 'scenario_ddos.webp', category: 'network_attack'
        }
    ];
    function createScenarioCard(scenario, isMystery = false) {
        const card = document.createElement('div');
        card.className = 'scenario-card card p-0 rounded-xl shadow-lg overflow-hidden flex flex-col hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105';
        const difficultyText = getLocalizedString(`difficulty_${scenario.difficulty}_badge`);
        const titleText = isMystery ? getLocalizedString('mystery_scenario_title') : getLocalizedString(scenario.titleKey);
        let descriptionText = isMystery ? getLocalizedString(`mystery_scenario_desc_${scenario.difficulty}`) : getLocalizedString(scenario.descriptionKey);
        const difficultyColorClass =
            scenario.difficulty === 'easy' ? 'difficulty-easy' :
            scenario.difficulty === 'medium' ? 'difficulty-medium' :
            scenario.difficulty === 'hard' ? 'difficulty-hard' :
            scenario.difficulty === 'expert' ? 'difficulty-expert' :
            'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200'; // Fallback class
        card.innerHTML = `
            <div class="relative">
                <img src="${isMystery ? 'scenario_mystery.webp' : scenario.imageUrl}" alt="${titleText}" class="w-full h-48 object-cover">
                <span class="absolute top-3 left-3 text-xs font-semibold px-2 py-1 rounded-full difficulty-badge ${difficultyColorClass}">${difficultyText}</span>
            </div>
            <div class="p-5 flex-grow flex flex-col">
                <h3 class="text-xl font-semibold text-header mb-2">${titleText}</h3>
                <p class="text-sm text-subtitle flex-grow mb-3 line-clamp-3">${descriptionText}</p>
                ${!isMystery && scenario.tagsKey ? `<p class="text-xs text-subtitle mb-1"><strong data-lang-key="tags_label_prefix">${getLocalizedString('tags_label_prefix')}</strong> ${getLocalizedString(scenario.tagsKey)}</p>` : ''}
                ${!isMystery && scenario.durationKey ? `<p class="text-xs text-subtitle"><strong data-lang-key="duration_label_prefix">${getLocalizedString('duration_label_prefix')}</strong> ${getLocalizedString(scenario.durationKey)}</p>` : ''}
            </div>
            <div class="p-4 border-t border-[var(--card-border-color)] mt-auto">
                <a href="trainee_start_simulation.html?scenarioId=${scenario.id}${isMystery ? `&mystery=true&difficulty=${scenario.difficulty}` : ''}" class="btn btn-primary w-full hover:no-underline">
                    <span data-lang-key="trainee_start_simulation_button" class="pointer-events-none">${getLocalizedString('trainee_start_simulation_button')}</span>
                </a>
            </div>
        `;
        return card;
    }
    function renderScenarios() {
        if (!scenarioCardsContainer || !noScenariosMessage) return;
        scenarioCardsContainer.innerHTML = '';
        const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
        const difficultyFilter = difficultyFilterSelect ? difficultyFilterSelect.value : 'all';
        const categoryFilter = categoryFilterSelect ? categoryFilterSelect.value : 'all';
        let itemsToRender = mockScenarios.filter(scenario => {
            const title = getLocalizedString(scenario.titleKey).toLowerCase();
            const description = getLocalizedString(scenario.descriptionKey).toLowerCase();
            const tags = scenario.tagsKey ? getLocalizedString(scenario.tagsKey).toLowerCase() : '';
            const matchesSearch = title.includes(searchTerm) || description.includes(searchTerm) || tags.includes(searchTerm);
            const matchesDifficulty = difficultyFilter === 'all' || scenario.difficulty === difficultyFilter;
            const matchesCategory = categoryFilter === 'all' || scenario.category === categoryFilter;
            return matchesSearch && matchesDifficulty && matchesCategory;
        });
        
        // Always add 2 mystery scenarios at the end if no search term and no specific category
        if (searchTerm === '' && categoryFilter === 'all') {
            const mysteryScenarios = [
                { id: 'mystery_hard_1', difficulty: 'hard', titleKey:'', descriptionKey:'', imageUrl: ''},
                { id: 'mystery_expert_1', difficulty: 'expert', titleKey:'', descriptionKey:'', imageUrl: ''}
            ];
            
            mysteryScenarios.forEach(mysteryScenario => {
                if (difficultyFilter === 'all' || mysteryScenario.difficulty === difficultyFilter) {
                    itemsToRender.push(createScenarioCard(mysteryScenario, true));
                }
            });
        }
        
        if (itemsToRender.length === 0) {
            noScenariosMessage.classList.remove('hidden');
        } else {
            noScenariosMessage.classList.add('hidden');
            itemsToRender.forEach(itemOrCard => {
                if (itemOrCard instanceof HTMLElement) {
                    scenarioCardsContainer.appendChild(itemOrCard);
                } else {
                    const card = createScenarioCard(itemOrCard);
                    scenarioCardsContainer.appendChild(card);
                }
            });
        }
    }
    function initializePage() {
        if (typeof getLocalizedString === 'function' && window.translations) {
            renderScenarios();
            if (searchInput) searchInput.addEventListener('input', renderScenarios);
            if (difficultyFilterSelect) difficultyFilterSelect.addEventListener('change', renderScenarios);
            if (categoryFilterSelect) categoryFilterSelect.addEventListener('change', renderScenarios);
        } else {
            setTimeout(initializePage, 100);
        }
    }
    setTimeout(initializePage, 50);
    window.updatePageSpecificTranslations = function(langPack, lang) {
        renderScenarios();
    };
});