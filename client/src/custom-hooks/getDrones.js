//import axios from "axios";
import { useEffect, useState } from "react";
const { XMLParser } = require("fast-xml-parser");

const useDrones = () => {
  const [drones, setDrones] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    const fetchDrones = async () => {
      try {
        await fetch(
          "https://reaktor-drone-fullstack.onrender.com/express_backend",
          {
            headers: {
              "Content-Type": "application/xml; charset=utf-8",
            },
          }
        )
          .then((response) => response.text())
          .then((data) => {
            //console.log(data);
            const parser = new XMLParser();
            const xml = parser.parse(data);
            const droneValue = xml.report.capture.drone;
            //console.log(droneValue);

            setDrones(droneValue);
          });
      } catch (error) {
        setError(error);
      }
    };
    fetchDrones();
  }, []);

  return [drones, error];
};

export default useDrones;
