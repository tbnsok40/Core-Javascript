lexical env: 어휘적 환경 --- 뭔뜻이여 => 구성 환경

선언 당시(scope:범수의 유효범위)의 환경에 대한 정보를 담는 객체


🔥최초 선언시의 정보를 유지한다: 이것이 클로져에 핵심이고 전부🔥

클로져: 함수 내부에서 생성한 데이터와 그 유효범위로 인해 발생하는 특수한 현상 / 상태

Closure : 닫혀있음, 폐쇄성, 완결성 (scope도 폐쇄적이다)
>- 클로져의 이점 
>1. 접근 권한 제어 
>2. 지역변수 보호 
>3. 데이터 보존 및 활용 


```javascript
function a() {
    var x = 1; //x는 a 밖에서는 접근할 수 없으나, b에서는 접근 가능
    function b() {
        console.log(x);
    }
    b();
}
a();
console.log(a()); // 여기서는 1출력 가능
console.log(x); // 여기서는 x가 undefined된 에러 발생 => a내부로 접근 할 수 없기 때문
```
###  아래처럼 바꿔보겠다 (데이터 접근성을 위해)

```javascript
function a() {
    var x = 1; //x는 a 밖에서는 접근할 수 없으나, b에서는 접근 가능
    return function b() {
        console.log(x);
    }
    b();
}
var c = a(); // c변수를 활용하면 외부에서 x변수를 출력할 수 있게 된다.
console.log(c()); // 1과 undefined출력
```

스코프는 정의될 때 결정된다.

- 메스드를 프라이빗하게 만든다 by closure

- 외부에서 변경하지 못하게(scope), 막고싶은 변수들을 지역변수로 만든다.



## private member와 public member를 구분하는 방법
>
> 1. 함수에서 지역변수 및 내부함수 등을 생성한다.
> 2. 외부에 노출시키고자 하는 멤버들로 구성된 객체를 return 한다.
> 
> -> return한 객체에 포함되지 않은 멤버들은 private하다.
>
> -> return한 객체에 포함된 멤버들은 public하다.


- 함수 내부에서 다시 함수를 리턴하면, 리턴된 함수는 그 함수가 최초 선언될 당시의 정보를 유지한다. 

- 그렇기 때문에 외부에 노출하고자 하는 데이터만 리턴하면 리턴하지 않은 데이터는 모두 외부에서 접근을 제한할 수 있고, 그 덕에 지역변수를 안전하게 보존할 수 있고 그러면서 외부에게 지역변수 변경 권한을 부여함으로써 데이터를 활용할 수 도 있습니다.

```javascript
var car = {
    fuel: 10,
    power: 2,
    total: 0,
    run: function (km) {
        var wasteFuel = km / this.power;
        if (this.fuel < wasteFuel) {
            console.log("can't go");
            return;
        }
        this.fuel -= wasteFuel;
        this.total += km;
        console.log(this.fuel)
        console.log(this.total)
    }
};
car.fuel = 100 // 외부에서 접근이 가능 => 직접 변경할 수 없도록 스코프를 활용
car.run(100)
```

```javascript
var createCar = function (f, p) {
    // 내부로 감춘 것
    var fuel = f;
    var power = p;
    var total = 0;

    // 외부로 드러내는 것
    return {
        run: function (km) {
            var wasteFuel = km / power;
            if (fuel < wasteFuel) {
                console.log('이동 불가');
                return;
            }
            fuel -= wasteFuel;
            total += km;

            console.log(fuel)
            console.log(total)

        }
    }
};
var car = createCar(10, 2)
car.fuel = 100; // 이 처럼 사용자가 임의로 프로퍼티를 할당해본들 아무 소용없다.
// 사용자는 오직 run이라는 메소드만 이용할 수 있다.
car.run(10)
```