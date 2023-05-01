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

         // optional error
         const { message, stack } = req.param("error") || {
            message: "no message",
            stack: [],
         };
         const error = new Error(message);
         error.stack = stack;

         // Optional Info
         const { serviceKey, user, ...info } = req.param("info") || {
            serviceKey: "no key",
            user: {},
            no: "info",
         };

         try {
            Sentry.setUser(user);
            Sentry.captureException(error, {
               tags: { domain, service: serviceKey },
               contexts: { info },
            });
         } catch (e) {
            req.log("Error sending to Sentry:", e);
            req.log(req.params());
         }
      } else {
         req.log(
            "System notification received, but Sentry not set up",
            req.params()
         );
      }
      cb();
   },
};
