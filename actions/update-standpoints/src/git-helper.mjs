// @ts-check
import { getExecOutput } from "@actions/exec";

/**
 * @param {string} branch
 */
export async function checkIfBranchExists(branch) {
  const command = ["rev-parse", "--verify", branch];
  const output = await exec(command, false);
  return output.exitCode === 0;
}

/**
 *
 * @param {string} branch
 * @param {string} base
 */
export async function createBranch(branch, base) {
  const command = ["checkout", "-b", branch, base];
  await exec(command);
}

/**
 * Checkout existing branch
 * @param {string} branch
 */
export async function checkout(branch) {
  const command = ["checkout", branch];
  await exec(command);
}

/**
 * @param {string} message
 */
export async function commit(message) {
  const addCommand = ["add", "."];
  await exec(addCommand);
  const command = ["commit", "-m", message];
  await exec(command);
}

/**
 * Push to the current branch
 */
export async function push() {
  const command = ["push", "--set-upstream", "origin", "HEAD"];
  await exec(command);
}

/**
 * @param {string} branch
 */
export async function forcePush(branch) {
  const command = ["push", "--force", "origin", branch];
  await exec(command);
}

export async function checkHasDiff() {
  const command = ["diff", "--quiet"];
  const output = await exec(command, false);
  // Exit code 1 means there are differences
  return output.exitCode === 1;
}

/**
 * Run a git command
 * @param {string[]} command
 * @param {boolean} throwOnError
 */
async function exec(command, throwOnError = true) {
  const response = await getExecOutput("git", command);

  if (throwOnError && response.exitCode !== 0) {
    throw new Error(`Error running git command: ${response.stderr}`);
  }

  return response;
}
