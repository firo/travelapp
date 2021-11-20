require("dotenv").config();
const { App } = require("@slack/bolt");
var new_req_block = require('./blocks/new_req_block.json');

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

// Listens app_mention event and answer with block message
app.event('app_mention', async ({body, event, say}) => {
  console.log('body: ', event);
  await say(new_req_block);
});

// Send back to block the Acknowledge while filling the form
app.action('static_select-action', ({ ack }) => ack());
app.action('datepicker-action', ({ ack }) => ack());

// Listen action event and answe whith messages
app.action('req-submit', async ({ body, ack, say }) => {
  // Acknowledge the action
  await ack();
  await say(`<@${body.user.id}> your travel request is submitted successfully!`);
});

(async () => {
  // Start your app
  await app.start(process.env.PORT || 3000);
  console.log('⚡️ Firo Bolt app is running!');
})();
