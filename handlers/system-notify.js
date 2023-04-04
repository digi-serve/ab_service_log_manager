/**
 * system-notify
 * our Request handler.
 */
const Sentry = require("@sentry/node");
const AB = require("@digiserve/ab-utils");
const config = AB.config("log_manager");

module.exports = {
   /**
    * Key: the cote message key we respond to.
    */
   key: "log_manager.notification",

   inputValidation: {
      domain: { string: true, required: true },
      error: { optional: true },
      info: { object: true, optional: true },
      callStack: { optional: true },
   },

   /**
    * fn
    * our Request handler.
    * @param {obj} req
    *        the request object sent by the
    *        api_sails/api/controllers/log_manager/rowlog-find.
    * @param {fn} cb
    *        a node style callback(err, results) to send data when job is finished
    */
   fn: function handler(req, cb) {
      req.log("log_manager.notification");
      if (config.sentry) {
         const domain = req.param("domain");
         const { message, stack } = req.param("error");
         const error = new Error(message);
         error.stack = stack;
         const { serviceKey, user, ...info } = req.param("info");
         Sentry.setUser(user);
         Sentry.captureException(error, {
            tags: { domain, service: serviceKey },
            contexts: { info },
         });
      } else {
         console.log(
            "System notification received, but Sentry not set up",
            req.params()
         );
      }
      cb();
   },
};
