exports.home = (req, res) => {
    res.json({
      message: "Welcome to the Peerless DevOps Showcase API 🚀",
      builder: "Agbabiaka Hammed",
      purpose:
        "This API powers the Peerless DevOps Showcase application built for the Peerless DevOps Engineer Assessment."
    });
  };
  
  exports.health = (req, res) => {
    res.status(200).json({
      status: "healthy",
      service: process.env.APP_NAME,
      version: process.env.APP_VERSION,
      environment: process.env.ENVIRONMENT,
      uptime: `${Math.floor(process.uptime())} seconds`,
      timestamp: new Date().toISOString(),
      nodeVersion: process.version,
      memoryUsage: process.memoryUsage().heapUsed
    });
  };
  
  exports.version = (req, res) => {
    res.json({
      app: process.env.APP_NAME,
      version: process.env.APP_VERSION,
      environment: process.env.ENVIRONMENT,
      buildDate: process.env.BUILD_DATE,
      commit: process.env.GIT_COMMIT
    });
  };
  
  exports.info = (req, res) => {
    res.json({
      application: process.env.APP_NAME,
      builder: "Agbabiaka Hammed",
      assessment: "Peerless DevOps Engineer Assessment",
      description:
        "A production-inspired demonstration application showcasing containerization, CI/CD, health monitoring, secure configuration, and deployment automation."
    });
  };

