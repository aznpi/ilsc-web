function searchArr(nameKey, myArray){
    for (var i=0; i < myArray.length; i++) {
        if (myArray[i].name === nameKey) {
            return myArray[i];
        }
    }
}


function setApplicationStep(schoolVar,stepVar,extVar,langVar){        
        var cookieApplicationValue = getInitCookie('applicationSubmitted');
      	var cookieStepReadyOne = getInitCookie('stepReady-1');
        
        langPrefix = '';
  
        if(langVar){
          if(langVar != 'en'){
            langPrefix = '/'+langVar;
          }
        }
        if(extVar != 'none'){
      	  var urlStep = langPrefix+'/'+schoolVar+'/online-application/step-1-'+extVar;
        }else{
          var urlStep = langPrefix+'/'+schoolVar+'/online-application/step-1';
        }
      	if(cookieApplicationValue || !cookieStepReadyOne){
          window.location.replace(urlStep);
        }else{
          createCookie('stepReady-'+stepVar,true);
        }
}
function redirectApplicationStepV2(schoolVar,stepVar,extVar,langVar,emailVar){    
            nextStep = stepVar + 1;
            langPrefix = '';
  
            if(langVar){
              if(langVar != 'en'){
                langPrefix = '/'+langVar;
              }
            }
            if(extVar != 'none'){
              url = langPrefix+'/'+schoolVar+'/online-application/step-'+nextStep+'-'+extVar+'?email='+emailVar;
            }else{
              url = langPrefix+'/'+schoolVar+'/online-application/step-'+nextStep+'?email='+emailVar;
            }
            // Send the data using post
            $('.section-form').hide();
            $("html, body").animate({ scrollTop: 0 },100);
            $('.section-loader').show();
            if(stepVar == 1){
              createCookie('stepReady-1',true);
            }
           window.location.replace(url);
}
function redirectApplicationStepAgent(schoolVar,stepVar,extVar,langVar,emailVar){    
            nextStep = stepVar + 1;
            langPrefix = '';
  
            if(langVar){
              if(langVar != 'en'){
                langPrefix = '/'+langVar;
              }
            }
            if(extVar != 'none'){
              url = langPrefix+'/'+schoolVar+'/online-application/step-'+nextStep+'-'+extVar+'?email='+emailVar;
            }else{
              url = langPrefix+'/'+schoolVar+'/online-application/step-'+nextStep;
            }
            // Send the data using post
            $('.section-form').hide();
            $("html, body").animate({ scrollTop: 0 },100);
            $('.section-loader').show();
            if(stepVar == 1){
              createCookie('stepReady-1',true);
            }
           window.location.replace(url);
}
function redirectApplicationStep(schoolVar,stepVar,extVar,langVar){    
            nextStep = stepVar + 1;
            langPrefix = '';
  
            if(langVar){
              if(langVar != 'en'){
                langPrefix = '/'+langVar;
              }
            }
            if(extVar != 'none'){
              url = langPrefix+'/'+schoolVar+'/online-application/step-'+nextStep+'-'+extVar;
            }else{
              url = langPrefix+'/'+schoolVar+'/online-application/step-'+nextStep;
            }
            // Send the data using post
            $('.section-form').hide();
            $("html, body").animate({ scrollTop: 0 },100);
            $('.section-loader').show();
            if(stepVar == 1){
              createCookie('stepReady-1',true);
            }
           window.location.replace(url);
}

function submitProcess(schoolVar,stepVar,extVar,langVar){
            langPrefix = '';
  
            if(langVar){
              if(langVar != 'en'){
                langPrefix = '/'+langVar;
              }
            }
             if(extVar == 'agent'){
               url = langPrefix+'/'+schoolVar+'/online-application/thank-you?userType=agent';
             }else{
               url = langPrefix+'/'+schoolVar+'/online-application/thank-you';
             } 
  
           $('.section-text .container').hide();
          	createCookie('applicationSubmitted',true);
          stepPlusOne = stepVar + 1;
         	var i;
            for (i = 1; i < stepPlusOne; i++) {
              deleteCookie('stepReady-'+i);
            }
          
         	deleteCookie('eForm');
         	$('.section-form').hide();
          $("html, body").animate({ scrollTop: 0 }, 100);
         	$('.section-loader').show();
         	window.location.replace(url);
}
