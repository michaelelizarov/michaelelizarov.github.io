// instructor_manage_users_teams.js
'use strict';
document.addEventListener('DOMContentLoaded', () => {
    const userModal = document.getElementById('user-modal');
    const teamModal = document.getElementById('team-modal');
    const addNewUserButton = document.getElementById('add-new-user-btn');
    const createNewTeamButton = document.getElementById('create-new-team-btn');
    // Modal-specific close and cancel buttons
    const closeUserModalBtn = document.getElementById('close-user-modal-btn');
    const cancelUserModalBtn = document.getElementById('cancel-user-modal-btn');
    const closeTeamModalBtn = document.getElementById('close-team-modal-btn');
    const cancelTeamModalBtn = document.getElementById('cancel-team-modal-btn');
    const userForm = document.getElementById('user-form');
    const teamForm = document.getElementById('team-form');
    const usersTableBody = document.getElementById('users-table-body');
    const teamsTableBody = document.getElementById('teams-table-body');
    const searchUsersInput = document.getElementById('search-users');
    const searchTeamsInput = document.getElementById('search-teams');
    const userModalTitle = document.getElementById('user-modal-title');
    const teamModalTitle = document.getElementById('team-modal-title');
    const userIdInput = document.getElementById('user-id');
    const teamIdInput = document.getElementById('team-id');
    const getLocalizedString = typeof window.getTranslatedStringGlobal === 'function' ?
        window.getTranslatedStringGlobal :
        function(key, replacements = {}, lang = 'he') { console.warn('getTranslatedStringGlobal not found, using fallback for key:', key); return `[${key}]`; };
    let mockUsers = [
        { id: 1, username: 'YossiCohen', fullName: 'יוסי כהן', email: 'yossi@example.com', roleKey: 'role_trainee', teamId: 'alpha', joinDate: '2024-01-15' },
        { id: 2, username: 'DanaLevi', fullName: 'דנה לוי', email: 'dana@example.com', roleKey: 'role_instructor', teamId: null, joinDate: '2023-11-20' },
        { id: 3, username: 'AviMizrachi', fullName: 'אבי מזרחי', email: 'avi@example.com', roleKey: 'role_trainee', teamId: 'beta', joinDate: '2024-02-01' },
        { id: 4, username: 'ShiraHaim', fullName: 'שירה חיים', email: 'shira@example.com', roleKey: 'role_trainee', teamId: 'alpha', joinDate: '2024-03-10' },
        { id: 5, username: 'MosheKatz', fullName: 'משה כץ', email: 'moshe@example.com', roleKey: 'role_trainee', teamId: 'gamma', joinDate: '2024-04-05' },
        { id: 6, username: 'TamarShapiro', fullName: 'תמר שפירו', email: 'tamar@example.com', roleKey: 'role_trainee', teamId: null, joinDate: '2024-05-01' },
        { id: 7, username: 'DavidLevanon', fullName: 'דוד לבנון', email: 'david.l@example.com', roleKey: 'role_instructor', teamId: null, joinDate: '2023-10-01' },
        { id: 8, username: 'NoaBerger', fullName: 'נועה ברגר', email: 'noa.b@example.com', roleKey: 'role_trainee', teamId: 'gamma', joinDate: '2024-05-10' },
        { id: 9, username: 'IdanTal', fullName: 'עידן טל', email: 'idan.t@example.com', roleKey: 'role_admin', teamId: null, joinDate: '2023-09-15' },
        { id: 10, username: 'MayaAviv', fullName: 'מאיה אביב', email: 'maya.a@example.com', roleKey: 'role_trainee', teamId: 'delta', joinDate: '2024-05-20' }
    ];
    let mockTeams = [
        { id: 'alpha', nameKey: 'team_alpha', leaderId: 1, memberUserIds: [1, 4], assignedScenarioKey: 'scenario_corporate_breach' },
        { id: 'beta', nameKey: 'team_beta', leaderId: null, memberUserIds: [3], assignedScenarioKey: 'scenario_phishing_advanced' },
        { id: 'gamma', nameKey: 'team_gamma', leaderId: 5, memberUserIds: [5, 8], assignedScenarioKey: 'scenario_web_breach' },
        { id: 'delta', nameKey: 'team_delta', leaderId: 10, memberUserIds: [10], assignedScenarioKey: null },
        { id: 'epsilon', nameKey: 'team_epsilon', leaderId: null, memberUserIds: [], assignedScenarioKey: 'scenario_ddos_mitigation' },
        { id: 'zeta', nameKey: 'team_zeta', leaderId: 7, memberUserIds: [], assignedScenarioKey: null },
        { id: 'eta', nameKey: 'team_eta', leaderId: null, memberUserIds: [], assignedScenarioKey: 'scenario_cloud_security' },
        { id: 'theta', nameKey: 'team_theta', leaderId: null, memberUserIds: [], assignedScenarioKey: null },
        { id: 'iota', nameKey: 'team_iota', leaderId: null, memberUserIds: [], assignedScenarioKey: 'scenario_incident_response_drill' },
    ];
    function openModal(modalElement, mode = 'add', data = null) {
        if (modalElement) {
            if (mode === 'edit' && data) {
                if (modalElement.id === 'user-modal' && userModalTitle && userForm && userIdInput) {
                    userModalTitle.textContent = getLocalizedString('user_modal_edit_title');
                    userIdInput.value = data.id;
                    userForm.userFullname.value = data.fullName;
                    userForm.userEmail.value = data.email;
                    userForm.userRole.value = data.roleKey;
                    userForm.userPassword.value = ''; // Clear password field for edit
                    userForm.userPassword.placeholder = getLocalizedString('password_leave_blank_placeholder');
                } else if (modalElement.id === 'team-modal' && teamModalTitle && teamForm && teamIdInput) {
                    teamModalTitle.textContent = getLocalizedString('team_modal_edit_title');
                    teamIdInput.value = data.id;
                    teamForm.teamName.value = getLocalizedString(data.nameKey);
                    teamForm.teamLeader.value = data.leaderId || '';
                    populateUserCheckboxesForTeamModal(data.memberUserIds.map(id => id.toString()));
                }
            } else { // Add mode
                if (modalElement.id === 'user-modal' && userModalTitle && userForm && userIdInput) {
                    userModalTitle.textContent = getLocalizedString('user_modal_add_title');
                    userForm.reset();
                    userIdInput.value = '';
                    userForm.userPassword.placeholder = '';
                } else if (modalElement.id === 'team-modal' && teamModalTitle && teamForm && teamIdInput) {
                    teamModalTitle.textContent = getLocalizedString('team_modal_add_title');
                    teamForm.reset();
                    teamIdInput.value = '';
                    populateUserCheckboxesForTeamModal();
                }
            }
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
    if (addNewUserButton && userModal) {
        addNewUserButton.addEventListener('click', () => openModal(userModal, 'add'));
    }
    if (createNewTeamButton && teamModal) {
        createNewTeamButton.addEventListener('click', () => openModal(teamModal, 'add'));
    }
    // Specific event listeners for modal "X" and "Cancel" buttons
    if(closeUserModalBtn) closeUserModalBtn.addEventListener('click', () => closeModal(userModal));
    if(cancelUserModalBtn) cancelUserModalBtn.addEventListener('click', () => closeModal(userModal));
    if(closeTeamModalBtn) closeTeamModalBtn.addEventListener('click', () => closeModal(teamModal));
    if(cancelTeamModalBtn) cancelTeamModalBtn.addEventListener('click', () => closeModal(teamModal));
    // Close modal when clicking on the overlay
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
        overlay.addEventListener('click', (event) => {
            if (event.target === overlay) closeModal(overlay);
        });
    });
    function createActionButtons(item, type) {
        const editTooltip = getLocalizedString('edit_tooltip');
        const deleteTooltip = getLocalizedString('delete_tooltip');
        const container = document.createElement('div');
        container.className = 'text-center space-x-1 rtl:space-x-reverse whitespace-nowrap';
        const editButton = document.createElement('button');
        editButton.className = 'table-action-button';
        editButton.title = editTooltip;
        editButton.innerHTML = `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>`;
        editButton.addEventListener('click', () => {
            if (type === 'user') openModal(userModal, 'edit', item);
            if (type === 'team') openModal(teamModal, 'edit', item);
        });
        const deleteButton = document.createElement('button');
        deleteButton.className = 'table-action-button';
        deleteButton.title = deleteTooltip;
        deleteButton.innerHTML = `<svg class="w-4 h-4 text-danger-color hover:text-danger-hover-color" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>`;
        deleteButton.addEventListener('click', () => {
            const itemName = type === 'user' ? item.fullName : getLocalizedString(item.nameKey);
            if (confirm(getLocalizedString('confirm_delete_prefix', { type: getLocalizedString(type === 'user' ? 'user_singular' : 'team_singular'), itemName: itemName }))) {
                 if (type === 'user') {
                    mockUsers = mockUsers.filter(u => u.id !== item.id);
                    // Also remove user from any teams they were part of
                    mockTeams.forEach(team => {
                        team.memberUserIds = team.memberUserIds.filter(memberId => memberId !== item.id);
                        if (team.leaderId === item.id) team.leaderId = null; // Remove as leader
                    });
                    renderUsersTable();
                    renderTeamsTable(); // Re-render teams if a leader was removed or member count changed
                 } else if (type === 'team') {
                    mockTeams = mockTeams.filter(t => t.id !== item.id);
                    // Also update users who were part of this team
                    mockUsers.forEach(user => {
                        if (user.teamId === item.id) user.teamId = null;
                    });
                    renderTeamsTable();
                    renderUsersTable(); // Re-render users to reflect team removal
                 }
                 alert(getLocalizedString('alert_item_deleted_successfully'));
            }
        });
        container.appendChild(editButton);
        container.appendChild(deleteButton);
        return container;
    }
    function renderUsersTable() {
        if (!usersTableBody) return;
        const loadingRow = document.getElementById('loading-users-row');
        usersTableBody.innerHTML = '';
        if(loadingRow) usersTableBody.appendChild(loadingRow);
        const searchTerm = searchUsersInput.value.toLowerCase();
        const filteredUsers = mockUsers.filter(user =>
            user.fullName.toLowerCase().includes(searchTerm) ||
            user.email.toLowerCase().includes(searchTerm)
        );
        if (filteredUsers.length === 0) {
            if(loadingRow) {
                loadingRow.classList.remove('hidden');
                loadingRow.cells[0].textContent = getLocalizedString('no_users_available');
            }
            return;
        }
        if(loadingRow) loadingRow.classList.add('hidden');
        filteredUsers.forEach(user => {
            const row = usersTableBody.insertRow();
            row.insertCell().textContent = user.fullName;
            row.insertCell().textContent = user.email;
            row.insertCell().textContent = getLocalizedString(user.roleKey) || user.roleKey.replace('role_', '');
            const team = mockTeams.find(t => user.teamId === t.id);
            row.insertCell().textContent = team ? getLocalizedString(team.nameKey) : (getLocalizedString('no_team_assigned'));
            row.insertCell().textContent = user.joinDate;
            row.insertCell().appendChild(createActionButtons(user, 'user'));
        });
    }
    function renderTeamsTable() {
        if (!teamsTableBody) return;
        const loadingRow = document.getElementById('loading-teams-row');
        teamsTableBody.innerHTML = '';
        if(loadingRow) teamsTableBody.appendChild(loadingRow);
        const searchTerm = searchTeamsInput.value.toLowerCase();
        const filteredTeams = mockTeams.filter(team => {
            const teamName = getLocalizedString(team.nameKey).toLowerCase();
            const leader = mockUsers.find(u => u.id === team.leaderId);
            const leaderName = leader ? leader.fullName.toLowerCase() : '';
            return teamName.includes(searchTerm) || leaderName.includes(searchTerm);
        });
        if (filteredTeams.length === 0) {
            if(loadingRow) {
                loadingRow.classList.remove('hidden');
                loadingRow.cells[0].textContent = getLocalizedString('no_teams_available');
            }
            return;
        }
       if(loadingRow) loadingRow.classList.add('hidden');
        filteredTeams.forEach(team => {
            const row = teamsTableBody.insertRow();
            row.insertCell().textContent = getLocalizedString(team.nameKey) || team.nameKey.replace('team_', '');
            const leader = mockUsers.find(u => u.id === team.leaderId);
            row.insertCell().textContent = leader ? leader.fullName : getLocalizedString('no_team_leader');
            row.insertCell().textContent = team.memberUserIds.length;
            row.insertCell().textContent = team.assignedScenarioKey ? getLocalizedString(team.assignedScenarioKey) : getLocalizedString('no_active_scenario');
            row.insertCell().appendChild(createActionButtons(team, 'team'));
        });
    }
    function populateUserCheckboxesForTeamModal(selectedUserIds = []) {
        const checkboxListContainer = document.getElementById('team-members-checkbox-list');
        if (!checkboxListContainer) return;
        checkboxListContainer.innerHTML = '';
        const availableUsers = mockUsers.filter(user => getLocalizedString(user.roleKey) === getLocalizedString('role_trainee'));
        if (availableUsers.length === 0) {
            checkboxListContainer.textContent = getLocalizedString('no_users_to_assign_to_team');
            return;
        }
        availableUsers.forEach(user => {
            const label = document.createElement('label');
            label.className = 'form-checkbox-label checkbox-list-item-label block p-2 hover:bg-[var(--card-hover-bg-light)] dark:hover:bg-[var(--card-hover-bg-dark)] rounded transition-colors duration-150';
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.name = 'teamMembers'; // Name for form submission
            checkbox.value = user.id.toString();
            checkbox.className = 'form-checkbox';
            if (selectedUserIds.includes(user.id.toString())) {
                checkbox.checked = true;
            }
            const span = document.createElement('span');
            span.textContent = ` ${user.fullName} (${user.email})`;
            label.appendChild(checkbox);
            label.appendChild(span);
            checkboxListContainer.appendChild(label);
        });
    }
    function initializePageWithTranslations() {
        if (typeof getLocalizedString === 'function' && window.translations &&
            Object.keys(window.translations[window.currentLang || 'he'] || {}).length > 10) {
            renderUsersTable();
            renderTeamsTable();
            populateUserCheckboxesForTeamModal();
            const teamLeaderSelect = document.getElementById('team-leader');
            if (teamLeaderSelect) {
                teamLeaderSelect.innerHTML = `<option value="">${getLocalizedString('select_team_leader_optional')}</option>`;
                mockUsers.forEach(user => {
                    const option = document.createElement('option');
                    option.value = user.id.toString();
                    option.textContent = user.fullName;
                    teamLeaderSelect.appendChild(option);
                });
            }
            if(searchUsersInput) searchUsersInput.addEventListener('input', renderUsersTable);
            if(searchTeamsInput) searchTeamsInput.addEventListener('input', renderTeamsTable);
        } else {
            setTimeout(initializePageWithTranslations, 100);
        }
    }
    setTimeout(initializePageWithTranslations, 50);
    if (userForm) {
        userForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const formData = new FormData(userForm);
            const userId = formData.get('userId');
            const userFullName = formData.get('userFullname');
            const userEmail = formData.get('userEmail');
            const userRoleKey = formData.get('userRole');
            // Password handling would be more complex in a real app
            const userData = {
                id: userId ? parseInt(userId) : mockUsers.length > 0 ? Math.max(...mockUsers.map(u => u.id)) + 1 : 1,
                username: userFullName.replace(/\s+/g, '').toLowerCase() + (userId ? '' : Date.now().toString().slice(-3)),
                fullName: userFullName,
                email: userEmail,
                roleKey: userRoleKey,
                teamId: userId ? mockUsers.find(u=>u.id === parseInt(userId))?.teamId : null, // Preserve teamId on edit, null for new
                joinDate: userId ? mockUsers.find(u=>u.id === parseInt(userId))?.joinDate : new Date().toISOString().split('T')[0]
            };
            if (userId) {
                const index = mockUsers.findIndex(u => u.id === parseInt(userId));
                if (index > -1) mockUsers[index] = { ...mockUsers[index], ...userData };
            } else {
                mockUsers.push(userData);
            }
            renderUsersTable();
            // Update leader dropdowns if a user's name changed (relevant if leaders were selected by name)
            // Or if a new potential leader was added
            populateUserCheckboxesForTeamModal();
            const teamLeaderSelect = document.getElementById('team-leader');
            if (teamLeaderSelect) {
                const currentLeaderVal = teamLeaderSelect.value;
                teamLeaderSelect.innerHTML = `<option value="">${getLocalizedString('select_team_leader_optional')}</option>`;
                mockUsers.forEach(user => {
                    const option = document.createElement('option');
                    option.value = user.id.toString();
                    option.textContent = user.fullName;
                    teamLeaderSelect.appendChild(option);
                });
                teamLeaderSelect.value = currentLeaderVal; // Restore selection if possible
            }
            alert(getLocalizedString(userId ? 'alert_user_updated_successfully' : 'alert_user_added_successfully'));
            closeModal(userModal);
        });
    }
    if (teamForm) {
        teamForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const formData = new FormData(teamForm);
            const teamIdValue = formData.get('teamId');
            const teamName = formData.get('teamName');
            const teamNameKey = `team_${teamName.toLowerCase().replace(/\s+/g, '_')}`;
            const leaderId = formData.get('teamLeader') ? parseInt(formData.get('teamLeader')) : null;
            const memberIds = Array.from(formData.getAll('teamMembers')).map(id => parseInt(id));
            const teamData = {
                id: teamIdValue ? teamIdValue : teamNameKey.replace('team_', '') + Date.now().toString().slice(-3), // More unique ID for new
                nameKey: teamNameKey,
                leaderId: leaderId,
                memberUserIds: memberIds,
                assignedScenarioKey: teamIdValue ? mockTeams.find(t => t.id === teamIdValue)?.assignedScenarioKey : null // Preserve on edit
            };
            if (typeof window.translations !== 'undefined') {
                 if (!window.translations.he[teamData.nameKey]) window.translations.he[teamData.nameKey] = teamName;
                 if (!window.translations.en[teamData.nameKey]) window.translations.en[teamData.nameKey] = teamName;
            }
            const oldTeamData = teamIdValue ? mockTeams.find(t => t.id === teamIdValue) : null;
            if (teamIdValue) {
                const index = mockTeams.findIndex(t => t.id === teamIdValue);
                if (index > -1) mockTeams[index] = { ...mockTeams[index], ...teamData };
            } else {
                mockTeams.push(teamData);
            }
            // Update teamId for affected users
            // Remove from old team members if editing
            if (oldTeamData) {
                oldTeamData.memberUserIds.forEach(oldMemberId => {
                    if (!memberIds.includes(oldMemberId)) { // User was removed from team
                        const user = mockUsers.find(u => u.id === oldMemberId);
                        if (user && user.teamId === oldTeamData.id) user.teamId = null;
                    }
                });
            }
            // Add to new team members
            memberIds.forEach(newMemberId => {
                const user = mockUsers.find(u => u.id === newMemberId);
                if (user) user.teamId = teamData.id;
            });
            renderTeamsTable();
            renderUsersTable();
            alert(getLocalizedString(teamIdValue ? 'alert_team_updated_successfully' : 'alert_team_created_successfully'));
            closeModal(teamModal);
        });
    }
    window.updatePageSpecificTranslations = function(langPack, lang) {
        initializePageWithTranslations(); // Re-render tables and modals with new language
    };
});