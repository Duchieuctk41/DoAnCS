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

$(function () {
  var str = '#len'; //increment by 1 up to 1-nelemnts
  $(document).ready(function () {
    var i, stop;
    i = 1;
    stop = 4; //num elements
    setInterval(function () {
      if (i > stop) {
        return;
      }
      $('#len' + (i++)).toggleClass('bounce');
    }, 500)
  });
});
$(function () {
  $(document).ready(function () {
    $('#len1').click(function () {
      $('#title-form').html('Thời Khóa Biểu Sinh Viên');
      $('#txtb1').html('<label id="maso">Mã số sinh viên :</label> <input type="number" id="myInput" name="lop" placeholder="Nhập Mã Số Sinh Viên">')
      $('.caption').css("opacity", 0);
      $('.contact-form').css("z-index", 0);
      $('.contact-form').css("opacity", 1);
    })
  });
});
$(function () {
  $(document).ready(function () {
    $('#len2').click(function () {
      $('#title-form').html('Thời Khóa Biểu Giảng Viên');
      $('#txtb1').html('<label>Mã Số Giảng Viên :</label><div class="body "><div class="select"><select id="myInput" name="lop" class="lop"><option disabled selected value>-- Chọn Giảng Viên --</option><option value="011.034.00028">Trần Thị Phương Linh</option><option value="011.034.00016">Phạm Duy Lộc</option><option value="011.034.00026">Vũ Minh Quan</option><option value="011.034.0001">Thái Duy Quý</option><option value="011.207.00011">Trần Thống</option></select></div></div>');
      $('#myInput').append('');
      $('.caption').css("opacity", 0);
      $('.contact-form').css("z-index", 0);
      $('.contact-form').css("opacity", 1);
    })
  });
})
$(function () {
  $(document).ready(function () {
    $('#len3').click(function () {
      $('#title-form').html('Thời Khóa Biểu Lớp');
      $('#txtb1').html('<label>Mã Lớp :</label><div class="body "><div class="select"><select id="myInput" name="lop" class="lop"><option disabled selected value>-- Chọn Mã Lớp --</option> <option value="CTK40">CTK40</option><option value="CTK41">CTK41</option> <option value="CTK42">CTK42</option> <option value="CTK43">CTK43</option></select></div></div>');
      $('.caption').css("opacity", 0);
      $('.contact-form').css("z-index", 0);
      $('.contact-form').css("opacity", 1);
    })
  });
});

function isNumber(n) {
  return /^-?[\d.]+(?:e-?\d+)?$/.test(n);
}
function isCharacter(n) {
  return /a-z/.test(n);
}
// Get value on button click and show alert
$(document).ready(function () {
  $('#week').html('<option disabled selected value id="">-- Chọn Tuần Học --</option>');
  for (let i = 24; i >= 21; i--) {
    $('#week').append('<option value="' + i + '">' + i + '</option>');
  }
  $("#myBtn").click(function () {
    var mssv = $("#myInput").val();
    var thongbao = "Đang lấy thời khóa biểu, bạn chờ chút nhé <3 ";
    var year = $('select.year').children("option:selected").val();
    var week = $('select.week').children("option:selected").val();
    alert(thongbao);
    $('#thead').html('');
    $("#tbody").html('');
    $.getJSON(`https://absorbing-pollen-diplodocus.glitch.me/?classStudentID=${mssv}&week=${week}&year=${year}&fbclid=IwAR2yoqpKXfgyyx7Hwj4hmeOI6kjOP2OthrzDzoaiTZxDLlxOxbWG25tlNhM`, function (data) {      
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


