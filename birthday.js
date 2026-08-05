const { getUsers } = require("./sheets");


async function checkBirthday() {

    const users = await getUsers();


    const today = new Date();


    const currentDate = today.getDate().toString();

    const currentMonth = (today.getMonth() + 1).toString();



    const birthdays = users.filter(user => {

        const date = user[1];
        const month = user[2];


        return (
            date === currentDate &&
            month === currentMonth
        );

    });


    return birthdays;

}


module.exports = checkBirthday;