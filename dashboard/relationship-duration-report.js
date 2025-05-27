// Company Relationship Duration & Agent Count Report Component

// Date calculation utilities
class DateUtils {
    static calculateDuration(startDate, endDate = new Date()) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        
        if (start > end) {
            throw new Error('Start date cannot be after end date');
        }
        
        let years = end.getFullYear() - start.getFullYear();
        let months = end.getMonth() - start.getMonth();
        
        if (months < 0) {
            years--;
            months += 12;
        }
        
        return { years, months };
    }
    
    static formatDuration(years, months) {
        if (years === 0 && months === 0) {
            return 'Less than 1 month';
        }
        
        const yearText = years === 1 ? '1 year' : `${years} years`;
        const monthText = months === 1 ? '1 month' : `${months} months`;
        
        if (years === 0) return monthText;
        if (months === 0) return yearText;
        return `${yearText}, ${monthText}`;
    }
    
    static getDurationInMonths(startDate, endDate = new Date()) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        
        return (end.getFullYear() - start.getFullYear()) * 12 + 
               (end.getMonth() - start.getMonth());
    }
    
    static formatStartDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }
    
    static getRelationshipMilestone(startDate) {
        const totalMonths = DateUtils.getDurationInMonths(startDate);
        
        if (totalMonths >= 36) return 'veteran'; // 3+ years
        if (totalMonths >= 24) return 'established'; // 2+ years
        if (totalMonths >= 12) return 'mature'; // 1+ year
        return 'new'; // < 1 year
    }
}

// Data processing for relationship report
class RelationshipDataService {
    static transformDataForReport() {
        const reportData = [];
        
        Object.keys(companyData).forEach(companyName => {
            const company = companyData[companyName];
            const duration = DateUtils.calculateDuration(company.relationshipStartDate);
            const agentCount = company.agents.length;
            
            reportData.push({
                company: companyName,
                startDate: company.relationshipStartDate,
                formattedStartDate: DateUtils.formatStartDate(company.relationshipStartDate),
                duration: DateUtils.formatDuration(duration.years, duration.months),
                durationMonths: DateUtils.getDurationInMonths(company.relationshipStartDate),
                agentCount: agentCount,
                contractTier: company.contractTier || 'Standard',
                milestone: DateUtils.getRelationshipMilestone(company.relationshipStartDate),
                agents: company.agents,
                agentBreakdown: this.getAgentBreakdown(company.agents)
            });
        });
        
        return reportData;
    }
    
    static getAgentBreakdown(agents) {
        const breakdown = {};
        agents.forEach(agent => {
            const role = this.getAgentRole(agent);
            breakdown[role] = (breakdown[role] || 0) + 1;
        });
        return breakdown;
    }
    
    static getAgentRole(agentName) {
        const roleMap = {
            'Legislation Agent': 'Legal Research',
            'Email Outreach Agent': 'Communication',
            'Email Reader Agent': 'Data Processing',
            'Summarising Agent': 'Content Analysis'
        };
        return roleMap[agentName] || 'General';
    }
    
    static calculateSummaryStats(data) {
        const totalCompanies = data.length;
        const totalAgents = data.reduce((sum, company) => sum + company.agentCount, 0);
        const avgDurationMonths = data.reduce((sum, company) => sum + company.durationMonths, 0) / totalCompanies;
        const longestRelationship = data.reduce((longest, company) => 
            company.durationMonths > longest.durationMonths ? company : longest
        );
        
        const avgDuration = DateUtils.calculateDuration(
            new Date(Date.now() - avgDurationMonths * 30 * 24 * 60 * 60 * 1000)
        );
        
        return {
            totalCompanies,
            totalAgents,
            avgDuration: DateUtils.formatDuration(avgDuration.years, avgDuration.months),
            longestRelationship: {
                company: longestRelationship.company,
                duration: longestRelationship.duration
            }
        };
    }
}

