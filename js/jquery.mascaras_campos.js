/*
----------------------------------------------------------
Plugin JQuery
Aplica máscaras no valores digitados num campo de formulario.
Autor: Jorge Rodrigues - Agosto/2012

Historico de versões:

Versão 2 - Set/2012 - Mudança na passagem da mascara. Agora deve-se passar
                      a mascara entre aspas e não mais o tipo de mascara.

Como usar:

   $( [string seletor] ).contaCaracter( <array opcoes> );

Opções é opcional e deve ser um array no formato

   {'aceita_espacos': false, 'so_numeros': false, 'mascara': '<string com a mascara>' };

Onde:
   aceita_espacos.......: [opcional] Indica se o capo aceita espaços em branco. Valor padrao false.
   so_numeros...........: [opcional] Indica se o campo aceita somente digitos. Valor padrao false.
   mascara..............: String com a mascara a ser aplicada ao campo. Caracteres devem ser
                          representados por zeros (0). Exemplo "00/00/0000".
   debug................: [opcional] Exibe informacoes para depuracao no console do navegador.Valor padrao false.

Exemplos:

   //  define a mascara para data
   $( 'input [name="data"]' ).aplicar_mascara( {"mascara":"00/00/0000"} );
   //  define a mascara para data e que o campo aceita espacos em branco
   $( 'input [name="data"]' ).aplicar_mascara( {"mascara":"00/00/0000", "aceita_espacos":TRUE} );
   //  define a mascara para data e que o campo aceita espacos em branco e somentes digitos
   $( 'input [name="data"]' ).aplicar_mascara( {"mascara":"00/00/0000", "aceita_espacos":TRUE, "so_numeros":TRUE} );

----------------------------------------------------------
*/

