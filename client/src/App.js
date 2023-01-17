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

      {drones.map((drone) => (
        <p key={drone.serialNumber}>{drone.serialNumber}</p>
      ))}
    </div>
  );
}

export default App;
