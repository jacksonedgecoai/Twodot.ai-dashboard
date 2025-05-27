// Company-Agent Performance Report Component

// Initialize the report when DOM is loaded
function initializeCompanyAgentReport() {
    createReportInterface();
    loadReportData();
}

// Create the report interface
function createReportInterface() {
    const reportContainer = document.createElement('div');
    reportContainer.id = 'companyAgentReport';
    reportContainer.className = 'company-agent-report';
    
    reportContainer.innerHTML = `
        <div class="section">
            <h2 class="section-title">Company-Agent Performance Report</h2>
            
            <!-- Filter Panel -->
            <div class="filter-panel">
                <div class="filter-row">
                    <input type="text" id="companySearch" placeholder="Search companies..." class="search-input">
                    <input type="text" id="agentSearch" placeholder="Search agents..." class="search-input">
                    <select id="performanceFilter" class="filter-select">
                        <option value="">All Performance Levels</option>
                        <option value="high">High (>95%)</option>
                        <option value="medium">Medium (85-95%)</option>
                        <option value="low">Low (<85%)</option>
                    </select>
                    <button id="exportCsvBtn" class="btn export-btn">Export CSV</button>
                </div>
            </div>
            
            <!-- Report Table -->
            <div class="report-table-container">
                <table id="reportTable" class="report-table">
                    <thead>
                        <tr>
                            <th class="sortable" data-column="company">Company</th>
                            <th class="sortable" data-column="agent">Agent</th>
                            <th class="sortable" data-column="role">Role</th>
                            <th class="sortable" data-column="status">Status</th>
                            <th class="sortable" data-column="successRate">Success Rate</th>
                            <th class="sortable" data-column="tasksCompleted">Tasks Completed</th>
                            <th class="sortable" data-column="lastActivity">Last Activity</th>
                            <th class="sortable" data-column="responseTime">Avg Response Time</th>
                        </tr>
                    </thead>
                    <tbody id="reportTableBody">
                        <!-- Data will be populated here -->
                    </tbody>
                </table>
            </div>
            
            <!-- Performance Summary -->
            <div class="performance-summary">
                <div class="summary-stats">
                    <div class="stat-card">
                        <h4>Total Companies</h4>
                        <span id="totalCompanies">0</span>
                    </div>
                    <div class="stat-card">
                        <h4>Total Agents</h4>
                        <span id="totalAgents">0</span>
                    </div>
                    <div class="stat-card">
                        <h4>Average Success Rate</h4>
                        <span id="avgSuccessRate">0%</span>
                    </div>
                    <div class="stat-card">
                        <h4>High Performers</h4>
                        <span id="highPerformers">0</span>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    return reportContainer;
}

// Transform existing company data into report format
function transformDataForReport() {
    const reportData = [];
    
    Object.keys(companyData).forEach(companyName => {
        const company = companyData[companyName];
        
        company.agents.forEach(agentName => {
            const agentInfo = company.agentData[agentName];
            
            reportData.push({
                company: companyName,
                agent: agentName,
                role: getAgentRole(agentName),
                status: agentInfo.status,
                successRate: agentInfo.successRate,
                tasksCompleted: agentInfo.tasksCompleted,
                lastActivity: agentInfo.lastActivity,
                responseTime: agentInfo.avgResponseTime,
                performanceLevel: getPerformanceLevel(agentInfo.successRate)
            });
        });
    });
    
    return reportData;
}

// Get agent role based on agent name
function getAgentRole(agentName) {
    const roleMap = {
        'Legislation Agent': 'Legal Research',
        'Email Outreach Agent': 'Communication',
        'Email Reader Agent': 'Data Processing',
        'Summarising Agent': 'Content Analysis'
    };
    return roleMap[agentName] || 'General';
}

// Determine performance level based on success rate
function getPerformanceLevel(successRate) {
    if (successRate >= 95) return 'high';
    if (successRate >= 85) return 'medium';
    return 'low';
}

// Load and display report data
function loadReportData() {
    const reportData = transformDataForReport();
    displayReportData(reportData);
    updateSummaryStats(reportData);
    initializeReportEventListeners();
}

// Display report data in table
function displayReportData(data) {
    const tableBody = document.getElementById('reportTableBody');
    if (!tableBody) return;
    
    tableBody.innerHTML = '';
    
    data.forEach(row => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td class="company-cell">${row.company}</td>
            <td class="agent-cell">${row.agent}</td>
            <td class="role-cell">${row.role}</td>
            <td class="status-cell">
                <span class="status ${row.status.replace(' ', '-')}">${formatStatus(row.status)}</span>
            </td>
            <td class="success-rate-cell">
                <span class="performance-indicator ${row.performanceLevel}">${row.successRate}%</span>
            </td>
            <td class="tasks-cell">${row.tasksCompleted.toLocaleString()}</td>
            <td class="activity-cell">${formatLastActivity(row.lastActivity)}</td>
            <td class="response-time-cell">${row.responseTime}s</td>
        `;
        tableBody.appendChild(tr);
    });
}

