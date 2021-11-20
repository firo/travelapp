const { App } = require('@slack/bolt');

/*
This sample slack application uses SocketMode
For the companion getting started setup guide,
see: https://slack.dev/bolt-js/tutorial/getting-started
and for token: https://slack.dev/bolt-js/tutorial/getting-started#tokens-and-installing-apps
*/

// Initializes your app with your bot token and app token
const app = new App({
  token: process.env.SLACK_BOT_TOKEN, // SLACK_BOT_TOKEN=xoxb-<your-bot-token>
  socketMode: true,
  appToken: process.env.SLACK_APP_TOKEN // SLACK_APP_TOKEN=xapp-<your-app-token>
});

(async () => {
  // Start your app
  await app.start(process.env.PORT || 3000);

  console.log('⚡️ Firo Bolt app is running!');
})();
