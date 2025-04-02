export async function getUser() {
    try {
      const response = await fetch('/api/user', {
        method: 'GET',
      });
  
      const data = await response.json();
      console.log(data);
      if (!response.ok) {
        throw new Error(data.message || 'User not found');
      }
      return data;
    } catch (error) {
      throw error;
    }
  }
  