import { Request, Response, NextFunction } from "express";
import { v4 as uuidv4 } from "uuid";
import User from "../model/usersModel";
import Hotel from "../model/hotelModel";
import { registerSchema, loginSchema, generateToken, options } from "../utils/utils";
import bcrypt from "bcryptjs";
import fetch from "node-fetch";

//CREATE
export async function registerUsers(req: Request, res: Response, next: NextFunction) {
  const user_id = uuidv4();
  console.log(req.body);
  try {
    const validationResult = registerSchema.validate(req.body, options);
    if (validationResult.error) {
      return res.status(400).json({
        Error: validationResult.error.details[0].message,
      });
    }

    const emailDuplicates = await User.findOne({ where: { email: req.body.email } });
    if (emailDuplicates) {
      return res.status(409).json({
        msg: "Email has been used, please change email",
      });
    }
    const phoneNoDuplicates = await User.findOne({ where: { phoneNumber: req.body.phoneNumber } });
    if (phoneNoDuplicates) {
      return res.status(409).json({ msg: "phone number has been used" });
    }

    const passwordHash = await bcrypt.hash(req.body.password, 8);
    const record = await User.create({
      id: user_id,
      fullName: req.body.fullName,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      password: passwordHash,
    });
    res.status(201).json({
      msg: "you have sucessfully created a User",
      record,
    });
    // res.render("login");
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: "failed to register",
      route: "/register",
    });
  }
}

//LOGIN
export async function loginUser(req: Request, res: Response, next: NextFunction) {
  const id = uuidv4();
  try {
    const validationResult = loginSchema.validate(req.body, options);
    if (validationResult.error) {
      return res.status(400).json({
        Error: validationResult.error.details[0].message,
      });
    }
    // console.log(validationResult)
    const hotelUser = (await User.findOne({ email: req.body.email })) as unknown as {
      [key: string]: string;
    };
    // console.log(hotelUser, "astring")
    const { _id } = hotelUser;
    const token = generateToken({ _id });
    // console.log(token, id)
    const validHotelUser = await bcrypt.compare(req.body.password, hotelUser.password);
    // console.log(validHotelUser)
    if (!validHotelUser) {
      res.status(401).json({
        message: "password do not match",
      });
    }
    if (validHotelUser) {
      res.cookie("auth", token);
      res.status(200).json({
        msg: "User loggedin successfully",
      });
      // res.redirect("/users/home");
    }
  } catch (error) {
    res.status(500).json({
      message: "failed to login",
      route: "/login",
    });
  }
}

//READ
export async function getUsers(req: Request, res: Response, next: NextFunction) {
  try {
    const limit = req.query?.limit as number | undefined;
    // const offset = req.query?.offset as number | undefined;

    const record = await User.find().limit(limit || 5);

    res.status(200).json({
      msg: "All Users fetched successfully",
      record,
    });
  } catch (error) {
    res.status(500).json({
      msg: "failed to fetch hotels",
      route: "/read",
    });
  }
}

//READ
export const singleUser = async (req: Request, res: Response) => {
  try {
    const record = await User.findById(req.params.id);
    res.status(200).json(record);
  } catch (err) {
    res.status(500).json(err);
  }
};

//LOGOUT
export function logout(req: Request, res: Response) {
  res.clearCookie("auth");
  res.clearCookie("id");
  res.status(200).json({
    message: "you have successfully logged out",
  });
}

//DELETE
export async function deleteUsers(req: Request, res: Response, next: NextFunction) {
  try {
    const record = await User.findByIdAndDelete(req.params.id);
    if (!record) {
      return res.status(404).json({
        msg: "Cannot find hotel",
      });
    }
    res.status(200).json({
      msg: "User deleted successfully",
      record,
    });
    // res.render("listing1");
  } catch (error) {
    res.status(500).json({
      msg: "failed to delete",
      route: "/api/delete/:id",
    });
  }
}

//UPDATE
export async function updateUsers(req: Request, res: Response, next: NextFunction) {
  try {
    const record = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    if (!record) {
      return res.status(404).json({
        msg: "Cannot find User",
      });
    }
    res.status(200).json({
      msg: "User updated successfully",
      record,
    });
    // res.render("listing1");
  } catch (error) {
    res.status(500).json({
      msg: "failed to update",
      route: "/api/update/:id",
    });
  }
}

//EJS RENDERING
export async function renderRegisterPage(req: Request, res: Response, next: NextFunction) {
  res.render("register");
}
export async function renderLoginPage(req: Request, res: Response, next: NextFunction) {
  res.render("login");
}
export async function renderHomePage(req: Request, res: Response, next: NextFunction) {
  res.render("home");
}
export async function renderListingPage(req: Request, res: Response, next: NextFunction) {
  try {
    // const user = await User.findOne({
    //   where: { id: req.cookies.id },
    //   include: [{ model: Hotel, as: "hotels" }],
    // });
    res.render("listing1");
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "failed to render listing1" });
  }
}

export async function renderSecListingPage(req: Request, res: Response, next: NextFunction) {
  const data: any = await fetch("https://localhost:3005/hotels/read").then((response) => response.json());
  const useData = data.record;
  res.render("listing2", { useData });
}
