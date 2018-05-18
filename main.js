$(document).ready(function() {
	//redirect to mobile version of mobile browser
	mobileAndTabletcheck();

	$('#poem').css('margin-top', ($('#poem').height()/2) * -1);
	$('#contactsDiv').css('margin-top', ($('#contactsDiv').height()/2) * -1);


	//initialize intro page loader
	 window.addEventListener('DOMContentLoaded', function() {
        new QueryLoader2(document.querySelector("body"), {
            barColor: "#000",
            backgroundColor: "transparent",
            percentage: true,
            barHeight: 1,
            minimumTime: 600,
            fadeOutTime: 2500,
             onComplete: function() {
             	//$('#introSection').animate({'right': 0}, 1500);
             	$('#websiteOverlay').hide();
             	$('#introMovieVideo')[0].play();
             }
        });
    });


	//change sidebar height on load and on screen resize			
	resizeSidebar();
	$(window).resize(function(){
		resizeSidebar();
	});

	//hide sidebar when initial video is played
	$('#introSectionWrapper').hide();

	//pause intro video on click
	$('#introVideoSection').click(function(){
		if ($('#introMovieVideo')[0].paused) {
			$('#introMovieVideo')[0].play();
		}
		else {
			$('#introMovieVideo')[0].pause();	
		}
	});

	//on mouse move show skip button. 
	(function ($) {
	var timeout;
	$(document).on('mousemove', function (event) {
	 	$('#skipIntroBtn').addClass('show');
		if (timeout !== undefined) {
		    window.clearTimeout(timeout);
		}
		timeout = window.setTimeout(function () {
		    // trigger the new event on event.target, so that it can bubble appropriately
		    $(event.target).trigger('mousemoveend');
		}, 800);
		});
	}(jQuery));
	 //on mouse stop moving hide skip button
	$('#introVideoSection').on('mousemoveend', function () {
	    $('#skipIntroBtn').removeClass('show');
	});



	 //move slides up and down. initialize fullpage.js plugin
    $('#fullpage').fullpage({
      onLeave: function(index, nextIndex, direction){
      		$('#breadcrumbBar').css('display', 'block');
	         if (nextIndex == 1) {
				$('#introSectionWrapper').hide();			         	
	         }
	         //contact page
	         else if (nextIndex == 11) {
				$('#introSectionWrapper').hide();	
				$('#contactsDiv').addClass('fadeinInTurn').removeClass('fadeOut');		         	
	         }
	         else if (nextIndex == 2) {
	         	$('#introSectionWrapper').show();
	         	$('#introMovieVideo')[0].pause();	
	         }
	         else {
	         	$('#introSectionWrapper').show();
	         	$('#contactsDiv').removeClass('fadeinInTurn').addClass('fadeOut');
	         }

			//animate sidebar
			var nextSlide = $('#sidebar' + nextIndex);
			$('#sidebar' + index).removeClass('showTopbar').addClass('hideTopbar');
	 		$(nextSlide).removeClass('hideTopbar').addClass('showTopbar');
 		// 	$('.topbarLogo').each(function(i, el){
			// 	$(el).css('margin-left', ($(el).width()/2) * -1);
			// 	$(el).css('margin-top', ($(el).height()/2) * -1);
			// });
			var logo = $(nextSlide).find('.topbarLogo');
			$(logo).css({'margin-left': ($(logo).width()/2) * -1, 'margin-top': ($(logo).height()/2) * -1});
	 		$('#introSection').stop().animate({height: $('#sidebar' + nextIndex).height() + 55}, 500);	

	 		 if ($(window).height() < 930) {
				$('#introSection').stop().animate({height: $('#sidebar' + nextIndex).height() + 50}, 500);	
			};


			if ($(window).height() < 820) {
				$('#introSection').stop().animate({height: $('#sidebar' + nextIndex).height() + 30}, 500);	
			};


			//animate breadcrumb left navbar on slide change
	 		$('.navItem').removeClass('current');
	 		$('#circle' + nextIndex).addClass('current');
	 		//$('#movingCircle').css('top', $('#circle' + nextIndex).data('top'));

	 		//animate backgrounds
	 		if (direction == 'down') {
	 			$('#slideBackground' + nextIndex).css('height', '100%');	
	 		}
	 		else {
	 			$('#slideBackground' + index).css('height', '0');
	 		}
        }
    });
	
	//when intro video is ended, move to next slide
	document.getElementById('introMovieVideo').addEventListener('ended',slideDown,false);

	function slideDown(e) {
		$.fn.fullpage.moveSectionDown();		    		
		$('#breadcrumbBar').css('display', 'block');
		//$('#introMovieVideo')[0].pause();	
	}

	$('#skipIntroBtn').click(function(){
		$.fn.fullpage.moveSectionDown();		    		
		$('#breadcrumbBar').show();
	 	$('#introMovieVideo')[0].pause();	
	 	$('#introVideoSection').click();
	});

	// $('.pausePlayBtn').click(function(){
	// 	$(this).text($(this).text() == 'Play' ? "Pause" : "Play");
	// });
	$('#pauseBtn').click(function(){
		$(this).hide();
		$('#playBtn').show();
	});
	$('#playBtn').click(function(){
		$(this).hide();
		$('#pauseBtn').show();
	});

	//side navbar navigation
	$('.navItem').click(function(){
		var presentSection = $('.current').data('circle');
			var sectionToGO = $(this).data('circle');

			//going up more than one section
			if (presentSection - sectionToGO > 1) {
				
				$.fn.fullpage.moveTo(sectionToGO);
				//set all first slides before current to 100%
				for (var i = 0; i < presentSection; i++) {
					$('.slideBackground').eq(i).css('height', '100%');
				}

				//change height from 100 to 0 for slides including current but not the one going to
				for (var i = sectionToGO + 1 ; i <= presentSection; i++) {
					$('#slideBackground' + i).css('height', 0);
				}	

			}
			//going up one section
			else if (presentSection - sectionToGO == 1 ) {	 					
				$.fn.fullpage.moveTo(sectionToGO);
				$('#slideBackground' + presentSection).css('height', 0);
			}
			//going down
			else {
				for (var i = 1; i < sectionToGO; i++) {
					$('#slideBackground' + i).css('height', '100%');
				}	

				$.fn.fullpage.moveTo(sectionToGO);

			}
		});

	$('.arrowDown').click(function(){
		$.fn.fullpage.moveSectionDown();
	});

	//when video overlay is open, on close, remove video and go back to the previous screen
	$('.closeIcon').click(function(){
		$('#videoWrapper').fadeOut(1000);
		$('.video').remove();

		$('.videoSectionWrapper').hide();
		$('.nextVideosWrapper').hide();
		$('.videoOverlay').css({'display': 'none', opacity: 0});
		$('.closeIcon').css('color', '#c8c8c8');
	});

}); //document ready


