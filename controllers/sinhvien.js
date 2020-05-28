module.exports.getDanhSach = async(req, res, next) => {
        return res.render('./tkb');
        // return res.render('./index');


    }
    // app.get("/", async(req, res) => {
    //     console.log(req.query.week, req.query.classID);
    //     let data = await getSchedule(req.query.week, req.query.classID);
    //     res.json(data);
    // });