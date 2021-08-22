const BASE_URL = 'https://api.calorifer75.nomoredomains.club';

const fetchHandle = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(res.json());
};

export function getUserInfo() {
  const token = localStorage.getItem('token');

  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      authorization: `Bearer ${token}`,
    },
  }).then(fetchHandle);
}

export function setUserInfo(name, email) {
  const token = localStorage.getItem('token');
  
  return fetch(`${BASE_URL}/users/me`, {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, email }),
  }).then(fetchHandle);
}

export function saveMovie(movie) {
  const token = localStorage.getItem('token');
  
  return fetch(`${BASE_URL}/movies`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(movie),
  }).then(fetchHandle);
}

export function getSavedMovies() {
  const token = localStorage.getItem('token');
  
  return fetch(`${BASE_URL}/movies`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(fetchHandle);
}
