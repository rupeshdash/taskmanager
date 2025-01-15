"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserDetails = exports.signup = exports.login = void 0;
const User_1 = __importDefault(require("../Models/User"));
const validation_1 = require("../ZodSchema/validation");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const cloudinary_1 = require("../config/cloudinary");
const jwt_secret = process.env.JWT_SECRET || "";
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    console.log(email, password);
    try {
        const result = validation_1.LoginSchema.safeParse({ email, password });
        console.log(result);
        if (!result.success) {
            return res.json({
                errors: [{ message: "Invalid inputs" }],
            });
        }
        const existingUser = yield User_1.default.findOne({
            email: email,
        });
        console.log("existingUser", existingUser);
        if (!existingUser) {
            return res.json({
                errors: [{ message: "Invalid inputs" }],
            });
        }
        const match = yield bcrypt_1.default.compare(password, existingUser.password);
        console.log("match", match);
        if (!match) {
            return res.json({
                errors: [{ message: "Invalid inputs" }],
            });
        }
        const loggedinUser = yield User_1.default.findOne({ _id: existingUser._id }).select("-password");
        const token = jsonwebtoken_1.default.sign({ email }, jwt_secret);
        if (token) {
            return res.json({
                token: token,
                user: loggedinUser,
            });
        }
    }
    catch (err) {
        res.status(500).json({
            error: "Internal server error",
        });
    }
});
exports.login = login;
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { email, password, name, organization } = req.body;
    const { avatar } = req === null || req === void 0 ? void 0 : req.files;
    console.log(email, password, name, organization, avatar);
    const result = validation_1.SignupSchema.safeParse({
        email: email.trim(),
        password: password.trim(),
        name: name.trim(),
        organization: name.trim(),
    });
    console.log(result);
    if (!result.success) {
        return res.status(401).json({
            message: "invalid inputs",
        });
    }
    const existingUser = yield User_1.default.findOne({
        email: email,
    });
    if (existingUser) {
        return res.status(400).json({
            message: "user already exists",
        });
    }
    console.log(avatar);
    let avatarUploadResult = {
        url: "https://res.cloudinary.com/task-manager-0/image/upload/v1727164454/ayiuesrjbipxj1cxqbdm.jpg",
    };
    if (avatar) {
        const avatarLocalPath = (_a = avatar[0]) === null || _a === void 0 ? void 0 : _a.path;
        avatarUploadResult = yield (0, cloudinary_1.uploadOnCloudinary)(avatarLocalPath);
        if (!avatarUploadResult || !(avatarUploadResult === null || avatarUploadResult === void 0 ? void 0 : avatarUploadResult.url)) {
            return res.status(400).json({
                message: "Avatar image is required",
            });
        }
    }
    const salt = yield bcrypt_1.default.genSaltSync(10);
    const hashedPassword = yield bcrypt_1.default.hashSync(password, salt);
    try {
        const user = yield User_1.default.create({
            email,
            name,
            password: hashedPassword,
            organization,
            avatar: avatarUploadResult === null || avatarUploadResult === void 0 ? void 0 : avatarUploadResult.url,
        });
        const createdUser = yield User_1.default.findOne({ _id: user._id }).select("-password");
        const token = jsonwebtoken_1.default.sign({ email }, jwt_secret);
        return res.status(200).json({
            message: "Signup Successfully",
            user: createdUser,
            token: token,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
        });
    }
});
exports.signup = signup;
const getUserDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.header("userId");
    try {
        const user = yield User_1.default.findOne({ _id: userId }).select("-password");
        if (!user) {
            return res.status(400).json({
                message: "User not found",
            });
        }
        return res.status(200).json({
            user: user,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
        });
    }
});
exports.getUserDetails = getUserDetails;
