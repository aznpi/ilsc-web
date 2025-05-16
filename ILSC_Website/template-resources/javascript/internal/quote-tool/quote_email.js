const emailQuote = function(){
  apiKey = 'a1346c44-af44-4de4-b923-17cb9cc86034';
  urlEmail = 'https://api.hubapi.com/marketing-emails/v1/emails?hapikey='+apiKey;
  emailData = {
      "author": "chi.tat.chow@gmail.com",
      "authorEmail": "chi.tat.chow@gmail.com",
      "authorName": "Tat Chow",
      "emailType": "LEADFLOW_EMAIL",
      "fromName": "ILSC Sales Team",
      "name": "ILSC Quote Email",
      "subject": "Here is your Pricing Quote from ILSC",
      "emailBody": "Hello World",
      "replyTo": "info@ilsc.com",
	};
  $.ajax({
      url : urlEmail,
      type : "post",
      async: true,
      data: emailData,
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success : function(data) {
        console.log('sent email')
      },
      error: function() {
         console.log('email fail')
      }
   });
  

}