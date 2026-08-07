// exports.home = (req, res) => {
//     res.json({
//       message: "Welcome to the Peerless DevOps Showcase API 🚀",
//       builder: "Agbabiaka Hammed",
//       purpose:
//         "This API powers the Peerless DevOps Showcase application built for the Peerless DevOps Engineer Assessment."
//     });
//   };
  
//   exports.health = (req, res) => {
//     res.status(200).json({
//       status: "healthy",
//       service: process.env.APP_NAME,
//       version: process.env.APP_VERSION,
//       environment: process.env.ENVIRONMENT,
//       uptime: `${Math.floor(process.uptime())} seconds`,
//       timestamp: new Date().toISOString(),
//       nodeVersion: process.version,
//       memoryUsage: process.memoryUsage().heapUsed
//     });
//   };
  
//   exports.version = (req, res) => {
//     res.json({
//       app: process.env.APP_NAME,
//       version: process.env.APP_VERSION,
//       environment: process.env.ENVIRONMENT,
//       buildDate: process.env.BUILD_DATE,
//       commit: process.env.GIT_COMMIT
//     });
//   };
  
//   exports.info = (req, res) => {
//     res.json({
//       application: process.env.APP_NAME,
//       builder: "Agbabiaka Hammed",
//       assessment: "Peerless DevOps Engineer Assessment",
//       description:
//         "A production-inspired demonstration application showcasing containerization, CI/CD, health monitoring, secure configuration, and deployment automation."
//     });
//   };

// exports.home = (req, res) => {
//     res.json({
//       message: "Welcome to the Peerless DevOps Showcase API 🚀",
//       builder: "Agbabiaka Hammed",
//       purpose:
//         "This API powers the Peerless DevOps Showcase application built for the Peerless DevOps Engineer Assessment."
//     });
//   };
  
//   exports.health = (req, res) => {
//     const memoryUsageMB = (
//       process.memoryUsage().heapUsed /
//       1024 /
//       1024
//     ).toFixed(2);
  
//     const uptimeMinutes = Math.floor(process.uptime() / 60);
  
//     res.status(200).json({
//       status: "healthy",
//       service: process.env.APP_NAME || "Peerless DevOps Showcase",
//       version: process.env.APP_VERSION || "dev",
//       environment: process.env.ENVIRONMENT || "development",
//       uptime: `${uptimeMinutes} minute${uptimeMinutes !== 1 ? "s" : ""}`,
//       timestamp: new Date().toISOString(),
//       nodeVersion: process.version,
//       memoryUsage: `${memoryUsageMB} MB`
//     });
//   };
  
//   exports.version = (req, res) => {
//     res.json({
//       app: process.env.APP_NAME || "Peerless DevOps Showcase",
//       version: process.env.APP_VERSION || "dev",
//       environment: process.env.ENVIRONMENT || "development",
//       buildDate: process.env.BUILD_DATE || "Unknown",
//       commit: process.env.GIT_COMMIT || "Unknown"
//     });
//   };
  
//   exports.info = (req, res) => {
//     res.json({
//       application: process.env.APP_NAME || "Peerless DevOps Showcase",
//       version: process.env.APP_VERSION || "dev",
//       environment: process.env.ENVIRONMENT || "development",
//       buildDate: process.env.BUILD_DATE || "Unknown",
  
//       builder: "Agbabiaka Hammed",
//       assessment: "Peerless DevOps Engineer Assessment",
  
//       description:
//         "A production-inspired demonstration application showcasing containerization, CI/CD, Docker, Docker Compose, GitHub Actions, GitHub Container Registry, Nginx reverse proxy, health monitoring, and deployment automation."
//     });
//   };



exports.home = (req, res) => {
  res.json({
    message: "Welcome to the Peerless DevOps Showcase API 🚀",
    builder: "Agbabiaka Hammed",
    purpose:
      "This API powers the Peerless DevOps Showcase application built for the Peerless DevOps Engineer Assessment."
  });
};

exports.health = (req, res) => {
  const heapUsed = process.memoryUsage().heapUsed;

  const memoryUsageMB = (heapUsed / 1024 / 1024).toFixed(2);

  res.status(200).json({
    status: "healthy",
    service: process.env.APP_NAME || "Peerless DevOps Showcase",
    version: process.env.APP_VERSION || "dev",
    environment: process.env.ENVIRONMENT || "development",

    // Return uptime in seconds
    uptime: Math.floor(process.uptime()),

    timestamp: new Date().toISOString(),
    nodeVersion: process.version,

    // Raw memory (bytes)
    memoryUsage: heapUsed,

    // Human readable
    memoryUsageMB
  });
};

exports.version = (req, res) => {
  res.json({
    app: process.env.APP_NAME || "Peerless DevOps Showcase",
    version: process.env.APP_VERSION || "dev",
    environment: process.env.ENVIRONMENT || "development",
    buildDate: process.env.BUILD_DATE || "Unknown",
    commit: process.env.GIT_COMMIT || "Unknown"
  });
};

exports.info = (req, res) => {
  res.json({
    application: process.env.APP_NAME || "Peerless DevOps Showcase",
    version: process.env.APP_VERSION || "dev",
    environment: process.env.ENVIRONMENT || "development",
    buildDate: process.env.BUILD_DATE || "Unknown",

    builder: "Agbabiaka Hammed",

    assessment: "Peerless DevOps Engineer Assessment",

    description:
      "A production-inspired demonstration application showcasing containerization, CI/CD, Docker, Docker Compose, GitHub Actions, GitHub Container Registry, Nginx reverse proxy, health monitoring, and deployment automation."
  });
};