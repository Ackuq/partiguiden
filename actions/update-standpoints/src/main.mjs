/* global process */
// @ts-check
import core from "@actions/core";

import {
  BRANCH_NAME,
  COMMIT_MESSAGE,
  GIT_EMAIL,
  GIT_USERNAME,
  PR_BASE,
  TEMP_BRANCH_NAME,
} from "./constants.mjs";
import {
  checkHasDiff,
  checkIfBranchExists,
  commit,
  createBranch,
  forcePush,
  push,
  setGitIdentity,
} from "./git-helper.mjs";
import { createPullRequest, findOpenPullRequest } from "./github-helper.mjs";

core.startGroup("Checking if changes exist");
const hasDiff = await checkHasDiff();
if (!hasDiff) {
  core.info("No changes detected, exiting...");
  process.exit(0);
}
core.info("Changes detected, continuing...");
core.endGroup();

core.startGroup("Setting git identity");
await setGitIdentity(GIT_USERNAME, GIT_EMAIL);
core.endGroup();

core.startGroup("Creating / updating branch and commit changes");
const branchExists = await checkIfBranchExists(BRANCH_NAME);
if (branchExists) {
  core.info(`Branch ${BRANCH_NAME} already exists...`);
  core.info("Creating and checking out temp branch to store changes");
  await createBranch(TEMP_BRANCH_NAME);
} else {
  core.info(
    `Branch ${BRANCH_NAME} does not exist, creating and checking out...`,
  );
  await createBranch(BRANCH_NAME);
}
await commit(COMMIT_MESSAGE);
core.endGroup();

core.startGroup("Pushing changes");
if (branchExists) {
  core.info(`Force pushing changes to ${BRANCH_NAME}...`);
  await forcePush(`${TEMP_BRANCH_NAME}:${BRANCH_NAME}`);
} else {
  core.info(`Pushing changes to ${BRANCH_NAME}...`);
  await push();
}
core.endGroup();

core.startGroup("Creating pull request");
core.info("Checking if pull request already exists...");
const existingPR = await findOpenPullRequest();
if (existingPR) {
  core.info(`Pull request #${existingPR.number} already exists`);
  core.info(`URL: ${existingPR.html_url}`);
  process.exit(0);
}
core.info("Pull request does not exist, creating...");
const data = await createPullRequest();
core.info(
  `Pull request created for ${BRANCH_NAME} to ${PR_BASE}. URL: ${data.html_url}`,
);
core.endGroup();
