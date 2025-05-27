# Company Relationship Duration & Agent Count Report

## Introduction/Overview

This feature provides a comprehensive report showing how long Two Dot AI has been working with each client company and the number of agents currently deployed for each client. The report serves as a key business intelligence tool for account managers and sales teams to track client relationship longevity and service scale, supporting both business development initiatives and billing/invoicing processes.

## Goals

1. Provide clear visibility into client relationship duration for business development tracking
2. Support billing and invoicing processes with accurate relationship timeline data
3. Display current agent deployment counts for each client
4. Enable quick assessment of client portfolio maturity and service scale
5. Support account management and client retention strategies

## User Stories

1. As an account manager, I want to see how long we've been working with each client so that I can prepare for renewal conversations and relationship milestones
2. As a sales team member, I want to identify our longest-standing clients so that I can use them as references for new prospects
3. As a billing coordinator, I want to see relationship start dates and agent counts so that I can accurately process invoices and contracts
4. As an executive, I want to understand our client portfolio maturity so that I can make strategic business decisions
5. As an account manager, I want to see which clients have the most agents so that I can prioritize my attention and support efforts

## Functional Requirements

1. The system must display a list of all client companies with their relationship information
2. The system must show the relationship start date for each company
3. The system must calculate and display the total duration of the relationship (in years and months)
4. The system must show the current number of active agents for each company
5. The system must provide a breakdown of agent types/roles for each company
6. The system must allow sorting by relationship duration (longest to shortest and vice versa)
7. The system must allow sorting by agent count (highest to lowest and vice versa)
8. The system must display data in a clear, scannable table format
9. The system must include summary statistics showing:
   - Average relationship duration across all clients
   - Total number of clients
   - Total agents deployed across all clients
   - Longest-standing client relationship
10. The system must allow exporting the report data to CSV format
11. The system must handle mock/sample data for demonstration purposes

## Non-Goals (Out of Scope)

1. Historical agent count changes over time
2. Revenue or contract value information
3. Client satisfaction scores or feedback integration
4. Real-time contract renewal notifications
5. Detailed financial or billing calculations
6. Integration with external CRM or billing systems
7. Client communication or contact management features

## Design Considerations

- Use a clean, professional table layout suitable for business reporting
- Implement clear visual indicators for relationship milestones (e.g., 1+ years, 2+ years)
- Use consistent styling with existing dashboard components
- Include summary cards highlighting key metrics at the top of the report
- Ensure the report is easily printable for meetings and presentations
- Use intuitive icons or indicators for different agent types

## Technical Considerations

- Should integrate with existing company data structure in dashboard
- Requires adding relationship start date data to company records
- May need to extend existing data model to include relationship timeline information
- Consider using date manipulation libraries for duration calculations
- Ensure proper date formatting for different locales
- Implement efficient sorting algorithms for large client lists

## Success Metrics

1. Account managers can quickly identify relationship milestones within 5 seconds
2. 100% accuracy in relationship duration calculations
3. Report loads within 2 seconds for up to 50 client companies
4. Successful CSV export functionality for all displayed data
5. Positive feedback from account management team on report usefulness for client conversations

## Open Questions

1. Should the report include any visual indicators for relationship milestones (e.g., badges for 1+ year, 2+ year clients)?
2. Do we need any filtering capabilities beyond sorting (e.g., filter by relationship duration ranges)?
3. Should agent counts include only active agents or also paused/inactive agents?
4. What date format should be used for displaying relationship start dates?
5. Should there be any alerts or highlights for clients approaching contract renewal dates?
6. Do we need any drill-down capabilities to see more detailed agent information for each company?