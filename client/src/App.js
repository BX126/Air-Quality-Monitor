import React, { useState, useEffect } from "react";
import axios from "axios";
import InDoorPM25 from "./component/InDoorPM25.js";
import OutDoorPM25 from "./component/OutDoorPM25.js";
import { Box, Typography } from "@mui/material";
import OpacityIcon from "@mui/icons-material/Opacity.js";
import DeviceThermostatIcon from "@mui/icons-material/DeviceThermostat.js";
import WarningAmberIcon from "@mui/icons-material/WarningAmber.js";
import AirIcon from "@mui/icons-material/Air.js";
import logo1 from "./component/logo1.png";
import logo2 from "./component/logo2.png";

function App() {
  const [date, setDate] = useState(new Date());
  const [data, setData] = useState({
    pm25I: 30,
    pm25O: 30,
    W: 0,
    S: 0,
    J: 0,
    C: 0,
  });
  const [input, setInput] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => setDate(new Date()), 1000);
    return function cleanup() {
      clearInterval(timer);
    };
  },[]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`/backend`);
        const response2 = await axios.get(`/city`);
        setInput(response.data[7]["sensors"]);
        setError(null);
        if (input != null) {
          const parsedData = Object.entries(input);
          const dataset = {
            pm25I: 30,
            pm25O: 30,
            W: 0,
            S: 0,
            J: 0,
            C: 0,
          };
          dataset.pm25I = parsedData[2][1]["value"] == null ? 30 : Number(parsedData[2][1]["value"]);
          dataset.W = parsedData[0][1]["value"] == null ? 0 :parsedData[0][1]["value"];
          dataset.S = parsedData[1][1]["value"] == null ? 0 :parsedData[1][1]["value"];
          dataset.J = parsedData[4][1]["value"] == null ? 0 :parsedData[4][1]["value"];
          dataset.C = parsedData[5][1]["value"] == null ? 0 :parsedData[5][1]["value"];
          dataset.pm25O = response2.data == null ? 0 : Number(response2.data);
          setData(dataset);

        }
      } catch (err) {
        setError(err.message);
        setInput(null);
      } finally {
        setLoading(false);
      }
    };
    getData();
  });

  return (
    <div className="App">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            width: "99%",
            height: 120,
            alignItems: "center",
            justifyContent: "space-evenly",
            boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            margin: 1,
          }}
        >
          <Box
            component="img"
            sx={{
              height: 50,
              width: 200,
              maxHeight: { xs: 233, md: 167 },
              maxWidth: { xs: 350, md: 250 },
            }}
            src={logo2}
          />

          <Box
            component="img"
            sx={{
              height: 70,
              width: 400,
              maxHeight: { xs: 233, md: 167 },
              maxWidth: { xs: 350, md: 250 },
            }}
            src={logo1}
          />

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyItems: "center",
              margin: 1,
            }}
          >
            <Typography variant="h4" gutterBottom>
              <strong>{date.toLocaleTimeString()}</strong>
            </Typography>
            <Typography variant="h5" gutterBottom>
              {date.toLocaleDateString()}
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "50%",
              padding: 1,
              margin: 1,
              alignItems: "center",
              justifyItems: "center",
              boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            }}
          >
            <Typography variant="h5" gutterBottom sx={{ m: "20px" }}>
              <strong>室内PM2.5指数</strong>
            </Typography>
            <InDoorPM25 value={data.pm25I} />

            <Typography variant="h5" gutterBottom sx={{ m: "20px" }}>
              <strong>室外PM2.5指数</strong>
            </Typography>
            <OutDoorPM25 value={data.pm25O} />
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "50%",
              padding: 1,
              margin: 1,
              alignItems: "center",
              justifyItems: "center",
              boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                margin: 1,
                width: "100%",
                height: "50%",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  margin: 1,
                  flexBasis: "50%",
                  alignItems: "center",
                  justifyItems: "center",
                  boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                }}
              >
                <Typography variant="h5" gutterBottom sx={{ m: "30px" }}>
                  <strong>温度</strong>
                </Typography>
                <DeviceThermostatIcon sx={{ width: 50, height: 50 }} />
                <Typography variant="h2" gutterBottom sx={{ m: "30px" }}>
                  {data.W}
                  <small>
                    <small>
                      <small> °C</small>
                    </small>
                  </small>
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  margin: 1,
                  flexBasis: "50%",
                  alignItems: "center",
                  justifyItems: "center",
                  boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                }}
              >
                <Typography variant="h5" gutterBottom sx={{ m: "30px" }}>
                  <strong>湿度</strong>
                </Typography>
                <OpacityIcon sx={{ width: 50, height: 50 }} />
                <Typography variant="h2" gutterBottom sx={{ m: "30px" }}>
                  {data.S}
                  <small>
                    <small>
                      <small> %</small>
                    </small>
                  </small>
                </Typography>
              </Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                margin: 1,
                height: "50%",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  margin: 1,
                  flexBasis: "50%",
                  alignItems: "center",
                  justifyItems: "center",
                  boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                }}
              >
                <Typography variant="h5" gutterBottom sx={{ m: "30px" }}>
                  <strong>甲醛</strong>
                </Typography>
                <WarningAmberIcon sx={{ width: 50, height: 50 }} />

                <Typography variant="h2" gutterBottom sx={{ m: "30px" }}>
                  {data.J}
                  <small>
                    <small>
                      <small> mg/m³</small>
                    </small>
                  </small>
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  margin: 1,
                  flexBasis: "50%",
                  alignItems: "center",
                  justifyItems: "center",
                  boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                }}
              >
                <Typography variant="h5" gutterBottom sx={{ m: "30px" }}>
                  <strong>二氧化碳</strong>
                </Typography>
                <AirIcon sx={{ width: 50, height: 50 }} />

                <Typography variant="h2" gutterBottom sx={{ m: "30px" }}>
                  {data.C}
                  <small>
                    <small>
                      <small> ppm</small>
                    </small>
                  </small>
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </div>
  );
}

export default App;
