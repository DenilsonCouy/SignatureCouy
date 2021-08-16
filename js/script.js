/**
*  Javascript principal
*/

var hh = null;

window.onscroll = function() {

   if( window.innerWidth > 1024 ) {

      //---- Comportamento da barra do topo no scroll
      if( parseInt(window.scrollY) >= 50 ) {
         $("header .head1").css("height", "47px");
      } else {
         $("header .head1").css("height", hh);
      }

   }

}


window.onresize = function() {

   var h = parseInt( $("header .head1").css("height") );
   var corpo_margin_bottom = document.querySelector('footer').offsetHeight-10 + 'px';

   if( parseInt( window.innerWidth ) <= 767 ) {
      $("header .head1 nav").css({"top": h+"px" });
      //$("#corpo #header2").css("padding-top", h+15 + "px");
   }

   $('#corpo').css({
      'margin-bottom': corpo_margin_bottom,
      "padding-top": h + "px"
   });

}


window.onload = function() {

   hh = parseInt( $("header .head1").css("height") );

   window.setTimeout( function() {
      window.onresize();
   } ,200);

}



$( function() {


   $("#hamburger").on("click", function() {

      if( parseInt($("nav").css("left")) < 0 ) {
         $("nav").css("left", "0");
         $("body").css("overflow", "hidden")
      } else {
         $("nav").css("left", "-100%");
         $("body").css("overflow", "auto")
      }

   });


});