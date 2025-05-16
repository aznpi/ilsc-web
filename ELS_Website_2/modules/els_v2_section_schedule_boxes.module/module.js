$(document).ready(function(){
  
      function resizeScheduleBoxes(){
        
        var resizeArray = ['.title-container','.time-container','.time-description-container']
        var arrayLength = resizeArray.length;
        var maxHeight = [];
        
        for (var i = 0; i < arrayLength; i++) {
          maxHeight[i] = 0;
          $(".section-schedule-boxes "+ resizeArray[i]).each(function () {
            if ($(this).height() > maxHeight[i]) { maxHeight[i] = $(this).height(); }
          });
          $(".section-schedule-boxes "+ resizeArray[i]).height(maxHeight[i]);
        }
      
      }
          
      resizeScheduleBoxes();
      window.addEventListener("resize", resizeScheduleBoxes);
    });