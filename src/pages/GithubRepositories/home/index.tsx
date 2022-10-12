import React, {useEffect, useMemo, useState} from "react";
import {Link} from "react-router-dom";
import {Input} from "../../../components";
import {GithubService} from "../../../services/github.service";
import {IRepository} from "../../../types/interfaces";
import "./style.css";

const GithubRepositories = () => {
  const [search, setSearch] = useState('');
  const [repositories, setRepositories] = useState<IRepository[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    GithubService.listPublicRepositories().then((res) => {
      setRepositories(res.data);
    }).catch((e) => {
      setError(e.message);
    });
  }, []);

  const filteredRepositories = useMemo(() => {
    if (!search) {
      return repositories;
    }

    const term = search.toLowerCase();
    return repositories.filter((item) => item.full_name.toLowerCase().includes(term));
  }, [repositories, search]);

  return (
    <div className="page-content">
      <Input
        name="search"
        value={search}
        placeholder="Search..."
        onChange={(_, value) => setSearch(value)}
      />

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
              <th>Full name</th>
              <th>Owner</th>
              <th>Description</th>
            </tr>
            </thead>
            <tbody>
            {filteredRepositories.map((item, i) => (
              <tr key={i}>
                <td>{item.id}</td>
                <td>
                  <Link className="text-primary" to={`/github-repositories/${item.id}?owner=${item.owner.login}&repo=${item.full_name}`}>
                    {item.full_name}
                  </Link>
                </td>
                <td>{item.owner.login}</td>
                <td className="truncate">{item.description}</td>
              </tr>
            ))}
            {!filteredRepositories.length && (
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

export default GithubRepositories;
