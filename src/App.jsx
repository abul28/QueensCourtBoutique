import React, { useState } from "react";
import BodyContent from "./body/BodyContent";
import NavBar from "./Header/NavBar";

function App() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      <NavBar onSearch={setSearchQuery} />
      <BodyContent searchQuery={searchQuery} />
    </>
  );
}

export default App;
