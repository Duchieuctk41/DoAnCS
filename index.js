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
    let str = req.body.lop;
    console.log(str);
    getAPI(str);
    res.render('./direct');
});


function checkDay(result, i, a, date) {
    if (result[i]['0'] == 'Thứ ' + a) {
        events.push(setOfEvent(date));
    } else {
        events.push(setOfEvent(date));
    }
    return events;
}

function returnMorning(result, i, b) {
    if (result[i].Sáng != '') {
        var res = result[i].Sáng.replace("-Môn", "Sáng");
        res = res.split("-Tiết");
        events[b].summary += res[0];
    } else {
        events[b].summary += "";
    }
    return events;
}

function returnNoon(result, i, b) {
    if (result[i].Chiều != '') {
        var res = result[i].Chiều.replace("-Môn", `\nChiều`);
        res = res.split("-Tiết");
        events[b].summary += res[0];
    } else {
        events[b].summary += "";
    }
    return events;
}

function returnEvening(result, i, b) {
    if (result[i].Tối != '') {
        var res = result[i].Tối.replace("-Môn", "\nTối");
        res = res.split("-Tiết");
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

function getAPI(str) {
    axios.get(`https://future-attractive-rambutan.glitch.me/?studentID=${str}`)
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

function getSchedule(str) {
    const url = `https://future-attractive-rambutan.glitch.me/?studentID=${str}`;
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
                // run(b);
                b++;
                a++;
            }
            var finaresult = JSON.stringify(result);
            fs.writeFileSync('json_demo.json', finaresult, err => {
                if (err) throw err;
            });
            console.log(result);
            resolve(result);
        });
    });
}