
var counter = 1;
function testingDelay(){

    console.log(counter);
    counter++;
    if (counter <= 5){
        setTimeout(testingDelay, 1000);
    }else{
        return;
    }
}

testingDelay();