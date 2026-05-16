const port = Number(process.env.PORT || 3000)
const corsOrigin = process.env.CORS_ORIGIN || 'http://localhost:5173'

export const config = { port, corsOrigin }
