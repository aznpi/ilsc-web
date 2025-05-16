$(".tool-quote").click(function (e) {
    e.stopPropagation();
    // Other code
});

$('.cta-tool-box ul li').not('.tool-quote').click(function(){
  let target = $(this).attr('data-target');
  
  if(!$(this).hasClass('tool-call')){  
   location.href = target;
  }else{
    window.open('tel:'+target);
  }
});