// dashboard.js - Complete Two Dot AI Agent Dashboard

// Initialize the dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Create the entire dashboard structure
    createDashboard();
    
    // Initialize event listeners
    initializeEventListeners();
    
    // Load initial data
    updateMainContent();
});

// Company and Agent Data
const companyData = {
    'ISG': {
        relationshipStartDate: '2021-03-15',
        contractTier: 'Premium',
        agents: ['Legislation Agent', 'Email Outreach Agent', 'Email Reader Agent', 'Summarising Agent'],
        agentData: {
            'Legislation Agent': {
                status: 'completed',
                lastActivity: '2024-01-15 14:32',
                successRate: 96.5,
                tasksCompleted: 1247,
                avgResponseTime: 2.3,
                errorRate: 3.5,
                dailyExecutions: [245, 287, 312, 298, 276, 189, 167]
            },
            'Email Outreach Agent': {
                status: 'in-progress',
                lastActivity: '2024-01-15 16:45',
                successRate: 92.1,
                tasksCompleted: 892,
                avgResponseTime: 3.1,
                errorRate: 7.9,
                dailyExecutions: [189, 201, 178, 195, 213, 176, 156]
            },
            'Email Reader Agent': {
                status: 'waiting',
                lastActivity: '2024-01-15 12:20',
                successRate: 98.2,
                tasksCompleted: 2103,
                avgResponseTime: 1.8,
                errorRate: 1.8,
                dailyExecutions: [312, 298, 325, 341, 289, 267, 234]
            },
            'Summarising Agent': {
                status: 'completed',
                lastActivity: '2024-01-15 15:10',
                successRate: 94.7,
                tasksCompleted: 1567,
                avgResponseTime: 2.5,
                errorRate: 5.3,
                dailyExecutions: [234, 256, 278, 265, 243, 221, 198]
            }
        }
    },
    'Bougainville Mine': {
        relationshipStartDate: '2022-08-22',
        contractTier: 'Enterprise',
        agents: ['Legislation Agent', 'Email Outreach Agent', 'Email Reader Agent', 'Summarising Agent'],
        agentData: {
            'Legislation Agent': {
                status: 'in-progress',
                lastActivity: '2024-01-15 16:20',
                successRate: 93.2,
                tasksCompleted: 823,
                avgResponseTime: 2.7,
                errorRate: 6.8,
                dailyExecutions: [156, 167, 189, 178, 165, 154, 143]
            },
            'Email Outreach Agent': {
                status: 'completed',
                lastActivity: '2024-01-15 14:55',
                successRate: 95.8,
                tasksCompleted: 1102,
                avgResponseTime: 2.9,
                errorRate: 4.2,
                dailyExecutions: [198, 213, 234, 221, 209, 187, 176]
            },
            'Email Reader Agent': {
                status: 'in-progress',
                lastActivity: '2024-01-15 16:30',
                successRate: 91.5,
                tasksCompleted: 1789,
                avgResponseTime: 2.1,
                errorRate: 8.5,
                dailyExecutions: [267, 289, 298, 276, 254, 232, 213]
            },
            'Summarising Agent': {
                status: 'waiting',
                lastActivity: '2024-01-15 11:45',
                successRate: 96.3,
                tasksCompleted: 945,
                avgResponseTime: 2.2,
                errorRate: 3.7,
                dailyExecutions: [145, 156, 167, 159, 148, 137, 126]
            }
        }
    },
    'Bush to Beach Legal': {
        relationshipStartDate: '2023-01-10',
        contractTier: 'Standard',
        agents: ['Legislation Agent', 'Email Outreach Agent', 'Email Reader Agent', 'Summarising Agent'],
        agentData: {
            'Legislation Agent': {
                status: 'waiting',
                lastActivity: '2024-01-15 10:15',
                successRate: 97.1,
                tasksCompleted: 567,
                avgResponseTime: 2.0,
                errorRate: 2.9,
                dailyExecutions: [89, 98, 87, 92, 85, 79, 73]
            },
            'Email Outreach Agent': {
                status: 'in-progress',
                lastActivity: '2024-01-15 16:40',
                successRate: 89.6,
                tasksCompleted: 734,
                avgResponseTime: 3.5,
                errorRate: 10.4,
                dailyExecutions: [123, 134, 145, 139, 128, 117, 108]
            },
            'Email Reader Agent': {
                status: 'completed',
                lastActivity: '2024-01-15 15:22',
                successRate: 99.1,
                tasksCompleted: 1456,
                avgResponseTime: 1.5,
                errorRate: 0.9,
                dailyExecutions: [234, 245, 256, 248, 237, 221, 209]
            },
            'Summarising Agent': {
                status: 'in-progress',
                lastActivity: '2024-01-15 16:35',
                successRate: 92.8,
                tasksCompleted: 1123,
                avgResponseTime: 2.8,
                errorRate: 7.2,
                dailyExecutions: [178, 189, 198, 187, 176, 165, 154]
            }
        }
    }
};

