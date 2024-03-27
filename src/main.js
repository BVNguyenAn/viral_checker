const { Client, GatewayIntentBits, Events } = require('discord.js')
require('dotenv').config()
const commands_init = require('./utils/commands_init')
const events_init = require ('./utils/events_init')
const register_guild = require('./utils/register_guild')
const register_app = require('./utils/register_app')
const { Webhook, MessageBuilder } = require('discord-webhook-node');
const cheerio = require('cheerio')
const axios = require('axios')
const videoid = require('../listvideo.json')
const MESSAGE_DELAY = 10 * 60 * 1000;
const webhook = new Webhook('https://discord.com/api/webhooks/1222575715195813898/zw8ww7ts9JE3MGwfgEmXLqWq6NZAFJdoP20aQKq6fwexEN16CIH_QwdQnAJ0Remw9HtD');
let i = 1
const client = new Client({ 
   intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
      GatewayIntentBits.GuildMembers ] 
   });

commands_init(client);
events_init(client);

client.login(`${process.env.TOKEN}`);

client.once(Events.ClientReady, (client)=>{
   /* Uncomment to register commands on the server */

   register_guild(client, commands_init(client)); //register commands to guild (paste guild id to .env)
   // register_app(client, commands_init(client)); //register commands to app (global)
})

 function getVideo(id){
   try{
// Define the URL
const url = `https://tiktok.livecounts.io/video/stats/${id}`;

// Define the request headers
const headers = {
    'authority': 'tiktok.livecounts.io',
    'method': 'GET',
    'path': `/video/stats/${id}`,
    'scheme': 'https',
    'Accept': '*/*',
    'Accept-Encoding': 'gzip, deflate, br, zstd',
    'Accept-Language': 'vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5',
    'If-None-Match': 'W/"67-a993jDFIEk9wKxtUo1TnhvWd030"',
    'Origin': 'https://tokcounter.com',
    'Referer': 'https://tokcounter.com/',
    'Sec-Ch-Ua': '"Google Chrome";v="123", "Not:A-Brand";v="8", "Chromium";v="123"',
    'Sec-Ch-Ua-Mobile': '?0',
    'Sec-Ch-Ua-Platform': '"Windows"',
    'Sec-Fetch-Dest': 'empty',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Site': 'cross-site',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36'
};

// Make a GET request using Axios
axios.get(url, { headers })
    .then(response => {
        // Handle the response data
        console.log('Response:', response.data.viewCount);
        const embed = new MessageBuilder()
        .setTitle(`Video ${id}`)
        .setURL(`https://tokcounter.com/tiktok-live-view-counter?id=${id}`)
        .addField('View:', `${response.data.viewCount}`, true)
        .addField('Like', `${response.data.likeCount}`, true)
        .setColor('#00b0f4')
        .setDescription('viral tracker')
        .setTimestamp();

        webhook.send(embed).then(() => console.log('Sent webhook')).catch((err) => console.error(err));
        return response.data;
    })
    .catch(error => {
        // Handle errors
        console.error('Error:', error);
    });
   }catch(err){
      console.log(err);
   }
}
const getViewFunc = () => {
   if(videoid.length === 0) return console.log('No video to check')
   else{
      videoid.forEach((id) => {
         getVideo(id);
      });
}
   
}
getViewFunc();

setInterval(() => {
   getViewFunc();
   console.log(`${i}. check again`);
   i++; // Increment i
},  MESSAGE_DELAY ); // 5 minute in milliseconds
