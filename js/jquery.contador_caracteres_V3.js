/*
----------------------------------------------------------
    Plugin JQuery
    Contador de caracteres para campos textos de um formulario.
    Autor: Jorge Rodrigues - Agosto/2012

    Como usar:

    $( [string seletor] ).contaCaracter( <opcional array opcoes> );

    Opções é opcional e deve ser um array no formato

       {'max':[int valor], 'texto_default':[string valor]}

    Onde:
       max..........: é o número máximo de caracteres aceito pelo campo
       texto_default: é o texto inicial a ser exibido no campo quando a
                      página é acessada

   Opções pode conter somente um valor ou nenhum já que os valores
   das duas propriedades do prlugin já sao definidos internamente
   com valores iniciais.

   Exemplos:

      //  usa os valores internos para as propriedades
      $( 'input [name="nome"]' ).contaCaracter();
      //  define o valor inicial do campo
      $( 'input [name="endereco"]' ).contaCaracter( {"texto_default":"digite o seu endereço completo"} );
      //  limita o texto digitado em 30 caracteres
      $( 'input [name="cidade"]' ).contaCaracter( {"max":30} );
      //  limita o texto digitado em 30 caracteres define o texto inicial do campo
      $( 'input [name="cidade"]' ).contaCaracter( {"max":30, "texto_default":"digite o seu estado"} );

----------------------------------------------------------
*/

(function( $ ) {
   $.fn.contaCaracter = function(settings) {

      //  Declarando um objeto interna com as propriedades do plugin.
      var config = {
         'max': 250,
         'text_default': ""
      };

      // Deixe seu plugin o mais flexível e amigável possível para o usuário,
      // usando as opções. O método $.extend() pega dois ou mais objetos
      // como argumentos e une seus conteúdos dentro do primeiro objeto.
      // Nest caso pega o objeto config declarado acima e junta com o
      // objeto settings passado no argumento.
      if (settings) {
         $.extend(config, settings);
      }


      //    A função tem que retornar this.each(..) para manter a
      //    capacidade de “acorrentamento” – de modo que a função
      //    possa ser usada com um ou com vários objetos jQuery.
      return this.each(function() {

         $this = $(this)[0];

         //var campoId = campo.attr("name");
         var id_contador = "contador_" + $this.name;

         //----  Iserindo um div abaixo do campo para exibir o contador
         $(this).after('<div class="cont_char" id="' + id_contador + '"></div>');

         id_contador = "#" + id_contador;

         $(id_contador).html("Voc&ecirc; ainda tem " + String(config.max) + " caracteres. " );

         //  Cor da fonte definida no CSS
         var fontcolor = $(id_contador).css("color");

         //----  Atualizando o contador quando a pagina e carregada.
         // Conteudo do campo passado no argumento
         var val = $this.value;
         // O numero de caracteres atual
         var cont = (config.max - val.length);
         $(id_contador).html("Voc&ecirc; ainda tem " + String(cont) + " caracteres. " );


         //----  Incluindo texto default no campo
         if( config.texto_default != "" && config.texto_default != undefined ) {
            $(this).val(config.texto_default);
         }


         //----  Conta e limita o numero de caracteres no campo de mensagem.
         $(this).keyup( function(e) {

            //  A tecla pressionada no evento.
            tecla = e.which;

            //contar("postal_msg", max, tecla);

            campo = $(this);

            // Conteudo do campo passado no argumento
            var val = campo.val();
            // O numero de caracteres atual
            var cont = (config.max - val.length);

            if ( cont >= 0 ) {
               $(id_contador).html("Voc&ecirc; ainda tem " + String(cont) + " caracteres. " );
            }

            //if( tecla!=13 && tecla!=27 )
            if( (tecla>=48 && tecla<=111) || (tecla>=186 && tecla<=222) || (tecla==8) ) {
               if((cont)<0) {
                  $( campo.val(val.substring(0,config.max)) );
                  alert('Atenção, você atingiu o limite máximo de caracteres!');
               }
            }

         });

      });

   };
})( jQuery );
