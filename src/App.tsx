import { Box, Route, Router, Routes } from "@adamjanicki/ui";
import Footer from "src/components/Footer";
import Nav from "src/components/Nav";
import Home from "src/pages/Home";
import NotFound from "src/pages/NotFound";
import { tools } from "src/pages/tools";

import Page from "./components/Page";

export default function App() {
  return (
    <Router basename="/tools">
      <Box
        vfx={{ axis: "x", width: "full", height: "full" }}
        className="app-container"
      >
        <Nav />
        <Box vfx={{ stretch: "grow" }}>
          <Routes fallback={<NotFound />}>
            <Route path="/" element={<Home />} />
            {tools.map((tool, i) => (
              <Route
                key={i}
                path={`/${tool.path}`}
                element={
                  <Page title={tool.name}>
                    <tool.Component />
                  </Page>
                }
              />
            ))}
          </Routes>
          <Footer />
        </Box>
      </Box>
    </Router>
  );
}
