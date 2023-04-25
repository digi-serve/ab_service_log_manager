/*
 * log_manager
 */
function env(envKey, defaultValue) {
   if (typeof process.env[envKey] == "undefined") {
      return defaultValue;
   }
   try {
      return JSON.parse(process.env[envKey]);
   } catch (e) {
      console.log(e);
      console.log(process.env[envKey]);
      return process.env[envKey];
   }
}

module.exports = {
   log_manager: {
      /*************************************************************************/
      /* enable: {bool} is this service active?                                */
      /*************************************************************************/
      enable: env("LOG_MANAGER_ENABLE", true),

      sentry: {
         dns: env("SENTRY_DNS", "sentry.url.here"),
         sampleRate: env("SENTRY_SAMPLE_RATE", 1.0),
         serverName: env("SENTRY_SERVER_NAME", "AppBuilder"),
      },
   },

   /**
    * datastores:
    * Sails style DB connection settings
    */
   datastores: {
      appbuilder: {
         adapter: "sails-mysql",
         host: env("MYSQL_HOST", "db"),
         port: env("MYSQL_PORT", 3306),
         user: env("MYSQL_USER", "root"),
         password: process.env.MYSQL_PASSWORD,
         database: env("MYSQL_DBPREFIX", "appbuilder"),
      },
      site: {
         adapter: "sails-mysql",
         host: env("MYSQL_HOST", "db"),
         port: env("MYSQL_PORT", 3306),
         user: env("MYSQL_USER", "root"),
         password: process.env.MYSQL_PASSWORD,
         database: env("MYSQL_DBADMIN", "appbuilder-admin"),
      },
   },
};
