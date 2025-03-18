import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

const Unsubscribe = () => {
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [isValid, setIsValid] = useState(false);
  const [isUnsubscribed, setIsUnsubscribed] = useState(false);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState(null);
  const [reason, setReason] = useState('');

  useEffect(() => {
    const verifyToken = async () => {
      const emailParam = searchParams.get('email');
      const token = searchParams.get('token');

      if (!emailParam || !token) {
        setIsLoading(false);
        setError('Invalid unsubscribe link. Please check your email for the correct link.');
        return;
      }

      try {
        const response = await fetch(`${API_URL}/api/verify-unsubscribe`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: emailParam, token }),
        });
        const data = await response.json();

        if (response.ok) {
          setEmail(emailParam);
          setIsValid(true);
        } else {
          setError(data.error || 'Invalid or expired unsubscribe link.');
        }
      } catch {
        setError('Failed to verify unsubscribe link. Please try again later.');
      }
      setIsLoading(false);
    };
    verifyToken();
  }, [searchParams]);

  const handleUnsubscribe = async () => {
    setIsLoading(true);
    const emailParam = searchParams.get('email');
    const token = searchParams.get('token');
  
    try {
      const response = await fetch(`${API_URL}/api/verify-unsubscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailParam, token, reason }),
      });
  
      if (response.ok) {
        const data = await response.json();
        setIsUnsubscribed(true);
        console.log('Unsubscribed successfully, reason:', reason);
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to unsubscribe. Please try again later.');
      }
    } catch (error) {
      console.error('Error during unsubscribe:', error);
      setError('Failed to unsubscribe. Please try again later.');
    }
    setIsLoading(false);
  };  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="max-w-md w-full p-6 bg-white shadow-xl rounded-xl text-center">
        {isLoading ? (
          <>
            <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full mx-auto"></div>
            <p className="mt-4 text-gray-600">Processing your request...</p>
          </>
        ) : error ? (
          <>
            <h2 className="text-xl font-semibold text-red-600">Error</h2>
            <p className="text-gray-600 mt-2">{error}</p>
          </>
        ) : isUnsubscribed ? (
          <>
            <h2 className="text-xl font-semibold text-green-600">Successfully Unsubscribed</h2>
            <p className="text-gray-600 mt-2">You have been unsubscribed from our newsletter.</p>
          </>
        ) : (
          <>
            <h2 className="text-xl font-semibold text-gray-800">Unsubscribe from Newsletter</h2>
            <p className="text-gray-600 mt-2">Are you sure you want to unsubscribe <span className="font-medium">{email}</span>?</p>
            <textarea
              className="w-full mt-4 p-3 border rounded-md focus:ring focus:ring-blue-300"
              rows={3}
              placeholder="Tell us why (optional)"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
            <button
              className="w-full mt-4 bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition"
              onClick={handleUnsubscribe}
            >
              Confirm Unsubscribe
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Unsubscribe;