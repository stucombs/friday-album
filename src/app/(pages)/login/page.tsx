'use client';

import { Home, Loader } from '@app/components';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({ password: '' });
  const router = useRouter();

  const onLogin = async (e: React.SubmitEvent): Promise<void> => {
    e.preventDefault();
    e.stopPropagation();

    try {
      setError('');
      setLoading(true);
      const { data } = await axios.post('/api/auth/login', {
        password: formData.password
      });

      if (data && data.login) {
        router.push('/admin');
      }
    } catch (err: any) {
      switch (err.response.status) {
        case 401:
          setError('Invalid password');
          break;
        default:
          setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <main className="main">
        <Home></Home>
        <h3>ADMIN LOGIN</h3>
        <form onSubmit={onLogin} className="flex flex-col items-center gap-6">
          <input
            type="password"
            placeholder="Enter..."
            className="input input-lg"
            id="password"
            name="password"
            value={formData.password}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                password: e.target.value
              }))
            }
            disabled={loading}
            required
          />
          <button
            type="submit"
            className="btn btn-soft btn-success"
            disabled={loading}
          >
            LOGIN
          </button>
        </form>
        {error && (
          <div role="alert" className="alert alert-error">
            <span>{error}</span>
          </div>
        )}
        {loading && <Loader></Loader>}
      </main>
    </div>
  );
}
