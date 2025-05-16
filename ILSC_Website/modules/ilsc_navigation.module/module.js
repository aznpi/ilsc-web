$('.home-nav .js-toggle-menu,.home-nav a.nav-link').click(function(e){
  e.preventDefault();
  $('.home-nav .mobile-header-nav').slideToggle();
  $(this).toggleClass('open');
});
$('a.nav-link').click(function(){
  $('.home-nav .js-toggle-menu').removeClass('open');
  $('.home-nav .mobile-header-nav').hide();
});