"use server";

import { revalidatePath } from "next/cache";
import { Post, User } from "./models";
import { connectToDB } from "./utils";
import { signIn, signOut } from "./auth";
import { FormState } from "./types";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";

export const addPost = async (prevState: FormState | undefined, formData: FormData): Promise<FormState> => {

    const { title, desc, slug, img, userId } = Object.fromEntries(formData);

    try {
        connectToDB();

        const newPost = new Post({
            title,
            desc,
            slug,
            img,
            userId
        });

        await newPost.save();

        console.log("Post added successfully to db!");
        revalidatePath("/blog?success=true");
        revalidatePath("/admin");

        return { success: true };
    } catch (error) {
        console.error("Error adding post:", error);
        return { error: "Failed to add post" };
    }

    // console.log("Hello from the server!", title, desc, slug, Number(userId));
}

export const addUser = async (prevState: FormState | undefined, formData: FormData): Promise<FormState> => {

    const { username, email, password, img, isAdmin } = Object.fromEntries(formData);

    try {
        connectToDB();

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password as string, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            img,
            isAdmin: isAdmin === "true",
        });

        await newUser.save();

        console.log("User added successfully to db!");
        revalidatePath("/admin");

        return { success: true };
    } catch (error) {
        console.error("Error adding user:", error);
        return { error: "Failed to add user" };
    }

    // console.log("Hello from the server!", title, desc, slug, Number(userId));
}

export const deletePost = async (formData: FormData) => {

    const { id } = Object.fromEntries(formData);

    try {
        connectToDB();

        await Post.findByIdAndDelete(id);

        console.log("Post deleted successfully from db!");
        revalidatePath("/blog");
        revalidatePath("/admin");
    } catch (error) {
        console.error("Error deleting post:", error);
    }

    // console.log("Hello from the server!", title, desc, slug, Number(userId));
}

export const deleteUser = async (formData: FormData) => {

    const { id } = Object.fromEntries(formData);

    try {
        connectToDB();

        // Delete user's posts first to maintain referential integrity
        await Post.deleteMany({ userId: id });

        await User.findByIdAndDelete(id);

        console.log("User deleted successfully from db!");
        revalidatePath("/admin");
    } catch (error) {
        console.error("Error deleting user:", error);
    }

    // console.log("Hello from the server!", title, desc, slug, Number(userId));
}

export const handleGithubLogin = async () => {

    await signIn('github', { redirectTo: '/' })
}

export const handleGoogleLogin = async () => {

    await signIn('google', { redirectTo: '/' })
}

export const handleLogout = async () => {

    await signOut({ redirectTo: '/' })
}

export const register = async (previousState: FormState | undefined, formData: FormData): Promise<FormState> => {
    const { username, email, password, img, passwordRepeat } =
        Object.fromEntries(formData);

    if (password !== passwordRepeat) {
        return { error: "Passwords do not match" };
    }

    try {
        connectToDB();

        const user = await User.findOne({ username });

        if (user) {
            return { error: "Username already exists" };
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password as string, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            img,
        });

        await newUser.save();
        console.log("saved to db", newUser);

        return { success: true };
    } catch (err) {
        console.log(err);
        return { error: "Something went wrong!" };
    }
};

export const login = async (prevState: FormState | undefined, formData: FormData): Promise<FormState> => {
    const { username, password } = Object.fromEntries(formData);

    try {
        await signIn("credentials", { username, password });

        return { success: true };
    } catch (err) {
        console.log(err);

        // Type-safe error handling
        if (err instanceof Error) {
            if (err.message.includes("CredentialsSignin")) {
                return { error: "Invalid username or password" };
            }
            return { error: err.message };
        }

        // return { error: "Something went wrong!" };
        throw err; // Re-throw the error if it's not an instance of Error
    }
};

export const sendContactEmail = async (
    prevState: FormState | undefined,
    formData: FormData
): Promise<FormState> => {
    const { name, email, phone, message } = Object.fromEntries(formData);

    // Validation
    if (!name || !email || !message) {
        return {
            error: "Name, email, and message are required",
            timestamp: Date.now()
        };
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email as string)) {
        return { error: "Please enter a valid email address", timestamp: Date.now() };
    }

    try {
        // Create transporter
        const transporter = nodemailer.createTransport({
            service: "gmail", // or 'smtp.gmail.com'
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD,
            },
        });

        // Email options
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_TO || process.env.EMAIL_USER,
            subject: `New Contact Form Submission from ${name}`,
            html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
            replyTo: email as string,
        };

        // Send email
        await transporter.sendMail(mailOptions);

        console.log("Email sent successfully");
        return { success: true, timestamp: Date.now() };
    } catch (error) {
        console.error("Error sending email:", error);
        return { error: "Failed to send message. Please try again later.", timestamp: Date.now() };
    }
};