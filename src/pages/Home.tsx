import { useDocumentTitle } from "src/hooks";
import { ReactComponent as Logo } from "src/components/logo.svg";
import { tools } from "src/pages/tools";
import ToolCard from "src/components/ToolCard";

const Home = () => {
  useDocumentTitle("Tools");

  return (
    <div
      className="flex flex-column items-center pv4"
      style={{ minHeight: "60vh" }}
    >
      <div className="flex items-center pv4">
        <h1 className="home-title-text mr3 ma0">Tools</h1>
        <Logo className="home-logo" />
      </div>
      <p className="ph4 f3 fw5 dark-gray tc mt0">
        Check out the list of tools available!
      </p>

      <div className="flex justify-center flex-wrap ph4">
        {tools.map((tool, i) => (
          <ToolCard key={i} tool={tool} />
        ))}
      </div>
    </div>
  );
};

export default Home;
