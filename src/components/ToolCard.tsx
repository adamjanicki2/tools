import { Icon, ui, UnstyledLink } from "@adamjanicki/ui";
import type { Tool } from "src/utils/types";

type Props = {
  tool: Tool;
};

export default function ToolCard({ tool }: Props) {
  return (
    <UnstyledLink
      to={`/${tool.path}`}
      vfx={{
        axis: "y",
        align: "start",
        border: true,
        radius: "rounded",
        padding: "m",
        backgroundColor: "default",
        shadow: "subtle",
      }}
      className="toolcard hover-fade"
    >
      <ui.h2
        vfx={{
          axis: "x",
          align: "center",
          gap: "s",
          fontSize: "l",
          fontWeight: 7,
          margin: "none",
        }}
      >
        <Icon vfx={{ color: "muted" }} icon={tool.icon} size="m" />
        {tool.name}
      </ui.h2>
      <ui.p vfx={{ fontWeight: 5, color: "muted" }}>{tool.description}</ui.p>
    </UnstyledLink>
  );
}
