import { connectToDB } from "@/app/lib/mongodb";
import User from "@/app/models/user";
import bcrypt from "bcryptjs";

export async function POST(request) {
    const { name, email, password } = await request.json();

    try {
        await connectToDB();
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return Response.json({ error: "User already exists" }, { status: 400 });
        }

        const hashedPass = await bcrypt.hash(password, 10);
        const newUser = new User({
            name,
            email,
            password: hashedPass
        });

        await newUser.save();   // save new user to the db
        return Response.json({ message: "User created successfully" }, { status: 201 });
    }
    catch(error) {
        return Response.json({ error: "Failed to create user" }, { status: 500 });
    }
}