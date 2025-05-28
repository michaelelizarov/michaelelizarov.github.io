// instructor_manage_scenarios.js
'use strict';
document.addEventListener('DOMContentLoaded', () => {
    const assignScenarioModal = document.getElementById('assignScenarioModal');
    const modalCloseButtons = assignScenarioModal ? assignScenarioModal.querySelectorAll('.modal-close-button') : []; // Query within the specific modal
    const assignToTypeSelect = document.getElementById('assignToType');
    const userSelectContainer = document.getElementById('assignUserSelectContainer');
    const teamSelectContainer = document.getElementById('assignTeamSelectContainer');
    const assignScenarioNameDisplay = document.getElementById('assignScenarioNameDisplay');
    const scenariosTableBody = document.getElementById('scenarios-table-body');
    const loadingScenariosRow = document.getElementById('loading-scenarios-row');
    const searchInput = document.getElementById('search-scenario');
    const difficultyFilterSelect = document.getElementById('filter-difficulty');
    const statusFilterSelect = document.getElementById('filter-status');
    const assignScenarioForm = document.getElementById('assignScenarioForm');
    const scenariosPagination = document.getElementById('scenarios-pagination');
    let currentScenarioToAssign = null;
    let currentPage = 1;
    const ITEMS_PER_PAGE = 5; // Adjust as needed
    const getLocalizedString = typeof window.getTranslatedStringGlobal === 'function' ?
        window.getTranslatedStringGlobal :
        function(key, replacements = {}, lang = 'he') { console.warn('getTranslatedStringGlobal not found for key:', key); return `[${key}]`; };
    const mockScenarios = [
        { id: 1, nameKey: "scenario_critical_infra_breach", descriptionKey: "desc_critical_infra", difficulty: "high", creationDate: "2024-03-10", lastModified: "2024-05-15", statusKey: "status_published", participants: "5/10", type: "team", createdByKey: "instructor_lead" },
        { id: 2, nameKey: "scenario_phishing_advanced", descriptionKey: "desc_phishing_advanced", difficulty: "medium", creationDate: "2024-02-20", lastModified: "2024-05-10", statusKey: "status_published", participants: "8/8", type: "individual", createdByKey: "instructor_guest" },
        { id: 3, nameKey: "scenario_data_leakage", descriptionKey: "desc_data_leakage", difficulty: "medium", creationDate: "2024-04-01", lastModified: "2024-04-20", statusKey: "status_draft", participants: "0/5", type: "team", createdByKey: "instructor_dev_team" },
        { id: 4, nameKey: "scenario_insider_threat", descriptionKey: "desc_insider_threat", difficulty: "high", creationDate: "2023-12-05", lastModified: "2024-01-10", statusKey: "status_archived", participants: "N/A", type: "individual", createdByKey: "instructor_lead" },
        { id: 5, nameKey: "scenario_web_server_compromise", descriptionKey: "desc_web_server_compromise", difficulty: "low", creationDate: "2024-05-01", lastModified: "2024-05-05", statusKey: "status_published", participants: "3/5", type: "team", createdByKey: "instructor_dev_team" },
        { id: 6, nameKey: "scenario_supply_chain_attack", descriptionKey: "desc_supply_chain_attack", difficulty: "high", creationDate: "2024-05-18", lastModified: "2024-05-19", statusKey: "status_draft", participants: "0/10", type: "team", createdByKey: "instructor_guest" },
        { id: 7, nameKey: "scenario_apt_simulation", descriptionKey: "desc_apt_simulation", difficulty: "expert", creationDate: "2024-05-20", lastModified: "2024-05-21", statusKey: "status_pending_review", participants: "0/15", type: "team", createdByKey: "instructor_lead" },
        { id: 8, nameKey: "scenario_iot_botnet_disruption", descriptionKey: "desc_iot_botnet_disruption", difficulty: "medium", creationDate: "2024-06-01", lastModified: "2024-06-02", statusKey: "status_published", participants: "2/5", type: "team", createdByKey: "instructor_dev_team" },
        { id: 9, nameKey: "scenario_cloud_misconfiguration_exploit", descriptionKey: "desc_cloud_misconfiguration_exploit", difficulty: "high", creationDate: "2024-06-05", lastModified: "2024-06-06", statusKey: "status_draft", participants: "0/8", type: "individual", createdByKey: "instructor_lead" },
        { id: 10, nameKey: "scenario_ot_network_attack", descriptionKey: "desc_ot_network_attack", difficulty: "expert", creationDate: "2024-06-10", lastModified: "2024-06-11", statusKey: "status_pending_review", participants: "0/12", type: "team", createdByKey: "instructor_guest" }
    ];
    const mockUsersForAssign = [
        { id: 'user1', nameKey: 'user_example_1_name' },
        { id: 'user2', nameKey: 'user_example_2_name' },
        { id: 'user3', name: 'אבי מזרחי' }
    ];
    const mockTeamsForAssign = [
        { id: 'team_alpha', nameKey: 'team_alpha' },
        { id: 'team_beta', nameKey: 'team_beta' },
        { id: 'team_gamma', nameKey: 'team_gamma' }
    ];
    function openModal(modalElement) {
        if (modalElement) {
            modalElement.classList.remove('hidden');
            setTimeout(() => modalElement.classList.add('opacity-100'), 10);
            setTimeout(() => modalElement.querySelector('.modal-content').classList.add('scale-100'), 10);
        }
    }
    function closeModal(modalElement) {
        if (modalElement) {
            modalElement.querySelector('.modal-content').classList.remove('scale-100');
            modalElement.classList.remove('opacity-100');
            setTimeout(() => modalElement.classList.add('hidden'), 300);
        }
    }
    modalCloseButtons.forEach(button => {
        const modal = button.closest('.modal-overlay') || document.getElementById(button.dataset.modalId);
        if (modal) {
            button.addEventListener('click', () => closeModal(modal));
        }
    });
    if (assignScenarioModal) {
        assignScenarioModal.addEventListener('click', (event) => {
            if (event.target === assignScenarioModal) {
                closeModal(assignScenarioModal);
            }
        });
    }
    if (assignToTypeSelect && userSelectContainer && teamSelectContainer) {
        assignToTypeSelect.addEventListener('change', (event) => {
            userSelectContainer.classList.toggle('hidden', event.target.value !== 'user');
            teamSelectContainer.classList.toggle('hidden', event.target.value !== 'team');
        });
    }
    function createActionButtons(scenario) {
        const container = document.createElement('div');
        container.className = 'flex justify-center gap-2 space-x-2 rtl:space-x-reverse';
        const editTooltip = getLocalizedString('edit_tooltip');
        const assignTooltip = getLocalizedString('assign_tooltip');
        const deleteTooltip = getLocalizedString('delete_tooltip');
        
        const editButton = document.createElement('button');
        editButton.type = 'button';
        editButton.className = 'table-action-button';
        editButton.title = editTooltip;
        editButton.innerHTML = `<svg class="w-4 h-4 text-primary hover:text-primary-hover" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>`;
        editButton.addEventListener('click', () => {
            console.log(`Edit scenario ID: ${scenario.id}`);
            window.location.href = `instructor_create_scenario.html?id=${scenario.id}`; // Link to edit page
        });
        
        const assignButton = document.createElement('button');
        assignButton.type = 'button';
        assignButton.className = 'table-action-button';
        assignButton.title = assignTooltip;
        assignButton.innerHTML = `<svg class="w-4 h-4 text-primary hover:text-primary-hover" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>`;
        assignButton.addEventListener('click', () => {
            currentScenarioToAssign = scenario;
            const scenarioNameDisplay = document.getElementById('assignScenarioNameDisplay');
            if (scenarioNameDisplay) scenarioNameDisplay.textContent = getLocalizedString(scenario.nameKey);
            openModal(assignScenarioModal);
        });

        const deleteButton = document.createElement('button');
        deleteButton.type = 'button';
        deleteButton.className = 'table-action-button';
        deleteButton.title = deleteTooltip;
        deleteButton.innerHTML = `<svg class="w-4 h-4 text-danger-color hover:text-danger-hover-color" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>`;
        deleteButton.addEventListener('click', () => {
            const scenarioName = getLocalizedString(scenario.nameKey) || scenario.nameKey;
            if (confirm(getLocalizedString('confirm_delete_scenario_prefix', {scenarioName: scenarioName}))) {
                console.log(`Delete scenario ID: ${scenario.id}`);
                mockScenarios = mockScenarios.filter(s => s.id !== scenario.id);
                renderScenariosTable();
                alert(getLocalizedString('alert_item_deleted_successfully'));
            }
        });
        
        container.appendChild(editButton);
        container.appendChild(assignButton);
        container.appendChild(deleteButton);
        
        return container;
    }
    function renderScenariosTable() {
        if (!scenariosTableBody) {
            console.warn("Scenarios table body not found.");
            return;
        }
        if (loadingScenariosRow) loadingScenariosRow.style.display = 'none'; // Hide loading row once we process
        scenariosTableBody.innerHTML = ''; // Clear existing rows, except if keeping loading row managed differently
        const searchTerm = searchInput.value.toLowerCase();
        const difficultyFilter = difficultyFilterSelect.value; // e.g., "easy", "medium", "all"
        const statusFilter = statusFilterSelect.value; // e.g., "published", "draft", "all"
        const filteredScenarios = mockScenarios.filter(scenario => {
            const nameMatch = getLocalizedString(scenario.nameKey).toLowerCase().includes(searchTerm);
            // Difficulty match: 'all' or direct match with scenario.difficulty (which is "easy", "medium", etc.)
            const difficultyMatch = difficultyFilter === 'all' || scenario.difficulty === difficultyFilter;
            // Status match: 'all' or direct match with scenario.statusKey (which is "status_published", "status_draft", etc.)
            const statusMatch = statusFilter === 'all' || scenario.statusKey === statusFilter;
            return nameMatch && difficultyMatch && statusMatch;
        });
        const totalItems = filteredScenarios.length;
        const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;
        const paginatedItems = filteredScenarios.slice(startIndex, endIndex);
        if (paginatedItems.length === 0) {
            const row = scenariosTableBody.insertRow();
            const cell = row.insertCell();
            cell.colSpan = 7; // Number of columns in your table
            cell.textContent = getLocalizedString('no_scenarios_found_filter');
            cell.className = 'text-center p-4 text-subtitle';
        } else {
            paginatedItems.forEach(scenario => {
                const row = scenariosTableBody.insertRow();
                row.insertCell().textContent = getLocalizedString(scenario.nameKey);
                const difficultyCell = row.insertCell();
                const difficultyBadge = document.createElement('span');
                difficultyBadge.className = 'difficulty-badge';
                
                // Fix for medium difficulty - ensure correct translation key is used
                let difficultyKey;
                if (scenario.difficultyKey) {
                    difficultyKey = scenario.difficultyKey;
                } else {
                    // Map difficulty values to the correct translation key format
                    difficultyKey = `difficulty_${scenario.difficulty}_badge`;
                }
                
                const difficultyText = getLocalizedString(difficultyKey) || scenario.difficulty;
                difficultyBadge.textContent = difficultyText;
                
                if (scenario.difficulty === 'low' || scenario.difficulty === 'easy') difficultyBadge.classList.add('bg-green-100', 'text-green-700', 'dark:bg-green-700', 'dark:text-green-100');
                else if (scenario.difficulty === 'medium') difficultyBadge.classList.add('bg-yellow-100', 'text-yellow-800', 'dark:bg-yellow-700', 'dark:text-yellow-100');
                else if (scenario.difficulty === 'high') difficultyBadge.classList.add('bg-red-100', 'text-red-700', 'dark:bg-red-700', 'dark:text-red-100');
                else if (scenario.difficulty === 'expert') difficultyBadge.classList.add('bg-purple-100', 'text-purple-700', 'dark:bg-purple-700', 'dark:text-purple-100');
                difficultyCell.appendChild(difficultyBadge);
                const statusCell = row.insertCell();
                const statusBadge = document.createElement('span');
                statusBadge.className = 'status-badge';
                statusBadge.textContent = getLocalizedString(scenario.statusKey);
                if (scenario.statusKey === 'status_published' || scenario.statusKey === 'status_active') statusBadge.classList.add('status-active');
                else if (scenario.statusKey === 'status_draft') statusBadge.classList.add('status-paused'); // Using existing class for visual
                else if (scenario.statusKey === 'status_archived') statusBadge.classList.add('bg-gray-100', 'text-gray-700', 'dark:bg-gray-700', 'dark:text-gray-200');
                else if (scenario.statusKey === 'status_pending_review') statusBadge.classList.add('bg-blue-100', 'text-blue-700', 'dark:bg-blue-700', 'dark:text-blue-100');
                statusCell.appendChild(statusBadge);
                row.insertCell().textContent = getLocalizedString(scenario.createdByKey || 'unknown_user');
                row.insertCell().textContent = scenario.lastModified || scenario.creationDate; // Show lastModified if available
                row.insertCell().textContent = scenario.participants;
                row.insertCell().appendChild(createActionButtons(scenario));
            });
        }
        renderPaginationControls(totalPages, totalItems);
    }
    function renderPaginationControls(totalPages) {
        if (!scenariosPagination) return;
        scenariosPagination.innerHTML = '';
        if (totalPages <= 1) return;
        const createPageButton = (pageNumber, isCurrent = false, isDisabled = false, textOverride = null) => {
            const button = document.createElement('button');
            button.type = 'button';
            button.textContent = textOverride || pageNumber;
            button.className = `btn btn-sm ${isCurrent ? 'btn-primary' : 'btn-neutral'}`;
            if (isDisabled) button.disabled = true;
            if (!textOverride) { // Only for page numbers, not prev/next
                 button.setAttribute('aria-label', getLocalizedString('pagination_page_num', {num: pageNumber}));
            }
            if(isCurrent && !textOverride) button.setAttribute('aria-current', 'page');
            button.addEventListener('click', () => {
                if (textOverride === getLocalizedString('pagination_previous')) currentPage--;
                else if (textOverride === getLocalizedString('pagination_next')) currentPage++;
                else currentPage = pageNumber;
                renderScenariosTable();
            });
            return button;
        };
        // Previous Button
        scenariosPagination.appendChild(createPageButton(currentPage - 1, false, currentPage === 1, getLocalizedString('pagination_previous')));
        // Page Number Buttons (simplified for demo)
        for (let i = 1; i <= totalPages; i++) {
            // Basic: show all pages. For many pages, implement ellipsis logic.
            if (totalPages <= 7 || (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1))) {
                 scenariosPagination.appendChild(createPageButton(i, i === currentPage));
            } else if (totalPages > 7 && (i === currentPage - 2 || i === currentPage + 2) ) {
                 const ellipsis = document.createElement('span');
                 ellipsis.textContent = '...';
                 ellipsis.className = 'px-2 py-1 text-sm text-subtitle';
                 scenariosPagination.appendChild(ellipsis);
            }
        }
        // Next Button
        scenariosPagination.appendChild(createPageButton(currentPage + 1, false, currentPage === totalPages, getLocalizedString('pagination_next')));
    }
    function populateAssignModalDropdowns() {
        const userSelect = document.getElementById('assign-user-select');
        const teamSelect = document.getElementById('assign-team-select');
        if (userSelect) {
            userSelect.innerHTML = `<option value="">${getLocalizedString('assign_select_user_placeholder')}</option>`;
            mockUsersForAssign.forEach(user => {
                const option = document.createElement('option');
                option.value = user.id;
                option.textContent = user.nameKey ? getLocalizedString(user.nameKey) : user.name;
                userSelect.appendChild(option);
            });
        }
        if (teamSelect) {
            teamSelect.innerHTML = `<option value="">${getLocalizedString('assign_select_team_placeholder')}</option>`;
            mockTeamsForAssign.forEach(team => {
                const option = document.createElement('option');
                option.value = team.id;
                option.textContent = getLocalizedString(team.nameKey);
                teamSelect.appendChild(option);
            });
        }
    }
    function initializePageWithTranslations() {
        if (typeof getLocalizedString === 'function' && window.translations &&
            Object.keys(window.translations[window.currentLang || 'he'] || {}).length > 10) {
            currentPage = 1; // Reset to first page on init/filter
            renderScenariosTable();
            populateAssignModalDropdowns();
        } else {
            setTimeout(initializePageWithTranslations, 100);
        }
    }
    setTimeout(initializePageWithTranslations, 50);
    if (assignScenarioForm) {
        assignScenarioForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const assignType = assignScenarioForm.assignToType.value;
            const targetId = (assignType === 'user') ? assignScenarioForm.assignUserId.value : assignScenarioForm.assignTeamId.value;
            if (!targetId) {
                alert(getLocalizedString('assign_select_target_alert')); // Add this key to translations
                return;
            }
            alert(getLocalizedString('alert_scenario_assigned_successfully', {scenarioName: getLocalizedString(currentScenarioToAssign.nameKey), target: targetId}));
            closeModal(assignScenarioModal);
            assignScenarioForm.reset();
             // Reset select visibility
            if(userSelectContainer) userSelectContainer.classList.remove('hidden');
            if(teamSelectContainer) teamSelectContainer.classList.add('hidden');
            if(assignToTypeSelect) assignToTypeSelect.value = 'user';
        });
    }

    if (searchInput) {
        searchInput.addEventListener('input', () => { // Instant search
            currentPage = 1;
            renderScenariosTable();
        });
    }
     if (difficultyFilterSelect) {
        difficultyFilterSelect.addEventListener('change', () => {
            currentPage = 1;
            renderScenariosTable();
        });
    }
    if (statusFilterSelect) {
        statusFilterSelect.addEventListener('change', () => {
            currentPage = 1;
            renderScenariosTable();
        });
    }
    window.updatePageSpecificTranslations = function(langPack, lang) {
        initializePageWithTranslations();
    };
});