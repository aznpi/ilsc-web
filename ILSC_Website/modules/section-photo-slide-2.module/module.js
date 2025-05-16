$(document).ready(function(){
	 
	  $('.photo-slide-2').slick({
		  dots: false,
		  slidesToScroll: 1,
		  slidesToShow: 2,
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
	});