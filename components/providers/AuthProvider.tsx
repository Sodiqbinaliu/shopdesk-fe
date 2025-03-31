"use client";

import { useStorage } from "@/lib/helpers/manage-store";
import { useEffect, useState } from "react";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { getAccessToken, setAccessToken, removeAccessToken } = useStorage();
  const [refreshTimeout, setRefreshTimeout] = useState<NodeJS.Timeout | null>(
    null
  );

  const fetchRefreshToken = async () => {
    try {
      const response = await fetch("/api/auth/get-refresh-token", {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("No refresh token available");
      }

      const data = await response.json();
      return data.refresh_token;
    } catch (error) {
      console.warn("Error fetching refresh token:", error);
      return null;
    }
  };

  const refreshAuthToken = async () => {
    const refreshToken = await fetchRefreshToken();

    if (!refreshToken) return;

    try {
      const response = await fetch("/api/auth/refresh-access-token", {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) throw new Error("Failed to refresh token");

      const data = await response.json();
      console.log("New access token:", data.access_token);

      setAccessToken(data.access_token, { expires: 1 });

      scheduleTokenRefresh(55 * 60 * 1000);
    } catch (error) {
      console.error("Auth refresh failed:", error);
      removeAccessToken();
    }
  };

  const scheduleTokenRefresh = (delay: number) => {
    if (refreshTimeout) clearTimeout(refreshTimeout);

    const timeout = setTimeout(refreshAuthToken, delay);
    setRefreshTimeout(timeout);
  };

  useEffect(() => {
    const accessToken = getAccessToken();

    if (!accessToken) {
      refreshAuthToken();
    } else {
      scheduleTokenRefresh(55 * 60 * 1000);
    }

    return () => {
      if (refreshTimeout) clearTimeout(refreshTimeout);
    };
  }, []);

  return <>{children}</>;
};

export default AuthProvider;
