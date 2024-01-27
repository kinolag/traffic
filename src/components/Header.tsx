export default function Header() {
  return (
    <header className="w100pc mar-10 txt-c radius-8 is-dsg">
      <h4>Traffic: Geospatial Visualisation App</h4>
      <p className="txt-15">
        built by{" "}
        <a
          className="a1"
          href="https://github.com/kinolag"
          target="_blank"
          rel="noreferrer"
          title="Developer's GitHub profile"
        >
          kinolag
        </a>{" "}
        using TS, React and D3
      </p>
    </header>
  );
}
