// trainee_architecture.js
'use strict';
document.addEventListener('DOMContentLoaded', () => {
    const architectureDiagramContainer = document.getElementById('architecture-diagram-display'); // The main .architecture-grid
    const architectureComponentsList = document.getElementById('architecture-components-list');
    const noComponentsMsg = document.getElementById('no-components-msg');
    // Specific display zones within the grid - Ensure these IDs match the HTML
    const displayZones = {
        external: document.getElementById('display-zone-internet'),
        'perimeter-security': document.getElementById('display-zone-perimeter'), // Key matches data-zone-type
        dmz: document.getElementById('display-zone-dmz'),
        management: document.getElementById('display-zone-management'),
        'internal-core': document.getElementById('display-zone-internal-core'),
        'internal-apps': document.getElementById('display-zone-internal-apps'),
        'internal-db': document.getElementById('display-zone-internal-db'),
        'internal-endpoints': document.getElementById('display-zone-internal-endpoints')
    };
    const getLocalizedString = typeof window.getTranslatedStringGlobal === 'function' ?
        window.getTranslatedStringGlobal :
        function(key, replacements = {}) { console.warn('getTranslatedStringGlobal not found for key:', key); return `[${key}]`; };
    const mockScenarioData = {
        scenarioId: 'sim001',
        name: "ניתוח מתקפת כופר על ארגון גדול",
        architecture: {
            zones: { // Keys here should match data-zone-type in HTML and keys in displayZones object
                external: [
                    { name: "שרת DNS חיצוני", type: "dns_server", icon: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/akamai.svg" }
                ],
                'perimeter-security': [
                    { name: "Palo Alto Firewall", type: "firewall", icon: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/paloaltonetworks.svg" },
                    { name: "שער VPN", type: "vpn_gateway", icon: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/nordvpn.svg" }
                ],
                dmz: [
                    { name: "שרת Web (Apache)", type: "web_server", icon: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/apache.svg" },
                    { name: "שרת אפליקציה", type: "app_server", icon: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/drupal.svg" }
                ],
                'internal-core': [
                    { name: "Active Directory DC", type: "domain_controller", icon: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/microsoft.svg" },
                    { name: "שרת קבצים", type: "file_server", icon: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/files.svg" }
                ],
                'internal-apps': [
                    { name: "שרת CRM פנימי", type: "app_server_internal", icon: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/sap.svg" }
                ],
                'internal-db': [
                    { name: "שרת MySQL ראשי", type: "database_server", icon: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/mysql.svg" }
                ],
                'internal-endpoints': [
                    { name: "תחנת מנהל כספים", type: "workstation_finance", icon: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/windows.svg" },
                    { name: "תחנת מפתח", type: "workstation_dev", icon: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/ubuntu.svg" }
                ],
                management: [
                    { name: "Splunk SIEM", type: "siem", icon: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/splunk.svg" },
                    { name: "שרת אנטי-וירוס", type: "av_management", icon: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/mcafee.svg" }
                ]
            }
        },
        keyComponents: [
            { nameKey: "component_dns_server_name", descriptionKey: "component_dns_server_desc" },
            { nameKey: "component_firewall_name", descriptionKey: "component_firewall_desc" },
            { nameKey: "component_vpn_gateway_name", descriptionKey: "component_vpn_gateway_desc" },
            { nameKey: "component_web_server_name", descriptionKey: "component_web_server_desc" },
            { nameKey: "component_app_server_name", descriptionKey: "component_app_server_desc" },
            { nameKey: "component_ad_server_name", descriptionKey: "component_ad_server_desc" },
            { nameKey: "component_file_server_name", descriptionKey: "component_file_server_desc" },
            { nameKey: "component_crm_server_name", descriptionKey: "component_crm_server_desc" },
            { nameKey: "component_db_server_name", descriptionKey: "component_db_server_desc" },
            { nameKey: "component_workstation_finance_name", descriptionKey: "component_workstation_finance_desc" },
            { nameKey: "component_workstation_dev_name", descriptionKey: "component_workstation_dev_desc" },
            { nameKey: "component_siem_server_name", descriptionKey: "component_siem_server_desc" },
            { nameKey: "component_av_server_name", descriptionKey: "component_av_server_desc" }
        ]
    };
    function createDisplayedItemElement(itemData) {
        const itemElement = document.createElement('div');
        itemElement.className = 'displayed-item flex items-center my-1 border border-[var(--card-border-color)] rounded-md bg-[var(--card-bg-color)] shadow-sm';
        if (itemData.icon) {
            const img = document.createElement('img');
            img.src = itemData.icon;
            img.alt = itemData.name;
            img.className = 'w-4 h-4 object-contain rtl:ml-1.5 ltr:mr-1.5 flex-shrink-0';
            if (itemData.icon.includes("simple-icons") || itemData.icon.includes("data:image/svg+xml")) {
                img.classList.add('logo-img-light-static');
                // For SVG icons, ensure they are visible in both themes
                img.style.filter = 'none';
            } else if (itemData.icon.includes("pfsense") || itemData.icon.includes("apache") || itemData.icon.includes("mysql") || itemData.icon.includes("wazuh") || itemData.icon.includes("fedoraproject") || itemData.icon.includes("modsecurity") || itemData.icon.includes("snort") || itemData.icon.includes("suricata")) {
                img.classList.add('logo-img-dark-static', 'bg-white', 'p-0.5', 'rounded');
            } else {
                img.classList.add('logo-img-light-static');
            }
            img.onerror = function() { this.style.display='none'; itemElement.classList.add('img-error'); const errorSpan = document.createElement('span'); errorSpan.textContent = '🖼️'; errorSpan.className = 'rtl:ml-2 ltr:mr-2'; itemElement.prepend(errorSpan);};
            itemElement.appendChild(img);
        }
        const nameSpan = document.createElement('span');
        nameSpan.className = 'text-text-color flex-grow text-[0.7rem] leading-tight';
        nameSpan.textContent = itemData.name;
        itemElement.appendChild(nameSpan);
        return itemElement;
    }
    function renderArchitectureDiagram(architectureData) {
        if (!architectureData || !architectureData.zones) {
            Object.values(displayZones).forEach(zoneEl => {
                if(zoneEl) {
                    const placeholder = zoneEl.querySelector('.drop-placeholder');
                    if (placeholder) placeholder.textContent = getLocalizedString('error_loading_arch_data');
                }
            });
            return;
        }
        Object.entries(displayZones).forEach(([zoneKey, zoneEl]) => {
            if (!zoneEl) {
                return;
            }
            const placeholder = zoneEl.querySelector('.drop-placeholder');
            Array.from(zoneEl.children).forEach(child => {
                if (child !== placeholder) child.remove();
            });
            const itemsInZone = architectureData.zones[zoneKey] || [];
            if (itemsInZone.length > 0) {
                if (placeholder) placeholder.style.display = 'none';
                itemsInZone.forEach(item => {
                    zoneEl.appendChild(createDisplayedItemElement(item));
                });
            } else {
                if (placeholder) {
                    placeholder.textContent = getLocalizedString('zone_empty_placeholder_trainee');
                    placeholder.style.display = 'block';
                }
            }
        });
    }
    function renderKeyComponentsList(keyComponents) {
        if (!architectureComponentsList) return;
        architectureComponentsList.innerHTML = '';
        if (!keyComponents || keyComponents.length === 0) {
            if (noComponentsMsg) noComponentsMsg.classList.remove('hidden');
            return;
        }
        if (noComponentsMsg) noComponentsMsg.classList.add('hidden');
        keyComponents.forEach(component => {
            const li = document.createElement('li');
            li.className = 'component-list-item p-3';
            li.innerHTML = `
                <strong class="text-text-color block text-sm">${getLocalizedString(component.nameKey)}</strong>
                <p class="text-xs text-subtitle">${getLocalizedString(component.descriptionKey)}</p>
            `;
            architectureComponentsList.appendChild(li);
        });
    }
    function setupNavigation() {
        const prevButtonTextEl = document.getElementById('prev-button-text');
        if(prevButtonTextEl) {
            let currentUserType = document.body.dataset.userType || 'trainee_general';
            let prevButtonKey = currentUserType === 'trainee_workshop' ? 'go_back_to_workshop_flow_from_arch' : 'go_back_to_available_scenarios_from_arch';
            prevButtonTextEl.dataset.langKey = prevButtonKey;
            prevButtonTextEl.textContent = getLocalizedString(prevButtonKey);
        }
    }
    function initializePage() {
         if (typeof getLocalizedString === 'function' && window.translations &&
            Object.keys(window.translations[window.currentLang || 'he'] || {}).length > 10) {
            renderArchitectureDiagram(mockScenarioData.architecture);
            renderKeyComponentsList(mockScenarioData.keyComponents);
            setupNavigation();
        } else {
            setTimeout(initializePage, 100);
        }
    }
    setTimeout(initializePage, 50);
    window.updatePageSpecificTranslations = function(langPack, lang) {
        initializePage();
    };
});