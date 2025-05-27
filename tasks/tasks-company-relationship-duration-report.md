# Development Tasks: Company Relationship Duration & Agent Count Report

## Data Model Tasks

### 1. Extend Company Data Structure
- [ ] Add relationship start date field to existing company data
- [ ] Create mock start dates for existing companies (ISG, Bougainville Mine, Bush to Beach Legal)
- [ ] Add contract tier or service level fields (optional enhancement)
- [ ] Validate data structure supports all required fields
- [ ] Ensure backward compatibility with existing dashboard

### 2. Date Calculation Logic
- [ ] Create utility functions for calculating relationship duration
- [ ] Implement year and month calculation from start date to current date
- [ ] Add proper handling for leap years and month variations
- [ ] Create human-readable duration formatting (e.g., "2 years, 3 months")
- [ ] Add validation for future dates and invalid date ranges

## Frontend Components

### 3. Relationship Duration Report Component
- [ ] Create RelationshipDurationReport main component
- [ ] Build CompanyRelationshipTable component with sortable columns
- [ ] Create RelationshipSummaryCards component for key metrics
- [ ] Implement DurationIndicator component for milestone badges
- [ ] Create AgentCountBreakdown component for agent type display
- [ ] Build ExportCSV component for data export functionality

### 4. Table Implementation
- [ ] Design responsive table layout for relationship data
- [ ] Implement column sorting for duration (longest to shortest)
- [ ] Add column sorting for agent count (highest to lowest)
- [ ] Create sortable company name column
- [ ] Add relationship start date column with proper formatting
- [ ] Implement agent breakdown column with role distribution

### 5. Visual Indicators
- [ ] Create milestone badges for relationship duration (1+ year, 2+ year, etc.)
- [ ] Implement color-coded indicators for relationship maturity
- [ ] Add agent count visual indicators (high, medium, low deployment)
- [ ] Create icons for different agent types/roles
- [ ] Design professional styling suitable for business reports

## Business Logic

### 6. Data Processing
- [ ] Create service to fetch and process relationship data
- [ ] Implement relationship duration calculation service
- [ ] Build agent count aggregation logic
- [ ] Create summary statistics calculation (average duration, totals)
- [ ] Add agent type categorization and counting logic

### 7. Summary Statistics
- [ ] Calculate average relationship duration across all clients
- [ ] Compute total number of clients
- [ ] Calculate total agents deployed across all clients
- [ ] Identify and highlight longest-standing client relationship
- [ ] Create client portfolio maturity assessment logic

### 8. Export Functionality
- [ ] Implement CSV export for relationship data
- [ ] Create proper CSV formatting with headers
- [ ] Add file naming convention with timestamps
- [ ] Include all relevant columns in export (company, start date, duration, agent count)
- [ ] Handle special characters and data sanitization for CSV

## UI/UX Features

### 9. Sorting and Filtering
- [ ] Implement multi-column sorting capability
- [ ] Add sort direction indicators (ascending/descending arrows)
- [ ] Create sorting persistence for user experience
- [ ] Add default sorting by relationship duration (longest first)
- [ ] Implement secondary sort by company name for ties

### 10. Professional Report Design
- [ ] Design clean, business-appropriate table layout
- [ ] Implement print-friendly CSS styles
- [ ] Create summary section at top of report
- [ ] Add proper spacing and typography for readability
- [ ] Ensure consistent styling with existing dashboard theme

### 11. Interactive Features
- [ ] Add hover effects for table rows
- [ ] Implement tooltip displays for detailed information
- [ ] Create expandable rows for agent breakdown details (optional)
- [ ] Add loading states for data fetching
- [ ] Implement error handling for data display issues

## Integration Tasks

### 12. Dashboard Integration
- [ ] Add "Relationship Report" button to dashboard header
- [ ] Create navigation between different report views
- [ ] Integrate with existing dashboard routing/view management
- [ ] Ensure proper cleanup when switching between views
- [ ] Maintain consistent header and navigation elements

### 13. Data Integration
- [ ] Extend existing companyData object with relationship information
- [ ] Create mock relationship start dates that make business sense
- [ ] Ensure data consistency across all dashboard views
- [ ] Add data validation for relationship information
- [ ] Create data migration strategy for future real data

## Testing Tasks

### 14. Unit Testing
- [ ] Write tests for duration calculation functions
- [ ] Create tests for data processing and aggregation logic
- [ ] Test CSV export functionality with various data sets
- [ ] Verify sorting algorithms work correctly
- [ ] Test edge cases (same start dates, future dates, invalid dates)

### 15. Integration Testing
- [ ] Test full report rendering with mock data
- [ ] Verify export functionality works end-to-end
- [ ] Test sorting interactions and state management
- [ ] Validate responsive design on different screen sizes
- [ ] Test navigation between report and main dashboard

### 16. User Experience Testing
- [ ] Verify report loads within 2 seconds
- [ ] Test print functionality and layout
- [ ] Validate CSV export opens correctly in Excel/spreadsheet apps
- [ ] Test accessibility features (keyboard navigation, screen readers)
- [ ] Verify professional appearance suitable for client presentations

## Performance & Optimization

### 17. Performance Tasks
- [ ] Optimize date calculation performance for large datasets
- [ ] Implement efficient sorting algorithms
- [ ] Add lazy loading for large client lists (if needed)
- [ ] Optimize rendering performance for table updates
- [ ] Create performance benchmarks for 50+ companies

### 18. Code Quality
- [ ] Add proper error handling for all date operations
- [ ] Implement input validation for all user interactions
- [ ] Create comprehensive documentation for date utilities
- [ ] Add code comments for business logic
- [ ] Ensure consistent code style across all components

## Documentation & Deployment

### 19. Documentation
- [ ] Document relationship data structure and fields
- [ ] Create user guide for report features
- [ ] Document CSV export format and usage
- [ ] Write technical documentation for date calculation logic
- [ ] Create business user guide for account managers

### 20. Deployment Preparation
- [ ] Test in staging environment with full dataset
- [ ] Validate all features work in production-like conditions
- [ ] Create deployment checklist for relationship report
- [ ] Prepare rollback plan if issues arise
- [ ] Document any new dependencies or requirements

## Priority Phases

**Phase 1 (Core MVP):**
- Data model extension with relationship dates
- Basic table component with duration calculation
- Summary statistics display
- Basic sorting functionality

**Phase 2 (Enhanced Features):**
- Visual indicators and milestone badges
- CSV export functionality
- Professional styling and print layout
- Advanced sorting and interaction features

**Phase 3 (Polish & Optimization):**
- Comprehensive testing and validation
- Performance optimization
- User experience enhancements
- Documentation and deployment preparation