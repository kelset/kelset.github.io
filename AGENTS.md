# AGENTS.md

Welcome, AI Agent! This file provides context and best practices for working on this repository.

## Project Overview

This is the personal website of [Lorenzo Sciandra](https://kelset.dev/), built using:
- **Hugo**: The static site generator.
- **Congo**: The theme used for the site.
- **Go**: Used for Hugo modules and dependencies.

## Key Tools & Documentation

### Hugo
- **Official Docs**: [gohugo.io/documentation](https://gohugo.io/documentation/)
- **Best Practices**:
  - Use `hugo server` for local development.
  - Follow the directory structure: `content/` for posts, `layouts/` for template overrides, `assets/` for processed resources.
  - **Version Note**: Currently using Hugo `v0.157.0+`. Note that `.Site.Author` is deprecated; use `.Site.Params.author` instead.
  - **Front Matter**: Use `build:` instead of the deprecated `_build:`.

### Congo Theme
- **Official Docs**: [jpanther.github.io/congo](https://jpanther.github.io/congo/docs/)
- **Configuration**:
  - Primary configuration is in `config/_default/`.
  - `params.toml` handles theme-specific features.
  - `menus.en.toml` manages the header and footer navigation.
  - **Header Logo**: Configured via `[header] logo = "path/to/image"`.
  - **Copyright**: Configured in the language-specific file (e.g., `languages.en.toml`).

### Go
- **Official Docs**: [go.dev/doc](https://go.dev/doc/)
- **Hugo Modules**: This project uses Hugo Modules (Go modules under the hood). Use `hugo mod tidy` to manage dependencies.

## LLM-Friendly Tips

- **Templates**: When modifying templates, check for local overrides in `layouts/` before looking at the theme's default layouts.
- **Data Structures**: Hugo's internal objects (like `.Site`) evolve. Always check for recent deprecations if a build fails or warnings appear.
- **Content**: Most content is in Markdown (`.md`). Images are typically stored alongside the content in leaf bundles or in `assets/`.
- **AEO (AI Engine Optimization)**: The site automatically generates `llms.txt` and `llms-full.txt` at build time. The templates for these are located at `layouts/index.llms.txt` and `layouts/index.llms-full.txt`. You do not need to manually update them when adding new markdown content, but you should update the templates if you want to change what structural context is exposed to AI crawlers.

## Local Development

To start the local development server:
```bash
hugo server
```

To run a clean build:
```bash
hugo --buildDrafts --buildFuture
```

## Contributing Best Practices

- **Surgical Changes**: Avoid large-scale refactors unless requested.
- **Validation**: Always run `hugo` or `hugo server` to verify changes don't break the build.
- **Dependency Updates**: When updating Hugo or the theme, check the respective release notes for breaking changes.
