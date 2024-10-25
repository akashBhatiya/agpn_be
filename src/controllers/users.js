const User = require("../models/Users");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET_KEY || "your_secret_key";

exports.sendSecurityCode = async (req, res) => {
    const { email, password, remembered } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(200).json({ status:"fail", message: "User not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(200).json({ status:"fail" ,message: "Invalid password" });
        }

        if (remembered || true) {
            const token = jwt.sign({ _id: user._id, email: user.email }, JWT_SECRET, { expiresIn: '30m' });
            return res.status(200).json({ status:"success", message: "User logged in directly", token, user });
        }

        const securityCode = crypto.randomInt(100000, 999999).toString();
        const securityCodeExpiry = new Date(Date.now() + 5 * 60 * 1000);

        user.securityCode = securityCode;
        user.securityCodeExpiry = securityCodeExpiry;
        await user.save();

        // send security code in email using AWS SESV1

        return res.status(200).json({ status:"success" , message: "Security code sent to your email" }); 
    } catch (error) {
        console.log("Error in sending securing code: ", error);
        return res.status(500).json({status:"fail", message:"Internal Server Error"})
    }
}

exports.getCurrUser = async (req,res) => {

    try{
        const user = await User.findById(req.user._id);
    
        if(!user){
            return res.status(200).json({status:"fail", messaage:"User not found"})
        }
        const token = jwt.sign({ _id: user._id, email: user.email }, JWT_SECRET, { expiresIn: '30m' });
        return res.status(200).json({status:"success", message:"User got successfully", user, token})
    }catch(error){
        console.log("Error getting logged in curr USer: ", error);
        return res.status(500).json({status:"fail", message:"Internal Server Error"})
    }

}