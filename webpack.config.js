const path = require('path');

module.exports = {
  // ... (أي إعدادات أخرى لديك)

  resolve: {
    fallback: {
      "stream": require.resolve("stream-browserify"),
      "crypto": require.resolve("crypto-browserify"),
      "http": require.resolve("stream-http"),
      "https": require.resolve("https-browserify"),
      "zlib": require.resolve("browserify-zlib"),
      "os": require.resolve("os-browserify/browser"),
      "net": require.resolve("net-browserify"),
      "tls": require.resolve("tls-browserify"),
      "child_process": require.resolve("child_process-browserify"),
      "dns": require.resolve("dns-browserify"),
      "fs": false
    }
  },

  module: {
    rules: [
      // ... (أي قواعد أخرى لديك)
      {
        test: /bcryptjs/,
        resolve: {
          fallback: {
            "crypto": require.resolve("crypto-browserify"),
            "stream": require.resolve("stream-browserify"),
          }
        }
      },
      {
        test: /nodemailer/,
        resolve: {
          fallback: {
            "stream": require.resolve("stream-browserify"),
            "crypto": require.resolve("crypto-browserify"),
            "http": require.resolve("stream-http"),
            "https": require.resolve("https-browserify"),
            "zlib": require.resolve("browserify-zlib"),
            "os": require.resolve("os-browserify/browser"),
            "net": require.resolve("net-browserify"),
            "tls": require.resolve("tls-browserify"),
            "child_process": require.resolve("child_process-browserify"),
            "dns": require.resolve("dns-browserify"),
            "fs": false
          }
        }
      }
    ]
  }
};
