'use client';
import { useState, useEffect, useCallback, useRef } from 'react';
import { dashboardService } from '@/services/dashboardService';
import { useCampaignSender } from '@/hooks/useCampaignSender';
import CampaignProgress from '@/components/admin/CampaignProgress';

export default function BroadcastHistoryTab() {
    const [messages, setMessages] = useState([]);
    const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 });
    const [typeFilter, setTypeFilter] = useState('all');
    const [loading, setLoading] = useState(true);
    const [expandedId, setExpandedId] = useState(null);
    const [resumingId, setResumingId] = useState(null);
    const sender = useCampaignSender();
    const currentPage = useRef(1);

    const fetchHistory = useCallback(async (page = 1, { silent = false } = {}) => {
        try {
            if (!silent) setLoading(true);
            const response = await dashboardService.getBroadcastHistory(page, 15, typeFilter);
            if (response.success) {
                currentPage.current = page;
                setMessages(response.campaigns || []);
                setPagination(response.pagination);
            }
        } catch (err) {
            console.error('History error:', err);
        } finally {
            if (!silent) setLoading(false);
        }
    }, [typeFilter]);

    const handleResume = async (campaignId) => {
        setResumingId(campaignId);
        sender.reset();
        await sender.run(campaignId);
        fetchHistory(currentPage.current, { silent: true });
    };

    useEffect(() => {
        const initialFetch = setTimeout(() => fetchHistory(1), 0);
        // Background refresh keeps the current page and does not flash the spinner.
        const refresh = setInterval(() => fetchHistory(currentPage.current, { silent: true }), 10000);
        return () => {
            clearTimeout(initialFetch);
            clearInterval(refresh);
        };
    }, [fetchHistory]);

    const formatDate = (dateStr) => {
        return new Date(dateStr).toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-lg font-semibold text-gray-700">Broadcast History</h2>
                    <p className="text-sm text-gray-600 mt-1">
                        {pagination.total} campaign{pagination.total !== 1 ? 's' : ''}
                    </p>
                </div>
                <select
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-cyan-500"
                >
                    <option value="all">All Types</option>
                    <option value="waitlist">Waitlist</option>
                    <option value="appointment">Appointment</option>
                </select>
            </div>

            {loading ? (
                <div className="text-center py-12 text-gray-500">
                    <svg className="animate-spin h-8 w-8 mx-auto mb-3 bg-cyan-600" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Loading...
                </div>
            ) : messages.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                    <p className="text-lg font-medium">No broadcasts sent yet</p>
                    <p className="text-sm mt-1">Queued campaigns and delivery progress appear here.</p>
                </div>
            ) : (
                <>
                    <div className="space-y-3">
                        {messages.map((msg) => (
                            <div
                                key={msg._id}
                                className="border border-gray-200 rounded-lg overflow-hidden"
                            >
                                {/* Row header */}
                                <button
                                    onClick={() => setExpandedId(expandedId === msg._id ? null : msg._id)}
                                    className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-cyan-30 transition"
                                >
                                    <div className="flex items-center gap-3 min-w-0">
                                        <span
                                            className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium whitespace-nowrap ${
                                                msg.type === 'waitlist'
                                                    ? 'bg-purple-100 text-purple-700'
                                                    : 'bg-cyan-100 bg-cyan-600'
                                            }`}
                                        >
                                            {msg.type === 'waitlist' ? 'Waitlist' : 'Appointment'}
                                        </span>
                                        <span className="text-sm font-medium text-gray-700 truncate">
                                            {msg.subject}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-4 flex-shrink-0 ml-4">
                                        <span className="text-xs text-gray-500 whitespace-nowrap">
                                            {formatDate(msg.createdAt)}
                                        </span>
                                        <div className="flex items-center gap-2 text-xs">
                                            <span className="text-green-600 font-medium">{msg.sentCount} sent</span>
                                            {msg.failedCount > 0 && (
                                                <span className="bg-cyan-600 font-medium">{msg.failedCount} failed</span>
                                            )}
                                            {msg.pendingCount > 0 && (
                                                <span className="text-amber-600 font-medium">{msg.pendingCount} pending</span>
                                            )}
                                        </div>
                                        <svg
                                            className={`w-4 h-4 text-gray-400 transition-transform ${expandedId === msg._id ? 'rotate-180' : ''
                                                }`}
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </button>

                                {/* Expanded details */}
                                {expandedId === msg._id && (
                                    <div className="border-t border-gray-200 px-4 py-4 bg-cyan-30">
                                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4 text-xs text-gray-600">
                                            <div>
                                                <span className="font-medium text-gray-500 block">Sent by</span>
                                                {msg.sentBy}
                                            </div>
                                            <div>
                                                <span className="font-medium text-gray-500 block">Recipients</span>
                                                {msg.totalRecipients}
                                            </div>
                                            <div>
                                                <span className="font-medium text-gray-500 block">Filter</span>
                                                {msg.targetEmail
                                                    ? `Target: ${msg.targetEmail}`
                                                    : msg.statusFilter === 'all'
                                                        ? 'All statuses'
                                                        : msg.statusFilter}
                                            </div>
                                            <div>
                                                <span className="font-medium text-gray-500 block">Type</span>
                                                {msg.type === 'waitlist' ? 'Waitlist' : 'Appointment'}
                                            </div>
                                            <div>
                                                <span className="font-medium text-gray-500 block">Status</span>
                                                {msg.status}
                                            </div>
                                        </div>
                                        {resumingId === msg._id && (
                                            <CampaignProgress
                                                progress={sender.progress}
                                                sending={sender.sending}
                                                waitingUntil={sender.waitingUntil}
                                                error={sender.error}
                                            />
                                        )}
                                        {['pending', 'processing'].includes(msg.status) && msg.pendingCount > 0 && (
                                            <div className="mb-4">
                                                <button
                                                    onClick={() => handleResume(msg._id)}
                                                    disabled={sender.sending}
                                                    className="px-4 py-2 text-sm font-medium text-white bg-cyan-600 rounded-lg hover:bg-cyan-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                                                >
                                                    {sender.sending && resumingId === msg._id ? 'Sending...' : 'Resume sending'}
                                                </button>
                                                <span className="ml-3 text-xs text-gray-500">
                                                    {msg.pendingCount} email(s) not yet delivered.
                                                </span>
                                            </div>
                                        )}
                                        <div>
                                            <span className="font-medium text-gray-500 text-xs block mb-1">Message</span>
                                            <div className="bg-white border border-gray-200 rounded-lg p-3 text-sm text-gray-700 whitespace-pre-wrap max-h-60 overflow-y-auto">
                                                {msg.message}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    {pagination.pages > 1 && (
                        <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
                            <span className="text-sm text-gray-600">
                                Page {pagination.page} of {pagination.pages}
                            </span>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => fetchHistory(pagination.page - 1)}
                                    disabled={pagination.page <= 1}
                                    className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-cyan-30 disabled:opacity-50 disabled:cursor-not-allowed transition"
                                >
                                    Previous
                                </button>
                                <button
                                    onClick={() => fetchHistory(pagination.page + 1)}
                                    disabled={pagination.page >= pagination.pages}
                                    className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-cyan-30 disabled:opacity-50 disabled:cursor-not-allowed transition"
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
