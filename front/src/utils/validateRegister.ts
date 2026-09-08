export const validateRegister = (
  name: string,
  email: string,
  password: string,
  confirmPassword: string,
  grade: number,
) => {
  if (name.trim() === "" || name.length > 100) {
    throw new Error(
      "El nombre no puede  estar vacío o tener más de 100 caracteres",
    );
  }

  if (email === "" || email.length > 250) {
    throw new Error(
      "El email no puede estar vacío o tener más de 250 caracteres",
    );
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error("El email no es válido");
  }
  if (password.length < 8 || password.length > 128) {
    throw new Error("La contraseña debe tener entre 8 y 128 caracteres");
  }
  if (password !== confirmPassword) {
    throw new Error("Las contraseñas no coinciden");
  }
  if (!Number.isInteger(grade) || grade < 1 || grade > 12) {
    throw new Error(
      "El grado escolar es obligatorio y debe ser un número entre 1 y 12",
    );
  }
};
