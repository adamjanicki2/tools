import { BrowserRouter, Route, Routes } from "react-router";
import Footer from "src/components/Footer";
import Nav from "src/components/Nav";
import PageWrapper from "src/components/PageWrapper";
import Home from "src/pages/Home";
import NotFound from "src/pages/NotFound";
import { tools } from "src/pages/tools";

const App = () => {
  return (
    <BrowserRouter basename="/tools">
      <div className="app-container w-100" style={{ height: "100%" }}>
        <Nav />
        <div style={{ flexGrow: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            {tools.map((tool, i) => (
              <Route
                key={i}
                path={`/${tool.path}`}
                element={
                  <PageWrapper title={tool.name}>
                    <tool.Component />
                  </PageWrapper>
                }
              />
            ))}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
