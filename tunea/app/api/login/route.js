import { connectToDB } from "@/app/lib/mongodb";
import User from "@/app/models/user";
import bcrypt from "bcryptjs";

export async function POST(request) {
    const { email, password } = await request.json();

    try {
        await connectToDB();

        const user = await User.findOne({ email });
        if (!user) {
            return Response.json({ error: "User not found" }, { status: 404 });
        }

        const isPassValid = await bcrypt.compare(password, user.password);
        if (!isPassValid) {
            return Response.json({ error: "Invalid password" }, { status: 401 });
        }

        return Response.json({ message: "Login successful" }, { status: 200 });
    }
    catch (error) {
        console.error("Error logging in:", error);
        return Response.json({ error: "An error occurred while logging in." }, { status: 500 });
    }
}