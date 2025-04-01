'use client';

import { useStorage } from '@/lib/helpers/manage-store';
import { useEffect, useState, useCallback } from 'react';

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { getAccessToken, setAccessToken, removeAccessToken } = useStorage();
  const [refreshTimeout, setRefreshTimeout] = useState<NodeJS.Timeout | null>(
    null
  );

  // removed scheduleTokenRefresh useCallback to avoid circular dependency

  const fetchRefreshToken = useCallback(async () => {
    try {
      const response = await fetch('/api/auth/get-refresh-token', {
        method: 'GET',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('No refresh token available');
      }

      const data = await response.json();
      return data.refresh_token;
    } catch (error) {
      console.warn('Error fetching refresh token:', error);
      return null;
    }
  }, []);

  const refreshAuthToken: () => Promise<void> = useCallback(async () => {
    if (refreshTimeout) clearTimeout(refreshTimeout);
    const timeout = setTimeout(
      () => {
        refreshAuthToken();
      },
      55 * 60 * 1000
    );
    setRefreshTimeout(timeout);

    const refreshToken = await fetchRefreshToken();

    if (!refreshToken) return;

    try {
      const response = await fetch('/api/auth/refresh-access-token', {
        method: 'GET',
        credentials: 'include',
      });

      if (!response.ok) throw new Error('Failed to refresh token');

      const data = await response.json();
      console.log('New access token:', data.access_token);

      setAccessToken(data.access_token, { expires: 1 });
    } catch (error) {
      console.error('Auth refresh failed:', error);
      removeAccessToken();
    }
  }, [fetchRefreshToken, setAccessToken, removeAccessToken, refreshTimeout]);

  useEffect(() => {
    const accessToken = getAccessToken();

    if (!accessToken) {
      refreshAuthToken();
    } else {
      const timeout = setTimeout(
        () => {
          refreshAuthToken();
        },
        55 * 60 * 1000
      );
      setRefreshTimeout(timeout);
    }

    return () => {
      if (refreshTimeout) clearTimeout(refreshTimeout);
    };
  }, [getAccessToken, refreshAuthToken, refreshTimeout]);

  return <>{children}</>;
};

export default AuthProvider;
