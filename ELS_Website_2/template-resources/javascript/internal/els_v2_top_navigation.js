$(function() {

  //Megamenu	
  'use strict';
  /*Activate default tab contents*/
  var $magicLine = $('#magic-line');
  var leftPos, newWidth, $magicLine;

  $('.navbar-nav li.nav-item a.nav-link:not(.btn-download)').click(function() {
    var $this = $(this);
    $this.parent().addClass('active').siblings().removeClass('active');
    $magicLine
      .data('origLeft', $this.position().left)
      .data('origWidth', $this.parent().width());


  });


  /*Magicline hover animation*/
  $('.navbar-nav li.nav-item').find('a.nav-link:not(.btn-download)').mouseenter(function() {

    let parentElement = $(this).parents().eq(2),
        $magicLineTarget = $('#magic-line',parentElement);

    leftPos = $(this).position().left;
    newWidth = $(this).parent().width() - 15;

    $magicLineTarget.css({
      "left": leftPos,
      "width": newWidth
    }).addClass('magic-active');



  }).mouseleave(function() {

    let parentElement = $(this).parents().eq(2),
        $magicLineTarget = $('#magic-line',parentElement);

    $magicLineTarget.css({
      "left": $magicLine.data('origLeft'),
      "width": $magicLine.data('origWidth') -15
    });
    $('.dropdown').on('hidden.bs.dropdown', function() {
      $magicLineTarget.removeClass('magic-active');
    });
    $(this).parent().parent().removeClass('menu-hide');
  });

  $('.navbar-nav li.nav-item').mouseleave(function() {

    let parentElement = $(this).parents().eq(1),
        $magicLineTarget = $('#magic-line',parentElement);

    if(!$('ul.navbar-nav').hasClass('menu-show')){
      $magicLineTarget.removeClass('magic-active');
    }

  });



  $('.top-nav .navbar-nav .dropdown').on('hidden.bs.dropdown', function() {
    let parentElement = $(this).parents().eq(1),
        $magicLineTarget = $('#magic-line',parentElement);
    $('ul.navbar-nav').addClass('menu-hide');
    $('ul.navbar-nav').removeClass('menu-show');
    $magicLineTarget.removeClass('magic-active');
  });
  $('.top-nav .navbar-nav .dropdown').on('shown.bs.dropdown', function() {
    let parentElement = $(this).parents().eq(1),
        $magicLineTarget = $('#magic-line',parentElement);

    $('ul.navbar-nav').addClass('menu-show');
    $('ul.navbar-nav').removeClass('menu-hide');
    $magicLineTarget.addClass('magic-active');
  });

  //StickyNav


  // grab the initial top offset of the navigation 
  var stickyNavTop = $('.top-nav').position().top;

  // our function that decides weather the navigation bar should have "fixed" css position or not.
  var stickyNav = function(){
    var scrollTop = $(window).scrollTop(),
        windowWidth = $(window).width();
    ; // our current vertical position from the top

    // if we've scrolled more than the navigation, change its position to fixed to stick to top,
    // otherwise change it back to relative

    if(windowWidth > 991){
      if (scrollTop > stickyNavTop) { 
        $('.top-nav').addClass('sticky');
        $('.cta-flyout').addClass('show-fo');     

      } else {
        $('.top-nav').removeClass('sticky');
        $('.cta-flyout').removeClass('show-fo');
      }
    }
  };


  stickyNav();
  // and run it again every time you scroll
  $(window).scroll(function() {
    stickyNav();
  });


  $('.top-nav .nav-bar-items.navbar-collapse').on('show.bs.collapse', function () {
    $('.top-nav .navbar-brand.mobile-brand').addClass("mobile-show");
  }).on('hide.bs.collapse', function () {
    $('.top-nav .navbar-brand,mobile-brand').removeClass("mobile-show");
  });


});

const $mainNav = $('.top-nav,.top-nav .nav-item:not(.dropdown) a');
const $dropdown = $(".top-nav .nav-item.dropdown");
const $dropdownToggle = $(".top-nav .nav-item .dropdown-toggle");
const $dropdownMenu = $(".top-nav .nav-item .dropdown-menu");
const showClass = "show";
$(window).on("load resize", function() {
  if (this.matchMedia("(min-width: 992px)").matches) {
    $dropdown.hover(
      function() {
        const $this = $(this);
        $dropdown.removeClass(showClass);
        $dropdownToggle.attr("aria-expanded", "false");
        $dropdownMenu.removeClass(showClass);
        $this.addClass(showClass);
        $this.find($dropdownToggle).attr("aria-expanded", "true");
        $this.find($dropdownMenu).addClass(showClass);
      }
    );
    $mainNav.hover(
      function() {
        $dropdown.removeClass(showClass);
        $dropdownToggle.attr("aria-expanded", "false");
        $dropdownMenu.removeClass(showClass);
      });
  } else {
    $dropdown.off("mouseenter mouseleave");
  }
});

$( document ).ready(function() {

  $('.navbar-toggler').click(function(){
    setTimeout(function(){
      if ($('.nav-bar-items.navbar-collapse.collapse').hasClass('show')) {
        $('body,#section-top-navigation').addClass("fixed-position");
      } else {
        console.log('test1');
        $('body,#section-top-navigation').removeClass("fixed-position");
      }
    },300);

  });
  
  $(window).on('scroll', function (e){
    if (this.matchMedia("(min-width: 767px)").matches) {
      $(".top-nav .navbar .dropdown").removeClass('show');
      $(".top-nav .navbar .dropdown .dropdown-menu").removeClass('show');
      $(".top-nav #magic-line").removeClass('magic-active');
    }
  });

});
