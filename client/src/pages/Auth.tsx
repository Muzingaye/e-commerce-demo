import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../Components/AuthContext";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

type AuthMode = "signup" | "login";

export default function Auth() {
  const [mode, setMode] = useState<AuthMode>("signup");
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const { signUp, login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const authMutation = useMutation({
    mutationFn: async (data: any) => {
      if (mode === "signup") {
        return await signUp(data.username, data.email, data.password);
      } else {
        return await login(data.username, data.password);
      }
    },
    onSuccess: (res) => {
      if (res.success) {
        navigate("/");
      } else {
        setError(res.error);
      }
    },
    onError: () => {
      setError("Something went wrong");
    },
  });

  function onSubmit(data: any) {
    setError(null);
    authMutation.mutate(data);
  }
  return (
    <div className="page">
      <div className="container">
        <div className="auth-container">
          <h1 className="page-title">
            {mode === "signup" ? "Sign Up" : "Login"}
          </h1>

          <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
            {error && <div className="error-message">{error}</div>}

            <div className="form-group">
              <label className="form-label" htmlFor="username">
                Username
              </label>
              <input
                className="form-input"
                type="text"
                id="username"
                {...register("username", { required: "Username is required" })}
              />
              {errors.username && (
                <span className="form-error">{errors.username.message}</span>
              )}
            </div>
            {mode === "signup" ? (
              <div className="form-group">
                <label className="form-label" htmlFor="email">
                  Email
                </label>
                <input
                  className="form-input"
                  type="email"
                  id="email"
                  {...register("email", { required: "Email is required" })}
                />
                {errors.email && (
                  <span className="form-error">{errors.email.message}</span>
                )}
              </div>
            ) : (
              ""
            )}

            <div className="form-group">
              <label className="form-label" htmlFor="password">
                Password
              </label>
              <input
                className="form-input"
                type="password"
                id="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                  maxLength: {
                    value: 12,
                    message: "Password must be less than 12 characters",
                  },
                })}
              />
              {errors.password && (
                <span className="form-error">{errors.password.message}</span>
              )}
            </div>

            <button type="submit" className="btn btn-primary ">
              {mode === "signup" ? "Sign Up" : "Login"}
            </button>
          </form>

          <div className="auth-switch">
            {mode === "signup" ? (
              <p>
                Already have an account?{" "}
                <span className="auth-link" onClick={() => setMode("login")}>
                  Login
                </span>
              </p>
            ) : (
              <p>
                Don't have an account?{" "}
                <span className="auth-link" onClick={() => setMode("signup")}>
                  Sign Up
                </span>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
