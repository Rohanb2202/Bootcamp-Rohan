# Clinical Trials Data Viewer

## Problem Definition

Create an enhanced interface for clinicaltrials.gov that improves upon the current implementation by:

- Ensuring the first column remains fixed during horizontal scrolling for better usability.
- Providing a more user-friendly and responsive data viewing experience
- Implementing modern filtering and search capabilities
- Displaying clinical trial data in an organized, easy-to-read format
- Adding additional data columns (Target, Modality, MOA) in Phase 2
- Utilizing the clinicaltrials.gov API for real-time data access
- Allowing users to toggle between card and table views

## Users and Use Cases

### Primary Users

1. **Medical Researchers**

   - Need to quickly find relevant clinical trials
   - Require detailed trial information
   - Often compare multiple studies

2. **Healthcare Professionals**

   - Reference trials for patient care
   - Track study status and results
   - Search for specific treatments or conditions

3. **Pharmaceutical Industry**

   - Monitor competitive trials
   - Track study progress
   - Analyze intervention patterns

### User Stories

- Users can search for trials by disease name
- Users can view comprehensive trial details in a clear table format
- Users can toggle between table and card views
- Users can filter and sort results
- Users can select specific columns for viewing
- Users can access detailed study information via hyperlinks

## Testing Inputs

### Diseases for Testing

You may use the following diseases as inputs to test the application:

1. Asthma
2. Hidradenitis Suppurativa
3. Prurigo Nodularis
4. Atopic Dermatitis
5. Atopic Eczema
6. Chronic Idiopathic Urticaria

### API Details

**Fetch all studies for a given disease:**

- **Input:** Disease name
- **API:** [https://clinicaltrials.gov/api/v2/studies?query.term=%3C%3Cdisease%3E%3E&countTotal=true](https://clinicaltrials.gov/api/v2/studies?query.term=%3C%3Cdisease%3E%3E\&countTotal=true)

**Output:**
Display a table with the following columns:

- Study Title
- NCT ID
- Status
- Intervention (Drug name)
- Sponsor
- Target (part-2)
- Modality(part-2)
- MOA (part-2)

Reference: [https://clinicaltrials.gov/expert-search?term=Atopic%20Dermatitis](https://clinicaltrials.gov/expert-search?term=Atopic%20Dermatitis)

## Development Plan

### Version 0: Basic Framework

- Set up Next.js project structure
- Implement basic API integration
- Create basic table component
- Display fundamental data (Study Title, NCT ID, Status). The first column (e.g., Study Title) will remain fixed to ensure it is always visible during horizontal scrolling.

### Version 1: Core Functionality

- Implement search functionality
- Add basic filtering
- Display all Phase 1 columns
- Add error handling
- Implement loading states

### Version 2: Enhanced Features

- Add column selection functionality
- Implement advanced filtering
- Add sorting capabilities
- Improve responsive design
- Implement pagination
- Add toggle functionality for card and table views

### Version 3: Final Phase 1

- Add hyperlinks to study titles
- Implement detailed view
- Optimize performance
- Add export functionality
- Polish UI/UX

### Phase 2 Planning (Part-2)

- Implement Target column
- Add Modality information
- Integrate MOA data
- Enhance filtering for new columns

## Milestones

1. **Foundation**

   - Working API integration
   - Basic table display
   - Initial search implementation

2. **Core Features**

   - Complete search functionality
   - Basic filtering working
   - All Phase 1 columns displayed

3. **Enhanced Features**

   - Column selection working
   - Advanced filtering implemented
   - Sorting functionality complete
   - Toggle between table and card views

4. **Phase 1 Completion**

   - All features implemented
   - Performance optimized
   - Testing complete

## Exit Criteria

### Technical Requirements

- API successfully fetches and displays data
- All Phase 1 columns implemented
- Search and filtering working correctly
- Responsive design functioning
- Performance metrics met

### User Experience Requirements

- Interface is intuitive and responsive
- Search results load within 2 seconds
- Filtering updates display immediately
- No critical bugs or UI issues
- Accessibility requirements met

### Documentation Requirements

- Architecture & API integration documentation complete

## Project Deliverables

### Software

1. **Frontend Application**

   - Next.js application code
   - Build files
   - Deployment configuration

2. **API Integration**

   - API wrapper
   - Data transformation layer
   - Error handling implementation

### Documentation

1. **Technical Documentation**

   - Architecture overview

## Success Metrics

- Page load time under 2 seconds
- Search results returned within 1 second
- 98% uptime
- Zero critical bugs
- Positive user feedback
- Accessibility score > 90%

