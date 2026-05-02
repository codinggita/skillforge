const BASE_URL = "/api";

async function request(endpoint, options = {}) {
  const token = localStorage.getItem("sf_token");
  const headers = { "Content-Type": "application/json", ...options.headers };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${BASE_URL}${endpoint}`, { ...options, headers });
  const data = await res.json();

  if (!res.ok) {
    const error = new Error(data.message || "Request failed");
    error.status = res.status;
    error.errors = data.errors; // Include validation errors array
    throw error;
  }
  return data;
}

export const authApi = {
  register: (body) =>
    request("/auth/register", { method: "POST", body: JSON.stringify(body) }),
  login: (body) =>
    request("/auth/login", { method: "POST", body: JSON.stringify(body) }),
  me: () => request("/auth/me"),
};

export const projectsApi = {
  list: (params = "") => request(`/projects${params}`),
  getById: (id) => request(`/projects/${id}`),
};

export const analyticsApi = {
  skillScore: () => request("/analytics/skillscore"),
  progress: (limit = 30) => request(`/analytics/progress?limit=${limit}`),
  badges: () => request("/analytics/badges"),
  streak: () => request("/analytics/streak"),
  leaderboard: (filter = "all") =>
    request(`/analytics/leaderboard?filter=${filter}`),
};

export const submissionsApi = {
  create: (body) =>
    request("/submissions", { method: "POST", body: JSON.stringify(body) }),
  mySubmissions: (params = "") => request(`/submissions/me${params}`),
  getOne: (id) => request(`/submissions/${id}`), // alias used in ReviewResult
  getById: (id) => request(`/submissions/${id}`),
  getStatus: (id) => request(`/submissions/${id}/status`),
};
