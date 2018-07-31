'use strict';

let host = 'localhost';

if (process.env.THORNEY_HOST == 'thorney') {
  host = process.env.THORNEY_HOST;
}

// Configure the proxy route, this should point to
// where your back end application runs
module.exports = {
  localhost: {
    default: {
      host: host,
      port: 5401
    }
  },
  'beta.parliament.uk': {
    default: {
      host: "localhost",
      port: 5401
    }
  }
}
