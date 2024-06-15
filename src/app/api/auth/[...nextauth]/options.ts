import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs"
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import Email from "next-auth/providers/email";

export const authOptions = {
    providers: [
        CredentialsProvider({
            id: 'credentials',
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'text' },
                password: { label: "password", type: 'password' }
            },
            async authorize(credentials: any): Promise<any> {
                await dbConnect();

                try {
                    const user = await UserModel.findOne({
                        $or: [
                            { email: credentials.identifier },
                            { username: credentials.identifier }
                        ]
                    });
                    if (!user) {
                        throw new Error('No user found with this email');
                    }
                    if (!user.isVerified) {
                        throw new Error("please verify your account before logging in");
                    }
                    const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);
                    if (isPasswordCorrect) {
                        return user;
                    } else {
                        throw new Error("Password is incorrect");
                    }
                } catch (err: any) {
                    throw new Error(err);
                }
            }
        })
    ]
}