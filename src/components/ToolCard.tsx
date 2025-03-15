import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { UnstyledLink } from "src/components/Link";
import { Tool } from "src/utils/types";

type Props = {
  tool: Tool;
};

export default function ToolCard({ tool }: Props) {
  return (
    <UnstyledLink
      to={`/${tool.path}`}
      className="flex flex-column items-start ba br3 b--moon-gray ma3 pa3 bg-white toolcard hover-fade"
    >
      <h2 className="f3 fw7 ma0">
        <FontAwesomeIcon icon={tool.icon} className="mr2" />
        {tool.name}
      </h2>
      <p className="f5 fw5 dark-gray">{tool.description}</p>
    </UnstyledLink>
  );
}