// Global variables
let currentCompany = '';
let currentAgent = '';
let charts = {};

// Function to create the entire dashboard structure
function createDashboard() {
    document.body.innerHTML = `
        <div class="dashboard">
            <header class="header">
                <div class="logo">
                    <div class="logo-icon">
                        <div class="logo-circle"></div>
                        <div class="logo-bar"></div>
                    </div>
                    <div class="company-name">Two Dot AI</div>
                </div>
                <div class="header-actions">
                    <button class="btn" id="toggleSummaryBtn">Toggle Summary View</button>
                    <button class="btn" id="showReportBtn">Performance Report</button>
                    <button class="btn" id="showRelationshipBtn">Relationship Report</button>
                </div>
            </header>

            <div class="dropdown-container">
                <select id="companySelect">
                    <option value="">Select a Company</option>
                    <option value="ISG">ISG</option>
                    <option value="Bougainville Mine">Bougainville Mine</option>
                    <option value="Bush to Beach Legal">Bush to Beach Legal</option>
                </select>
                
                <select id="agentSelect" disabled>
                    <option value="">Select an Agent</option>
                </select>
            </div>

            <!-- Summary Cards -->
            <div class="summary-cards" id="summaryCards">
                <div class="summary-card">
                    <h3>Total Active Agents</h3>
                    <div class="value">12</div>
                </div>
                <div class="summary-card">
                    <h3>Tasks Completed Today</h3>
                    <div class="value">847</div>
                </div>
                <div class="summary-card">
                    <h3>Average Success Rate</h3>
                    <div class="value">94.5%</div>
                </div>
                <div class="summary-card">
                    <h3>Active Companies</h3>
                    <div class="value">3</div>
                </div>
            </div>

            <!-- Main Content Area -->
            <div id="mainContent">
                <div class="section">
                    <h2 class="section-title">Select a company and agent to view details</h2>
                </div>
            </div>

            <!-- Summary View -->
            <div id="summaryView" style="display: none;">
                <div class="section">
                    <h2 class="section-title">All Clients Summary</h2>
                    <div class="summary-table" id="summaryTable"></div>
                </div>
            </div>
        </div>
    `;

    // Add styles
    addStyles();
}

