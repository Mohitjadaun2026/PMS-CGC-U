# On-Campus Job Posting System

This document describes the implementation of the on-campus job posting functionality that has been added to the existing PMS (Placement Management System) platform.

## Overview

The system now supports two types of job postings:
1. **Off-Campus Jobs**: Traditional jobs with external application links
2. **On-Campus Jobs**: Jobs with dynamic application forms built by admins

## New Features

### 1. Job Type Classification
- **Campus Type**: Each job now has a `campusType` field (`on-campus` or `off-campus`)
- **Application Method**: 
  - Off-campus jobs use external application links
  - On-campus jobs use custom-built application forms

### 2. Dynamic Form Builder
Admins can create custom application forms for on-campus jobs with:
- **Field Types**: text, email, phone, textarea, select, checkbox, file
- **Field Properties**: label, required/optional, placeholder, validation
- **Options**: For select and checkbox fields
- **File Uploads**: Support for resume, portfolio, and other documents

### 3. Application Management
- **Application Tracking**: Store and manage all job applications
- **Status Management**: Track applications through stages (pending, shortlisted, interviewed, selected, rejected)
- **Admin Notes**: Add internal notes and comments
- **Statistics**: View application counts and status breakdowns

## Database Schema Changes

### Job Model Updates
```javascript
// New fields added to Job schema
campusType: {
  type: String,
  enum: ['on-campus', 'off-campus'],
  default: 'off-campus'
},
applicationFormFields: [{
  fieldName: String,
  fieldLabel: String,
  fieldType: String,
  required: Boolean,
  options: [String],
  placeholder: String,
  validation: String
}],
applicationLink: String, // For off-campus jobs
createdAt: Date,
updatedAt: Date
```

### New Application Model
```javascript
const applicationSchema = new mongoose.Schema({
  jobId: ObjectId,
  applicantName: String,
  applicantEmail: String,
  applicantPhone: String,
  applicantCourse: String,
  applicantYear: String,
  applicantBranch: String,
  formResponses: [{
    fieldName: String,
    fieldLabel: String,
    fieldType: String,
    response: Mixed,
    filePath: String
  }],
  status: String,
  adminNotes: String,
  appliedAt: Date,
  updatedAt: Date
});
```

## API Endpoints

### Job Management
- `GET /api/jobs` - Get all jobs (existing)
- `POST /api/jobs` - Create job (updated for on-campus support)
- `PUT /api/jobs/:id` - Update job (updated for on-campus support)
- `DELETE /api/jobs/:id` - Delete job (existing)

### Application Management
- `POST /api/applications/submit` - Submit job application
- `GET /api/applications/all` - Get all applications (admin only)
- `GET /api/applications/job/:jobId` - Get applications for specific job (admin only)
- `PUT /api/applications/:id/status` - Update application status (admin only)
- `GET /api/applications/stats` - Get application statistics (admin only)

## Frontend Components

### 1. AdminJobPosting.jsx
Enhanced job posting form with:
- Campus type selection
- Dynamic form builder for on-campus jobs
- External link input for off-campus jobs
- Form validation and field management

### 2. ApplicationManagement.jsx
New component for admins to:
- View all applications
- Filter by job
- Update application status
- Add admin notes
- View statistics

### 3. Jobs.jsx
Updated jobs page with:
- Campus type badges
- Dynamic application forms for on-campus jobs
- External link handling for off-campus jobs
- Application submission and validation

## Usage Guide

### For Admins

#### Creating On-Campus Jobs
1. Navigate to Job Management
2. Select "On-Campus" as campus type
3. Fill in basic job details
4. Use the Form Builder to create custom application fields
5. Add fields like:
   - Resume upload
   - Portfolio link
   - Cover letter
   - Technical skills assessment
   - Previous experience
6. Save the job posting

#### Creating Off-Campus Jobs
1. Navigate to Job Management
2. Select "Off-Campus" as campus type
3. Fill in basic job details
4. Provide the external application link
5. Save the job posting

#### Managing Applications
1. Navigate to Application Management
2. View all applications or filter by specific job
3. Update application status as candidates progress
4. Add internal notes for team collaboration
5. Monitor application statistics

### For Students

#### Applying to On-Campus Jobs
1. Browse available jobs
2. Click on an on-campus job
3. Click "Apply Now"
4. Fill out the custom application form
5. Submit application

#### Applying to Off-Campus Jobs
1. Browse available jobs
2. Click on an off-campus job
3. Click "Apply on Company Website"
4. Get redirected to external application page

## File Structure

```
PMS-CGC-U/
├── backend/
│   ├── models/
│   │   ├── Job.js (updated)
│   │   └── Application.js (new)
│   ├── controllers/
│   │   ├── jobControllers.js (updated)
│   │   └── applicationController.js (new)
│   ├── routes/
│   │   ├── jobRoutes.js (existing)
│   │   └── applicationRoutes.js (new)
│   └── server.js (updated)
├── frontend/
│   └── src/
│       ├── components/
│       │   ├── AdminJobPosting.jsx (updated)
│       │   ├── ApplicationManagement.jsx (new)
│       │   ├── AdminHeader.jsx (updated)
│       │   └── jobs.jsx (updated)
│       ├── App.jsx (updated)
│       └── components/
│           ├── AdminJobPosting.css (updated)
│           ├── ApplicationManagement.css (new)
│           └── jobs.css (updated)
```

## Security Features

- **Authentication Required**: All admin endpoints require valid admin tokens
- **Input Validation**: Form fields are validated on both frontend and backend
- **File Upload Security**: File uploads are restricted and validated
- **Access Control**: Application data is only accessible to authenticated admins

## Error Handling

- **Form Validation**: Comprehensive validation for all form fields
- **API Error Handling**: Proper HTTP status codes and error messages
- **User Feedback**: Clear success/error messages for all operations
- **Graceful Degradation**: System continues to work even if some features fail

## Performance Considerations

- **Database Indexing**: Proper indexes on frequently queried fields
- **Pagination**: Support for large numbers of applications
- **Efficient Queries**: Optimized database queries with population
- **File Storage**: Efficient file handling for uploads

## Future Enhancements

1. **Email Notifications**: Send confirmation emails to applicants
2. **Interview Scheduling**: Built-in interview management system
3. **Resume Parsing**: Automatic extraction of candidate information
4. **Analytics Dashboard**: Advanced reporting and insights
5. **Bulk Operations**: Mass status updates and actions
6. **Export Functionality**: Export applications to CSV/PDF
7. **Integration**: Connect with external HR systems

## Troubleshooting

### Common Issues

1. **Form Fields Not Saving**
   - Check if campus type is set to "on-campus"
   - Verify form field validation
   - Check browser console for errors

2. **Applications Not Loading**
   - Verify admin authentication
   - Check API endpoint configuration
   - Ensure database connection is active

3. **File Uploads Failing**
   - Check upload directory permissions
   - Verify file size limits
   - Check file type restrictions

### Debug Mode

Enable debug logging by setting environment variables:
```bash
DEBUG=true
NODE_ENV=development
```

## Support

For technical support or questions about the on-campus job system:
1. Check the application logs
2. Review the database schema
3. Test API endpoints individually
4. Verify frontend component state

## Conclusion

The on-campus job posting system provides a comprehensive solution for managing both types of job postings while maintaining the existing functionality. The dynamic form builder allows for flexible application processes, and the application management system provides full visibility into the hiring process.
