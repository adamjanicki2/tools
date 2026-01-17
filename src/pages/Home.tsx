import { Box, ui } from "@adamjanicki/ui";
import { useEffect } from "react";
import ToolCard from "src/components/ToolCard";
import Logo from "src/img/logo.svg?react";
import { tools } from "src/pages/tools";

export default function Home() {
  useEffect(() => {
    document.title = "Tools";
  }, []);

  return (
    <Box
      vfx={{ axis: "y", align: "center", paddingY: "xl" }}
      style={{ minHeight: "60vh" }}
    >
      <Box vfx={{ axis: "x", align: "center", gap: "m", paddingY: "xl" }}>
        <ui.h1 vfx={{ margin: "none" }} className="home-title-text">
          Tools
        </ui.h1>
        <Logo className="home-logo" />
      </Box>
      <ui.p
        vfx={{
          paddingX: "l",
          fontSize: "l",
          fontWeight: 5,
          color: "muted",
          textAlign: "center",
          marginTop: "none",
        }}
      >
        Check out the list of tools available!
      </ui.p>

      <Box
        vfx={{
          axis: "x",
          justify: "center",
          wrap: true,
          gap: "m",
          paddingX: "l",
        }}
      >
        {tools.map((tool, i) => (
          <ToolCard key={i} tool={tool} />
        ))}
      </Box>
    </Box>
  );
}
