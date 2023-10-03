import { authOptions } from "@/app/lib/auth";
import NextAuth from "next-auth/next";

export default NextAuth(authOptions)