$(document).ready(function(){
	 
	    $('a[data-toggle="pill"]').on('shown.bs.tab', function (e) {
        
        $('.gallery-slide').slick('setPosition');
      })
	});

$(function() {
        $('.lazy').lazy();
    });