// @ts-check
import core from "@actions/core";
import { getExecOutput } from "@actions/exec";

/**
 * @param {string} name
 * @param {string} email
 */

export async function setGitIdentity(name, email) {
  const command = ["config", "--local", "user.name", name];
  await exec(command);
  const emailCommand = ["config", "--local", "user.email", email];
  await exec(emailCommand);
}

/**
 * @param {string} branch
 */
export async function checkIfBranchExists(branch) {
  const command = ["ls-remote", "--exit-code", "--heads", "origin", branch];
  const output = await exec(command, { ignoreReturnCode: true });
  return output.exitCode === 0;
}

/**
 * @param {string} branch
 */
export async function createBranch(branch) {
  const command = ["checkout", "-b", branch];
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
  const command = ["diff", "--exit-code", "--stat"];
  const output = await exec(command, { ignoreReturnCode: true });
  // Exit code 1 means there are differences
  return output.exitCode === 1;
}

/**
 * Run a git command
 * @param {string[]} command
 * @param {import("@actions/exec").ExecOptions} options
 */
async function exec(command, options = {}) {
  core.info(`Running \`git ${command.join(" ")}\``);
  const response = await getExecOutput("git", command, options);

  return response;
}
