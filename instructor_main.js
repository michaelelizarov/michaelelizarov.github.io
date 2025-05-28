// instructor_main.js
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
            grid: getComputedStyle(document.documentElement).getPropertyValue(isDarkMode ? '--chart-grid-border-color-dark' : '--chart-grid-border-color-light').trim(),
            // text: getComputedStyle(document.documentElement).getPropertyValue(isDarkMode ? '--text-color-dark' : '--text-color-light').trim(), // Original
            chartText: getComputedStyle(document.documentElement).getPropertyValue(isDarkMode ? '--chart-text-color-dark' : '--chart-text-color-light').trim(), // Use dedicated chart text color
            primaryFill: isDarkMode ? 'rgba(59, 130, 246, 0.2)' : 'rgba(37, 99, 235, 0.1)', // Enhanced fill colors for better dark mode visibility
            barColor1: isDarkMode ? 'rgba(96, 165, 250, 0.8)' : 'rgba(59, 130, 246, 0.7)', // Increased opacity for dark mode
            barColor2: isDarkMode ? 'rgba(52, 211, 153, 0.8)' : 'rgba(16, 185, 129, 0.7)',
            barColor3: isDarkMode ? 'rgba(251, 191, 36, 0.8)' : 'rgba(245, 158, 11, 0.7)',
            barColor4: isDarkMode ? 'rgba(167, 139, 250, 0.8)' : 'rgba(139, 92, 246, 0.7)',
            tooltipBg: getComputedStyle(document.documentElement).getPropertyValue(isDarkMode ? '--chart-tooltip-bg-dark' : '--chart-tooltip-bg-light').trim(),
            tooltipText: getComputedStyle(document.documentElement).getPropertyValue(isDarkMode ? '--chart-tooltip-text-dark' : '--chart-tooltip-text-light').trim(),
        };
    }
    let scenarioProgressChartInstance = null;
    let resourceUtilizationChartInstance = null;
    function createScenarioProgressChart() {
        const ctx = document.getElementById('scenarioProgressChart')?.getContext('2d');
        const noDataEl = document.getElementById('scenarioProgressChart-nodata');
        if (!ctx) {
            if(noDataEl) noDataEl.classList.remove('hidden');
            return;
        }
        if(noDataEl) noDataEl.classList.add('hidden');
        const colors = getChartColors();
        const lang = window.currentLang || 'he';
        const data = {
            labels: [
                getLocalizedString('scenario_alpha_label', {}, lang),
                getLocalizedString('scenario_beta_label', {}, lang),
                getLocalizedString('scenario_gamma_label', {}, lang),
                getLocalizedString('scenario_delta_label', {}, lang),
                getLocalizedString('scenario_epsilon_label', {}, lang)
            ],
            datasets: [{
                label: getLocalizedString('chart_dataset_completion_rate', {}, lang),
                data: [75, 60, 90, 45, 80], // Example data
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
        if (scenarioProgressChartInstance) {
            scenarioProgressChartInstance.destroy();
        }
        scenarioProgressChartInstance = new Chart(ctx, {
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
                        beginAtZero: true,
                        max: 100,
                        ticks: { 
                            color: colors.chartText, 
                            font: { family: 'Rubik'},
                            callback: value => value + '%'
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
                                if (context.parsed.y !== null) label += context.parsed.y + '%';
                                return label;
                            }
                        }
                    }
                }
            }
        });
    }
    function createResourceUtilizationChart() {
        const ctx = document.getElementById('resourceUtilizationChart')?.getContext('2d');
        const noDataEl = document.getElementById('resourceUtilizationChart-nodata');
        if (!ctx) {
            if(noDataEl) noDataEl.classList.remove('hidden');
            return;
        }
        if(noDataEl) noDataEl.classList.add('hidden');
        const colors = getChartColors();
        const lang = window.currentLang || 'he';
        const data = {
            labels: [
                getLocalizedString('resource_cpu_label', {}, lang),
                getLocalizedString('resource_memory_label', {}, lang),
                getLocalizedString('resource_disk_label', {}, lang),
                getLocalizedString('resource_network_label', {}, lang)
            ],
            datasets: [{
                label: getLocalizedString('chart_dataset_utilization_percent', {}, lang),
                data: [65, 55, 30, 70], // Example data
                backgroundColor: [
                    colors.barColor1,
                    colors.barColor2,
                    colors.barColor3,
                    colors.barColor4
                ],
                borderColor: [
                    colors.barColor1.replace('0.7', '1').replace('0.8', '1'), // Make border slightly more opaque
                    colors.barColor2.replace('0.7', '1').replace('0.8', '1'),
                    colors.barColor3.replace('0.7', '1').replace('0.8', '1'),
                    colors.barColor4.replace('0.7', '1').replace('0.8', '1')
                ],
                borderWidth: 1,
                borderRadius: 4 // Rounded bars
            }]
        };
        if (resourceUtilizationChartInstance) {
            resourceUtilizationChartInstance.destroy();
        }
        resourceUtilizationChartInstance = new Chart(ctx, {
            type: 'bar',
            data: data,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                indexAxis: 'y', // Horizontal bar chart
                animation: {
                    duration: 1200, // Longer animation
                    easing: 'easeOutQuart',
                    delay: function(context) {
                        // Stagger animations for each bar
                        return context.dataIndex * 100;
                    }
                },
                scales: {
                    x: {
                        beginAtZero: true,
                        max: 100,
                        ticks: { 
                            color: colors.chartText, 
                            font: { family: 'Rubik'}, 
                            callback: value => value + '%' 
                        },
                        grid: { 
                            color: colors.grid,
                            lineWidth: 0.5
                        }
                    },
                    y: {
                        ticks: { 
                            color: colors.chartText, 
                            font: { family: 'Rubik', weight: 'medium'} 
                        },
                        grid: { display: false }
                    }
                },
                plugins: {
                    legend: {
                        display: false
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
                                if (context.parsed.x !== null) label += context.parsed.x + '%';
                                return label;
                            }
                        }
                    }
                }
            }
        });
    }
    // Make chart update function globally available if needed by theme switcher
    window.updateInstructorMainCharts = () => {
        createScenarioProgressChart();
        createResourceUtilizationChart();
    };
    function updateKPIs() {
        const kpiElements = {
            activeSimulations: document.querySelector('[data-lang-key="kpi_active_simulations_value"]'),
            totalScenarios: document.querySelector('[data-lang-key="kpi_total_scenarios_value"]'),
            activeParticipantsTeams: document.querySelector('[data-lang-key="kpi_active_participants_teams_value"]'),
            avgScore: document.querySelector('[data-lang-key="kpi_avg_score_value"]'),
            newScenariosMonthly: document.querySelector('[data-lang-key="kpi_new_scenarios_monthly_value"]'),
            pendingReview: document.querySelector('[data-lang-key="kpi_pending_review_value"]'),
            avgCompletionTime: document.querySelector('[data-lang-key="kpi_avg_completion_time_value"]'),
            monthlySimulations: document.querySelector('[data-lang-key="kpi_monthly_simulations_value"]'),
        };
        // Mock data for KPIs
        const kpiData = {
            activeSimulations: 5,
            totalScenarios: 24,
            activeParticipantsTeams: "12 (3)",
            avgScore: "82%",
            newScenariosMonthly: 3,
            pendingReview: 2,
            avgCompletionTime: 47, // Number, suffix will be added
            monthlySimulations: 18,
        };
        if (kpiElements.activeSimulations) kpiElements.activeSimulations.textContent = kpiData.activeSimulations;
        if (kpiElements.totalScenarios) kpiElements.totalScenarios.textContent = kpiData.totalScenarios;
        if (kpiElements.activeParticipantsTeams) kpiElements.activeParticipantsTeams.textContent = kpiData.activeParticipantsTeams;
        if (kpiElements.avgScore) kpiElements.avgScore.textContent = kpiData.avgScore;
        if (kpiElements.newScenariosMonthly) kpiElements.newScenariosMonthly.textContent = kpiData.newScenariosMonthly;
        if (kpiElements.pendingReview) kpiElements.pendingReview.textContent = kpiData.pendingReview;
        if (kpiElements.avgCompletionTime) {
            kpiElements.avgCompletionTime.innerHTML = `${kpiData.avgCompletionTime} <span data-lang-key="minutes_suffix">${getLocalizedString('minutes_suffix')}</span>`;
        }
        if (kpiElements.monthlySimulations) kpiElements.monthlySimulations.textContent = kpiData.monthlySimulations;
    }
    function initializePageComponents() {
        if (typeof getLocalizedString === 'function' && window.translations &&
            Object.keys(window.translations[window.currentLang || 'he'] || {}).length > 10) { // Basic check
             window.updateInstructorMainCharts(); // This will create charts
             updateKPIs();
        } else {
            // console.warn("instructor_main.js: Translations not fully ready, retrying init.");
            setTimeout(initializePageComponents, 100);
        }
    }
    setTimeout(initializePageComponents, 50); // Initial attempt
    // If app-global.js handles theme changes by reloading, this isn't strictly necessary.
    // However, if theme changes without reload (as per my updated app-global.js), this is needed.
    window.updatePageSpecificTheme = function(theme) {
        // console.log("instructor_main.js: Theme changed to", theme, "updating charts.");
        window.updateInstructorMainCharts();
    };
    // Language changes are handled by page reload in app-global.js, so content will re-render with new lang.
    
    // Listen for theme change events
    document.addEventListener('themeChanged', function(e) {
        const theme = e.detail.theme;
        // Apply immediate visual updates to charts
        const chartContainers = document.querySelectorAll('.chart-container');
        chartContainers.forEach(container => {
            if (theme === 'dark') {
                container.style.transition = 'background-color 0.3s ease';
                container.style.backgroundColor = 'var(--card-bg-color-dark)';
            } else {
                container.style.transition = 'background-color 0.3s ease';
                container.style.backgroundColor = 'var(--card-bg-color-light)';
            }
        });
        
        // Update charts after a short delay to allow CSS transitions to complete
        setTimeout(() => {
            window.updateInstructorMainCharts();
        }, 300);
    });
});