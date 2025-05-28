// trainee_my_progress.js
'use strict';

document.addEventListener('DOMContentLoaded', function() {
    // Get references to chart containers
    const scenarioProgressChartCtx = document.getElementById('scenarioProgressChart')?.getContext('2d');
    const skillsRadarChartCtx = document.getElementById('skillsRadarChart')?.getContext('2d');
    
    // Initialization
    initPage();
    
    // Chart instances
    let scenarioProgressChartInstance = null;
    let skillsRadarChartInstance = null;
    
    // Function to get chart colors based on current theme
    function getChartColors() {
        const isDarkTheme = document.body.classList.contains('dark-theme');
        
        return {
            chartText: isDarkTheme ? getComputedStyle(document.body).getPropertyValue('--chart-text-color-dark').trim() : 
                                    getComputedStyle(document.body).getPropertyValue('--chart-text-color-light').trim(),
            chartLabel: isDarkTheme ? getComputedStyle(document.body).getPropertyValue('--chart-label-color-dark').trim() : 
                                    getComputedStyle(document.body).getPropertyValue('--chart-label-color-light').trim(),
            grid: isDarkTheme ? getComputedStyle(document.body).getPropertyValue('--chart-grid-border-color-dark').trim() : 
                              getComputedStyle(document.body).getPropertyValue('--chart-grid-border-color-light').trim(),
            primary: isDarkTheme ? getComputedStyle(document.body).getPropertyValue('--primary-color-dark').trim() : 
                                 getComputedStyle(document.body).getPropertyValue('--primary-color-light').trim(),
            secondary: isDarkTheme ? getComputedStyle(document.body).getPropertyValue('--secondary-color-dark').trim() : 
                                   getComputedStyle(document.body).getPropertyValue('--secondary-color-light').trim(),
            danger: isDarkTheme ? getComputedStyle(document.body).getPropertyValue('--danger-color-dark').trim() : 
                                getComputedStyle(document.body).getPropertyValue('--danger-color-light').trim(),
            success: isDarkTheme ? getComputedStyle(document.body).getPropertyValue('--success-color-dark').trim() : 
                                 getComputedStyle(document.body).getPropertyValue('--success-color-light').trim(),
            warning: isDarkTheme ? getComputedStyle(document.body).getPropertyValue('--warning-color-dark').trim() : 
                                 getComputedStyle(document.body).getPropertyValue('--warning-color-light').trim(),
            tooltipBg: isDarkTheme ? getComputedStyle(document.body).getPropertyValue('--chart-tooltip-bg-dark').trim() : 
                                   getComputedStyle(document.body).getPropertyValue('--chart-tooltip-bg-light').trim(),
            tooltipText: isDarkTheme ? getComputedStyle(document.body).getPropertyValue('--chart-tooltip-text-dark').trim() : 
                                     getComputedStyle(document.body).getPropertyValue('--chart-tooltip-text-light').trim(),
            bgColors: isDarkTheme ? 
                ['rgba(59, 130, 246, 0.7)', 'rgba(16, 185, 129, 0.7)', 'rgba(249, 115, 22, 0.7)', 'rgba(236, 72, 153, 0.7)'] : 
                ['rgba(37, 99, 235, 0.7)', 'rgba(5, 150, 105, 0.7)', 'rgba(234, 88, 12, 0.7)', 'rgba(219, 39, 119, 0.7)'],
            radarColors: {
                current: {
                    bg: isDarkTheme ? 'rgba(59, 130, 246, 0.3)' : 'rgba(37, 99, 235, 0.2)',
                    border: isDarkTheme ? 'rgb(59, 130, 246)' : 'rgb(37, 99, 235)'
                },
                target: {
                    bg: isDarkTheme ? 'rgba(16, 185, 129, 0.1)' : 'rgba(5, 150, 105, 0.1)',
                    border: isDarkTheme ? 'rgb(16, 185, 129)' : 'rgb(5, 150, 105)'
                }
            }
        };
    }

    // Initialize or update the scenario progress chart
    function createScenarioProgressChart() {
        if (!scenarioProgressChartCtx) {
            const noDataEl = document.getElementById('scenarioProgressChart-nodata');
            if (noDataEl) noDataEl.classList.remove('hidden');
            return;
        }
        
        const noDataEl = document.getElementById('scenarioProgressChart-nodata');
        if (noDataEl) noDataEl.classList.add('hidden');
        
        const colors = getChartColors();
        
        // Mock data for scenario progress - replace with actual data
        const data = {
            labels: ['Network Defense', 'Data Protection', 'Incident Response', 'Threat Analysis', 'OSINT Fundamentals'],
            datasets: [
                {
                    label: 'Progress (%)',
                    data: [85, 65, 70, 90, 60],
                    backgroundColor: colors.primary + '80',
                    borderColor: colors.primary,
                    borderWidth: 2,
                    borderRadius: 4,
                    maxBarThickness: 50
                }
            ]
        };
        
        // Destroy existing chart if it exists
        if (scenarioProgressChartInstance) {
            scenarioProgressChartInstance.destroy();
        }
        
        // Create new chart
        scenarioProgressChartInstance = new Chart(scenarioProgressChartCtx, {
            type: 'bar',
            data: data,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            color: colors.chartText,
                            font: { family: 'Rubik' },
                            callback: value => `${value}%`
                        },
                        grid: { color: colors.grid }
                    },
                    x: {
                        ticks: {
                            color: colors.chartText,
                            font: { family: 'Rubik' }
                        },
                        grid: { display: false }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        backgroundColor: colors.tooltipBg,
                        titleColor: colors.tooltipText,
                        bodyColor: colors.tooltipText,
                        titleFont: { family: 'Rubik' },
                        bodyFont: { family: 'Rubik' },
                        callbacks: {
                            label: context => `Progress: ${context.parsed.y}%`
                        }
                    }
                }
            }
        });
    }
    
    // Initialize or update the skills radar chart
    function createSkillsRadarChart() {
        if (!skillsRadarChartCtx) {
            const noDataEl = document.getElementById('skillsRadarChart-nodata');
            if (noDataEl) noDataEl.classList.remove('hidden');
            return;
        }
        
        const noDataEl = document.getElementById('skillsRadarChart-nodata');
        if (noDataEl) noDataEl.classList.add('hidden');
        
        const colors = getChartColors();
        
        // Mock data for skills radar - replace with actual data
        const data = {
            labels: [
                'Network Security',
                'Forensic Analysis',
                'Malware Analysis',
                'Threat Intelligence',
                'Penetration Testing',
                'Defensive Operations'
            ],
            datasets: [
                {
                    label: 'Current Skills',
                    data: [75, 60, 45, 80, 55, 70],
                    fill: true,
                    backgroundColor: colors.radarColors.current.bg,
                    borderColor: colors.radarColors.current.border,
                    pointBackgroundColor: colors.radarColors.current.border,
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: colors.radarColors.current.border
                },
                {
                    label: 'Target Skills',
                    data: [90, 85, 75, 90, 80, 85],
                    fill: true,
                    backgroundColor: colors.radarColors.target.bg,
                    borderColor: colors.radarColors.target.border,
                    pointBackgroundColor: colors.radarColors.target.border,
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: colors.radarColors.target.border,
                    borderDash: [5, 5]
                }
            ]
        };
        
        // Destroy existing chart if it exists
        if (skillsRadarChartInstance) {
            skillsRadarChartInstance.destroy();
        }
        
        // Create new chart
        skillsRadarChartInstance = new Chart(skillsRadarChartCtx, {
            type: 'radar',
            data: data,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                elements: {
                    line: {
                        borderWidth: 2
                    }
                },
                scales: {
                    r: {
                        angleLines: {
                            color: colors.grid
                        },
                        grid: {
                            color: colors.grid
                        },
                        pointLabels: {
                            color: colors.chartText,
                            font: { family: 'Rubik', size: 12 }
                        },
                        ticks: {
                            color: colors.chartText,
                            backdropColor: 'transparent',
                            font: { family: 'Rubik' }
                        }
                    }
                },
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            color: colors.chartText,
                            font: { family: 'Rubik' }
                            }
                        },
                    tooltip: {
                        backgroundColor: colors.tooltipBg,
                        titleColor: colors.tooltipText,
                        bodyColor: colors.tooltipText,
                        titleFont: { family: 'Rubik' },
                        bodyFont: { family: 'Rubik' }
                    }
                }
            }
        });
    }
    
    // Function to update all charts based on current theme
    function updateCharts() {
        createScenarioProgressChart();
        createSkillsRadarChart();
    }

    // Initialize page
    function initPage() {
        // Set up mock data
        setupMockData();
        
        // Create charts
        updateCharts();
        
        // Listen for theme changes
        document.addEventListener('themeChanged', updateCharts);
    }
    
    // Setup mock data for the page
    function setupMockData() {
        // Set total scenarios completed
        const totalScenariosEl = document.getElementById('total-scenarios-completed');
        if (totalScenariosEl) totalScenariosEl.textContent = '5';
        
        // Set average score
        const avgScoreEl = document.getElementById('average-score');
        if (avgScoreEl) avgScoreEl.textContent = '78%';
        
        // Set badges earned
        const badgesEarnedEl = document.getElementById('badges-earned-stat');
        if (badgesEarnedEl) badgesEarnedEl.textContent = '3';

        // Populate completed scenarios table
        const tableBody = document.getElementById('completed-scenarios-table-body');
        const noScenariosMsg = document.getElementById('no-completed-scenarios-msg');
        
        if (tableBody && noScenariosMsg) {
            // Mock completed scenarios data
            const mockScenarios = [
                { name: 'Network Defense Basics', score: '85%', date: '2023-05-15', reportUrl: '#' },
                { name: 'Data Protection and Privacy', score: '65%', date: '2023-06-22', reportUrl: '#' },
                { name: 'Incident Response Fundamentals', score: '70%', date: '2023-07-10', reportUrl: '#' },
                { name: 'Threat Analysis 101', score: '90%', date: '2023-08-05', reportUrl: '#' },
                { name: 'OSINT Techniques', score: '60%', date: '2023-09-18', reportUrl: '#' }
            ];
            
            if (mockScenarios.length > 0) {
                noScenariosMsg.classList.add('hidden');
                
                mockScenarios.forEach(scenario => {
                    const row = document.createElement('tr');
                    
                    const nameCell = document.createElement('td');
                    nameCell.textContent = scenario.name;
                    row.appendChild(nameCell);
                    
                    const scoreCell = document.createElement('td');
                    scoreCell.textContent = scenario.score;
                    row.appendChild(scoreCell);
                    
                    const dateCell = document.createElement('td');
                    dateCell.textContent = scenario.date;
                    row.appendChild(dateCell);
                    
                    const reportCell = document.createElement('td');
                    const reportLink = document.createElement('a');
                    reportLink.href = scenario.reportUrl;
                    reportLink.className = 'text-primary hover:underline';
                    reportLink.textContent = 'View Report';
                    reportCell.appendChild(reportLink);
                    row.appendChild(reportCell);
                    
                    tableBody.appendChild(row);
                });
            } else {
                noScenariosMsg.classList.remove('hidden');
            }
        }
        
        // Populate badges section
        const badgesContainer = document.getElementById('my-badges-section-progress');
        const noBadgesMsg = document.getElementById('no-badges-msg-progress');
        
        if (badgesContainer && noBadgesMsg) {
            // Mock badges data
            const mockBadges = [
                { name: 'Network Defender', icon: '🛡️', description: 'Completed Network Defense scenario with a score of 85% or higher' },
                { name: 'Threat Hunter', icon: '🔍', description: 'Identified all threats in the Threat Analysis scenario' },
                { name: 'Fast Responder', icon: '⚡', description: 'Completed an incident response scenario in under 30 minutes' }
            ];
            
            if (mockBadges.length > 0) {
                noBadgesMsg.classList.add('hidden');
                
                mockBadges.forEach(badge => {
                    const badgeDiv = document.createElement('div');
                    badgeDiv.className = 'badge-item bg-card-bg border border-card-border rounded-lg p-3 text-center transition-all hover:shadow-md';
                    
                    const iconSpan = document.createElement('span');
                    iconSpan.className = 'text-4xl block mb-2';
                    iconSpan.textContent = badge.icon;
                    badgeDiv.appendChild(iconSpan);
                    
                    const nameP = document.createElement('p');
                    nameP.className = 'font-medium text-sm';
                    nameP.textContent = badge.name;
                    badgeDiv.appendChild(nameP);
                    
                    badgeDiv.title = badge.description;
                    
                    badgesContainer.appendChild(badgeDiv);
                });
            } else {
                noBadgesMsg.classList.remove('hidden');
            }
        }
        
        // Populate recent achievements section
        const achievementsList = document.getElementById('recent-achievements-section-progress-list');
        const noAchievementsMsg = document.getElementById('no-recent-achievements-msg-progress');
        
        if (achievementsList && noAchievementsMsg) {
            // Mock achievements data
            const mockAchievements = [
                { text: 'Completed Network Defense scenario with a score of 85%', date: '2023-05-15' },
                { text: 'Earned the "Network Defender" badge', date: '2023-05-15' },
                { text: 'Completed Data Protection scenario with a score of 65%', date: '2023-06-22' },
                { text: 'Completed Incident Response scenario with a score of 70%', date: '2023-07-10' },
                { text: 'Earned the "Threat Hunter" badge', date: '2023-08-05' },
                { text: 'Completed Threat Analysis scenario with a score of 90%', date: '2023-08-05' }
            ];
            
            if (mockAchievements.length > 0) {
                noAchievementsMsg.classList.add('hidden');
                
                mockAchievements.forEach(achievement => {
                    const li = document.createElement('li');
                    li.className = 'p-2 border-b border-card-border last:border-0';
                    
                    const div = document.createElement('div');
                    div.className = 'flex justify-between';
                    
                    const textSpan = document.createElement('span');
                    textSpan.className = 'text-sm';
                    textSpan.textContent = achievement.text;
                    div.appendChild(textSpan);
                    
                    const dateSpan = document.createElement('span');
                    dateSpan.className = 'text-xs text-subtitle whitespace-nowrap ml-2 rtl:ml-0 rtl:mr-2';
                    dateSpan.textContent = achievement.date;
                    div.appendChild(dateSpan);
                    
                    li.appendChild(div);
                    achievementsList.appendChild(li);
                });
            } else {
                noAchievementsMsg.classList.remove('hidden');
            }
        }
    }
});