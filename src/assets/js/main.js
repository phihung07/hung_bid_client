"user strict";

$(document).ready(function () {

	/* Tab Section Js area */
	$(".header-bar").on("click", function (e) {
		$(".main-menu, .header-bar").toggleClass("active");
	});
	$(".main-menu li a").on("click", function (e) {
		var element = $(this).parent("li");
		if (element.hasClass("open")) {
			element.removeClass("open");
			element.find("li").removeClass("open");
			element.find("ul").slideUp(300, "swing");
		} else {
			element.addClass("open");
			element.children("ul").slideDown(300, "swing");
			element.siblings("li").children("ul").slideUp(300, "swing");
			element.siblings("li").removeClass("open");
			element.siblings("li").find("li").removeClass("open");
			element.siblings("li").find("ul").slideUp(300, "swing");
		}
	});
	//menu top fixed start
	var fixed_top = $(".header-section");
	$(window).on("scroll", function () {
		if ($(this).scrollTop() > 220) {
			fixed_top.addClass("menu-fixed animated fadeInDown");
			fixed_top.removeClass("slideInUp");
			$("body").addClass("body-padding");
		} else {
			fixed_top.removeClass("menu-fixed fadeInDown");
			fixed_top.addClass("slideInUp");
			$("body").removeClass("body-padding");
		}
	});

	/*-- Scroll Top Bottom End--*/
	let calcScrollValue = () => {
		let scrollProgress = document.getElementById("progress");
		if(!scrollProgress?.style){
			return
		}
		let progressValue = document.getElementById("valu");
		let pos = document.documentElement.scrollTop;
		let calcHeight =
		document.documentElement.scrollHeight - 
		document.documentElement.clientHeight;
		let scrollValue = Math.round((pos * 250) / calcHeight);
	
		if (pos > 250){
			scrollProgress.style.display = "grid";
		} else{
			scrollProgress.style.display = "none";
		}
		scrollProgress.addEventListener("click", () => {
			document.documentElement.scrollTop = 0;
		}); 
	};
	window.onscroll = calcScrollValue;
	window.onload = calcScrollValue;

	//Timing Hours
	$(".countdown").each(function () {
		var date = $(this).data("date");
		$(this).countdown({
			date: date,
			offset: +6,
			day: "Day",
			days: "Days",
		});
	});	
	// Nice select
	$(document).ready(function() {
		$('select').niceSelect();
	});
	// password hide
	$(".toggle-password, .toggle-password2, .toggle-password3, .toggle-password4, .toggle-password5").click(function() {
		$(this).toggleClass("fa-eye fa-eye-slash");
		var input = $($(this).attr("id"));
		if (input.attr("type") == "password") {
		  input.attr("type", "text");
		} else {
		  input.attr("type", "password");
		}
	  });

	if(document.getElementById("password")){
		const password = document.getElementById('password');
		const show = document.getElementById('show');
		const hide = document.getElementById('hide');
			hide.onclick=function(){
			if(password.type == 'password'){
				password.setAttribute('type','text');
			this.classList.add('hide');
	
			}
			}
			show.onclick=function(){
			if(password.type=="text"){
				password.setAttribute('type','password');
				hide.classList.remove('hide');
			}
			}
	}
  // password hide and show
  
  // increase and decrease function
  
  if (document.getElementsByClassName("idown").length) {
  
	const idown = document.querySelector('.idown');
	const iup = document.querySelector('.iup');
	const abcw = document.querySelector('#innumber');
	
	  idown.onclick=function(){
		abcw.value++;
	  }
	  iup.onclick=function(){
		abcw.value--;
	  }
  
  }
  // increase and decrease function

});
//register Popup
jQuery(document).ready(function($){
	$('.cd-popup-trigger').on('click', function(event){
		event.preventDefault();
		$('.cd-popup').addClass('is-visible');
	});
	$('.cd-popup').on('click', function(event){
		if( $(event.target).is('.cd-popup-close') || $(event.target).is('.cd-popup') ) {
			event.preventDefault();
			$(this).removeClass('is-visible');
		}
	});
	$(document).keyup(function(event){
    	if(event.which=='27'){
    		$('.cd-popup').removeClass('is-visible');
	    }
    });
});

jQuery(document).ready(function($){
	$('.mypopup').on('click', function(event){
		event.preventDefault();
		$('.opent-code').addClass('is-visible');
	});
	$('.opent-code').on('click', function(event){
		if( $(event.target).is('.cd-popup-close') || $(event.target).is('.opent-code') ) {
			event.preventDefault();
			$(this).removeClass('is-visible');
		}
	});
	$(document).keyup(function(event){
    	if(event.which=='27'){
    		$('.opent-code').removeClass('is-visible');
	    }
    });
	
});

jQuery(document).ready(function($){
	$('.repopup').on('click', function(event){
		event.preventDefault();
		$('.repeatpopup').addClass('is-visible');
	});
	$('.repeatpopup').on('click', function(event){
		if( $(event.target).is('.cd-popup-close') || $(event.target).is('.repeatpopup') ) {
			event.preventDefault();
			$(this).removeClass('is-visible');
		}
	});
	$(document).keyup(function(event){
    	if(event.which=='27'){
    		$('.repeatpopup').removeClass('is-visible');
	    }
    });
	
});

	//Search Click
	$(document).ready(function(){
		$('a[href="#search"]').on('click', function(event) {                    
			$('#search').addClass('open');
		});            
		$('#search, #search button.close').on('click keyup', function(event) {
			if (event.target == this || event.target.className == 'close' || event.keyCode == 27) {
				$(this).removeClass('open');
			}
		});            
	});

