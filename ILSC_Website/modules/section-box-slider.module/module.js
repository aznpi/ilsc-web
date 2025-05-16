
$(document).ready(function(){
  $('.slick-row .box-slide').slick({
      dots: false,
      slidesToScroll: 1,
      slidesToShow: 3,
      lazyLoad: 'ondemand',
      speed : 600,
      ease : 'Pow4.easeIn',
      responsive: [
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]

  });
  var resizeArray = ['.section-box-slider .box-slide .box-content h4','.section-box-slider .box-slide .box-container .box-content p']
  var arrayLength = resizeArray.length;
  var maxHeight = [];

  for (var i = 0; i < arrayLength; i++) {
    maxHeight[i] = 0;
    $(resizeArray[i]).each(function () {
      if ($(this).height() > maxHeight[i]) { maxHeight[i] = $(this).height(); }
    });
    $(resizeArray[i]).height(maxHeight[i]);
  }
  
})
