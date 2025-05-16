$(document).ready(function(){
	 
	  $('.photo-slide-3').slick({
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
    $('a[data-toggle="pill"]').on('shown.bs.tab', function (e) {
        $('.photo-slide-3').slick('setPosition');
      })
	});