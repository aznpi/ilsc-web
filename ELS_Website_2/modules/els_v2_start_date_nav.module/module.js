$(".box-nav .box-container").click(function(){
  target = $(this).attr('data-target');
  
  $('html, body').animate({
    scrollTop: $("#"+target).offset().top - 150
  }, 300);
});