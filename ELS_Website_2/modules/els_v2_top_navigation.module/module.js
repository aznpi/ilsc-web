var langCode = $('html')[0].lang;
var langVal = langCode.toUpperCase();

$('.lng-' + langCode).hide();

$('span.lang-code').text(langVal);

$("#section-top-navigation .navbar-nav .nav-item a.nav-link.direct-target").click(function(){
   urlLink = $(this).attr('data-href');
  if(window.matchMedia("(min-width: 992px)").matches){
      location.href = urlLink;
  }else{
    if(!$(this).parent().hasClass("dropdown")){
      location.href = urlLink;
    }
  }
});

$('#section-top-navigation .navbar-nav.sub-nav .language-dropdown').hover(function(){
  var langPos = $(this).offset();
  $('.dropdown-menu',this).css({'top':langPos.top+20,'left':langPos.left-50});
});

