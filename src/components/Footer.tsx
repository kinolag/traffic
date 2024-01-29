export default function Footer() {
  return (
    <footer className="w100pc mar-10 txt-c radius-8 is-slategrey">
      <p>
        <b>Data Sources</b>
      </p>
      <p className="txt-14 line-plus">
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
      <p className="txt-14 line-plus">
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
      <h4>App Development</h4>
      <p className="txt-14 line-plus">
        Built using TS, React and D3
        <br />
        by Nicola Grassini (2024)
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
    </footer>
  );
}
