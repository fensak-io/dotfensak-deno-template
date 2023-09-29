/**
 * This is a Fensak rule that allows any Pull Request that only has changes to
 * the root README.md file.
 */

// fensak remove-start
import type {
  IPatch,
} from "https://raw.githubusercontent.com/fensak-io/fensak/v0.0.2/patch/patch_types.ts";
// fensak remove-end

// deno-lint-ignore no-unused-vars
function main(inp: IPatch[]): boolean {
  const numPatches = inp.length;
  if (numPatches == 0) {
    // No files updated, so approve.
    console.log("Accepting since no changes.");
    return true;
  } else if (numPatches > 1) {
    // More than one file was updated, which means not just the README.md was changed so reject.
    console.log("Rejecting since more than one file was updated.");
    return false;
  }

  const patch = inp[0];
  return patch.path === "README.md"
}
