var maxHeight = 0;

$(".filter-program-container .program-box-slide .col-md-4 .box-container").each(function(){
   if ($(this).height() > maxHeight) { maxHeight = $(this).height(); }
});

$(".filter-program-container .program-box-slide .col-md-4 .box-container").height(maxHeight);

const evalSearch = function(thisElement){
  $('.filter-program-container .program-box-slide').prepend('<div class="lds-dual-ring"></div>');
  $('.filter-program-container .program-box-slide .program-box-container').hide();

  if(thisElement){ 
    let programCategoryArray = [],
         campusArray = [],
         studyCampusArray = [],
         programsArray = [],
         searchTxt = $(thisElement).val();

     $(thisElement).prop('disabled', true);
     $(".filter-program-container span.result-text").html(searchTxt);
     if($(".filter-program-container p.search-txt-container").find('span.search-clear-container').length == 0){
        $(".filter-program-container p.search-txt-container").append("<span class='search-clear-container'>&nbsp;&nbsp;&nbsp;<a href='#' class='footnote clear-search' onClick='return false;'>clear</a></span>");
     }
     $(".filter-program-container .search-filter-container input[type=checkbox]").not(thisElement).prop('checked', false).prop('disabled', false);
     
     $('.filter-program-container .search-filter-container input[type=checkbox]:checked').each(function(index){

      if($(this).attr('data-filter-category') == 'program-category'){
       programCategoryArray.push($(this).val());
      }
      if($(this).attr('data-filter-category') == 'campus-location'){
        campusArray.push($(this).val());
      }
      if($(this).attr('data-filter-category') == 'study-campus'){
        studyCampusArray.push($(this).val());
      }

      if($(this).attr('data-filter-category') == 'programs' ){
        programsArray.push($(this).val());
      }
     });

     $('.program-box-slide .program-box-container').each(function(){
        let showCategoryDiv = false,
            showCampusDiv = false,
            showStudyProgramDiv = false,
            showProgramsDiv = false,
            programCategorySelected = $(this).attr('data-program-category'),
            campusList = $(this).attr('data-campus-location').split(','),
            studyCampusList = $(this).attr('data-study-campus').split(','),
            programsList = $(this).attr('data-programs').split(','),
            checkSubset = (parentArray, subsetArray) => {
              return subsetArray.every((el) => parentArray.includes(el));
            };

       if(programCategoryArray.length > 0){
        if(programCategoryArray.includes(programCategorySelected)){
          showCategoryDiv = true;
        }else{
          showCategoryDiv = false;
        }
       }else{
        showCategoryDiv = true;
       }

       if(campusArray.length > 0){
          isCampusSubset = campusArray.length > campusList.length ? checkSubset(campusArray,campusList) : checkSubset(campusList,campusArray);
          if(isCampusSubset){
            showCampusDiv = true;
          }else{
            showCampusDiv = false;
          }
        }else{
          showCampusDiv = true;
        }

        if(studyCampusArray.length > 0){
          isStudyCampusSubset = studyCampusArray.length > studyCampusList.length ? checkSubset(studyCampusArray,studyCampusList) : checkSubset(studyCampusList,studyCampusArray);      
          if(isStudyCampusSubset){
            showStudyProgramDiv = true;
          }else{
            showStudyProgramDiv = false;
          }
        }else{
          showStudyProgramDiv = true;
        }

         if(programsArray.length > 0){
           isProgramsSubset = programsArray.length > programsList.length ? checkSubset(programsArray,programsList) : checkSubset(programsList,programsArray); 

           if(isProgramsSubset){
              showProgramsDiv = true;
            }else{
              showProgramsDiv = false;
            }
          }else{
            showProgramsDiv = true;
        }

        if(showCategoryDiv && showCampusDiv && showStudyProgramDiv && showProgramsDiv){
          $(this).delay(700).show(300);
        }else{
           $(this).delay(700).hide(200);
        }

     });
  }else{
    $('.program-box-slide .program-box-container').each(function(){
      $(this).delay(700).show(300);
    });
  }

     setTimeout(function(){$('div.lds-dual-ring').remove(0);},500);
}
$(document).on('click','a.clear-search',function(){
  $(".filter-program-container .search-filter-container input[type=checkbox]").prop('checked', false).prop('disabled',false);
  $(".filter-program-container span.result-text").html('All');
  $(".filter-program-container span.search-clear-container").remove();
  evalSearch();
});
 $(document).on('change','.filter-program-container .search-filter-container input[type=checkbox]',function (event) {
   evalSearch(this);
 });

    