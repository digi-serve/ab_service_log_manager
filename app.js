//
// log_manager
// (AppBuilder) A log manager for various AB operations
//
const AB = require("@digiserve/ab-utils");

if(process.env.SENTRY_DSN){
   const { version } = require("./package");
   AB.telemetry().init({
      dsn: process.env.SENTRY_DSN,
      release: version,
   });
}

const controller = AB.controller("log_manager");
// controller.afterStartup((cb)=>{ return cb(/* err */) });
// controller.beforeShutdown((cb)=>{ return cb(/* err */) });
controller.init();
