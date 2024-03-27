const { SlashCommandBuilder } = require('@discordjs/builders');
const fs = require('fs');
const videoid = require('../../listvideo.json')

const ListID = videoid;
module.exports = {
	data: new SlashCommandBuilder()
		.setName('add')
		.setDescription(`Says hello @user.`)
      .addStringOption(option => option.setName('url').setDescription('The video link').setRequired(true)),
	async execute(interaction) {
      const linkVideo = interaction.options.getString('url');
      if(linkVideo.split('/')[2] !== 'www.tiktok.com'){
        interaction.reply(`This is not a valid tiktok link!`);
        return;
      }
      const id = linkVideo.split('/')[5]
      if(videoid.includes(id)){
        interaction.reply(`This video is already in the list!`);
        return;
      }
      interaction.reply(`Added video with id ${id}!`);
      ListID.push(id);


        const jsonID = JSON.stringify(ListID);
        fs.writeFileSync('listvideo.json', jsonID, (err) => {
          if (err) {
              console.log(err);
          }
          else {
              console.log("File written successfully\n");
          }
        
    });



    
}
}
