// app.js - Slack Application

const { App } = require('@slack/bolt');

// Initialize Bolt app, using the default HTTPReceiver
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  customRoutes: [
    {
      path: '/health-check',
      method: ['GET'],
      handler: (req, res) => {
        res.writeHead(200);
        res.end('Health check information displayed here!');
      },
    },
  ],
});

(async () => {
  await app.start();
  console.log('⚡️ Travel app started');
})();
