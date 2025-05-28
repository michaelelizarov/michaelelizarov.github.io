// trainee_start_simulation.js
'use strict';
document.addEventListener('DOMContentLoaded', () => {
    const scenarioTitleDisplay = document.getElementById('scenario-title-display');
    const scenarioDifficultyDisplay = document.getElementById('scenario-difficulty-display');
    const scenarioDurationDisplay = document.getElementById('scenario-duration-display');
    const scenarioDescriptionDisplay = document.getElementById('scenario-description-display');
    const scenarioImage = document.getElementById('scenario-image');
    const loadingProgressBar = document.getElementById('loading-progress');
    const loadingStatusText = document.getElementById('loading-status-text'); // New element
    const teamLobbySection = document.getElementById('team-lobby');
    const teamLobbyList = document.getElementById('team-lobby-list');
    const teamLobbyName = document.getElementById('team-lobby-name');
    const scenarioDetailsSection = document.getElementById('scenario-details-section');
    // Helper to get translated string
    function getLocalizedString(key, lang) {
        const language = lang || window.currentLang || 'he';
        if (window.translations && window.translations[language] && window.translations[language][key]) {
            return window.translations[language][key];
        }
        const enLangPack = (window.translations && window.translations.en) ? window.translations.en : {};
        return enLangPack[key] || `[${key}]`; // Fallback
    }
    // Enhanced scenario data store with more realistic information
    const scenarios = {
        "ransomware": { 
            nameKey: "scenario_name_ransomware", 
            difficulty: "קשה", 
            duration: "60 דקות", 
            description: "תרחיש המדמה מתקפת כופר מקיפה על רשת ארגונית. התמודד עם זיהוי ההדבקה, עצירת התפשטותה ושחזור מערכות קריטיות.",
            teamNameKey: "team_alpha_lobby_name",
            teamMembers: [
                { nameKey: 'team_member1_name', connected: true, roleKey: 'role_ir_lead' },
                { nameKey: 'team_member2_name', connected: false, roleKey: 'role_systems_admin' },
                { nameKey: 'team_member3_name_waiting', connected: false, roleKey: 'role_security_analyst' },
                { nameKey: 'team_member4_name_waiting', connected: false, roleKey: 'role_soc_manager' }
            ],
            assets: ["Windows Server 2019", "Windows 10 Endpoints", "Exchange Server", "File Shares"],
            tools: ["Wireshark", "Process Explorer", "YARA Rules", "Memory Analysis"],
            imagePath: "ransomware_scenario.webp"
        },
        "phishing": { 
            nameKey: "scenario_name_phishing", 
            difficulty: "בינוני", 
            duration: "45 דקות", 
            description: "למד לזהות ולנתח הודעות פישינג מתוחכמות. תחקור ניסיון פישינג לעובדי החברה וקבע מה היה הנזק הפוטנציאלי והאמיתי.",
            teamNameKey: "team_beta_lobby_name",
            teamMembers: [
                { nameKey: 'team_member1_name', connected: true, roleKey: 'role_lead_investigator' },
                { nameKey: 'phishing_team_member1', connected: false, roleKey: 'role_threat_hunter' },
                { nameKey: 'phishing_team_member2', connected: false, roleKey: 'role_email_security' }
            ],
            assets: ["Email Gateway", "User Workstations", "Active Directory"],
            tools: ["Email Header Analysis", "URL Analysis", "Sandbox Environment"],
            imagePath: "phishing_scenario.webp"
        },
        "web_breach": { 
            nameKey: "scenario_name_web_breach", 
            difficulty: "בינוני", 
            duration: "50 דקות", 
            description: "התמודד עם ניסיון פריצה לשרת אינטרנט ארגוני. זהה את נקודות התורפה, חסום את התוקף, והשלם חקירה מלאה.",
            teamNameKey: "team_gamma_lobby_name",
            teamMembers: [
                { nameKey: 'team_member1_name', connected: true, roleKey: 'role_web_security_lead' },
                { nameKey: 'web_team_member1', connected: false, roleKey: 'role_network_analyst' },
                { nameKey: 'web_team_member2', connected: false, roleKey: 'role_application_security' },
                { nameKey: 'web_team_member3', connected: false, roleKey: 'role_devops_engineer' }
            ],
            assets: ["Web Servers", "Application Servers", "Databases", "WAF"],
            tools: ["NMAP", "OWASP ZAP", "SQL Injection Tests", "Log Analysis"],
            imagePath: "web_breach_scenario.webp"
        },
        "mystery_easy_01": { 
            nameKey: "scenario_name_mystery_easy_01", 
            difficulty: "קל", 
            duration: "משתנה", 
            description: "בחן את כישוריך הבסיסיים והתמודד עם הלא נודע. תרחיש מסתורי המשלב מספר טכניקות התקפה בסיסיות.",
            teamNameKey: "team_delta_lobby_name",
            teamMembers: [
                { nameKey: 'team_member1_name', connected: true, roleKey: 'role_security_analyst' },
                { nameKey: 'mystery_team_member1', connected: false, roleKey: 'role_junior_analyst' }
            ],
            assets: ["Various Systems", "Unknown Infrastructure"],
            tools: ["Basic Security Tools", "SIEM Access"],
            imagePath: "mystery_scenario.webp"
        }
    };

    // Add these new translations
    if (window.translations) {
        const he = window.translations.he;
        const en = window.translations.en;
        
        if (he) {
            he.team_beta_lobby_name = "צוות בטא - חקירת פישינג";
            he.team_gamma_lobby_name = "צוות גמא - אבטחת Web";
            he.team_delta_lobby_name = "צוות דלתא - אתגרים";
            he.phishing_team_member1 = "אלון רביב";
            he.phishing_team_member2 = "טל ברקוביץ'";
            he.web_team_member1 = "רועי כץ";
            he.web_team_member2 = "נועה לוינסון";
            he.web_team_member3 = "אייל דרור";
            he.mystery_team_member1 = "גל אברהם";
            he.scenario_assets = "נכסים בתרחיש:";
            he.scenario_tools = "כלים זמינים:";
            he.user_role = "תפקיד:";
        }
        
        if (en) {
            en.team_beta_lobby_name = "Team Beta - Phishing Investigation";
            en.team_gamma_lobby_name = "Team Gamma - Web Security";
            en.team_delta_lobby_name = "Team Delta - Challenges";
            en.phishing_team_member1 = "Alon Raviv";
            en.phishing_team_member2 = "Tal Berkovich";
            en.web_team_member1 = "Roy Katz";
            en.web_team_member2 = "Noa Levinson";
            en.web_team_member3 = "Eyal Dror";
            en.mystery_team_member1 = "Gal Abraham";
            en.scenario_assets = "Scenario Assets:";
            en.scenario_tools = "Available Tools:";
            en.user_role = "Role:";
        }
    }

    function displayScenarioInfo(scenarioId) {
        const scenario = scenarios[scenarioId] || { nameKey: scenarioId, difficulty: "לא ידוע", duration: "לא ידוע", description: "תיאור לא זמין." };
        if (scenarioTitleDisplay) scenarioTitleDisplay.textContent = getLocalizedString(scenario.nameKey) || scenario.nameKey;
        if (scenarioDifficultyDisplay) scenarioDifficultyDisplay.textContent = scenario.difficulty; // Assuming difficulty is already translated or simple text
        if (scenarioDurationDisplay) scenarioDurationDisplay.textContent = scenario.duration; // Assuming duration is already translated or simple text
        if (scenarioDescriptionDisplay) scenarioDescriptionDisplay.textContent = scenario.description; // Assuming description is already translated or simple text
        if (teamLobbyName && scenario.teamNameKey) {
            teamLobbyName.textContent = getLocalizedString(scenario.teamNameKey);
        }
        
        // Set the scenario image
        if (scenarioImage && scenario.imagePath) {
            scenarioImage.src = scenario.imagePath;
            scenarioImage.alt = getLocalizedString(scenario.nameKey) || scenario.nameKey;
            
            // Handle image error (if image doesn't exist)
            scenarioImage.onerror = function() {
                this.src = "default_scenario.webp"; // Fallback image
                this.onerror = null; // Prevent infinite loop if fallback also fails
            };
        }
        
        // Add additional scenario details
        if (scenarioDetailsSection && scenario.assets && scenario.tools) {
            let detailsHTML = '';
            
            // Add assets section
            detailsHTML += `<div class="mt-3">
                <h4 class="text-sm font-medium text-subtitle mb-1">${getLocalizedString('scenario_assets')}</h4>
                <ul class="text-xs list-disc list-inside">`;
            
            scenario.assets.forEach(asset => {
                detailsHTML += `<li>${asset}</li>`;
            });
            
            detailsHTML += `</ul></div>`;
            
            // Add tools section
            detailsHTML += `<div class="mt-2">
                <h4 class="text-sm font-medium text-subtitle mb-1">${getLocalizedString('scenario_tools')}</h4>
                <ul class="text-xs list-disc list-inside">`;
            
            scenario.tools.forEach(tool => {
                detailsHTML += `<li>${tool}</li>`;
            });
            
            detailsHTML += `</ul></div>`;
            
            scenarioDetailsSection.innerHTML = detailsHTML;
        }
    }

    function updateTeamLobby(teamMembers) {
        if (!teamLobbyList) return;
        teamLobbyList.innerHTML = ''; // Clear previous list
        teamMembers.forEach(member => {
            const listItem = document.createElement('li');
            listItem.className = 'list-item flex justify-between items-center p-2 bg-[var(--input-bg-color)] rounded-md border border-[var(--card-border-color)]';
            
            // Name and role container
            const memberInfoDiv = document.createElement('div');
            memberInfoDiv.className = 'flex flex-col';
            
            const memberNameSpan = document.createElement('span');
            memberNameSpan.className = 'text-sm font-medium';
            memberNameSpan.textContent = getLocalizedString(member.nameKey) || member.nameKey;
            
            const memberRoleSpan = document.createElement('span');
            memberRoleSpan.className = 'text-xs text-subtitle';
            memberRoleSpan.textContent = `${getLocalizedString('user_role')} ${getLocalizedString(member.roleKey)}`;
            
            memberInfoDiv.appendChild(memberNameSpan);
            memberInfoDiv.appendChild(memberRoleSpan);
            
            // Status indicator with icon
            const statusDiv = document.createElement('div');
            statusDiv.className = 'flex items-center';
            
            const statusDot = document.createElement('span');
            statusDot.className = `inline-block w-2.5 h-2.5 rounded-full mr-1.5 ${member.connected ? 'bg-green-500' : 'bg-gray-300'}`;
            
            const statusSpan = document.createElement('span');
            statusSpan.className = `text-xs px-2 py-0.5 rounded-full ${member.connected ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'}`;
            statusSpan.textContent = member.connected ? getLocalizedString('team_member_status_connected') : getLocalizedString('team_member_status_pending');
            
            statusDiv.appendChild(statusDot);
            statusDiv.appendChild(statusSpan);
            
            listItem.appendChild(memberInfoDiv);
            listItem.appendChild(statusDiv);
            teamLobbyList.appendChild(listItem);
        });
    }

    function simulateLoading(scenarioId, mode) {
        let progress = 0;
        let intervalTime = 100; // ms for faster demo, adjust for realistic feel (e.g. 200-500ms)
        const totalDuration = 5000; // 5 seconds for demo
        const steps = totalDuration / intervalTime;
        const increment = 100 / steps;
        const loadingMessages = [
            { percent: 0, key: 'loading_status_initializing' },
            { percent: 20, key: 'loading_status_vm' },
            { percent: 40, key: 'loading_status_network' },
            { percent: 60, key: 'loading_status_assets' },
            { percent: 80, key: 'loading_status_finalizing' },
            { percent: 100, key: 'loading_status_ready' }
        ];
        let messageIndex = 0;
        if (loadingStatusText) loadingStatusText.textContent = getLocalizedString(loadingMessages[0].key);
        const interval = setInterval(() => {
            progress += increment;
            if (loadingProgressBar) loadingProgressBar.value = Math.min(progress, 100);
            // Update status text based on progress
            if (loadingStatusText && messageIndex < loadingMessages.length -1) {
                if (progress >= loadingMessages[messageIndex + 1].percent) {
                    messageIndex++;
                    loadingStatusText.textContent = getLocalizedString(loadingMessages[messageIndex].key);
                }
            }
            if (progress >= 100) {
                clearInterval(interval);
                if (loadingStatusText) loadingStatusText.textContent = getLocalizedString('loading_status_ready');
                // Redirect to the architecture page instead of questions page
                const userType = document.body.dataset.userType || 'trainee_general';
                window.location.href = `trainee_architecture.html?scenarioId=${scenarioId}&userType=${userType}`;
            }
        }, intervalTime);
    }

    // --- Initialization ---
    const urlParams = new URLSearchParams(window.location.search);
    const scenarioId = urlParams.get('scenarioId');
    const mode = urlParams.get('mode') || 'team'; // Changed default to 'team' instead of 'individual'

    if (scenarioId) {
        displayScenarioInfo(scenarioId);
        if (mode === 'team' && teamLobbySection) {
            teamLobbySection.classList.remove('hidden');
            
            // Get team members from scenario data
            const scenarioData = scenarios[scenarioId];
            if (scenarioData && scenarioData.teamMembers) {
                updateTeamLobby(scenarioData.teamMembers);
                
                // Simulate other members joining with more realistic timing
                setTimeout(() => {
                    if (scenarioData.teamMembers.length > 1) {
                        scenarioData.teamMembers[1].connected = true;
                        updateTeamLobby(scenarioData.teamMembers);
                    }
                }, 1500);
                
                setTimeout(() => {
                    if (scenarioData.teamMembers.length > 2) {
                        scenarioData.teamMembers[2].connected = true;
                        updateTeamLobby(scenarioData.teamMembers);
                    }
                }, 2800);
                
                setTimeout(() => {
                    if (scenarioData.teamMembers.length > 3) {
                        scenarioData.teamMembers[3].connected = true;
                        updateTeamLobby(scenarioData.teamMembers);
                    }
                }, 3700);
            } else {
                // Fallback to generic team if scenario doesn't define one
                const initialTeam = [
                    { nameKey: 'team_member1_name', connected: true, roleKey: 'role_security_analyst' },
                    { nameKey: 'team_member2_name', connected: false, roleKey: 'role_soc_manager' },
                    { nameKey: 'team_member3_name_waiting', connected: false, roleKey: 'role_ir_lead' }
                ];
                updateTeamLobby(initialTeam);
                
                // Simulate other members joining
                setTimeout(() => {
                    initialTeam[1].connected = true;
                    updateTeamLobby(initialTeam);
                }, 2000);
                
                setTimeout(() => {
                    initialTeam[2].connected = true;
                    updateTeamLobby(initialTeam);
                }, 3500);
            }
        }
        simulateLoading(scenarioId, mode);
    } else {
        if (scenarioTitleDisplay) scenarioTitleDisplay.textContent = "שגיאה: לא נבחר תרחיש.";
        if (loadingProgressBar) loadingProgressBar.value = 0;
        if (loadingStatusText) loadingStatusText.textContent = "לא ניתן להתחיל סימולציה ללא מזהה תרחיש.";
        console.error('Scenario ID not found in URL parameters.');
    }

    // Handle language change for dynamically added texts
    window.updatePageSpecificTranslations = function(langPack, lang) {
        if (scenarioId) { // Re-display scenario info if language changes
            displayScenarioInfo(scenarioId);
        }
        
        // Update loading status text if visible
        if (loadingStatusText && loadingProgressBar && loadingProgressBar.value < 100) {
            const currentProgress = loadingProgressBar.value;
            const loadingMessages = [
                { percent: 0, key: 'loading_status_initializing' },
                { percent: 20, key: 'loading_status_vm' },
                { percent: 40, key: 'loading_status_network' },
                { percent: 60, key: 'loading_status_assets' },
                { percent: 80, key: 'loading_status_finalizing' },
                { percent: 100, key: 'loading_status_ready' }
            ];
            let currentMessageKey = loadingMessages[0].key;
            for(let i = 0; i < loadingMessages.length; i++){
                if(currentProgress >= loadingMessages[i].percent){
                    currentMessageKey = loadingMessages[i].key;
                } else {
                    break;
                }
            }
            loadingStatusText.textContent = getLocalizedString(currentMessageKey, lang);
        }
        
        // Re-populate team lobby if visible
        if (mode === 'team' && teamLobbySection && !teamLobbySection.classList.contains('hidden')) {
            const scenarioData = scenarios[scenarioId];
            if (scenarioData && scenarioData.teamMembers) {
                updateTeamLobby(scenarioData.teamMembers);
            }
        }
    };
    
    // Force translation application when the page loads
    setTimeout(() => {
        if (typeof window.applyTranslationsGlobal === 'function') {
            window.applyTranslationsGlobal();
        }
    }, 300);
});