// @ts-check
import github from "@actions/github";

import { BRANCH_NAME, MAIN_BRANCH, TEMP_BRANCH_NAME } from "./constants.mjs";
import {
  checkHasDiff,
  checkIfBranchExists,
  checkout,
  commit,
  createBranch,
  forcePush,
  push,
} from "./git-helper.mjs";

const hasDiff = await checkHasDiff();

if (!hasDiff) {
  console.log("No changes detected, exiting...");
  process.exit(0);
}

const branchExists = await checkIfBranchExists(BRANCH_NAME);
if (branchExists) {
  console.log(`Branch ${BRANCH_NAME} already exists, rebasing...`);
  // Create temp branch to store changes
  await createBranch(TEMP_BRANCH_NAME, MAIN_BRANCH);
  // Checkout temp branch
  await checkout(TEMP_BRANCH_NAME);
} else {
  console.log(`Branch ${BRANCH_NAME} does not exist, creating...`);
  // Create branch
  await createBranch(BRANCH_NAME, MAIN_BRANCH);
}
// Add and commit changes
await commit("Update standpoints");

// Push changes
if (branchExists) {
  await forcePush(`${TEMP_BRANCH_NAME}:${BRANCH_NAME}`);
} else {
  await push();
}

// Create pull request
// TODO
