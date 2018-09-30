exports.addDate = (req, res, next) => {
  req.body.date = Date.now();
  next();
};
