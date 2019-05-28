module.exports.logging = (req, res, next) => {
  res.on('finish', () => {
    console.log(JSON.stringify({
      response: {
        statusCode: res.statusCode,
      },
      request: {
        ip: req.ip,
        originalUrl: req.originalUrl,
        method: req.method,
        params: req.params,
        body: req.body,
      },
    }));
  });

  return next();
};
