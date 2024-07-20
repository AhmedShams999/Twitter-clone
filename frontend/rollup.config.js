import html from '@rollup/plugin-html';
import postcss from 'rollup-plugin-postcss';

export default {
  input: 'src/main.js', // Your main JS file
  output: {
    file: 'dist/bundle.js',
    format: 'iife',
  },
  plugins: [
    postcss(),
    html({
      title: 'My App',
    }),
    // other plugins
  ],
};