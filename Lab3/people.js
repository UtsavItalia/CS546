const axios = require("axios");

async function getPeople() {
    //try removing the await keyword and run the application
    let { data } = await axios.get(
        "https://gist.githubusercontent.com/graffixnyc/a1196cbf008e85a8e808dc60d4db7261/raw/9fd0d1a4d7846b19e52ab3551339c5b0b37cac71/people.json",
    );
    // console.dir(data, { depth: null });
    return data;
}

const checkifStringOrExist = (str, name) => {
    if (str == null) {
        throw `\nFunction has not correct parameters.\n`;
    }
    if (typeof str !== "string") {
        throw `\n"${name}" is not a string.\n`;
    }
    if (str.trim().length === 0) {
        throw `\n"${name}" is empty string.\n`;
    }
};

const checkErrorsForSameBirthday = (month, day, name) => {
    if (month == null || day == null) {
        throw `\n${name} has not valid parameters.\n`;
    }
    if (isNaN(parseInt(month))) {
        throw `\n"${month}" is not a number.\n`;
    }
    if (isNaN(parseInt(day))) {
        throw `\n"${day}" is not a number.\n`;
    }
};

const checkValidMonthDays = (month, day) => {
    let months = {
        1: "January",
        2: "February",
        3: "March",
        4: "April",
        5: "May",
        6: "June",
        7: "July",
        8: "August",
        9: "September",
        10: "October",
        11: "November",
        12: "December",
    };
    if (month > 12 || month < 1) {
        throw `\nMonth cannot be greater then 12 or less then 1.\n`;
    }
    if (
        (month == 1 ||
            month == 3 ||
            month == 5 ||
            month == 7 ||
            month == 8 ||
            month == 10 ||
            month == 12) &&
        (day > 31 || day < 1)
    ) {
        throw `\n${months[month]} cannot have more than 31 days or less then 1 days.\n`;
    }
    if (
        (month == 4 || month == 6 || month == 9 || month == 11) &&
        (day < 1 || day > 30)
    ) {
        throw `\n${months[month]} cannot have more than 30 or less then 1 days.\n`;
    }
    if (month == 2 && (day < 1 || day > 28)) {
        throw `\n${months[month]} cannot have more than 28 or less then 1 days, except it's Leap year.\n`;
    }
};

const getPersonById = async (id) => {
    let data = await getPeople();
    checkifStringOrExist(id, "id");
    for (i = 0; i < data.length; i++) {
        if (data[i].id == id) {
            // count += 1;
            // idExist = true;
            return data[i];
        }
    }
    throw `\nPerson not found\n`;
};

const sameStreet = async (streetName, streetSuffix) => {
    checkifStringOrExist(streetName, "streetName");
    checkifStringOrExist(streetSuffix, "streetSuffix");

    let data = await getPeople();
    let dataArr = [];

    for (i = 0; i < data.length; i++) {
        if (
            (data[i].address.home.street_name.toLowerCase() ===
                streetName.toLowerCase() &&
                data[i].address.home.street_suffix.toLowerCase() ===
                    streetSuffix.toLowerCase()) ||
            (data[i].address.work.street_name.toLowerCase() ===
                streetName.toLowerCase() &&
                data[i].address.work.street_suffix.toLowerCase() ===
                    streetSuffix.toLowerCase())
        ) {
            dataArr.push(data[i]);
        }
    }
    if (dataArr.length >= 2) {
        return dataArr;
    } else {
        throw `\nthere are not atleast two people that live or work on same address.\n`;
    }
};

const manipulateSsn = async () => {
    let data = await getPeople();
    let highest = {};
    let lowest = {};
    let finalObj = {};
    let max = Number.MIN_VALUE;
    let min = Number.MAX_VALUE;
    let sum = 0;
    for (i = 0; i < data.length; i++) {
        num = parseInt(
            data[i].ssn.split("-").join("").split("").sort().join(""),
        );
        sum += num;
        if (num > max) {
            max = num;
        }
        if (num < min) {
            min = num;
        }
    }

    let avg;
    avg = Math.floor(sum / data.length);

    for (i = 0; i < data.length; i++) {
        str = data[i].ssn.split("-").join("").split("");
        str.sort();
        str = str.filter((value) => {
            return value > 0;
        });
        num = parseInt(str.join(""));
        if (num == max) {
            highest["firstName"] = data[i].first_name;
            highest["lastName"] = data[i].last_name;
            // console.log(highest);
        }
        if (num == min) {
            lowest["firstName"] = data[i].first_name;
            lowest["lastName"] = data[i].last_name;
            // console.log(lowest);
        }
    }
    finalObj["highest"] = highest;
    finalObj["lowest"] = lowest;
    finalObj["average"] = avg;
    return finalObj;
};

const sameBirthday = async (month, day) => {
    checkErrorsForSameBirthday(month, day, "sameBirthday() function");
    finalArr = [];
    month = parseInt(month);
    day = parseInt(day);
    let data = await getPeople();
    for (i = 0; i < data.length; i++) {
        let sMonth = parseInt(data[i].date_of_birth.split("/")[0]);
        let sDay = parseInt(data[i].date_of_birth.split("/")[1]);
        checkValidMonthDays(month, day, "sameBirthday() function");
        if (month === sMonth && day === sDay) {
            finalArr.push(`${data[i].first_name} ${data[i].last_name}`);
        }
    }
    if (finalArr.length > 0) {
        return finalArr;
    } else {
        throw `No Person Found.`;
    }
};

module.exports = {
    firstName: "Utsav",
    lastName: "Italiya",
    CWID: "10475248",
    getPeople,
    getPersonById,
    sameStreet,
    manipulateSsn,
    sameBirthday,
};
