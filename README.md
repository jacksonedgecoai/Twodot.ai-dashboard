# Two Dot AI Agent Dashboard

A comprehensive dashboard for monitoring AI agents across multiple client companies, featuring performance metrics, relationship tracking, and business intelligence reporting.

## Features

### 🎯 Main Dashboard
- **Agent Performance Monitoring**: Real-time status tracking for all agents
- **Company Overview**: Detailed view of agents per company
- **Interactive Charts**: Performance metrics visualization using Chart.js
- **Action Controls**: Pause agents and view logs functionality

### 📊 Performance Reports
- **Company-Agent Performance Report**: Comprehensive view of all agents across companies
- **Real-time Filtering**: Search by company, agent, or performance level
- **Sortable Columns**: Click headers to sort by any metric
- **CSV Export**: Download report data for external analysis
- **Performance Indicators**: Visual badges for high/medium/low performers

### 🤝 Relationship Analytics
- **Relationship Duration Tracking**: See how long you've worked with each client
- **Agent Count Analysis**: Current deployment across all companies
- **Contract Tier Management**: Premium, Enterprise, and Standard tiers
- **Milestone Badges**: Visual indicators for relationship maturity
- **Business Intelligence**: Summary statistics and portfolio insights

## Technology Stack

- **Frontend**: Vanilla JavaScript, HTML5, CSS3
- **Charts**: Chart.js for data visualization
- **Styling**: Dark theme with responsive design
- **Data**: Mock data structure for demonstration

## Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd "Testing Agent"
   ```

2. **Open the dashboard**
   ```bash
   open dashboard/index.html
   ```
   Or serve using a local web server:
   ```bash
   cd dashboard
   python -m http.server 8000
   # Navigate to http://localhost:8000
   ```

## Usage

### Navigation
- **Main Dashboard**: Select companies and agents from dropdowns
- **Performance Report**: Click "Performance Report" button in header
- **Relationship Report**: Click "Relationship Report" button in header
- **Summary View**: Toggle between detailed and summary views

### Reports
- **Export Data**: Use CSV export buttons to download report data
- **Sort Data**: Click column headers to sort tables
- **Filter Data**: Use search and filter controls in performance report

## Project Structure

```
Testing Agent/
├── dashboard/
│   ├── index.html                          # Main entry point
│   ├── dashboard.js                        # Core dashboard functionality
│   ├── company-agent-report.js            # Performance reporting
│   └── relationship-duration-report.js     # Relationship analytics
├── tasks/                                  # Project documentation
│   ├── prd-company-agent-performance-report.md
│   ├── prd-company-relationship-duration-report.md
│   ├── tasks-company-agent-performance-report.md
│   └── tasks-company-relationship-duration-report.md
├── rules/                                  # Project rules and guidelines
│   ├── create-prd.mdc
│   └── generate-tasks.mdc
├── .gitignore
└── README.md
```

## Sample Data

The dashboard includes sample data for three companies:

- **ISG**: Premium tier, 2+ year relationship, 4 agents
- **Bougainville Mine**: Enterprise tier, 1+ year relationship, 4 agents  
- **Bush to Beach Legal**: Standard tier, 1 year relationship, 4 agents

Each company has 4 specialized agents:
- Legislation Agent (Legal Research)
- Email Outreach Agent (Communication)
- Email Reader Agent (Data Processing)
- Summarising Agent (Content Analysis)

## Development

### Adding New Companies
1. Extend the `companyData` object in `dashboard.js`
2. Include `relationshipStartDate` and `contractTier`
3. Add agent data with performance metrics

### Adding New Features
1. Create feature PRD in `/tasks` directory
2. Generate development tasks
3. Implement following existing patterns
4. Update documentation

## Features by Module

### Core Dashboard (`dashboard.js`)
- Company and agent selection
- Performance metrics display
- Interactive charts
- Status management

### Performance Report (`company-agent-report.js`)
- Multi-company agent overview
- Performance categorization
- Search and filtering
- CSV export functionality

### Relationship Report (`relationship-duration-report.js`)
- Duration calculations
- Milestone tracking
- Contract tier management
- Business intelligence metrics

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is for demonstration purposes.