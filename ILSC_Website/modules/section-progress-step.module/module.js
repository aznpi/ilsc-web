
$( document ).ready(function() {
    var cookieApplicationValue = getInitCookie('applicationSubmitted');
    var cookieStep2Value = getInitCookie('stepReady-2');
    var cookieStep3Value = getInitCookie('stepReady-3');
    var cookieStep4Value = getInitCookie('stepReady-4');
  
    if(!cookieStep2Value){
     $('li.step-list.step-2 a').removeAttr('href')
    }
    if(!cookieStep3Value){
        $('li.step-list.step-3 a').removeAttr('href')
      }
    if(!cookieStep4Value){
        $('li.step-list.step-4 a').removeAttr('href')
      }
});