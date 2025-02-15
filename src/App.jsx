import React from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import 'semantic-ui-css/semantic.min.css'
import CharacterList from "./pages/CharacterList";
import CharacterDetailPage from "./pages/CharacterDetail";
import { useLocation } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CharacterListWrapper />} />
        <Route path="/character/:id" element={<CharacterDetailPage />} />
      </Routes>
    </Router>
  );
}

function CharacterListWrapper() {
  const location = useLocation();
  const { page, status } = location.state || { page: 1, status: "" };

  return <CharacterList initialPage={page} initialStatus={status} />;
}

export default App;
