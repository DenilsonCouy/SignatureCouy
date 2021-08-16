

/**
*  Copia o node (elemento) para a area de transferencia.
*/
function copyNodeContents(selector) {

   var elm = document.getElementById(selector);

   // for Internet Explorer
   if(document.body.createTextRange) {
      var range = document.body.createTextRange();
      range.moveToElementText(elm);
      range.select();
      document.execCommand("Copy");
      alert("Conteúdo copiado para a área de transferência.");
   }
   // other browsers
   else if(window.getSelection) {
      var selection = window.getSelection();
      var range = document.createRange();
      range.selectNodeContents(elm);
      selection.removeAllRanges();
      selection.addRange(range);
      document.execCommand("Copy");
      selection.removeAllRanges();
      alert("Conteúdo copiado para a área de transferência.");
   }

}


/**
*  Copia o valor de um campo de formulario para a area de transferencia.
*/
function copyForm(selector) {

   /* Get the text field */
   var copyText = document.getElementById(selector);
console.log(selector);
   /* Select the text field */
   copyText.select();
   copyText.setSelectionRange(0, 99999); /*For mobile devices*/

   /* Copy the text inside the text field */
   document.execCommand("copy");

   /* Alert the copied text */
   alert("Conteúdo copiado para a área de transferência.");


}