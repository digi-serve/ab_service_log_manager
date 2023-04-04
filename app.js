//
// log_manager
// (AppBuilder) A log manager for various AB operations
//
const AB = require("@digiserve/ab-utils");
const Sentry = require("@sentry/node");
require("@sentry/tracing");

const controller = AB.controller("log_manager");
// controller.afterStartup((cb)=>{ return cb(/* err */) });
// controller.beforeShutdown((cb)=>{ return cb(/* err */) });
controller.init();

const config = AB.config("log_manager");

if (config.sentry) Sentry.init(config.sentry);
