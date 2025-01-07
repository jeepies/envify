import { z } from "zod";

export const baseSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string(),
});

export const loginSchema = baseSchema.extend({
  rememberMe: z.boolean().default(false),
});

export const registerSchema = baseSchema
  .extend({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number"),
    confirmPassword: z.string(),
    acceptTOS: z.boolean().refine((val) => val, {
      message: "You must read and agree to our Terms of Service.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type LoginForm = z.infer<typeof loginSchema>;
export type RegisterForm = z.infer<typeof registerSchema>;
