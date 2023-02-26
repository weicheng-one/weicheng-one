module.exports = {
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            code: {
              display: "block",
              backgroundColor: "rgb(236,239,243)",
              padding: "20px",
              borderRadius: "12px",
              "&:before": {
                display: "none",
              },
              " &:after": {
                display: "none",
              },
            },
            p: { wordWrap: "break-word" },
            h1: { wordWrap: "break-word" },
          },
        },
      },
    },
  },
  content: [
    "./src/**/*.{html,js,vue}",
    "./node_modules/@formkit/themes/tailwindcss/genesis/index.cjs",
    "./formkit.config.js",
  ],
  plugins: [
    require("@tailwindcss/line-clamp"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
  ],
};
