$(document).ready(function(){
    
    $(".section-team .dropdown .dropdown-menu .dropdown-item").click(function() {
      var idTarget = $(this).attr('href');
      var label = $(this).text();
      $(this).parent().siblings('.btn').text(label);
      
      $(".section-team .team-tab").each(function(){
        if(!$(this).is(idTarget)){
          $(this).removeClass('active').removeClass('show');
        }
        if($(this).is(idTarget)){
          $(this).addClass('active').addClass('show');
        }
      })
      
      return false;
    });
    
  })