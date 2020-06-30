const express = require('express');
const app = express();
const port = 3001;
const bodyParser = require("body-parser");
const tabletojson = require("tabletojson").Tabletojson;
const path = require('path')

const sinhVienRouter = require('./routes/sinhvien.router');

const axios = require('axios');

var createError = require('http-errors')


const { google } = require('googleapis');
const { OAuth2 } = google.auth

const oAuth2Client = new OAuth2(
    '1007415910453-06nursel0aq27o8fbroldl6l2md5vej8.apps.googleusercontent.com',
    '-5gchwOiP3i2wTKDodysPYNb'
)

oAuth2Client.setCredentials({
    refresh_token: '1//04pU5l9cvE0IPCgYIARAAGAQSNwF-L9IrV_QuX1Hb1ywFAxgD9LmBUohR4fdsd-gmK0a5poqo7oDnfiUk22NvyJEAMmx1yMDtBaU',
})

const calendar = google.calendar({ version: "v3", auth: oAuth2Client })

const fs = require('fs');

let events = [];


app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine', 'ejs');
app.set('views', './views');


app.use(sinhVienRouter);

app.post('/survey', function(req, res) {
    let ms = req.body.lop;
    let year = req.body.year;
    let week = req.body.week;
    console.log(ms, year, week);

    if (isNumber(ms) == true) {
        getAPI(ms);
        // pushSchedule(ms);
    } else {
        getSchedule(ms, year, week);
    }

    res.render('./direct');
});

function isNumber(n) {
    return /^-?[\d.]+(?:e-?\d+)?$/.test(n);
}

function setTime(date, a) {
    date.setHours(a);
    date.setMinutes(0);
    date.setSeconds(0);
}

function checkDay(result, i, a, date) {
    if (result[i]['0'] == 'Thứ ' + a) {
        if (result[i]['Sáng'] != '') {
            setTime(date, 7);
        }
        if (result[i]['Chiều'] != '') {
            setTime(date, 13);
        }
        if (result[i]['Tối'] != '') {
            setTime(date, 4);
        }
        events.push(setOfEvent(date));
        console.log(date);
    } else {
        events.push(setOfEvent(date));
    }
    return events;
}

function returnMorning(result, i, b, date) {
    if (result[i].Sáng != '') {

        var res = result[i].Sáng.replace("-Môn", `\nSáng`);
        res = res.split("-Nhóm");
        events[b].summary += res[0];
        console.log(res[0]);

    } else {
        events[b].summary += "";
    }
    return events, date;
}

function returnNoon(result, i, b) {
    if (result[i].Chiều != '') {
        var res = result[i].Chiều.replace("-Môn", `\nChiều`);
        res = res.split("-Nhóm");
        events[b].summary += res[0];

    } else {
        events[b].summary += "";
    }
    return events;
}

function returnEvening(result, i, b) {
    if (result[i].Tối != '') {
        var res = result[i].Tối.replace("-Môn", "\nTối");
        res = res.split("-Nhóm");
        events[b].summary += res[0];

    } else {
        events[b].summary += "";
    }
    return events;
}

function setOfEvent(dateTime1) {
    let event = {
        "summary": "",
        "location": "KTX Dai Hoc Da Lat",
        "start": {
            "dateTime": dateTime1,
            "timeZone": 'America/Denver',
        },
        "end": {
            "dateTime": dateTime1,
            "timeZone": 'America/Denver',
        }
    }
    return event;
}





function run(i) {
    if (events[i].summary == '') {
        return console.log("nothing today");
    }
    calendar.events.insert({
            calendarId: 'primary',
            resource: events[i]
        },
        err => {
            if (err) return console.error('Calendar Event Creation Error:', err)

            return console.log('Calendar Event Created.')
        }
    );
}

function getAPI(ms) {
    axios.get(`https://future-attractive-rambutan.glitch.me/?studentID=${ms}`)
        .then(function(response) {
            console.log(response.data);
            var result = response.data;
            let a = 2;
            let b = 0;
            for (let i = 1; i < 8; i++) {
                let date = new Date();
                date.setDate(date.getDate() - date.getDay() + b + 1);
                checkDay(result, i, a, date);
                returnMorning(result, i, b);
                returnNoon(result, i, b);
                returnEvening(result, i, b);
                run(b);
                b++;
                a++;
            }
        })
        .catch(function(error) {
            console.log(error);
        })
}

app.listen(port, function() {
    console.log('Server listening on port' + port);
});

function getSchedule(ms, year, week) {
    var url = `http://qlgd.dlu.edu.vn/public/DrawingClassStudentSchedules_Mau2?YearStudy=2019-${year}&TermID=HK02&Week=${week}&ClassStudentID=${ms}`;
    return new Promise(resolve => {
        tabletojson.convertUrl(url, { useFirstRowForHeadings: true }, function(
            tablesAsJson) {
            var result = tablesAsJson[0];
            let a = 2;
            let b = 0;
            for (let i = 1; i < 8; i++) {
                let date = new Date();
                date.setDate(date.getDate() - date.getDay() + b + 1);
                checkDay(result, i, a, date);
                returnMorning(result, i, b);
                returnNoon(result, i, b);
                returnEvening(result, i, b);
                run(b);
                b++;
                a++;
            }
            console.log(result);
            resolve(result);
        });
    });
}
///////////////////////////////////
function pushSchedule(ms) {
    axios.get(`https://future-attractive-rambutan.glitch.me/?studentID=${ms}`)
        .then(function(response) {
            var result = response.data;
            for (let i = 0; i < 7; i++) {
                alarmMorning(result, i);
                run(i);
            }
            console.log(events);

        })
        .catch(function(error) {
            console.log(error);
        })
}



function pushEvent(datetime) {
    let event = {
        "summary": "",
        "location": "KTX Dai Hoc Da Lat",
        "start": {
            "dateTime": datetime,
            "timeZone": 'America/Denver',
        },
        "end": {
            "dateTime": datetime,
            "timeZone": 'America/Denver',
        }
    }
    return event;
}
var day = new Date();

function setDayforWeekend(day, a, i) {
    day.setDate(day.getDate() - day.getDay() + i + 1);
    day.setHours(a);
    day.setMinutes(0);
    day.setSeconds(0);
    events.push(pushEvent(day));
    return day;
}

function alarmMorning(result, i) {
    if (result[i + 1]['Sáng'] != '') {
        var res = result[i + 1]['Sáng'].replace("-Môn:", "");

        res = res.split("-Nhóm");
        setDayforWeekend(day, 6, i)
        events[i]['summary'] += res[1];
    } else {
        setDayforWeekend(day, 6, i);
    }
    return events;
}
