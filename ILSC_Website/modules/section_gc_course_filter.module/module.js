function resizeSchedulePriceTable(){
    
    var resizeArray = ['.course-container .title h5','.course-container']
    var arrayLength = resizeArray.length;
    var maxHeight = [];
    
    for (var i = 0; i < arrayLength; i++) {
      maxHeight[i] = 0;
      $(".section-course-filter "+ resizeArray[i]).each(function () {
         if ($(this).height() > maxHeight[i]) { maxHeight[i] = $(this).height(); }
      });
      $(".section-course-filter "+ resizeArray[i]).css('min-height',maxHeight[i]+'px')
    }
  
  }
      
  resizeSchedulePriceTable();
  window.addEventListener("resize", resizeSchedulePriceTable);

const addAreaTag = function(){
   $( ".course-box" ).each(function( index ) {
      areaList = $(this).attr('data-area').split('|');
      for (let i = 0; i < areaList.length; i++) {
        areaStr = areaList[i];
        if(areaStr != 'All'){
          areaHtml = "<div class='tag-area tag-"+areaStr.toLowerCase()+"'>"+areaStr.replace('-',' ')+"</div>";
          $('.course-container .tag-container',this).prepend(areaHtml);
        }
      }
      if(areaList.length > 3){
         $('.course-container .tag-container',this).addClass('tag-column');
      }
   });
};
const shortenBoxes = function(){
   $( ".course-box.show" ).each(function( index ) {
      if(index > 5){
        $(this).removeClass('show').addClass('hide');
      }
    });
    $(".show-more-row").addClass("show").removeClass("hide");
};
const showTargetBoxes = function(targetArea,targetCampus){
  
  loaderSpin();
  courseNumArr = [];
  x = 0;
 
  $( ".course-box" ).each(function( index ) {

     if($(this).attr('data-area').includes(targetArea) && $(this).attr('data-campus').includes(targetCampus)){
        x++;
        $(this).addClass('show').removeClass('hide');
        $(this).attr('data-target',targetArea);
        $(this).attr('data-target-campus',targetCampus);
        courseNumArr.push(x);
      }else{
        
        $(this).addClass('hide').removeClass('show');    
      }
  });
   
  $( ".course-box.show[data-target="+targetArea+"][data-target-campus="+targetCampus+"]" ).each(function( index ) {
    if(index > 5){
      $(this).addClass('hide').removeClass('show');    
    }
  })
  
  if(courseNumArr.length < 7){
    $(".show-row").addClass("hide").removeClass("show");
  }else{
    $(".show-more-row").addClass("show").removeClass("hide");
    $(".show-less-row").addClass("hide").removeClass("show");
  }
  updateTargetCount(targetArea,targetCampus,false);
  
};

const updateTargetCount = function(targetArea,targetCampus,isLoad){

  
  targetCount = targetArea == 'All' && targetCampus == 'All' ? $( ".course-box").length : $( ".course-box[data-target="+targetArea+"][data-target-campus="+targetCampus+"]" ).length;
  $('.search-count-row span.search-count').text(targetCount);
  
  if(!isLoad){
    campusList = [];
    $( ".dropdown-menu a.dropdown-campus" ).each(function( index ) {
      if($(this).attr('data-target-campus') != 'All'){
        campusList.push($(this).attr('data-target-campus'));
      }
    });
    tCampus = targetCampus == 'All' ? campusList.toString().replace(',',' & ') : targetCampus;
    $('.search-count-row span.search-campus').text(' in '+tCampus);
  }
  
  countText = targetArea == 'All' ? 'All' : targetArea.replace('-',' ');
  $('.search-count-row span.search-count-target').text(countText);
};

const showMoreBoxes = function(targetArea,targetCampus){
   $( ".course-box[data-target="+targetArea+"][data-target-campus="+targetCampus+"]" ).each(function( index ) {
    $(this).addClass('show').removeClass('hide');   
   });
  $(".show-more-row").addClass("hide").removeClass("show");
  $(".show-less-row").addClass("show").removeClass("hide");
};

const showLessBoxes = function(targetArea,targetCampus){
  $( ".course-box[data-target="+targetArea+"][data-target-campus="+targetCampus+"]" ).each(function( index ) {
    if(index > 5){
      $(this).addClass('hide').removeClass('show');
    }
   });
  $(".show-more-row").addClass("show").removeClass("hide");
  $(".show-less-row").addClass("hide").removeClass("show");
  $("html, body").animate({ scrollTop: $('#course-row').offset().top - 350 }, 100);

};


$('.show-row a').click(function(){
  let targetArea = $('.section-course-filter button.dropdown-toggle.dropdown-area').attr('data-target'),
      targetCampus = $('.section-course-filter button.dropdown-toggle.dropdown-campus').attr('data-target-campus'),
      targetShow = $(this).attr('data-target');
  if(targetShow == 'show-more'){
    showMoreBoxes(targetArea,targetCampus);
  }else{
    showLessBoxes(targetArea,targetCampus);
  }
});

const loaderSpin = function(){
  let divTarget = '.section-course-filter .row-courses'; 
  $(divTarget).parent().prepend('<div class="lds-dual-ring"></div>');
  $(divTarget).css('visibility','hidden').css('opacity','0');
   setTimeout(function(){$(divTarget).css('visibility','visible').css('opacity','1');},500);
   setTimeout(function(){$('div.lds-dual-ring').remove(0);},500);
};

$('.section-course-filter .search-filter .dropdown-menu a.dropdown-item').click(function(){
  
  let dataTarget = $(this).hasClass('dropdown-campus') ? 'data-target-campus' : 'data-target',
      target = $(this).attr(dataTarget),
      targetText = $(this).text();
  
  $(this).parent().siblings('button.dropdown-toggle').text(targetText);
  $(this).parent().siblings('button.dropdown-toggle').attr(dataTarget,target);
  
});
$('.section-course-filter .search-filter a.btn-search').click(function(){
  let targetArea =  $('.section-course-filter button.dropdown-toggle.dropdown-area').attr('data-target'),
      targetCampus =  $('.section-course-filter button.dropdown-toggle.dropdown-campus').attr('data-target-campus');
    
  showTargetBoxes(targetArea,targetCampus);
});
$( document ).ready(function(){
  let targetArea = $('.section-course-filter button.dropdown-toggle.dropdown-area').attr('data-target'),
      targetCampus = $('.section-course-filter button.dropdown-toggle.dropdown-campus').attr('data-target-campus');
  loaderSpin();
  shortenBoxes();
  updateTargetCount(targetArea,targetCampus,true);
  addAreaTag();
});