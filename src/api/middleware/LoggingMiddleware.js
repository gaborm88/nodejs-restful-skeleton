export default class LoggingMiddleware {
  
  addLogging(req, res, next) {
    res.on('finish', () => {
      console.log('req', JSON.stringify({
        request: {ip: req.ip,
        originalUrl: req.originalUrl,
        method: req.method,
        params: req.params,
        body: req.body,
        },
        response: {
          statusCode: res.statusCode,
        }
      }));
    });
    

    return next();
  }
}
