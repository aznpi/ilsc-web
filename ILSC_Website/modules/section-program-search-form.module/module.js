$(".section-form.program-search .dropdown-item").click(function() {
	    var optionName = $(this).attr('option-name');
      var valueName = $(this).attr('value-name');
      var label = $(this).text();
      
      if(optionName == 'city'){
        $('#input-city').val(valueName);
      }
      else if(optionName == 'program'){
        $('#input-program').val(valueName);
      }
      else if(optionName == 'language-level'){
        $('#input-language-level').val(valueName);
      } 
      else if(optionName == 'courses'){
        $('#input-courses').val(valueName);
      } 
      $(this).parent().siblings('.btn').text(label);
});
