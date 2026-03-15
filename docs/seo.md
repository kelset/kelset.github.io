# SEO Best Practices for Hugo & Congo Theme

## 1. Core Configuration (`config/_default/`)
- **Robots.txt**: In `hugo.toml`, ensure `enableRobotsTXT = true`.
- **Canonical URLs**: Ensure `baseURL` is correctly set in `hugo.toml` to avoid duplicate content.
- **Language**: Set `languageCode` (e.g., `en` or `en-US`) in `hugo.toml` for targeting.
- **Author Data**: Configure the `[params.author]` section in `languages.en.toml` for better E-E-A-T signals.

## 2. Content Front Matter
- **Title & Description**: Provide a unique `title` and a 150-160 character `description` for every page/post.
- **Social Images**:
  - `feature` / `cover` for article top images.
  - `thumb` (ideally 1200x630px) for listings and Open Graph/Twitter cards.
- **Draft Status**: Ensure `draft: false` before publishing so search engines index it.

## 3. Structured Data
- Congo has built-in Open Graph and Twitter Card support.
- **Breadcrumbs**: Enable breadcrumb navigation in `params.toml` for UI and schema benefits.
- Consider adding custom partials for Article or FAQ schemas.

## 4. Organization & URLs
- **Clean URLs**: Use the `slug` parameter in front matter.
- **Taxonomies**: Organize using tags/categories, but avoid "tag soup" (thin content).
- **Sitemaps**: Hugo generates `sitemap.xml` automatically. Customize priority/frequency per page if needed.

## 5. AI Preparedness & AI Engine Optimization (AEO)
With the rise of AI search engines (like Perplexity, SearchGPT) and LLM crawlers, traditional SEO needs to be supplemented with AI-specific optimizations:

- **Direct Answer Snippets**: Add concise "Direct Answer" snippets (1-2 clear sentences) at the very start of key sections or blog posts. AI models rely heavily on dense, highly factual text to generate their answers and cite sources.
- **`llms.txt` and `llms-full.txt`**: Consider generating an `llms.txt` (a brief summary of your site for AI) and `llms-full.txt` (a concatenated version of your public documentation/content) in your `static/` directory to explicitly feed context to AI crawlers.
- **Markdown Availability**: Since AI models natively understand Markdown incredibly well, ensuring clean semantic HTML allows crawlers to easily convert your pages back to Markdown. In Hugo, you can even configure custom output formats to expose raw `.md` or `.json` versions of your posts.
- **Semantic HTML**: Ensure content isn't hidden behind complex Javascript interactions. Since we are using Hugo, our content is naturally delivered as static HTML, which is optimal for AI ingestion.
