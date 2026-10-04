import React, { useEffect, useState } from 'react';
import AdminHeader from './AdminHeader';
import { getAllJobs, getApplicationStats } from '../../api/jobs';
import { getUserStats } from '../../api/admin';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const adminUser = JSON.parse(localStorage.getItem('adminUser') || '{}');
  const isSuperAdmin = adminUser.role === 'super_admin';
  const [metrics, setMetrics] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadMetrics = async () => {
      try {
        const requests = [getAllJobs(), getApplicationStats()];
        if (isSuperAdmin) requests.push(getUserStats());
        const [jobs, applications, userStats] = await Promise.all(requests);
        setMetrics({
          jobs: jobs.length,
          onCampus: jobs.filter((job) => job.jobApplicationType === 'ON_CAMPUS').length,
          offCampus: jobs.filter((job) => job.jobApplicationType === 'OFF_CAMPUS').length,
          applications: applications.totalApplications || 0,
          admins: userStats?.admins,
          students: userStats?.students,
        });
      } catch (loadError) {
        setError(loadError.response?.data?.error || 'Unable to load dashboard metrics');
      }
    };
    loadMetrics();
  }, [isSuperAdmin]);

  return (
    <div className={`admin-dashboard min-h-screen ${isSuperAdmin ? 'super-admin-theme' : ''}`}>
      <AdminHeader />
      <main className="admin-dashboard-main mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="admin-dashboard-intro mb-8">
          <p className="admin-eyebrow text-sm font-semibold uppercase tracking-wide">{isSuperAdmin ? 'System Control' : 'Placement Operations'}</p>
          <h1 className="mt-2 text-3xl font-bold">{isSuperAdmin ? 'Super Admin Dashboard' : 'Admin Dashboard'}</h1>
          <p className="mt-2">{isSuperAdmin ? 'Monitor the complete placement platform and manage administrators.' : 'Manage placement activity, jobs, and applications from one workspace.'}</p>
        </div>
        {error && <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">{error}</div>}
        {!metrics && !error && <div className="rounded-lg bg-white p-8 text-gray-600 shadow">Loading dashboard metrics...</div>}
        {metrics && (
          <div className="admin-metrics-grid grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ['Total Jobs', metrics.jobs],
              ['On-Campus Jobs', metrics.onCampus],
              ['Off-Campus Jobs', metrics.offCampus],
              ['Applications', metrics.applications],
              ...(isSuperAdmin ? [['Students', metrics.students], ['Administrators', metrics.admins]] : []),
            ].map(([label, value]) => (
              <div key={label} className="admin-metric-card rounded-xl border p-6 shadow-sm">
                <p className="text-sm">{label}</p>
                <p className="mt-3 text-3xl font-bold">{value ?? 0}</p>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
