import { toast } from "sonner";

const API_URL = "http://localhost:8080/api";
console.log("API_URL:", API_URL);

const api = {
  baseUrl: API_URL,

  async request(endpoint: string, options: RequestInit = {}) {
    let token = localStorage.getItem("accessToken");
    
    const fullUrl = `${API_URL}${endpoint}`;
    console.log("Fetching:", fullUrl, options.method);
    
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...options.headers,
    };

    if (token) {
      (headers as Record<string, string>).Authorization = `Bearer ${token}`;
    }

    const response = await fetch(fullUrl, {
      ...options,
      headers,
    });

    console.log("Response:", response.status, response.statusText);

    if (response.status === 401) {
      const refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken) {
        try {
          const refreshResult = await fetch(`${API_URL}/auth/refresh`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ refreshToken }),
          });
          
          if (refreshResult.ok) {
            const data = await refreshResult.json();
            localStorage.setItem("accessToken", data.accessToken);
            localStorage.setItem("refreshToken", data.refreshToken);
            token = data.accessToken;
            
            (headers as Record<string, string>).Authorization = `Bearer ${token}`;
            
            const retryResponse = await fetch(fullUrl, {
              ...options,
              headers,
            });
            
            if (!retryResponse.ok) {
              const error = await retryResponse.json().catch(() => ({ message: "Erro na requisição" }));
              throw new Error(error.message || `Erro ${retryResponse.status}`);
            }
            
            return retryResponse.json();
          } else {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            localStorage.removeItem("user");
            window.location.href = "/login";
            throw new Error("Sessão expirada. Faça login novamente.");
          }
        } catch {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          localStorage.removeItem("user");
          window.location.href = "/login";
          throw new Error("Sessão expirada. Faça login novamente.");
        }
      } else {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("user");
        window.location.href = "/login";
        throw new Error("Sessão expirada. Faça login novamente.");
      }
    }

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: "Erro na requisição" }));
      throw new Error(error.message || `Erro ${response.status}`);
    }

    const text = await response.text();
    return text ? JSON.parse(text) : {};
  },

  get(endpoint: string) {
    return this.request(endpoint, { method: "GET" });
  },

  post(endpoint: string, data?: unknown) {
    return this.request(endpoint, {
      method: "POST",
      body: data ? JSON.stringify(data) : undefined,
    });
  },

  put(endpoint: string, data: unknown) {
    return this.request(endpoint, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },

  delete(endpoint: string) {
    return this.request(endpoint, { method: "DELETE" });
  },

  async upload(endpoint: string, file: File, fieldName = "file") {
    const token = localStorage.getItem("accessToken");
    const formData = new FormData();
    formData.append(fieldName, file);

    const response = await fetch(`${API_URL}${endpoint}`, {
      method: "POST",
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: "Upload falhou" }));
      throw new Error(error.message || `Upload falhou: ${response.status}`);
    }

    const text = await response.text();
    return text ? JSON.parse(text) : {};
  },

  classes: {
    getAll() {
      return this.get("/classes");
    },
    getById(id: string) {
      return this.get(`/classes/${id}`);
    },
    create(name: string, description?: string) {
      return this.post("/classes", { name, description });
    },
    addStudent(classId: string, studentId: string) {
      return this.post(`/classes/${classId}/students`, { studentId });
    },
    removeStudent(classId: string, studentId: string) {
      return this.delete(`/classes/${classId}/students/${studentId}`);
    },
  },

  assignments: {
    getAll() {
      return this.get("/assignments");
    },
    getById(id: string) {
      return this.get(`/assignments/${id}`);
    },
    create(data: { title: string; description?: string; classId?: string; dueDate?: string }) {
      return this.post("/assignments", data);
    },
  },

  submissions: {
    getAll() {
      return this.get("/submissions");
    },
    getById(id: string) {
      return this.get(`/submissions/${id}`);
    },
    upload(file: File, assignmentId?: string) {
      return this.upload("/submissions", file, "file");
    },
    analyze(submissionId: string, previousSubmissionId?: string) {
      return this.post(`/submissions/${submissionId}/analyze`, { previousSubmissionId });
    },
    getAnalysis(submissionId: string) {
      return this.get(`/submissions/${submissionId}/analysis`);
    },
  },

  analyses: {
    getAll() {
      return this.get("/analyses");
    },
  },
};

export default api;
export { API_URL };