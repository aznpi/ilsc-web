$(document).ready(function(){
	 
	  $('.logo-slide').slick({
        dots: false,
        slidesToScroll: 1,
        slidesToShow: 6,
        lazyLoad: 'ondemand',
        speed : 600,
        ease : 'Pow4.easeIn',
        responsive: [
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1
            }
          }
        ]
		  
	  });
	});