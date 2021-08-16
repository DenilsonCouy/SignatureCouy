$(function() {

   $( "#tabs" ).tabs();

   //---- Define mascara do campo telefone
   $( 'input[name="telefone"], input[name="celular"]' ).aplicar_mascara({
      "mascara": "(99) 99999-9999",
      "aceita_espacos": false,
      "so_numeros": true
   });



   var style_text = "color: inherit !important; text-decoration:none; font-family:arial !important; font-size:inherit !important; margin:0; padding:0; line-height:23px;";


   $("#comecar").click(function() {
      document.getElementById("aplication").scrollIntoView({ behavior: 'smooth' });
   });



   /*** ABA GERAL */
   $('input[name="nomecompleto"]', "#tab-general").keyup(function() {
      let $target = $("#name-color", "#preview_assinatura");
      let val = $(this).val();
      $target.text( val );
   })
   $('input[name="cargo"]', "#tab-general").keyup(function() {
      let $target = $("#cargo", "#preview_assinatura");
      let val = $(this).val();
      if( $('input[name="departamento"]', "#tab-general").val() != "" ) {
         if( val != "" ) {
            val = val + " - " + $('input[name="departamento"]', "#tab-general").val();
         } else {
            val = $('input[name="departamento"]', "#tab-general").val();
         }
      }
      $target.text( val );
      if( val != "" ) {
         $("#cargo").show();
      } else {
         $("#cargo").hide();
      }
   })
   $('input[name="departamento"]', "#tab-general").keyup(function() {
      let $target = $("#cargo", "#preview_assinatura");
      let val = $(this).val();
      if( $('input[name="cargo"]', "#tab-general").val() != "" ) {
         if( val != "" ) {
            val = $('input[name="cargo"]', "#tab-general").val() + " - " + val;
         } else {
            val = $('input[name="cargo"]', "#tab-general").val();
         }
      }
      $target.text( val );
      if( val != "" ) {
         $("#cargo").show();
      } else {
         $("#cargo").hide();
      }
   })
   $('input[name="empresa"]', "#tab-general").keyup(function() {
      let $target = $("#empresa", "#preview_assinatura");
      let val = $(this).val();
      $target.text( val );
   })
   $('input[name="email"]', "#tab-general").keyup(function() {
      let $target = $("#email", "#preview_assinatura");
      let val = $(this).val();
      $target.html( '<a href="mailto:' + val + '" style="' + style_text + '" target="_blank">' + val + '</a>' );
   })
   $('input[name="website"]', "#tab-general").keyup(function() {
      let $target = $("#site", "#preview_assinatura");
      let val = $(this).val();
      let link = val;
      link = ( link.indexOf("http://") < 0 ) ? "http://" + link : link;
      $target.html( '<a href="' + link + '" style="' + style_text + '" target="_blank">' + val + '</a>' );
   })
   /*** FIM DA ABA GERAL */



   /*** ABA CONTATOS */
   $('input[name="telefone"]', "#tab-contacts").keyup(function() {
      let $target = $("#telefone", "#preview_assinatura");
      let val = $(this).val();
      $target.text( "Telefone: " + val );
      if( val != "" ) {
         $("#telefone").show();
      } else {
         $("#telefone").hide();
      }
   })

   $('input[name="celular"]', "#tab-contacts").keyup(function() {
      let $target = $("#celular", "#preview_assinatura");
      let val = $(this).val();
      // Eh Whatsapp não celular
      if( $("input[name=whatsapp]").prop('checked') ) {
         val = val + ' (<a href="http://wa.me/55' + val + '">somente Whatsapp</a>)';
      } else {
         val = "Celular: " + val;
      }

      $target.html( val );
      if( val != "" ) {
         $("#celular").show();
      } else {
         $("#celular").hide();
      }
   })

   $('input[name="whatsapp"]', "#tab-contacts").change(function() {

      let $target = $("#celular", "#preview_assinatura");
      let val = $('input[name="celular"]').val();
      let link = val;

      // Confirma usar celular com whatsapp.
      if( $(this).prop( "checked" ) ) {
         if( confirm("Você deseja usar o seu número de celular como número do Whatsapp?") ) {
            $(this).prop( "checked", true );
         } else {
            $(this).prop( "checked", false );
         }
      }

      // Higeinizando o link tirando hifens, espacos, parentes, etc.
      link = link.replace(/[+55|\-|(|)|\s]/g, "");

      // Eh Whatsapp não celular.
      if( $("input[name=whatsapp]").prop('checked') ) {
         $target.html( val + ' (<a href="http://wa.me/55' + link  + '" target="_blank">somente Whatsapp</a>)');
      } else {
         $target.text("Celular: " + val);
      }

   })

   $('input[name="skype"]', "#tab-contacts").keyup(function() {
      let $target = $("#skype", "#preview_assinatura");
      let val = $(this).val();
      $target.text( "Skype: " + val );
      if( val != "" ) {
         $("#skype").show();
      } else {
         $("#skype").hide();
      }
   })

   $('input[name="endereco"]', "#tab-contacts").keyup(function() {
      let $target = $("#endereco", "#preview_assinatura");
      let val = $(this).val();
      $target.text( val );
      if( val != "" ) {
         $("#endereco").show();
      } else {
         $("#endereco").hide();
      }
   })
   /*** FIM ABA CONTATOS */


   /*** ABA IMAGENS */
   if( window.innerWidth < 768 ) {

      // Para ativar ativação da camera.
      //$('input[name="arquivo"]').attr("capture","CAPTURE");

   } else {

      // Desativa a ativacao da camera.
      //$('input[name="arquivo"]').removaAttr("capture");

   }


   $('#btn_upload').on('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('input[name="arquivo"]').trigger('click');
   })

   $('#btn_camera').on('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('input[name="selfie"]').trigger('click');
   })

   $('input[name="arquivo"], input[name="selfie"]').on('change', function() {

      $this = $(this)

      //var arquivo = $(this).val();
      var arquivo = document.getElementById($this.attr('name'));
      // O Javascript tem o objeto filelist com dados do arquivo selecionado no campo tipo file.
      var arq_nome = arquivo.files[0]['name'];

      if( arq_nome != "" && arq_nome != undefined ) {
         // Exibe a imagem sem necessidade do upload atraves do objeto URL.
         $("#contem_foto img").attr('src', URL.createObjectURL(arquivo.files[0]));
         $("#foto").val( arq_nome );

         //var file_data = $("#arquivo").prop("files")[0];
         var file_data = $('input[name="' + $this.attr('name') + '"]').prop("files")[0];
         var form_data = new FormData();
         form_data.append("file", file_data);

         $.ajax({
            url: "upload.php"
            ,type: "POST"
            ,data: form_data   //new FormData($('input[name="arquivo"]'))
            ,processData: false
            ,contentType: false
            ,cache: false
            ,async: true     // assync false, faz uma execução completa por vez. Aguarda fim da execução para executar para o proximo loop
            ,dataType: "json"
            ,beforeSend: function() {
               // antes de enviar
            }
            ,success: function(data, textStatus, jqXHR) {
               //let thispath = location.origin + location.pathname + "uploads/";
               let thispath = getPath() + "uploads/";
               if( data.erro !=0 ) {
                  alert(data.erroDesc);
               } else {
                  $("#contem_foto img").attr('src', thispath + data.arquivo );
               }
            }
            ,complete: function(jqXHR, textStatus) {
               // ao completar com ou sem erro
            }
         });
      }
   });

   $('input[name="foto"]', "#tab-images").keyup(function() {
      let $target = $("img.picture", "#preview_assinatura");
      let val = $(this).val();
      if( val.trim()=="" ) {
         val = "imagens/foto.jpg";
      }
      $("#arquivo").val("");  // limpa o campo tipo file utilizado para uploads

      if( cwFileExists(val) ) {
         //val = "data:" + val + ";base64";
         $target.attr('src', val);
      } else {
         $(this).val("");
         alert("Impossível utilizar esta imagem. Utilize a foto de perfil de uma das suas redes sociais.");
      }

   })
   $('input[name="foto_href"]', "#tab-images").keyup(function() {
      let $target = $("#contem_foto");
      let $foto = $("img.picture", "#preview_assinatura");
      let val = $(this).val();
      if( val.trim()!="" ) {
         val = '<a href="' + val + '" target="_blank">' + $foto.prop('outerHTML') + "</a>";
      } else {
         val = $foto.prop('outerHTML');
      }
      $target.html(val);
   })
   $(".btn-link", "#tab-images").on("click", function(e) {
      e.preventDefault();
      $(".panel-collapse").toggleClass("show");
   });
   /*** FIM ABA IMAGENS */



   /*** BOTAO VOLTAR PARA A EDICAO */
   $("#voltar").on("click", function(e) {
      e.preventDefault();

      $(this).hide();
      $("#copy_clipboard").removeAttr("disabled");
      $("#aplication").fadeIn(1500);
      $("#signature-source-code").text("");
      $("#code_view").hide();
      $("#instrucoes").hide();

      document.getElementById("aplication").scrollIntoView({ behavior: 'smooth' });

   });
   /*** FIM BOTAO VOLTAR PARA A EDICAO */



   /*** BOTAO GERAR CODIGO */
   $("#gerar_html").on("click", function(e) {
      e.preventDefault();

      let html = $("#preview_assinatura").html();

      $("#aplication").fadeOut();
      $("#instrucoes").hide();

      $("#copy_clipboard").attr("disabled","disabled");
      if( window.innerWidth > 767 ) {
         $("#voltar").css("display", "inline-block");
      } else {
         $("#voltar").css("display", "block");
      }

      $("#code_view").fadeIn(1500);
      $("#signature-source-code").text(html.trim());

      document.getElementById("code_view").scrollIntoView({ behavior: 'smooth' });

   });
   /*** FIM BOTAO GERAR CODIGO */



   /*** BOTAO COPIAR PARA A AREA DE TRANSFERENCIA */
   $("#copy_clipboard").on("click", function(e) {
      e.preventDefault();

      copyNodeContents("preview_assinatura");
      $("#app").hide();
      $("#instrucoes").fadeIn(1500);

      document.getElementById("contem_gerar").scrollIntoView({ behavior: 'smooth' });

   });
   /*** FIM BOTAO COPIAR PARA A AREA DE TRANSFERENCIA */



   /*** BOTAO COPIAR CODIGO FONTE PARA AREA DE TRANSFERENCIA */
   $("#copy_html").on("click", function(e) {
      e.preventDefault();

      copyForm("signature-source-code");
      //copyClipboard("table_assinatura");

   });
   /*** FIM BOTAO COPIAR CODIGO FONTE PARA AREA DE TRANSFERENCIA */

});



/**
*  Verifica se um arquivo existe
*/
function cwFileExists(url) {
    if(url){

      try {

         //throw new Error('myError');

         var req = new XMLHttpRequest();
         req.open('GET.html', url, false);
         //req.setRequestHeader('X-PINGOTHER', 'pingpong');
         req.onreadystatechange = function() {
           console.log( req.status );
         } //handler;
         req.send();

         if( req.status==200 ) {
           return true;
         } else {
           return false;
         }

      }
      catch(e) {

         //alert(e.stack);
         return false;

      }


    } else {
        return false;
    }
}


function getPath() {

   path = location.origin + location.pathname;
   pst = path.lastIndexOf('https://www.concepcaoweb.com.br/') + 1;
   return path.slice(0, pst);

}

