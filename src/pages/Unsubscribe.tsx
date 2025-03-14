import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

interface UnsubscribeState {
  isLoading: boolean;
  isValid: boolean;
  isUnsubscribed: boolean;
  error: string | null;
  email: string | null;
}

const Unsubscribe = () => {
  const [searchParams] = useSearchParams();
  const [state, setState] = useState<UnsubscribeState>({
    isLoading: true,
    isValid: false,
    isUnsubscribed: false,
    error: null,
    email: null,
  });
  const [reason, setReason] = useState<string>('');

  useEffect(() => {
    const verifyToken = async () => {
      const email = searchParams.get('email');
      const token = searchParams.get('token');

      if (!email || !token) {
        setState(prev => ({
          ...prev,
          isLoading: false,
          error: 'Invalid unsubscribe link. Please check your email for the correct link.',
        }));
        return;
      }

      try {
        const response = await fetch(
          `/api/verify-unsubscribe?email=${encodeURIComponent(email)}&token=${encodeURIComponent(token)}`
        );
        const data = await response.json();

        if (data.isValid) {
          setState(prev => ({
            ...prev,
            isLoading: false,
            isValid: true,
            email,
          }));
        } else {
          setState(prev => ({
            ...prev,
            isLoading: false,
            error: 'Invalid or expired unsubscribe link.',
          }));
        }
      } catch (error) {
        setState(prev => ({
          ...prev,
          isLoading: false,
          error: 'Failed to verify unsubscribe link. Please try again later.',
        }));
      }
    };

    verifyToken();
  }, [searchParams]);

  const handleUnsubscribe = async () => {
    const email = searchParams.get('email');
    const token = searchParams.get('token');

    try {
      setState(prev => ({ ...prev, isLoading: true }));
      
      const response = await fetch('/api/unsubscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          token,
          reason: reason.trim() || 'Not specified',
        }),
      });

      if (response.ok) {
        setState(prev => ({
          ...prev,
          isLoading: false,
          isUnsubscribed: true,
        }));
      } else {
        const data = await response.json();
        setState(prev => ({
          ...prev,
          isLoading: false,
          error: data.error || 'Failed to unsubscribe. Please try again later.',
        }));
      }
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: 'Failed to unsubscribe. Please try again later.',
      }));
    }
  };

  if (state.isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-700 mx-auto"></div>
          <p className="mt-4 text-gray-600">Processing your request...</p>
        </div>
      </div>
    );
  }

  if (state.error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full p-8 bg-white shadow-lg rounded-lg text-center">
          <div className="text-red-600 mb-4">
            <svg className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Error</h2>
          <p className="text-gray-600">{state.error}</p>
        </div>
      </div>
    );
  }

  if (state.isUnsubscribed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full p-8 bg-white shadow-lg rounded-lg text-center">
          <div className="text-green-600 mb-4">
            <svg className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Successfully Unsubscribed</h2>
          <p className="text-gray-600 mb-6">
            You have been successfully unsubscribed from our newsletter. We're sorry to see you go!
          </p>
          <p className="text-gray-500 text-sm">
            If you change your mind, you can always subscribe again from our website.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Unsubscribe from Newsletter</h2>
        <div className="mb-6">
          <p className="text-gray-600 mb-4">
            Are you sure you want to unsubscribe <span className="font-medium">{state.email}</span> from our newsletter?
          </p>
          <div className="mb-4">
            <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-2">
              Would you mind telling us why you're leaving? (Optional)
            </label>
            <textarea
              id="reason"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-500"
              rows={3}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Your feedback helps us improve..."
            />
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <button
            onClick={handleUnsubscribe}
            className="w-full bg-amber-600 text-white py-2 px-4 rounded-md hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 transition-colors"
          >
            Confirm Unsubscribe
          </button>
          <a
            href="/"
            className="text-center text-sm text-gray-600 hover:text-amber-600 transition-colors"
          >
            Return to Homepage
          </a>
        </div>
      </div>
    </div>
  );
};

export default Unsubscribe; 