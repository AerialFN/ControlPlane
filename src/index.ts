import Express from "express";

const app = Express();

app.get("/", (req, res) => {
  return res.status(200).send("Hello, world!");
});

app.listen(process.env.PORT || 5000);
