import { useEffect, useState } from "react";
import axios from "axios";
import axiosInstance from "../validation/cookieValidation";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate=useNavigate("");

    const handleLogout = async () => {
        try {
            const response = await axios.post("/api/logout", {}, { withCredentials: true });

            if (response.status === 200) {
                alert("Logout Successful");
                navigate("/login");  // Redirect to login page after logout
            }
        } catch (error) {
            console.error("Error logging out:", error);
            alert("Error logging out. Please try again.");
        }
    };

    useEffect(() => {
        (async () => {
            try {
                const response = await axiosInstance.get("/api/profile");

                if (response.data.success) {
                    setUser(response.data); // Store name & email
                } else {
                    setError("Failed to fetch profile");
                }
            } catch (err) {
                setError(err.response?.data?.message || "Error fetching profile");
            } finally {
                setLoading(false); // Stop loading
            }
        })(); // 👈 IIFE is invoked immediately

    }, []);

    if (loading) return <h2>Loading...</h2>;
    if (error) return <h2 style={{ color: "red" }}>{error}</h2>;

    return (
        <div>
            <h1>Welcome, {user.name}!</h1>
            <p>Email: {user.email}</p>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Profile;
