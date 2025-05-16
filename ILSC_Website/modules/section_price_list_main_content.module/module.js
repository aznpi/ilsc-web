

$(document).ready(function(){
  $(".price-list-content .mobile-drop-row .mobile-drop select").change(function(){
    selectedAnchor = this.value;
    location.hash=selectedAnchor;
  });
  
  function resizeNavTable(){
      var maxHeight = 0;

      $(".price-list-content .box-nav .anchor-box-container").each(function () {
         if ($(this).height() > maxHeight) { maxHeight = $(this).height(); }
      });
      $(".price-list-content .box-nav .col .anchor-box-container").height(maxHeight);
  }
  resizeNavTable();
  
var mainContentHeight = $(".price-list-content").height();
var heroHeight = $(".section-hero").height();
var footerPos = $(".footer-container-wrapper").offset().top;
 
  // ===== Scroll to Top ==== 
$(window).scroll(function() {
    if ($(this).scrollTop() >= mainContentHeight && $(this).scrollTop() <= footerPos) {        // If page is scrolled more than 50px
        $('#return-to-top').fadeIn(300);    // Fade in the arrow
    } else {
        $('#return-to-top').fadeOut(300);   // Else fade out the arrow
    }
});
$('#return-to-top').click(function() {      // When arrow is clicked
    $('body,html').animate({
        scrollTop : heroHeight                      // Scroll to top of body
    }, 500);
});
  
function setHash(newHash) {
    location.hash = '';
    location.hash = newHash;
}
$(".price-list-content .box-nav .anchor-box-container").click(function(){
  var hashVal = $(this).attr('data-hash');
  setHash(hashVal);
});
  
});