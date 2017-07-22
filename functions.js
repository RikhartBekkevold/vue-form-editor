//loop store values. reverse array. loop agian. convert to string and then check them against eachother with string == string
function isPalidrome(word){

  var wordArray = word.toLowerCase().replace(/ /g,'').split("");

  for(var i = 0; i < wordArray.length/2; i++) {
    if(!(wordArray[i] === wordArray[(wordArray.length - 1) - i])) {
        //if two of the letters don't match the word is not a palidrome
        return false;
    }
  }
  //if all letters matched the word is a palidrome
  return true;
};





//test all functions
console.log(isPalidrome("mAdam"));





//determines whether two arrays are the same
//@arg1: an array
//@arg2: the array to compare to
//returnes true if exactly the same, false if not

function arrayCompare(a, b){
    //if lengths doesnt match the arrays can't be equal
    if(a.length == b.length){
        //compare each index
        for(var i = 0; i < a.length; i++){
            if(a[i] != b[i]) {
                return false;
            }
        }
        return true;
    }
    return false;
};


console.log(arrayCompare(['1', '2'], ['1', '2']));

//returnes the difference between two arrays in an array, if no difference returnes false
function find_array_difference(a, b) {

    if(arrayCompare(a, b)){
        return false;
    }

    var differences = [];

    for(var i= 0; i < a.length; i++){

        if(typeof a[i] === 'object' && typeof b[i] === 'object') {
            //now we know they are either object or array
            if(Array.isArray(a[i]) && Array.isArray(b[i])) {
                //loop all indexes
            }
            //loop all properties




            find_array_difference();




        }




        // check object length or array
        //if neither conditions are met, either one or two are not either object or array






        else if(array, int, string,) {

        }

        if(a[i] != b[i]) {
            differences.push(a[i])
        }
        return differences;
    }
}

console.log(arrayCompare(['1', '2'], ['1', '2']));









//the most effiecent way is to return whenever something is not equal and therefore the objects are not the same
//However, we want to continue to find all differences

//have a function that checks whether they are the samme first? if so, no need to check for differences



function objectCompare(a, b) {

    //if different nr of keys objects not equal
    if(Object.keys(a).length != Object.keys(b).length) {
        console.log('Lengths dont match.')
        return false;
    }

    //iterate all keys of object a
    for (key in a) {
        console.log(typeof key)
        //if current key does not exists in b, objects not equal
        if (!b.hasOwnProperty(key)) {
            return false;
        }
        //both keys exists, but are the values equal?
        if(!(a[key] === b[key])){
          return false;
        }
    }
    //if the entire loop was enumerated succesfully the objects are equal
    return true;

}

console.log(objectCompare({number: 2}, {number: 2}));

//loop all keys of obj 1

//check if key also exists in the other object



function arrayCompare(a, b){

    var a_length = a.length;
    var b_length = b.length;

    //if lengths doesnt match the the arrays can't be equal
    if(a.length == b.length){
        //compare each index
        for(var i= 0; i < a.length; i++){
            if(a[i] != b[i]) {
                return false;
            }
        }
        return true;
    }
    return false;
};

function find_array_difference(a, b) {



    if(arrayCompare(a, b)){
        return false;
    }

    var differences = [];

    for(var i = 0; i < a.length; i++){

        if(a[i] != b[i]) {
            differences.push(a[i]);
        }
    }
    return differences;
};


//find_array_difference(['1', '2'], ['1', '2']);

console.log(find_array_difference([{test: '1'},
                                   {test: '2'}, {test: '41'}, {test: '2'}],
                                  [{test: '1'},
                                   {test: '2'}, {test: '41'}, {test: '2'}]));



    //recursive function
    function checkArray(array){

        //loop entire array
        while(array) {
            //loop first item
            //check nr of elements against eachother


        }
        //recursive ios for when we dont know how many arrays?=

        return a_list_of_all_differences_it_found;
    }

    //recursive function
    function checkOneItem(){

    }

    //recursive function
    function checkOneItemsArray(){

    }
