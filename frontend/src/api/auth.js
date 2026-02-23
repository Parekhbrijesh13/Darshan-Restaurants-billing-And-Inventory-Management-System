export async function login(username, password) {
  const res = await fetch('http://localhost:8081/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: username,
      password: password
    })
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || 'Login failed');
  }

  const data = await res.json();

  // Save JWT token and username
  localStorage.setItem('isAuthenticated', 'true');
  localStorage.setItem('userEmail', username);
  localStorage.setItem('token', data.token);

  return data;
}
