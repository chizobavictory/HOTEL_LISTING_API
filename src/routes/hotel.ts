import express from "express";
import { auth } from "../middleware/auth";
import { createHotels, deleteHotel, getHotels, getSingleHotel, updateHotel } from "../controller/hotelController";

const router = express.Router();

router.post("/api/create", auth, createHotels);
router.get("/api/read", getHotels);
router.get("/api/find/:id", getSingleHotel);
// router.post("/api/updat/:id", auth, updateHotels);
router.put("/api/update/:id", auth, updateHotel);
router.delete("/api/delete/:id", auth, deleteHotel);

export default router;


