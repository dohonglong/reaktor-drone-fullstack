import { useCallback, useEffect, useState } from "react";
const { XMLParser } = require("fast-xml-parser");

const useDrones = () => {
  const [drones, setDrones] = useState([]);
  const [error, setError] = useState();

  //Fetch all the data about the user, from the serialNumber from fetchDrones
  const fetchDroneValue = useCallback(async (serialNumber) => {
    try {
      const response = await fetch(
        `https://reaktor-drone-fullstack.onrender.com/drones/${serialNumber}`
      );
      const data = await response.json();
      return data;
    } catch (error) {
      setError(error);
    }
  }, []);

  //fetch the drones
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
          .then(async (data) => {
            //console.log(data);
            const parser = new XMLParser();
            const xml = parser.parse(data);
            const droneValues = xml.report.capture.drone;
            const promises = droneValues.map(async (droneValue) => {
              return await fetchDroneValue(droneValue.serialNumber);
            });
            //console.log(droneValues);
            await Promise.all(promises).then((values) => {
              droneValues.map((item, i) => Object.assign(item, values[i]));
              console.log(droneValues);
              setDrones(droneValues);
            });
          });
      } catch (error) {
        setError(error);
      }
    };

    // Keep the drone lists updated every 2 seconds
    const interval = setInterval(() => {
      fetchDrones();
    }, 2000);

    return () => {
      setDrones([]);
      clearInterval(interval);
    };
  }, [fetchDroneValue]);

  return [drones, error];
};

export default useDrones;
// useEffect(() => {
//   const interval = setInterval(()=> {
//     fetchDrones()
//   }, 2000)
//   return () => clearInterval(interval) ;
// }, []);
