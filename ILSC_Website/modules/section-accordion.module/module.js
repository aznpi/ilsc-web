$('.collapse').on('shown.bs.collapse', function (e) {
    var $panel = $(this).closest('.collapse');
    $('html,body').animate({
        scrollTop: $panel.offset().top-200
    }, 100); 
}); 