import { PrismaClient } from "@prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

const createPrismaClient = () => {
  const adapter = new PrismaMariaDb({
    host: process.env.DB_HOST ?? "localhost",
    port: Number(process.env.DB_PORT ?? 3306),
    user: process.env.DB_USER ?? "root",
    password: process.env.DB_PASSWORD ?? "",
    database: process.env.DB_NAME ?? "doctorapp",
    connectionLimit: 5,
  });

  return new PrismaClient({ adapter });
};

declare global {
  var prisma: undefined | ReturnType<typeof createPrismaClient>;
}

const prisma = globalThis.prisma ?? createPrismaClient();

export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;
