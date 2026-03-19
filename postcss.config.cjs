module.exports = {
  plugins: {
    tailwindcss: {},
    // autoprefixer removed: all target browsers (Chrome 111+, Edge 111+,
    // Firefox 115+, Safari 16.4+) support modern CSS natively — no vendor
    // prefixes are required and autoprefixer was crashing at loadPrefixes.
  },
}
