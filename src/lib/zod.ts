import { z } from "zod";

export const userServerSchema = z
  .object({
    username: z
      .string({ required_error: "Username is required" })
      .min(3, "Username must be at least 3 characters")
      .max(25, "Username must be less than 25 characters"),
    email: z
      .string({ required_error: "Email is required" })
      .min(3, "Email must be at least 3 characters")
      .email("Invalid email"),
    firstName: z
      .string({ required_error: "First name is required" })
      .min(2, "First name must be at least 2 characters")
      .max(55, "First name must not exceed 55 characters"),
    lastName: z
      .string({ required_error: "Last name is required" })
      .min(2, "Last name must be at least 2 characters")
      .max(55, "Last name must not exceed 55 characters"),
    password: z
      .string({ required_error: "Password is required" })
      .min(6, "Password must be at least 6 characters"),
  })
  .strict();

export const signInFormSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().trim().min(6, "Password must be at least 6 characters"),
});

export const registerFormSchema = z
  .object({
    username: z
      .string({ required_error: "Username is required" })
      .trim()
      .min(2, "Username must be at least 2 characters")
      .max(55, "Username must not exceed 55 characters"),
    email: z.string().trim().email(),
    firstName: z
      .string()
      .trim()
      .min(2, "First name must be at least 2 characters")
      .max(55, "First name must not exceed 55 characters"),
    lastName: z
      .string()
      .trim()
      .min(2, "Last name must be at least 2 characters")
      .max(55, "Last name must not exceed 55 characters"),
    password: z
      .string()
      .trim()
      .min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().trim(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });
export const portfolioSchema = z
  .object({
    userId: z.string({ required_error: "User ID is required" }),
    description: z.string({ required_error: "Description is required" }),
    coverImageLink: z.string({
      required_error: "Cover image link is required",
    }),
  })
  .strict();

export const updatePortfolioSchema = z
  .object({
    description: z.string().optional(),
    coverImageLink: z.string().optional(),
  })
  .strict();