// Function to add CSS styles
function addStyles() {
    const style = document.createElement('style');
    style.textContent = `
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: #000000;
            color: #ffffff;
            min-height: 100vh;
            line-height: 1.6;
        }

        .dashboard {
            max-width: 1400px;
            margin: 0 auto;
            padding: 2rem;
        }

        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 2rem;
            padding-bottom: 1rem;
            border-bottom: 1px solid #333;
        }

        .logo {
            display: flex;
            align-items: center;
            gap: 1rem;
        }

        .logo-icon {
            width: 50px;
            height: 50px;
            background: #000;
            border-radius: 8px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 8px;
            border: 2px solid #333;
        }

        .logo-circle {
            width: 30px;
            height: 30px;
            border: 4px solid #fff;
            border-radius: 50%;
        }

        .logo-bar {
            width: 30px;
            height: 4px;
            background: #FF6B35;
        }

        .company-name {
            font-size: 1.5rem;
            font-weight: 600;
        }

        .dropdown-container {
            display: flex;
            gap: 1rem;
            margin-bottom: 2rem;
        }

        select {
            background: #1a1a1a;
            color: #fff;
            border: 1px solid #333;
            padding: 0.75rem 1rem;
            border-radius: 6px;
            font-size: 1rem;
            cursor: pointer;
            min-width: 200px;
        }

        select:hover {
            border-color: #FF6B35;
        }

        select:focus {
            outline: none;
            border-color: #FF6B35;
        }

        .summary-cards {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 1.5rem;
            margin-bottom: 2rem;
        }

        .summary-card {
            background: #1a1a1a;
            border: 1px solid #333;
            border-radius: 8px;
            padding: 1.5rem;
            transition: transform 0.2s, border-color 0.2s;
        }

        .summary-card:hover {
            transform: translateY(-2px);
            border-color: #FF6B35;
        }

        .summary-card h3 {
            font-size: 0.875rem;
            color: #999;
            margin-bottom: 0.5rem;
            text-transform: uppercase;
        }

        .summary-card .value {
            font-size: 2rem;
            font-weight: 600;
            color: #FF6B35;
        }

        .section {
            background: #1a1a1a;
            border: 1px solid #333;
            border-radius: 8px;
            padding: 1.5rem;
            margin-bottom: 2rem;
        }

        .section-title {
            font-size: 1.25rem;
            margin-bottom: 1rem;
            color: #FF6B35;
        }

        table {
            width: 100%;
            border-collapse: collapse;
        }

        th, td {
            text-align: left;
            padding: 1rem;
            border-bottom: 1px solid #333;
        }

        th {
            font-weight: 600;
            color: #999;
            text-transform: uppercase;
            font-size: 0.875rem;
        }

        tr:hover {
            background: rgba(255, 107, 53, 0.1);
        }

        .status {
            display: inline-block;
            padding: 0.25rem 0.75rem;
            border-radius: 20px;
            font-size: 0.875rem;
            font-weight: 500;
        }

        .status.in-progress {
            background: rgba(255, 193, 7, 0.2);
            color: #FFC107;
        }

        .status.completed {
            background: rgba(76, 175, 80, 0.2);
            color: #4CAF50;
        }

        .status.waiting {
            background: rgba(33, 150, 243, 0.2);
            color: #2196F3;
        }

        .action-buttons {
            display: flex;
            gap: 0.5rem;
        }

        .btn {
            padding: 0.5rem 1rem;
            border: 1px solid #333;
            background: transparent;
            color: #fff;
            border-radius: 4px;
            cursor: pointer;
            font-size: 0.875rem;
            transition: all 0.2s;
        }

        .btn:hover {
            background: #FF6B35;
            border-color: #FF6B35;
        }

        .btn.pause {
            color: #FFC107;
            border-color: #FFC107;
        }

        .btn.pause:hover {
            background: #FFC107;
            color: #000;
        }

        .charts-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
            gap: 2rem;
            margin-top: 2rem;
        }

        .chart-container {
            background: #0a0a0a;
            border: 1px solid #333;
            border-radius: 8px;
            padding: 1.5rem;
            height: 300px;
            position: relative;
        }

        .chart-title {
            font-size: 1rem;
            margin-bottom: 1rem;
            color: #999;
        }

        .company-summary {
            background: #0a0a0a;
            border: 1px solid #333;
            border-radius: 8px;
            padding: 1.5rem;
            margin-bottom: 1rem;
        }

        .company-summary h3 {
            color: #FF6B35;
            margin-bottom: 1rem;
        }

        .agent-list {
            display: flex;
            gap: 1rem;
            flex-wrap: wrap;
        }

        .agent-badge {
            background: #1a1a1a;
            border: 1px solid #333;
            padding: 0.5rem 1rem;
            border-radius: 6px;
            font-size: 0.875rem;
        }

        canvas {
            max-height: 250px;
        }
    `;
    document.head.appendChild(style);
}

// Initialize event listeners
function initializeEventListeners() {
    // Company select change
    document.getElementById('companySelect').addEventListener('change', handleCompanyChange);
    
    // Agent select change
    document.getElementById('agentSelect').addEventListener('change', handleAgentChange);
    
    // Toggle summary view button
    document.getElementById('toggleSummaryBtn').addEventListener('click', toggleSummaryView);
    
    // Show performance report button
    document.getElementById('showReportBtn').addEventListener('click', showCompanyAgentReport);
    
    // Show relationship report button
    document.getElementById('showRelationshipBtn').addEventListener('click', showRelationshipDurationReport);
}