// Update summary statistics
function updateSummaryStats(data) {
    const totalCompanies = new Set(data.map(row => row.company)).size;
    const totalAgents = data.length;
    const avgSuccessRate = data.reduce((sum, row) => sum + row.successRate, 0) / data.length;
    const highPerformers = data.filter(row => row.performanceLevel === 'high').length;
    
    document.getElementById('totalCompanies').textContent = totalCompanies;
    document.getElementById('totalAgents').textContent = totalAgents;
    document.getElementById('avgSuccessRate').textContent = avgSuccessRate.toFixed(1) + '%';
    document.getElementById('highPerformers').textContent = highPerformers;
}

// Initialize event listeners for the report
function initializeReportEventListeners() {
    // Search functionality
    document.getElementById('companySearch')?.addEventListener('input', handleSearch);
    document.getElementById('agentSearch')?.addEventListener('input', handleSearch);
    document.getElementById('performanceFilter')?.addEventListener('change', handleSearch);
    
    // Export functionality
    document.getElementById('exportCsvBtn')?.addEventListener('click', exportToCsv);
    
    // Column sorting
    document.querySelectorAll('.sortable').forEach(header => {
        header.addEventListener('click', handleSort);
        header.style.cursor = 'pointer';
    });
}

// Handle search and filtering
function handleSearch() {
    const companySearch = document.getElementById('companySearch')?.value.toLowerCase() || '';
    const agentSearch = document.getElementById('agentSearch')?.value.toLowerCase() || '';
    const performanceFilter = document.getElementById('performanceFilter')?.value || '';
    
    const reportData = transformDataForReport();
    
    const filteredData = reportData.filter(row => {
        const matchesCompany = row.company.toLowerCase().includes(companySearch);
        const matchesAgent = row.agent.toLowerCase().includes(agentSearch);
        const matchesPerformance = !performanceFilter || row.performanceLevel === performanceFilter;
        
        return matchesCompany && matchesAgent && matchesPerformance;
    });
    
    displayReportData(filteredData);
    updateSummaryStats(filteredData);
}

// Handle column sorting
let sortColumn = '';
let sortDirection = 'asc';

function handleSort(event) {
    const column = event.target.dataset.column;
    
    if (sortColumn === column) {
        sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
        sortColumn = column;
        sortDirection = 'asc';
    }
    
    // Update header styling
    document.querySelectorAll('.sortable').forEach(header => {
        header.classList.remove('sort-asc', 'sort-desc');
    });
    event.target.classList.add(`sort-${sortDirection}`);
    
    const reportData = transformDataForReport();
    const sortedData = sortData(reportData, column, sortDirection);
    displayReportData(sortedData);
}

// Sort data by column
function sortData(data, column, direction) {
    return data.sort((a, b) => {
        let valueA = a[column];
        let valueB = b[column];
        
        // Handle numeric columns
        if (['successRate', 'tasksCompleted', 'responseTime'].includes(column)) {
            valueA = parseFloat(valueA);
            valueB = parseFloat(valueB);
        }
        
        // Handle date columns
        if (column === 'lastActivity') {
            valueA = new Date(valueA);
            valueB = new Date(valueB);
        }
        
        if (direction === 'asc') {
            return valueA > valueB ? 1 : -1;
        } else {
            return valueA < valueB ? 1 : -1;
        }
    });
}

// Export data to CSV
function exportToCsv() {
    const reportData = transformDataForReport();
    const csvContent = generateCsvContent(reportData);
    downloadCsv(csvContent, `company-agent-report-${new Date().toISOString().split('T')[0]}.csv`);
}

// Generate CSV content
function generateCsvContent(data) {
    const headers = ['Company', 'Agent', 'Role', 'Status', 'Success Rate (%)', 'Tasks Completed', 'Last Activity', 'Avg Response Time (s)'];
    const csvRows = [headers.join(',')];
    
    data.forEach(row => {
        const csvRow = [
            row.company,
            row.agent,
            row.role,
            row.status,
            row.successRate,
            row.tasksCompleted,
            row.lastActivity,
            row.responseTime
        ].map(value => `"${value}"`).join(',');
        csvRows.push(csvRow);
    });
    
    return csvRows.join('\n');
}

// Download CSV file
function downloadCsv(content, filename) {
    const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    
    if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}

// Format last activity time
function formatLastActivity(timestamp) {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    
    if (diffHours < 1) {
        return 'Just now';
    } else if (diffHours < 24) {
        return `${diffHours}h ago`;
    } else {
        return date.toLocaleDateString();
    }
}

