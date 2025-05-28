// instructor_edit_scenario.js
'use strict';
document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Elements ---
    const editScenarioForm = document.getElementById('editScenarioForm');
    const editingScenarioNameDisplay = document.getElementById('editing-scenario-name');
    const wizardSteps = document.querySelectorAll('.wizard-step');
    const wizardProgressBar = document.getElementById('wizard-progress-bar');
    const prevStepBtn = document.getElementById('prev-step-btn');
    const nextStepBtn = document.getElementById('next-step-btn');
    const saveChangesBtn = document.getElementById('save-changes-btn');
    const currentStepDisplay = document.getElementById('current-step-display');
    let currentStep = 0;
    const totalSteps = wizardSteps.length > 0 ? wizardSteps.length : 4; // Default to 4 if not found
    // Step 1 Elements
    const scenarioNameInputEdit = document.getElementById('scenario-name-edit');
    const scenarioDifficultySelectEdit = document.getElementById('scenario-difficulty-edit');
    const scenarioDescriptionTextareaEdit = document.getElementById('scenario-description-edit');
    const mitreTagsInputEdit = document.getElementById('mitre-tags-edit');
    const mitreTagsDisplayEdit = document.getElementById('mitre-tags-display-edit');
    let currentMitreTagsEdit = [];
    // Step 2 Elements
    const orgTypeSelectEdit = document.getElementById('org-type-edit');
    const serviceTypeSelectEdit = document.getElementById('service-type-edit');
    const infraTypeSelectEdit = document.getElementById('infra-type-edit');
    const cloudProviderSectionEdit = document.getElementById('cloud-provider-section-edit');
    const cloudProviderSelectEdit = document.getElementById('cloud-provider-edit');
    const osTypeCheckboxesEdit = document.querySelectorAll('input[name="os_type_edit[]"]');
    const containerizationSelectEdit = document.getElementById('containerization-edit');
    const openSourceDefenseSelectEdit = document.getElementById('open-source-defense-edit');
    const cloudProviderArchDisplayEdit = document.getElementById('selected-cloud-provider-arch-edit');
    const cloudArchZoneEdit = document.getElementById('cloud-arch-zone-edit');
    const architectureMapEditContainer = document.getElementById('architecture-map-edit-placeholder');
    let architectureDropZonesEdit = [];
    let scenarioArchitectureEdit = {};
    // Step 3 Elements (MITRE)
    const toggleMitreSectionBtnEdit = document.getElementById('toggleMitreSectionEdit');
    const mitreBuilderContainerEdit = document.getElementById('mitreBuilderContainerEdit');
    const mitreGridPlaceholderEdit = document.getElementById('mitreGridPlaceholderEdit');
    const selectedMitrePathAreaEdit = document.getElementById('selectedMitrePathAreaEdit');
    const selectedMitreTechniquesInputEdit = document.getElementById('selectedMitreTechniquesInputEdit');
    let loadedMitreTechniques = [];
    let mitreAttackDataForEdit = [];
    // Step 4 Elements (Defense Systems)
    const defenseSystemSelectIds = [
        'firewall-vendor-edit', 'epp-edr-vendor-edit', 'siem-vendor-edit',
        'waf-vendor-edit', 'ips-ids-vendor-edit', 'ndr-vendor-edit', 'xdr-vendor-edit'
    ];
    const getLocalizedString = typeof window.getTranslatedStringGlobal === 'function' ?
        window.getTranslatedStringGlobal :
        function(key, replacements = {}) { console.warn('getTranslatedStringGlobal not found for key:', key); return `[${key}]`; };
    const existingScenarioDataStore = {
        "scenario_xyz123": {
            id: "scenario_xyz123", name: "מתקפת כופר מתקדמת על בנק", difficulty: "hard",
            description: "תרחיש המדמה מתקפת כופר רב-שלבית ומתוחכמת על תשתיות בנק גדול. המטרה היא לזהות את וקטור התקיפה, לעצור את ההתפשטות, ולשחזר מערכות קריטיות תוך צמצום נזקים.",
            mitreTags: "T1486,TA0040,T1059.003", orgType: "finance", serviceType: "internal_systems",
            infraType: "hybrid", cloudProvider: "aws", osTypes: ["windows_server", "linux_server", "windows_client"],
            containerization: "yes_docker", openSourceDefense: "partial",
            defenseSystems: {
                firewallVendorEdit: "paloalto_fw", eppEdrVendorEdit: "crowdstrike_falcon", siemVendorEdit: "splunk_es",
                wafVendorEdit: "cloudflare_waf", ipsIdsVendorEdit: "suricata_os", ndrVendorEdit: "", xdrVendorEdit: "paloalto_cortex_xdr"
            },
            architecture: {
                "external": [{ name: "Cloudflare WAF", type: "waf", icon: "https://logo.clearbit.com/cloudflare.com" }],
                "perimeter-security": [{ name: "Palo Alto Firewall", type: "firewall", icon: "https://logo.clearbit.com/paloaltonetworks.com" }],
                "dmz": [{ name: "Web Server (Apache)", type: "server_app", icon: "https://www.apache.org/img/asf_logo.png" }],
                "internal-core": [{ name: "Windows Server 2022", type: "server_os", icon: "https://logo.clearbit.com/microsoft.com" }, { name: "Splunk SIEM", type: "siem", icon: "https://logo.clearbit.com/splunk.com" }],
                "management": [{ name: "Wazuh", type: "siem_ids_os", icon: "https://wazuh.com/wp-content/uploads/2021/03/wazuh-logo-500.png" }],
                "cloud": [{ name: "AWS EC2 Instance", type: "cloud_vm", icon: "https://logo.clearbit.com/aws.amazon.com" }]
            },
            selectedMitreTechniques: ["T1566.001", "T1059.003", "T1486"]
        }
    };
    function updateWizardStep(newStepIndex) {
        wizardSteps.forEach((step, index) => {
            step.classList.toggle('wizard-step-active', index === newStepIndex);
        });
        currentStep = newStepIndex;
        const progressPercentage = ((currentStep + 1) / totalSteps) * 100;
        if (wizardProgressBar) wizardProgressBar.style.width = `${progressPercentage}%`;
        if (prevStepBtn) prevStepBtn.disabled = currentStep === 0;
        if (nextStepBtn) nextStepBtn.classList.toggle('hidden', currentStep === totalSteps - 1);
        if (saveChangesBtn) saveChangesBtn.classList.toggle('hidden', currentStep !== totalSteps - 1);
        if(currentStepDisplay) currentStepDisplay.textContent = getLocalizedString('step_counter_text', { current: currentStep + 1, total: totalSteps });
    }
    if (nextStepBtn && wizardSteps.length > 0) nextStepBtn.addEventListener('click', () => { if (currentStep < totalSteps - 1) updateWizardStep(currentStep + 1); });
    if (prevStepBtn && wizardSteps.length > 0) prevStepBtn.addEventListener('click', () => { if (currentStep > 0) updateWizardStep(currentStep - 1); });
    function renderMitreTagsEdit() {
        if (!mitreTagsDisplayEdit) return;
        mitreTagsDisplayEdit.innerHTML = '';
        currentMitreTagsEdit.forEach((tag, index) => {
            const tagElement = document.createElement('span');
            tagElement.className = 'tag-display-item bg-primary text-primary-text text-xs font-medium me-2 px-2.5 py-0.5 rounded-full';
            tagElement.textContent = tag;
            const removeBtn = document.createElement('button');
            removeBtn.type = 'button';
            removeBtn.className = 'tag-remove-btn ml-1 rtl:mr-1 rtl:ml-0 text-primary-text hover:font-bold';
            removeBtn.innerHTML = '&times;';
            removeBtn.setAttribute('aria-label', `Remove tag ${tag}`);
            removeBtn.onclick = () => {
                currentMitreTagsEdit.splice(index, 1);
                if (mitreTagsInputEdit) mitreTagsInputEdit.value = currentMitreTagsEdit.join(', ');
                renderMitreTagsEdit();
            };
            tagElement.appendChild(removeBtn);
            mitreTagsDisplayEdit.appendChild(tagElement);
        });
    }
    if (mitreTagsInputEdit) {
        mitreTagsInputEdit.addEventListener('change', () => { // Use change for when user unfocuses or presses Enter implicitly
            const newTags = mitreTagsInputEdit.value.split(',').map(tag => tag.trim()).filter(tag => tag !== '');
            currentMitreTagsEdit = [...new Set(newTags)]; // Use Set to ensure uniqueness
            mitreTagsInputEdit.value = currentMitreTagsEdit.join(', '); // Update input with cleaned tags
            renderMitreTagsEdit();
        });
    }
    function handleInfraTypeChangeEdit() {
        if (!infraTypeSelectEdit || !cloudProviderSectionEdit || !cloudArchZoneEdit || !cloudProviderArchDisplayEdit) return;
        const selectedInfra = infraTypeSelectEdit.value;
        const showCloud = selectedInfra === 'cloud' || selectedInfra === 'hybrid';
        cloudProviderSectionEdit.classList.toggle('hidden', !showCloud);
        cloudArchZoneEdit.classList.toggle('hidden', !showCloud);
        if (showCloud && cloudProviderSelectEdit) {
            cloudProviderArchDisplayEdit.textContent = cloudProviderSelectEdit.options[cloudProviderSelectEdit.selectedIndex]?.text || '';
        } else {
            cloudProviderArchDisplayEdit.textContent = '';
        }
    }
    if (infraTypeSelectEdit) {
        infraTypeSelectEdit.addEventListener('change', handleInfraTypeChangeEdit);
    }
    if(cloudProviderSelectEdit && cloudProviderArchDisplayEdit && cloudArchZoneEdit){
        cloudProviderSelectEdit.addEventListener('change', () => {
            if (!cloudArchZoneEdit.classList.contains('hidden')) {
                 cloudProviderArchDisplayEdit.textContent = cloudProviderSelectEdit.options[cloudProviderSelectEdit.selectedIndex]?.text || '';
                 updateScenarioArchitectureDataEdit(); // Reflect change in provider in the architecture data
            }
        });
    }
    // --- Architecture Editor (Edit Mode) ---
    let draggedArchItemEdit = null;
    let originalZoneOfDraggedItemEdit = null;
    function initializeArchitectureEditorEdit(savedArchitecture) {
        if (!architectureMapEditContainer) {
            if(architectureMapEditContainer) architectureMapEditContainer.innerHTML = `<p class="text-center text-subtitle p-8">${getLocalizedString('error_loading_arch_editor_placeholder')}</p>`;
            return;
        }
        architectureDropZonesEdit = architectureMapEditContainer.querySelectorAll('.drop-zone');
        if(architectureDropZonesEdit.length === 0) {
             if(architectureMapEditContainer) architectureMapEditContainer.innerHTML = `<p class="text-center text-subtitle p-8">${getLocalizedString('error_no_drop_zones_arch_editor')}</p>`;
            return;
        }
        scenarioArchitectureEdit = JSON.parse(JSON.stringify(savedArchitecture || {}));
        architectureDropZonesEdit.forEach(zone => {
            let placeholderKey = zone.querySelector('.drop-placeholder')?.dataset.langKey || 'drop_placeholder_generic_edit';
            zone.innerHTML = `<span class="drop-placeholder" data-lang-key="${placeholderKey}">${getLocalizedString(placeholderKey)}</span>`;
            const zoneType = zone.dataset.zoneType;
            const itemsInZone = scenarioArchitectureEdit[zoneType] || [];
            const placeholderEl = zone.querySelector('.drop-placeholder');
            if (itemsInZone.length > 0 && placeholderEl) {
                placeholderEl.style.display = 'none';
            } else if (placeholderEl) {
                placeholderEl.style.display = 'block';
            }
            itemsInZone.forEach(itemData => {
                const droppedItemEl = createEditableDroppedItemDOM(itemData, zoneType);
                zone.appendChild(droppedItemEl);
            });
            zone.removeEventListener('dragover', handleArchDragOverEdit);
            zone.removeEventListener('dragleave', handleArchDragLeaveEdit);
            zone.removeEventListener('drop', handleArchDropEdit);
            zone.addEventListener('dragover', handleArchDragOverEdit);
            zone.addEventListener('dragleave', handleArchDragLeaveEdit);
            zone.addEventListener('drop', handleArchDropEdit);
        });
        updateScenarioArchitectureDataEdit(); // Ensure initial state is captured
    }
    function createEditableDroppedItemDOM(itemData, currentZoneType) {
        const droppedItemEl = document.createElement('div');
        droppedItemEl.className = 'dropped-item';
        droppedItemEl.dataset.vendorName = itemData.name;
        droppedItemEl.dataset.vendorType = itemData.type;
        if(itemData.icon) droppedItemEl.dataset.icon = itemData.icon;
        droppedItemEl.dataset.originalZoneType = currentZoneType;
        droppedItemEl.draggable = true;
        if (itemData.icon) {
            const img = document.createElement('img');
            img.src = itemData.icon;
            img.alt = itemData.name;
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
        removeBtn.setAttribute('aria-label', getLocalizedString('remove_item_tooltip'));
        removeBtn.title = getLocalizedString('remove_item_tooltip');
        removeBtn.onclick = (e) => {
            e.stopPropagation();
            const parentZone = droppedItemEl.parentElement;
            droppedItemEl.remove();
            const placeholder = parentZone.querySelector('.drop-placeholder');
            if (parentZone.querySelectorAll('.dropped-item').length === 0 && placeholder) {
                placeholder.style.display = 'block';
            }
            updateScenarioArchitectureDataEdit();
        };
        droppedItemEl.appendChild(removeBtn);
        droppedItemEl.addEventListener('dragstart', (e) => {
            draggedArchItemEdit = droppedItemEl;
            originalZoneOfDraggedItemEdit = droppedItemEl.closest('.drop-zone');
            e.dataTransfer.setData('application/json', JSON.stringify(itemData));
            e.dataTransfer.effectAllowed = 'move';
            setTimeout(() => { if(draggedArchItemEdit) draggedArchItemEdit.classList.add('dragging-existing'); }, 0);
        });
        droppedItemEl.addEventListener('dragend', () => {
            if(draggedArchItemEdit) draggedArchItemEdit.classList.remove('dragging-existing');
            draggedArchItemEdit = null;
            originalZoneOfDraggedItemEdit = null;
        });
        return droppedItemEl;
    }
    function handleArchDragOverEdit(e) { e.preventDefault(); this.classList.add('drag-over'); e.dataTransfer.dropEffect = 'move'; }
    function handleArchDragLeaveEdit(e) { this.classList.remove('drag-over'); }
    function handleArchDropEdit(e) {
        e.preventDefault();
        this.classList.remove('drag-over');
        const targetZone = this;
        if (draggedArchItemEdit && targetZone !== originalZoneOfDraggedItemEdit) {
            const targetPlaceholder = targetZone.querySelector('.drop-placeholder');
            if (targetPlaceholder) targetPlaceholder.style.display = 'none';
            targetZone.appendChild(draggedArchItemEdit);
            draggedArchItemEdit.dataset.originalZoneType = targetZone.dataset.zoneType;
            if (originalZoneOfDraggedItemEdit && originalZoneOfDraggedItemEdit.querySelectorAll('.dropped-item').length === 0) {
                const origPlaceholder = originalZoneOfDraggedItemEdit.querySelector('.drop-placeholder');
                if (origPlaceholder) origPlaceholder.style.display = 'block';
            }
            updateScenarioArchitectureDataEdit();
        }
    }
    function updateScenarioArchitectureDataEdit() {
        scenarioArchitectureEdit = {};
        if(!architectureDropZonesEdit || architectureDropZonesEdit.length === 0) return; // Guard clause
        architectureDropZonesEdit.forEach(zone => {
            const zoneType = zone.dataset.zoneType;
            scenarioArchitectureEdit[zoneType] = [];
            zone.querySelectorAll('.dropped-item').forEach(itemEl => {
                scenarioArchitectureEdit[zoneType].push({
                    name: itemEl.dataset.vendorName,
                    type: itemEl.dataset.vendorType,
                    icon: itemEl.dataset.icon || (itemEl.querySelector('img') ? itemEl.querySelector('img').src : null)
                });
            });
        });
    }
    // --- MITRE Logic (Step 3) --- (Adapted from create_scenario)
     function getMitreDataForEdit() {
        const tacticsOrder = [ "TA0042", "TA0001", "TA0002", "TA0003", "TA0004", "TA0005", "TA0006", "TA0007", "TA0008", "TA0009", "TA0010", "TA0011", "TA0012", "TA0040"];
        mitreAttackDataForEdit = tacticsOrder.map(tacticID => {
            let techniques = [];
            switch (tacticID) { // Simplified
                case "TA0001": techniques = [ { id: "T1566", nameKey: "mitre_tech_t1566" }, { id: "T1190", nameKey: "mitre_tech_t1190" }]; break;
                case "TA0002": techniques = [ { id: "T1059", nameKey: "mitre_tech_t1059" }, { id: "T1053", nameKey: "mitre_tech_t1053" }]; break;
                default:
                    techniques = [
                        { id: `${tacticID.slice(2)}.001`, nameKey: `mitre_tech_${tacticID.slice(2)}_001_example` },
                        { id: `${tacticID.slice(2)}.002`, nameKey: `mitre_tech_${tacticID.slice(2)}_002_example` }
                    ];
                    if(window.translations && window.translations.he) {
                        if(!window.translations.he[`mitre_tech_${tacticID.slice(2)}_001_example`]) window.translations.he[`mitre_tech_${tacticID.slice(2)}_001_example`] = `טכניקה לדוגמה 1 (${tacticID})`;
                        if(!window.translations.he[`mitre_tech_${tacticID.slice(2)}_002_example`]) window.translations.he[`mitre_tech_${tacticID.slice(2)}_002_example`] = `טכניקה לדוגמה 2 (${tacticID})`;
                    }
                     if(window.translations && window.translations.en) {
                        if(!window.translations.en[`mitre_tech_${tacticID.slice(2)}_001_example`]) window.translations.en[`mitre_tech_${tacticID.slice(2)}_001_example`] = `Sample Technique 1 (${tacticID})`;
                        if(!window.translations.en[`mitre_tech_${tacticID.slice(2)}_002_example`]) window.translations.en[`mitre_tech_${tacticID.slice(2)}_002_example`] = `Sample Technique 2 (${tacticID})`;
                    }
            }
            return { id: tacticID, nameKey: `mitre_tactic_${tacticID.toLowerCase()}`, techniques: techniques };
        });
    }
    function buildMitreGridForEdit() {
        if (!mitreGridPlaceholderEdit) return;
        mitreGridPlaceholderEdit.innerHTML = '';
        if (mitreAttackDataForEdit.length === 0) {
            mitreGridPlaceholderEdit.textContent = getLocalizedString('loading_mitre_data');
            return;
        }
        mitreAttackDataForEdit.forEach(tactic => {
            const tacticCol = document.createElement('div');
            tacticCol.className = 'tactic-column';
            tacticCol.innerHTML = `<h5 class="tactic-title">${getLocalizedString(tactic.nameKey)}</h5><div class="tactic-id-display">(${tactic.id})</div>`;
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
                checkbox.dataset.techniqueName = getLocalizedString(tech.nameKey) || tech.id;
                if (loadedMitreTechniques.includes(tech.id)) checkbox.checked = true;
                checkbox.addEventListener('change', handleTechniqueSelectionForEdit);
                label.appendChild(checkbox);
                const techNameSpan = document.createElement('span');
                techNameSpan.textContent = ` ${getLocalizedString(tech.nameKey) || tech.id}`;
                label.appendChild(techNameSpan);
                techItem.appendChild(label);
                techList.appendChild(techItem);
            });
            tacticCol.appendChild(techList);
            mitreGridPlaceholderEdit.appendChild(tacticCol);
        });
        updateSelectedMitrePathPreviewForEdit();
    }
    function handleTechniqueSelectionForEdit(event) {
        const checkbox = event.target;
        const techniqueId = checkbox.value;
        loadedMitreTechniques = loadedMitreTechniques.filter(id => id !== techniqueId);
        if (checkbox.checked) loadedMitreTechniques.push(techniqueId);
        updateSelectedMitrePathPreviewForEdit();
        updateMitreHiddenInputForEdit();
    }
    function updateSelectedMitrePathPreviewForEdit() {
        if (!selectedMitrePathAreaEdit) return;
        if (loadedMitreTechniques.length === 0) {
            selectedMitrePathAreaEdit.innerHTML = `<span class="text-subtitle">${getLocalizedString('no_techniques_selected_yet_edit')}</span>`;
            return;
        }
        selectedMitrePathAreaEdit.innerHTML = '';
        loadedMitreTechniques.forEach(techId => {
            const checkbox = mitreGridPlaceholderEdit.querySelector(`input[type="checkbox"][value="${techId}"]`);
            const techName = checkbox ? checkbox.dataset.techniqueName : techId;
            const tag = document.createElement('span');
            tag.className = 'technique-tag';
            tag.textContent = techName;
            selectedMitrePathAreaEdit.appendChild(tag);
        });
    }
    function updateMitreHiddenInputForEdit() {
        if (selectedMitreTechniquesInputEdit) {
            selectedMitreTechniquesInputEdit.value = loadedMitreTechniques.join(',');
        }
    }
     if (toggleMitreSectionBtnEdit && mitreBuilderContainerEdit) {
        // Toggle logic is in the HTML's inline script
    }
    // --- Step 4: Defense Systems ---
    function populateDefenseSystemsEdit(defenseSystemsData) {
        if (!defenseSystemsData) return;
        defenseSystemSelectIds.forEach(selectId => {
            const selectElement = document.getElementById(selectId);
            // The key in defenseSystemsData should match the JS variable, e.g. defenseSystemsData.firewallVendorEdit
            // but the HTML has "firewallVendorEdit" as part of the "name" attribute and "firewall-vendor-edit" as id.
            // We need a mapping or consistent naming. Assuming defenseSystemsData keys are like "firewallVendor", "eppEdrVendor" etc.
            const dataKey = selectId.replace('-edit','').replace(/-/g, '_').replace('_vendor','Vendor'); // Simplified: firewall_vendor -> firewallVendor
            let dataKeyCamelCase = selectId.replace('-edit','').split('-').map((part, index) => index === 0 ? part : part.charAt(0).toUpperCase() + part.slice(1)).join(''); // firewall-vendor -> firewallVendor
            if (selectElement && defenseSystemsData[dataKeyCamelCase] !== undefined) {
                 selectElement.value = defenseSystemsData[dataKeyCamelCase];
            } else if(selectElement && defenseSystemsData[selectId] !== undefined) { // Fallback if keys have "-edit"
                 selectElement.value = defenseSystemsData[selectId];
            }
        });
    }
    // --- Load Data & Form Submission ---
    function loadScenarioForEditing(scenarioData) {
        if (!scenarioData) {
            alert(getLocalizedString('error_loading_scenario_data_alert'));
            window.location.href = 'instructor_manage_scenarios.html';
            return;
        }
        if (editingScenarioNameDisplay) editingScenarioNameDisplay.textContent = scenarioData.name;
        // Step 1
        if (scenarioNameInputEdit) scenarioNameInputEdit.value = scenarioData.name;
        if (scenarioDifficultySelectEdit) scenarioDifficultySelectEdit.value = scenarioData.difficulty;
        if (scenarioDescriptionTextareaEdit) scenarioDescriptionTextareaEdit.value = scenarioData.description;
        if (mitreTagsInputEdit && scenarioData.mitreTags) {
            currentMitreTagsEdit = scenarioData.mitreTags.split(',').map(t => t.trim()).filter(t => t);
            mitreTagsInputEdit.value = currentMitreTagsEdit.join(', ');
            renderMitreTagsEdit();
        }
        // Step 2
        if(orgTypeSelectEdit) orgTypeSelectEdit.value = scenarioData.orgType || 'generic';
        if(serviceTypeSelectEdit) serviceTypeSelectEdit.value = scenarioData.serviceType || 'web_app';
        if (infraTypeSelectEdit) infraTypeSelectEdit.value = scenarioData.infraType || 'on_prem';
        handleInfraTypeChangeEdit();
        if (cloudProviderSelectEdit && scenarioData.cloudProvider) cloudProviderSelectEdit.value = scenarioData.cloudProvider;
         if (cloudProviderArchDisplayEdit && cloudArchZoneEdit && !cloudArchZoneEdit.classList.contains('hidden') && cloudProviderSelectEdit) {
             cloudProviderArchDisplayEdit.textContent = cloudProviderSelectEdit.options[cloudProviderSelectEdit.selectedIndex]?.text || '';
        }
        osTypeCheckboxesEdit.forEach(cb => {
            cb.checked = scenarioData.osTypes?.includes(cb.value) || false;
        });
        if(containerizationSelectEdit) containerizationSelectEdit.value = scenarioData.containerization || 'no';
        if(openSourceDefenseSelectEdit) openSourceDefenseSelectEdit.value = scenarioData.openSourceDefense || 'no';
        initializeArchitectureEditorEdit(scenarioData.architecture);
        // Step 3
        loadedMitreTechniques = scenarioData.selectedMitreTechniques ? [...scenarioData.selectedMitreTechniques] : [];
        if (mitreAttackDataForEdit.length === 0) getMitreDataForEdit();
        buildMitreGridForEdit();
        updateMitreHiddenInputForEdit();
        // Step 4
        populateDefenseSystemsEdit(scenarioData.defenseSystems);
        updateWizardStep(0);
    }
    if (editScenarioForm) {
        editScenarioForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const urlParamsSubmit = new URLSearchParams(window.location.search);
            const scenarioId = urlParamsSubmit.get('id');
            const formData = new FormData(editScenarioForm);
            const updatedScenarioData = { id: scenarioId };
            formData.forEach((value, key) => {
                const cleanKey = key.replace('Edit', ''); // Remove "Edit" suffix from form field names
                if (key.startsWith('os_type_edit')) { // Special handling for os_type_edit[]
                     if (!updatedScenarioData.osTypes) updatedScenarioData.osTypes = [];
                     updatedScenarioData.osTypes.push(value);
                } else if (updatedScenarioData[cleanKey] === undefined) { // Handle simple key-value
                    updatedScenarioData[cleanKey] = value;
                } else if (Array.isArray(updatedScenarioData[cleanKey])) { // If already an array, push
                    updatedScenarioData[cleanKey].push(value);
                } else { // If exists and not array, make it an array
                    updatedScenarioData[cleanKey] = [updatedScenarioData[cleanKey], value];
                }
            });
             // Consolidate defense systems under a single object
            updatedScenarioData.defenseSystems = {};
            defenseSystemSelectIds.forEach(id => {
                const key = id.replace('-edit','').replace(/-/g, '_').replace('_vendor','Vendor'); // e.g. firewall_vendor -> firewallVendor
                let keyCamelCase = id.replace('-edit','').split('-').map((part, index) => index === 0 ? part : part.charAt(0).toUpperCase() + part.slice(1)).join('');
                updatedScenarioData.defenseSystems[keyCamelCase] = formData.get(id); // Use original ID from select
            });
            updatedScenarioData.architecture = scenarioArchitectureEdit;
            updatedScenarioData.selectedMitreTechniques = loadedMitreTechniques;
            if(updatedScenarioData.mitreTags) updatedScenarioData.mitreTags = currentMitreTagsEdit.join(',');
            console.log(`Saving changes for scenario ${scenarioId}:`, JSON.stringify(updatedScenarioData, null, 2));
            alert(getLocalizedString('changes_saved_successfully_placeholder'));
        });
    }
    // --- Initialization ---
    function initializePage() {
        const urlParams = new URLSearchParams(window.location.search);
        const scenarioIdToEdit = urlParams.get('id');
        if (scenarioIdToEdit && existingScenarioDataStore[scenarioIdToEdit]) {
            loadScenarioForEditing(existingScenarioDataStore[scenarioIdToEdit]);
        } else {
            console.warn(`Scenario ID "${scenarioIdToEdit}" not found for editing or no ID provided.`);
            if (editingScenarioNameDisplay) editingScenarioNameDisplay.textContent = getLocalizedString('scenario_not_found_title');
            if (editScenarioForm) editScenarioForm.classList.add('hidden');
            if(prevStepBtn) prevStepBtn.style.display = 'none';
            if(nextStepBtn) nextStepBtn.style.display = 'none';
            if(saveChangesBtn) saveChangesBtn.style.display = 'none';
            if(currentStepDisplay) currentStepDisplay.textContent = '';
            if(wizardProgressBar) wizardProgressBar.style.width = '0%';
            const mainContent = document.querySelector('.main-content-area');
            if(mainContent && !mainContent.querySelector('.error-scenario-load')){
                const errorP = document.createElement('p');
                errorP.className = 'text-danger-text text-center p-8 error-scenario-load';
                errorP.textContent = getLocalizedString('error_loading_scenario_data');
                const header = mainContent.querySelector('header');
                if(header && header.nextSibling) mainContent.insertBefore(errorP, header.nextSibling);
                else mainContent.appendChild(errorP);
            }
        }
         if (toggleMitreSectionBtnEdit && mitreBuilderContainerEdit) {
            const isExpanded = !mitreBuilderContainerEdit.classList.contains('hidden');
            const toggleText = toggleMitreSectionBtnEdit.querySelector('span');
            if(toggleText) toggleText.textContent = getLocalizedString(isExpanded ? 'collapse_button' : 'expand_button');
        }
    }
    if (window.translations && Object.keys(window.translations[window.currentLang || 'he'] || {}).length > 10) {
        initializePage();
    } else {
        const checkTranslationsInterval = setInterval(() => {
            if (window.translations && Object.keys(window.translations[window.currentLang || 'he'] || {}).length > 10) {
                clearInterval(checkTranslationsInterval);
                initializePage();
            }
        }, 100);
        setTimeout(() => clearInterval(checkTranslationsInterval), 3000);
    }
    window.updatePageSpecificTranslations = function(langPack, lang) {
        initializePage(); // Re-initialize to re-populate with correct language
        if (mitreAttackDataForEdit.length > 0) buildMitreGridForEdit();
        const currentScenarioId = new URLSearchParams(window.location.search).get('id');
        if (currentScenarioId && existingScenarioDataStore[currentScenarioId] && existingScenarioDataStore[currentScenarioId].architecture) {
            initializeArchitectureEditorEdit(existingScenarioDataStore[currentScenarioId].architecture);
        }
    };
});