// Main relationship duration report component
function createRelationshipDurationReport() {
    const reportContainer = document.createElement('div');
    reportContainer.id = 'relationshipDurationReport';
    reportContainer.className = 'relationship-duration-report';
    
    reportContainer.innerHTML = `
        <div class="section">
            <h2 class="section-title">Company Relationship Duration & Agent Count Report</h2>
            
            <!-- Summary Cards -->
            <div class="summary-stats">
                <div class="stat-card">
                    <h4>Total Companies</h4>
                    <span id="totalCompaniesCount">0</span>
                </div>
                <div class="stat-card">
                    <h4>Total Agents Deployed</h4>
                    <span id="totalAgentsCount">0</span>
                </div>
                <div class="stat-card">
                    <h4>Average Relationship</h4>
                    <span id="avgRelationshipDuration">0</span>
                </div>
                <div class="stat-card">
                    <h4>Longest Partnership</h4>
                    <span id="longestPartnership">-</span>
                </div>
            </div>
            
            <!-- Export Controls -->
            <div class="report-controls">
                <button id="exportRelationshipCsvBtn" class="btn export-btn">Export CSV</button>
            </div>
            
            <!-- Report Table -->
            <div class="report-table-container">
                <table id="relationshipTable" class="relationship-table">
                    <thead>
                        <tr>
                            <th class="sortable" data-column="company">Company</th>
                            <th class="sortable" data-column="startDate">Start Date</th>
                            <th class="sortable" data-column="durationMonths">Relationship Duration</th>
                            <th class="sortable" data-column="agentCount">Agent Count</th>
                            <th class="sortable" data-column="contractTier">Contract Tier</th>
                            <th>Agent Breakdown</th>
                        </tr>
                    </thead>
                    <tbody id="relationshipTableBody">
                        <!-- Data will be populated here -->
                    </tbody>
                </table>
            </div>
        </div>
    `;
    
    return reportContainer;
}

