'use client';
import { useState, useEffect } from 'react';
import { dashboardService } from '@/services/dashboardService';

export default function TeaserTab() {
  const [teasers, setTeasers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [editingTeaser, setEditingTeaser] = useState(null);

  const [formData, setFormData] = useState({
    headline: '',
    message: '',
    buttonText: '',
    buttonLink: '',
    isPublished: false,
  });

  const resetForm = () => {
    setFormData({
      headline: '',
      message: '',
      buttonText: '',
      buttonLink: '',
      isPublished: false,
    });
    setIsCreating(false);
    setEditingTeaser(null);
  };

  const fetchTeasers = async () => {
    try {
      setLoading(true);
      const response = await dashboardService.getTeasers(true);
      if (response.success) {
        setTeasers(response.teasers || []);
      }
    } catch (err) {
      console.error('Error fetching teasers:', err);
      setError('Failed to load teasers');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    try {
      if (editingTeaser) {
        const response = await dashboardService.updateTeaser(editingTeaser._id, formData);
        if (response.success) {
          setSuccessMessage('Teaser updated successfully');
          await fetchTeasers();
          resetForm();
        } else {
          setError(response.message || 'Failed to update teaser');
        }
      } else {
        const response = await dashboardService.createTeaser(formData);
        if (response.success) {
          setSuccessMessage('Teaser created successfully');
          await fetchTeasers();
          resetForm();
        } else {
          setError(response.message || 'Failed to create teaser');
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save teaser');
      console.error('Error saving teaser:', err);
    }
  };

  const handleEdit = (teaser) => {
    setEditingTeaser(teaser);
    setFormData({
      headline: teaser.headline || '',
      message: teaser.message || '',
      buttonText: teaser.buttonText || '',
      buttonLink: teaser.buttonLink || '',
      isPublished: teaser.isPublished || false,
    });
    setIsCreating(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this teaser?')) return;

    try {
      const response = await dashboardService.deleteTeaser(id);
      if (response.success) {
        setSuccessMessage('Teaser deleted successfully');
        await fetchTeasers();
      } else {
        alert(response.message || 'Failed to delete teaser');
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete teaser');
      console.error('Error deleting teaser:', err);
    }
  };

  const handleTogglePublish = async (teaser) => {
    try {
      const response = await dashboardService.updateTeaser(teaser._id, {
        isPublished: !teaser.isPublished,
      });
      if (response.success) {
        setSuccessMessage(
          teaser.isPublished ? 'Teaser unpublished' : 'Teaser published'
        );
        await fetchTeasers();
      } else {
        setError(response.message || 'Failed to update teaser status');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update teaser status');
      console.error('Error toggling publish:', err);
    }
  };

  useEffect(() => {
    fetchTeasers();
  }, []);

  // Auto-clear messages after 4 seconds
  useEffect(() => {
    if (successMessage || error) {
      const timer = setTimeout(() => {
        setSuccessMessage('');
        setError('');
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [successMessage, error]);

  const publishedTeaser = teasers.find((t) => t.isPublished);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-700">Teaser Announcement</h2>
          <p className="text-sm text-gray-600 mt-1">
            Manage the promotional teaser banner on the public website
          </p>
        </div>
        {!isCreating && !editingTeaser && (
          <button
            onClick={() => {
              resetForm();
              setIsCreating(true);
            }}
            className="border border-cyan-600 bg-cyan-600 px-4 py-2 rounded-lg text-sm hover:bg-cyan-30 transition duration-300"
          >
            + New Teaser
          </button>
        )}
      </div>

      {/* Messages */}
      {error && (
        <div className="mb-4 bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}
      {successMessage && (
        <div className="mb-4 bg-green-50 border border-green-300 text-green-700 px-4 py-3 rounded-lg">
          {successMessage}
        </div>
      )}

      {/* Currently Published Teaser Preview */}
      {publishedTeaser && !isCreating && !editingTeaser && (
        <div className="mb-6 border-2 border-cyan-200 rounded-lg overflow-hidden">
          <div className="bg-cyan-50 px-4 py-2 border-b border-cyan-200">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-sm font-semibold text-cyan-800">
                Currently Published — Live on Website
              </span>
            </div>
          </div>
          <div className="p-5 bg-gradient-to-r from-cyan-600 to-teal-600 text-white">
            <h3 className="text-xl font-bold mb-2">{publishedTeaser.headline}</h3>
            <p className="text-cyan-100 text-sm mb-3">{publishedTeaser.message}</p>
            {publishedTeaser.buttonText && (
              <span className="inline-block bg-white text-cyan-700 px-4 py-1.5 rounded-full text-sm font-semibold">
                {publishedTeaser.buttonText}
              </span>
            )}
          </div>
        </div>
      )}

      {/* Create / Edit Form */}
      {(isCreating || editingTeaser) && (
        <div className="mb-6 bg-gray-50 p-5 rounded-lg border border-gray-200">
          <h3 className="font-semibold text-gray-700 mb-4">
            {editingTeaser ? 'Edit Teaser' : 'Create New Teaser'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Headline *
              </label>
              <input
                type="text"
                value={formData.headline}
                onChange={(e) =>
                  setFormData({ ...formData, headline: e.target.value })
                }
                placeholder='e.g. "New Family Physician Starting This September!"'
                className="w-full text-gray-700 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                required
                maxLength={200}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Message *
              </label>
              <textarea
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                placeholder='e.g. "Join the waitlist today to be among the first to book an appointment."'
                className="w-full px-3 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                rows="3"
                required
                maxLength={500}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Button Text (Optional)
                </label>
                <input
                  type="text"
                  value={formData.buttonText}
                  onChange={(e) =>
                    setFormData({ ...formData, buttonText: e.target.value })
                  }
                  placeholder='e.g. "Join the Waitlist"'
                  className="w-full text-gray-700 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                  maxLength={100}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Button Link (Optional)
                </label>
                <input
                  type="text"
                  value={formData.buttonLink}
                  onChange={(e) =>
                    setFormData({ ...formData, buttonLink: e.target.value })
                  }
                  placeholder='e.g. "/waitlist" or "https://..."'
                  className="w-full text-gray-700 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                  maxLength={500}
                />
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="isPublished"
                checked={formData.isPublished}
                onChange={(e) =>
                  setFormData({ ...formData, isPublished: e.target.checked })
                }
                className="h-4 w-4 text-cyan-600 focus:ring-cyan-500 border-gray-300 rounded"
              />
              <label htmlFor="isPublished" className="ml-2 text-sm text-gray-700">
                Publish immediately (visible on website)
              </label>
            </div>

            {formData.isPublished && publishedTeaser && !editingTeaser && (
              <div className="bg-amber-50 border border-amber-300 text-amber-800 px-4 py-3 rounded-lg text-sm">
                ⚠️ Publishing this teaser will automatically unpublish the currently active teaser.
              </div>
            )}

            {formData.isPublished && editingTeaser && !editingTeaser.isPublished && (
              <div className="bg-amber-50 border border-amber-300 text-amber-800 px-4 py-3 rounded-lg text-sm">
                ⚠️ Publishing this teaser will automatically unpublish any other active teaser.
              </div>
            )}

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={resetForm}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-cyan-600 rounded-lg hover:bg-cyan-700 transition duration-200 disabled:opacity-50"
              >
                {editingTeaser ? 'Update Teaser' : 'Create Teaser'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Teaser List */}
      {loading ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading teasers...</p>
        </div>
      ) : (
        <div className="space-y-4">
          {teasers.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No teasers yet. Create one to display a promotional banner on the website.
            </div>
          ) : (
            teasers.map((teaser) => (
              <div
                key={teaser._id}
                className={`border rounded-lg p-4 ${
                  teaser.isPublished
                    ? 'border-green-300 bg-green-50'
                    : 'border-gray-200'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="font-semibold text-gray-700">
                        {teaser.headline}
                      </h3>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          teaser.isPublished
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {teaser.isPublished ? '● Published' : 'Unpublished'}
                      </span>
                    </div>

                    <p className="text-gray-600 text-sm mb-2">{teaser.message}</p>

                    {teaser.buttonText && (
                      <p className="text-xs text-gray-500 mb-2">
                        Button: &quot;{teaser.buttonText}&quot;
                        {teaser.buttonLink && (
                          <span> → {teaser.buttonLink}</span>
                        )}
                      </p>
                    )}

                    <div className="flex items-center text-xs text-gray-500 space-x-4">
                      <span>
                        Created:{' '}
                        {new Date(teaser.createdAt).toLocaleDateString()}
                      </span>
                      <span>
                        By: {teaser.createdBy?.firstName || 'Admin'}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 ml-4">
                    {/* Publish/Unpublish toggle */}
                    <button
                      onClick={() => handleTogglePublish(teaser)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-lg transition duration-200 ${
                        teaser.isPublished
                          ? 'bg-amber-100 text-amber-700 hover:bg-amber-200'
                          : 'bg-green-100 text-green-700 hover:bg-green-200'
                      }`}
                      title={teaser.isPublished ? 'Unpublish' : 'Publish'}
                    >
                      {teaser.isPublished ? 'Unpublish' : 'Publish'}
                    </button>
                    {/* Edit */}
                    <button
                      onClick={() => handleEdit(teaser)}
                      className="text-gray-500 hover:text-cyan-700"
                      title="Edit"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                    </button>
                    {/* Delete */}
                    <button
                      onClick={() => handleDelete(teaser._id)}
                      className="text-gray-500 hover:text-red-600"
                      title="Delete"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
