// async function handleCommand(sock, msg, text) {

//     const command = text.toLowerCase();


//     if(command === "hi") {

//         await sock.sendMessage(
//             msg.key.remoteJid,
//             {
//                 text: "Hello 👋 Welcome to Birthday Bot"
//             }
//         );

//     }


//     if(command === "help") {

//         await sock.sendMessage(
//             msg.key.remoteJid,
//             {
//                 text:
// `🎂 Birthday Bot Commands

// hi - Welcome message
// help - Show commands
// birthday - Check birthday`
//             }
//         );

//     }

// }

// module.exports = handleCommand;

const { addUser } = require("./sheets");
const { handleExpenseCommand } = require("./expense");
const handleNewsCommand = require("./news");

async function handleCommand(sock, msg, text, username,phoneNumber) {

    const command = text.toLowerCase();


    if(command === "hi") {

        await sock.sendMessage(
            msg.key.remoteJid,
            {
                text: "Hello 👋 have a nice day !"
            }
        );

    }


    if(command === "help") {

        await sock.sendMessage(
            msg.key.remoteJid,
            {
                text:
`Help commands:

hi - Welcome message

help - Show commands

add - Add birthday user

expense --expense added
week,month ,today
news - Tamil news 
news india - India news 
news world - World news 
news sports - Sports news 
news cinema - Cinema news 
news tech - Technology news 
news business - Business news

Example:
add Lavanya 5 8 2003 Friend 919363130450
expense 250,house,notes
update id,cost,catalogy,notes

`
            }
        );

    }


    // ADD USER COMMAND
    if(command.startsWith("add ")) {


        const data = text.split(" ");


        /*
        add
        name
        date
        month
        year
        relation
        phone
        */


        const user = {

            name: data[1],

            date: data[2],

            month: data[3],

            year: data[4],

            relation: data[5],

            phone: data[6]

        };


        await addUser(user);


        await sock.sendMessage(

            msg.key.remoteJid,

            {
                text:
`✅ Birthday User Added

Name: ${user.name}
Date: ${user.date}-${user.month}-${user.year}
Relation: ${user.relation}`
            }

        );


        console.log("User Added:", user);

    }

  // Expense Commands
    if (
        command.startsWith("expense") ||
        command.toLowerCase().startsWith("update") ||
        command === "today" ||
        command === "week" ||
        command === "month"
    ) {
        return await handleExpenseCommand(sock, msg, text, username,phoneNumber);
    }


    // News Commands
if (
    command === "news" ||
    command.startsWith("news ")
) {
    return await handleNewsCommand(sock, msg, text);
}


}


module.exports = handleCommand;