// Display relationship data in table
function displayRelationshipData(data) {
    const tableBody = document.getElementById('relationshipTableBody');
    if (!tableBody) return;
    
    tableBody.innerHTML = '';
    
    data.forEach(row => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td class="company-cell">
                <div class="company-info">
                    <span class="company-name">${row.company}</span>
                    <span class="milestone-badge ${row.milestone}">${getMilestoneText(row.milestone)}</span>
                </div>
            </td>
            <td class="start-date-cell">${row.formattedStartDate}</td>
            <td class="duration-cell">${row.duration}</td>
            <td class="agent-count-cell">
                <span class="agent-count-number">${row.agentCount}</span>
                <span class="agent-count-label">agents</span>
            </td>
            <td class="contract-tier-cell">
                <span class="tier-badge ${row.contractTier.toLowerCase()}">${row.contractTier}</span>
            </td>
            <td class="agent-breakdown-cell">
                ${formatAgentBreakdown(row.agentBreakdown)}
            </td>
        `;
        tableBody.appendChild(tr);
    });
}

// Get milestone text for badges
function getMilestoneText(milestone) {
    const milestoneMap = {
        'veteran': '3+ Years',
        'established': '2+ Years', 
        'mature': '1+ Year',
        'new': 'New Client'
    };
    return milestoneMap[milestone] || 'New Client';
}

// Format agent breakdown for display
function formatAgentBreakdown(breakdown) {
    return Object.entries(breakdown)
        .map(([role, count]) => `<span class="role-tag">${role}: ${count}</span>`)
        .join('');
}

// Update summary statistics
function updateRelationshipSummaryStats(data) {
    const stats = RelationshipDataService.calculateSummaryStats(data);
    
    document.getElementById('totalCompaniesCount').textContent = stats.totalCompanies;
    document.getElementById('totalAgentsCount').textContent = stats.totalAgents;
    document.getElementById('avgRelationshipDuration').textContent = stats.avgDuration;
    document.getElementById('longestPartnership').textContent = 
        `${stats.longestRelationship.company} (${stats.longestRelationship.duration})`;
}

// Load and display relationship report data
function loadRelationshipReportData() {
    const reportData = RelationshipDataService.transformDataForReport();
    
    // Sort by duration (longest first) by default
    reportData.sort((a, b) => b.durationMonths - a.durationMonths);
    
    displayRelationshipData(reportData);
    updateRelationshipSummaryStats(reportData);
    initializeRelationshipReportEventListeners();
}

// Initialize event listeners for the relationship report
function initializeRelationshipReportEventListeners() {
    // Export functionality
    document.getElementById('exportRelationshipCsvBtn')?.addEventListener('click', exportRelationshipToCsv);
    
    // Column sorting
    document.querySelectorAll('#relationshipTable .sortable').forEach(header => {
        header.addEventListener('click', handleRelationshipSort);
        header.style.cursor = 'pointer';
    });
}

// Handle column sorting for relationship table
let relationshipSortColumn = 'durationMonths';
let relationshipSortDirection = 'desc';

function handleRelationshipSort(event) {
    const column = event.target.dataset.column;
    
    if (relationshipSortColumn === column) {
        relationshipSortDirection = relationshipSortDirection === 'asc' ? 'desc' : 'asc';
    } else {
        relationshipSortColumn = column;
        relationshipSortDirection = column === 'durationMonths' || column === 'agentCount' ? 'desc' : 'asc';
    }
    
    // Update header styling
    document.querySelectorAll('#relationshipTable .sortable').forEach(header => {
        header.classList.remove('sort-asc', 'sort-desc');
    });
    event.target.classList.add(`sort-${relationshipSortDirection}`);
    
    const reportData = RelationshipDataService.transformDataForReport();
    const sortedData = sortRelationshipData(reportData, relationshipSortColumn, relationshipSortDirection);
    displayRelationshipData(sortedData);
}

// Sort relationship data by column
function sortRelationshipData(data, column, direction) {
    return data.sort((a, b) => {
        let valueA = a[column];
        let valueB = b[column];
        
        // Handle numeric columns
        if (['durationMonths', 'agentCount'].includes(column)) {
            valueA = parseFloat(valueA);
            valueB = parseFloat(valueB);
        }
        
        // Handle date columns
        if (column === 'startDate') {
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

// Export relationship data to CSV
function exportRelationshipToCsv() {
    const reportData = RelationshipDataService.transformDataForReport();
    const csvContent = generateRelationshipCsvContent(reportData);
    downloadCsv(csvContent, `company-relationship-report-${new Date().toISOString().split('T')[0]}.csv`);
}

// Generate CSV content for relationship data
function generateRelationshipCsvContent(data) {
    const headers = ['Company', 'Start Date', 'Relationship Duration', 'Agent Count', 'Contract Tier', 'Agent Breakdown'];
    const csvRows = [headers.join(',')];
    
    data.forEach(row => {
        const agentBreakdownText = Object.entries(row.agentBreakdown)
            .map(([role, count]) => `${role}: ${count}`)
            .join('; ');
            
        const csvRow = [
            row.company,
            row.formattedStartDate,
            row.duration,
            row.agentCount,
            row.contractTier,
            agentBreakdownText
        ].map(value => `"${value}"`).join(',');
        csvRows.push(csvRow);
    });
    
    return csvRows.join('\n');
}

// Add relationship report specific styles
function addRelationshipReportStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .relationship-duration-report {
            margin-top: 2rem;
        }
        
        .summary-stats {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1rem;
            margin-bottom: 2rem;
        }
        
        .stat-card {
            text-align: center;
            padding: 1.5rem;
            background: #1a1a1a;
            border: 1px solid #333;
            border-radius: 8px;
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
        
        .report-controls {
            display: flex;
            justify-content: flex-end;
            margin-bottom: 1rem;
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
        }
        
        .relationship-table {
            width: 100%;
            border-collapse: collapse;
            background: #0a0a0a;
        }
        
        .relationship-table th {
            background: #1a1a1a;
            padding: 1rem;
            text-align: left;
            border-bottom: 2px solid #333;
            font-weight: 600;
            color: #999;
            text-transform: uppercase;
            font-size: 0.75rem;
        }
        
        .relationship-table td {
            padding: 1rem;
            border-bottom: 1px solid #333;
            vertical-align: top;
        }
        
        .relationship-table tr:hover {
            background: rgba(255, 107, 53, 0.05);
        }
        
        .company-info {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
        }
        
        .company-name {
            font-weight: 600;
            color: #FF6B35;
        }
        
        .milestone-badge {
            display: inline-block;
            padding: 0.25rem 0.5rem;
            border-radius: 12px;
            font-size: 0.7rem;
            font-weight: 600;
            text-transform: uppercase;
        }
        
        .milestone-badge.veteran {
            background: rgba(76, 175, 80, 0.2);
            color: #4CAF50;
        }
        
        .milestone-badge.established {
            background: rgba(33, 150, 243, 0.2);
            color: #2196F3;
        }
        
        .milestone-badge.mature {
            background: rgba(255, 193, 7, 0.2);
            color: #FFC107;
        }
        
        .milestone-badge.new {
            background: rgba(255, 107, 53, 0.2);
            color: #FF6B35;
        }
        
        .agent-count-number {
            font-size: 1.25rem;
            font-weight: 600;
            color: #FF6B35;
        }
        
        .agent-count-label {
            font-size: 0.75rem;
            color: #999;
            margin-left: 0.25rem;
        }
        
        .tier-badge {
            display: inline-block;
            padding: 0.25rem 0.75rem;
            border-radius: 20px;
            font-size: 0.75rem;
            font-weight: 600;
            text-transform: uppercase;
        }
        
        .tier-badge.premium {
            background: rgba(76, 175, 80, 0.2);
            color: #4CAF50;
        }
        
        .tier-badge.enterprise {
            background: rgba(156, 39, 176, 0.2);
            color: #9C27B0;
        }
        
        .tier-badge.standard {
            background: rgba(96, 125, 139, 0.2);
            color: #607D8B;
        }
        
        .agent-breakdown-cell {
            font-size: 0.875rem;
        }
        
        .role-tag {
            display: inline-block;
            background: #1a1a1a;
            border: 1px solid #333;
            padding: 0.25rem 0.5rem;
            border-radius: 4px;
            margin: 0.125rem;
            font-size: 0.75rem;
            color: #ccc;
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
        
        @media (max-width: 768px) {
            .summary-stats {
                grid-template-columns: repeat(2, 1fr);
            }
            
            .relationship-table th,
            .relationship-table td {
                padding: 0.5rem;
                font-size: 0.875rem;
            }
        }
    `;
    document.head.appendChild(style);
}

// Function to show the relationship duration report
function showRelationshipDurationReport() {
    const mainContent = document.getElementById('mainContent');
    const summaryView = document.getElementById('summaryView');
    const summaryCards = document.getElementById('summaryCards');
    const performanceReport = document.getElementById('companyAgentReport');
    
    // Hide other views
    mainContent.style.display = 'none';
    summaryView.style.display = 'none';
    summaryCards.style.display = 'none';
    if (performanceReport) performanceReport.style.display = 'none';
    
    // Create or show relationship report
    let reportElement = document.getElementById('relationshipDurationReport');
    if (!reportElement) {
        reportElement = createRelationshipDurationReport();
        addRelationshipReportStyles();
        document.querySelector('.dashboard').appendChild(reportElement);
        loadRelationshipReportData();
    } else {
        reportElement.style.display = 'block';
        loadRelationshipReportData(); // Refresh data
    }
}

// Function to hide the relationship duration report
function hideRelationshipDurationReport() {
    const reportElement = document.getElementById('relationshipDurationReport');
    if (reportElement) {
        reportElement.style.display = 'none';
    }
    
    // Show default views
    document.getElementById('mainContent').style.display = 'block';
    document.getElementById('summaryCards').style.display = 'grid';
}

// Export the functions for use in main dashboard
window.showRelationshipDurationReport = showRelationshipDurationReport;
window.hideRelationshipDurationReport = hideRelationshipDurationReport;