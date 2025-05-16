$(document).ready(function(){

  function resizeVisaTimelineBoxes(){

    var resizeArray = ['.box-container']
    var arrayLength = resizeArray.length;
    var maxHeight = [];

    for (var i = 0; i < arrayLength; i++) {
      maxHeight[i] = 0;
      $(".section-visa-timeline-box .col-md-3 "+ resizeArray[i]).each(function () {
        if ($(this).height() > maxHeight[i]) { maxHeight[i] = $(this).height(); }
      });
      $(".section-visa-timeline-box .col-md-3 "+ resizeArray[i]).css('min-height',maxHeight[i]+'px');
    }

  }

  resizeVisaTimelineBoxes();
  window.addEventListener("resize", resizeVisaTimelineBoxes);
  
  $('.section-timeline-box .simple-boxes .box-container').hover(function(){
    $('.description-container',this).slideDown();
  },function(){
    $('.description-container',this).slideUp();
  })
});