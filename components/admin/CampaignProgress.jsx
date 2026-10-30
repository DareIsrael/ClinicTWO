'use client';

/** Progress bar + summary for a campaign being delivered. */
export default function CampaignProgress({ progress, sending, waitingUntil, error, notice }) {
    if (!progress && !error && !notice) return null;

    const total = progress?.totalRecipients || 0;
    const sent = progress?.sentCount || 0;
    const failed = progress?.failedCount || 0;
    const done = sent + failed;
    const percent = total ? Math.round((done / total) * 100) : 0;

    let headline = '';
    if (progress) {
        if (progress.done) {
            headline = failed > 0
                ? `Finished: ${sent} of ${total} email(s) sent, ${failed} failed.`
                : `All done: ${sent} email(s) sent successfully.`;
        } else if (sending) {
            headline = waitingUntil
                ? `Waiting to retry ${progress.waitingForRetry} email(s)… (${sent} of ${total} sent)`
                : `Sending… ${sent} of ${total} sent. Please keep this page open.`;
        } else {
            headline = `Paused: ${sent} of ${total} sent, ${progress.pendingCount} still pending.`;
        }
    }

    const tone = error || notice
        ? 'bg-amber-50 border-amber-200 text-amber-800'
        : progress?.done && failed === 0
            ? 'bg-green-50 border-green-200 text-green-800'
            : progress?.done
                ? 'bg-amber-50 border-amber-200 text-amber-800'
                : 'bg-cyan-50 border-cyan-200 text-cyan-800';

    return (
        <div className={`mb-6 border px-4 py-3 rounded-lg ${tone}`}>
            {headline && <p className="font-medium text-sm">{headline}</p>}
            {progress && (
                <div className="mt-2 h-2 w-full bg-white rounded-full overflow-hidden border border-gray-200">
                    <div
                        className={`h-full transition-all ${failed > 0 ? 'bg-amber-500' : 'bg-green-500'}`}
                        style={{ width: `${percent}%` }}
                    />
                </div>
            )}
            {notice && <p className="text-sm mt-2">{notice}</p>}
            {error && <p className="text-sm mt-2">{error}</p>}
            {progress?.done && progress.failures?.length > 0 && (
                <details className="mt-2 text-xs">
                    <summary className="cursor-pointer">Show failed addresses</summary>
                    <ul className="mt-1 space-y-0.5">
                        {progress.failures.map((f) => (
                            <li key={f.email}>
                                <span className="font-medium">{f.email}</span>: {f.error}
                            </li>
                        ))}
                    </ul>
                </details>
            )}
        </div>
    );
}

