  $(document).ready(function(){
      $('.testimonials-slide').slick({
        dots: true,
        lazyLoad: 'ondemand',
        slidesToShow: 1,
        slidesToScroll: 1,
        speed : 600,
        ease : 'Pow4.easeIn',
        responsive: [
        {
          breakpoint: 480,
          settings: {
            adaptiveHeight: true
          }
        }
      ]
    });
  })