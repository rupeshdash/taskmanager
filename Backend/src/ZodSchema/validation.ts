import {z} from 'zod'

export const SignupSchema = z.object({
  name:z.string().max(20),
  email:z.string().email(),
  password:z.string().min(5)
})