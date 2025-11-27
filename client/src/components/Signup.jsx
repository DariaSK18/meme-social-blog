import { useState } from "react";


// Signup component for user registration with error message display
function Signup() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState("");

    //function when submitted
    const handleSubmit = async (e) => {
        e.preventDefault();

        //checks empty stil needs validatetion for current email, password and username
        if (!username || !email || !password) {
            setError("Please fill in all fields.");
            return;
        }

        setError(""); // Clear previous errors
        console.log("Submitting:", { username, email, password });

    };
    return (
        <div>
            {/* placeholder logo */}
            <h2>Create Account</h2>

            <form onSubmit={handleSubmit}>
                <label>Username:</label>  {/* username input field */}
                <input
                    type="text"
                    placeholder="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <label>Email:</label>  {/* email input field */}
                <input
                    type="email"
                    placeholder="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />  
                <label>Password:</label>  {/* password input field */}
                <input
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Sign Up</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>} {/* display error message */}
        </div>
    );
}
export default Signup;