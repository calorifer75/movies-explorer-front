const BASE_URL = "https://api.calorifer75.nomoredomains.club";

const fetchHandle = (res) => {
  if (res.ok) {
    return res.json();    
  }
  return Promise.reject(res.json());
};

// Логин пользователя
export const login = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password, email }),
  })
    .then(fetchHandle);
};

// Регистрация пользователя
export const register = (email, password, name) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password, email, name }),
  })
    .then(fetchHandle);
};

// Проверка токена
export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then(fetchHandle);
};
