// @ts-check
import { getExecOutput } from "@actions/exec";

/**
 * Create a new branch
 * @param {string} branch
 * @param {string} startPoint
 */
export async function checkout(branch, startPoint) {
  const command = ["checkout", "-b", branch, startPoint];
  await exec(command);
}

export async function add() {
  const command = ["add", "."];
  await exec(command);
}

/**
 * @param {string} message
 */
export async function commit(message) {
  const command = ["commit", "-m", message];
  await exec(command);
}

export async function push() {
  const command = ["push", "--set-upstream", "origin", "HEAD"];
  await exec(command);
}

export async function checkHasDiff() {
  const command = ["diff", "--quiet"];
  const output = await exec(command);
  // Exit code 1 means there are differences
  return output.exitCode === 1;
}

/**
 * Run a git command
 * @param {string[]} command
 */
function exec(command) {
  return getExecOutput("git", command);
}
