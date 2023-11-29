import ErrorStatus from "../utils/errorStatus.js";
import chalk from "chalk";
import userModel from "../models/userModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


const createUser = async (req, res, next) => {
    try{
    const { userName, password, profileImg, email} = req.body;
    if (!userName || !password || !profileImg || !email) throw new ErrorStatus('Please provide all required fields', 400);
    const hashedPwd = await bcrypt.hash(password, 10);

    const { _id } = await userModel.create({
        userName,
        password: hashedPwd,
        profileImg,
        email,
    });
    const token = jwt.sign({ _id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
    });
    res.set('authorization', token);
    return res.sendStatus(201);
} catch (error) {
    next(error);
}
};

const oneUser = async (req, res, next) => {
    try {
        const findUser = await userModel.findById(req.userId);
        return res.json(findUser)
    } catch (error) {
        next(error);
    }
};

const loginUser = async (req, res, next) => {
    try {
    const { email, password } = req.body;
    if (!email || !password)
        throw new ErrorStatus('Please provide all required fields', 400);

    const findUser = await userModel.findOne({ email }).select('+password');
    if (!findUser) throw new ErrorStatus('No user found', 404);
    const checkPwd = await bcrypt.compare(password, findUser.password);
    if (!checkPwd) throw new ErrorStatus('Wrong password!', 400);
    const token = jwt.sign({ _id: findUser._id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
    });
    res.set('authorization', token);
    return res.end();
    } catch (error) {
    next(error);
    }
};


export {
    createUser,
    oneUser,
    loginUser
}