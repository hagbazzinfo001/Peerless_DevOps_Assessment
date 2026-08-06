const app = require("./app");

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`
🚀 =========================================
 Peerless DevOps Showcase API
 Environment : ${process.env.ENVIRONMENT}
 Running on  : http://localhost:${PORT}
 Version     : ${process.env.APP_VERSION}
=========================================
`);
});