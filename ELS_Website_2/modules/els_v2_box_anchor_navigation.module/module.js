$('.section-box-nav .box-container').click(function(){
  target = $(this).attr('data-target');
  console.log(target);
  $('html, body').animate({
    scrollTop: $("#"+target).offset().top - 150
  }, 300);
});