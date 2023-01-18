const express = require("express");
const request = require("request");
const cors = require("cors");
const app = express();

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

app.get(`/drones/:serialNumber`, (req, res) => {
  request(
    {
      url: `https://assignments.reaktor.com/birdnest/pilots/${req.params.serialNumber}`,
    },

    (error, response, body) => {
      if (error || response.statusCode !== 200) {
        return res.status(500).json({ type: "error", message: error.message });
      }
      res.set("Content-Type", "application/json");
      res.send(Buffer.from(body));
    }
  );
});

const PORT = process.env.PORT || 4050;
app.listen(PORT, () => console.log(`listening on ${PORT}`));
