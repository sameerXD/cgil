import express, { Request, Response } from "express";
import { body } from "express-validator";
import User, { IProduct } from "../database/models/User";
import "express-async-errors";
import jwt from "jsonwebtoken";
import { comparePassword, encryptPassword } from "../utils/Auth";
import { BadRequestError, validateRequest } from "@vizlogic/commonsameer";
import { create, getByEmail } from "../database/services/user_service";
const router = express.Router();

router.post(
  "/user/register",
  [
    body("email").isEmail().withMessage("email must be valid!"),
    body("password").isString().trim().withMessage("password must be string !"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const getUser = await User.findOne({
      email,
    });

    if (getUser)
      throw new BadRequestError(`user with email ${email} already exist!`);
    const user = await User.create({
      email: email,
      password: await encryptPassword(password),
    });
    await user.save();

    const token = jwt.sign(
      { email: email },
      process.env.USERSECRETACCESSTOKEN!
    );
    res.send({ token });
  }
);

router.post(
  "/user/registerSQL",
  [
    body("email").isEmail().withMessage("email must be valid!"),
    body("password").isString().trim().withMessage("password must be string !"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const getUser = await getByEmail(email);

    if (getUser)
      throw new BadRequestError(`user with email ${email} already exist!`);
    const user = await create({
      email: email,
      password: await encryptPassword(password),
    });

    const token = jwt.sign(
      { email: email },
      process.env.USERSECRETACCESSTOKEN!
    );
    res.send({ token });
  }
);

router.post(
  "/user/login",
  [
    body("email").isEmail().withMessage("email must be valid!"),
    body("password").isString().trim().withMessage("password must be string !"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const getUser = await User.findOne({
      email,
    });

    if (!getUser)
      throw new BadRequestError(`user with email ${email} not found!`);

    if (!(await comparePassword(password, getUser.password)))
      throw new BadRequestError(`Invalid password!`);

    const token = jwt.sign(
      { email: email },
      process.env.USERSECRETACCESSTOKEN!
    );
    res.send({ token });
  }
);

export default router;
