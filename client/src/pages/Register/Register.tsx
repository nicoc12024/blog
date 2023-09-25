import { Link } from "react-router-dom";
import { useRegister } from "./useRegister";

export const Register = () => {
  const { inputs, handleChange, handleRegister, error } = useRegister();

  return (
    <div className="auth">
      <h1>Register</h1>
      <form>
        <input
          required
          type="text"
          placeholder="username"
          name="username"
          onChange={handleChange}
          value={inputs.username}
        />
        <input
          required
          type="email"
          placeholder="email"
          name="email"
          onChange={handleChange}
          value={inputs.email}
        />
        <input
          required
          type="password"
          placeholder="password"
          name="password"
          onChange={handleChange}
          value={inputs.password}
        />
        <button onClick={handleRegister}>Register Now</button>
        {error && <p>{error}</p>}
        <span>
          Do you have an account? <Link to="/login">Login</Link>
        </span>
      </form>
    </div>
  );
};
