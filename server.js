// const express = require("express"); //Line 1
// const app = express(); //Line 2
// const port = process.env.PORT || 5000; //Line 3

// // This displays message that the server running and listening to specified port
// app.listen(port, () => console.log(`Listening on port ${port}`)); //Line 6

// // create a GET route
// app.get("/express_backend", (req, res) => {
//   //Line 9
//   res.send({ express: "YOUR EXPRESS BACKEND IS CONNECTED TO REACT" }); //Line 10
// }); //Line 11

const express = require("express");
const request = require("request");
const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});
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
