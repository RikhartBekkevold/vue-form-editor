// <!-- <!DOCTYPE html>
// <html lang="en">
// <head>
// 	<title></title>
// 	<meta charset="utf-8">
// 	<meta name="viewport" content="width=device-width, initial-scale=1">
// </head>
// <body>
//
// <script> -->



var stack = [];
var object = [];
var currentIndex = 0;  //after first push, one index ahead of last pushed object


function addChangeToStack(obj){
    //legg til en ny where we now stand
    stack.splice(currentIndex, 0, obj);
    //we're now at pastindex + 1
    currentIndex++;
    //sync with LS
    saveToLS(stack, currentIndex);
}

function saveToLS(stack, index) {
    localStorage.setItem('stack', JSON.stringify(stack));
    localStorage.setItem('index', JSON.stringify(index));
}

function deleteAll() {
    localStorage.removeItem('stack');
    localStorage.removeItem('index');
    stack = [];
}

function loadLastSavedState(obj) {
    currentIndex = JSON.parse(localStorage.index);
    stack = JSON.parse(localStorage.stack);
    obj = stack[currentIndex - 1];  //fetch the last saved obj in the stack

    var array = [obj, currentIndex]

    // object = obj;                //just to see the change
    return array;                     //and return it
}

function printVars() {
    console.log(stack);
    console.log(object);
    console.log(localStorage.stack);
    console.log(localStorage.index);
}





// <!--
// </script>
// </body>
// </html> -->
