export default class {
  constructor(apiUrl, endpoint, secondEndpoint) {
    this.apiUrl = apiUrl;
    this.endpoint = endpoint;
    this.secondEndpoint = secondEndpoint;
  }

  async get(id, params = [], token) {
    const url = new URL(`${this.apiUrl}${this.endpoint}${id ? `/${id}` : ''}${this.secondEndpoint ? `${this.secondEndpoint}` : ''}`);
    params.forEach(o => Object.keys(o).forEach(key => url.searchParams.append(key, o[key])));
    const res = await fetch(url, {
      method: 'get',
      headers: {
        Authorization: token,
      }
    });
    if (res.ok) return res.json();
    return res;
  }

  async logout() {
    const url = new URL(`${this.apiUrl}${this.endpoint}`);
    const res = await fetch(url);
    return res;
  }

  async register({ name, email, password }) {
    const res = fetch(`${this.apiUrl}${this.endpoint}`, {
      method: 'post',
      headers: {
        'Content-Type': ' application/x-www-form-urlencoded',
      },
      body: new URLSearchParams(`name=${name}&email=${email}&password=${password}`),
    });
    return res;
  }

  async add(resource, id, token) {
    const res = fetch(`${this.apiUrl}${this.endpoint}/${id || ''}${this.secondEndpoint || ''}`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify(resource),
    });
    return res;
  }

  async login({ email, password }) {
    const res = fetch(`${this.apiUrl}${this.endpoint}`, {
      method: 'post',
      headers: {
        'Content-Type': ' application/x-www-form-urlencoded',
      },
      body: new URLSearchParams(`email=${email}&password=${password}`),
    });
    return res;
  }

  async update(id, resource, token) {
    const res = await fetch(`${this.apiUrl}${this.endpoint}/${id}`, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify(resource),
    });
    return res.json();
  }

  async delete(id, secondId, token) {
    const res = fetch(`${this.apiUrl}${this.endpoint}/${id}${this.secondEndpoint ? `${this.secondEndpoint}/${secondId}` : ''}`, {
      method: 'delete',
      headers: {
        Authorization: token
      }
    });
    return res;
  }
}
