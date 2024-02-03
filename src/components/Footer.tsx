import d3logo from "../assets/images/d3_200_cir.png";

export default function Footer() {
  return (
    <footer className="w100pc mar-10 txt-c radius-8 txt-14 is-slategrey">
      <h4>Data Sources</h4>
      <p className="line-1-5">
        <a
          className="a1"
          href="https://martinjc.github.io/UK-GeoJSON/"
          target="_blank"
          rel="noreferrer"
          title="UK GeoJSON and TopoJSON link"
        >
          GeoJSON and TopoJSON
        </a>
        : UK boundary data for maps by martinjc.
      </p>
      <p className="line-1-5">
        <a
          className="a1"
          href="https://roadtraffic.dft.gov.uk/downloads"
          target="_blank"
          rel="noreferrer"
          title="Road Traffic Statistics link"
        >
          UK Road Traffic Statistics
        </a>
        : information collected over the last 23 years (2000-2022), across
        45,865 manual count points.
      </p>
      <h4>
        <span className="gradient-text">App Development</span>
      </h4>
      <p className="line-1-5">
        Built by Nicola Grassini using TS, React and D3
        <br />
        GitHub:{" "}
        <a
          className="a1"
          href="https://github.com/kinolag"
          target="_blank"
          rel="noreferrer"
          title="Developer's GitHub profile"
        >
          kinolag
        </a>
      </p>
      <img
        src={d3logo}
        width="64px"
        alt="D3.js logo"
        title="D3.js logo"
        className="shadow-bbb"
        style={{ marginBottom: "10px" }}
      />
    </footer>
  );
}
