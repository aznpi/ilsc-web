$(document).ready(function(){
	  
	$(".mix-boxes .dropdown-item").click(function() {
	    var filterValue = $(this).attr('value');
	    var row = $('.mix'); 
	      
	    row.hide()
	    row.each(function(i, el) {
	         if($(el).attr('data-type') == filterValue) {
	             $(el).show();
	         }
         
   		})
	    if(filterValue == 'all') {
		    	row.each(function(i, el) {
			         
		             $(el).show();
		     
			 })
         }
	    
	    return false;
	     
	});
	
	 $('a[data-toggle="pill"]').on('shown.bs.tab', function (e) {
		 var target = $(e.target).attr('href');
		 var row = $('.mix'); 
		
			 row.each(function(i, el) {
		         
		             $(el).show();
		     
			 })
		})
})