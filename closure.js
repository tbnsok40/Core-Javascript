// function a() {
//     var x = 1; //x는 a 밖에서는 접근할 수 없으나, b에서는 접근 가능
//     function b() {
//         console.log(x);
//     }
//     b();
// }
// a();
// // console.log(a()); // 여기서는 1출력 가능
// console.log(x); // 여기서는 x가 undefined된 에러 발생

///// 아래처럼 바꿔보겠다 (데이터 접근성을 위해)

// function a() {
//     var x = 1; //x는 a 밖에서는 접근할 수 없으나, b에서는 접근 가능
//     return function b() {
//         console.log(x);
//     }
//     b();
// }
// var c = a(); // c변수를 활용하면 외부에서 x변수를 출력할 수 있게 된다.
// console.log(c()); // 1과 undefined출력

////////////////////////////////////////
// var car = {
//     fuel: 10,
//     power: 2,
//     total: 0,
//     run: function (km) {
//         var wasteFuel = km / this.power;
//         if (this.fuel < wasteFuel) {
//             console.log("can't go");
//             return;
//         }
//         this.fuel -= wasteFuel;
//         this.total += km;
//         console.log(this.fuel)
//         console.log(this.total)
//     }
// };
// car.fuel = 100 // 외부에서 접근이 가능 => 직접 변경할 수 없도록 스코프를 활용
// car.run(100)
//////////////////////////////
var createCar = function (f, p) {
    // 내부로 감춘 것
    var fuel = f;
    var power = p;
    var total = 0;

    // 외부로 드러내는 것
    return {
        // set fuel(f) {
        //     fuel = f;
        // }, // 이건 외부에 지역변수의 값을 변경할 수 있는 권한을 주는 것,
        // 즉 return할 객체 안에 어떤 내용을 담냐에 따라, 외부에 어떤 권한을 줄것인지, 어떤 제한을 걸 것인지 달라진다.


        run: function (km) {
            var wasteFuel = km / power;
            if (fuel < wasteFuel) {
                console.log('이동 불가');
                return;
            }
            fuel -= wasteFuel; //run이라는 메서드는, km를 인자로 받아 fuel, total을 변경시킨다.
            total += km; // 직접 변경이 아닌, 내부에서 적절한 판단을 거친 안전한 처리.
            // 즉 외부에서는 제한적이긴 하지만 어쨌든 'run' 메서드를 통해서 지역변수의 접근 및 변경 권한을 
            // 일부 부여받은 셈.

            console.log(fuel)
            console.log(total)

        }
    }
};
var car = createCar(10, 2)
car.fuel = 1000; // 이제 사용자가 임의로 프로퍼티를 할당해본들 아무 소용없다.
// 사용자는 오직 run이라는 메소드만 이용할 수 있다.
car.run(10)
