import { config } from "dotenv"

config({ debug: true })

export const ENV = {
    PORT: process.env.PORT
    
}