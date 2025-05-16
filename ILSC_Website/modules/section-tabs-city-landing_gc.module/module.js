$(document).ready(function(){
	 
	  $('.photo-slide-tab').slick({
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
	  $('.facility-slide').slick({
		  dots: false,
		  slidesToScroll: 1,
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
        $('.facility-slide').slick('setPosition');
        $('.gallery-slide').slick('setPosition');
      })
	});