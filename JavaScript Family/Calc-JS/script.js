let inputstring = "";
let display = document.querySelector('.input');
let buttons = document.querySelectorAll('.button');

buttons.forEach((button) => {
    button.addEventListener('click', (e) => {
        let value = e.target.innerText;

        if (value === "C") {
            inputstring = "";
            display.value = "";
        } 
        
        else if (value === "=") {
            try {
                inputstring = eval(inputstring).toString();
                display.value = inputstring;
            } catch {
                display.value = "Error";
                inputstring = "";
            }
        } else {
            // Add the button value to the input string
            inputstring += value;
            display.value = inputstring;
        }
    });
});