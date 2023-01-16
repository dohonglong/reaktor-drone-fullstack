const express = require("express");
const request = require("request");
const cors = require("cors");
const app = express();

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   next();
// });

app.use(cors());

app.get("/express_backend", (req, res) => {
  request(
    { url: "https://assignments.reaktor.com/birdnest/drones" },
    (error, response, body) => {
      if (error || response.statusCode !== 200) {
        return res.status(500).json({ type: "error", message: error.message });
      }
      res.set("Content-Type", "application/rss+xml");
      res.send(Buffer.from(body));
    }
  );
});
const PORT = process.env.PORT || 4050;
app.listen(PORT, () => console.log(`listening on ${PORT}`));