// Add report-specific styles
function addReportStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .company-agent-report {
            margin-top: 2rem;
        }
        
        .filter-panel {
            background: #0a0a0a;
            border: 1px solid #333;
            border-radius: 8px;
            padding: 1.5rem;
            margin-bottom: 1.5rem;
        }
        
        .filter-row {
            display: flex;
            gap: 1rem;
            align-items: center;
            flex-wrap: wrap;
        }
        
        .search-input, .filter-select {
            background: #1a1a1a;
            color: #fff;
            border: 1px solid #333;
            padding: 0.5rem 1rem;
            border-radius: 4px;
            font-size: 0.875rem;
            min-width: 150px;
        }
        
        .search-input:focus, .filter-select:focus {
            outline: none;
            border-color: #FF6B35;
        }
        
        .export-btn {
            background: #FF6B35;
            color: #fff;
            border: none;
            padding: 0.5rem 1rem;
            border-radius: 4px;
            cursor: pointer;
            font-size: 0.875rem;
            transition: background 0.2s;
        }
        
        .export-btn:hover {
            background: #e55a2b;
        }
        
        .report-table-container {
            overflow-x: auto;
            margin-bottom: 1.5rem;
        }
        
        .report-table {
            width: 100%;
            border-collapse: collapse;
            background: #0a0a0a;
        }
        
        .report-table th {
            background: #1a1a1a;
            padding: 1rem;
            text-align: left;
            border-bottom: 2px solid #333;
            font-weight: 600;
            color: #999;
            text-transform: uppercase;
            font-size: 0.75rem;
        }
        
        .report-table td {
            padding: 1rem;
            border-bottom: 1px solid #333;
        }
        
        .report-table tr:hover {
            background: rgba(255, 107, 53, 0.05);
        }
        
        .sortable {
            position: relative;
            user-select: none;
        }
        
        .sortable:hover {
            background: rgba(255, 107, 53, 0.1);
        }
        
        .sortable.sort-asc::after {
            content: ' ↑';
            color: #FF6B35;
        }
        
        .sortable.sort-desc::after {
            content: ' ↓';
            color: #FF6B35;
        }
        
        .performance-indicator {
            padding: 0.25rem 0.5rem;
            border-radius: 12px;
            font-size: 0.75rem;
            font-weight: 600;
        }
        
        .performance-indicator.high {
            background: rgba(76, 175, 80, 0.2);
            color: #4CAF50;
        }
        
        .performance-indicator.medium {
            background: rgba(255, 193, 7, 0.2);
            color: #FFC107;
        }
        
        .performance-indicator.low {
            background: rgba(244, 67, 54, 0.2);
            color: #F44336;
        }
        
        .performance-summary {
            background: #0a0a0a;
            border: 1px solid #333;
            border-radius: 8px;
            padding: 1.5rem;
        }
        
        .summary-stats {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1rem;
        }
        
        .stat-card {
            text-align: center;
            padding: 1rem;
            background: #1a1a1a;
            border: 1px solid #333;
            border-radius: 6px;
        }
        
        .stat-card h4 {
            font-size: 0.875rem;
            color: #999;
            margin-bottom: 0.5rem;
            text-transform: uppercase;
        }
        
        .stat-card span {
            font-size: 1.5rem;
            font-weight: 600;
            color: #FF6B35;
        }
        
        .company-cell {
            font-weight: 600;
            color: #FF6B35;
        }
        
        .agent-cell {
            font-weight: 500;
        }
        
        .role-cell {
            color: #999;
            font-size: 0.875rem;
        }
        
        @media (max-width: 768px) {
            .filter-row {
                flex-direction: column;
                align-items: stretch;
            }
            
            .search-input, .filter-select {
                min-width: auto;
            }
        }
    `;
    document.head.appendChild(style);
}

// Function to show the company-agent report
function showCompanyAgentReport() {
    const mainContent = document.getElementById('mainContent');
    const summaryView = document.getElementById('summaryView');
    const summaryCards = document.getElementById('summaryCards');
    
    // Hide other views
    mainContent.style.display = 'none';
    summaryView.style.display = 'none';
    summaryCards.style.display = 'none';
    
    // Create or show report
    let reportElement = document.getElementById('companyAgentReport');
    if (!reportElement) {
        reportElement = createReportInterface();
        addReportStyles();
        document.querySelector('.dashboard').appendChild(reportElement);
        loadReportData();
    } else {
        reportElement.style.display = 'block';
        loadReportData(); // Refresh data
    }
}

// Function to hide the company-agent report
function hideCompanyAgentReport() {
    const reportElement = document.getElementById('companyAgentReport');
    if (reportElement) {
        reportElement.style.display = 'none';
    }
    
    // Show default views
    document.getElementById('mainContent').style.display = 'block';
    document.getElementById('summaryCards').style.display = 'grid';
}

// Auto-refresh data every 15 minutes
setInterval(() => {
    const reportElement = document.getElementById('companyAgentReport');
    if (reportElement && reportElement.style.display !== 'none') {
        loadReportData();
    }
}, 15 * 60 * 1000);

// Export the functions for use in main dashboard
window.showCompanyAgentReport = showCompanyAgentReport;
window.hideCompanyAgentReport = hideCompanyAgentReport;