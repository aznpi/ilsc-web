$(document).ready(function(){
  
    function resizePriceBoxes(){
      
      var resizeArray = ['.col-boxes','.description-container','h3']
      var arrayLength = resizeArray.length;
      var maxHeight = [];
      
      for (var i = 0; i < arrayLength; i++) {
        maxHeight[i] = 0;
        $(".section-program-boxes "+ resizeArray[i]).each(function () {
           if ($(this).height() > maxHeight[i]) { maxHeight[i] = $(this).height(); }
        });
        $(".section-program-boxes "+ resizeArray[i]).height(maxHeight[i]);
      }
    
    }
        
    resizePriceBoxes();
    window.addEventListener("resize", resizePriceBoxes);
    
    $('.down-move').on("click",function(){
      var top = $(this).closest('section').parent().next('div').offset().top;
      $('html,body').animate({
        scrollTop: top-100
      },200);
    });
  
   $('.cta-tool-box ul li').hover(function(){
      $('.cta-tool-box ul li').removeClass('active');
      $(this).addClass('active');
    });
  
    $('a[href*="#"]:not([href="#"]).anchor-link').on('click',function(){
      var offset = -130; // <-- change the value here
      if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
          var target = $(this.hash);
          target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
          if (target.length) {
              $('html, body').animate({
                  scrollTop: target.offset().top + offset
              }, 500);
              return false;
          }
      }
    });
    
  })