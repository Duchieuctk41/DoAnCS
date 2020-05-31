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
            $('#txtb1').html('<label id="maso">Mã số sinh viên :</label> <input type="text" id="myInput" name="lop" placeholder="Nhập Mã Số Sinh Viên">')
            $('.caption').css("opacity", 0);
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
            $('.contact-form').css("opacity", 1);
        })
    });
});

function isNumber(n) {
    return /^-?[\d.]+(?:e-?\d+)?$/.test(n);
}
$(document).ready(function() { // Get value on button click and show alert
    $("#myBtn").click(function() {
        var str = $("#myInput").val();
        var thongbao = "Đang lấy thời khóa biểu sinh viên: " + $("#myInput").val();
        alert(thongbao);
        if (isNumber(str) == true) {
            $("table").html('<tr>Thoi Khoa Bieu</tr>')
            $.getJSON(`https://future-attractive-rambutan.glitch.me/?studentID=${str}`, function(data) {
                $.each(data, function(key, val) {
                    $('table').append('<tr><th>' + val["0"] + ' </th><th> ' + val.Sáng + ' </th><th> ' + val.Chiều + ' </th> <th> ' + val.Tối + ' </th><tr>');
                });
            });
            $('body').css('background', '#5c6664');
            $('body').css('color', 'white');
        } else {
            $("table").html('<tr>Thoi Khoa Bieu</tr>')
            $.getJSON(`https://resilient-deluxe-caravan.glitch.me/?classStudentID=${str}`, function(data) {
                $.each(data, function(key, val) {
                    $('table').append('<tr><th>' + val["0"] + ' </th><th> ' + val.Sáng + ' </th><th> ' + val.Chiều + ' </th> <th> ' + val.Tối + ' </th><tr>');
                });
            });
            $('body').css('background', '#5c6664');
            $('table').css('color', 'white');

        }
    });

});