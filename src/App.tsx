import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";

import ScrollTopButtonComponent from "./components/shared/scroll-to-top-button/ScrollTopButtonComponent";
import PageWrapper from "./components/layout/PageWrapper";
import BookDetails from "./pages/books/BookDetails";
import BooksList from "./pages/books/BooksList";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";

function App() {
  const location = useLocation();

  return (
    <Layout>
      <PageWrapper>
        <Routes>
          <Route path="" element={<Home />} />
          <Route
            path="/books"
            element={<BooksList key={location.pathname} />}
          />
          <Route path="/books/:id" element={<BookDetails />} />
        </Routes>
        <ScrollTopButtonComponent />
      </PageWrapper>
    </Layout>
  );
}

export default App;
