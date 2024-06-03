// @ts-check
import core from "@actions/core";

import {
  BRANCH_NAME,
  GIT_EMAIL,
  GIT_USERNAME,
  MAIN_BRANCH,
  TEMP_BRANCH_NAME,
} from "./constants.mjs";
import {
  checkHasDiff,
  checkIfBranchExists,
  checkout,
  commit,
  createBranch,
  forcePush,
  push,
  setGitIdentity,
} from "./git-helper.mjs";

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

core.startGroup("Create branch and commit changes");
const branchExists = await checkIfBranchExists(BRANCH_NAME);
if (branchExists) {
  core.info(`Branch ${BRANCH_NAME} already exists, rebasing...`);
  core.info("Creating temp branch to store changes");
  await createBranch(TEMP_BRANCH_NAME, MAIN_BRANCH);
  core.info("Checking out temporary branch");
  await checkout(TEMP_BRANCH_NAME);
} else {
  core.info(`Branch ${BRANCH_NAME} does not exist, creating...`);
  await createBranch(BRANCH_NAME, MAIN_BRANCH);
}
await commit("Update standpoints");
core.endGroup();

core.startGroup("Push changes");
// Push changes
if (branchExists) {
  core.info(`Force pushing changes to ${BRANCH_NAME}...`);
  await forcePush(`${TEMP_BRANCH_NAME}:${BRANCH_NAME}`);
} else {
  core.info(`Pushing changes to ${BRANCH_NAME}...`);
  await push();
}
core.endGroup();

// Create pull request
// TODO
