// instructor_cost_resource.js
'use strict';
document.addEventListener('DOMContentLoaded', () => {
    const getLocalizedString = typeof window.getTranslatedStringGlobal === 'function' ?
        window.getTranslatedStringGlobal :
        function(key, replacements = {}, lang = 'he') { console.warn('getTranslatedStringGlobal not found, using fallback for key:', key); return `[${key}]`; };
    function getChartColors() {
        const isDarkMode = document.body.classList.contains('dark-theme');
        return {
            primary: getComputedStyle(document.documentElement).getPropertyValue(isDarkMode ? '--primary-color-dark' : '--primary-color-light').trim(),
            secondary: getComputedStyle(document.documentElement).getPropertyValue(isDarkMode ? '--secondary-color-dark' : '--secondary-color-light').trim(),
            danger: getComputedStyle(document.documentElement).getPropertyValue(isDarkMode ? '--danger-color-dark' : '--danger-color-light').trim(),
            grid: getComputedStyle(document.documentElement).getPropertyValue(isDarkMode ? '--chart-grid-border-color-dark' : '--chart-grid-border-color-light').trim(),
            chartText: getComputedStyle(document.documentElement).getPropertyValue(isDarkMode ? '--chart-text-color-dark' : '--chart-text-color-light').trim(),
            primaryFill: isDarkMode ? 'rgba(59, 130, 246, 0.2)' : 'rgba(37, 99, 235, 0.1)',
            allocColor1: isDarkMode ? 'rgba(96, 165, 250, 0.8)' : 'rgba(59, 130, 246, 0.7)',
            allocColor2: isDarkMode ? 'rgba(52, 211, 153, 0.8)' : 'rgba(16, 185, 129, 0.7)',
            allocColor3: isDarkMode ? 'rgba(251, 191, 36, 0.8)' : 'rgba(245, 158, 11, 0.7)',
            allocColor4: isDarkMode ? 'rgba(167, 139, 250, 0.8)' : 'rgba(139, 92, 246, 0.7)',
            allocColor5: isDarkMode ? 'rgba(248, 113, 113, 0.8)' : 'rgba(239, 68, 68, 0.7)',
            tooltipBg: getComputedStyle(document.documentElement).getPropertyValue(isDarkMode ? '--chart-tooltip-bg-dark' : '--chart-tooltip-bg-light').trim(),
            tooltipText: getComputedStyle(document.documentElement).getPropertyValue(isDarkMode ? '--chart-tooltip-text-dark' : '--chart-tooltip-text-light').trim(),
        };
    }
    let costTrendChartInstance = null;
    let resourceAllocationChartInstance = null;
    function createCostTrendChart() {
        const ctx = document.getElementById('costTrendChart')?.getContext('2d');
        const noDataEl = document.getElementById('cost-trend-chart-nodata');
        if (!ctx) {
            if(noDataEl) noDataEl.classList.remove('hidden');
            return;
        }
        if(noDataEl) noDataEl.classList.add('hidden');
        const colors = getChartColors();
        const lang = window.currentLang || 'he';
        const data = {
            labels: [
                getLocalizedString('month_jan', {}, lang),
                getLocalizedString('month_feb', {}, lang),
                getLocalizedString('month_mar', {}, lang),
                getLocalizedString('month_apr', {}, lang),
                getLocalizedString('month_may', {}, lang),
                getLocalizedString('month_jun', {}, lang)
            ],
            datasets: [{
                label: getLocalizedString('chart_dataset_monthly_cost', {}, lang),
                data: [257.50, 280.00, 265.50, 300.75, 320.00, 290.25], // Example data
                backgroundColor: colors.primaryFill,
                borderColor: colors.primary,
                borderWidth: 2,
                tension: 0.4,
                fill: true,
                pointBackgroundColor: colors.primary,
                pointBorderColor: document.body.classList.contains('dark-theme') ? '#1e293b' : '#ffffff',
                pointRadius: 4,
                pointHoverRadius: 6
            }]
        };
        if (costTrendChartInstance) costTrendChartInstance.destroy();
        costTrendChartInstance = new Chart(ctx, {
            type: 'line',
            data: data,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                animation: {
                    duration: 1000, // Longer animation for better visual effect
                    easing: 'easeOutQuart'
                },
                scales: {
                    y: {
                        beginAtZero: false,
                        ticks: { 
                            color: colors.chartText, 
                            font: { family: 'Rubik'},
                            callback: value => (getLocalizedString('currency_symbol_nis', {}, lang) || '$') + value.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2 })
                        },
                        grid: { 
                            color: colors.grid,
                            drawBorder: true,
                            lineWidth: 0.5
                        }
                    },
                    x: {
                        ticks: { color: colors.chartText, font: { family: 'Rubik'} },
                        grid: { 
                            color: colors.grid,
                            drawOnChartArea: false  // Only show grid lines for the Y axis
                        }
                    }
                },
                plugins: {
                    legend: {
                        labels: { 
                            color: colors.chartText, 
                            font: { family: 'Rubik', weight: 'bold'} 
                        },
                        position: 'top'
                    },
                    tooltip: {
                        titleFont: { family: 'Rubik', weight: 'bold' },
                        bodyFont: { family: 'Rubik' },
                        backgroundColor: colors.tooltipBg,
                        titleColor: colors.tooltipText,
                        bodyColor: colors.tooltipText,
                        padding: 10,
                        cornerRadius: 6,
                        callbacks: {
                            label: function(context) {
                                let label = context.dataset.label || '';
                                if (label) label += ': ';
                                if (context.parsed.y !== null) label += (getLocalizedString('currency_symbol_nis', {}, lang) || '$') + context.parsed.y.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2 });
                                return label;
                            }
                        }
                    }
                }
            }
        });
    }
    function createResourceAllocationChart() {
        const ctx = document.getElementById('resourceAllocationChart')?.getContext('2d');
        const noDataEl = document.getElementById('resource-allocation-chart-nodata');
        if (!ctx) {
            if(noDataEl) noDataEl.classList.remove('hidden');
            return;
        }
        if(noDataEl) noDataEl.classList.add('hidden');
        const colors = getChartColors();
        const lang = window.currentLang || 'he';
        const data = {
            labels: [
                getLocalizedString('chart_label_compute', {}, lang),
                getLocalizedString('chart_label_storage', {}, lang),
                getLocalizedString('chart_label_network', {}, lang),
                getLocalizedString('chart_label_licensing', {}, lang),
                getLocalizedString('chart_label_other', {}, lang)
            ],
            datasets: [{
                label: getLocalizedString('chart_cost_breakdown_title', {}, lang),
                data: [150.00, 80.50, 15.00, 10.00, 2.00], // Example costs
                backgroundColor: [
                    colors.allocColor1, colors.allocColor2, colors.allocColor3,
                    colors.allocColor4, colors.allocColor5
                ],
                borderColor: document.body.classList.contains('dark-theme') ? '#1e293b' : '#ffffff',
                borderWidth: 2,
                hoverOffset: 8
            }]
        };
        if (resourceAllocationChartInstance) resourceAllocationChartInstance.destroy();
        resourceAllocationChartInstance = new Chart(ctx, {
            type: 'doughnut',
            data: data,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '60%',
                animation: {
                    animateRotate: true,
                    animateScale: true,
                    duration: 1200,
                    easing: 'easeOutQuart'
                },
                plugins: {
                    legend: { 
                        position: 'bottom', 
                        labels: { 
                            color: colors.chartText, 
                            font: { family: 'Rubik', size: 12, weight: 'medium' }, 
                            padding: 15,
                            usePointStyle: true,
                            pointStyle: 'circle'
                        }
                    },
                    tooltip: {
                        backgroundColor: colors.tooltipBg,
                        titleColor: colors.tooltipText,
                        bodyColor: colors.tooltipText,
                        titleFont: { family: 'Rubik', weight: 'bold' },
                        bodyFont: { family: 'Rubik' },
                        padding: 10,
                        cornerRadius: 6,
                        callbacks: {
                            label: function(context) {
                                let label = context.label || '';
                                if (label) label += ': ';
                                if (context.parsed !== null) {
                                    label += (getLocalizedString('currency_symbol_nis', {}, lang) || '$') + context.parsed.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2});
                                    // Add percentage
                                    const total = context.dataset.data.reduce((sum, val) => sum + val, 0);
                                    const percentage = Math.round((context.parsed / total) * 100);
                                    label += ` (${percentage}%)`;
                                }
                                return label;
                            }
                        }
                    }
                }
            }
        });
    }
    window.updateInstructorCostCharts = () => {
        createCostTrendChart();
        createResourceAllocationChart();
    };
    
    // Listen for theme changes to update charts
    document.addEventListener('themeChanged', () => {
        window.updateInstructorCostCharts();
    });
    function populateDetailedCostTable() {
        const tableBody = document.getElementById('cost-table-body');
        const loadingRow = document.getElementById('loading-cost-data-row');
        if (!tableBody) {
            return;
        }
        const lang = window.currentLang || 'he';
        const mockDetailedCosts = [
            { simNameKey: "sim_example_1_name", resourceTypeKey: "sim_example_1_type", cost: 12.50, startDate: "2024-05-01" },
            { simName: getLocalizedString("scenario_phishing_advanced",{},lang) + " (" + getLocalizedString("team_gamma",{},lang) + ")", resourceType: "VM Type B", cost: 8.75, startDate: "2024-05-03" },
            { simName: getLocalizedString("scenario_web_server_compromise",{},lang) + " (" + getLocalizedString("user_example_2_name", {}, lang) + ")", resourceType: "VM Type A, WAF", cost: 15.20, startDate: "2024-05-05" },
            { simNameKey: "scenario_data_leakage", resourceTypeKey: "vm_type_c_key", cost: 22.00, startDate: "2024-05-08" },
            { simNameKey: "scenario_insider_threat", resourceTypeKey: "various_small_tools_key", cost: 5.50, startDate: "2024-05-11" },
        ];
        tableBody.innerHTML = '';
        if(loadingRow) tableBody.appendChild(loadingRow);
        if (mockDetailedCosts.length === 0) {
            if(loadingRow){
                loadingRow.classList.remove('hidden');
                loadingRow.cells[0].textContent = getLocalizedString('no_cost_data_available', {}, lang);
            }
            return;
        }
        if(loadingRow) loadingRow.classList.add('hidden');
        mockDetailedCosts.forEach(cost => {
            const row = tableBody.insertRow();
            row.insertCell().textContent = cost.simNameKey ? getLocalizedString(cost.simNameKey, {}, lang) : cost.simName;
            row.insertCell().textContent = cost.resourceTypeKey ? getLocalizedString(cost.resourceTypeKey, {}, lang) : cost.resourceType;
            row.insertCell().textContent = (getLocalizedString('currency_symbol_nis', {}, lang) || '$') + cost.cost.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2 });
            row.insertCell().textContent = cost.startDate;
        });
    }
    function updateCostKPIs() {
        const kpiElements = {
            totalMonthlyCost: document.getElementById('total-monthly-cost'),
            activeInstances: document.getElementById('active-instances'),
            totalVcpuUsed: document.getElementById('total-vcpu-used'), // This is the <p> tag
            storageUsed: document.getElementById('storage-used'),
            totalAllocatedStorage: document.getElementById('total-allocated-storage'), // This is the <p> tag
            simulationHours: document.getElementById('simulation-hours'),
            avgCostPerHour: document.getElementById('avg-cost-per-hour'), // This is the <p> tag
        };
        const lang = window.currentLang || 'he';
        const currency = getLocalizedString('currency_symbol_nis', {}, lang) || '$';
        const kpiData = {
            totalMonthlyCost: 257.50,
            activeInstances: 12,
            totalVcpuUsed: 48,
            storageUsed: "750 GB",
            totalAllocatedStorage: "2000 GB",
            simulationHours: 320,
            avgCostPerHour: 0.80
        };
        if (kpiElements.totalMonthlyCost) kpiElements.totalMonthlyCost.textContent = `${currency}${kpiData.totalMonthlyCost.toFixed(2)}`;
        if (kpiElements.activeInstances) kpiElements.activeInstances.textContent = kpiData.activeInstances;
        if (kpiElements.totalVcpuUsed) kpiElements.totalVcpuUsed.innerHTML = `<span data-lang-key="kpi_total_vcpu_used">${getLocalizedString("kpi_total_vcpu_used", {}, lang)}</span> ${kpiData.totalVcpuUsed}`;
        if (kpiElements.storageUsed) kpiElements.storageUsed.textContent = kpiData.storageUsed;
        if (kpiElements.totalAllocatedStorage) kpiElements.totalAllocatedStorage.innerHTML = `<span data-lang-key="kpi_total_allocated_storage">${getLocalizedString("kpi_total_allocated_storage", {}, lang)}</span> ${kpiData.totalAllocatedStorage}`;
        if (kpiElements.simulationHours) kpiElements.simulationHours.textContent = kpiData.simulationHours;
        if (kpiElements.avgCostPerHour) kpiElements.avgCostPerHour.innerHTML = `<span data-lang-key="kpi_avg_cost_per_hour">${getLocalizedString("kpi_avg_cost_per_hour", {}, lang)}</span> ${currency}${kpiData.avgCostPerHour.toFixed(2)}`;
    }
    function initializePage() {
        if (typeof getLocalizedString === 'function' && window.translations &&
            Object.keys(window.translations[window.currentLang || 'he'] || {}).length > 10) {
             window.updateInstructorCostCharts();
             populateDetailedCostTable();
             updateCostKPIs();
        } else {
            // console.warn("instructor_cost_resource.js: Translations not ready, retrying init.");
            setTimeout(initializePage, 100);
        }
    }
    setTimeout(initializePage, 50);
    // This function will be called by app-global.js when the theme changes
    window.updatePageSpecificTheme = function(theme) {
        // console.log("instructor_cost_resource.js: Theme changed to", theme, ". Re-creating charts.");
        window.updateInstructorCostCharts();
    };
    // Language changes are handled by page reload in app-global.js,
    // so initializePage will run again with the new language.
});