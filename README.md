# Template for .fensak repositories

Use this template to create a `.fensak` repository in your Organization with a recommended project configuration for
writing and testing rules. Feel free to clone this repo and make any modifications necessary to get up and running with
Fensak.


## What's included

This template includes the following:

### Sample rule

A sample rule file (using typescript) is provided in the [rules folder](/rules). The sample rule is a basic "Hello
world" example that allows any PRs that only contains updates to the `README.md` file in the root of the repository. It
should give you a basic starting point for navigating the patch object provided to rules functions by Fensak.

For more example rules, checkout
[fensak-io/fensak-rules-examples](https://github.com/fensak-io/fensak-rules-examples).

### Sample config

A sample [fensak.yml](/fensak.yml) config file is provided for your convenience. The config file maps a single fictional
repository in your Organization (`my-repo`) against the sample rule, [rules/sample.ts](/rules/sample.ts).

### Tests

This template includes a project scaffold for running tests for the rules using Deno. The tests contain example usage of
the Fensak module for testing various pull requests against the rules. See [rules/sample_test.ts](/rules/sample_test.ts)
for more details.

To run the test, follow these steps:

1. Install [Deno](https://deno.com/) if you do not have it already.
1. Run `deno test --allow-env --allow-read --allow-net`.

### CI/CD with GitHub Actions

This template also includes a sample CI/CD workflow based on GitHub Actions in the [.github/workflows
folder](/.github/workflows). The GitHub Actions workflow will:

- Check if the code is formatted properly using `deno fmt`.
- Lint the code using `deno lint`.
- Run the tests using `deno test` and output a junit report.
- Process the junit report and upload to GitHub Actions so that it can be viewed.


## Instructions

1. Create a new repo against this template on GitHub. Refer to [the official
   documentation](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-repository-from-a-template)
   for more details on using template repositories.
1. Remove the [LICENSE](/LICENSE) file and replace it with your own.
1. Add and define your own rules in the [rules folder](/rules).
1. Update this README to suit your needs.


## Questions or Feedback

If you have any questions, concerns, or feedback pertaining to this repository or Fensak in general, please start a
discussion on the [Fensak GitHub Discussions forum](https://github.com/orgs/fensak-io/discussions).

<!-- A nonce change -->
