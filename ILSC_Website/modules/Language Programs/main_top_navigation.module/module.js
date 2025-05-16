var langCode = $('html')[0].lang;

$('.lng-' + langCode).hide();

$('.language-selector a.language-link').text(langCode);