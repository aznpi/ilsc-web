
$(document).ready(function(){
  
   
  $('.section-schedule .box-slider').slick({
    dots: false,
    slidesToScroll: 1,
    slidesToShow: 1,
    lazyLoad: 'ondemand',
    speed : 600,
    ease : 'Pow4.easeIn',
    infinite: false,
    adaptiveHeight: true,
    draggable: false
  });
 
  $('.campus-target').click(function(){
    targetVal = $(this).attr('data-target');
    $('.campus-target').removeClass('active');
    $(this).addClass('active');
    $('.section-schedule .box-slider').slick('slickGoTo', targetVal)
  });
  
  function resizeSchedulePriceTable(){
    
    var resizeArray = ['.time-block','.title','.sub-description','.main-description']
    var arrayLength = resizeArray.length;
    var maxHeight = [];
    
    for (var i = 0; i < arrayLength; i++) {
      maxHeight[i] = 0;
      $(".section-schedule .program-box-container "+ resizeArray[i]).each(function () {
         if ($(this).height() > maxHeight[i]) { maxHeight[i] = $(this).height(); }
      });
      $(".section-schedule .program-box-container "+ resizeArray[i]).height(maxHeight[i]);
    }
  
  }
      
  //resizeSchedulePriceTable();
  //window.addEventListener("resize", resizeSchedulePriceTable);
  
})
