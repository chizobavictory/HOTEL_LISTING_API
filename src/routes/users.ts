import express from "express";

import {
  loginUser,
  registerUsers,
  getUsers,
  renderRegisterPage,
  renderLoginPage,
  renderHomePage,
  renderListingPage,
  renderSecListingPage,
  logout,
  singleUser,
  deleteUsers,
  updateUsers,
} from "../controller/userController";

const router = express.Router();

/* GET users listing. */
router.post("/api/register", registerUsers);
router.get("/api/allusers", getUsers);
router.get("/api/find/:id", singleUser);
router.delete("/api/:id", deleteUsers);
router.put("/api/update/:id", updateUsers);

router.post("/login", loginUser);
router.post("/logout", logout);

// ejs routes
router.get("/signup", renderRegisterPage);
router.get("/signin", renderLoginPage);
router.get("/home", renderHomePage);
router.get("/listing1", renderListingPage);
router.get("/listing2", renderSecListingPage);

export default router;
