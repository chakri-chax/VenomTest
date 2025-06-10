import bodyParser from "body-parser";
import express from "express";
import collectionRoutes from "../routes/collectionRoutes"; 

const app = express();
const PORT = 3004;

app.use(bodyParser.json());
app.use(express.json());

app.use("/api", collectionRoutes);

app.use("/", (req, res) => {
  res.send("Server is running");
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
