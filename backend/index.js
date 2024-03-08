import express from "express";
import cors from "cors";
import helmet from "helmet";
import axios from "axios";
import { port, token } from "./src/config/constant/constant.js";

const app = express();
app.use(cors());
app.use(helmet());

app.use("/api/search", async (req, res) => {
  try {
    const options = { method: "GET", headers: { accept: "application/json" } };
    const endpoint = `https://us1.locationiq.com/v1/autocomplete?key=${token}&q=${
      req.query.location
    }&limit=${req.query.limit || 10}`;

    const { data } = await axios.get(endpoint, options);

    if (data) return res.send(data);
    res.send([]);
  } catch (error) {
    console.error(error);
    res.send([]);
  }
});

app.use("/", (req, res) => {
  res.send("Hello there");
});

app.listen(port, () => {
  console.log(`app is listening at port ${port}`);
});
