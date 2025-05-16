$(document).ready(function(){
      $('.box-slide-4').slick({
      dots: false,
      slidesToScroll: 1,
      slidesToShow: 4,
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
   $('a[data-toggle="pill"]').on('shown.bs.tab', function (e) {
     $('.box-slide-4').slick('setPosition');
   })
  })