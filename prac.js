// console.log(a())
// console.log(b())
// console.log(c())

// function a() {
//     return 'a';
// }
// var b = function bb() {
//     return 'bb';
// }

// var c = function () {
//     return 'c';
// }

// answer => a, TypeError,
// solve
// function a() {
//     return 'a';
// }
// var b;
// var c;

// b = function bb() {
//     return 'bb';
// }
// c = function () {
//     return 'c';
// }

// console.log(a())
// console.log(b())
// console.log(c())

/////////////////////////
/////////////////////////
/////////////////////////

// 전역 컨텍스트 생성
// var a = 1;
// function outer() {
//     console.log(a);  // #1 undefined
//     function inner() {
//         console.log(a); // #2 undefined
//         // var a = 3;
//     }

//     inner();
//     console.log(a); // #3 undefined
//     var a = 5;

// }
// outer();
// console.log(a) // #4 1
//////////////////////////////////////
////////여기를 기점으로 위아래를 나누었다해도 호이스팅이 먹히네///////////////
////////ㄹㅇ 큰 깨달음///////////////
//////////////////////////////////////
console.log('')

// var a = 1;
// function outer() {
//     console.log(a);  // #1 1
//     function inner() {
//         console.log(a); // #2 undefined
//         var a = 3;
//     }

//     inner();
//     console.log(a); // #3 1
//     // var a = 5;

// }
// outer();
// console.log(a) // #4 1
///////////////////////////////////////////

var a = 1;
function outer() {
    console.log(a);  // #1 undefined
    var a = 5;
    function inner() {
        console.log(a); // #2 5
    }

    inner();
    console.log(a); // #3 5


}
outer();
console.log(a) // #4 1