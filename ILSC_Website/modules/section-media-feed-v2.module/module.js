$(document).ready(function(){
      $('.media-slide').slick({
            dots: false,
            slidesToScroll: 1,
            slidesToShow: 5,
            arrows:false,
            lazyLoad: 'ondemand',
            speed : 600,
            ease : 'Pow4.easeIn',
            responsive: [
              {
                breakpoint: 992,
                settings: {
                  slidesToShow: 3,
                  slidesToScroll: 1
                }
              },
              {
                breakpoint: 480,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 1
                }
              }
            ]

          });
      $('a[data-toggle="pill"]').on('shown.bs.tab', function (e) {
        $('.media-slide').slick('setPosition');
      })
   });