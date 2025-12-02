const BASE_URL = "http://localhost:3000";

// --- login ---
export async function login(email, password) {
    const res = await fetch(`${BASE_URL}/api/user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
    });
    if (!res.ok) throw new Error("Login failed");
    return res.json();
}

// --- register ---
export async function register(username, email, password) {
    const res = await fetch(`${BASE_URL}/api/user`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
    });
    if (!res.ok) throw new Error("Registration failed");
    return res.json();
}

// --- refresh token ---
export async function refreshAccessToken() {
    const res = await fetch(`${BASE_URL}/api/user/refresh-token`, {
        method: "POST",
        credentials: "include",
    });

    if (!res.ok) throw new Error("Refresh failed");

    return res.json();
}

export async function logout() {
    await fetch(`${BASE_URL}/api/user/logout`, {
        method: "POST",
        credentials: "include",
    });
}
