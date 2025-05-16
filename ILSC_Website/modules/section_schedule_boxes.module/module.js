$(document).ready(function(){
  $('.slick-row-campus .box-slide').slick({
      dots: false,
      swipe:false,
      draggable:false,
      slidesToScroll: 1,
      slidesToShow: 1,
      lazyLoad: 'ondemand',
      speed : 600,
      ease : 'Pow4.easeIn',
      arrows : false,
      fade: true,
      responsive: [
        {
          breakpoint: 992,
          settings: {
            swipe:false,
            draggable:false,
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]

  });
  
  goToSchedule();
  
  $('.schedule-box').slick({
      infinite: false,
      dots: false,
      slidesToScroll: 1,
      slidesToShow: 3,
      lazyLoad: 'ondemand',
      speed : 600,
      ease : 'Pow4.easeIn',
      arrows : true,
      responsive: [
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1
          }
        }
      ]

  });
  function resizeScheduleTable(){

      var resizeArray = ['.description']
      var arrayLength = resizeArray.length;
      var maxHeight = [];

      for (var i = 0; i < arrayLength; i++) {
        maxHeight[i] = 0;
        $(".section-schedule.price-list-grid .program-box-container .description-container "+ resizeArray[i]).each(function () {
           if ($(this).height() > maxHeight[i]) { maxHeight[i] = $(this).height(); }
        });
        $(".section-schedule.price-list-grid .program-box-container .description-container "+ resizeArray[i]).height(maxHeight[i]);
      }

    }

    resizeScheduleTable();
    window.addEventListener("resize", resizeScheduleTable());
  
   
})

const goToSchedule = function(){
  let locationId = GetURLParameter('location');

  if(locationId){
    let quoteSlide = $('.box-slide .slick-slide').index($('#'+locationId));
    $('.box-slide').slick('slickGoTo',quoteSlide);
  }    
}
    
   