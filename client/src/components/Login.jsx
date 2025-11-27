import {usestate } from 'react';

// Login component for user authenticatin with error messeg display
function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState("");

    //function when submitted
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        //check if fields are empty
        if (!email || !password) {
            setError("Please fill in all fields.");
            return;
        }   

        try {  //API call to backend for login
            const response = await fetch("http://localhost:5000/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" }, //sending json data
                body: JSON.stringify({ email, password }), //sending email and password
            });
            
            // parse response
            const data = await response.json();

            //not ok response
            if (!response.ok) {
                setError(data.message || "Login failed. Please try again.");
                else {
                    console.log("Login successful:", data);
                    // Handle successful login 

            }
        } catch {
            setError("server error. Please try again later.");
        }
    };

    return (
        <div>
            {"logo"}
            <div>
                <h1>Login</h1>
                <p>(logo)   </p>
            </div>

            <form onSubmit={handleSubmit}>
                <label>Email:</label>  //email input field
                <input
                    type="email"
                    placeholder="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <label>Password:</label>  //password input field
                <input
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button type="submit">Login</button>  //submit button

            </form>
            <p>Forgotten password</p> //forgot password link needs to be done not sure yet

        </div>
    );
}
export default Login;
