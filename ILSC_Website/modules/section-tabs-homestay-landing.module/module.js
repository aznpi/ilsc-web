$(document).ready(function(){
	 
	  $('.photo-slide-tab').slick({
		  dots: false,
		  slidesToScroll: 1,
		  slidesToShow: 2,
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
        
        $('.gallery-slide').slick('setPosition');
      })
	});