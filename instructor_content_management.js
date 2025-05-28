// instructor_content_management.js
'use strict';
document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Elements ---
    const tabs = document.querySelectorAll('.tab-button');
    const tabPanels = document.querySelectorAll('.tab-panel');
    // Learning Materials Elements
    const learningMaterialsTableBody = document.getElementById('learning-materials-table-body');
    const loadingLearningMaterialsRow = document.getElementById('loading-learning-materials-row');
    const searchLearningMaterialsInput = document.getElementById('search-learning-materials');
    const filterFileTypeSelect = document.getElementById('filter-file-type');
    const filterUploadDateInput = document.getElementById('filter-upload-date');
    const learningMaterialsPaginationContainer = document.getElementById('learning-materials-pagination');
    const uploadMaterialBtn = document.getElementById('upload-material-btn');
    const uploadMaterialModal = document.getElementById('uploadMaterialModal');
    const uploadMaterialForm = document.getElementById('uploadMaterialForm');
    // Scenario Templates Elements
    const scenarioTemplatesTableBody = document.getElementById('scenario-templates-table-body');
    const loadingScenarioTemplatesRow = document.getElementById('loading-scenario-templates-row');
    const searchScenarioTemplatesInput = document.getElementById('search-scenario-templates');
    const filterTemplateDifficultySelect = document.getElementById('filter-template-difficulty');
    const filterTemplateCreatorInput = document.getElementById('filter-template-creator');
    const scenarioTemplatesPaginationContainer = document.getElementById('scenario-templates-pagination');
    const createTemplateBtn = document.getElementById('create-template-btn');
    const templateModal = document.getElementById('templateModal');
    const templateForm = document.getElementById('templateForm');
    const templateModalTitle = document.getElementById('templateModalTitle');
    const templateIdInput = document.getElementById('template-id');
    // Knowledge Base Elements
    const knowledgeBaseListContainer = document.getElementById('knowledge-base-list');
    const loadingKbEntriesText = document.getElementById('loading-kb-entries');
    const searchKbInput = document.getElementById('search-kb');
    const filterKbCategorySelect = document.getElementById('filter-kb-category');
    const filterKbTagsInput = document.getElementById('filter-kb-tags');
    const knowledgeBasePaginationContainer = document.getElementById('knowledge-base-pagination');
    const addKbEntryBtn = document.getElementById('add-kb-entry-btn');
    const kbEntryModal = document.getElementById('kbEntryModal');
    const kbEntryForm = document.getElementById('kbEntryForm');
    const kbEntryModalTitle = document.getElementById('kbEntryModalTitle');
    const kbEntryIdInput = document.getElementById('kb-entry-id');
    const getLocalizedString = typeof window.getTranslatedStringGlobal === 'function' ?
        window.getTranslatedStringGlobal :
        function(key, replacements = {}) { console.warn('getTranslatedStringGlobal not found for key:', key); return `[${key}]`; };
    // --- State & Mock Data ---
    let currentLearningMaterialPage = 1;
    let currentTemplatePage = 1;
    let currentKbPage = 1;
    const ITEMS_PER_PAGE = 5;
    let mockLearningMaterials = [
        { id: 'mat001', name: 'מדריך הגדרות Firewall.pdf', type: 'pdf', size: '2.5 MB', uploadDate: '2024-05-01', path: '#' },
        { id: 'mat002', name: 'נהלי תגובה לאירוע.docx', type: 'docx', size: '1.2 MB', uploadDate: '2024-04-22', path: '#' },
        { id: 'mat003', name: 'תרשים רשת לדוגמה.png', type: 'image', size: '800 KB', uploadDate: '2024-03-15', path: '#' },
        { id: 'mat004', name: 'הדרכת וידאו: זיהוי פישינג.mp4', type: 'video', size: '25 MB', uploadDate: '2024-05-10', path: '#' },
        { id: 'mat005', name: 'Best Practices for AD Security.pdf', type: 'pdf', size: '3.1 MB', uploadDate: '2024-02-10', path: '#' },
        { id: 'mat006', name: 'Checklist - Incident Response.docx', type: 'docx', size: '0.5 MB', uploadDate: '2024-01-05', path: '#' },
    ];
    let mockScenarioTemplates = [
        { id: 'tpl001', nameKey: 'template_name_phishing_basic', descriptionKey: 'template_desc_phishing_basic', difficulty: 'easy', createdByKey: 'instructor_lead' },
        { id: 'tpl002', nameKey: 'template_name_ransomware_medium', descriptionKey: 'template_desc_ransomware_medium', difficulty: 'medium', createdByKey: 'instructor_guest' },
        { id: 'tpl003', nameKey: 'template_name_web_hard', descriptionKey: 'template_desc_web_hard', difficulty: 'hard', createdByKey: 'instructor_dev_team' },
        { id: 'tpl004', nameKey: 'template_name_insider_expert', descriptionKey: 'template_desc_insider_expert', difficulty: 'expert', createdByKey: 'instructor_lead' },
    ];
    let mockKnowledgeBaseEntries = [
        { id: 'kb001', titleKey: 'kb_title_phishing_types', categoryKey: 'kb_category_threat_intel', descriptionKey: 'kb_desc_phishing_types', tags: ['פישינג', 'הנדסה חברתית'] },
        { id: 'kb002', titleKey: 'kb_title_firewall_rules', categoryKey: 'kb_category_technical', descriptionKey: 'kb_desc_firewall_rules', tags: ['חומת אש', 'רשתות', 'אבטחת מידע'] },
        { id: 'kb003', titleKey: 'kb_title_incident_response_procedure', categoryKey: 'kb_category_procedures', descriptionKey: 'kb_desc_incident_response_procedure', tags: ['נהלים', 'תגובה לאירועים'] },
        { id: 'kb004', titleKey: 'kb_title_common_malware', categoryKey: 'kb_category_threat_intel', descriptionKey: 'kb_desc_common_malware', tags: ['נוזקות', 'וירוסים', 'כופרה'] },
        { id: 'kb005', titleKey: 'kb_title_nessus_scanner_guide', categoryKey: 'kb_category_tools', descriptionKey: 'kb_desc_nessus_scanner_guide', tags: ['סריקת חולשות', 'כלים', 'Nessus'] },
    ];
    // --- Tab Management ---
    function handleTabSwitch(event) {
        const selectedTab = event.currentTarget;
        tabs.forEach(tab => {
            tab.classList.remove('active');
            tab.setAttribute('aria-selected', 'false');
        });
        selectedTab.classList.add('active');
        selectedTab.setAttribute('aria-selected', 'true');
        tabPanels.forEach(panel => {
            panel.classList.add('hidden');
            panel.classList.remove('active');
        });
        const targetPanel = document.getElementById(selectedTab.getAttribute('aria-controls'));
        if (targetPanel) {
            targetPanel.classList.remove('hidden');
            targetPanel.classList.add('active');
            if (targetPanel.id === 'learning-materials-panel' && learningMaterialsTableBody.rows.length <=1 ) renderLearningMaterialsTable();
            if (targetPanel.id === 'scenario-templates-panel' && scenarioTemplatesTableBody.rows.length <=1 ) renderScenarioTemplatesTable();
            if (targetPanel.id === 'knowledge-base-panel' && knowledgeBaseListContainer.children.length <=1 ) {
                populateKbCategoryFilter();
                renderKnowledgeBaseList();
            }
        }
    }
    tabs.forEach(tab => tab.addEventListener('click', handleTabSwitch));
    // --- Modal Management ---
    function openModal(modalElement, mode = 'add', data = null) {
        if (modalElement) {
            if (modalElement === uploadMaterialModal && uploadMaterialForm) {
                uploadMaterialForm.reset();
                const fileInput = uploadMaterialForm.querySelector('#material-file');
                if(fileInput) fileInput.value = '';
            } else if (modalElement === templateModal && templateForm && templateModalTitle && templateIdInput) {
                templateForm.reset();
                templateIdInput.value = '';
                templateModalTitle.textContent = getLocalizedString(mode === 'edit' ? 'template_modal_edit_title' : 'template_modal_create_title');
                if (mode === 'edit' && data) {
                    templateIdInput.value = data.id;
                    templateForm.elements['templateName'].value = getLocalizedString(data.nameKey);
                    templateForm.elements['templateDescription'].value = getLocalizedString(data.descriptionKey);
                    templateForm.elements['templateDifficulty'].value = data.difficulty;
                }
            } else if (modalElement === kbEntryModal && kbEntryForm && kbEntryModalTitle && kbEntryIdInput) {
                kbEntryForm.reset();
                kbEntryIdInput.value = '';
                kbEntryModalTitle.textContent = getLocalizedString(mode === 'edit' ? 'kb_entry_modal_edit_title' : 'kb_entry_modal_add_title');
                if (mode === 'edit' && data) {
                    kbEntryIdInput.value = data.id;
                    kbEntryForm.elements['kbTitle'].value = getLocalizedString(data.titleKey);
                    kbEntryForm.elements['kbCategory'].value = data.categoryKey;
                    kbEntryForm.elements['kbContent'].value = getLocalizedString(data.descriptionKey);
                    kbEntryForm.elements['kbTags'].value = data.tags.join(', ');
                }
            }
            modalElement.classList.remove('hidden');
            setTimeout(() => modalElement.classList.add('opacity-100'), 10);
            setTimeout(() => modalElement.querySelector('.modal-content')?.classList.add('scale-100'), 10);
        }
    }
    function closeModal(modalElement) {
        if (modalElement) {
            modalElement.querySelector('.modal-content')?.classList.remove('scale-100');
            modalElement.classList.remove('opacity-100');
            setTimeout(() => modalElement.classList.add('hidden'), 300);
        }
    }
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
        overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(overlay); });
    });
    document.querySelectorAll('.modal-close-button').forEach(button => {
        const modalId = button.dataset.modalId;
        if (modalId) {
            button.addEventListener('click', () => closeModal(document.getElementById(modalId)));
        }
    });
    // --- Learning Materials Logic ---
    function createMaterialActionButtons(material) {
        const container = document.createElement('div');
        container.className = 'flex items-center justify-center space-x-1 rtl:space-x-reverse whitespace-nowrap';
        const downloadBtn = document.createElement('a');
        downloadBtn.href = material.path; downloadBtn.download = material.name;
        downloadBtn.className = 'table-action-button'; downloadBtn.title = getLocalizedString('download_tooltip');
        downloadBtn.innerHTML = `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>`;
        const editBtn = document.createElement('button');
        editBtn.className = 'table-action-button'; editBtn.title = getLocalizedString('edit_tooltip');
        editBtn.innerHTML = `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>`;
        editBtn.onclick = () => { alert('Edit functionality placeholder for material: ' + material.name); };
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'table-action-button'; deleteBtn.title = getLocalizedString('delete_tooltip');
        deleteBtn.innerHTML = `<svg class="w-4 h-4 text-danger-color hover:text-red-700 dark:hover:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>`;
        deleteBtn.onclick = () => {
            if (confirm(getLocalizedString('confirm_delete_material', {materialName: material.name}))) {
                mockLearningMaterials = mockLearningMaterials.filter(m => m.id !== material.id);
                renderLearningMaterialsTable();
                alert(getLocalizedString('alert_material_deleted_successfully'));
            }
        };
        container.appendChild(downloadBtn); container.appendChild(editBtn); container.appendChild(deleteBtn);
        return container;
    }
    function renderLearningMaterialsTable() {
        if (!learningMaterialsTableBody) return;
        const loadingRow = loadingLearningMaterialsRow;
        learningMaterialsTableBody.innerHTML = '';
        if (loadingRow) learningMaterialsTableBody.appendChild(loadingRow); loadingRow.style.display = 'table-row';
        const searchTerm = searchLearningMaterialsInput.value.toLowerCase();
        const typeFilter = filterFileTypeSelect.value;
        const dateFilter = filterUploadDateInput.value;
        const filtered = mockLearningMaterials.filter(m =>
            (m.name.toLowerCase().includes(searchTerm)) &&
            (typeFilter === 'all' || m.type === typeFilter) &&
            (!dateFilter || m.uploadDate === dateFilter)
        );
        const paginated = filtered.slice((currentLearningMaterialPage - 1) * ITEMS_PER_PAGE, currentLearningMaterialPage * ITEMS_PER_PAGE);
        if (paginated.length === 0) {
            if(loadingRow) loadingRow.cells[0].textContent = getLocalizedString('no_learning_materials_found');
        } else {
            if(loadingRow) loadingRow.style.display = 'none';
            paginated.forEach(material => {
                const row = learningMaterialsTableBody.insertRow();
                row.insertCell().textContent = material.name;
                row.insertCell().textContent = getLocalizedString(`file_type_${material.type}`) || material.type.toUpperCase();
                row.insertCell().textContent = material.size;
                row.insertCell().textContent = material.uploadDate;
                row.insertCell().appendChild(createMaterialActionButtons(material));
            });
        }
        renderPagination('learningMaterials', filtered.length, ITEMS_PER_PAGE, currentLearningMaterialPage);
    }
    if (uploadMaterialBtn) uploadMaterialBtn.addEventListener('click', () => openModal(uploadMaterialModal, 'add'));
    if (uploadMaterialForm) {
        uploadMaterialForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(uploadMaterialForm);
            const file = formData.get('materialFile');
            if (file && file.name) {
                mockLearningMaterials.unshift({
                    id: `mat${Date.now()}`, name: formData.get('materialName') || file.name,
                    type: file.name.split('.').pop() || 'unknown',
                    size: `${(file.size / (1024*1024)).toFixed(2)} MB`,
                    uploadDate: new Date().toISOString().split('T')[0], path: '#'
                });
                renderLearningMaterialsTable();
                alert(getLocalizedString('alert_material_uploaded_successfully'));
            } else {
                 alert(getLocalizedString('error_uploading_material'));
            }
            closeModal(uploadMaterialModal);
        });
    }
    // --- Scenario Templates Logic ---
     function createTemplateActionButtons(template) {
        const container = document.createElement('div');
        container.className = 'flex items-center justify-center space-x-1 rtl:space-x-reverse whitespace-nowrap';
        const useBtn = document.createElement('button');
        useBtn.className = 'table-action-button'; useBtn.title = getLocalizedString('use_template_tooltip');
        useBtn.innerHTML = `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 15l-2 5L9 9l7-7-5 2z"></path></svg>`;
        useBtn.onclick = () => { window.location.href = `instructor_create_scenario.html?template_id=${template.id}`; };
        const editBtn = document.createElement('button');
        editBtn.className = 'table-action-button'; editBtn.title = getLocalizedString('edit_tooltip');
        editBtn.innerHTML = `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>`;
        editBtn.onclick = () => { openModal(templateModal, 'edit', template); };
        const duplicateBtn = document.createElement('button');
        duplicateBtn.className = 'table-action-button'; duplicateBtn.title = getLocalizedString('duplicate_template_tooltip');
        duplicateBtn.innerHTML = `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>`;
        duplicateBtn.onclick = () => {
            const newId = `tpl${Date.now()}`;
            const newNameKey = `${template.nameKey}_copy_${newId}`;
            if(window.translations.he && window.translations.en){
                 window.translations.he[newNameKey] = `${getLocalizedString(template.nameKey)} (עותק)`;
                 window.translations.en[newNameKey] = `${getLocalizedString(template.nameKey)} (Copy)`;
            }
            mockScenarioTemplates.unshift({...template, id: newId, nameKey: newNameKey});
            renderScenarioTemplatesTable();
            alert('Template duplicated (mock).');
        };
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'table-action-button'; deleteBtn.title = getLocalizedString('delete_tooltip');
        deleteBtn.innerHTML = `<svg class="w-4 h-4 text-danger-color hover:text-red-700 dark:hover:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>`;
        deleteBtn.onclick = () => {
             if (confirm(getLocalizedString('confirm_delete_template', {templateName: getLocalizedString(template.nameKey)}))) {
                mockScenarioTemplates = mockScenarioTemplates.filter(t => t.id !== template.id);
                renderScenarioTemplatesTable();
                alert(getLocalizedString('alert_template_deleted_successfully'));
            }
        };
        container.appendChild(useBtn); container.appendChild(editBtn); container.appendChild(duplicateBtn); container.appendChild(deleteBtn);
        return container;
    }
    function renderScenarioTemplatesTable() {
        if (!scenarioTemplatesTableBody) return;
        const loadingRow = loadingScenarioTemplatesRow;
        scenarioTemplatesTableBody.innerHTML = '';
        if (loadingRow) scenarioTemplatesTableBody.appendChild(loadingRow); loadingRow.style.display = 'table-row';
        const searchTerm = searchScenarioTemplatesInput.value.toLowerCase();
        const difficultyFilter = filterTemplateDifficultySelect.value;
        const creatorFilter = filterTemplateCreatorInput.value.toLowerCase();
        const filtered = mockScenarioTemplates.filter(t =>
            (getLocalizedString(t.nameKey).toLowerCase().includes(searchTerm)) &&
            (difficultyFilter === 'all' || t.difficulty === difficultyFilter) &&
            (getLocalizedString(t.createdByKey).toLowerCase().includes(creatorFilter))
        );
        const paginated = filtered.slice((currentTemplatePage - 1) * ITEMS_PER_PAGE, currentTemplatePage * ITEMS_PER_PAGE);
        if (paginated.length === 0) {
             if(loadingRow) loadingRow.cells[0].textContent = getLocalizedString('no_scenario_templates_found');
        } else {
            if(loadingRow) loadingRow.style.display = 'none';
            paginated.forEach(template => {
                const row = scenarioTemplatesTableBody.insertRow();
                row.insertCell().textContent = getLocalizedString(template.nameKey);
                row.insertCell().textContent = getLocalizedString(template.descriptionKey);
                const diffCell = row.insertCell();
                const diffBadge = document.createElement('span');
                diffBadge.className = 'difficulty-badge';
                const difficultyText = getLocalizedString(`difficulty_${template.difficulty}_badge`) || template.difficulty;
                diffBadge.textContent = difficultyText;
                if (template.difficulty === 'easy') diffBadge.classList.add('difficulty-easy');
                else if (template.difficulty === 'medium') diffBadge.classList.add('difficulty-medium');
                else if (template.difficulty === 'hard') diffBadge.classList.add('difficulty-hard');
                else if (template.difficulty === 'expert') diffBadge.classList.add('difficulty-expert');
                diffCell.appendChild(diffBadge);
                row.insertCell().textContent = getLocalizedString(template.createdByKey);
                row.insertCell().appendChild(createTemplateActionButtons(template));
            });
        }
        renderPagination('scenarioTemplates', filtered.length, ITEMS_PER_PAGE, currentTemplatePage);
    }
    if(createTemplateBtn) createTemplateBtn.addEventListener('click', () => openModal(templateModal, 'add'));
    if(templateForm) {
        templateForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(templateForm);
            const id = formData.get('templateId');
            let nameKey = formData.get('templateName');
            let descriptionKey = formData.get('templateDescription');
            if(!id){
                 nameKey = `template_name_custom_${Date.now()}`;
                 descriptionKey = `template_desc_custom_${Date.now()}`;
                 if(window.translations.he && window.translations.en){
                    window.translations.he[nameKey] = formData.get('templateName');
                    window.translations.en[nameKey] = formData.get('templateName');
                    window.translations.he[descriptionKey] = formData.get('templateDescription');
                    window.translations.en[descriptionKey] = formData.get('templateDescription');
                 }
            }
            const newTemplate = {
                id: id || `tpl${Date.now()}`,
                nameKey: nameKey,
                descriptionKey: descriptionKey,
                difficulty: formData.get('templateDifficulty'),
                createdByKey: 'instructor_lead'
            };
            if (id) {
                mockScenarioTemplates = mockScenarioTemplates.map(t => t.id === id ? {...t, ...newTemplate, nameKey: t.nameKey, descriptionKey: t.descriptionKey } : t);
                const editedTemplate = mockScenarioTemplates.find(t => t.id === id);
                 if(editedTemplate && window.translations.he && window.translations.en){
                    window.translations.he[editedTemplate.nameKey] = formData.get('templateName');
                    window.translations.en[editedTemplate.nameKey] = formData.get('templateName');
                    window.translations.he[editedTemplate.descriptionKey] = formData.get('templateDescription');
                    window.translations.en[editedTemplate.descriptionKey] = formData.get('templateDescription');
                }
                alert(getLocalizedString('alert_template_updated_successfully'));
            } else {
                mockScenarioTemplates.unshift(newTemplate);
                alert(getLocalizedString('alert_template_created_successfully'));
            }
            renderScenarioTemplatesTable();
            closeModal(templateModal);
        });
    }
    // --- Knowledge Base Logic ---
    function createKbEntryCard(entry) {
        const card = document.createElement('div');
        card.className = 'content-card card p-4 flex flex-col justify-between';
        card.innerHTML = `
            <div>
                <h4 class="content-card-title text-lg font-semibold mb-1">${getLocalizedString(entry.titleKey)}</h4>
                <span class="content-card-type text-xs font-medium text-primary bg-primary-bg px-2 py-0.5 rounded-full">${getLocalizedString(entry.categoryKey)}</span>
                <p class="content-card-description text-sm text-subtitle mt-2 mb-3 line-clamp-3">${getLocalizedString(entry.descriptionKey)}</p>
                 <div class="kb-tags text-xs mt-1 mb-2">
                    ${entry.tags.map(tag => `<span class="inline-block bg-gray-200 dark:bg-gray-700 rounded-full px-2 py-0.5 text-xs font-semibold text-gray-700 dark:text-gray-200 mr-2 mb-1">${tag}</span>`).join('')}
                </div>
            </div>
            <div class="content-card-footer mt-auto pt-2 border-t border-[var(--card-border-color)] flex justify-between items-center">
                <a href="#" data-id="${entry.id}" class="read-more-kb text-primary hover:underline text-sm font-medium">${getLocalizedString('read_more_kb_link')}</a>
                <div class="space-x-1 rtl:space-x-reverse">
                    <button data-id="${entry.id}" class="edit-kb-entry table-action-button" title="${getLocalizedString('edit_tooltip')}">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                    </button>
                    <button data-id="${entry.id}" class="delete-kb-entry table-action-button" title="${getLocalizedString('delete_tooltip')}">
                        <svg class="w-4 h-4 text-danger-color hover:text-red-700 dark:hover:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                    </button>
                </div>
            </div>
        `;
        card.querySelector('.edit-kb-entry').addEventListener('click', () => openModal(kbEntryModal, 'edit', entry));
        card.querySelector('.delete-kb-entry').addEventListener('click', () => {
            if (confirm(getLocalizedString('confirm_delete_kb_entry', {entryTitle: getLocalizedString(entry.titleKey)}))) {
                mockKnowledgeBaseEntries = mockKnowledgeBaseEntries.filter(kb => kb.id !== entry.id);
                renderKnowledgeBaseList();
                alert(getLocalizedString('alert_kb_entry_deleted_successfully'));
            }
        });
        card.querySelector('.read-more-kb').addEventListener('click', (e) => {e.preventDefault(); alert('Read more KB: ' + getLocalizedString(entry.titleKey))});
        return card;
    }
    function renderKnowledgeBaseList() {
        if (!knowledgeBaseListContainer) return;
        const loadingText = loadingKbEntriesText;
        knowledgeBaseListContainer.innerHTML = '';
        if (loadingText) knowledgeBaseListContainer.appendChild(loadingText); loadingText.style.display = 'block';
        const searchTerm = searchKbInput.value.toLowerCase();
        const categoryFilter = filterKbCategorySelect.value;
        const tagsFilter = filterKbTagsInput.value.toLowerCase().split(',').map(t => t.trim()).filter(t => t);
        const filtered = mockKnowledgeBaseEntries.filter(kb =>
            (getLocalizedString(kb.titleKey).toLowerCase().includes(searchTerm) || getLocalizedString(kb.descriptionKey).toLowerCase().includes(searchTerm)) &&
            (categoryFilter === 'all' || kb.categoryKey === categoryFilter) &&
            (tagsFilter.length === 0 || tagsFilter.some(tag => kb.tags.map(t=>t.toLowerCase()).includes(tag)))
        );
        const paginated = filtered.slice((currentKbPage - 1) * ITEMS_PER_PAGE, currentKbPage * ITEMS_PER_PAGE);
        if (paginated.length === 0) {
            if(loadingText) loadingText.textContent = getLocalizedString('no_kb_entries_found');
        } else {
            if(loadingText) loadingText.style.display = 'none';
            paginated.forEach(entry => knowledgeBaseListContainer.appendChild(createKbEntryCard(entry)));
        }
        renderPagination('knowledgeBase', filtered.length, ITEMS_PER_PAGE, currentKbPage);
    }
    if (addKbEntryBtn) addKbEntryBtn.addEventListener('click', () => openModal(kbEntryModal, 'add'));
    if (kbEntryForm) {
        kbEntryForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(kbEntryForm);
            const id = formData.get('kbEntryId');
            let titleKey = formData.get('kbTitle');
            let descriptionKey = formData.get('kbContent');
             if(!id){
                 titleKey = `kb_title_custom_${Date.now()}`;
                 descriptionKey = `kb_desc_custom_${Date.now()}`;
                 if(window.translations.he && window.translations.en){
                    window.translations.he[titleKey] = formData.get('kbTitle');
                    window.translations.en[titleKey] = formData.get('kbTitle');
                    window.translations.he[descriptionKey] = formData.get('kbContent');
                    window.translations.en[descriptionKey] = formData.get('kbContent');
                 }
            }
            const newEntry = {
                id: id || `kb${Date.now()}`,
                titleKey: titleKey,
                categoryKey: formData.get('kbCategory'),
                descriptionKey: descriptionKey,
                tags: formData.get('kbTags').split(',').map(t => t.trim()).filter(t => t)
            };
            if (id) {
                mockKnowledgeBaseEntries = mockKnowledgeBaseEntries.map(kb => kb.id === id ? {...kb, ...newEntry, titleKey: kb.titleKey, descriptionKey: kb.descriptionKey} : kb);
                const editedEntry = mockKnowledgeBaseEntries.find(kb => kb.id === id);
                 if(editedEntry && window.translations.he && window.translations.en){
                    window.translations.he[editedEntry.titleKey] = formData.get('kbTitle');
                    window.translations.en[editedEntry.titleKey] = formData.get('kbTitle');
                    window.translations.he[editedEntry.descriptionKey] = formData.get('kbContent');
                    window.translations.en[editedEntry.descriptionKey] = formData.get('kbContent');
                }
                alert(getLocalizedString('alert_kb_entry_updated_successfully'));
            } else {
                mockKnowledgeBaseEntries.unshift(newEntry);
                alert(getLocalizedString('alert_kb_entry_added_successfully'));
            }
            renderKnowledgeBaseList();
            closeModal(kbEntryModal);
        });
    }
    function populateKbCategoryFilter() {
        if (!filterKbCategorySelect) return;
        const categories = [...new Set(mockKnowledgeBaseEntries.map(e => e.categoryKey))];
        filterKbCategorySelect.innerHTML = `<option value="all">${getLocalizedString('filter_all_categories')}</option>`;
        const staticCategories = ["kb_category_general", "kb_category_technical", "kb_category_procedures", "kb_category_threat_intel", "kb_category_tools"];
        staticCategories.forEach(catKey => {
            if (!categories.includes(catKey)) categories.push(catKey);
        });
        categories.forEach(catKey => {
            const option = document.createElement('option');
            option.value = catKey;
            option.textContent = getLocalizedString(catKey);
            filterKbCategorySelect.appendChild(option);
        });
    }
    // --- Generic Pagination ---
    function renderPagination(listType, totalItems, itemsPerPage, currentPage) {
        let paginationContainer;
        let renderFunction;
        let pageVarUpdater;
        if (listType === 'learningMaterials') {
            paginationContainer = learningMaterialsPaginationContainer;
            renderFunction = renderLearningMaterialsTable;
            pageVarUpdater = (newPage) => currentLearningMaterialPage = newPage;
        } else if (listType === 'scenarioTemplates') {
            paginationContainer = scenarioTemplatesPaginationContainer;
            renderFunction = renderScenarioTemplatesTable;
            pageVarUpdater = (newPage) => currentTemplatePage = newPage;
        } else if (listType === 'knowledgeBase') {
            paginationContainer = knowledgeBasePaginationContainer;
            renderFunction = renderKnowledgeBaseList;
            pageVarUpdater = (newPage) => currentKbPage = newPage;
        } else return;
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
            if (!textOverride) button.setAttribute('aria-label', getLocalizedString('pagination_page_num', {num: pageNumber}));
            if(isCurrent && !textOverride) button.setAttribute('aria-current', 'page');
            button.addEventListener('click', () => {
                let newPageNum = currentPage; // Use the passed currentPage argument
                if (textOverride === getLocalizedString('pagination_previous')) newPageNum--;
                else if (textOverride === getLocalizedString('pagination_next')) newPageNum++;
                else newPageNum = pageNumber;
                pageVarUpdater(newPageNum);
                renderFunction();
            });
            return button;
        };
        let actualCurrentPage;
        if (listType === 'learningMaterials') actualCurrentPage = currentLearningMaterialPage;
        else if (listType === 'scenarioTemplates') actualCurrentPage = currentTemplatePage;
        else if (listType === 'knowledgeBase') actualCurrentPage = currentKbPage;
        paginationContainer.appendChild(createPageButton(actualCurrentPage - 1, false, actualCurrentPage === 1, getLocalizedString('pagination_previous')));
        for (let i = 1; i <= totalPages; i++) {
             if (totalPages <= 7 || (i === 1 || i === totalPages || (i >= actualCurrentPage - 1 && i <= actualCurrentPage + 1))) {
                 paginationContainer.appendChild(createPageButton(i, i === actualCurrentPage));
            } else if (totalPages > 7 && (i === actualCurrentPage - 2 || i === actualCurrentPage + 2) ) {
                 const ellipsis = document.createElement('span');
                 ellipsis.textContent = '...';
                 ellipsis.className = 'px-2 py-1 text-sm text-subtitle';
                 paginationContainer.appendChild(ellipsis);
            }
        }
        paginationContainer.appendChild(createPageButton(actualCurrentPage + 1, false, actualCurrentPage === totalPages, getLocalizedString('pagination_next')));
    }
    // --- Initialization ---
    function initializePageWithTranslations() {
         if (typeof getLocalizedString === 'function' && window.translations &&
            Object.keys(window.translations[window.currentLang || 'he'] || {}).length > 10) {
            const activeTabButton = document.querySelector('.tab-button.active');
            const activePanelId = activeTabButton ? activeTabButton.getAttribute('aria-controls') : 'learning-materials-panel';
            if (activePanelId === 'learning-materials-panel' || !activeTabButton) {
                currentLearningMaterialPage = 1; renderLearningMaterialsTable();
            }
             // Always populate filters for all tabs, even if not initially visible
            populateKbCategoryFilter();
            if (activePanelId === 'scenario-templates-panel' || (!activeTabButton && scenarioTemplatesTableBody)) {
                currentTemplatePage = 1; renderScenarioTemplatesTable();
            }
            if (activePanelId === 'knowledge-base-panel' || (!activeTabButton && knowledgeBaseListContainer)) {
                currentKbPage = 1; renderKnowledgeBaseList();
            } else if (!activeTabButton && filterKbCategorySelect && !filterKbCategorySelect.options.length) { // Ensure KB filter is populated even if not default tab
                 populateKbCategoryFilter();
            }
            // Attach filter listeners
            if(searchLearningMaterialsInput) searchLearningMaterialsInput.addEventListener('input', () => { currentLearningMaterialPage = 1; renderLearningMaterialsTable(); });
            if(filterFileTypeSelect) filterFileTypeSelect.addEventListener('change', () => { currentLearningMaterialPage = 1; renderLearningMaterialsTable(); });
            if(filterUploadDateInput) filterUploadDateInput.addEventListener('change', () => { currentLearningMaterialPage = 1; renderLearningMaterialsTable(); });
            if(searchScenarioTemplatesInput) searchScenarioTemplatesInput.addEventListener('input', () => { currentTemplatePage = 1; renderScenarioTemplatesTable(); });
            if(filterTemplateDifficultySelect) filterTemplateDifficultySelect.addEventListener('change', () => { currentTemplatePage = 1; renderScenarioTemplatesTable(); });
            if(filterTemplateCreatorInput) filterTemplateCreatorInput.addEventListener('input', () => { currentTemplatePage = 1; renderScenarioTemplatesTable(); });
            if(searchKbInput) searchKbInput.addEventListener('input', () => { currentKbPage = 1; renderKnowledgeBaseList(); });
            if(filterKbCategorySelect) filterKbCategorySelect.addEventListener('change', () => { currentKbPage = 1; renderKnowledgeBaseList(); });
            if(filterKbTagsInput) filterKbTagsInput.addEventListener('input', () => { currentKbPage = 1; renderKnowledgeBaseList(); });
        } else {
            setTimeout(initializePageWithTranslations, 100);
        }
    }
    setTimeout(initializePageWithTranslations, 50);
    window.updatePageSpecificTranslations = function(langPack, lang) {
        const activeTabPanel = document.querySelector('.tab-panel.active');
        if (!activeTabPanel) {
            renderLearningMaterialsTable();
            renderScenarioTemplatesTable();
            populateKbCategoryFilter();
            renderKnowledgeBaseList();
            return;
        }
        if (activeTabPanel.id === 'learning-materials-panel') renderLearningMaterialsTable();
        if (activeTabPanel.id === 'scenario-templates-panel') renderScenarioTemplatesTable();
        if (activeTabPanel.id === 'knowledge-base-panel') {
            populateKbCategoryFilter();
            renderKnowledgeBaseList();
        }
    };
});