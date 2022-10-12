import React, {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import * as querystring from "qs";
import {GithubService} from "../../../services/github.service";
import {IRepositoryContributor} from "../../../types/interfaces";
import "./style.css";

const GithubRepositoryDetail = () => {
  const location = useLocation();
  const [repo, setRepo] = useState('');
  const [owner, setOwner] = useState('');
  const [contributors, setContributors] = useState<IRepositoryContributor[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const { owner, repo } = querystring.parse(location.search.substr(1)) as {
      owner: string;
      repo: string;
    };
    setRepo(repo);
    setOwner(owner);
    if (owner && repo) {
      GithubService.listRepositoryContributors(owner, repo).then((res) => {
        setContributors(res.data);
      }).catch((e) => {
        setError(e.message);
      });
    }
  }, [location]);

  return (
    <div className="page-content">
      <div className="d-flex align-items-baseline px-4">
        <h1>{repo}</h1>
        <div className="ml-auto">Owner: <b>{owner}</b></div>
      </div>
      <div className="white-card mt-5">
        {error ? (
          <p className="text-danger">
            <b>Error!</b><br/>{error}
          </p>
        ) : (
          <table>
            <thead>
            <tr>
              <th>ID</th>
              <th>Login</th>
              <th>Type</th>
              <th>Site Admin?</th>
              <th>Contributions</th>
            </tr>
            </thead>
            <tbody>
            {contributors.map((item, i) => (
              <tr key={i}>
                <td>{item.id}</td>
                <td>
                  <div className="d-flex align-items-center">
                    <span className="avatar" style={{ backgroundImage: `url(${item.avatar_url})` }} />
                    <span className="truncate ml-3">{item.login}</span>
                  </div>
                </td>
                <td>{item.type}</td>
                <td>{item.site_admin ? 'Yes' : 'No'}</td>
                <td>{item.contributions}</td>
              </tr>
            ))}
            {!contributors.length && (
              <tr>
                <td colSpan={4} className="text-dark text-center p-5">No records</td>
              </tr>
            )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default GithubRepositoryDetail;
