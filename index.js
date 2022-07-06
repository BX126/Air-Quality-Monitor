const express = require("express"),
  path = require("path"),
  app = express(),
  axios = require('axios'),
  cors = require("cors"),
  port = process.env.PORT || 3001;

app.use(cors());
app.use(express.static(path.resolve(__dirname, "../client/build")));

app.get("/backend", async (req, res, next) => {
  try {
    const response = await axios.get(
      `http://www.lewei50.com/api/v1/user/getSensorsWithGateway`,
      {
        headers: {
          userkey: "777fabf5526b4bf0b35d42779155b3ec",
        },
      }
    );
    res.status(200).send(response.data);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.get("/city", async (req, res, next) => {
  try {
    const response = await axios.get(
      "https://api.help.bj.cn/apis/aqi2/?id=101010100"
    );
    res.status(200).send(response.data["data"][0]["val"]);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

app.listen(port);

console.log(`API server is listening on port: ${port}`);
