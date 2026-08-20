import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Bell,
  CheckCircle2,
  Calendar,
  FlaskConical,
  Pill,
  Shield,
  Filter,
  CheckCheck,
  ArrowRight,
  Clock
} from 'lucide-react';

export const NotificationsPage: React.FC = () => {
  const {
    notifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    setActivePage,
  } = useApp();

  const [categoryFilter, setCategoryFilter] = useState('All');

  const filteredNotifications = notifications.filter(
    (n) => categoryFilter === 'All' || n.category === categoryFilter
  );

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'appointment':
        return Calendar;
      case 'laboratory':
        return FlaskConical;
      case 'prescription':
        return Pill;
      default:
        return Bell;
    }
  };

  const handleActionClick = (notif: typeof notifications[0]) => {
    markNotificationAsRead(notif.id);
    if (notif.category === 'appointment') {
      setActivePage('appointments');
    } else if (notif.category === 'laboratory') {
      setActivePage('lab-results');
    } else if (notif.category === 'prescription') {
      setActivePage('prescriptions');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Top Header */}
      <div className="border-b border-slate-200 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
            <Bell className="w-7 h-7 text-sky-700" />
            Healthcare Notifications Center
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Automated alerts regarding your clinic appointment confirmations, laboratory diagnostic results, and prescription statuses.
          </p>
        </div>

        <button
          onClick={markAllNotificationsAsRead}
          className="bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold px-4 py-2 rounded-lg flex items-center gap-1.5 transition-colors shrink-0"
        >
          <CheckCheck className="w-4 h-4 text-sky-700" />
          <span>Mark All as Read</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 text-xs">
        {['All', 'appointment', 'laboratory', 'prescription', 'system'].map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoryFilter(cat)}
            className={`px-3.5 py-1.5 rounded-lg font-medium capitalize transition-colors ${
              categoryFilter === cat
                ? 'bg-slate-900 text-white'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
            }`}
          >
            {cat === 'All' ? 'All Alerts' : `${cat} Alerts`}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      {filteredNotifications.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-xl p-12 text-center text-xs text-slate-500 space-y-2">
          <Bell className="w-8 h-8 text-slate-300 mx-auto" />
          <p>No notifications in this category.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredNotifications.map((n) => {
            const Icon = getCategoryIcon(n.category);

            return (
              <div
                key={n.id}
                className={`border rounded-xl p-4 sm:p-5 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                  n.read
                    ? 'bg-white border-slate-200'
                    : 'bg-sky-50/60 border-sky-200 shadow-xs'
                }`}
              >
                <div className="flex items-start gap-3.5">
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                      n.category === 'appointment'
                        ? 'bg-sky-100 text-sky-800'
                        : n.category === 'laboratory'
                        ? 'bg-teal-100 text-teal-800'
                        : n.category === 'prescription'
                        ? 'bg-indigo-100 text-indigo-800'
                        : 'bg-slate-100 text-slate-800'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                        {n.title}
                      </h3>
                      {!n.read && (
                        <span className="w-2 h-2 rounded-full bg-sky-600"></span>
                      )}
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {n.message}
                    </p>
                    <span className="text-[11px] text-slate-400 font-mono block pt-0.5">
                      {n.timestamp}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                  <button
                    onClick={() => handleActionClick(n)}
                    className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors"
                  >
                    <span>Open Module</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>

                  {!n.read && (
                    <button
                      onClick={() => markNotificationAsRead(n.id)}
                      className="border border-slate-300 hover:bg-slate-100 text-slate-600 text-xs px-2.5 py-1.5 rounded-lg transition-colors"
                      title="Mark as read"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