(function( $ ) {
   $.fn.aplicar_mascara = function(settings) {

      var v_fun="";
      var RegEx_sonum = /([a-z]|\+|\?|\$|!|=|&|#|"|'|\*|_|%|¨|\^|´|`|º|ª)+/ig;

      //  Declarando um objeto interna com as propriedades do plugin.
      var options = {
         'aceita_espacos': false,
         'so_numeros': false,
         'mascara': '',
         'debug': false
         };

      // Deixe seu plugin o mais flexível e amigável possível para o usuário,
      // usando as opções. O método $.extend() pega dois ou mais objetos
      // como argumentos e une seus conteúdos dentro do primeiro objeto.
      // Nest caso pega o objeto config declarado acima e junta com o
      // objeto settings passado no argumento.
      if (settings) {
         $.extend(options, settings);
      }

      const border = $(this).css('border');

      //    A função tem que retornar this.each(..) para manter a
      //    capacidade de “acorrentamento” – de modo que a função
      //    possa ser usada com um ou com vários objetos jQuery.
      return this.each(function() {

         //----  Quando uma tecla eh pressionada.
         //$(this).keyup( function(e) {
         $(this).on('keyup touchend', function(e) {

            //----  Nome do campo texto
            campo = $(this);

            thisfield = document.querySelector( 'input[name=' + campo.attr('name') );

            if( !thisfield.checkValidity() ) {
               thisfield.style.border = "1px solid #FF3300";
            } else {
               thisfield.style.border = border;
               thisfield.setCustomValidity("");
            }

            // Pegando o conteudo do campo.
            var val = campo.val();

            //  A tecla pressionada no evento.
            //if (navigator.userAgent.match(/Android/i)) {
            if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {

               let inputValue = val;

               let charKeyCode = e.keyCode || e.which;

               if (charKeyCode == 0 || charKeyCode == 229) {
                  charKeyCode = inputValue.charCodeAt(inputValue.length-1);  //getKeyCode(inputValue);
                  tecla = charKeyCode;
               } else {
                  tecla = charKeyCode;
               }

            } else {
               tecla = e.which;
            }


            //  Aplicando a mascara
            //if( tecla!=13 && tecla!=27 )
            //if( (tecla>=48 && tecla<=111) || (tecla>=186 && tecla<=222) || (tecla==8) ) [
            if( (tecla>=48 && tecla<=111) || (tecla>=186 && tecla<=222) || (tecla>=96 && tecla<=105) ) {

               isNum = true;
               masc  = "";

/*               switch (options.tipo_mascara) [
                  case "mCEP":
                     masc = "00.000-000";
                     isNum = mascaraInteiro(e);  //  so para campos numericos
                     break;
                  case "mTelefone":
                     masc = "(00) 0000-0000";
                     isNum = mascaraInteiro(e);  //  so para campos numericos
                     break;
                  case "mCPF":
                     masc = "000.000.000-00";
                     isNum = mascaraInteiro(e);  //  so para campos numericos
                     break;
                  case "mCNPJ":
                     masc = "000.000.000/0000-00";
                     isNum = mascaraInteiro(e);  //  so para campos numericos
                     break;
                  case "mData":
                     masc = "00/00/0000";
                     isNum = mascaraInteiro(e);  //  so para campos numericos
                     break;
                  case "mSoNumeros":
                     isNum = mascaraInteiro(e);  //  so para campos numericos
                     if( isNum==false ) {
                        val = val.substring(0,val.length-1);
                        $(campo).val(val);
                        e.returnValue = false;
                        return false;
                     }
                     break;
               ]
*/

               if (options.so_numeros) {
                  //isNum = mascaraInteiro(e);  //  so para campos numericos
                  isNum = mascaraInteiro(val);  //  so para campos numericos
                  if( isNum==false ) {
                     //val = val.replace(/([a-z])?([A-Z])?/g,"");
                     val = val.replace(RegEx_sonum,"");
                     $(campo).val(val);
                     e.returnValue = false;
                     alert("Este campo só aceita números.");

                     return false;
                  }
               }

               masc = options.mascara;  // + " ";

               if ( masc!="" ) {

                  if ( isNum ) {

                     //  Aplicando a mascara indicada ao valor do campo.
                     if( $(this).val().length >= masc.length ) {

                        // Exclui o ultimo caracter digitado se o tamanho do valor
                        // do campo for maior que o tamanho da mascara.
                        val = val.substring(0,masc.length);
                        $(campo).val(val);
                        e.returnValue = false;
                        return false;

                     } else {

                        // Para valores numericos com virgula (monetarios).
                        // Vai funcionar melhor com RegEx para.
                        if( masc.indexOf("0,00") >-1 ) {

                           val = val.replace("0,", "");
                           len = val.length;
                           if( len <= 2 ) {
                              val = "0," + val;
                           } else {
                              val = val.replace(",", "");
                              val = val.substr(0, val.length-2) + "," + val.substr(-2);
                           }
                           /*
                              if( len >= 7 ) {
                                 val = val.replace(".", "");
                           console.log("-- " + val);
                           console.log("-- " + val.length);
                                 val = val.substr(0, val.length-6) + "." + val.substr(-6);
                              }
                           */
                        } else {

                           val = formataCampo(campo, masc, e);

                        }

                     }

                  } else {
                     val = "";
                     window.status = "Nenhuma máscara definida !!";
                     return false;
                  }

               } else {

                  val = "";
                  window.status = "Nenhuma máscara definida !!";
                  return false;
               }

               //  Atualizando valor do campo com a mascara.
               campo.val(val);

            } else if( tecla==32 ) {

               if( ! options.aceita_espacos ) {
                  alert("Este campo não aceita espaços em branco.");
                  //  Removo a parte da string do final ate a primeira ocorrencia de espaco em branco.
                  //$( campo.val(val.substring(0,val.indexOf(" "))) );
                  //  Removo a espaço em branco
                  posAtual = doGetCaretPosition(this);
                  antes = val.substring(0,posAtual-1);
                  depois = val.substring(posAtual)
                  $( campo.val(antes + depois) );
               }

            }

            if( options.debug ) {
               _debug();
            }

         });

      });



      //************************************************************
      //   F U N C O E S   I N T E R N A S
      //************************************************************

      //----------------------------------------------
      //  Retorna a posicao atual do cursor num campo texto
      //
      function doGetCaretPosition (ctrl) {

         var CaretPos = 0;

         if (document.selection) { //IE
            ctrl.focus ();
            var Sel = document.selection.createRange ();
            Sel.moveStart ('character', -ctrl.value.length);
            CaretPos = Sel.text.length;
         } else if (ctrl.selectionStart || ctrl.selectionStart == '0'){ // Firefox
            CaretPos = ctrl.selectionStart;
         }

         return (CaretPos);

      }


      function _debug() {
         console.group('DEPURANDO - CONSOLE FIREBUG:');
            console.log("Máscara: " + masc);
            console.log("keyCode: " + tecla);
            console.log("Caracter: " + String.fromCharCode(tecla) );
            console.log("É número: " + isNum);
         console.groupEnd();
      }


      //----------------------------------------------
      //    Valida numero inteiro com mascara
      //    Autor:
      //
      // function mascaraInteiro_v1(event){
      //    if ((event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105)) {
      //       event.returnValue = false;
      //       return false;
      //    }
      //    return true;
      // }
      function mascaraInteiro(val){
         if( RegEx_sonum.test(val) ) {
            return false;
         }
         return true;
      }


      //----------------------------------------------
      //    Formata de forma generica os campos
      //    Autor:
      //
      function formataCampo(campo, Mascara, evento) {

         var boleanoMascara;

         var Digitato = evento.keyCode;

         //  Esta eh a expressao regular com os caracteres que podem ser usados nas mascaras.
         //  Adicionar cada caracter entre ||. Incluir o caracter tambem mais abaixo na condicao
         //  que compoe a variavel boleanoMascara.
         exp = /\-|\.|,|\/|\(|\)| /g;

//--:>         campoSoNumeros = campo.value.toString().replace( exp, "" );
         campoSoNumeros = campo.val();
         campoSoNumeros = campoSoNumeros.toString().replace( exp, "" );

         var posicaoCampo = 0;
         var NovoValorCampo="";
         var TamanhoMascara = campoSoNumeros.length;;

         if (Digitato != 8) { // backspace

            for(i=0; i <= TamanhoMascara; i++) {
               boleanoMascara  = ((Mascara.charAt(i) == "-") || (Mascara.charAt(i) == ".") || (Mascara.charAt(i) == ",") || (Mascara.charAt(i) == "/"));
               boleanoMascara  = boleanoMascara || ((Mascara.charAt(i) == "(") || (Mascara.charAt(i) == ")") || (Mascara.charAt(i) == " "));
               if (boleanoMascara) {
                  NovoValorCampo += Mascara.charAt(i);
                  TamanhoMascara++;
               }else {
                  NovoValorCampo += campoSoNumeros.charAt(posicaoCampo);
                  posicaoCampo++;
               }
            }

//--:>            campo.val(NovoValorCampo);
            return NovoValorCampo;

         } else {

//--:>                return false;

         }

      }

   };
})( jQuery );
