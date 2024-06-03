import core from "@actions/core";
import github from "@actions/github";

import { BRANCH_NAME, PR_BASE, PR_BODY, PR_TITLE } from "./constants.mjs";

const { context } = github;

const token = core.getInput("github-token");
const client = github.getOctokit(token);

export async function createPullRequest() {
  const { data } = await client.rest.pulls.create({
    owner: context.repo.owner,
    repo: context.repo.repo,
    title: PR_TITLE,
    body: PR_BODY,
    head: BRANCH_NAME,
    base: PR_BASE,
  });
  return data;
}

export async function findOpenPullRequest() {
  const { data } = await client.rest.pulls.list({
    owner: context.repo.owner,
    repo: context.repo.repo,
    base: PR_BASE,
    head: `${context.repo.owner}:${BRANCH_NAME}`,
    state: "open",
  });

  return data[0];
}
