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
export const projectSchema = z
  .object({
    userId: z.string({ required_error: "User ID is required" }),
    projectName: z.string({ required_error: "Project name is required" }),
    description: z.string({ required_error: "Description is required" }),
    githubUrl: z.string().optional(),
    demoUrl: z.string().optional(),
    images: z.array(z.string()),
    tags: z.array(z.string()),
  })
  .strict();

export const updateProjectSchema = z
  .object({
    projectName: z.string().optional(),
    description: z.string().optional(),
  })
  .strict();

export const changePasswordSchema = z
  .object({
    oldPassword: z
      .string({ required_error: "Old password is required" })
      .min(6, "Old Password must be at least 6 characters"),
    newPassword: z
      .string({ required_error: "New password is required" })
      .min(6, "New password must be at least 6 characters"),
  })
  .strict();
export const uploadImagesSchema = z.array(
  z
    .object({
      projectId: z.string({ required_error: "Project ID is required" }).trim(),
      url: z.string({ required_error: "Image URL is required" }).trim(),
    })
    .strict()
);

export const imageObjectSchema = z
  .object({
    projectId: z.string({ required_error: "Project ID is required" }).trim(),
    url: z.string({ required_error: "Image URL is required" }).trim(),
  })
  .strict();

export const uploadProjectSchema = z.object({
  projectName: z
    .string({ required_error: "Project name is required" })
    .trim()
    .min(2, "Project name must be at least 2 characters")
    .max(55, "Project name must not exceed 55 characters"),
  tags: z.array(z.string()).nonempty("At least one tag is required"),
  githubUrl: z.string().optional(),
  demoUrl: z.string().optional(),
  description: z
    .string({ required_error: "Project description is required" })
    .trim()
    .min(2, "Project description must be at least 5 characters")
    .max(1500, "Project description must not exceed 1500 characters"),
  images:
    typeof window === "undefined"
      ? z.any({ required_error: "An image is required" })
      : z
          .instanceof(FileList, { message: "Add at least one image" })
          .optional(),
});

export const geminiConversationSchema = z.object({
  content: z.string({ required_error: "Conversation content is required" }),
});

export const generalFormSchema = z.object({
  username: z.string({ required_error: "Username is required" }),
  email: z.string({ required_error: "Email is required" }).email(),
});

export const editDetailsSchema = z.object({
  firstName: z
    .string()
    .min(2, "First name should be at least 2 characters")
    .max(255)
    .trim()
    .optional(),
  lastName: z
    .string()
    .min(2, "Last name should be at least 2 characters")
    .max(255)
    .trim()
    .optional(),
  isAvailableForWork: z.boolean(),
  links: z.array(z.string()),
  bio: z.string().max(255).trim().optional(),
});

export const updateWorkSchema = z.boolean();

export const searchProjectSchema = z.object({
  tags: z.array(z.string()),
});
