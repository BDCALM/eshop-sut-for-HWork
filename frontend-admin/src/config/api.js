const apiUrl = import.meta.env.VITE_API_URL?.trim();

if (!apiUrl) {
  throw new Error(
    "VITE_API_URL is not configured. Create frontend-admin/.env.local before starting the admin app.",
  );
}

export const API_URL = apiUrl.replace(/\/+$/, "");
