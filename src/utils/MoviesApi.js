const BASE_URL = 'https://api.nomoreparties.co/beatfilm-movies';

const fetchHandle = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(res.json());
};

export function getMovies() {
  return fetch(`${BASE_URL}`, {
    method: 'GET',    
  })
    .then(fetchHandle);    
}
