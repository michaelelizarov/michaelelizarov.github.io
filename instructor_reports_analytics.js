// instructor_reports_analytics.js
'use strict';
document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const startDateFilter = document.getElementById('start-date-filter');
    const endDateFilter = document.getElementById('end-date-filter');
    const exportReportBtn = document.getElementById('export-report-btn');
    const completedSimsCountEl = document.getElementById('completed-simulations-count');
    const avgSuccessRateEl = document.getElementById('avg-success-rate');
    const avgResolutionTimeEl = document.getElementById('avg-resolution-time');
    const mostChallengingScenarioEl = document.getElementById('most-challenging-scenario');
    const participantPerformanceChartCtx = document.getElementById('participantPerformanceChart')?.getContext('2d');
    const scoreDistributionChartCtx = document.getElementById('scoreDistributionChart')?.getContext('2d');
    const stageCompletionTimeChartCtx = document.getElementById('stageCompletionTimeChart')?.getContext('2d');
    const resourceAllocationChartCtx = document.getElementById('resourceAllocationChart')?.getContext('2d');
    const participantPerfNoDataEl = document.getElementById('participantPerformanceChart-nodata');
    const scoreDistNoDataEl = document.getElementById('scoreDistributionChart-nodata');
    const stageCompleteNoDataEl = document.getElementById('stageCompletionTimeChart-nodata');
    const resourceAllocationNoDataEl = document.getElementById('resourceAllocationChart-nodata');
    const reportsTableBody = document.getElementById('reports-table-body');
    const reportsTableHead = document.querySelector('table.custom-table thead');
    const loadingReportsRow = document.getElementById('loading-reports-row');
    const filterReportScenarioSelect = document.getElementById('filter-report-scenario');
    const filterReportUserTeamSelect = document.getElementById('filter-report-user-team');
    const reportsPaginationContainer = document.getElementById('reports-pagination');
    let participantPerformanceChartInstance = null;
    let scoreDistributionChartInstance = null;
    let stageCompletionTimeChartInstance = null;
    let resourceAllocationChartInstance = null;
    let currentReportsPage = 1;
    const REPORTS_ITEMS_PER_PAGE = 5;
    const getLocalizedString = typeof window.getTranslatedStringGlobal === 'function' ?
        window.getTranslatedStringGlobal :
        function(key, replacements = {}) { console.warn('getTranslatedStringGlobal not found for key:', key); return `[${key}]`; };
    function getChartColors() {
        const isDarkMode = document.body.classList.contains('dark-theme');
        return {
            primary: getComputedStyle(document.documentElement).getPropertyValue(isDarkMode ? '--primary-color-dark' : '--primary-color-light').trim(),
            secondary: getComputedStyle(document.documentElement).getPropertyValue(isDarkMode ? '--secondary-color-dark' : '--secondary-color-light').trim(),
            danger: getComputedStyle(document.documentElement).getPropertyValue(isDarkMode ? '--danger-color-dark' : '--danger-color-light').trim(),
            grid: getComputedStyle(document.documentElement).getPropertyValue(isDarkMode ? '--chart-grid-border-color-dark' : '--chart-grid-border-color-light').trim(),
            chartText: getComputedStyle(document.documentElement).getPropertyValue(isDarkMode ? '--chart-text-color-dark' : '--chart-text-color-light').trim(),
            tooltipBg: getComputedStyle(document.documentElement).getPropertyValue(isDarkMode ? '--chart-tooltip-bg-dark' : '--chart-tooltip-bg-light').trim(),
            tooltipText: getComputedStyle(document.documentElement).getPropertyValue(isDarkMode ? '--chart-tooltip-text-dark' : '--chart-tooltip-text-light').trim(),
            primaryFill: isDarkMode ? 'rgba(59, 130, 246, 0.2)' : 'rgba(37, 99, 235, 0.1)',
            scoreRangeColors: [
                isDarkMode ? 'rgba(239, 68, 68, 0.8)' : 'rgba(220, 38, 38, 0.7)',
                isDarkMode ? 'rgba(249, 115, 22, 0.8)' : 'rgba(234, 88, 12, 0.7)',
                isDarkMode ? 'rgba(234, 179, 8, 0.8)' : 'rgba(202, 138, 4, 0.7)',
                isDarkMode ? 'rgba(34, 197, 94, 0.8)' : 'rgba(22, 163, 74, 0.7)',
            ],
            barColors: [
                isDarkMode ? 'rgba(96, 165, 250, 0.8)' : 'rgba(59, 130, 246, 0.7)',
                isDarkMode ? 'rgba(52, 211, 153, 0.8)' : 'rgba(16, 185, 129, 0.7)',
                isDarkMode ? 'rgba(251, 191, 36, 0.8)' : 'rgba(245, 158, 11, 0.7)',
                isDarkMode ? 'rgba(167, 139, 250, 0.8)' : 'rgba(139, 92, 246, 0.7)',
                isDarkMode ? 'rgba(248, 113, 113, 0.8)' : 'rgba(239, 68, 68, 0.7)'
            ]
        };
    }
    // --- Mock Data ---
    const mockParticipantPerformance = {
        labels: ["ינואר", "פברואר", "מרץ", "אפריל", "מאי", "יוני"].map((monthKey, index) => getLocalizedString(`month_${monthKey.toLowerCase()}`,{},window.currentLang) || `Month ${index+1}`),
        datasets: [
            { labelKey: 'chart_dataset_avg_score', data: [65, 70, 72, 78, 80, 85] }
        ]
    };
    const mockScoreDistribution = {
        labels: [
            getLocalizedString('scenario_phishing_short'),
            getLocalizedString('scenario_ransomware_short'),
            getLocalizedString('scenario_insider_short'),
            getLocalizedString('scenario_web_breach_short'),
            getLocalizedString('scenario_data_leak_short')
        ],
        datasets: [
            { label: '0-50', data: [2, 1, 3, 0, 2], stack: 'scores' },
            { label: '51-70', data: [5, 4, 2, 3, 3], stack: 'scores' },
            { label: '71-90', data: [10, 8, 7, 9, 6], stack: 'scores' },
            { label: '91-100', data: [3, 5, 2, 4, 1], stack: 'scores' }
        ]
    };
    const mockStageCompletion = {
        labels: [
            getLocalizedString('scenario_phishing_short'),
            getLocalizedString('scenario_ransomware_short'),
            getLocalizedString('scenario_insider_short'),
            getLocalizedString('scenario_web_breach_short'),
            getLocalizedString('scenario_data_leak_short')
        ],
        datasets: [
            { labelKey: 'stage_1_label', data: [10, 12, 8, 15, 11] },
            { labelKey: 'stage_2_label', data: [20, 25, 18, 22, 20] },
            { labelKey: 'stage_3_label', data: [15, 18, 12, 17, 16] },
            { labelKey: 'stage_4_label', data: [10, 15, 10, 12, 14] },
            { labelKey: 'stage_5_label', data: [5, 8, 6, 7, 7] },
        ]
    };
    
    const mockResourceAllocation = {
        labels: [
            getLocalizedString('scenario_phishing_short'),
            getLocalizedString('scenario_ransomware_short'),
            getLocalizedString('scenario_insider_short'),
            getLocalizedString('scenario_web_breach_short'),
            getLocalizedString('scenario_data_leak_short')
        ],
        datasets: [
            { 
                labelKey: 'resource_type_cpu', 
                data: [25, 40, 30, 35, 28],
                backgroundColor: getChartColors().barColors[0]
            },
            { 
                labelKey: 'resource_type_memory', 
                data: [30, 35, 25, 40, 32],
                backgroundColor: getChartColors().barColors[1]
            },
            { 
                labelKey: 'resource_type_storage', 
                data: [15, 10, 25, 15, 20],
                backgroundColor: getChartColors().barColors[2]
            },
            { 
                labelKey: 'resource_type_network', 
                data: [20, 15, 10, 5, 15],
                backgroundColor: getChartColors().barColors[3]
            },
            { 
                labelKey: 'resource_type_other', 
                data: [10, 0, 10, 5, 5],
                backgroundColor: getChartColors().barColors[4]
            }
        ]
    };
    
    let mockDetailedReports = [
        { id: 'rep001', userTeamKey: 'user_team_example_alpha', scenarioKey: 'scenario_example_ransom', date: '2024-05-01', score: 88, completionTime: 45 },
        { id: 'rep002', userTeamKey: 'user_example_yossi', scenarioKey: 'scenario_example_phishing', date: '2024-05-03', score: 72, completionTime: 30 },
        { id: 'rep003', userTeamKey: 'user_team_example_beta', scenarioKey: 'scenario_example_ransom', date: '2024-05-05', score: 92, completionTime: 40 },
        { id: 'rep004', userTeamKey: 'user_team_example_alpha', scenarioKey: 'scenario_example_phishing', date: '2024-04-20', score: 65, completionTime: 55 },
        { id: 'rep005', userTeamKey: 'user_example_yossi', scenarioKey: 'scenario_example_ransom', date: '2024-04-15', score: 95, completionTime: 38 },
        { id: 'rep006', userTeamKey: 'user_team_example_beta', scenarioKey: 'scenario_example_phishing', date: '2024-04-10', score: 78, completionTime: 32 },
        { id: 'rep007', userTeamKey: 'user_team_example_alpha', scenarioKey: 'scenario_insider_short', date: '2024-03-20', score: 82, completionTime: 60 },
    ];
    const mockScenarioNamesForFilter = [...new Set(mockDetailedReports.map(r => getLocalizedString(r.scenarioKey)))];
    const mockUserTeamNamesForFilter = [...new Set(mockDetailedReports.map(r => getLocalizedString(r.userTeamKey)))];
    // --- Chart Creation ---
    function createParticipantPerformanceChart() {
        if (!participantPerformanceChartCtx) { if(participantPerfNoDataEl) participantPerfNoDataEl.classList.remove('hidden'); return; }
        if(participantPerfNoDataEl) participantPerfNoDataEl.classList.add('hidden');
        const colors = getChartColors();
        const data = {
            labels: mockParticipantPerformance.labels,
            datasets: mockParticipantPerformance.datasets.map(ds => ({
                label: getLocalizedString(ds.labelKey),
                data: ds.data,
                borderColor: colors.primary,
                backgroundColor: colors.primaryFill,
                tension: 0.4,
                fill: true,
                pointBackgroundColor: colors.primary,
                pointBorderColor: document.body.classList.contains('dark-theme') ? '#1e293b' : '#ffffff',
                pointRadius: 4,
                pointHoverRadius: 6,
                borderWidth: 2
            }))
        };
        if (participantPerformanceChartInstance) participantPerformanceChartInstance.destroy();
        participantPerformanceChartInstance = new Chart(participantPerformanceChartCtx, {
            type: 'line', 
            data: data,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                animation: {
                    duration: 1000,
                    easing: 'easeOutQuart'
                },
                scales: {
                    y: { 
                        beginAtZero: true, 
                        max: 100,
                        ticks: { 
                            color: colors.chartText, 
                            font: {family: 'Rubik'},
                            callback: value => value + '%'
                        }, 
                        grid: { 
                            color: colors.grid,
                            drawBorder: true,
                            lineWidth: 0.5
                        } 
                    },
                    x: { 
                        ticks: { 
                            color: colors.chartText, 
                            font: {family: 'Rubik'} 
                        }, 
                        grid: { 
                            color: colors.grid,
                            drawOnChartArea: false
                        } 
                    }
                },
                plugins: { 
                    legend: { 
                        labels: { 
                            color: colors.chartText, 
                            font: {family: 'Rubik', weight: 'bold'} 
                        },
                        position: 'top'
                    },
                    tooltip: { 
                        backgroundColor: colors.tooltipBg, 
                        titleColor: colors.tooltipText, 
                        bodyColor: colors.tooltipText, 
                        titleFont: {family: 'Rubik', weight: 'bold'}, 
                        bodyFont: {family: 'Rubik'},
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
    function createScoreDistributionChart() {
        if (!scoreDistributionChartCtx) { if(scoreDistNoDataEl) scoreDistNoDataEl.classList.remove('hidden'); return; }
        if(scoreDistNoDataEl) scoreDistNoDataEl.classList.add('hidden');
        const colors = getChartColors();
        const data = {
            labels: mockScoreDistribution.labels,
            datasets: mockScoreDistribution.datasets.map((ds, index) => ({
                label: ds.label,
                data: ds.data,
                backgroundColor: colors.scoreRangeColors[index % colors.scoreRangeColors.length],
                stack: ds.stack,
            }))
        };
        if (scoreDistributionChartInstance) scoreDistributionChartInstance.destroy();
        scoreDistributionChartInstance = new Chart(scoreDistributionChartCtx, {
            type: 'bar', 
            data: data,
            options: {
                responsive: true, 
                maintainAspectRatio: false,
                animation: {
                    duration: 1200,
                    easing: 'easeOutQuart',
                    delay: function(context) {
                        // Stagger animations for each bar
                        return context.datasetIndex * 100;
                    }
                },
                scales: {
                    y: { 
                        stacked: true, 
                        ticks: { 
                            color: colors.chartText, 
                            font: {family: 'Rubik'} 
                        }, 
                        grid: { 
                            color: colors.grid,
                            lineWidth: 0.5
                        } 
                    },
                    x: { 
                        stacked: true, 
                        ticks: { 
                            color: colors.chartText, 
                            font: {family: 'Rubik', weight: 'medium'} 
                        }, 
                        grid: { display: false } 
                    }
                },
                plugins: { 
                    legend: { 
                        position: 'top', 
                        labels: { 
                            color: colors.chartText, 
                            font: {family: 'Rubik', weight: 'medium'},
                            usePointStyle: true,
                            pointStyle: 'rect'
                        } 
                    },
                    tooltip: { 
                        mode: 'index', 
                        intersect: false, 
                        backgroundColor: colors.tooltipBg, 
                        titleColor: colors.tooltipText, 
                        bodyColor: colors.tooltipText, 
                        titleFont: {family: 'Rubik', weight: 'bold'}, 
                        bodyFont: {family: 'Rubik'},
                        padding: 10,
                        cornerRadius: 6
                    }
                }
            }
        });
    }
    function createStageCompletionTimeChart() {
        if (!stageCompletionTimeChartCtx) { if(stageCompleteNoDataEl) stageCompleteNoDataEl.classList.remove('hidden'); return; }
        if(stageCompleteNoDataEl) stageCompleteNoDataEl.classList.add('hidden');
        const colors = getChartColors();
        const data = {
            labels: mockStageCompletion.labels,
            datasets: mockStageCompletion.datasets.map((ds, index) => ({
                label: getLocalizedString(ds.labelKey),
                data: ds.data,
                backgroundColor: colors.barColors[index % colors.barColors.length],
                borderColor: colors.barColors[index % colors.barColors.length].replace('0.7', '1').replace('0.8', '1'),
                borderWidth: 1,
                borderRadius: 3,
                hoverBackgroundColor: colors.barColors[index % colors.barColors.length].replace('0.7', '0.9').replace('0.8', '0.9')
            }))
        };
        if (stageCompletionTimeChartInstance) stageCompletionTimeChartInstance.destroy();
        stageCompletionTimeChartInstance = new Chart(stageCompletionTimeChartCtx, {
            type: 'bar',
            data: data,
            options: {
                indexAxis: 'y',
                responsive: true,
                maintainAspectRatio: false,
                animation: {
                    duration: 1200,
                    easing: 'easeOutQuart',
                    delay: function(context) {
                        return context.datasetIndex * 150;
                    }
                },
                scales: {
                    x: { 
                        beginAtZero: true, 
                        ticks: { 
                            color: colors.chartText, 
                            font: {family: 'Rubik'}, 
                            callback: value => value + " " + getLocalizedString('minutes_suffix') 
                        }, 
                        grid: { 
                            color: colors.grid,
                            lineWidth: 0.5 
                        } 
                    },
                    y: { 
                        ticks: { 
                            color: colors.chartText, 
                            font: {family: 'Rubik', weight: 'medium'} 
                        }, 
                        grid: { display: false } 
                    }
                },
                plugins: { 
                    legend: { 
                        position: 'top', 
                        labels: { 
                            color: colors.chartText, 
                            font: {family: 'Rubik', weight: 'medium'},
                            usePointStyle: true,
                            pointStyle: 'rect'
                        } 
                    },
                    tooltip: { 
                        backgroundColor: colors.tooltipBg, 
                        titleColor: colors.tooltipText, 
                        bodyColor: colors.tooltipText, 
                        titleFont: {family: 'Rubik', weight: 'bold'}, 
                        bodyFont: {family: 'Rubik'},
                        padding: 10,
                        cornerRadius: 6,
                        callbacks: { 
                            label: context => `${context.dataset.label}: ${context.parsed.x} ${getLocalizedString('minutes_suffix')}` 
                        }
                    }
                }
            }
        });
    }
    
    function createResourceAllocationChart() {
        if (!resourceAllocationChartCtx) { 
            if(resourceAllocationNoDataEl) resourceAllocationNoDataEl.classList.remove('hidden'); 
            return; 
        }
        if(resourceAllocationNoDataEl) resourceAllocationNoDataEl.classList.add('hidden');
        
        const colors = getChartColors();
        
        // Corrigir o dataset para usar cores fixas do theme atual e garantir que são aplicadas corretamente
        const data = {
            labels: mockResourceAllocation.labels,
            datasets: mockResourceAllocation.datasets.map((ds, index) => {
                // Obter a cor do índice correspondente nos barColors
                const barColor = colors.barColors[index % colors.barColors.length];
                
                return {
                    label: getLocalizedString(ds.labelKey),
                    data: ds.data,
                    backgroundColor: barColor // Usar a cor do tema atual
                };
            })
        };
        
        if (resourceAllocationChartInstance) resourceAllocationChartInstance.destroy();
        
        resourceAllocationChartInstance = new Chart(resourceAllocationChartCtx, {
            type: 'bar', 
            data: data,
            options: {
                indexAxis: 'y',
                responsive: true, 
                maintainAspectRatio: false,
                animation: {
                    duration: 1000,
                    easing: 'easeOutQuart',
                    delay: function(context) {
                        return context.datasetIndex * 100;
                    }
                },
                scales: {
                    x: { 
                        stacked: true, 
                        ticks: { 
                            color: colors.chartText, 
                            font: {family: 'Rubik'},
                            callback: value => value + '%'
                        }, 
                        grid: { 
                            color: colors.grid,
                            lineWidth: 0.5
                        } 
                    },
                    y: { 
                        stacked: true, 
                        ticks: { 
                            color: colors.chartText, 
                            font: {family: 'Rubik', weight: 'medium'} 
                        }, 
                        grid: { display: false } 
                    }
                },
                plugins: { 
                    legend: { 
                        position: 'top', 
                        labels: { 
                            color: colors.chartText, 
                            font: {family: 'Rubik', weight: 'medium'},
                            usePointStyle: true,
                            pointStyle: 'rect' 
                        } 
                    },
                    tooltip: { 
                        backgroundColor: colors.tooltipBg, 
                        titleColor: colors.tooltipText, 
                        bodyColor: colors.tooltipText, 
                        titleFont: {family: 'Rubik', weight: 'bold'}, 
                        bodyFont: {family: 'Rubik'},
                        padding: 10,
                        cornerRadius: 6,
                        callbacks: {
                            label: function(context) {
                                let label = context.dataset.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                if (context.parsed.x !== null) {
                                    label += context.parsed.x + '%';
                                }
                                return label;
                            }
                        }
                    }
                }
            }
        });
    }
    
    window.updateInstructorReportsCharts = () => {
        createParticipantPerformanceChart();
        createScoreDistributionChart();
        createStageCompletionTimeChart();
        createResourceAllocationChart();
    };
    // --- KPIs Update ---
    function updateKPIs(reportsData = mockDetailedReports) {
        const completedSims = reportsData.filter(r => r.score > 0);
        if(completedSimsCountEl) completedSimsCountEl.textContent = completedSims.length;
        const totalScore = completedSims.reduce((sum, r) => sum + r.score, 0);
        if(avgSuccessRateEl) avgSuccessRateEl.textContent = completedSims.length > 0 ? `${Math.round(totalScore / completedSims.length)}%` : '0%';
        const totalTime = completedSims.reduce((sum, r) => sum + r.completionTime, 0);
        if(avgResolutionTimeEl) avgResolutionTimeEl.innerHTML = completedSims.length > 0 ? `${Math.round(totalTime / completedSims.length)} <span class="text-lg">${getLocalizedString('minutes_suffix')}</span>` : `0 <span class="text-lg">${getLocalizedString('minutes_suffix')}</span>`;
        if(mostChallengingScenarioEl) {
            if (completedSims.length > 0) {
                const scenarioScores = {};
                completedSims.forEach(r => {
                    const scenarioName = getLocalizedString(r.scenarioKey);
                    if (!scenarioScores[scenarioName]) scenarioScores[scenarioName] = { total: 0, count: 0 };
                    scenarioScores[scenarioName].total += r.score;
                    scenarioScores[scenarioName].count++;
                });
                let challengingScenario = getLocalizedString('kpi_no_data_placeholder_short');
                let lowestAvg = 101;
                for (const scn in scenarioScores) {
                    const avg = scenarioScores[scn].total / scenarioScores[scn].count;
                    if (avg < lowestAvg) {
                        lowestAvg = avg;
                        challengingScenario = scn;
                    }
                }
                mostChallengingScenarioEl.textContent = challengingScenario;
            } else {
                 mostChallengingScenarioEl.textContent = getLocalizedString('kpi_no_data_placeholder_short');
            }
        }
    }
    // --- Detailed Reports Table ---
    function renderDetailedReportsTable() {
        if (!reportsTableBody || !loadingReportsRow) return;
        reportsTableBody.innerHTML = '';
        loadingReportsRow.style.display = 'table-row';
        const scenarioFilter = filterReportScenarioSelect.value;
        const userTeamFilter = filterReportUserTeamSelect.value;
        const startDate = startDateFilter.value;
        const endDate = endDateFilter.value;
        const filteredReports = mockDetailedReports.filter(report => {
            const scenarioName = getLocalizedString(report.scenarioKey);
            const userTeamName = getLocalizedString(report.userTeamKey);
            const scenarioMatch = scenarioFilter === 'all' || scenarioName === scenarioFilter;
            const userTeamMatch = userTeamFilter === 'all' || userTeamName === userTeamFilter;
            const dateMatch = (!startDate || report.date >= startDate) && (!endDate || report.date <= endDate);
            return scenarioMatch && userTeamMatch && dateMatch;
        });
        updateKPIs(filteredReports);
        const totalItems = filteredReports.length;
        const paginatedItems = filteredReports.slice((currentReportsPage - 1) * REPORTS_ITEMS_PER_PAGE, currentReportsPage * REPORTS_ITEMS_PER_PAGE);
        if (paginatedItems.length === 0) {
            loadingReportsRow.cells[0].textContent = getLocalizedString('no_reports_found_filter');
        } else {
            loadingReportsRow.style.display = 'none';
            paginatedItems.forEach(report => {
                const row = reportsTableBody.insertRow();
                row.insertCell().textContent = getLocalizedString(report.userTeamKey);
                row.insertCell().textContent = getLocalizedString(report.scenarioKey);
                row.insertCell().textContent = report.date;
                row.insertCell().textContent = `${report.score}%`;
                row.insertCell().textContent = `${report.completionTime} ${getLocalizedString('minutes_suffix')}`;
                const actionsCell = row.insertCell();
                actionsCell.className = 'text-center';
                const viewReportLink = document.createElement('a');
                viewReportLink.href = `instructor_simulation_monitor_detail.html?id=${report.id}&view=report`;
                viewReportLink.className = 'text-primary hover:underline font-medium';
                viewReportLink.textContent = getLocalizedString('view_full_report_link');
                actionsCell.appendChild(viewReportLink);
            });
        }
        renderReportsPagination(totalItems, REPORTS_ITEMS_PER_PAGE, currentReportsPage);
    }
    function populateReportFilterDropdowns() {
        if (filterReportScenarioSelect) {
            filterReportScenarioSelect.innerHTML = `<option value="all">${getLocalizedString('filter_all_scenarios')}</option>`;
            mockScenarioNamesForFilter.forEach(name => {
                const option = document.createElement('option'); option.value = name; option.textContent = name;
                filterReportScenarioSelect.appendChild(option);
            });
        }
        if (filterReportUserTeamSelect) {
            filterReportUserTeamSelect.innerHTML = `<option value="all">${getLocalizedString('filter_all_teams_users_detailed')}</option>`;
            mockUserTeamNamesForFilter.forEach(name => {
                const option = document.createElement('option'); option.value = name; option.textContent = name;
                filterReportUserTeamSelect.appendChild(option);
            });
        }
    }
    function renderReportsPagination(totalItems, itemsPerPage, currentPage) {
        if (!reportsPaginationContainer) return;
        reportsPaginationContainer.innerHTML = '';
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
                if (textOverride === getLocalizedString('pagination_previous')) currentReportsPage--;
                else if (textOverride === getLocalizedString('pagination_next')) currentReportsPage++;
                else currentReportsPage = pageNumber;
                renderDetailedReportsTable();
            });
            return button;
        };
        reportsPaginationContainer.appendChild(createPageButton(currentPage - 1, false, currentPage === 1, getLocalizedString('pagination_previous')));
        for (let i = 1; i <= totalPages; i++) {
            if (totalPages <= 7 || (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1))) {
                 reportsPaginationContainer.appendChild(createPageButton(i, i === currentPage));
            } else if (totalPages > 7 && (i === currentPage - 2 || i === currentPage + 2) ) {
                 const ellipsis = document.createElement('span');
                 ellipsis.textContent = '...';
                 ellipsis.className = 'px-2 py-1 text-sm text-subtitle';
                 reportsPaginationContainer.appendChild(ellipsis);
            }
        }
        reportsPaginationContainer.appendChild(createPageButton(currentPage + 1, false, currentPage === totalPages, getLocalizedString('pagination_next')));
    }
    // --- Initialization & Event Listeners ---
    function initializePageWithTranslations() {
        // Set page title
        if (document.querySelector('.page-title')) {
            document.querySelector('.page-title').textContent = getLocalizedString('reports_analytics_page_title');
        }
        
        // Update breadcrumbs if needed
        if (typeof updateNavbarBreadcrumbs === 'function') {
            updateNavbarBreadcrumbs([
                { text: getLocalizedString('instructor_dashboard'), href: 'instructor_main.html' },
                { text: getLocalizedString('reports_analytics_page_title'), href: '#' }
            ]);
        }
        
        // Reordering chart containers to place resource allocation chart to the left of stage completion time chart
        const resourceAllocationContainer = document.getElementById('resourceAllocationChartContainer');
        const stageCompletionContainer = document.getElementById('stageCompletionTimeChartContainer');
        
        if (resourceAllocationContainer && stageCompletionContainer) {
            // Get the parent element of both containers
            const parentElement = stageCompletionContainer.parentElement;
            
            // Check if they have the same parent
            if (resourceAllocationContainer.parentElement === parentElement) {
                // Create a new flex container div
                const flexContainer = document.createElement('div');
                flexContainer.className = 'flex flex-wrap -mx-2';
                
                // Create column divs for each chart
                const leftColumn = document.createElement('div');
                leftColumn.className = 'w-full md:w-1/2 px-2 mb-4';
                
                const rightColumn = document.createElement('div');
                rightColumn.className = 'w-full md:w-1/2 px-2 mb-4';
                
                // Get original container classes to preserve styling
                const originalContainerClass = resourceAllocationContainer.className;
                
                // Update the chart containers to fit in the columns
                resourceAllocationContainer.className = originalContainerClass;
                stageCompletionContainer.className = originalContainerClass;
                
                // Move the chart containers to their respective columns
                leftColumn.appendChild(resourceAllocationContainer);
                rightColumn.appendChild(stageCompletionContainer);
                
                // Add columns to flex container
                flexContainer.appendChild(leftColumn);
                flexContainer.appendChild(rightColumn);
                
                // Replace stageCompletionContainer with the flex container
                parentElement.insertBefore(flexContainer, stageCompletionContainer.nextSibling);
            }
        }
        
        // Update section headers
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (key) el.textContent = getLocalizedString(key);
        });
        
        // Update filter dropdowns and table column headers
        document.querySelectorAll('[data-i18n-label]').forEach(el => {
            const key = el.getAttribute('data-i18n-label');
            if (key) el.textContent = getLocalizedString(key);
        });
        
        // Update placeholders for inputs
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            if (key) el.placeholder = getLocalizedString(key);
        });
        
        // Update buttons
        document.querySelectorAll('button[data-i18n], input[type="button"][data-i18n]').forEach(btn => {
            const key = btn.getAttribute('data-i18n');
            if (key) btn.textContent = getLocalizedString(key);
        });
        
        // Table headers
        if (reportsTableHead) {
            const headerRow = reportsTableHead.querySelector('tr');
            if (headerRow) {
                Array.from(headerRow.cells).forEach((cell, index) => {
                    const key = cell.getAttribute('data-i18n-header');
                    if (key) cell.textContent = getLocalizedString(key);
                });
            }
        }
        
        // Update KPI labels
        document.querySelectorAll('[data-i18n-kpi-label]').forEach(el => {
            const key = el.getAttribute('data-i18n-kpi-label');
            if (key) el.textContent = getLocalizedString(key);
        });
        
        // Recreate charts with translated labels
        updateInstructorReportsCharts();
        
        // Render reports table with updated translations
        populateReportFilterDropdowns();
        renderDetailedReportsTable();
    }
    setTimeout(initializePageWithTranslations, 50);
    if(filterReportScenarioSelect) filterReportScenarioSelect.addEventListener('change', () => { currentReportsPage = 1; renderDetailedReportsTable(); });
    if(filterReportUserTeamSelect) filterReportUserTeamSelect.addEventListener('change', () => { currentReportsPage = 1; renderDetailedReportsTable(); });
    if(startDateFilter) startDateFilter.addEventListener('change', () => { currentReportsPage = 1; renderDetailedReportsTable(); });
    if(endDateFilter) endDateFilter.addEventListener('change', () => { currentReportsPage = 1; renderDetailedReportsTable(); });
    if(exportReportBtn) {
        exportReportBtn.addEventListener('click', () => {
            const dataToExport = mockDetailedReports.filter(report => {
                const scenarioFilterVal = filterReportScenarioSelect.value;
                const userTeamFilterVal = filterReportUserTeamSelect.value;
                const startDateVal = startDateFilter.value;
                const endDateVal = endDateFilter.value;
                const scenarioName = getLocalizedString(report.scenarioKey);
                const userTeamName = getLocalizedString(report.userTeamKey);
                const scenarioMatch = scenarioFilterVal === 'all' || scenarioName === scenarioFilterVal;
                const userTeamMatch = userTeamFilterVal === 'all' || userTeamName === userTeamFilterVal;
                const dateMatch = (!startDateVal || report.date >= startDateVal) && (!endDateVal || report.date <= endDateVal);
                return scenarioMatch && userTeamMatch && dateMatch;
            });
            console.log("Exporting data:", dataToExport);
            alert(getLocalizedString('export_report_success_alert'));
        });
    }
    window.updatePageSpecificTheme = function(theme) {
        window.updateInstructorReportsCharts();
    };
     window.updatePageSpecificTranslations = function(langPack, lang) {
        initializePageWithTranslations();
    };
    // Listen for theme changes to update charts with proper styling
    document.addEventListener('themeChanged', () => {
        createParticipantPerformanceChart();
        createScoreDistributionChart();
        createStageCompletionTimeChart();
        createResourceAllocationChart();
    });
});