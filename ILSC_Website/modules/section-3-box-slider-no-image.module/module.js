$(document).ready(function(){
      $('.box-slide').slick({
      dots: false,
      slidesToScroll: 1,
      slidesToShow: 3,
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
  })