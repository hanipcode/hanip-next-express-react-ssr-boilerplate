import { UserModelPayload, UserModelType } from '../models/Types/User';
import UserTransformers from '../helpers/transformer/UserTransformers';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const User = require('../models/User');

export type UserRegistrationParam = {
  email: string,
  password: string,
  first_name: string,
  last_name: string,
  phone_number: string,
  user_location_coordinate?: string,
  user_location_name?: string,
  profile_picture?: string,
};

export type UserEditParam = {
  id: string,
  email?: string,
  password?: string,
  first_name?: string,
  last_name?: string,
  phone_number?: string,
  user_location_coordinate?: string,
  user_location_name?: string,
  profile_picture?: File,
};

export type UserLoginParam = {
  email: string,
  password: string,
};

export async function createUser(req: Request, res: Response) {
  const param: UserRegistrationParam = req.body;
  try {
    const hashedPassword = await bcrypt.hash(param.password, 10);
    const userWithEmailOrPassword = await User.findOne({
      $or: [{ email: param.email }, { phone_number: param.phone_number }],
    });
    if (userWithEmailOrPassword) {
      res.status(400).send({
        error: true,
        message: 'User dengan email atau nomer handphone yang anda masukan telah terdaftar',
      });
    }
    const userPayload: UserModelPayload = {
      _id: mongoose.Types.ObjectId(),
      email: param.email,
      password: hashedPassword,
      first_name: param.first_name,
      last_name: param.last_name,
      phone_number: param.phone_number,
      user_location_coordinate: param.user_location_coordinate,
      user_location_name: param.user_location_name,
      profile_picture: param.profile_picture,
    };
    const user = new User(userPayload);
    const data = await user.save();
    const returnedUserData = UserTransformers(data);
    res.status(201).json({ message: 'Successfully created new user', data: returnedUserData });
  } catch (error) {
    res.status(500).json({ error });
  }
}

export async function getSingleUser(req: Request, res: Response) {
  const { userId } = req.params;
  const user = await User.findOne({ _id: userId });
  if (!user) {
    res.status(404).json({
      error: true,
      message: 'User Not Found',
    });
  }
  const returnedUserData = UserTransformers(user);
  res.status(200).json({
    message: 'Sucessfully get user',
    data: returnedUserData,
  });
}

export async function loginUser(req: Request, res) {
  const param: UserLoginParam = req.body;
  try {
    const user = await User.findOne({ email: param.email });
    if (!user) {
      res.status(401).json({
        error: true,
        message: 'User dengan email tersebut tidak ditemukan',
      });
    }
    const isCorrectPassword = await bcrypt.compare(param.password, user.password);
    if (!isCorrectPassword) {
      res.status(401).json({
        error: true,
        message: 'User dengan password tersebut tidak ditemukan',
      });
    }
    const accessToken = jwt.sign(
      {
        email: user.email,
        // eslint-disable-next-line
        _id: user._id,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: '1d',
      },
    );
    const returnedUserData = UserTransformers(user);
    res.status(200).json({
      message: 'Successfully Logged In',
      data: {
        user: returnedUserData,
        accessToken,
      },
      accessToken,
    });
  } catch (error) {
    res.status(500).json({ error: true, message: `Unexpected Error ${error}` });
  }
}

export async function editUser(req: Request, res: Response) {
  const param: UserEditParam = req.body;
  const { file } = req;
  // const user: UserModelType = await User.findOne({ _id: param._id });
  let payload;
  if (file) {
    payload = Object.assign(param, { profile_picture: file.path.replace('static/', '') });
  } else {
    payload = param;
  }
  try {
    const savedUser = await User.findOneAndUpdate({ _id: param.id }, payload, { new: true });
    if (!savedUser) {
      res.status(404).json({
        error: true,
        message: 'User not found',
      });
    }
    const returnedUser = UserTransformers(savedUser);
    res.json({ message: 'successfully edit user profile', data: returnedUser });
  } catch (error) {
    res.status(500).json({ error: true, message: `Unexpected Error ${error}` });
  }
}

export async function editUserPath(req: Request, res: Response) {
  const { userId } = req.params;
  const param: UserEditParam = req.body;
  const { file } = req;
  let payload;
  if (file) {
    payload = Object.assign(param, { profile_picture: file.path.replace('static/', '') });
  } else {
    payload = param;
  }
  try {
    const savedUser = await User.findOneAndUpdate({ _id: userId }, payload, { new: true });
    if (!savedUser) {
      res.status(404).json({
        error: true,
        message: 'User not found',
      });
    }
    const returnedUser = UserTransformers(savedUser);
    res.json({ message: 'successfully edit user profile', data: returnedUser });
  } catch (error) {
    res.status(500).json({ error: true, message: `Unexpected Error ${error}` });
  }
}
