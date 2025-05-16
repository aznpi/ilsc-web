var langCode = $('html')[0].lang;

$('.lng-' + langCode).hide();

$('.language-selector a.language-link').text(langCode);


$('.top-nav.main-group .js-toggle-menu').click(function(e){
  e.preventDefault();
  
  $('.top-nav.main-group .mobile-header-nav').toggleClass('open');
  $(this).toggleClass('open');
});
$('a.nav-link').click(function(){
  $('.top-nav.main-group .js-toggle-menu, .top-nav.main-group .mobile-header-nav').removeClass('open');
});