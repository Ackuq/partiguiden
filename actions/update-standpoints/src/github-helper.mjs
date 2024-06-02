import core from "@actions/core";
import github from "@actions/github";

const { context } = github;

const token = core.getInput("github-token");
const client = github.getOctokit(token);

/**
 *
 * @param {string} title
 * @param {string} body
 * @param {string} head
 * @param {string} base
 */
export async function createPullRequest(title, body, head, base = "main") {
  const { data } = await client.rest.pulls.create({
    owner: context.repo.owner,
    repo: context.repo.repo,
    title: title,
    body,
    head,
    base,
  });
  return data;
}
