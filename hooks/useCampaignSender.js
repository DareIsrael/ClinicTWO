'use client';
import { useState, useRef, useEffect, useCallback } from 'react';
import { dashboardService } from '@/services/dashboardService';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
// If the next retry is further away than this, stop and let the admin resume later.
const MAX_WAIT_MS = 6 * 60 * 1000;

/**
 * Drives delivery of a queued campaign from the browser: it keeps asking the
 * server to "send the next chunk" until every recipient is sent or failed.
 */
export function useCampaignSender() {
    const [progress, setProgress] = useState(null);
    const [sending, setSending] = useState(false);
    const [waitingUntil, setWaitingUntil] = useState(null);
    const [error, setError] = useState('');
    const stopped = useRef(false);

    // Stop the loop if the component unmounts.
    useEffect(() => {
        stopped.current = false;
        return () => {
            stopped.current = true;
        };
    }, []);

    // Warn before closing the tab while emails are still going out.
    useEffect(() => {
        if (!sending) return;
        const handler = (e) => {
            e.preventDefault();
            e.returnValue = '';
        };
        window.addEventListener('beforeunload', handler);
        return () => window.removeEventListener('beforeunload', handler);
    }, [sending]);

    const run = useCallback(async (campaignId) => {
        setSending(true);
        setError('');
        setWaitingUntil(null);
        let consecutiveErrors = 0;
        let latest = null;

        try {
            while (!stopped.current) {
                try {
                    const res = await dashboardService.sendCampaignChunk(campaignId);
                    consecutiveErrors = 0;
                    latest = res.progress;
                    setProgress(res.progress);
                    setWaitingUntil(null);
                    if (res.progress.done) break;

                    if (res.processed === 0) {
                        // Nothing ready right now — remaining emails are waiting to be retried
                        // (or are being sent by another open tab).
                        const nextRetry = res.progress.nextRetryAt ? new Date(res.progress.nextRetryAt).getTime() : null;
                        const waitMs = nextRetry ? Math.max(nextRetry - Date.now() + 1000, 2000) : 5000;
                        if (waitMs > MAX_WAIT_MS) {
                            setError('Some emails are waiting to be retried later. Use "Resume sending" in Broadcast History.');
                            break;
                        }
                        setWaitingUntil(nextRetry);
                        await sleep(waitMs);
                    }
                } catch (err) {
                    const status = err.response?.status;
                    const message = err.response?.data?.message;
                    if (status && status < 500) {
                        setError(message || 'Could not send emails.');
                        break;
                    }
                    consecutiveErrors += 1;
                    if (consecutiveErrors >= 3) {
                        setError(
                            (message || 'Connection problem while sending.') +
                            ' Emails already sent are saved — use "Resume sending" in Broadcast History to continue.'
                        );
                        break;
                    }
                    await sleep(3000 * consecutiveErrors);
                }
            }
        } finally {
            setSending(false);
            setWaitingUntil(null);
        }
        return latest;
    }, []);

    const reset = useCallback(() => {
        setProgress(null);
        setError('');
    }, []);

    return { run, reset, progress, sending, waitingUntil, error };
}