// Handle company selection change
function handleCompanyChange() {
    const companySelect = document.getElementById('companySelect');
    const agentSelect = document.getElementById('agentSelect');
    currentCompany = companySelect.value;
    
    if (currentCompany) {
        agentSelect.disabled = false;
        agentSelect.innerHTML = '<option value="">Select an Agent</option>';
        
        companyData[currentCompany].agents.forEach(agent => {
            const option = document.createElement('option');
            option.value = agent;
            option.textContent = agent;
            agentSelect.appendChild(option);
        });
    } else {
        agentSelect.disabled = true;
        agentSelect.innerHTML = '<option value="">Select an Agent</option>';
    }
    
    currentAgent = '';
    updateMainContent();
}

// Handle agent selection change
function handleAgentChange() {
    const agentSelect = document.getElementById('agentSelect');
    currentAgent = agentSelect.value;
    updateMainContent();
}

// Update main content based on selections
function updateMainContent() {
    const mainContent = document.getElementById('mainContent');
    
    if (!currentCompany) {
        mainContent.innerHTML = `
            <div class="section">
                <h2 class="section-title">Select a company and agent to view details</h2>
            </div>
        `;
        return;
    }
    
    if (!currentAgent) {
        // Show company overview
        mainContent.innerHTML = `
            <div class="section">
                <h2 class="section-title">${currentCompany} - All Agents</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Agent Name</th>
                            <th>Status</th>
                            <th>Last Activity</th>
                            <th>Success Rate</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${generateCompanyTableRows(currentCompany)}
                    </tbody>
                </table>
            </div>
        `;
    } else {
        // Show agent details with charts
        const agentInfo = companyData[currentCompany].agentData[currentAgent];
        mainContent.innerHTML = `
            <div class="section">
                <h2 class="section-title">${currentCompany} - ${currentAgent}</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Agent Name</th>
                            <th>Status</th>
                            <th>Last Activity</th>
                            <th>Success Rate</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>${currentAgent}</td>
                            <td><span class="status ${agentInfo.status.replace(' ', '-')}">${formatStatus(agentInfo.status)}</span></td>
                            <td>${agentInfo.lastActivity}</td>
                            <td>${agentInfo.successRate}%</td>
                            <td>
                                <div class="action-buttons">
                                    <button class="btn pause" onclick="pauseAgent('${currentAgent}')">Pause</button>
                                    <button class="btn" onclick="viewLogs('${currentAgent}')">View Logs</button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            
            <div class="charts-grid">
                <div class="chart-container">
                    <h3 class="chart-title">Task Completion Rate Over Time</h3>
                    <canvas id="completionChart"></canvas>
                </div>
                <div class="chart-container">
                    <h3 class="chart-title">Response Time Trends</h3>
                    <canvas id="responseTimeChart"></canvas>
                </div>
                <div class="chart-container">
                    <h3 class="chart-title">Error Rates</h3>
                    <canvas id="errorRateChart"></canvas>
                </div>
                <div class="chart-container">
                    <h3 class="chart-title">Daily Executions</h3>
                    <canvas id="executionsChart"></canvas>
                </div>
            </div>
        `;
        
        // Initialize charts after DOM is updated
        setTimeout(() => {
            initializeCharts(agentInfo);
        }, 100);
    }
}

// Generate table rows for company overview
function generateCompanyTableRows(company) {
    let rows = '';
    companyData[company].agents.forEach(agent => {
        const agentInfo = companyData[company].agentData[agent];
        rows += `
            <tr>
                <td>${agent}</td>
                <td><span class="status ${agentInfo.status.replace(' ', '-')}">${formatStatus(agentInfo.status)}</span></td>
                <td>${agentInfo.lastActivity}</td>
                <td>${agentInfo.successRate}%</td>
                <td>
                    <div class="action-buttons">
                        <button class="btn pause" onclick="pauseAgent('${agent}')">Pause</button>
                        <button class="btn" onclick="viewLogs('${agent}')">View Logs</button>
                    </div>
                </td>
            </tr>
        `;
    });
    return rows;
}

// Format status text
function formatStatus(status) {
    return status.split('-').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
}

// Pause agent function
window.pauseAgent = function(agentName) {
    alert(`Pausing ${agentName}...`);
    // Add actual pause functionality here
};

// View logs function
window.viewLogs = function(agentName) {
    alert(`Opening logs for ${agentName}...`);
    // Add actual log viewing functionality here
};

