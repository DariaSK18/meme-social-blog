// --- decode JWT ---
export function parseJwt(token) {
    try {
        return JSON.parse(atob(token.split(".")[1]));
    } catch (err) {
        console.error("parseJwt failed:", err);
        return null;
    }
}