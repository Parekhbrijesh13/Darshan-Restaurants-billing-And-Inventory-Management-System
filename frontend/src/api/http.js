const BASE_URL = 'http://localhost:8081/api';

export async function apiFetch(endpoint, options = {}) {
  const res = await fetch(BASE_URL + endpoint, {
    method: options.method || 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {})
    },
    body: options.body ? JSON.stringify(options.body) : null
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || 'Request failed');
  }

  return res.json();
}
