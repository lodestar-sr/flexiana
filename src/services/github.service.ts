import {App} from "octokit";
import {CONFIG} from "../config";

const app = new App({
  appId: CONFIG.GITHUB.APP_ID,
  privateKey: CONFIG.GITHUB.PRIVATE_KEY,
});

export class GithubService {

  static listPublicRepositories() {
    return app.octokit.rest.repos.listPublic();
  }

  static listRepositoryContributors(owner: string, repo: string) {
    return app.octokit.rest.repos.listContributors({
      owner,
      repo,
    });
  }
}