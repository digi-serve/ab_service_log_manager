//
// log_manager
// (AppBuilder) A log manager for various AB operations
//
const AB = require("@digiserve/ab-utils");
const { version } = require("./package");

AB.initSetry({
   dsn: "https://2c6d39a4a232e87591840bcf3d8ca948@o144358.ingest.sentry.io/4505945305120768",
   release: version,
});

const controller = AB.controller("log_manager");
// controller.afterStartup((cb)=>{ return cb(/* err */) });
// controller.beforeShutdown((cb)=>{ return cb(/* err */) });
controller.init();

if (process.env.SENTRY_ENABLED) {
   const config = AB.config("log_manager");
   if (config.sentry) Sentry.init(config.sentry);
}
