//import axios from "axios";
import { useEffect, useState } from "react";
import XMLParser from "react-xml-parser";

const useDrones = () => {
  const [drones, setDrones] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    const fetchDrones = async () => {
      try {
        await fetch("http://localhost:4050/express_backend", {
          mode: "no-cors",
          headers: {
            "Content-Type": "application/xml; charset=utf-8",
          },
        })
          .then((response) => response.text())
          .then((data) => {
            var xml = new XMLParser().parseFromString(data);
            console.log("data");
            setDrones(xml);
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

// useEffect(() => {
//   axios("https://assignments.reaktor.com/birdnest/drones", {
//     mode: "cors",
//     headers: {
//       //proxy: "http://localhost:3000",
//       "Access-Control-Allow-Origin": "localhost",
//       "Content-Type": "application/xml; charset=utf-8",
//       "Access-Control-Allow-Credentials": "true",
//     },
//   })
//     .then((response) => {
//       console.log(response);
//       setDrones(response.data);
//     })
//     .catch((error) => {
//       setError(error);
//     });
// }, []);

// const response = await fetch(
//   "https://assignments.reaktor.com/birdnest/drones",
//   {
//     mode: "no-cors",
//     headers: {
//       "Content-Type": "application/xml; charset=utf-8",
//     },
//   }
// );
// const data = await response.text();
// var xml = new XMLParser().parseFromString(data);
// console.log(xml);
// setDrones(xml);

//const data = await response.text();
//console.log(data);
//var xml = new XMLParser().parseFromString(data);
//setDrones(xml);

// .then(res => res.text())
// .then(data => {
//     var xml = new XMLParser().parseFromString(data);
//     console.log(xml)
// })
