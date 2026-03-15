# Performance Best Practices for Hugo & Congo Theme

Hugo and Congo are already extremely fast, but here's how to ensure peak performance:

## 1. Media Optimization
- **Image Formats**: Serve images in WebP format whenever possible.
- **Image Processing**: Use Hugo's built-in image processing functions to automatically resize images, reducing layout shifts (CLS) and payload size.

## 2. Build Configuration
- **Minification**: Always build the production site with the `--minify` flag to reduce the file sizes of HTML, CSS, JS, and JSON files.

## 3. Assets
- **Bundling**: Congo uses Tailwind CSS and bundles assets efficiently.
- **External Scripts/Styles**: Avoid adding multiple third-party external scripts or stylesheets that could block rendering or increase HTTP requests. Load non-essential scripts asynchronously (`async` or `defer`).
