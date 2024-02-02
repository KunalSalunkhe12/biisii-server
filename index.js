import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import { sendMail } from "./utils/email.js";

const app = express();
app.use(
  cors({
    origin: process.env.CLIENT_URL,
  })
);
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get("/", (_req, res) => {
  res.send("Biisii ventures server");
});

app.post("/contact", async (req, res) => {
  const { email, phoneNumber, message, firstName, lastName } = req.body;
  const fullName = `${firstName} ${lastName}`;

  try {
    const response = await sendMail({
      email,
      phoneNumber,
      message,
      fullName,
    });

    return res.status(200).json({ response, success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error, success: false });
  }
});

app.listen(PORT, () => {
  console.log("Server listening on port 3000");
});
