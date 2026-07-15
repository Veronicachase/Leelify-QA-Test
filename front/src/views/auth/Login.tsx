import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";

import conejoCelebrando from "../../assets/mascota/conejo-celebrando.png";
import eyeIcon from "../../assets/icons/eye-icon.svg";

import "./login.css";
import "../../index.css";

export const LoginPage = () => {
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await login(email, password);
      console.log("Sesión iniciada");
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      alert("Error al iniciar sesión. Por favor, verifica tus credenciales.");
    }
  };

  return (
    <div className="login-page">
      <motion.div
        className="login-container"
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <motion.div
          className="div-encabezado"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <motion.img
            className="bunny-celebrando"
            src={conejoCelebrando}
            alt="Conejo celebrando"
            animate={{ y: [0, -6, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <h1>Iniciar sesión</h1>
        </motion.div>

        <motion.form
          className="login-form"
          onSubmit={handleSubmit}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.5 }}
        >
          <motion.input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            whileFocus={{ scale: 1.02 }}
            required
          />

          <div className="password-wrapper">
            <motion.input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Introduce tu contraseña"
              whileFocus={{ scale: 1.02 }}
              required
            />

            <span className="eye-icon">
              <img src={eyeIcon} alt="Mostrar contraseña" />
            </span>
          </div>

          <motion.button
            className="submit-button"
            type="submit"
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Iniciar sesión
          </motion.button>
        </motion.form>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45, duration: 0.5 }}
        >
          <p className="small">
            ¿Olvidaste tu contraseña? <a href="/forgot-password">Restablecer</a>
          </p>

          <p className="small">
            ¿No tienes una cuenta? <a href="/register">Registrarse</a>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
