setAutoCopyFeatures()

/***/

function setAutoCopyFeatures() {
    onclick_copySelf(); /* class="js-copy" */
    onclick_copyFrom(); /* class="js-copy-btn", "js-copy-target" */
    
    // Открыл функцию - сразу видно, что она делает
    // Не вдаваясь в подробности, можно вспомнить, какие классы нужно добавить в HTML  
    
    function onclick_copySelf() {
      let copy = document.querySelectorAll('.js-copy');
      
      for( let i = 0; i < copy.length; i++ ) {
        copy[i].addEventListener('click', function() {        
          copyToClipboard( this.textContent );
          ui_copyDone( this );
        });
      }
    }
    
    function onclick_copyFrom() {
      let btn = document.querySelectorAll('.js-copy-btn');
      
      for( let i = 0; i < btn.length; i++ ) {
        btn[i].addEventListener('click', function() {
          let div = document.querySelectorAll('.js-copy-target');
          
          copyToClipboard( div[i].textContent );
          ui_copyDone( this );
        });
      }
    }
    
    /***/
  
    function copyToClipboard(str) {
      var area = document.createElement('textarea');
  
      document.body.appendChild(area);
      area.value = str;
      area.select();
      document.execCommand("copy");
      document.body.removeChild(area);
    }
  
    function ui_copyDone(btn) {
      var contentSaved = btn.innerHTML;
  
      btn.innerHTML = '<span style="color: blue;">СКОПИРОВАНО</span>';
      btn.classList.add('copied');
  
      setTimeout(function() {
        btn.innerHTML = contentSaved;
        btn.classList.remove('copied');
      }, 1500);
    }
  }