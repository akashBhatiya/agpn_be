const User = require("../models/Users");

exports.sendSecurityCode = (req, res) => {
    return res.status(200).json({message:"user came here"});
}