import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";
import { client } from "../redis/client.js";

export const register = async (req, res) => {
    try {
        const {
            name,
            gender,
            dob,
            phoneno,
            password,
            crops
        } = req.body;

        //Validators
        if (password.length < 6) {
            return res.status(400).json({ error: "Password should be atleast 6 characters long" });
        }
        if (phoneno.length !== 10) {
            return res.status(400).json({ error: "Enter a valid Phone no." });
        }
        if (name.length < 2) {
            return res.status(400).json({ error: "Name should be atleast 2 characters long" });
        }
        if (crops.length < 1) {
            return res.status(400).json({ error: "Atleast one crop has to be specified" });
        }

        const user = await User.findOne({ phoneno });
        if (user) {
            return res.status(400).json({ error: "A user with this phone no. already exists. Use another phone no., or try logging into your account" });
        }

        const salt = await bcrypt.genSalt(12);
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({
            name,
            gender,
            dob,
            phoneno,
            password: passwordHash,
            crops
        })

        if (newUser) {
            await newUser.save();
            const token = generateTokenAndSetCookie(newUser._id, res);
            const payload = {
                token: token,
                _id: newUser._id,
                name: newUser.name,
                password: newUser.password,
                gender: newUser.gender,
                dob: newUser.dob,
                phoneno: newUser.phoneno,
                crops: newUser.crops
            }

            await client.set("user", JSON.stringify(payload));
            await client.expire("user", 30 * 24 * 60 * 60);

            res.status(201).json({
                _id: newUser._id,
                name: newUser.name,
                gender: newUser.gender,
                dob: newUser.dob,
                phoneno: newUser.phoneno,
                crops: newUser.crops
            });
        } else {
            res.status(400).json({ error: "Invalid user data" });
        }
    } catch (err) {
        console.log("Error in Signing up", err.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const login = async (req, res) => {
    try {
        const { phoneno, password } = req.body;
        const user = await User.findOne({ phoneno });
        if (!user) {
            return res.status(400).json({ error: "Cannot find User" });
        }

        const isPaswordCorrect = await bcrypt.compare(password, user.password || "");
        if (!isPaswordCorrect) {
            return res.status(400).json({ error: "Invalid Login Credentials" });
        }

        res.cookie("jwt", "", { maxAge: 0 });
        const token = generateTokenAndSetCookie(user._id, res);
        const payload = {
            token: token,
            _id: user._id,
            name: user.name,
            password: user.password,
            gender: user.gender,
            dob: user.dob,
            phoneno: user.phoneno,
            crops: user.crops
        }

        await client.set("user", JSON.stringify(payload));
        await client.expire("user", 30 * 24 * 60 * 60);

        res.status(200).json({
            _id: user._id,
            name: user.name,
            gender: user.gender,
            dob: user.dob,
            phoneno: user.phoneno,
            crops: user.crops
        });
    } catch (err) {
        console.log("Error in Logging in", err.message);
        res.status(500).json({ error: err.message });
    }
}

export const logout = async (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 }); //Null cookie
        await client.del("analysis");
        await client.del("user");

        res.status(200).json({ message: "Logged out successfully" });
    } catch (err) {
        console.log("Error in Logging out", err.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}