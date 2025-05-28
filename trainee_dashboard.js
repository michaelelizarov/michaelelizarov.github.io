// trainee_dashboard.js
'use strict';
document.addEventListener('DOMContentLoaded', () => {
    const userNamePlaceholder = document.querySelector('[data-lang-key="trainee_dashboard_welcome"]');
    const recentScenariosList = document.getElementById('recent-scenarios-list');
    const noRecentScenariosMsg = document.getElementById('no-recent-scenarios-msg');
    const myBadgesContainer = document.getElementById('my-badges-container');
    const noBadgesMsg = document.getElementById('no-badges-msg');
    const courseProgressList = document.getElementById('course-progress-list');
    const noCourseProgressMsg = document.getElementById('no-course-progress-msg');
    const glossaryTermsList = document.getElementById('glossary-terms-list');
    const noGlossaryTermsMsg = document.getElementById('no-glossary-terms-msg');
    const recentAchievementsList = document.getElementById('recent-achievements-list');
    const noRecentAchievementsMsg = document.getElementById('no-recent-achievements-msg');
    const ctiFeedContainer = document.getElementById('cti-feed-snippet-container');
    const noCtiUpdatesMsg = document.getElementById('no-cti-updates-msg');
    const getLocalizedString = typeof window.getTranslatedStringGlobal === 'function' ?
        window.getTranslatedStringGlobal :
        function(key, replacements = {}) { console.warn('getTranslatedStringGlobal not found for key:', key); return `[${key}]`; };
    // Mock data
    const mockUserName = "אלכס";
    const mockRecentScenarios = [
        { 
            titleKey: 'scenario_data_leakage', 
            progress: 60, 
            scenarioId: 'sim003', 
            typeKey: 'category_data_breach',
            imageUrl: 'scenario_web_breach.webp'
        },
        { 
            titleKey: 'scenario_web_server_compromise', 
            progress: 100, 
            scenarioId: 'sim002', 
            typeKey: 'category_web_security',
            imageUrl: 'scenario_ransomware.webp'
        },
        { 
            titleKey: 'scenario_phishing_advanced', 
            progress: 25, 
            scenarioId: 'sim001', 
            typeKey: 'category_phishing',
            imageUrl: 'scenario_phishing.webp'
        },
        { 
            titleKey: 'scenario_insider_threat', 
            progress: 80, 
            scenarioId: 'sim005', 
            typeKey: 'category_insider_threat',
            imageUrl: 'scenario_insider_threat.webp'
        },
        { 
            titleKey: 'scenario_ransomware', 
            progress: 10, 
            scenarioId: 'sim006', 
            typeKey: 'category_ransomware',
            imageUrl: 'scenario_ddos.webp'
        },
    ];
    const mockBadges = [
        { titleKey: 'badge_first_scenario_title', descriptionKey: 'badge_first_scenario_desc', icon: '🌟', earned: true },
        { titleKey: 'badge_phishing_expert_title', descriptionKey: 'badge_phishing_expert_desc', icon: '🎣', earned: true },
        { titleKey: 'badge_perfect_score_title', descriptionKey: 'badge_perfect_score_desc', icon: '🎯', earned: false },
        { titleKey: 'badge_team_player_title', descriptionKey: 'badge_team_player_desc', icon: '🤝', earned: true },
        { titleKey: 'badge_incident_handler_title', descriptionKey: 'badge_incident_handler_desc', icon: '🛡️', earned: true },
        { titleKey: 'badge_quick_thinker_title', descriptionKey: 'badge_quick_thinker_desc', icon: '💡', earned: false },
    ];
    const mockCourseProgress = [
        { titleKey: 'course1_title', progressTextKey: 'course1_progress_text', percentage: 60 },
        { titleKey: 'course2_title', progressTextKey: 'course2_progress_text', percentage: 25 },
        { titleKey: 'course3_title', progressTextKey: 'course3_progress_text', percentage: 100 },
        { titleKey: 'course4_title', progressTextKey: 'course4_progress_text', percentage: 66 },
        { titleKey: 'course5_title', progressTextKey: 'course5_progress_text', percentage: 20 },
    ];
    const mockGlossaryTerms = [
        { termKey: 'glossary_term1_term', definitionKey: 'glossary_term1_def' },
        { termKey: 'glossary_term2_term', definitionKey: 'glossary_term2_def' },
        { termKey: 'glossary_term3_term', definitionKey: 'glossary_term3_def' },
        { termKey: 'glossary_term4_term', definitionKey: 'glossary_term4_def' },
        { termKey: 'glossary_term5_term', definitionKey: 'glossary_term5_def' },
    ];
    const mockRecentAchievements = [
        { textKey: 'achievement1_text', timeKey: 'achievement1_time', icon: '🏆' },
        { textKey: 'achievement2_text', timeKey: 'achievement2_time', icon: '🌟' },
        { textKey: 'achievement3_text', timeKey: 'achievement3_time', icon: '📈' },
        { textKey: 'achievement4_text', timeKey: 'achievement4_time', icon: '🎯' },
        { textKey: 'achievement5_text', timeKey: 'achievement5_time', icon: '✅' },
    ];
    const mockCtiFeed = [
        { titleKey: "cti_entry1_title", sourceKey: "cti_entry1_source", age: "לפני 3 שעות"},
        { titleKey: "cti_entry2_title", sourceKey: "cti_entry2_source", age: "לפני 18 שעות"},
        { titleKey: "cti_entry3_title", sourceKey: "cti_entry3_source", age: "אתמול"},
    ];
    function renderWelcomeMessage() {
        if (userNamePlaceholder) {
            userNamePlaceholder.textContent = getLocalizedString('trainee_dashboard_welcome', { userName: mockUserName });
        }
    }
    function renderRecentScenarios() {
        if (!recentScenariosList) return;
        recentScenariosList.innerHTML = '';
        if (mockRecentScenarios.length === 0) {
            if (noRecentScenariosMsg) noRecentScenariosMsg.classList.remove('hidden');
            return;
        }
        if (noRecentScenariosMsg) noRecentScenariosMsg.classList.add('hidden');
        mockRecentScenarios.forEach(scenario => {
            const li = document.createElement('li');
            li.className = 'dashboard-list-item mb-4';
            
            // Get status color and text
            const statusClass = scenario.progress === 100 ? 'text-green-500 dark:text-green-400' : 
                                (scenario.progress === 0 ? 'text-gray-500 dark:text-gray-400' : 'text-primary');
            
            // Get progress bar color based on percentage
            const progressBarColor = scenario.progress === 100 ? 'bg-green-500' :
                                    scenario.progress >= 75 ? 'bg-emerald-500' :
                                    scenario.progress >= 50 ? 'bg-blue-500' :
                                    scenario.progress >= 25 ? 'bg-yellow-500' :
                                    'bg-red-500';
            
            // Use raw text for progress status (not translated)
            const progressStatus = scenario.progress === 100 ? 'הושלם' :
                                  scenario.progress === 0 ? 'טרם התחיל' :
                                  `${scenario.progress}%`;
            
            const scenarioTypeColorClass = scenario.typeKey ? `border-${getCategoryColor(scenario.typeKey)}` : 'border-gray-300 dark:border-gray-600';
            
            li.innerHTML = `
                <a href="trainee_start_simulation.html?scenarioId=${scenario.scenarioId}" class="block hover:bg-[var(--card-hover-bg)] rounded-md transition-colors border-s-4 ${scenarioTypeColorClass} dark:hover:bg-slate-700/50 flex overflow-hidden shadow-sm hover:shadow-md">
                    <div class="scenario-image-container w-24 h-24 flex-shrink-0">
                        <img src="${scenario.imageUrl}" alt="" class="w-full h-full object-cover">
                    </div>
                    <div class="p-3 flex-grow">
                        <div class="flex justify-between items-center">
                            <span class="font-medium text-text-color">${getLocalizedString(scenario.titleKey)}</span>
                            <span class="text-xs ${statusClass}">${progressStatus}</span>
                        </div>
                        <div class="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-2.5 mt-2">
                            <div class="${progressBarColor} h-full rounded-full transition-all duration-300" style="width: ${scenario.progress}%"></div>
                        </div>
                        <div class="flex justify-between items-center mt-2">
                            <span class="text-xs text-subtitle">${getLocalizedString(scenario.typeKey)}</span>
                            <span class="text-xs text-subtitle">${scenario.progress}% ${scenario.progress === 100 ? 'הושלם' : 'מושלם'}</span>
                        </div>
                    </div>
                </a>
            `;
            recentScenariosList.appendChild(li);
        });
    }
    function getCategoryColor(typeKey) {
        const colorMapping = {
            'category_phishing': 'blue-500',
            'category_ransomware': 'red-500',
            'category_web_security': 'purple-500',
            'category_data_breach': 'yellow-500',
            'category_insider_threat': 'orange-500',
            'category_network_attack': 'teal-500',
            'category_cloud_security': 'indigo-500',
        };
        return colorMapping[typeKey] || 'gray-400';
    }
    function renderMyBadges() {
        if (!myBadgesContainer) return;
        myBadgesContainer.innerHTML = '';
        const earnedBadges = mockBadges.filter(b => b.earned);
        if (earnedBadges.length === 0) {
             if (noBadgesMsg) noBadgesMsg.classList.remove('hidden');
            return;
        }
        if (noBadgesMsg) noBadgesMsg.classList.add('hidden');
        earnedBadges.forEach(badge => {
            const div = document.createElement('div');
            div.className = 'badge-item card p-3 sm:p-4 rounded-lg text-center flex flex-col items-center justify-center hover:shadow-md transition-shadow';
            div.innerHTML = `
                <span class="text-3xl sm:text-4xl mb-2">${badge.icon}</span>
                <h4 class="text-sm sm:text-md font-semibold text-header">${getLocalizedString(badge.titleKey)}</h4>
                <p class="text-xs text-subtitle mt-0.5 sm:mt-1">${getLocalizedString(badge.descriptionKey)}</p>
            `;
            myBadgesContainer.appendChild(div);
        });
    }
    function renderCourseProgress() {
        if (!courseProgressList) return;
        courseProgressList.innerHTML = '';
        if (mockCourseProgress.length === 0) {
            if (noCourseProgressMsg) noCourseProgressMsg.classList.remove('hidden');
            return;
        }
        if (noCourseProgressMsg) noCourseProgressMsg.classList.add('hidden');
        mockCourseProgress.forEach(course => {
            const li = document.createElement('li');
            li.className = 'dashboard-list-item p-3 rounded-md hover:bg-[var(--card-hover-bg)] transition-colors dark:hover:bg-slate-700/50';
            
            // Determine progress status text and color
            const statusClass = course.percentage === 100 ? 'text-green-500 dark:text-green-400' : 
                                (course.percentage < 25 ? 'text-orange-500 dark:text-orange-400' : 'text-primary');
            
            // Get progress bar color based on percentage
            const progressBarColor = course.percentage === 100 ? 'bg-green-500' :
                                    course.percentage >= 75 ? 'bg-emerald-500' :
                                    course.percentage >= 50 ? 'bg-blue-500' :
                                    course.percentage >= 25 ? 'bg-yellow-500' :
                                    'bg-red-500';
            
            // Use raw text for progress (not translated)
            const progressStatus = course.percentage === 100 ? 'הושלם' : `${course.percentage}%`;
            
            li.innerHTML = `
                <div class="flex justify-between items-center">
                    <h4 class="font-medium text-text-color">${getLocalizedString(course.titleKey)}</h4>
                    <span class="text-xs font-medium ${statusClass}">${progressStatus}</span>
                </div>
                <p class="text-xs text-subtitle mb-2">${getLocalizedString(course.progressTextKey)}</p>
                <div class="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-3 overflow-hidden">
                    <div class="${progressBarColor} h-full rounded-full flex items-center justify-center text-[10px] text-white font-medium transition-all duration-300" style="width: ${course.percentage}%">
                        ${course.percentage > 15 ? `${course.percentage}%` : ''}
                    </div>
                </div>
            `;
            courseProgressList.appendChild(li);
        });
    }
    function renderGlossaryTerms() {
        if (!glossaryTermsList) return;
        glossaryTermsList.innerHTML = '';
        if (mockGlossaryTerms.length === 0) {
            if (noGlossaryTermsMsg) noGlossaryTermsMsg.classList.remove('hidden');
            return;
        }
        if (noGlossaryTermsMsg) noGlossaryTermsMsg.classList.add('hidden');
        mockGlossaryTerms.forEach(item => {
            const li = document.createElement('li');
            li.className = 'dashboard-list-item p-3 rounded-md hover:bg-[var(--card-hover-bg)] transition-colors dark:hover:bg-slate-700/50';
            li.innerHTML = `
                <strong class="text-text-color block text-sm">${getLocalizedString(item.termKey)}:</strong>
                <p class="text-xs text-subtitle">${getLocalizedString(item.definitionKey)}</p>
            `;
            glossaryTermsList.appendChild(li);
        });
    }
    function renderRecentAchievements() {
        if (!recentAchievementsList) return;
        recentAchievementsList.innerHTML = '';
        if (mockRecentAchievements.length === 0) {
             if (noRecentAchievementsMsg) noRecentAchievementsMsg.classList.remove('hidden');
            return;
        }
        if (noRecentAchievementsMsg) noRecentAchievementsMsg.classList.add('hidden');
        mockRecentAchievements.forEach(ach => {
            const li = document.createElement('li');
            li.className = 'dashboard-list-item p-3 rounded-md hover:bg-[var(--card-hover-bg)] transition-colors dark:hover:bg-slate-700/50 flex items-start gap-2';
            li.innerHTML = `
                <span class="text-lg text-primary mt-0.5">${ach.icon || '🏅'}</span>
                <div>
                    <p class="text-sm text-text-color">${getLocalizedString(ach.textKey)}</p>
                    <p class="text-xs text-gray-400 dark:text-gray-500 mt-0.5">${getLocalizedString(ach.timeKey)}</p>
                </div>
            `;
            recentAchievementsList.appendChild(li);
        });
    }
    function renderCtiFeedSnippet() {
        if (!ctiFeedContainer) return;
        ctiFeedContainer.innerHTML = '';
        if (mockCtiFeed.length === 0) {
            if (noCtiUpdatesMsg) noCtiUpdatesMsg.classList.remove('hidden');
            return;
        }
        if (noCtiUpdatesMsg) noCtiUpdatesMsg.classList.add('hidden');
        mockCtiFeed.slice(0, 3).forEach(entry => { // Show only top 3 for snippet
            const div = document.createElement('div');
            div.className = 'cti-snippet-item p-3 border-b border-[var(--card-border-color)] last:border-b-0 hover:bg-[var(--card-hover-bg)] transition-colors cursor-pointer rounded-md dark:hover:bg-slate-700/50';
            div.innerHTML = `
                <h5 class="text-sm font-medium text-text-color mb-0.5">${getLocalizedString(entry.titleKey)}</h5>
                <p class="text-xs text-gray-500 dark:text-gray-400">${getLocalizedString(entry.sourceKey)} - <span class="text-gray-400">${entry.age}</span></p>
            `;
            div.addEventListener('click', () => {
                window.location.href = 'trainee_cti.html';
            });
            ctiFeedContainer.appendChild(div);
        });
    }
    function initializePage() {
        if (typeof getLocalizedString === 'function' && window.translations &&
            Object.keys(window.translations[window.currentLang || 'he'] || {}).length > 10) {
            renderWelcomeMessage();
            renderRecentScenarios();
            renderMyBadges();
            renderCourseProgress();
            renderGlossaryTerms();
            renderRecentAchievements();
            renderCtiFeedSnippet();
        } else {
            setTimeout(initializePage, 150);
        }
    }
    setTimeout(initializePage, 100);
    window.updatePageSpecificTranslations = function(langPack, lang) {
        initializePage();
    };
});