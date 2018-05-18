$(document).ready(function() {

  //make intro page full screen
  $('#mobileIntroPage').height($(window).height());
  $('.video').css('margin-top', ($(window).width()/2) * -1);

  //on each project button click, open the section with videos. close on second click
  $('.mobileBtn').click(function(){
      if ($(this).closest('.mobileSection').find('.mobileVideoContainer').is(':visible')) {
          $(this).closest('.mobileSection').find('.mobileVideoContainer').slideUp();
      }
      else { //open section
        $(this).closest('.mobileSection').find('.mobileVideoContainer').slideDown();
        $('html, body').animate({'scrollTop': $(this).closest('.mobileSection').find('.mobileVideoContainer').offset().top - 90}, 500);
      }
  });

});

function playVideo(videoSection, videoName, folder, file) {
  //$('#videoContainer').show();
   $('#videoContainer').show().append('<video id="'+ videoName +'" class="video" controls preload="true"><source src="videos/' + folder +'/' + file + '.mp4" type="video/mp4"><source src="videos/' + folder +'/' + file + '.webm" type="video/webm"></video>');

   var video = $('#' + videoName);
   $(video).css('margin-top', ($(video).height()/2) * -1);
   $(video).get(0).play();

  document.getElementById(videoName).addEventListener('webkitendfullscreen', onPlayerExitFullscreen, false);

  function onPlayerExitFullscreen() {
    $('#videoContainer').hide();
    $(".video").remove();
  }

}

function closeVideoContainer(){
    $('#videoContainer').hide();
    $(".video").remove();
}

function enterWebsite() {
    $('#mobileIntroPage').animate({'top': '-150%'}, 500);
    $('#mobileContent').show().animate({'top': '0'}, 500);
}

function backToIntro() {
    $('#mobileIntroPage').animate({'top': '0'}, 500);
    $('#mobileContent').hide().animate({'top': '100%'}, 500);
}