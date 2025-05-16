
$(document).ready(function(){
  
  function resizePriceTable(){
    
    var resizeArray = ['.time-block','.title','.sub-description','.main-description']
    var arrayLength = resizeArray.length;
    var maxHeight = [];
    
    for (var i = 0; i < arrayLength; i++) {
      maxHeight[i] = 0;
      $(".section-schedule .program-box-container "+ resizeArray[i]).each(function () {
         if ($(this).height() > maxHeight[i]) { maxHeight[i] = $(this).height(); }
      });
      $(".section-schedule .program-box-container "+ resizeArray[i]).height(maxHeight[i]);
    }
  
  }
      
  resizePriceTable();
  window.addEventListener("resize", resizePriceTable);
  
})
