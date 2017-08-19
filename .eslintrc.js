module.exports = {
  root: true,
  env: {
    node: true,
    es6: true
  },
  extends: "standard",
  plugins: [
    'html'
  ],
  rules: {
    indent: ["error", 2],
    // semi: ["error", "always"]
  }
}
