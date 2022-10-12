import React, { Suspense } from "react";
import {Navigate, Route, Routes} from "react-router";
import GithubRepositoriesRouting from "./pages/GithubRepositories/routing";

const App = () => {
  return (
    <Suspense fallback={<></>}>
      <Routes>
        <Route path="/github-repositories/*" element={<GithubRepositoriesRouting />} />
        <Route path="*" element={<Navigate to="/github-repositories" />} />
      </Routes>
    </Suspense>
  );
};

export default App;
