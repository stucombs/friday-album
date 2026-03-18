'use client';

import { Footer, Home } from '@components';
import axios from 'axios';
import { useState } from 'react';

export default function Subscribe() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (
    e: React.SubmitEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    e.stopPropagation();

    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const { data } = await axios.post('api/subscriptions/add-email', {
        email
      });

      if (data) {
        setSuccess(true);
        setEmail('');
      }
    } catch (err: any) {
      console.error(err);
      setError(err.messsage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <main className="main">
        <Home></Home>
        <h3>SUBSCRIBE</h3>
        <small>Get notified when a new album is picked!</small>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 min-w-[32vw]"
        >
          <input
            type="email"
            placeholder="you@domain.com"
            className="input input-md w-full"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
          />
          <div className="flex justify-center gap-4">
            <div>
              <button
                type="submit"
                className="btn btn-soft btn-success"
                disabled={loading}
              >
                SUBSCRIBE
              </button>
            </div>
            {loading && (
              <span className="loading loading-spinner text-success"></span>
            )}
          </div>
        </form>
        <div>{success && <span>✅ Subscribed successfully</span>}</div>
        {error && <span>❌ {error}</span>}
      </main>
      <Footer></Footer>
    </div>
  );
}
