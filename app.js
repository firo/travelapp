require("dotenv").config();
const { App } = require("@slack/bolt");
var new_req_block = require('./blocks/new_req_block.json');
let message; // Store message

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

// Listens to reactio  "white_check_mark" and say "Your travel is approved!"
app.event('reaction_added', ({body, event, say}) => {
  if (event.reaction == 'white_check_mark' ){
    fetchMessage(event.item.channel, event.item.ts, function(res) {
      console.log('response: '+ res);
      say(`<@${event.user}> Your travel is approved!`);
    });
  }

});

// Fetch conversation history using the ID and a TS from the last example
async function fetchMessage(id, ts, callback) {
  try {
    // Call the conversations.history method using the built-in WebClient
    const result = await app.client.conversations.history({
      // The token you used to initialize your app
      token: process.env.SLACK_BOT_TOKEN,
      channel: id,
      // In a more realistic app, you may store ts data in a db
      latest: ts,
      // Limit results
      inclusive: true,
      limit: 1
    });

    message = result.messages[0];
    console.log('retrive result: ' + JSON.stringify(result));
    return callback(message.blocks[1].elements[0].value);
  }
  catch (error) {
    console.error(error);
  }
}

(async () => {
  const port = 3000
  // Start your app
  await app.start(process.env.PORT || port);
  console.log('⚡️ Firo Bolt app is running on port ${ PORT }!');
})();
