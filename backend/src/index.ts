import { Hono } from 'hono'
import { userRouter } from './routes/user'
import { courseRouter } from './routes/course'
import { cors } from 'hono/cors'

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string
    JWT_SECRET: string
  }
}>()

// app.use('/*', cors({
//   origin: '*', // Allow requests from any origin, you can change this to a specific domain
//   allowMethods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow GET, POST, PUT, and DELETE methods
//   allowHeaders: ['Content-Type', 'Authorization'], // Add any headers you need
//   credentials: true, // Allow credentials if needed
// }));
app.use('/*', cors());
app.route("api/v1/user", userRouter);
app.route("api/v1/addcourses", courseRouter);

export default app
