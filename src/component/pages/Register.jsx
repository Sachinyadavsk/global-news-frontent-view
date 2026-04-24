import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../shared/api/axios.jsx";
import { useAuth } from "../../shared/context/AuthContext.jsx";
import { LogIn, LogInIcon, Menu, PlusIcon } from "lucide-react";

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  // Handle Input Change
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Handle Registration
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.email || !form.password) {
      return setError("All fields are required");
    }

    try {
      setLoading(true);

      const res = await API.post("/users/register", form);

      // 🔥 Redirect based on role
      if (res.data.success) {
        navigate("/login");
      } else {
        navigate("/register");
      }

    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 className=" flex items-center gap-2 text-2xl font-bold text-gray-600 mb-5"><PlusIcon /> Register</h2>

        {error && <p style={styles.error}>{error}</p>}
        <label htmlFor="">Name</label>
        <input
          type="text"
          name="name"
          placeholder="Enter name"
          value={form.name}
          onChange={handleChange}
          style={styles.input}
        />
        <label htmlFor="">Email</label>
        <input
          type="email"
          name="email"
          placeholder="Enter email"
          value={form.email}
          onChange={handleChange}
          style={styles.input}
        />
        <label htmlFor="">Password</label>
        <input
          type="password"
          name="password"
          placeholder="Enter password"
          value={form.password}
          onChange={handleChange}
          style={styles.input}
        />

        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
         <p>Have an account? <a href="/login" className="cursor-pointer text-blue-400">Login here</a></p>
      </form>
    </div>
  );
};

export default Register;

// 🎨 Simple Styles
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "70vh",
    background: "#f4f4f4",
  },
  form: {
    background: "#fff",
    padding: "30px",
    borderRadius: "8px",
    width: "400px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
  },
  input: {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
  },
  button: {
    width: "100%",
    padding: "10px",
    background: "#007bff",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  },
  error: {
    color: "red",
    fontSize: "14px",
  },
};