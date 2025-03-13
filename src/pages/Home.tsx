import { useDocumentTitle } from "src/hooks";

const Home = () => {
  useDocumentTitle("Home");

  return (
    <div
      className="flex flex-column items-center pv4"
      style={{ minHeight: "60vh" }}
    >
      <h1 className="page-title-text">React Skeleton</h1>
      <p className="ph4 f3 fw5 dark-gray tc">
        You should run <code>setup.py</code> to auto-rename a bunch of strings.
        <br />
        You can search for <code>skeleton</code> in your editor to find all
        places where you should make your own changes if you really want to do
        it manually
      </p>
    </div>
  );
};

export default Home;
