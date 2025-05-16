$(document).ready(function() {

// Gets the video src from the data-src on each button

var $videoSrc;  
$('.video-btn').click(function() {
    $videoSrc = $(this).attr( "src" );
});
  
  
// when the modal is opened autoplay it  
$('#ilscModal').on('shown.bs.modal', function (e) {
    
// set the video src to autoplay and not to show related video. Youtube related video is like a box of chocolates... you never know what you're gonna get
$(".modal-body").html('<div class="ratio ratio-16x9"><iframe src="' + $videoSrc + '" allowfullscreen></iframe></div>');

})
  


// stop playing the youtube video when I close the modal
$('#ilscModal').on('hide.bs.modal', function (e) {
    // a poor man's stop video
	$(".modal-body").html('');
}) 
    
    


  
  
// document ready  
});


