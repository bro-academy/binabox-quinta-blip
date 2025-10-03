import { defineConfig } from 'vite';
import fs from 'fs';
import path from 'path';
import vituum from 'vituum'
import twig from '@vituum/vite-plugin-twig';
import nunjucks from '@vituum/vite-plugin-nunjucks';
import postcss from '@vituum/vite-plugin-postcss';
import imageOptimizer from '@bro-academy/vite-plugin-image-optimizer';
import svgSprite from '@bro-academy/vite-plugin-svg-sprite';

// Load ONLY global data
const commonData = JSON.parse(
  fs.readFileSync(path.resolve('src/data/common.json'), 'utf-8')
);

const indexData = JSON.parse(
  fs.readFileSync(path.resolve('src/data/index.json'), 'utf-8')
);

const blogData = JSON.parse(
  fs.readFileSync(path.resolve('src/data/blog.json'), 'utf-8')
);

export default defineConfig({
  server: {
    port: 5173,
    strictPort: true
  },
  build: {
    assetsInlineLimit: 0,
    outDir: 'dist'
  },
  plugins: [
    svgSprite(),
    vituum(), 
    twig({
      root: 'src', // Root folder for Twig templates
      templatesDir: [
        'pages',             // your page templates
        'templates/layouts', // layouts like base.twig
        'templates/partials' // header/footer partials
      ],
      globals: {
        common: commonData,
        page: indexData,
        blog: blogData    
      }
    }),
    nunjucks(),
    postcss(),
    imageOptimizer()
  ]
});
