import * as z from "zod"
import { calculateAge } from "./utils"

export const registerSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(255, 'Name must be less than 255 characters'),
  username: z.string()
    .min(2, 'Username must be at least 2 characters')
    .max(10, 'Username must be less than 10 characters'),
  password: z.string()
    .min(5, 'Password must be at least 5 characters')
    .regex(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character')
    .regex(/\d/, 'Password must contain at least one number')
    .regex(/[a-zA-Z]/, 'Password must contain at least one letter'),
  confirmPassword: z.string(),
  dateOfBirth: z.date({
    message: "Date of birth is required",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
}).refine((data) => {
  const age = calculateAge(data.dateOfBirth)
  return age >= 18
}, {
  message: "You must be at least 18 years old",
  path: ["dateOfBirth"],
})

export type RegisterInput = z.infer<typeof registerSchema>