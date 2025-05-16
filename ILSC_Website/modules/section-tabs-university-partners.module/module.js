$(document).ready(function(){
	$(".dropdown-toggle").dropdown();
  
  var url = document.location.toString();
  if (url.match('#')) {
      $('.nav-pills a[href="#' + url.split('#')[1] + '"]').tab('show');
  } 

  // Change hash for page-reload
  $('.nav-tabs a').on('shown.bs.tab', function (e) {
      window.location.hash = e.target.hash;
  })
  
	$(".mix-boxes .dropdown-item").click(function() {
	    var filterValue = $(this).attr('value');
	    var row = $('.mix'); 
	    var label = $(this).text();
      
    
      $(this).parent().siblings('.btn').text(label);
    
	    row.hide()
	    
	    if(filterValue == 'all') {
		    	row.each(function(i, el) {
			         if($(el).attr('duplicate') == 1 && $(el).attr('original') == 0){
		             $(el).show();
               }
			 })
      
      }else{
        
        row.each(function(i, el) {
	         if($(el).attr('data-type') == filterValue && $(el).attr('duplicate') == 1) {
	             
             $(el).show();
	         
           }
         
   		  })
        
      }
    
      
	    
	    return false;
	     
	});
	
	 $('a[data-toggle="pill"]').on('shown.bs.tab', function (e) {
		 var target = $(e.target).attr('href');
		 var row = $('.mix'); 
		
     $(target).find('.input-drop').find('.btn').text($(target).find('.input-drop').find('.btn').attr('textValue'));
     
			 row.each(function(i, el) {
		         if($(el).attr('duplicate') == 1 && $(el).attr('original') == 0){
		             $(el).show();
             }
		     
			 })
		})
})