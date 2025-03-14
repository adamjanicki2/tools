import { useDocumentTitle } from "src/hooks";
import { ReactComponent as Logo } from "src/components/logo.svg";

const Home = () => {
  useDocumentTitle("Home");

  return (
    <div
      className="flex flex-column items-center pv4"
      style={{ minHeight: "60vh" }}
    >
      <div className="flex items-center">
        <h1 className="home-title-text mr3">Tools</h1>
        <Logo className="home-logo" />
      </div>
      <p className="ph4 f3 fw5 dark-gray tc">
        Check out the list of tools below!
      </p>
    </div>
  );
};

export default Home;
