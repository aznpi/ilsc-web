$(document).ready(function(){
	 
	    $('a[data-toggle="pill"]').on('shown.bs.tab', function (e) {
        
      })
      $('[data-toggle="tooltip"]').tooltip({
          animation: true,
          delay: {show: 500, hide: 100}
        }); 
      $('.tip-text').click(function(){
        return false;
      })
  
	});