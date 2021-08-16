/**
*  https://api.whatsapp.com/send?phone=5521996432668&text=Aqui%20entra%20a%20mensagem
*/
$( function() {


   // Define mascara do campo telefone
   $( 'input[name="telefone"]' ).aplicar_mascara({
      "mascara": "(99) 99999-9999",
      "aceita_espacos": false,
      "so_numeros": true
   });


   // Limetando o numero de carecteres no campo mensagem
   $( '#mensagem' ).contaCaracter({
      'max': 150
   });


   /**
   *  GERA O LINK
   */
   $("#gerar").on("click", function(e) {

      e.preventDefault();

      var telefone = document.getElementById("telefone");
      var tipo = $('input[name="tipo"]:checked').val();

      if( telefone.value == "" ) {
         //document.forms['gera_link'].reportValidity();
         //document.forms['gera_link'].focus();
         alert(telefone.validationMessage);
         return false;
      } else {
         telefone.setCustomValidity("");
      }


      //var tel = $('input[name="telefone"').val().replace(/[\(\) -]/g, '');
      var tel = telefone.value.replace(/[\(\) -]/g, '');
      var link = "https://api.whatsapp.com/send?phone=";

      //link += encodeURI( "55" + tel + "&text=" + $('textarea[name="mensagem"').val() );
      link += "55" + tel + "&text=" + encodeURI( $('textarea[name="mensagem"').val() );

      $("#link").attr( 'href', link );


      $(this).hide();
      $("#reset").hide();
      $("#uid").hide();


      if( tipo == "qrcode" ) {

         link = '<img src="qrcode.php?t=' + encodeURIComponent(link) + '" width="200" height="auto">';

         $("#qrc", "#show_qrcode").html(link);

         $("#show_link").hide();
         $("#show_qrcode").show();
         //$("#copiar").hide();
         $("#voltar").show();

      } else {

         if( tipo == "link_texto") {
            link = '<a href="' + link + '">Whatsapp</a>';
         }

         $("#text_link").text( link );

         $("#show_link").show();
         $("#show_qrcode").hide();
         $("#copiar, #voltar").show();

      }

      $("#view").show();

   });



   /**
   *  VOLTA PARA A EDICAO
   */
   $("#voltar").on("click", function(e) {

      e.preventDefault();

      $(this).hide();
      $("#uid").show();
      $("#text_link").text("");
      $("#view").hide();
      $("#copiar").hide();
      $("#gerar").show();
      $("#reset").show();

   });



   /**
   *  COPIA A LINK PARA A AREA DE TRANSFERENCIA
   */
   $("#copiar").on("click", function(e) {

      e.preventDefault();

      copyNodeContents("text_link");

   });

});