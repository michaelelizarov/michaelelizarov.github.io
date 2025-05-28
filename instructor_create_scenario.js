// instructor_create_scenario.js
'use strict';
document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Elements ---
    const createScenarioForm = document.getElementById('createScenarioForm');
    // Environment Configuration
    const infraTypeSelect = document.getElementById('infra-type');
    const cloudProviderSection = document.getElementById('cloud-provider-section');
    const cloudProviderSelect = document.getElementById('cloud-provider'); // For dynamic show/hide
    const cloudProviderArchDisplay = document.getElementById('selected-cloud-provider-arch'); // For architecture map
    const cloudArchZone = document.getElementById('cloud-arch-zone'); // The actual architecture zone for cloud
    // Architecture Map
    const architectureGrid = document.querySelector('.architecture-grid'); // The main grid
    const availableComponentsList = document.querySelector('.components-list');
    let draggableItems = [];
    let dropZones = [];
    let currentDraggedItem = null;
    let scenarioArchitecture = {}; // To store the state of the architecture map
    // MITRE Builder
    const mitreBuilderContainer = document.getElementById('mitreBuilderContainer');
    const mitreGridPlaceholder = document.getElementById('mitreGridPlaceholder');
    const selectedMitrePathArea = document.getElementById('selectedMitrePathArea');
    const selectedMitreTechniquesInput = document.getElementById('selectedMitreTechniquesInput');
    let selectedMitreTechniques = [];
    let mitreAttackData = {}; // Will be populated by getMitreData()
    // Action Buttons
    const previewScenarioBtn = document.getElementById('preview-scenario-btn');
    const saveScenarioBtn = document.getElementById('save-scenario-btn');
    const getLocalizedString = typeof window.getTranslatedStringGlobal === 'function' ?
        window.getTranslatedStringGlobal :
        function(key, replacements = {}, lang = 'he') { console.warn('getTranslatedStringGlobal not found for key:', key); return `[${key}]`; };
    // --- Environment Configuration Logic ---
    function handleInfraTypeChange() {
        if (!infraTypeSelect || !cloudProviderSection || !cloudArchZone || !cloudProviderArchDisplay) return;
        const selectedInfra = infraTypeSelect.value;
        const showCloud = selectedInfra === 'cloud' || selectedInfra === 'hybrid';
        cloudProviderSection.classList.toggle('hidden', !showCloud);
        cloudArchZone.classList.toggle('hidden', !showCloud);
        if (showCloud && cloudProviderSelect) {
            cloudProviderArchDisplay.textContent = cloudProviderSelect.options[cloudProviderSelect.selectedIndex].text;
        } else {
            cloudProviderArchDisplay.textContent = '';
        }
    }
    if (infraTypeSelect) {
        infraTypeSelect.addEventListener('change', handleInfraTypeChange);
        // Initial call to set visibility based on default selection
        handleInfraTypeChange();
    }
    if(cloudProviderSelect && cloudProviderArchDisplay && cloudArchZone){ // Update arch map label on cloud provider change
        cloudProviderSelect.addEventListener('change', () => {
            if (!cloudArchZone.classList.contains('hidden')) {
                 cloudProviderArchDisplay.textContent = cloudProviderSelect.options[cloudProviderSelect.selectedIndex].text;
            }
        });
    }
    // --- Architecture Map Logic (Basic Drag & Drop Setup) ---
    function initializeDraggableComponents() {
        if (!availableComponentsList) return;
        draggableItems = availableComponentsList.querySelectorAll('.vendor-item-draggable');
        draggableItems.forEach(item => {
            item.addEventListener('dragstart', handleDragStart);
            item.addEventListener('dragend', handleDragEnd);
        });
    }
    function initializeDropZones() {
        if (!architectureGrid) return;
        dropZones = architectureGrid.querySelectorAll('.drop-zone');
        dropZones.forEach(zone => {
            zone.addEventListener('dragover', handleDragOver);
            zone.addEventListener('dragleave', handleDragLeave);
            zone.addEventListener('drop', handleDrop);
        });
    }
    function handleDragStart(e) {
        currentDraggedItem = this; // `this` is the dragged item
        const itemData = {
            name: this.dataset.vendorName,
            type: this.dataset.type,
            icon: this.querySelector('img') ? this.querySelector('img').src : null,
            htmlContent: this.innerHTML // Or just specific parts
        };
        e.dataTransfer.setData('application/json', JSON.stringify(itemData));
        e.dataTransfer.effectAllowed = 'copy'; // or 'move' if items are removed from sidebar
        // Optionally add a class to the dragged item for visual feedback
        setTimeout(() => this.classList.add('dragging-from-list'), 0);
    }
    function handleDragEnd(e) {
        this.classList.remove('dragging-from-list');
        currentDraggedItem = null;
    }
    function handleDragOver(e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'copy'; // or 'move'
        this.classList.add('drag-over');
    }
    function handleDragLeave(e) {
        this.classList.remove('drag-over');
    }
    function handleDrop(e) {
        e.preventDefault();
        this.classList.remove('drag-over');
        const targetZone = this;
        const zoneType = targetZone.dataset.zoneType;
        try {
            const data = JSON.parse(e.dataTransfer.getData('application/json'));
            addDroppedItemToZone(targetZone, data, zoneType);
        } catch (error) {
            console.error("Error processing dropped data:", error);
        }
    }
    function addDroppedItemToZone(zone, itemData, zoneType) {
        const placeholder = zone.querySelector('.drop-placeholder');
        if (placeholder) placeholder.style.display = 'none';
        const droppedItemEl = document.createElement('div');
        droppedItemEl.className = 'dropped-item'; // Defined in style.css
        droppedItemEl.dataset.vendorName = itemData.name;
        droppedItemEl.dataset.vendorType = itemData.type;
        if(itemData.icon) droppedItemEl.dataset.icon = itemData.icon;
        // Recreate content, e.g., image and name
        if (itemData.icon) {
            const img = document.createElement('img');
            img.src = itemData.icon;
            img.alt = itemData.name;
            // Handle specific logo styling for dark theme as in the component list
            if (itemData.icon.includes("pfsense") || itemData.icon.includes("apache") || itemData.icon.includes("mysql") || itemData.icon.includes("wazuh") || itemData.icon.includes("fedoraproject") || itemData.icon.includes("modsecurity") || itemData.icon.includes("snort") || itemData.icon.includes("suricata")) {
                img.classList.add('logo-img-dark-static', 'bg-white', 'p-0.5', 'rounded');
            } else {
                img.classList.add('logo-img-light-static');
            }
            img.onerror = function() { this.style.display='none'; droppedItemEl.classList.add('img-error'); };
            droppedItemEl.appendChild(img);
        }
        const nameSpan = document.createElement('span');
        nameSpan.textContent = itemData.name;
        droppedItemEl.appendChild(nameSpan);
        const removeBtn = document.createElement('button');
        removeBtn.type = 'button';
        removeBtn.className = 'remove-item-btn';
        removeBtn.innerHTML = '&times;';
        removeBtn.setAttribute('aria-label', getLocalizedString('remove_item_tooltip') || 'Remove');
        removeBtn.title = getLocalizedString('remove_item_tooltip') || 'Remove';
        removeBtn.onclick = () => {
            droppedItemEl.remove();
            if (zone.querySelectorAll('.dropped-item').length === 0 && placeholder) {
                placeholder.style.display = 'block';
            }
            updateScenarioArchitectureData();
        };
        droppedItemEl.appendChild(removeBtn);
        zone.appendChild(droppedItemEl);
        updateScenarioArchitectureData();
    }
    function updateScenarioArchitectureData() {
        scenarioArchitecture = {};
        dropZones.forEach(zone => {
            const zoneType = zone.dataset.zoneType;
            scenarioArchitecture[zoneType] = [];
            zone.querySelectorAll('.dropped-item').forEach(itemEl => {
                scenarioArchitecture[zoneType].push({
                    name: itemEl.dataset.vendorName,
                    type: itemEl.dataset.vendorType,
                    icon: itemEl.dataset.icon || (itemEl.querySelector('img') ? itemEl.querySelector('img').src : null)
                });
            });
        });
        // console.log("Current Architecture:", scenarioArchitecture);
    }
    // --- MITRE ATT&CK Builder Logic (Integrated from instructor_create_scenario.js) ---
    function getMitreData() { // Simulates fetching/defining MITRE data
        // Using the structure from app-global translations for tactics and techniques
        const tacticsOrder = [
            "TA0042", "TA0001", "TA0002", "TA0003", "TA0004", "TA0005",
            "TA0006", "TA0007", "TA0008", "TA0009", "TA0010", "TA0011",
            "TA0012", "TA0040"
        ];
        
        // Define comprehensive techniques for each tactic (at least 5 per tactic)
        const tacticTechniques = {
            "TA0042": [ // Resource Development
                { id: "T1583", nameKey: "mitre_tech_t1583" }, // Acquire Infrastructure
                { id: "T1584", nameKey: "mitre_tech_t1584" }, // Compromise Infrastructure
                { id: "T1585", nameKey: "mitre_tech_t1585" }, // Establish Accounts
                { id: "T1586", nameKey: "mitre_tech_t1586" }, // Compromise Accounts
                { id: "T1587", nameKey: "mitre_tech_t1587" }, // Develop Capabilities
                { id: "T1588", nameKey: "mitre_tech_t1588" }  // Obtain Capabilities
            ],
            "TA0001": [ // Initial Access
                { id: "T1566", nameKey: "mitre_tech_t1566" }, // Phishing
                { id: "T1190", nameKey: "mitre_tech_t1190" }, // Exploit Public-Facing Application
                { id: "T1133", nameKey: "mitre_tech_t1133" }, // External Remote Services
                { id: "T1200", nameKey: "mitre_tech_t1200" }, // Hardware Additions
                { id: "T1078", nameKey: "mitre_tech_t1078" }, // Valid Accounts
                { id: "T1195", nameKey: "mitre_tech_t1195" }  // Supply Chain Compromise
            ],
            "TA0002": [ // Execution
                { id: "T1059", nameKey: "mitre_tech_t1059" }, // Command and Scripting Interpreter
                { id: "T1053", nameKey: "mitre_tech_t1053" }, // Scheduled Task/Job
                { id: "T1203", nameKey: "mitre_tech_t1203" }, // Exploitation for Client Execution
                { id: "T1204", nameKey: "mitre_tech_t1204" }, // User Execution
                { id: "T1047", nameKey: "mitre_tech_t1047" }, // Windows Management Instrumentation
                { id: "T1106", nameKey: "mitre_tech_t1106" }  // Native API
            ],
            "TA0003": [ // Persistence
                { id: "T1543", nameKey: "mitre_tech_t1543" }, // Create or Modify System Process
                { id: "T1547", nameKey: "mitre_tech_t1547" }, // Boot or Logon Autostart Execution
                { id: "T1098", nameKey: "mitre_tech_t1098" }, // Account Manipulation
                { id: "T1136", nameKey: "mitre_tech_t1136" }, // Create Account
                { id: "T1053", nameKey: "mitre_tech_t1053" }, // Scheduled Task/Job
                { id: "T1505", nameKey: "mitre_tech_t1505" }  // Server Software Component
            ],
            "TA0004": [ // Privilege Escalation
                { id: "T1055", nameKey: "mitre_tech_t1055" }, // Process Injection
                { id: "T1134", nameKey: "mitre_tech_t1134" }, // Access Token Manipulation
                { id: "T1068", nameKey: "mitre_tech_t1068" }, // Exploitation for Privilege Escalation
                { id: "T1078", nameKey: "mitre_tech_t1078" }, // Valid Accounts
                { id: "T1548", nameKey: "mitre_tech_t1548" }, // Abuse Elevation Control Mechanism
                { id: "T1574", nameKey: "mitre_tech_t1574" }  // Hijack Execution Flow
            ],
            "TA0005": [ // Defense Evasion
                { id: "T1070", nameKey: "mitre_tech_t1070" }, // Indicator Removal
                { id: "T1036", nameKey: "mitre_tech_t1036" }, // Masquerading
                { id: "T1055", nameKey: "mitre_tech_t1055" }, // Process Injection
                { id: "T1140", nameKey: "mitre_tech_t1140" }, // Deobfuscate/Decode Files or Information
                { id: "T1562", nameKey: "mitre_tech_t1562" }, // Impair Defenses
                { id: "T1112", nameKey: "mitre_tech_t1112" }  // Modify Registry
            ],
            "TA0006": [ // Credential Access
                { id: "T1003", nameKey: "mitre_tech_t1003" }, // OS Credential Dumping
                { id: "T1110", nameKey: "mitre_tech_t1110" }, // Brute Force
                { id: "T1555", nameKey: "mitre_tech_t1555" }, // Credentials from Password Stores
                { id: "T1552", nameKey: "mitre_tech_t1552" }, // Unsecured Credentials
                { id: "T1056", nameKey: "mitre_tech_t1056" }, // Input Capture
                { id: "T1558", nameKey: "mitre_tech_t1558" }  // Steal or Forge Kerberos Tickets
            ],
            "TA0007": [ // Discovery
                { id: "T1057", nameKey: "mitre_tech_t1057" }, // Process Discovery
                { id: "T1082", nameKey: "mitre_tech_t1082" }, // System Information Discovery
                { id: "T1016", nameKey: "mitre_tech_t1016" }, // System Network Configuration Discovery
                { id: "T1033", nameKey: "mitre_tech_t1033" }, // System Owner/User Discovery
                { id: "T1018", nameKey: "mitre_tech_t1018" }, // Remote System Discovery
                { id: "T1083", nameKey: "mitre_tech_t1083" }  // File and Directory Discovery
            ],
            "TA0008": [ // Lateral Movement
                { id: "T1021", nameKey: "mitre_tech_t1021" }, // Remote Services
                { id: "T1570", nameKey: "mitre_tech_t1570" }, // Lateral Tool Transfer
                { id: "T1080", nameKey: "mitre_tech_t1080" }, // Taint Shared Content
                { id: "T1210", nameKey: "mitre_tech_t1210" }, // Exploitation of Remote Services
                { id: "T1550", nameKey: "mitre_tech_t1550" }, // Use Alternate Authentication Material
                { id: "T1534", nameKey: "mitre_tech_t1534" }  // Internal Spearphishing
            ],
            "TA0009": [ // Collection
                { id: "T1560", nameKey: "mitre_tech_t1560" }, // Archive Collected Data
                { id: "T1074", nameKey: "mitre_tech_t1074" }, // Data Staged
                { id: "T1114", nameKey: "mitre_tech_t1114" }, // Email Collection
                { id: "T1056", nameKey: "mitre_tech_t1056" }, // Input Capture
                { id: "T1005", nameKey: "mitre_tech_t1005" }, // Data from Local System
                { id: "T1039", nameKey: "mitre_tech_t1039" }  // Data from Network Shared Drive
            ],
            "TA0010": [ // Exfiltration
                { id: "T1041", nameKey: "mitre_tech_t1041" }, // Exfiltration Over C2 Channel
                { id: "T1048", nameKey: "mitre_tech_t1048" }, // Exfiltration Over Alternative Protocol
                { id: "T1567", nameKey: "mitre_tech_t1567" }, // Exfiltration Over Web Service
                { id: "T1029", nameKey: "mitre_tech_t1029" }, // Scheduled Transfer
                { id: "T1537", nameKey: "mitre_tech_t1537" }, // Transfer Data to Cloud Account
                { id: "T1020", nameKey: "mitre_tech_t1020" }  // Automated Exfiltration
            ],
            "TA0011": [ // Command and Control
                { id: "T1071", nameKey: "mitre_tech_t1071" }, // Application Layer Protocol
                { id: "T1573", nameKey: "mitre_tech_t1573" }, // Encrypted Channel
                { id: "T1090", nameKey: "mitre_tech_t1090" }, // Proxy
                { id: "T1219", nameKey: "mitre_tech_t1219" }, // Remote Access Software
                { id: "T1102", nameKey: "mitre_tech_t1102" }, // Web Service
                { id: "T1105", nameKey: "mitre_tech_t1105" }  // Ingress Tool Transfer
            ],
            "TA0012": [ // Impact
                { id: "T1486", nameKey: "mitre_tech_t1486" }, // Data Encrypted for Impact
                { id: "T1485", nameKey: "mitre_tech_t1485" }, // Data Destruction
                { id: "T1489", nameKey: "mitre_tech_t1489" }, // Service Stop
                { id: "T1490", nameKey: "mitre_tech_t1490" }, // Inhibit System Recovery
                { id: "T1491", nameKey: "mitre_tech_t1491" }, // Defacement
                { id: "T1561", nameKey: "mitre_tech_t1561" }  // Disk Wipe
            ],
            "TA0040": [ // Reconnaissance
                { id: "T1595", nameKey: "mitre_tech_t1595" }, // Active Scanning
                { id: "T1592", nameKey: "mitre_tech_t1592" }, // Gather Victim Host Information
                { id: "T1589", nameKey: "mitre_tech_t1589" }, // Gather Victim Identity Information
                { id: "T1590", nameKey: "mitre_tech_t1590" }, // Gather Victim Network Information
                { id: "T1591", nameKey: "mitre_tech_t1591" }, // Gather Victim Org Information
                { id: "T1598", nameKey: "mitre_tech_t1598" }  // Phishing for Information
            ]
        };
        
        mitreAttackData = tacticsOrder.map(tacticID => {
            const techniques = tacticTechniques[tacticID] || [];
            
            // Add placeholder techniques if not enough defined
            if (techniques.length < 5) {
                for (let i = techniques.length; i < 5; i++) {
                    techniques.push({
                        id: `${tacticID.substring(2)}.${i+1}`,
                        nameKey: `mitre_tech_generic_${i+1}`
                    });
                }
            }
            
            return {
                id: tacticID,
                nameKey: `mitre_tactic_${tacticID.toLowerCase()}`,
                techniques: techniques
            };
        });
    }
    function renderMitreGrid() {
        if (!mitreGridPlaceholder) return;
        mitreGridPlaceholder.innerHTML = '';
        if (Object.keys(mitreAttackData).length === 0) {
            mitreGridPlaceholder.textContent = getLocalizedString('loading_mitre_data');
            return;
        }
        mitreAttackData.forEach(tactic => {
            const tacticCol = document.createElement('div');
            tacticCol.className = 'tactic-column';
            const tacticTitleText = getLocalizedString(tactic.nameKey);
            tacticCol.innerHTML = `
                <h5 class="tactic-title">${tacticTitleText}</h5>
                <div class="tactic-id-display">(${tactic.id})</div>
            `;
            const techList = document.createElement('ul');
            techList.className = 'techniques-list space-y-1';
            tactic.techniques.forEach(tech => {
                const techItem = document.createElement('li');
                techItem.className = 'technique-item';
                const label = document.createElement('label');
                label.className = 'form-checkbox-label text-sm';
                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.className = 'form-checkbox';
                checkbox.value = tech.id;
                checkbox.dataset.tacticId = tactic.id;
                checkbox.dataset.techniqueName = getLocalizedString(tech.nameKey) || tech.id;
                if (selectedMitreTechniques.includes(tech.id)) checkbox.checked = true;
                checkbox.addEventListener('change', handleTechniqueSelection);
                label.appendChild(checkbox);
                const techNameSpan = document.createElement('span');
                techNameSpan.textContent = ` ${getLocalizedString(tech.nameKey) || tech.id}`;
                label.appendChild(techNameSpan);
                techItem.appendChild(label);
                techList.appendChild(techItem);
            });
            tacticCol.appendChild(techList);
            mitreGridPlaceholder.appendChild(tacticCol);
        });
        updateSelectedMitrePathPreview();
    }
    function handleTechniqueSelection(event) {
        const checkbox = event.target;
        const techniqueId = checkbox.value;
        selectedMitreTechniques = selectedMitreTechniques.filter(id => id !== techniqueId); // Remove if exists
        if (checkbox.checked) {
            selectedMitreTechniques.push(techniqueId);
        }
        updateSelectedMitrePathPreview();
        updateMitreHiddenInput();
    }
    function updateSelectedMitrePathPreview() {
        if (!selectedMitrePathArea) return;
        if (selectedMitreTechniques.length === 0) {
            selectedMitrePathArea.innerHTML = `<span class="text-subtitle">${getLocalizedString('no_techniques_selected_yet')}</span>`;
            return;
        }
        selectedMitrePathArea.innerHTML = '';
        selectedMitreTechniques.forEach(techId => {
            const checkbox = mitreGridPlaceholder.querySelector(`input[type="checkbox"][value="${techId}"]`);
            const techName = checkbox ? checkbox.dataset.techniqueName : techId;
            const tag = document.createElement('span');
            tag.className = 'technique-tag';
            tag.textContent = `${techName}`; // Removed (${techId}) for cleaner look, name already has it
            selectedMitrePathArea.appendChild(tag);
        });
    }
    function updateMitreHiddenInput() {
        if (selectedMitreTechniquesInput) {
            selectedMitreTechniquesInput.value = selectedMitreTechniques.join(',');
        }
    }
    // MITRE section is now always visible, no toggle needed
    // --- Form Submission ---
    if (createScenarioForm) {
        createScenarioForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const formData = new FormData(createScenarioForm);
            const scenarioData = {};
            formData.forEach((value, key) => {
                // Handle arrays from multi-select fields
                if (key.endsWith('[]')) { // Handle multi-select like checkboxes
                    if (!scenarioData[key.slice(0,-2)]) scenarioData[key.slice(0,-2)] = [];
                    scenarioData[key.slice(0,-2)].push(value);
                } else {
                    scenarioData[key] = value;
                }
            });
            scenarioData.architecture = scenarioArchitecture; // Add data from drag & drop
            scenarioData.selectedMitreTechniques = selectedMitreTechniques; // Add MITRE data
            console.log("Scenario Data to Save:", JSON.stringify(scenarioData, null, 2));
            alert(getLocalizedString('alert_scenario_saved_successfully')); // Add to translations
        });
    }
    if(previewScenarioBtn){
        previewScenarioBtn.addEventListener('click', () => {
            // Logic for scenario preview (e.g., open a new tab with a read-only view, or show a modal)
            alert(getLocalizedString('preview_scenario_functionality_placeholder')); // Add to translations
        });
    }
    // --- Initialization ---
    function initializePage() {
        if (typeof getLocalizedString === 'function' && window.translations &&
            Object.keys(window.translations[window.currentLang || 'he'] || {}).length > 10) {
            handleInfraTypeChange(); // Call once for initial state
            initializeDraggableComponents();
            initializeDropZones();
            getMitreData(); // Load MITRE data structure
            renderMitreGrid(); // Then render the grid
        } else {
            setTimeout(initializePage, 150);
        }
    }
    setTimeout(initializePage, 100);
    window.updatePageSpecificTranslations = function(langPack, lang) {
        // Re-render dynamic parts that depend on translations
        handleInfraTypeChange(); // Updates cloud provider name if visible
        // Re-render available components if their names are translated (less critical as they are mostly icons)
        // Re-render items in drop zones IF their display names were based on translation keys directly
        if(Object.keys(mitreAttackData).length > 0) renderMitreGrid(); // Re-render MITRE grid
    };
    // Add new translation keys if needed
    if (window.translations) {
        const he = window.translations.he;
        const en = window.translations.en;
        if (he) {
            he.alert_scenario_saved_successfully = he.alert_scenario_saved_successfully || "התרחיש נשמר בהצלחה (סימולציה).";
            he.preview_scenario_functionality_placeholder = he.preview_scenario_functionality_placeholder || "פונקציונליות תצוגה מקדימה תמומש כאן.";
            he.collapse_button = he.collapse_button || "צמצם";
        }
        if (en) {
            en.alert_scenario_saved_successfully = en.alert_scenario_saved_successfully || "Scenario saved successfully (mock).";
            en.preview_scenario_functionality_placeholder = en.preview_scenario_functionality_placeholder || "Preview functionality will be implemented here.";
            en.collapse_button = en.collapse_button || "Collapse";
        }
    }
});