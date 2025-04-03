import { getAccessToken } from '@/app/api/token';

export async function loginUser(email: string, password: string) {
  const token = await getAccessToken();
  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      // headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.detail || 'Login failed');
    }

    return data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
}

export async function logoutUser() {
  try {
    const response = await fetch('/api/auth/logout', {
      method: 'POST',
    });

    const data = await response.json();
    console.log(data);
    if (!response.ok) {
      throw new Error(data.message || 'Logout failed');
    }
    return data;
  } catch (error) {
    throw error;
  }
}

   
export async function createOrg(orgData: {
  name: string;
  currency_code: string;
  business_type: string;
  locations: {
    country: string;
    state: string;
    full_address: string;
  }[];
}) {
  const token = await getAccessToken();

  try {
    const response = await fetch('/api/organization/create', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(orgData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        `${data.message}: ${
          data.error?.detail || 'Organization creation failed'
        }`
      );
    }

    return data;
  } catch (error) {
    console.error('Organization creation error:', error);
    throw error;
  }
}

export const uploadImage = async (file: File, id: string) => {
  const token = await getAccessToken();
  const url = `https://api.timbu.cloud/users/image/?user_id=${id}`;  
  const formData = new FormData();
  formData.append("file", file);

  for (const pair of formData.entries()) {
    console.log(pair[0], pair[1]);
  }

  try {
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
console.log(response,'sffsdfdfdfsdfs')
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    console.log(data,response)
    console.log("Upload successful:", data);
    return data;
  } catch (error) {
    console.error("Upload failed:", error);
  }
};


