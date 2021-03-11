//
// log_manager
// (AppBuilder) A log manager for various AB operations
//
const AB = require("ab-utils");

var controller = AB.controller("log_manager");
// controller.afterStartup((cb)=>{ return cb(/* err */) });
// controller.beforeShutdown((cb)=>{ return cb(/* err */) });
controller.init();
