 $(document).ready(function(){
      $('.blue-box-slide').slick({
      dots: false,
      slidesToScroll: 1,
      slidesToShow: 1,
      lazyLoad: 'ondemand',
      speed : 600,
      ease : 'Pow4.easeIn',
      infinite : false,
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
