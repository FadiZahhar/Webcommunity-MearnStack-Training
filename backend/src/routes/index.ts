import express, { Request, Response } from "express";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.status(200).json({ msg: "hi" });
});

export default router;
