const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); // ✅ Import jsonwebtoken

// Register
const registerUser = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: 'User already exists',
            });
        }

        // Hash the password before saving
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            role: role || 'user'
        });

        await newUser.save(); // ✅ Ensure the user is saved

        // Generate JWT Token
        const token = jwt.sign(
            { id: newUser._id, role: newUser.role, username: newUser.username }, // ✅ Add username
            process.env.JWT_SECRET,
            { expiresIn: '30m' }
        );
        
        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email,
                role: newUser.role,
            },
            token, // ✅ Return token on registration
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error, Please Try Again',
        });
    }
};

// Login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ email }).select('+password'); // ✅ Include password only for validation
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password',
            });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password',
            });
        }

        // Generate JWT token (✅ Include username)
        const token = jwt.sign(
            { id: user._id, role: user.role, username: user.username }, // ✅ Add username
            process.env.JWT_SECRET,
            { expiresIn: '30m' }
        );
        

        // Send response (without password)
        res.status(200).json({
            success: true,
            message: 'Login successful',
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
            },
            token, // ✅ Send token after login
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error, Please Try Again',
        });
    }
};
module.exports = { registerUser, loginUser };
