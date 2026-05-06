import "dotenv/config";
import { defineConfig } from "prisma/config";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: process.env["DATABASE_URL"],
  },
  adapter: () =>
    new PrismaMariaDb({
      host: process.env.DB_HOST ?? "localhost",
      port: Number(process.env.DB_PORT ?? 3306),
      user: process.env.DB_USER ?? "root",
      password: process.env.DB_PASSWORD ?? "",
      database: process.env.DB_NAME ?? "doctorapp",
      connectionLimit: 5,
    }),
});
