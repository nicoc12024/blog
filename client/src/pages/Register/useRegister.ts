import { useState, useContext } from "react";
import { makeRequest } from "../../axiosBaseUrl";
import { AxiosError } from "axios";
import { AuthContext } from "../../context/authContext";
import { useNavigate } from "react-router-dom";

interface IInputs {
  username: string;
  email: string;
  password: string;
}

export const useRegister = () => {
  const [inputs, setInputs] = useState<IInputs>({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState<string>("");
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const isValidEmail = (email: string) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRegister = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!isValidEmail(inputs.email)) {
      setError("Invalid email format");
      return;
    }

    try {
      const res = await makeRequest.post("/auth/register", inputs);
      if (auth) {
        const { login } = auth;
        if (res.status === 201) {
          await login({ username: inputs.username, password: inputs.password });
          navigate("/");
        }
      }
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        setError(err.response?.data);
      }
    }
  };

  return { inputs, handleChange, handleRegister, error };
};
