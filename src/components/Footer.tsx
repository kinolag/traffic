export default function Footer() {
  return (
    <footer className="w90pc mar-5 txt-c radius-8 is-slategrey">
      <p className="txt-16">
        <b>Data source</b>:{" "}
        <a
          className="a1"
          href="https://roadtraffic.dft.gov.uk/downloads"
          target="_blank"
          rel="noreferrer"
          title="Road Traffic Statistics link"
        >
          UK Road Traffic Statistics
        </a>{" "}
      </p>
      <p className="txt-14">
        Information about the road traffic statistics collected over the last 23
        years (2000-2022), across 45,865 manual count points.
      </p>
    </footer>
  );
}
