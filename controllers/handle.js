const tabletojson = require("tabletojson").Tabletojson;

function getSchedule(classId) {
    const url = ` http://qlgd.dlu.edu.vn/public/DrawingClassStudentSchedules_Mau2?YearStudy=2019-2020&TermID=HK02&Week=21&ClassStudentID=${classId}&t=0.4292294353406918`;
    return new Promise(resolve => {

        tabletojson.convertUrl(url, { useFirstRowForHeadings: true }, function(
            tablesAsJson) {
            var result = tablesAsJson[0];
            resolve(result);
        });
    });
}

module.exports.getSchedule = async(req, res) => {
    console.log(req.query.classID);
    let data = await getSchedule(req.query.classID);
    res.json(data);
};