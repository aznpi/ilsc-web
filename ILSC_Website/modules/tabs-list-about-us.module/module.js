	$(document).ready(function() {// Javascript to enable link to tab
      var url = document.location.toString();
      var hashId =  url.split('#')[1];
      if (url.match('#')) {
          if(hashId){   
            $('.tab-pane').removeClass('active').removeClass('show');
            $('.navbar.nav-tab-about a[href="#' + hashId + '"]').tab('show');
          }
      } 

      // Change hash for page-reload
      $('.nav-tabs a').on('shown.bs.tab', function (e) {
          window.location.hash = e.target.hash;
      })
  });