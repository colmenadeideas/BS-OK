function doctorLoadDetails() {

	template = document.getElementById("item-details").firstChild.textContent;
	var currentHash = window.location.hash;
	var id = currentHash.split("/");
	var context = $.getJSON(URL + "api/doctor/json/" + id[2], function(data) {
		//console.log(data);

		var context = data;
		$('#doc-details').html(Mark.up(template, context));

		//Activate Rating
		$(".rating").rating();	
			
		bookingform();
		bookingSteps();
		day();
		console.log(context['doctors']['0']['practice']['0']['schedule']['0']['quota']);

	});
	
	//Build Other views
	

}

function bookingform() {	
	//Step 1 
	$('#reasons-loop').carouFredSel({
		width: "100%",
		height:500,
		items: 3,
		scroll: 1,
		auto: {
			play: false,
		},		
		prev: '#handler-back-reason',
		next: '#handler-fowr-reason',
	});

	//Step3



	
//jQuery time
var current_fs, next_fs, previous_fs; //fieldsets
var left, opacity, scale; //fieldset properties which we will animate
var animating; //flag to prevent quick multi-click glitches

$(".next").click(function(){
	if(animating) return false;
	animating = true;
	
	current_fs = $(this).parent();
	next_fs = $(this).parent().next();
	
	//activate next step on progressbar using the index of next_fs
	$("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");
	
	//show the next fieldset
	next_fs.show(); 
	current_fs.removeClass('activestep');
	next_fs.addClass('activestep');
	
	//hide the current fieldset with style
	current_fs.animate({opacity: 0}, {
		step: function(now, mx) {
			//as the opacity of current_fs reduces to 0 - stored in "now"
			//1. scale current_fs down to 80%
			//scale = 1 - (1 - now) * 0.2;
			scale = 1;
			//2. bring next_fs from the right(50%)
			left = (now * 50)+"%";
			//3. increase opacity of next_fs to 1 as it moves in
			opacity = 1 - now;
			current_fs.css({'transform': 'scale('+scale+')'});
			//next_fs.css({'left': left, 'opacity': opacity});
			next_fs.css({'opacity': opacity});
		}, 
		duration: 800, 
		complete: function(){
			current_fs.hide();
			animating = false;
		}, 
		//this comes from the custom easing plugin
		easing: 'easeInOutBack'
	});
});

$(".previous").click(function(){
	if(animating) return false;
	animating = true;
	
	current_fs = $(this).parent();
	previous_fs = $(this).parent().prev();
	
	//de-activate current step on progressbar
	$("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");
	
	//show the previous fieldset
	previous_fs.show(); 
	current_fs.removeClass('activestep');
	previous_fs.addClass('activestep');
	
	//hide the current fieldset with style
	current_fs.animate({opacity: 0}, {
		step: function(now, mx) {
			//as the opacity of current_fs reduces to 0 - stored in "now"
			//1. scale previous_fs from 80% to 100%
			scale = 0.8 + (1 - now) * 0.2;
			//2. take current_fs to the right(50%) - from 0%
			left = ((1-now) * 50)+"%";
			//3. increase opacity of previous_fs to 1 as it moves in
			opacity = 1 - now;
			//current_fs.css({'left': left});
			previous_fs.css({'transform': 'scale('+scale+')', 'opacity': opacity});
		}, 
		duration: 800, 
		complete: function(){
			current_fs.hide();
			animating = false;
		}, 
		//this comes from the custom easing plugin
		easing: 'easeInOutBack'
	});
});

$(".submit").click(function(){
	return false;
});

}


function bookingSteps() {

	data = 'La data tiene que ser configurada';
	console.log(data);
	$('#calendar').datepicker({
		inline: true,
		firstDay: 1,
		showOtherMonths: true,
		dayNamesMin: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab' ],
		timeFormat: 'yyy-dd-mm HH:MM:ss'
	});

	$('.reason-book').children('button').click(function (){
		var reason = $(this).text();
		$('.progressbar').children('li:nth-child(1)').text(reason)
		$('#reason').text(reason);
		$('.reason-book').animate({
			margin: "500px 0 0",
			opacity: 0,
		},
		{
	 	duration: 400,
	 	complete: function(){
	 		$(this).hide();
	 		$(this).css('margin', "0")
			$('#step2').removeClass('hidden').css('opacity', '0');
			$('#practices-loop').carouFredSel({
				width: "100%",
				height:500,
				items: 3,
				scroll: 1,
				auto: {
					play: false,
				},
				prev: '#handler-back-practice',
				next: '#handler-fowr-practice',
			});
			$('body').scrollTop($('body').height());
			$('#step2').animate({opacity: 1, margin: '0'});
			$('.progressbar').children('li:nth-child(1)').attr('class','active');
			$('.progressbar').children('li:nth-child(2)').attr('class','s-active');
	 	}
	 });
	});

	$('.practice-item').click(function (){
		var clinic = $(this).children('h4').text();
		$('.progressbar').children('li:nth-child(2)').text(clinic)
		$('#clinic').text(clinic);
		$('#step2').animate({
			height: "400px",
			opacity:0,
		},
		{
			duration: 400,
			complete: function()
			{
				$(this).hide();
				$('.step3').removeClass('hidden').css('opacity', '0');
				$('#calendar-loop').carouFredSel({
					width: "100%",
					height:250,
					items: 3,
					scroll: 1,
					auto: {
						play: false,
					},
					
					prev: '#handler-back-cal',
					next: '#handler-fowr-cal',
				});
				$('body').scrollTop($('body').height());
				$('.step3').animate({opacity: 1, margin: '0'});
				$('.progressbar').children('li:nth-child(2)').attr('class','active');
				$('.progressbar').children('li:nth-child(3)').attr('class','s-active');
			}
		})
	});
	$('.calendar-item').click(function(){
		var dayName = $(this).children('h5:nth-child(1)').text();
		var day = $(this).children('h4').text();
		var my = $(this).children('h5:nth-child(3)').text();
		$('.current-day').html(dayName+"  "+day+ " <br>"+my);
		$('.hcontainer').removeClass('hidden').css('opacity', '0').animate({opacity: 1, margin: 'auto'});
		$('body').scrollTop($('body').height());

	});
	$('.hcontainer').click(function(){
		$('.progressbar').children('li:nth-child(3)').attr('class','active');
		$('.step3').fadeOut(400);
		var date = $('.current-day').text();
		$('.progressbar').children('li:nth-child(3)').text(date);

		$('#date').text(date);
		$('.progressbar').fadeOut(400);
		$('.finish').fadeIn(400);

	})
	
}




