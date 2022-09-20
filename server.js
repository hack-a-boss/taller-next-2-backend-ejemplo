require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

const data = require("./data.json");

const PORT = process.env.PORT;

app.use(express.static("static"));
app.use(cors());

app.get("/posts", (req, res) => {
  res.send(
    data.map((post) => {
      return {
        title: post.title,
        slug: post.slug,
        image: post.image,
        date: post.date,
      };
    })
  );
});

app.get("/posts/:slug", (req, res) => {
  const post = data.find((post) => post.slug === req.params.slug);

  if (!post) {
    return res.status(404).send({
      error: "Post not found",
    });
  }

  res.send(post);
});

app.listen(PORT, () => {
  console.log(`Servidor funcionando en http://localhost:${PORT}`);
});
