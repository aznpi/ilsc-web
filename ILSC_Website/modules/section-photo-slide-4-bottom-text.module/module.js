$(document).ready(function(){
	 
	  $('.gallery-slide').slick({
        dots: false,
        slidesToScroll: 1,
        slidesToShow: 4,
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