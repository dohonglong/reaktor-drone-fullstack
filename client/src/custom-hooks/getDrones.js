//import axios from "axios";
import { useEffect, useState } from "react";
import XMLParser from "react-xml-parser";

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
            console.log(data);
            var xml = new XMLParser().parseFromString(data);
            console.log(xml);
            // setDrones(xml);
            // var xml = new XMLParser().parseFromString(data);
            // console.log(xml);
            // console.log(xml.getElementsByTagName("report"));
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
