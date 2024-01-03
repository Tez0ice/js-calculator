let curr = "";
let prevNum = "";
let total;
let operation;
let dotPressed = false;

function updateCurrScreen(text){
    document.querySelector(".current").textContent = text;
}

function UpdateDisplay(){
    operator = operatorTranslate(operation)
    document.querySelector(".calculation-history").textContent = prevNum + " " + operator + " " + curr;
}

function removeNumber(){
    curr = curr.slice(0,-1);
    updateCurrScreen(curr);
}

function deleteWhole(){
    curr = "";
    prevNum = "";
    operation = undefined;
    updateCurrScreen("");
    UpdateDisplay();
}

function addDot(){
    if (dotPressed != true){
        curr = curr + "."
        updateCurrScreen(curr);
    }
    dotPressed = true;
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

let addCurr = (event) => {
    curr += event.target.textContent;
    updateCurrScreen(curr)
}

let getOperation = (event) => {
    if (curr == "" && prevNum == ""){
        prevNum = "0"
    }
    
    if (prevNum == "" && operation == undefined){
        prevNum = curr;
        curr = "" ;
        dotPressed = false;
    };

    operation = event.target.getAttribute("name");
    console.log("current num:" + curr + " previous num:" + prevNum + " curr_operation:" + operation);
    UpdateDisplay();
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

function calculate(){
    total = operate(parseFloat(prevNum),parseFloat(curr),operation);
    prevNum = total;
    curr = "";
    operation = "";
    UpdateDisplay();
    updateCurrScreen(curr);
}

buttons = document.querySelectorAll(".digits");
buttons_list = [...buttons];
buttons_list.forEach(button => {
    button.addEventListener("click",addCurr)
});

operationButtons = document.querySelectorAll(".operation");
operation_list = [...operationButtons];
operation_list.forEach(button => {
    button.addEventListener("click",getOperation)
});

equalButton = document.querySelector(".equal");
equalButton.addEventListener("click",calculate);

remButton = document.querySelector(".rem");
remButton.addEventListener("click",removeNumber);

delButton = document.querySelector(".del");
delButton.addEventListener("click",deleteWhole)

dotButton = document.querySelector(".dot");
dotButton.addEventListener("click",addDot);