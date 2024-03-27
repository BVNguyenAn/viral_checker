const { SlashCommandBuilder } = require('@discordjs/builders');
const fs = require('fs');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('clear')
		.setDescription(`clear all video in the list.`),
	async execute(interaction) {
        fs.writeFile('listvideo.json', '[]', (err) => {
          if (err) {
              console.log(err);
          }
          else {
              console.log("File deleted successfully\n");
              interaction.reply(`Deleted all video in the list!`);
          }
        });
        
    }
}