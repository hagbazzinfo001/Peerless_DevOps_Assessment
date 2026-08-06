const companyService = require("../services/companyService");

exports.getCompany = (req, res) => {
  res.status(200).json(companyService.getCompany());
};