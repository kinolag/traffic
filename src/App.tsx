import "./App.css";
import MapChart from "./components/MapChart";

/** handling production and development:
 * place data in /public folder
 * set PUBLIC_URL in build script
 * */

function App() {
  console.log("App render");
  return (
    <div className="centeredColumn">
      <header className="txt-c radius-8">
        <h3>Traffic app: built with TS, React and D3</h3>
        <p>
          developed by{" "}
          <a
            className="a1"
            href="https://github.com/kinolag"
            target="_blank"
            rel="noreferrer"
            title="Developer's GitHub profile"
          >
            kinolag
          </a>{" "}
          | NicolaG (01/2024)
        </p>
      </header>
      <main>
        <MapChart area="towerHamlets" />
        <MapChart area="southwark" />
        <MapChart area="lewisham" />
        <MapChart area="greenwich" />
      </main>
    </div>
  );
}

export default App;
