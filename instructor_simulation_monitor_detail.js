// instructor_simulation_monitor_detail.js
'use strict';
document.addEventListener('DOMContentLoaded', () => {
    const scenarioNameEl = document.getElementById('simulation-scenario-name');
    const teamUserEl = document.getElementById('simulation-team-user')?.querySelector('span'); // Get the span inside
    const statusBadgeEl = document.getElementById('simulation-status-badge');
    const pauseButton = document.getElementById('pause-simulation-btn');
    const stopButton = document.getElementById('stop-simulation-btn');
    const sendMessageButton = document.getElementById('send-message-btn'); // Assuming this is the "Intervention" button ID if it's the same
    const timelineContainer = document.getElementById('scenario-timeline');
    const eventLogContainer = document.getElementById('event-log-container');
    const kpiScoreEl = document.getElementById('current-kpi-score');
    const kpiTimeEl = document.getElementById('current-kpi-time');
    const kpiAlertsEl = document.getElementById('current-kpi-alerts');
    const kpiHintsEl = document.getElementById('current-kpi-hints');
    const kpiTasksEl = document.getElementById('current-kpi-tasks'); // Assuming new KPI element
    const getLocalizedString = typeof window.getTranslatedStringGlobal === 'function' ?
        window.getTranslatedStringGlobal :
        function(key, replacements = {}, lang = 'he') { console.warn('getTranslatedStringGlobal not found, using fallback.'); return `[${key}]`; };
    // Mock data for different simulations
    const simulationsDetailsData = {
        "SIM001": { // Matches ID from instructor_monitor_simulations.js
            scenarioNameKey: "scenario_critical_infra_breach",
            teamUser: "צוות אלפא", // Direct name, or use a key if team names are also translated
            statusKey: "sim_status_running",
            progress: 75, // Not directly used in this detail page's header, but good for context
            timelineData: [
                { stage: 1, titleKey: "timeline_stage1_title", status: "completed", time: "10:05", descriptionKey: "timeline_stage1_desc_completed", descParams: {time: "10:05"} },
                { stage: 2, titleKey: "timeline_stage2_title", status: "completed", time: "10:15", descriptionKey: "timeline_stage1_desc_completed", descParams: {time: "10:15"} },
                { stage: 3, titleKey: "timeline_stage3_title", status: "in_progress", time: "10:16", descriptionKey: "timeline_stage1_desc_inprogress", descParams: {time: "10:16"} },
                { stage: 4, titleKey: "timeline_stage4_title", status: "pending", descriptionKey: "timeline_stage1_desc_pending" },
                { stage: 5, titleKey: "timeline_stage5_title", status: "pending", descriptionKey: "timeline_stage1_desc_pending" },
            ],
            eventLogData: [
                { timestamp: "10:00:05", actorKey: "log_actor_system", messageKey: "log_event_sim_start" },
                { timestamp: "10:05:30", actorKey: "team_alpha", messageKey: "log_event_user_action", params: {userName: "צוות אלפא", actionDetails: "זיהוי התראה ראשונית"} }, // team_alpha as actorKey
                { timestamp: "10:10:00", actorKey: "log_actor_instructor", messageKey: "log_event_hint_sent", params: {hintContent: "בדקו את הלוגים של ה-FW"} },
                { timestamp: "10:15:12", actorKey: "team_alpha", messageKey: "log_event_user_action", params: {userName: "צוות אלפא", actionDetails: "בידוד שרת DB01"} },
            ],
            kpiData: { score: 65, timeElapsed: "00:35:12", alertsTriggered: 3, hintsUsed: 1, tasksCompleted: 2 }
        },
        "sim_gamma_bank_ransom": { // Example ID from instructor_monitor_simulations.html
             scenarioNameKey: "sim_monitor_ex1_scenario", // Key from monitor_translations
             teamUser: getLocalizedString("sim_monitor_ex1_team"), // Get translated team name
             statusKey: "sim_status_running",
             timelineData: [
                { stage: 1, titleKey: "timeline_stage1_title", status: "completed", time: "10:35", descriptionKey: "timeline_stage1_desc_completed", descParams: {time: "10:35"} },
                { stage: 2, titleKey: "timeline_stage2_title", status: "in_progress", time: "10:36", descriptionKey: "timeline_stage1_desc_inprogress", descParams: {time: "10:36"} },
                { stage: 3, titleKey: "timeline_stage3_title", status: "pending", descriptionKey: "timeline_stage1_desc_pending"},
             ],
             eventLogData: [
                { timestamp: "10:30:00", actorKey: "log_actor_system", messageKey: "log_event_sim_start" },
                { timestamp: "10:35:15", actorKey: "sim_monitor_ex1_team", messageKey: "log_event_user_action", params: {userName: getLocalizedString("sim_monitor_ex1_team"), actionDetails: "אישור קבלת תדריך"} },
             ],
             kpiData: { score: 10, timeElapsed: "00:05:40", alertsTriggered: 1, hintsUsed: 0, tasksCompleted: 0 }
        }
        // Add more simId entries as needed
    };
     // Add translation keys for actors if not global
    if(window.translations) {
        window.translations.he.team_alpha = window.translations.he.team_alpha || "צוות אלפא";
        window.translations.en.team_alpha = window.translations.en.team_alpha || "Alpha Team";
        window.translations.he.sim_monitor_ex1_team = window.translations.he.sim_monitor_ex1_team || "צוות גמא"; // from monitor page
        window.translations.en.sim_monitor_ex1_team = window.translations.en.sim_monitor_ex1_team || "Gamma Team";
    }
    function displaySimulationHeader(simData) {
        if (scenarioNameEl) scenarioNameEl.textContent = getLocalizedString(simData.scenarioNameKey);
        if (teamUserEl) teamUserEl.textContent = simData.teamUser; // Assuming teamUser is already a displayable string or a key handled by getLocalizedString if it starts with one
        if (statusBadgeEl) {
            statusBadgeEl.textContent = getLocalizedString(simData.statusKey);
            statusBadgeEl.className = 'status-badge'; // Reset classes
            if (simData.statusKey === 'sim_status_running') statusBadgeEl.classList.add('status-active');
            else if (simData.statusKey === 'sim_status_paused') statusBadgeEl.classList.add('status-paused');
            else if (simData.statusKey === 'sim_status_error') statusBadgeEl.classList.add('status-error');
            else if (simData.statusKey === 'sim_status_completed') statusBadgeEl.classList.add('bg-blue-100', 'text-blue-700', 'dark:bg-blue-700', 'dark:text-blue-100'); // Example for completed
        }
        if (pauseButton) {
            const isPaused = simData.statusKey === 'sim_status_paused';
            pauseButton.querySelector('span').textContent = getLocalizedString(isPaused ? 'resume_simulation_button' : 'pause_simulation_button');
            // Logic to change icon can be added here if icons are different for pause/resume
        }
    }
    function renderScenarioTimeline(timelineData) {
        if (!timelineContainer) return;
        timelineContainer.innerHTML = ''; // Clear previous
        if (!timelineData || timelineData.length === 0) {
            timelineContainer.innerHTML = `<p class="text-subtitle text-center p-4" data-lang-key="loading_timeline">${getLocalizedString('loading_timeline')}</p>`;
            return;
        }
        timelineData.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'timeline-item';
            let dotClass = 'timeline-dot-pending';
            if (item.status === 'completed') dotClass = 'timeline-dot-completed';
            else if (item.status === 'in_progress') dotClass = 'timeline-dot-active';
            else if (item.status === 'error') dotClass = 'bg-danger-color'; // Special for error
            const descriptionText = item.descriptionKey ? getLocalizedString(item.descriptionKey, item.descParams || {}) : (item.time ? `${getLocalizedString('timeline_status_' + item.status)} - ${item.time}` : getLocalizedString('timeline_status_'as_completed'));
            itemDiv.innerHTML = `
                <div class="timeline-dot ${dotClass}"></div>
                <div class="timeline-content">
                    <h4 class="timeline-title" data-lang-key="${item.titleKey}">${getLocalizedString(item.titleKey) || (getLocalizedString('timeline_stage_default_title', {number: item.stage}))}</h4>
                    <p class="timeline-description">${descriptionText}</p>
                </div>
            `;
            timelineContainer.appendChild(itemDiv);
        });
    }
    function renderEventLog(logData) {
        if (!eventLogContainer) return;
        eventLogContainer.innerHTML = ''; // Clear previous
        if (!logData || logData.length === 0) {
            eventLogContainer.innerHTML = `<p class="text-subtitle text-center p-4" data-lang-key="no_events_to_display">${getLocalizedString('no_events_to_display')}</p>`;
            return;
        }
        logData.forEach(entry => {
            const entryDiv = document.createElement('div');
            entryDiv.className = 'log-entry';
            const actorText = entry.actorKey ? getLocalizedString(entry.actorKey) : (entry.actor || 'Unknown'); // Use actor if actorKey not found
            const messageText = getLocalizedString(entry.messageKey, entry.params || {});
            entryDiv.innerHTML = `
                <span class="log-time">${entry.timestamp}</span>
                <p class="log-text flex-grow">${messageText}</p>
                <span class="log-actor">${actorText}</span>
            `;
            eventLogContainer.appendChild(entryDiv);
        });
    }
    function updateKPIs(kpiData) {
        if (kpiScoreEl) kpiScoreEl.textContent = kpiData.score !== undefined ? kpiData.score : 'N/A';
        if (kpiTimeEl) kpiTimeEl.textContent = kpiData.timeElapsed || 'N/A';
        if (kpiAlertsEl) kpiAlertsEl.textContent = kpiData.alertsTriggered !== undefined ? kpiData.alertsTriggered : 'N/A';
        if (kpiHintsEl) kpiHintsEl.textContent = kpiData.hintsUsed !== undefined ? kpiData.hintsUsed : 'N/A';
        if (kpiTasksEl) kpiTasksEl.textContent = kpiData.tasksCompleted !== undefined ? kpiData.tasksCompleted : 'N/A';
    }
    function handleSimulationAction(actionNameKey) {
        const actionName = getLocalizedString(actionNameKey);
        const urlParams = new URLSearchParams(window.location.search);
        const simId = urlParams.get('id') || urlParams.get('simId');
        
        // Show loading states
        if (scenarioNameEl) scenarioNameEl.textContent = 'טוען שם תרחיש...';
        if (teamUserEl) teamUserEl.textContent = 'טוען שם צוות/משתמש...';
        if (timelineContainer) timelineContainer.innerHTML = '<p class="text-subtitle text-center p-4">טוען ציר זמן...</p>';
        if (eventLogContainer) eventLogContainer.innerHTML = '<p class="text-subtitle text-center p-4">טוען לוג אירועים...</p>';

        if (simId && simulationsDetailsData[simId]) {
            const simData = simulationsDetailsData[simId];
            
            switch(actionNameKey) {
                case 'pause_simulation_button':
                case 'resume_simulation_button':
                    simData.statusKey = simData.statusKey === 'sim_status_paused' ? 
                                      'sim_status_running' : 'sim_status_paused';
                    break;
                case 'stop_simulation_button':
                    simData.statusKey = 'sim_status_completed';
                    simData.progress = 100;
                    break;
                case 'send_message_hint_button':
                    // Example message sending logic
                    const message = prompt(getLocalizedString('enter_message_hint_prompt'));
                    if (message) {
                        simData.eventLogData.push({
                            timestamp: new Date().toLocaleTimeString(),
                            actorKey: 'log_actor_instructor',
                            messageKey: 'log_event_hint_sent',
                            params: {hintContent: message}
                        });
                        renderEventLog(simData.eventLogData);
                    }
                    break;
            }
            
            displaySimulationHeader(simData);
            alert(`פעולה בוצעה: ${actionName} (סימולציה)`);
        } else {
            alert('שגיאה: לא נמצאה סימולציה פעילה');
        }
    }
    if (pauseButton) {
        pauseButton.addEventListener('click', (event) => {
            const currentStatusKey = statusBadgeEl ? (statusBadgeEl.textContent === getLocalizedString('sim_status_paused') ? 'sim_status_paused' : 'sim_status_running') : 'sim_status_running';
            handleSimulationAction(currentStatusKey === 'sim_status_paused' ? 'resume_simulation_button' : 'pause_simulation_button');
        });
    }
    if (stopButton) {
        stopButton.addEventListener('click', (event) => handleSimulationAction('stop_simulation_button'));
    }
    if (sendMessageButton) { // This is likely the "Intervention" button
        // Assuming the modal logic for intervention is handled by instructor_monitor_simulations.js or needs to be added here
        // For this page, it might directly trigger a send message/hint action or open a simplified modal.
        // The current HTML doesn't have a dedicated intervention modal for this page.
        // The `handleSimulationAction` is generic. If this button has specific modal, it needs separate handling.
        // For now, treating it as a generic action.
        sendMessageButton.addEventListener('click', (event) => handleSimulationAction('send_message_hint_button'));
    }
    function initializePage() {
        const urlParams = new URLSearchParams(window.location.search);
        const simId = urlParams.get('id') || urlParams.get('simId'); // Support both ID formats
        
        // Show loading states
        if (scenarioNameEl) scenarioNameEl.textContent = 'טוען שם תרחיש...';
        if (teamUserEl) teamUserEl.textContent = 'טוען שם צוות/משתמש...';
        if (timelineContainer) timelineContainer.innerHTML = '<p class="text-subtitle text-center p-4">טוען ציר זמן...</p>';
        if (eventLogContainer) eventLogContainer.innerHTML = '<p class="text-subtitle text-center p-4">טוען לוג אירועים...</p>';

        if (simId && simulationsDetailsData[simId]) {
            const simData = simulationsDetailsData[simId];
            displaySimulationHeader(simData);
            renderScenarioTimeline(simData.timelineData);
            renderEventLog(simData.eventLogData);
            updateKPIs(simData.kpiData);
        } else {
            console.error("Simulation ID not found or data unavailable for:", simId);
            if (scenarioNameEl) scenarioNameEl.textContent = 'שגיאה בטעינת הנתונים';
            if (timelineContainer) timelineContainer.innerHTML = '<p class="text-subtitle text-center p-4">לא נמצאו נתונים זמינים</p>';
            if (eventLogContainer) eventLogContainer.innerHTML = '<p class="text-subtitle text-center p-4">לא נמצאו אירועים להצגה</p>';
        }
    }
    if (window.translations && Object.keys(window.translations[window.currentLang || 'he'] || {}).length > 0) {
        initializePage();
    } else {
        const checkTranslationsInterval = setInterval(() => {
            if (window.translations && Object.keys(window.translations[window.currentLang || 'he'] || {}).length > 0) {
                clearInterval(checkTranslationsInterval);
                initializePage();
            }
        }, 100);
        setTimeout(() => clearInterval(checkTranslationsInterval), 3000); // Fallback
    }
    window.updatePageSpecificTranslations = function(langPack, lang) {
        initializePage(); // Re-initialize to re-render all dynamic content with new language
    };
});