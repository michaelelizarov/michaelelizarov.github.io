// instructor_monitor_simulations.js
'use strict';
document.addEventListener('DOMContentLoaded', () => {
    const activeSimulationsTableBody = document.getElementById('active-simulations-table-body');
    const pastSimulationsTableBody = document.getElementById('past-simulations-table-body');
    const loadingActiveRow = document.getElementById('loading-active-simulations-row');
    const loadingPastRow = document.getElementById('loading-past-simulations-row');
    const searchActiveInput = document.getElementById('search-active-simulations');
    const filterScenarioActiveSelect = document.getElementById('filter-scenario-name');
    const filterTeamUserActiveSelect = document.getElementById('filter-team-user');
    const searchPastInput = document.getElementById('search-past-simulations');
    const filterScenarioPastSelect = document.getElementById('filter-past-scenario-name');
    const filterTeamUserPastSelect = document.getElementById('filter-past-team-user');
    const activeSimPaginationContainer = document.getElementById('active-simulations-pagination');
    const pastSimPaginationContainer = document.getElementById('past-simulations-pagination');
    let currentPageActive = 1;
    let currentPagePast = 1;
    const ITEMS_PER_PAGE = 5; // Adjust as needed
    const getLocalizedString = typeof window.getTranslatedStringGlobal === 'function' ?
        window.getTranslatedStringGlobal :
        function(key, replacements = {}, lang = 'he') { console.warn('getTranslatedStringGlobal not found for key:', key); return `[${key}]`; };
    const mockActiveSimulations = [
        { id: 'sim001', nameKey: 'sim_name_example_active_1', scenarioNameKey: 'scenario_name_ransomware_corp', teamUserNameKey: 'team_alpha_display', progress: 75, timeLeft: '30 דק\'', statusKey: 'status_running', focusLevel: 0.8 },
        { id: 'sim002', name: 'פריצת שרת ווב - צוות בטא', scenarioName: 'תרחיש פריצת שרת ווב', teamUserName: 'צוות בטא', progress: 50, timeLeft: '1 שעה 15 דק\'', statusKey: 'status_running', focusLevel: 0.5 },
        { id: 'sim003', nameKey: 'sim_name_example_active_2', scenarioNameKey: 'scenario_phishing_advanced', teamUserNameKey: 'user_dana_display', progress: 90, timeLeft: '10 דק\'', statusKey: 'status_running', focusLevel: 0.9 },
        { id: 'sim004', name: 'התמודדות DDoS - צוות גמא', scenarioName: 'תרחיש התמודדות DDoS', teamUserName: 'צוות גמא', progress: 20, timeLeft: '2 שעות', statusKey: 'status_paused', focusLevel: 0.2 },
        { id: 'sim005', name: 'חקירת דלף מידע - משתמש בודד', scenarioName: 'תרחיש חקירת דלף מידע', teamUserName: 'אבי כהן', progress: 60, timeLeft: '45 דק\'', statusKey: 'status_running', focusLevel: 0.6 },
        { id: 'sim006', name: 'אימון איום פנימי - צוות דלתא', scenarioName: 'תרחיש איום פנימי', teamUserName: 'צוות דלתא', progress: 33, timeLeft: '1 שעה 30 דק\'', statusKey: 'status_running', focusLevel: 0.3 },
    ];
    const mockPastSimulations = [
        { id: 'sim101', nameKey: 'sim_name_example_past_1', scenarioNameKey: 'scenario_web_server_compromise', teamUserNameKey: 'team_alpha_display', finalScore: 85, completionDate: '2024-05-01', statusKey: 'status_completed' },
        { id: 'sim102', name: 'תרחיש פישינג (מאי 2024)', scenarioName: 'תרחיש פישינג בסיסי', teamUserName: 'יוסי לוי', finalScore: 70, completionDate: '2024-05-03', statusKey: 'status_completed' },
        { id: 'sim103', name: 'אימון תגובה לאירוע (אפריל)', scenarioName: 'תרגול תגובה לאירוע', teamUserName: 'צוות בטא', finalScore: 0, completionDate: '2024-04-20', statusKey: 'status_stopped_by_instructor' },
        { id: 'sim104', name: 'סימולציית ענן מאובטח', scenarioName: 'תרחיש אבטחת ענן', teamUserName: 'צוות גמא', finalScore: 92, completionDate: '2024-04-10', statusKey: 'status_completed' },
        { id: 'sim105', name: 'בדיקת חדירות פנימית', scenarioName: 'תרחיש בדיקות חדירות', teamUserName: 'שירה כהן', finalScore: 0, completionDate: '2024-03-25', statusKey: 'status_error_on_sim' },
    ];
    // For populating filters - collect unique names
    const mockScenarioNames = [...new Set(mockActiveSimulations.concat(mockPastSimulations).map(s => s.scenarioNameKey ? getLocalizedString(s.scenarioNameKey) : s.scenarioName))];
    const mockTeamUserNames = [...new Set(mockActiveSimulations.concat(mockPastSimulations).map(s => s.teamUserNameKey ? getLocalizedString(s.teamUserNameKey) : s.teamUserName))];
    function createActionButtons(simulation, type) {
        const container = document.createElement('div');
        container.className = 'flex items-center justify-center space-x-1 rtl:space-x-reverse whitespace-nowrap';
        const viewDetailsButton = document.createElement('button');
        viewDetailsButton.type = 'button';
        viewDetailsButton.className = 'table-action-button';
        viewDetailsButton.title = getLocalizedString(type === 'active' ? 'view_details_tooltip' : 'view_report_tooltip');
        viewDetailsButton.innerHTML = `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>`;
        viewDetailsButton.addEventListener('click', () => {
            window.location.href = `instructor_simulation_monitor_detail.html?id=${simulation.id}`;
        });
        container.appendChild(viewDetailsButton);
        if (type === 'active') {
            const pauseButton = document.createElement('button');
            pauseButton.type = 'button';
            pauseButton.className = 'table-action-button';
            pauseButton.title = getLocalizedString('pause_sim_tooltip');
            pauseButton.innerHTML = `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`;
            pauseButton.addEventListener('click', () => {
                const simName = simulation.nameKey ? getLocalizedString(simulation.nameKey) : simulation.name;
                if (confirm(getLocalizedString('confirm_pause_simulation', {simName: simName}))) {
                    alert(getLocalizedString('alert_simulation_paused'));
                    // Add logic to update simulation status in mock data and re-render
                }
            });
            container.appendChild(pauseButton);
            const stopButton = document.createElement('button');
            stopButton.type = 'button';
            stopButton.className = 'table-action-button';
            stopButton.title = getLocalizedString('stop_sim_tooltip');
            stopButton.innerHTML = `<svg class="w-4 h-4 text-danger-color hover:text-red-700 dark:hover:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 10a.5.5 0 01.5-.5h5a.5.5 0 01.5.5v4a.5.5 0 01-.5.5h-5a.5.5 0 01-.5-.5v-4z"></path></svg>`;
            stopButton.addEventListener('click', () => {
                const simName = simulation.nameKey ? getLocalizedString(simulation.nameKey) : simulation.name;
                if (confirm(getLocalizedString('confirm_stop_simulation', {simName: simName}))) {
                     alert(getLocalizedString('alert_simulation_stopped'));
                    // Add logic to move simulation to past, update status, and re-render both tables
                }
            });
            container.appendChild(stopButton);
        } else if (type === 'past') {
            const deleteLogButton = document.createElement('button');
            deleteLogButton.type = 'button';
            deleteLogButton.className = 'table-action-button';
            deleteLogButton.title = getLocalizedString('delete_log_tooltip');
            deleteLogButton.innerHTML = `<svg class="w-4 h-4 text-danger-color hover:text-red-700 dark:hover:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>`;
            deleteLogButton.addEventListener('click', () => {
                const simName = simulation.nameKey ? getLocalizedString(simulation.nameKey) : simulation.name;
                if (confirm(getLocalizedString('confirm_delete_log', {simName: simName}))) {
                    // Remove simulation from mock data
                    const index = mockPastSimulations.findIndex(s => s.id === simulation.id);
                    if (index > -1) {
                        mockPastSimulations.splice(index, 1);
                    }
                    // Re-render the table
                    renderPastSimulationsTable();
                    alert(getLocalizedString('alert_log_deleted'));
                }
            });
            container.appendChild(deleteLogButton);
        }
        return container;
    }
    function createProgressBar(percentage) {
        const container = document.createElement('div');
        container.className = 'progress-bar-container-table w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5';
        const bar = document.createElement('div');
        bar.className = 'progress-bar-table bg-primary h-2.5 rounded-full';
        bar.style.width = `${percentage}%`;
        container.appendChild(bar);
        const wrapper = document.createElement('div');
        wrapper.className = "flex items-center gap-2";
        wrapper.appendChild(container);
        const textSpan = document.createElement('span');
        textSpan.className = "text-xs font-medium text-subtitle";
        textSpan.textContent = `${percentage}%`;
        wrapper.appendChild(textSpan);
        return wrapper;
    }
    function renderActiveSimulationsTable() {
        if (!activeSimulationsTableBody || !loadingActiveRow) return;
        activeSimulationsTableBody.innerHTML = '';
        loadingActiveRow.style.display = 'table-row';
        const searchTerm = searchActiveInput.value.toLowerCase();
        const scenarioFilter = filterScenarioActiveSelect.value;
        const teamUserFilter = filterTeamUserActiveSelect.value;
        const filteredSimulations = mockActiveSimulations.filter(sim => {
            const name = sim.nameKey ? getLocalizedString(sim.nameKey) : sim.name;
            const scenarioName = sim.scenarioNameKey ? getLocalizedString(sim.scenarioNameKey) : sim.scenarioName;
            const teamUserName = sim.teamUserNameKey ? getLocalizedString(sim.teamUserNameKey) : sim.teamUserName;
            const nameMatch = name.toLowerCase().includes(searchTerm) || scenarioName.toLowerCase().includes(searchTerm);
            const scenarioMatch = scenarioFilter === 'all' || scenarioName === scenarioFilter;
            const teamUserMatch = teamUserFilter === 'all' || teamUserName === teamUserFilter;
            return nameMatch && scenarioMatch && teamUserMatch;
        });
        const totalItems = filteredSimulations.length;
        const paginatedItems = filteredSimulations.slice((currentPageActive - 1) * ITEMS_PER_PAGE, currentPageActive * ITEMS_PER_PAGE);
        if (paginatedItems.length === 0) {
            loadingActiveRow.cells[0].textContent = getLocalizedString('no_active_simulations_found_filter');
        } else {
            loadingActiveRow.style.display = 'none';
            paginatedItems.forEach(sim => {
                const row = activeSimulationsTableBody.insertRow();
                row.insertCell().textContent = sim.nameKey ? getLocalizedString(sim.nameKey) : sim.name;
                row.insertCell().textContent = sim.scenarioNameKey ? getLocalizedString(sim.scenarioNameKey) : sim.scenarioName;
                row.insertCell().textContent = sim.teamUserNameKey ? getLocalizedString(sim.teamUserNameKey) : sim.teamUserName;
                row.insertCell().appendChild(createProgressBar(sim.progress));
                row.insertCell().textContent = sim.timeLeft;
                const statusCell = row.insertCell();
                const statusBadge = document.createElement('span');
                statusBadge.className = 'status-badge';
                statusBadge.textContent = getLocalizedString(sim.statusKey);
                if (sim.statusKey === 'status_running') statusBadge.classList.add('status-active');
                else if (sim.statusKey === 'status_paused') statusBadge.classList.add('status-paused');
                statusCell.appendChild(statusBadge);
                row.insertCell().appendChild(createActionButtons(sim, 'active'));
            });
        }
        renderPagination('active', totalItems, ITEMS_PER_PAGE, currentPageActive);
    }
    function renderPastSimulationsTable() {
        if (!pastSimulationsTableBody || !loadingPastRow) return;
        pastSimulationsTableBody.innerHTML = '';
        loadingPastRow.style.display = 'table-row';
        const searchTerm = searchPastInput.value.toLowerCase();
        const scenarioFilter = filterScenarioPastSelect.value;
        const teamUserFilter = filterTeamUserPastSelect.value;
        const filteredSimulations = mockPastSimulations.filter(sim => {
            const name = sim.nameKey ? getLocalizedString(sim.nameKey) : sim.name;
            const scenarioName = sim.scenarioNameKey ? getLocalizedString(sim.scenarioNameKey) : sim.scenarioName;
            const teamUserName = sim.teamUserNameKey ? getLocalizedString(sim.teamUserNameKey) : sim.teamUserName;
            const nameMatch = name.toLowerCase().includes(searchTerm) || scenarioName.toLowerCase().includes(searchTerm);
            const scenarioMatch = scenarioFilter === 'all' || scenarioName === scenarioFilter;
            const teamUserMatch = teamUserFilter === 'all' || teamUserName === teamUserFilter;
            return nameMatch && scenarioMatch && teamUserMatch;
        });
        const totalItems = filteredSimulations.length;
        const paginatedItems = filteredSimulations.slice((currentPagePast - 1) * ITEMS_PER_PAGE, currentPagePast * ITEMS_PER_PAGE);
        if (paginatedItems.length === 0) {
            loadingPastRow.cells[0].textContent = getLocalizedString('no_past_simulations_found_filter');
        } else {
            loadingPastRow.style.display = 'none';
            paginatedItems.forEach(sim => {
                const row = pastSimulationsTableBody.insertRow();
                row.insertCell().textContent = sim.nameKey ? getLocalizedString(sim.nameKey) : sim.name;
                row.insertCell().textContent = sim.scenarioNameKey ? getLocalizedString(sim.scenarioNameKey) : sim.scenarioName;
                row.insertCell().textContent = sim.teamUserNameKey ? getLocalizedString(sim.teamUserNameKey) : sim.teamUserName;
                row.insertCell().textContent = `${sim.finalScore}%`;
                row.insertCell().textContent = sim.completionDate;
                const statusCell = row.insertCell();
                const statusBadge = document.createElement('span');
                statusBadge.className = 'status-badge';
                statusBadge.textContent = getLocalizedString(sim.statusKey);
                     if (sim.statusKey === 'status_completed') statusBadge.classList.add('status-active');
                else if (sim.statusKey === 'status_stopped_by_instructor') statusBadge.classList.add('status-error');
                else if (sim.statusKey === 'status_error_on_sim') statusBadge.classList.add('status-error');
                statusCell.appendChild(statusBadge);
                row.insertCell().appendChild(createActionButtons(sim, 'past'));
            });
        }
         renderPagination('past', totalItems, ITEMS_PER_PAGE, currentPagePast);
    }
    function populateFilterDropdowns() {
        [filterScenarioActiveSelect, filterScenarioPastSelect].forEach(select => {
            if (!select) return;
            select.innerHTML = `<option value="all">${getLocalizedString('filter_all_scenarios')}</option>`;
            mockScenarioNames.forEach(name => {
                const option = document.createElement('option');
                option.value = name; option.textContent = name;
                select.appendChild(option);
            });
        });
        [filterTeamUserActiveSelect, filterTeamUserPastSelect].forEach(select => {
            if (!select) return;
            select.innerHTML = `<option value="all">${getLocalizedString('filter_all_teams_users')}</option>`;
            mockTeamUserNames.forEach(name => {
                const option = document.createElement('option');
                option.value = name; option.textContent = name;
                select.appendChild(option);
            });
        });
    }
    function updateKPIs() {
        const activeSimsCountEl = document.getElementById('active-simulations-count');
        const activeParticipantsEl = document.getElementById('active-participants-count');
        const avgTimeEl = document.getElementById('avg-time-in-simulation');
        const avgCompletionEl = document.getElementById('avg-completion-rate');
        if (activeSimsCountEl) activeSimsCountEl.textContent = mockActiveSimulations.length;
        if (activeParticipantsEl) activeParticipantsEl.textContent = mockActiveSimulations.reduce((sum, sim) => sum + (sim.teamUserNameKey && getLocalizedString(sim.teamUserNameKey).includes(getLocalizedString('team_alpha_display')) ? 5 : 1) , 0);
        if (avgTimeEl) avgTimeEl.innerHTML = `42 <span class="text-lg">${getLocalizedString('minutes_suffix')}</span>`; // Using global minutes_suffix
        if (avgCompletionEl) avgCompletionEl.textContent = '68%';
    }
    function renderPagination(tableType, totalItems, itemsPerPage, currentPage) {
        const paginationContainer = tableType === 'active' ? activeSimPaginationContainer : pastSimPaginationContainer;
        if (!paginationContainer) return;
        paginationContainer.innerHTML = '';
        const totalPages = Math.ceil(totalItems / itemsPerPage);
        if (totalPages <= 1) return;
        const createPageButton = (pageNumber, isCurrent = false, isDisabled = false, textOverride = null) => {
            const button = document.createElement('button');
            button.type = 'button';
            button.textContent = textOverride || pageNumber;
            button.className = `btn btn-sm ${isCurrent ? 'btn-primary' : 'btn-neutral'}`;
            if (isDisabled) button.disabled = true;
            if (!textOverride) {
                 button.setAttribute('aria-label', getLocalizedString('pagination_page_num', {num: pageNumber}));
            }
            if(isCurrent && !textOverride) button.setAttribute('aria-current', 'page');
            button.addEventListener('click', () => {
                if (textOverride === getLocalizedString('pagination_previous')) {
                    if (tableType === 'active') currentPageActive--; else currentPagePast--;
                } else if (textOverride === getLocalizedString('pagination_next')) {
                    if (tableType === 'active') currentPageActive++; else currentPagePast++;
                } else {
                    if (tableType === 'active') currentPageActive = pageNumber; else currentPagePast = pageNumber;
                }
                if (tableType === 'active') renderActiveSimulationsTable(); else renderPastSimulationsTable();
            });
            return button;
        };
        paginationContainer.appendChild(createPageButton(currentPage - 1, false, currentPage === 1, getLocalizedString('pagination_previous')));
        for (let i = 1; i <= totalPages; i++) {
             if (totalPages <= 7 || (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1))) {
                 paginationContainer.appendChild(createPageButton(i, i === currentPage));
            } else if (totalPages > 7 && (i === currentPage - 2 || i === currentPage + 2) ) {
                 const ellipsis = document.createElement('span');
                 ellipsis.textContent = '...';
                 ellipsis.className = 'px-2 py-1 text-sm text-subtitle';
                 paginationContainer.appendChild(ellipsis);
            }
        }
        paginationContainer.appendChild(createPageButton(currentPage + 1, false, currentPage === totalPages, getLocalizedString('pagination_next')));
    }
    function initializePageWithTranslations() {
         if (typeof getLocalizedString === 'function' && window.translations &&
            Object.keys(window.translations[window.currentLang || 'he'] || {}).length > 10) {
            updateKPIs();
            populateFilterDropdowns();
            currentPageActive = 1;
            currentPagePast = 1;
            renderActiveSimulationsTable();
            renderPastSimulationsTable();
        } else {
            setTimeout(initializePageWithTranslations, 100);
        }
    }
    setTimeout(initializePageWithTranslations, 50);
    [searchActiveInput, filterScenarioActiveSelect, filterTeamUserActiveSelect].forEach(el => {
        if(el) el.addEventListener(el.tagName === 'INPUT' ? 'input' : 'change', () => { currentPageActive = 1; renderActiveSimulationsTable(); });
    });
    [searchPastInput, filterScenarioPastSelect, filterTeamUserPastSelect].forEach(el => {
         if(el) el.addEventListener(el.tagName === 'INPUT' ? 'input' : 'change', () => { currentPagePast = 1; renderPastSimulationsTable(); });
    });
    window.updatePageSpecificTranslations = function(langPack, lang) {
        // Re-populate filters as their text content comes from translation keys
        populateFilterDropdowns();
        // Re-render tables which depend on translated scenario/team/user names from mock data for filtering and display
        renderActiveSimulationsTable();
        renderPastSimulationsTable();
        // KPIs might also need re-rendering if they use localized strings directly (e.g. suffixes)
        updateKPIs();
    };
});