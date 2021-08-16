/**
*  https://api.whatsapp.com/send?phone=5521996432668&text=Aqui%20entra%20a%20mensagem
*/
$( function() {


   //---- Limetando o numero de carecteres no campo texto_livre
   $( 'textarea[name="sms_msg"]' ).contaCaracter({ 'max': 120 });
   $( 'textarea[name="zap_msg"]' ).contaCaracter({ 'max': 120 });
   $( 'textarea[name="texto_livre"]' ).contaCaracter({ 'max': 500 });


   //---- Definindo mascara para o campo telefone
   $( 'input[name="telefone"]' ).aplicar_mascara( {"mascara":"(99) 99999-9999", "aceita_espacos":false, "so_numeros":true} );
   $( 'input[name="sms_tel"]' ).aplicar_mascara( {"mascara":"(99) 99999-9999", "aceita_espacos":false, "so_numeros":true} );
   $( 'input[name="zap_tel"]' ).aplicar_mascara( {"mascara":"(99) 99999-9999", "aceita_espacos":false, "so_numeros":true} );
   $( 'input[name="card_tel"]' ).aplicar_mascara( {"mascara":"(99) 99999-9999", "aceita_espacos":false, "so_numeros":true} );


   //---- Ao selecionar tipo de QR Code
   $('input[name="qr_tipo"]').on("click" ,function(e) {

      var tipo = $(this).val();

      $('.tipo').addClass("oculta");

      switch( tipo ) {
         case "is_tel":
            $("#tipo_telefone").toggleClass("oculta");
            break;

         case "is_sms":
            $("#tipo_sms").toggleClass("oculta");
            break;

         case "is_wifi":
            $("#tipo_wifi").toggleClass("oculta");
            break;

         case "is_whatsapp":
            $("#tipo_whatsapp").toggleClass("oculta");
            break;

         case "is_cartao":
            $("#tipo_cartao").toggleClass("oculta");
            break;

         case "is_txt":
            $("#tipo_texto").toggleClass("oculta");
            break;

      }

   });



   /**
   *  GERA O LINK
   */
   $("#gerar").on("click", function(e) {

      e.preventDefault();

      var tipo = $('input[name="qr_tipo"]:checked').val();
      var content = null;

      if( tipo != "" && tipo != undefined ) {

         switch( tipo ) {
            case "is_tel":
               let tel = $('input[name="telefone"]').val();
               if( tel.length == 15 ) {
                  content = "tel:" + tel;
               }
               break;

            case "is_sms":
               let sms_tel = $('input[name="sms_tel"]').val();
               let sms_msg = $('textarea[name="sms_msg"]').val();
               if( sms_tel.length == 15 && sms_msg.length > 0 ) {
                  content = "smsto:" + sms_tel + ":" + sms_msg;
               }
               break;

            case "is_wifi":
               let ssid = $('input[name="wifi_ssid"]').val();
               let cripto = $('input[name="wifi_cripto"]:checked').val();
               let pwd = $('input[name="wifi_pwd"]').val();
               if( ssid != "" && cripto != undefined && pwd != "" )
                  content = "WIFI:S:" + ssid + ";T:" + cripto + ";P:" + pwd + ";;";
               break;

            case "is_whatsapp":
               let telefone = document.getElementsByName("zap_tel")[0];
               let zap_tel = telefone.value.replace(/[\(\) -]/g, '');
               let zap_msg = $('textarea[name="zap_msg"').val();
               if( zap_tel != "" && zap_tel != undefined ) {
                  content = "https://api.whatsapp.com/send?phone=55" + zap_tel + "&text=" + encodeURI( zap_msg );
               }
               break;

            case "is_cartao":
               let card_nome  = document.getElementsByName("card_nome")[0].value;
               let card_tel   = document.getElementsByName("card_tel")[0].value.replace(/[\(\) -]/g, '');
               let card_org   = $('input[name="card_org"]').val();
               let card_cep   = $('input[name="card_cep"]').val();
               let card_email = $('input[name="card_email"]').val();
               let card_site  = $('input[name="card_site"]').val();
               let card_notas = $('input[name="card_notas"]').val();
               if( card_nome != "" && card_tel != "" ) {
                  // MECARD:N:jose;TEL:332321133;EMAIL:jjdo@sd.do;;
                  content = "MECARD:N:" + card_nome + ";TEL:" + card_tel + ";ORG:" + card_org + ";ADR:" + card_cep + ";EMAIL:" + card_email + ";URL:" + card_site + ";;";
               }
               break;

            case "is_txt":
               let msg = $('textarea[name="texto_livre"]').val();
               if( msg != "" && msg != undefined)
                  content = msg;
               break;

         }


         if( content != null ) {

            content = '<img src="qrcode.php?t=' + encodeURIComponent(content) + '" width="250" height="auto">';

            //$(this).hide();
            //$("#reset").hide();
            //$("#uid").hide();

            $("#qrc", "#show_qrcode").html(content);

            //$("#show_qrcode").show();
            if( window.innerWidth <= 768 ) {
               $("#aplication .grid .a").hide();
               $("#aplication .grid .b").show();
            }

            //$("#voltar").show();
            $("#view").show();
            $("#aplication .grid .b").show();
            document.querySelector('#aplication').scrollIntoView()
      
         } else {

            alert('Valor informado não é válido.');

         }

      } else {

         alert('Valor informado não é válido.');

      }

   });



   /**
   *  VOLTA PARA A EDICAO
   */
   $("#voltar").on("click", function(e) {

      e.preventDefault();

      if( window.innerWidth <= 768 ) {
         $("#aplication .grid .a").show();
         $("#aplication .grid .b").hide();
      }

   });

});