import "./App.css";
import { useState, useEffect } from "react";
import { csv, DSVRowArray } from "d3";
import Loader from "./components/Loader";

/** handling production and development:
 * place data in /public folder
 * name env variable REACT_APP_PUBLIC_URL
 * enable PUBLIC_URL in .env only at build 
 * */
const DATA_ADDRESS: string = "./data/dft_traffic_counts_aadf_by_direction.csv";

function App() {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<DSVRowArray<string>>();

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        /* d3.csv uses d3.fetch which returns a promise */
        const trafficData = await csv(DATA_ADDRESS);
        // console.log(trafficData[0]);
        setData(trafficData);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  return (
    <div className="App">
      <header>
        <h3>Traffic app: built with TS, React and D3 by kinolag || NicolaG</h3>
      </header>
      {loading && <Loader />}
      {data && data.length > 0 && (
        <>
          <p>
            {data[0].Latitude} {data[0].Longitude}
          </p>
          <p>
            {data.reverse()[0].Latitude}
            {data.reverse()[0].Longitude}
          </p>
        </>
      )}
    </div>
  );
}

export default App;
