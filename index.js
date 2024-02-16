import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import { sendMail } from "./utils/email.js";
import companies from "./data/companies.js";

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
  })
);
app.use(express.json());

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

app.get("/companies", (req, res) => {
  const { page, limit } = req.query;

  try {
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const results = {};

    if (endIndex < companies.length) {
      results.next = {
        page: parseInt(page) + 1,
        limit: parseInt(limit),
      };
    }
    if (startIndex > 0) {
      results.previous = {
        page: parseInt(page) - 1,
        limit: parseInt(limit),
      };
    }

    results.hasMore = endIndex < companies.length;

    results.companies = companies.slice(startIndex, endIndex);
    return res.status(200).json({ results, success: true });
  } catch (error) {
    return res.status(500).json({ error, success: false });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server listening on port 3000");
});
