const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    //toggle Nav
    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');

        //Animate link
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
            console.log(index / 5);
        });
        //burger animation
        burger.classList.toggle('toggle');
    });
}
navSlide();

$(function() {
    var str = '#len'; //increment by 1 up to 1-nelemnts
    $(document).ready(function() {
        var i, stop;
        i = 1;
        stop = 4; //num elements
        setInterval(function() {
            if (i > stop) {
                return;
            }
            $('#len' + (i++)).toggleClass('bounce');
        }, 500)
    });
});
$(function() {
    $(document).ready(function() {
        $('#len1').click(function() {
            $('#title-form').html('Thời Khóa Biểu Sinh Viên');
            $('#txtb1').html('<label id="maso">Mã số sinh viên :</label> <input type="number" id="myInput" name="lop" placeholder="Nhập Mã Số Sinh Viên">')
            $('.caption').css("opacity", 0);
            $('.contact-form').css("z-index", 0);
            $('.contact-form').css("opacity", 1);
        })
    });
});
$(function() {
    $(document).ready(function() {
        $('#len2').click(function() {
            $('#title-form').html('Thời Khóa Biểu Giảng Viên');
            $('#txtb1').html('<label id="maso">Mã số giảng viên :</label> <input type="text" id="myInput" name="lop" placeholder="Nhập Mã Số Giảng Viên">');
            $('.caption').css("opacity", 0);
            $('.contact-form').css("z-index", 0);
            $('.contact-form').css("opacity", 1);
        })
    });
})
$(function() {
    $(document).ready(function() {
        $('#len3').click(function() {
            $('#title-form').html('Thời Khóa Biểu Lớp');
            $('#txtb1').html('<label>Mã Lớp :</label><div class="body "><div class="select"><select id="myInput" name="lop" class="lop"><option disabled selected value>-- Chọn Mã Lớp --</option> <option value="CTK40">CTK40</option><option value="CTK41">CTK41</option> <option value="CTK42">CTK42</option> <option value="CTK43">CTK43</option></select></div></div>')
            $('.caption').css("opacity", 0);
            $('.contact-form').css("z-index", 0);
            $('.contact-form').css("opacity", 1);
        })
    });
});

function isNumber(n) {
    return /^-?[\d.]+(?:e-?\d+)?$/.test(n);
}
// Get value on button click and show alert
$(document).ready(function () { 

    
    $("#myBtn").click(function() {
        var mssv = $("#myInput").val();
      var thongbao = "Đang lấy thời khóa biểu sinh viên: " + $("#myInput").val();
      var year = $('select.year').children("option:selected").val();
      var week = $('select.week').children("option:selected").val();

        $('#thead').html('');
          $("#tbody").html('');
        $.getJSON(`https://absorbing-pollen-diplodocus.glitch.me/?classStudentID=${mssv}&YearStudy=${year}&week=${week}&fbclid=IwAR18tz9MzAPu8Li2HMIcrBE7DgOpxdRhrC9UC6PzS-bfcDY0MScPnsKDWaU`, function(data) {
              $.each(data, function (key, val) {
                let sang = ' ';
                let chieu = ' ';
                let toi = ' ';
                let weekend = 'weekend';
                if (val[0] !== '') {
                  weekend = val[0];
                }
                  if (val.Sáng !== "") {
                    sang = val.Sáng;
                    sang = sang.split("tiết");
                }
                if (val.Chiều !== "") {
                  chieu = val.Chiều;
                  chieu = chieu.split("tiết");
                }
                if (val.Tối !== "") {
                  toi = val.Tối;
                  toi = toi.split("tiết");
                }
                $('#tbody').append('<tr class="row100 head"><th class="cell100 column1">' + weekend + '</th><td class="cell100 column2">' + sang[0] + '</td><td class="cell100 column3">' + chieu[0] + '</td><td class="cell100 column4">' + toi[0] + '</td> </tr>')
                });
            });
    });
});
