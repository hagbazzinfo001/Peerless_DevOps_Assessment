module.exports = (err, req, res, next) => {
    if (process.env.ENVIRONMENT === "development") {
      console.error(err);
    }
  
    res.status(err.status || 500).json({
      success: false,
      message: err.message || "Internal Server Error",
      timestamp: new Date().toISOString(),
    });
  };