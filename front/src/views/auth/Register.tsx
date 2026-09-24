import { useState, type SubmitEvent } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import conejoCelebrando from "../../assets/mascota/conejo-celebrando.png";
import "./login-register.css";
import { eyeIcon } from "../../assets/icons/ui";
import { useAuth } from "../../context/AuthContext";
import { validateRegister } from "../../utils/validateRegister";

export const RegisterPage = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [grade, setGrade] = useState<number>(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoading) {
      return;
    }

    try {
      validateRegister(name, email, password, confirmPassword, grade);
      setIsLoading(true);
      await register(email, name, password, grade);

      navigate("/login");
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert(
          "No se pudo registrar el usuario. Por favor, inténtalo de nuevo.",
        );
      }
      console.error("Error al registrar el usuario:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="main-container">
        <h1 className="log-reg-title">Regístrate para guardar tu progreso</h1>
        <motion.div
          className="wrapper"
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
          </motion.div>

          <motion.form
            className="form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35, duration: 0.5 }}
          >
            <motion.input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nombre"
              whileFocus={{ scale: 1.02 }}
              required
              maxLength={100}
            />

            <motion.input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              whileFocus={{ scale: 1.02 }}
              required
              maxLength={250}
            />
            <motion.div className="password-wrapper">
              <motion.input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Contraseña"
                whileFocus={{ scale: 1.02 }}
                required
                minLength={8}
                maxLength={128}
              />

              <span className="eye-icon">
                <img src={eyeIcon} alt="Mostrar contraseña" />
              </span>
            </motion.div>

            <motion.div className="password-wrapper">
              <motion.input
                id="confirmPassword"
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirmar contraseña"
                whileFocus={{ scale: 1.02 }}
                required
                minLength={8}
                maxLength={128}
              />

              <button
                className="eye-icon"
                type="button"
                onClick={() => setShowPassword((anterior) => !anterior)}
              >
                <img src={eyeIcon} alt="Mostrar contraseña" />
              </button>
            </motion.div>
            <motion.div className="grade-wrapper">
              <label htmlFor="grade">Grado escolar</label>
              <motion.select
                id="grade"
                value={grade}
                onChange={(e) => {
                  const selectedGrade = Number(e.target.value);
                  if (
                    !isNaN(selectedGrade) &&
                    selectedGrade >= 1 &&
                    selectedGrade <= 12
                  ) {
                    setGrade(selectedGrade);
                  }
                }}
                whileFocus={{ scale: 1.02 }}
                required
              >
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
                <option value={6}>6</option>
                <option value={7}>7</option>
                <option value={8}>8</option>
                <option value={9}>9</option>
                <option value={10}>10</option>
                <option value={11}>11</option>
                <option value={12}>12</option>
              </motion.select>
            </motion.div>

            <motion.button
              className="submit-button"
              type="submit"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 300 }}
              disabled={isLoading}
            >
              {isLoading ? "Creando cuenta..." : "Crear cuenta"}
            </motion.button>
          </motion.form>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45, duration: 0.5 }}
          >
            <p className="small">
              ¿Ya tienes una cuenta? <a href="/login">Inicia sesión</a>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
};
