// validation/loginSchema.js
import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().trim().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  // We'll treat the fake username/password fields as 'email' and 'password'
});

export const signupSchema = z.object({
  email: z.string().trim().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string().min(8, 'Password must be at least 8 characters'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"], // Sets the error on the confirmPassword field
});

export const createProfileSchema = z.object({
  // Assuming "Username" is First Name and "Password" is Last Name based on typical form layout
  fullName: z.string().trim().min(2, 'Full Name is required.'),
  gender: z.enum(['male', 'female'], {
    errorMap: () => ({ message: 'Please select a gender.' }),
  }),
  country: z.string().trim().min(2, 'Country/Region is required.'),
  city: z.string().trim().min(2, 'City is required.'),
  state: z.string().trim().min(2, 'State is required.'),
  pinCode: z.string().trim().regex(/^\d+$/, 'PIN Code must be a number.').min(5, 'PIN Code is required.'),
  streetAddress: z.string().trim().min(3, 'Street address is required.'),
  phone: z.string().trim().regex(/^\d{10,}$/, 'Invalid phone number format.'),

  // File is optional/handled outside the main form data, but we'll include a placeholder validation for the field itself
  profilePicture: z.any().optional(),
});

export const createBussinessSchema = z.object({
  bname: z.string().trim().min(2, 'Full Name is required.'),
  ownerName: z.string().trim().min(2, 'Full Name is required.'),
  country: z.string().trim().min(2, 'Country/Region is required.'),
  state: z.string().trim().min(2, 'State is required.'),
  pinCode: z.string().trim().regex(/^\d+$/, 'PIN Code must be a number.').min(5, 'PIN Code is required.'),
  bAddress: z.string().trim().min(5, 'Street address is required.'),
  phone: z.string().trim().regex(/^\d{10,}$/, 'Invalid phone number format.'),
});

export const createBussiness2Schema = z.object({
  businessDetails: z.string().min(10, "Please enter at least 10 characters."),
  categoryId: z.any().optional(), // ✅ let React handle this
});

export const addProduct = z.object({
  productName: z.string().nonempty("Product name is required"),
  category: z.string().nonempty("Category is required"),
  modelName: z.string().nonempty("Model name is required"),
  brandName: z.string().nonempty("Brand name is required"),
  enterAmount: z.string().nonempty("Enter amount is required"),
  stockQuantity: z.string().nonempty("Stock quantity is required"),
  description: z.string().nonempty("Description is required"),
});