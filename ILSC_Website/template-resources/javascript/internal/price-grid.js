$(document).ready(function(){

  $(".price-list-grid .program-box-container .price-table .price-row .item-name").each(function () {
      strText = $(this).text();
      firstParanth = strText.indexOf('(');
      lastParanth = strText.lastIndexOf(')');
      if(lastParanth>-1 && lastParanth>-1){
        firstText = strText.slice(0,firstParanth);
        newText = strText.slice(firstParanth+1,lastParanth);
        $(this).html(firstText + " <br><span class='desc-disclaimer'>(" + newText + ")</span>");
      }
  });
  
   $(".price-list-grid .program-box-container .description-container .description ul li span").each(function () {
          noAssetVal = $(this).attr("style");
          if(noAssetVal == 'color: #ff0201;'){
            $(this).removeAttr('style');
            $(this).parent().addClass('no-asset');
          }
  });
});
