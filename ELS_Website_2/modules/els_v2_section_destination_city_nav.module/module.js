//Sticky menu

var sticky = document.querySelector('.section-menu-nav');
var origOffsetY = sticky.offsetTop - 80;

function onScroll(e) {
    window.scrollY >= origOffsetY ? sticky.classList.add('fixed') :
        sticky.classList.remove('fixed');
}
document.addEventListener('scroll', onScroll);

// Scroll active

$(window).scroll(function () {
    var scrollDistance = $(window).scrollTop();

    $('a.anchor-link').each(function (i) {
        if ($(this).position().top - 350 <= scrollDistance) {
            $('.navbar-anchor a[href*="#"]:not([href="#"]).active').removeClass('active');
            $('.navbar-anchor a').eq(i).addClass('active');
        }
    });

}).scroll();

//Scroll to anchor

$(function () {
    $('.navbar-anchor a.nav-link').click(function () {
      
        if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html, body').animate({
                    scrollTop: target.offset().top - 350
                }, 200);
                return false;
            }
        }
    });
});