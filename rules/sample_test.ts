import { assert } from "https://deno.land/std@0.202.0/testing/asserts.ts";
import {
  compileRuleFn,
  IGitHubRepository,
  patchFromGitHubPullRequest,
  RuleFnSourceLang,
  RuleLogMode,
  runRule,
} from "https://raw.githubusercontent.com/fensak-io/fensak/v0.0.2/mod.ts";
import { Octokit } from "npm:@octokit/rest@^20.0.0";

const __dirname = new URL(".", import.meta.url).pathname;
const ruleFn = compileRuleFn(
  await Deno.readTextFile(`${__dirname}/sample.ts`),
  RuleFnSourceLang.Typescript,
);
const octokit = new Octokit({
  auth: Deno.env.get("GITHUB_API_TOKEN"),
});
const testRepo: IGitHubRepository = {
  owner: "fensak-io",
  name: "dotfensak-template",
};
const opts = { logMode: RuleLogMode.Console };

Deno.test("No changes should be approved", async () => {
  const result = await runRule(ruleFn, [], opts);
  assert(result.approve);
});

Deno.test("Changes only to README should be approved", async () => {
  // View PR at
  // https://github.com/fensak-io/dotfensak-template/pull/1
  const patches = await patchFromGitHubPullRequest(octokit, testRepo, 1);
  const result = await runRule(ruleFn, patches.patchList, opts);
  assert(result.approve);
});

Deno.test("Changes to non-README files should be rejected", async () => {
  // View PR at
  // https://github.com/fensak-io/dotfensak-template/pull/2
  const patches = await patchFromGitHubPullRequest(octokit, testRepo, 2);
  const result = await runRule(ruleFn, patches.patchList, opts);
  assert(!result.approve);
});

Deno.test("Change containing more than one file should be rejected", async () => {
  // View PR at
  // https://github.com/fensak-io/dotfensak-template/pull/4
  const patches = await patchFromGitHubPullRequest(octokit, testRepo, 4);
  const result = await runRule(ruleFn, patches.patchList, opts);
  assert(!result.approve);
});