// Toggle summary view
function toggleSummaryView() {
    const mainContent = document.getElementById('mainContent');
    const summaryView = document.getElementById('summaryView');
    const summaryCards = document.getElementById('summaryCards');
    
    if (summaryView.style.display === 'none' || !summaryView.style.display) {
        mainContent.style.display = 'none';
        summaryCards.style.display = 'none';
        summaryView.style.display = 'block';
        generateSummaryView();
    } else {
        mainContent.style.display = 'block';
        summaryCards.style.display = 'grid';
        summaryView.style.display = 'none';
    }
}

// Generate summary view
function generateSummaryView() {
    const summaryTable = document.getElementById('summaryTable');
    let html = '';
    
    Object.keys(companyData).forEach(company => {
        html += `
            <div class="company-summary">
                <h3>${company}</h3>
                <div class="agent-list">
        `;
        
        companyData[company].agents.forEach(agent => {
            const agentInfo = companyData[company].agentData[agent];
            html += `
                <div class="agent-badge">
                    ${agent} - <span class="status ${agentInfo.status.replace(' ', '-')}">${formatStatus(agentInfo.status)}</span>
                </div>
            `;
        });
        
        html += `
                </div>
            </div>
        `;
    });
    
    summaryTable.innerHTML = html;
}

// Initialize charts using Chart.js
function initializeCharts(agentInfo) {
    // Destroy existing charts if any
    Object.values(charts).forEach(chart => {
        if (chart && typeof chart.destroy === 'function') {
            chart.destroy();
        }
    });
    charts = {};

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            }
        },
        scales: {
            x: {
                grid: {
                    color: '#333'
                },
                ticks: {
                    color: '#999'
                }
            },
            y: {
                grid: {
                    color: '#333'
                },
                ticks: {
                    color: '#999'
                }
            }
        }
    };

    const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    // Task Completion Rate Chart
    const completionCtx = document.getElementById('completionChart');
    if (completionCtx && typeof Chart !== 'undefined') {
        const completionData = generateRandomData(7, 90, 100);
        charts.completion = new Chart(completionCtx, {
            type: 'line',
            data: {
                labels: weekDays,
                datasets: [{
                    label: 'Completion Rate',
                    data: completionData,
                    borderColor: '#FF6B35',
                    backgroundColor: 'rgba(255, 107, 53, 0.1)',
                    tension: 0.3
                }]
            },
            options: {
                ...chartOptions,
                scales: {
                    ...chartOptions.scales,
                    y: {
                        ...chartOptions.scales.y,
                        min: 85,
                        max: 100
                    }
                }
            }
        });
    }

    // Response Time Chart
    const responseCtx = document.getElementById('responseTimeChart');
    if (responseCtx && typeof Chart !== 'undefined') {
        const responseData = generateRandomData(7, 1.5, 3.5);
        charts.response = new Chart(responseCtx, {
            type: 'bar',
            data: {
                labels: weekDays,
                datasets: [{
                    label: 'Response Time (s)',
                    data: responseData,
                    backgroundColor: '#FF6B35'
                }]
            },
            options: chartOptions
        });
    }

    // Error Rate Chart
    const errorCtx = document.getElementById('errorRateChart');
    if (errorCtx && typeof Chart !== 'undefined') {
        const errorData = generateRandomData(7, 0, 10);
        charts.error = new Chart(errorCtx, {
            type: 'line',
            data: {
                labels: weekDays,
                datasets: [{
                    label: 'Error Rate (%)',
                    data: errorData,
                    borderColor: '#FFC107',
                    backgroundColor: 'rgba(255, 193, 7, 0.1)',
                    tension: 0.3
                }]
            },
            options: chartOptions
        });
    }

    // Daily Executions Chart
    const executionsCtx = document.getElementById('executionsChart');
    if (executionsCtx && typeof Chart !== 'undefined') {
        charts.executions = new Chart(executionsCtx, {
            type: 'bar',
            data: {
                labels: weekDays,
                datasets: [{
                    label: 'Executions',
                    data: agentInfo.dailyExecutions,
                    backgroundColor: '#4CAF50'
                }]
            },
            options: chartOptions
        });
    }
}

// Generate random data for charts
function generateRandomData(count, min, max) {
    const data = [];
    for (let i = 0; i < count; i++) {
        data.push(Math.random() * (max - min) + min);
    }
    return data;
}

// Check if Chart.js is loaded
if (typeof Chart === 'undefined') {
    console.warn('Chart.js not loaded. Please include Chart.js library for charts to work.');
}