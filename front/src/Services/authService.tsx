export const login = async (email: string, password: string) => {
  try {
    const response = await fetch("http://localhost:8080/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
      throw new Error("Login failed");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

export const register = async (
  email: string,
  name: string,
  password: string,
  grade: number,
) => {
  try {
    const response = await fetch("http://localhost:8080/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        name,
        password,
        role: "user",
        grade,
      }),
    });

    if (!response.ok) {
      throw new Error("Error al registrar el usuario");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al registrar el usuario:", error);
    throw error;
  }
};

export const resetPassword = async (email: string, newPassword: string) => {
  try {
    const response = await fetch("http://localhost:8080/reset-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, newPassword }),
    });
    if (!response.ok) {
      throw new Error("Password reset failed");
    }
    const data = await response.json();
    console.log("Password reset successful:", data);
    return data;
  } catch (error) {
    console.error("Error resetting password:", error);
    throw error;
  }
};
