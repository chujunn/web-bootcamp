// new todo
$("input[type='text']").keypress(function(event) {
	if (event.which === 13) {
		var todoText = $(this).val();
		$(this).val("");
		// append new html line to the ul list
		$("ul").append('<li><span><i class="fa fa-trash"></i></span> ' + todoText + '</li>');
	}
});

// complete
// we need to add listener to the parnet of li
$("ul").on("click", "li", function() {
	$(this).toggleClass("completed")
});

// delete
$("ul").on("click", "span", function(event) {
	// span's parent --- 被选中的span对应的那行li
	$(this).parent().fadeOut(500, function() {
		$(this).remove();
	});
	// 防止向外层传播，event仅在这一层奏效
	event.stopPropagation();
});

$(".fa-plus").click(function() {
	$("input[type='text']").fadeToggle();
})