$(document).ready(function() {
	$(function() {
		allmodal = document.querySelectorAll('.modal-calendar');
		$.each(allmodal, function(index, val) {
			id = $(val).attr('id');
			$("#"+id).iziModal();
		});
	});
	$(document).on('click', '.trigger', function (event) {
		event.preventDefault();
		idmodal = $(this).attr("data-izimodal-open");
		$(idmodal).iziModal('open');
	});
});