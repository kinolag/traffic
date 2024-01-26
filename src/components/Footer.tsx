export default function Footer() {
  return (
    <footer className="w90pc mar-5 txt-c radius-8 is-slategrey">
      <p>
        <b>Data Sources</b>:
      </p>
      <p className="txt-14">
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
      <p className="txt-14">
        <a
          className="a1"
          href="https://roadtraffic.dft.gov.uk/downloads"
          target="_blank"
          rel="noreferrer"
          title="Road Traffic Statistics link"
        >
          UK Road Traffic Statistics
        </a>
        : information about the road traffic statistics collected over the last
        23 years (2000-2022), across 45,865 manual count points.
      </p>
      <p>
        <b>App Developer:</b>:
      </p>
      <p className="txt-14">Nicola Grassini (2024)</p>
    </footer>
  );
}
