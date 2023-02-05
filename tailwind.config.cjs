module.exports = {
  content: [
    "./src/**/*.{html,js,vue}",
    "./node_modules/@formkit/themes/tailwindcss/genesis/index.cjs",
    "./formkit.config.js",
  ],
  plugins: [
    require("@tailwindcss/line-clamp"),
    require("@tailwindcss/typography"),
  ],
};
