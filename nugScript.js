/*This is a file for everything I, the nug, does just to make
everything easier and I don't need to copy and paste old code
into server.js over and over agian with the fear of data loss*/

var message = {};

var nugScript = {

  setMessage: function(msg) {
    //Sets the message variable to the message object from the Discord.js library
    message = msg;
  }
  senpai: function() {
    message.channel.send({files: [{
      attachment: "https://raw.githubusercontent.com/Cannicide/project-sif/master/senpei.PNG",
      name: "senpei.PNG"
    }]})
  },
  chess: function(challenger, challenged) {
    message.channel.send("feature not ready yet, go bother nug, very big sad");
  }
  
}

//Exports this file as a node module with a nugScript object:
module.exports = nugScript;
