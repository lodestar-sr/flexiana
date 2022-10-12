import React, { Suspense } from "react";
import {Route, Routes} from "react-router";
import GithubRepositories from "./home";
import GithubRepositoryDetail from "./detail";

const GithubRepositoriesRouting = () => {
  return (
    <Suspense fallback={<></>}>
      <Routes>
        <Route path="/" element={<GithubRepositories />} />
        <Route path="/:id" element={<GithubRepositoryDetail />} />
      </Routes>
    </Suspense>
  );
};

export default GithubRepositoriesRouting;
