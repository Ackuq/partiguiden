import * as core from "@actions/core";
import type { ExecOptions } from "@actions/exec";
import { getExecOutput } from "@actions/exec";

export async function setGitIdentity(name: string, email: string) {
  const command = ["config", "--local", "user.name", name];
  await exec(command);
  const emailCommand = ["config", "--local", "user.email", email];
  await exec(emailCommand);
}

export async function checkIfBranchExists(branch: string) {
  const command = ["ls-remote", "--exit-code", "--heads", "origin", branch];
  const output = await exec(command, { ignoreReturnCode: true });
  return output.exitCode === 0;
}

export async function createBranch(branch: string) {
  const command = ["checkout", "-b", branch];
  await exec(command);
}

export async function commit(message: string) {
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
export async function forcePush(branch: string) {
  const command = ["push", "--force", "origin", branch];
  await exec(command);
}

export async function checkHasDiff() {
  const command = ["diff", "--exit-code", "--stat"];
  const output = await exec(command, { ignoreReturnCode: true });
  // Exit code 1 means there are differences
  return output.exitCode === 1;
}

async function exec(command: string[], options: ExecOptions = {}) {
  core.info(`Running \`git ${command.join(" ")}\``);
  const response = await getExecOutput("git", command, options);

  return response;
}
