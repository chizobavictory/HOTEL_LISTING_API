import express, { Response, Request } from "express";
const router = express.Router();

router.get('/', (req:Request, res:Response)=>{
  res.status(200).send(`HOTEL LISTING API IS RUNNING. CLICK TO VIEW DOCUMENTATION: https://documenter.getpostman.com/view/24035086/2s8YzZNy69`)
})

export default router;
