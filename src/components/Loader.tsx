type LoaderProps = {
  specifier?: string;
};

export default function Loader({ specifier }: LoaderProps) {
  return (
    <div className="centeredColumn is-slategrey">
      <div className="blinkPartial txt-c">
        <p>Loading data{` ${specifier}`}.</p>
        <p>Please wait, this may take a few seconds...</p>
      </div>
      <div className="loader mar-5"></div>
    </div>
  );
}
