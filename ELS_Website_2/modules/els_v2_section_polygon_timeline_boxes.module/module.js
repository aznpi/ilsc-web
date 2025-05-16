$(document).ready(function(){

  function resizeTimelineBoxes(){

    var resizeArray = ['.box-container']
    var arrayLength = resizeArray.length;
    var maxHeight = [];

    for (var i = 0; i < arrayLength; i++) {
      maxHeight[i] = 0;
      $(".section-timeline-box "+ resizeArray[i]).each(function () {
        if ($(this).height() > maxHeight[i]) { maxHeight[i] = $(this).height(); }
      });
      $(".section-timeline-box "+ resizeArray[i]).css('min-height',maxHeight[i]+'px');
    }

  }

  resizeTimelineBoxes();
  window.addEventListener("resize", resizeTimelineBoxes);
  
  $('.section-timeline-box .simple-boxes .box-container').hover(function(){
    $('.description-container',this).slideDown();
  },function(){
    $('.description-container',this).slideUp();
  })
});