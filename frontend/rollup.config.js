import postcss from 'rollup-plugin-postcss';

export default {
  // other Rollup config options
  plugins: [
    postcss({
      extract: true, // Extract CSS to a separate file
      modules: true, // Enable CSS modules
    }),
    // other plugins
  ],
};
