    var key = document.getElementById('key');
    var inputText = document.getElementById('inputText');
    var sufr = document.getElementById('sufr');
    var undsufr = document.getElementById('undsufr');
    var outputText = document.getElementById('outputText');

    

    
    function crypt(text, cols) {
      
        var rows = Math.ceil(text.length / cols);
        var result = '';
     
        for (let j = 0; j < cols; j++) {
            
            for (let i = 0; i < rows; i++) {
               
                var index = i * cols + j;
                if (index < text.length) {
                    result += text[index];
                }
                else{
                    result += "!";
                }
            }
        }
        return result;
    }

    //розшифрування
    function decrypt(text, cols) {
      var rows = Math.ceil(text.length / cols);
    
    let result = ''; // Тут будемо збирати результат

   
    for (let i = 0; i < rows; i++) { 
            
            for (let j = 0; j < cols; j++) { 
                
                var index = (j * rows) + i;

                if (index < text.length) {
                    result += text[index];
                }
            }
        }
        
        return result;
    }
    
    // Кнопка Зашифрувати
    sufr.addEventListener('click', () => {
        var text = inputText.value;
        var cols = key.value; 
       
        if (!text || !cols || cols <= 1) {
            alert("Будь ласка, введіть текст та коректний ключ (кількість стовпців > 1).");
            return;
        }

        outputText.value = crypt(text, cols);
    });

    // Кнопка Розшифрувати
    undsufr.addEventListener('click', () => {
        var text = inputText.value;
        var cols = key.value; 

        if (!text || !cols || cols <= 1) {
            alert("Будь ласка, введіть текст та коректний ключ (кількість стовпців > 1).");
            return;
        }else if(text.length % cols !=0){
            alert("Будь ласка, введіть текст та коректний ключ так щоб при діленні кількості символів на ключ виходило ціле значення.");
            return;
        }
        
        outputText.value = decrypt(text, cols);
    });
