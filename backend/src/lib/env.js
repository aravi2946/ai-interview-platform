import { config } from "dotenv"

config()

export const ENV = {
    PORT: process.env.PORT,
    DB_URL: process.env.DB_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    CLIENT_URL:process.env.CLIENT_URL
}