// @ts-check
import github from "@actions/github";

import { add, checkHasDiff, checkout, commit, push } from "./git-helper.mjs";

const hasDiff = await checkHasDiff();

if (!hasDiff) {
  console.log("No changes detected, exiting...");
  process.exit(0);
}

const runId = github.context.runId;
const branchName = `update-standpoints-${runId}`;

// Checkout and push changes
await checkout(branchName, "main");
await add();
await commit("Update standpoints");
await push();
