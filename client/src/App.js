import "./App.css";

import useDrones from "./custom-hooks/getDrones";

function App() {
  const [drones, error] = useDrones([]);

  /* Catch error */
  if (error) {
    return <p>Something went wrong.</p>;
  }

  return (
    <div className="App">
      <h1>REAKTOR PROJECT - DRONE FLY - LONG DO</h1>

      <div className="container">
        <table>
          <tbody>
            <tr>
              <th>Serial Number</th>
              <th>Model</th>
              <th>Manufacturer</th>
              <th>Name</th>
              <th>Phone Number</th>
              <th>E-mail</th>
              <th>Position X</th>
              <th>Position Y</th>
            </tr>
            {drones.map((drone) => (
              <tr key={drone.serialNumber}>
                <td>{drone.serialNumber}</td>

                <td>{drone.model}</td>
                <td>{drone.manufacturer}</td>
                <td>
                  {drone.firstName} {drone.lastName}
                </td>
                <td>{drone.phoneNumber}</td>
                <td>{drone.email}</td>
                <td>{drone.positionX}</td>
                <td>{drone.positionY}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
