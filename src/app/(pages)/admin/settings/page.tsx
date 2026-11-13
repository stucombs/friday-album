'use client';

import { Home } from '@app/components';
import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const initialState = {
  theme: 'default',
  message: ''
};

const themes = [
  {
    key: 'holiday',
    name: 'Holiday'
  },
  {
    key: 'new_year',
    name: 'New Years'
  }
];

export default function Settings() {
  const [formData, setFormData] = useState(initialState);
  const [updatedAt, setUpdatedAt] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const loadSettings = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get('/api/settings');
        if (data) {
          setFormData((prev) => ({
            ...prev,
            ...data.value
          }));
          setUpdatedAt(data.created_at);
        }
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    loadSettings();
  }, [success]);

  const handleFormSubmit = async (
    e: React.SubmitEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    e.stopPropagation();

    setLoading(true);
    try {
      await axios.post('/api/settings', formData);
      setError(false);
      setSuccess(true);
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const displayTimeStamp = (): string => {
    const d = new Date(updatedAt);

    return d.toLocaleString();
  };

  return (
    <div className="page">
      <main className="main">
        <Home></Home>
        <Link href="/admin">RETURN TO ADMIN</Link>
        <h3>SITE SETTINGS</h3>
        {updatedAt && (
          <span className="text-sm">Last Updated {displayTimeStamp()}</span>
        )}
        <form
          onSubmit={handleFormSubmit}
          className="flex flex-col gap-2 w-full"
        >
          <fieldset className="fieldset border-base-100 rounded-box w-xs border p-4">
            <label className="label">Site Theme</label>
            <select
              value={formData.theme}
              className="select"
              onChange={handleChange}
              id="theme"
              name="theme"
              disabled={loading}
            >
              <option value="default">Default</option>
              {themes.map((theme) => (
                <option value={theme.key} key={theme.key}>
                  {theme.name}
                </option>
              ))}
            </select>
          </fieldset>
          <fieldset className="fieldset border-base-100 rounded-box w-xs border p-4">
            <label className="label">Weekly message</label>
            <input
              type="text"
              className="input input-md w-full"
              name="message"
              id="message"
              value={formData.message}
              onChange={handleChange}
              disabled={loading}
              maxLength={32}
            />
          </fieldset>
          <div className="flex justify-center">
            <button
              type="submit"
              className="btn btn-soft btn-success"
              disabled={loading}
            >
              SAVE SETTINGS
              {loading && (
                <span className="loading loading-spinner text-success"></span>
              )}
            </button>
          </div>
        </form>
        {success && (
          <div role="alert" className="alert alert-success">
            <span>✅ Settings saved</span>
          </div>
        )}
        {error && (
          <div role="alert" className="alert alert-error">
            <span>❌ An error occurred saving settings</span>
          </div>
        )}
      </main>
    </div>
  );
}
