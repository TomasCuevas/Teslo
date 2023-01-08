import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";

export const verifyAdmin = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const session: any = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!session) {
    return res.status(401).json({
      message: "Necesitas una sesion activa.",
    });
  }

  const { role } = session.user as { role: string };
  if (role !== "admin") {
    return res.status(404).json({
      message: "Solo los administradores tienen acceso.",
    });
  }
};
