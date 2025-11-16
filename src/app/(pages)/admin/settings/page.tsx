'use client';

import { Footer, Home, NoAccess } from '@app/components';
import { getSettings, setSettings } from '@lib/services';
import Link from 'next/link';
import { SessionProvider } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

const initialState = {
  theme: 'default'
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

function Settings() {
  const { data: session, status } = useSession();
  const [formData, setFormData] = useState(initialState);
  const [updatedAt, setUpdatedAt] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const loadSettings = async () => {
      setLoading(true);
      try {
        const result = await getSettings();
        if (result) {
          setFormData(result.value);
          setUpdatedAt(result.created_at);
        }
      } catch (err: any) {
        console.error(err.message);
        setError(true);
      }

      setLoading(false);
    };

    loadSettings();
  }, [success]);

  const handleFormSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    e.stopPropagation();

    setLoading(true);

    try {
      await setSettings(formData);
      setError(false);
      setSuccess(true);
    } catch (err: any) {
      console.error(err.message);
      setSuccess(false);
      setError(true);
    }

    setLoading(false);
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

  if (status === 'unauthenticated') return <NoAccess></NoAccess>;

  if (status === 'authenticated') {
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
            className="flex flex-col gap-4 w-full"
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
            <div className="flex justify-center">
              <button
                type="submit"
                className="btn btn-soft btn-success"
                disabled={loading}
              >
                Save Settings{' '}
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
        <Footer></Footer>
      </div>
    );
  }
}

export default function AuthWrapper() {
  return (
    <SessionProvider>
      <Settings />
    </SessionProvider>
  );
}
