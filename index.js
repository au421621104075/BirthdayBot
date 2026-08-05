// // require("dotenv").config();

// // const { addUser, getUsers } = require("./sheets");

// // async function main() {

// //     await addUser({

// //         name: "Ravi",

// //         date: "15",

// //         month: "8",

// //         year: "1999",

// //         relation: "Friend",

// //         phone: "919999999999"

// //     });

// //     const users = await getUsers();

// //     console.log(users);

// // }

// // main();


// // require("dotenv").config();

// // const checkBirthday = require("./birthday");


// // async function test(){

// //     const result = await checkBirthday();


// //     console.log("Today's Birthday:");

// //     console.log(result);

// // }


// // test();

// require("dotenv").config();

// const birthdayMessage = require("./templates");


// console.log(
//     birthdayMessage("Lavanya","Friend")
// );


// // require("dotenv").config();

// // const startWhatsApp = require("./whatsapp");

// // async function main() {
// //     await startWhatsApp();
// // }

// // main();

// require("dotenv").config();

// const startWhatsApp = require("./whatsapp");
// const checkBirthday = require("./birthday");
// const birthdayMessage = require("./templates");



// async function main(){

//     try {

//         const sock = await startWhatsApp();


//         const birthdays = await checkBirthday();


//         for(const person of birthdays){

//             const name = person[0];
//             const relation = person[4];
//             const phone = person[5];


//             const message = birthdayMessage(
//                 name,
//                 relation
//             );


//             await sock.sendMessage(

//                 phone + "@s.whatsapp.net",

//                 {
//                     text: message
//                 }

//             );


//             console.log(
//                 "Birthday wish sent to:",
//                 name
//             );

//         }


//     } catch(error){

//         console.log("Main Error:", error);

//     }

// }


// main();


require("dotenv").config();

const startWhatsApp = require("./whatsapp");
const startScheduler = require("./scheduler");


async function main(){

    try {

        const sock = await startWhatsApp();


        // Start automatic birthday checker
        startScheduler(sock);


        console.log("🎂 Birthday Scheduler Started");


    } catch(error){

        console.log("Main Error:", error);

    }

}


main();