$(document).ready(function(){
  
    function resizePriceBoxes(){
      
      var resizeArray = ['h4','.description-container','.btn-container']
      var arrayLength = resizeArray.length;
      var maxHeight = [];
      
      for (var i = 0; i < arrayLength; i++) {
        maxHeight[i] = 0;
        $(".section-3-box-program-slider .program-box-slider "+ resizeArray[i]).each(function () {
           if ($(this).height() > maxHeight[i]) { maxHeight[i] = $(this).height(); }
        });
        $(".section-3-box-program-slider .program-box-slider "+ resizeArray[i]).height(maxHeight[i]);
      }
    
    }
        
    resizePriceBoxes();
    window.addEventListener("resize", resizePriceBoxes);
});

$('.section-3-box-program-slider .program-box-slider').slick({
  infinite: false,
  arrows:true,
  slidesToShow: 3,
  slidesToScroll: 1,
  nextArrow:'<div class="slick-next"><i class="fas fa-angle-double-right"></i></div>',
  prevArrow:'<div class="slick-prev"><i class="fas fa-angle-double-left"></i></div>',
  responsive: [
    {
      breakpoint: 1399,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 900,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
    // You can unslick at a given breakpoint now by adding:
    // settings: "unslick"
    // instead of a settings object
  ]
});