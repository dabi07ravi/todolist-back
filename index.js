const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 3000;
const TodoModel = require("./model");
const cors = require("cors");

app.use(express.json());
app.use(cors());
// Connect to the MongoDB database
mongoose
  .connect("mongodb://127.0.0.1/todo", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((err) => {
    console.error("Error connecting to the database:", err);
  });

// Define a route
app.post("/create", async (req, res) => {
  await TodoModel.create(req.body);
  res.send("data saved");
});

app.get("/get", async (req, res) => {
  const limit = req.query.limit ? parseInt(req.query.limit) : 10;
  const page = req.query.page ? parseInt(req.query.page) : 1;
  const skip = (page - 1) * limit;
  const data = await TodoModel.find().skip(skip).limit(limit);
  const totalData = await TodoModel.find().countDocuments();
  const totalPage = Math.ceil(totalData / limit);
  return res.send({
    data,
    page,
    dataPerPage: data.length,
    totalPage,
    totalData,
  });
});

app.delete("/del/:id", async (req, res) => {
  await TodoModel.findByIdAndDelete(req.params.id);
  return res.send("data deleted");
});

app.put("/upd/:id", async (req, res) => {
  const data = await TodoModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  return res.send(data);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
