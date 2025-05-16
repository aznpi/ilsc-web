$(document).ready(function(){
	  $('.testimonials-slide').slick({
		  lazyLoad: 'ondemand',
      slidesToShow: 1,
      slidesToScroll: 1,
      speed : 600,
      ease : 'Pow4.easeIn',
      dots: true,
      responsive: [
        {
          breakpoint: 480,
          settings: {
            adaptiveHeight: true
          }
        }
      ]
	  });
	 
	});