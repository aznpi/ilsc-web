

$(document).ready(function(){
  let dateBoxHeight = $('.start-date-box-container').height();
  
  if(dateBoxHeight > 700){
    $('.list-campuses').hide();
    $('.show-link-dates').show();
  }
  $(document).on('click','li.show-link-dates',function(){
    parentEl = $(this);
    $(this).siblings().find('.list-campuses').toggle('fast','linear',function(){
         if($(this).is(':hidden')){
           parentEl.html('<span>Show Dates</span>');
           $('html, body').animate({
              scrollTop: $(".section-snapshot").offset().top
          }, 100);
         }else{
           parentEl.html('<span>Hide Dates</span>');
           
        }                                              
    });
  });
});