function resizeSidebar() {
	var currentSection = $('.current').data('circle');
	//console.log(currentSection);

	if ($(window).height() > 930) {
		$('#introSection').height($('#sidebar' + currentSection).height() + 55);
	} 
	else if ($(window).height() < 930) {
		$('#introSection').height($('#sidebar' + currentSection).height() + 50);
	} 
	else if ($(window).height() < 820) {
		$('#introSection').height($('#sidebar' + currentSection).height()+30);
	}
}

function playVideo(videoSection, videoName, folder, file) {
	$('.videoOverlay').css({'display': 'none', opacity: 0});
	$('.closeIcon').css('color', '#c8c8c8');
	$('.nextVideosWrapper').hide();
	$('.video').hide();
	//$('#videoWrapper').slideDown();
	$('#videoWrapper').fadeIn(1000);
	//$('#videoWrapper').addClass('show');

	var videoSection = $('#' + videoSection);
	$(videoSection).show();

	$(videoSection).append('<video id="'+ videoName +'" class="video" controls preload="true"><source src="videos/' + folder +'/' + file + '.mp4" type="video/mp4"><source src="videos/' + folder +'/' + file + '.webm" type="video/webm"></video>');

	$('#' + videoName).show();
	var video = $('#' + videoName);
	$(video)[0].play();
	var videoId = video.attr('id');
	
	//when video ends
    document.getElementById(videoId).addEventListener('ended', closeVideo,false);
    function closeVideo(e) {

        //if there are additional videos to show in this section, show overlay
        if ($(videoSection).find('.videoOverlay').length > 0) {
        	$(videoSection).find('.videoOverlay').css({'display': 'table', opacity: 1});
        	$('.closeIcon').css('color', '#c8c8c8');			        	
        	$('.nextVideosWrapper').show();
        	var otherVideosCount = $(videoSection).find('.nextVideoImageHolder').length;
        
        	for ( var i=1; i <= otherVideosCount; i++) {

        		if ($(videoSection).find('.nextVideoImageHolder' + i).data('thumbnailname') == videoName) {
        				$(videoSection).find('.nextVideoImageHolder' + i).hide();
        		}
        		else {
        			$(videoSection).find('.nextVideoImageHolder' + i).show();
        		}

        	}

    	}
    	//if there are no more videos in this section, close video
    	else {
    		//$('#videoWrapper').slideUp();
    		$('#' + videoName).remove();
    		$('#videoWrapper').fadeOut(1000);
    		$(videoSection).hide();
    	}
    }
}

function mobileAndTabletcheck() {
  var check;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
  if (check == true) {
  	//$('#desktopContent').hide();
  	//$('#mobileContent').show();
  	//$('#stylesheet').attr('href', 'mobile.css');
  	document.location = "mobile.html";
  }
  else {
  	$('#desktopContent').show();
  	$('#mobileContent').hide();
  	$('#stylesheet').attr('href', 'main.css');
  }
}


function showContacts(){
	$('#poem').removeClass('fadeinInTurn').addClass('fadeOut');
	$('#contactsDiv').addClass('fadeinInTurn').removeClass('fadeOut');
	//$('#showContactsBtn').fadeOut();
	//$('#showPoemBtn').fadeIn();
}

function showPoem(){
	$('#poem').addClass('fadeinInTurn').removeClass('fadeOut');
	$('#contactsDiv').removeClass('fadeinInTurn').addClass('fadeOut');
	//$('#showContactsBtn').fadeIn();
	//$('#showPoemBtn').fadeOut();
}



