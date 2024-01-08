function updateCurrDisplay(text){
    document.querySelector(".current").textContent = text
}

function updatePrevDisplay(currNum,prevNum,operator){
    document.querySelector(".calculation-history").textContent = prevNum + " " + operator + " " + currNum;
}

function operatorTranslate(operation){
    switch(operation){
        case "add":
            return "+"
        case "multiply":
            return "x"
        case "divide":
            return "/"
        case "exponent":
            return "^"
        case "minus":
            return "-"
        default:
            return ""
    }
}

function add(a,b){
    return a + b
};

function divide(a,b){
    return a / b
};

function multiply(a,b){
    return a*b
};

function minus(a,b){
    return a-b
};

function exponent(a,b){
    return a**b
};


function operate(a,b,operation){
    if (operation == "add"){
        total = add(a,b)
    };
    if (operation == "divide"){
        total = divide(a,b)
    };
    if (operation == "multiply"){
        total = multiply(a,b)
    };
    if (operation == "minus"){
        total = minus(a,b)
    };

    if (operation == "exponent"){
        total = exponent(a,b)
    };
    return total
};



function calculator(){
    let currNum = "";
    let prevNum = "";
    let operation;
    let total;
    let dotPressed = false;

    function inner_func(event){
        button = event.target
        if (button.className == "digits"){
            currNum += button.textContent;
            updateCurrDisplay(currNum);
        }
        if (button.className == "operation"){

            if (operation != undefined){
                total = operate(parseFloat(prevNum),parseFloat(currNum),operation)
                prevNum = total;
                currNum = "";
                operation = button.name;
                dotPressed = false;
                updateCurrDisplay("");
                updatePrevDisplay(prevNum,currNum,operation);
            }

            if (prevNum == ""){
                prevNum = currNum;
            }

            currNum = "";
            operation = button.name;
            dotPressed = false;
            updatePrevDisplay(currNum,prevNum,operatorTranslate(operation));
            updateCurrDisplay(currNum);
        }
        if (button.className == "dot"){
            if (dotPressed == false){
                currNum = currNum + ".";
                updateCurrDisplay(currNum);
            }
            dotPressed = true;
        }
        if (button.className == "equal"){
            // console.log(operate(parseFloat(prevNum),parseFloat(currNum),operation));
            updateCurrDisplay(operate(parseFloat(prevNum),parseFloat(currNum),operation));
            updatePrevDisplay("","","");
            dotPressed = false;
        }

        if (button.className == "rem"){
            lastChar = currNum.slice(-1);
            if (lastChar == "."){
                dotPressed = false
            }
            currNum = currNum.slice(0,currNum.length - 1);  
            updateCurrDisplay(currNum)
        }

        if (button.className == "del"){
            currNum = ""
            updateCurrDisplay(currNum);
        }
    }
    return inner_func
}
// some plan, we can all convert this each operation for del rem add bla bla to its own function 
// for example we can create a digit add function that accept curr from the closure and then add it to and update it to the screeen

function main(){
    let theCalculator = calculator()
    allButton = document.querySelectorAll("button");
    allButton.forEach(button => {
        button.addEventListener("click",theCalculator)
    });
}

main();