const cron = require("node-cron");

const checkBirthday = require("./birthday");
const birthdayMessage = require("./templates");


function startScheduler(sock){


    cron.schedule("10 11 * * *", async ()=>{


        console.log("Checking birthdays...");


        const birthdays = await checkBirthday();


        for(const person of birthdays){


            const name = person[0];
            const relation = person[4];
            const phone = person[5];


            const message = birthdayMessage(
                name,
                relation
            );


            await sock.sendMessage(

                phone + "@s.whatsapp.net",

                {
                    text: message
                }

            );


            console.log(
                "Auto wish sent:",
                name
            );


        }


    });


}


module.exports = startScheduler;