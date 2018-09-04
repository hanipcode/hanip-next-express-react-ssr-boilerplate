// @flow

import { UserModelPayload } from '../models/Types/User';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

export type UserRegistrationParam = {
  _id: string,
  email: string,
  password: string,
  first_name: string,
  last_name: string,
  phone_number: string,
  user_location_coordinate?: string,
  user_location_name?: string,
};
export type UserLoginParam = {
  email: string,
  password: string,
};

export async function createUser(req: Request, res: Response) {
  const param: UserRegistrationParam = req.body;
  try {
    const hashedPassword = await bcrypt.hash(param.password, 10);
    const userPayload: UserModelPayload = {
      _id: new mongoose.Types.ObjectId(),
      email: param.email,
      password: hashedPassword,
    };
    const user = new User(userPayload);
    const data = await user.save();
    res.status(201).json({ message: 'Successfully created new user', data });
  } catch (error) {
    res.status(500).json({ error });
  }
}

export async function getSingleUser(req: Request, res: Response) {
  const { userId } = req.params;
  console.log(req.params);
  res.json({ userId });
}

export async function loginUser(req: Request, res: Response) {
  const param: UserLoginParam = req.body;
  try {
    const user = await User.findOne({ email: param.email });
    if (!user) {
      res.status(401).json({
        error: true,
        message: 'No User with That Email Found',
      });
    }
    const isCorrectPassword = await bcrypt.compare(param.password, user.password);
    if (!isCorrectPassword) {
      res.status(401).json({
        error: true,
        message: 'Wrong Password !',
      });
    }
    const accessToken = jwt.sign(
      {
        email: user.email,
        // eslint-disable-next-line
        _id: user._id,
      },
      'mySecretKey',
      {
        expiresIn: '1d',
      },
    );
    res.status(200).json({
      message: 'Successfully Logged In',
      data: {
        user,
        accessToken,
      },
      accessToken,
    });
  } catch (error) {
    res.status(500).json({ error: true, message: 'Unexpected Error' });
  }
}
