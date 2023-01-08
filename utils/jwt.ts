import jwt from "jsonwebtoken";

export const signToken = (id: string, email: string) => {
  if (!process.env.JWT_SECRET_SEED) {
    throw new Error("No hay semilla de JWT. Revisar variables de entorno.");
  }

  return jwt.sign({ id, email }, process.env.JWT_SECRET_SEED, {
    expiresIn: "1d",
  });
};

export const isValidToken = (token: string): Promise<string> => {
  if (!process.env.JWT_SECRET_SEED) {
    throw new Error("No hay semilla de JWT. Revisar variables de entorno.");
  }

  return new Promise((resolve, reject) => {
    try {
      jwt.verify(token, process.env.JWT_SECRET_SEED!, (err, payload) => {
        if (err) return reject("JWT no es valido.");

        const { id } = payload as { id: string };
        resolve(id);
      });
    } catch (error) {
      reject("JWT no es valido.");
    }
  });
};
