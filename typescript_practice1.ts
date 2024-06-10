/**
 * ts -> js: tsc --strictNullChecks typescript_example.ts 
 */


/*
 *  함수를 인수로 받는 함수의 타입 지정 예시
 */
// 이름과 포맷 함수를 인수로 받아 포매팅한 뒤 콘솔에 출력하는 함수를 정의
function printName(firstName: string, formatter: (name: string) => string) {
    console.log(formatter(firstName))
}

// '씨'를 뒤에 붙이는 이름 포맷 함술르 정의
function formatName(name: string): string {
    return `${name} 씨`
}

printName('홍길동', formatName) // 홍길동 씨

/**
 * 함수를 다른 변수와 마찬가지로 다룰 수 있는 것을 일급 함수(First-class function)라고 함.
 */
// (인수명: 인수_타입) ==> 반환값_타입
function genBirdsInfo(name: string): string[] {
    return name.split(',')
}

// 함수 타입을 사용
// (x: string) => string[]
function singBirds(birdInfo: (x: string) => string[]): string{
    return birdInfo('오리, 비둘기')[0] + ' 꽥꽥'
} 

console.log(singBirds(genBirdsInfo)) // "오리 꽥꽥"

/**
 * Type Alias 타입 지정의 별명을 덧붙이는 기능 -> 그 이름을 참조해서 같은 타입 여러 차례 재사용 가능.
 */

type Point = {
    x: number;
    y: number;
}

function printPoint(point: Point) {
    console.log(`x 좌표는 ${point.x} 입니다.`)
    console.log(`y 좌표는 ${point.y} 입니다.`)
}

printPoint({ x: 100, y: 100})
// 타입이 맞아도 속성이 다르면 에러
// printPoint({ z: 100, t: 100}) --> 처럼 적으면 에러가 난다는 이야기?

type Formatter = (a: string) => string

function printName2 (firstName: string, formatter: Formatter) {
    console.log(formatter(firstName))
}

/**
 * 객체의 키 이름을 명시하지 않고 타입 앨리어스 정의 (인덱스 타입)
 */
type Label = {
    [key: string] : string
}
// key: 객체의 키에 문자열, 객체의 값에 문자열을 요청

const labels: Label = {
    topTitle: '톱 페이지의 제목입니다.',
    topSubTitle: '톱 페이지의 하위 제목입니다.',
    topFeature1: '톱 페이지의 기능 1입니다.',
    topFeature2: '톱 페이지의 기능 2입니다.'
}

// 값 부분의 타입이 맞지 않으므로 에러
/**
 * const foo: Label = {
 *  message: 100
 * }
 */


/**
 * 좌표 x, y를 갖는 Point2 인터페이스 작성, 나중에 좌표 z 추가하는 예시
 * -> 인터페이스 확장 가능, 타입 앨리어스를 사용할 때는 나중에 같은 이름으로 타입 정의 불가능.
 */
interface Point2 {
    x: number;
    y: number;
}

function printPoint2 (point: Point2) {
    console.log(`x 좌표는 ${point.x}입니다.`)
    console.log(`y 좌표는 ${point.y}입니다.`)
    console.log(`z 좌표는 ${point.z}입니다.`)
}

interface Point2 {
    z: number;
}

// 인수의 객체에 z가 존재하지 않으므로 컴파일 시 에러
//printPoint2( {x: 100, y: 100})
// 문제없이 작동
printPoint2({x: 100, y: 100, z: 200})


/**
 * 인터페이스에서는 클래스의 작동 타입 정의, implements를 사용해 클래스 구현을 위임 가능
 */

interface Point3 {
    x: number;
    y: number;
    z: number;
}

// 클래스가 인터페이스를 implements 했을 때, z가 존재하지 않으므로 컴파일 시 에러
/** 
 * class MyPoint implements Point3 {
 *    x: number;
 *    y: number;
 *  }
 */

// -> 속성 정의에 ?를 사용하면 옵셔널 속성이 됨
interface Point4 {
    x: number;
    y: number;
    z?: number;
}

class MyPoint2 implements Point4 {
    x: number;
    y: number;
}

// 인터페이스에서는 extends를 사용해 다른 인터페이스 확장 가능
interface Colorful {
    color: string;
}

interface Circle {
    radius: number;
}

// 여러 인터페이스 상속해서 새로운 인터페이스 정의 가능
interface ColorfulCircle extends Colorful, Circle {}

const cc: ColorfulCircle = {
    color: '빨강',
    radius: 10
}

/**
 * 인터페이스: 클래스나 데이터의 한쪽 측면을 정의한 타입. 
 *  - 인터페이스에 매치하는 타입이라도 그 값 이외에 다른 필드나 메서드가 있음 전제
 * 타입 앨리어스: 객체의 타입 자체를 의미
 * 
 * 객체 그 자체가 아니라 클래스나 객체의 일부 속성이나 함수를 포함하는 
 * 일부 작동을 정의할 때에는 인터페이스 사용이 적절
 */


class Point5 {
    x: number;
    y: number;

    // 인수가 없는 경우의 초깃값 지정
    constructor(x: number = 0, y: number = 0) {
        this.x = x
        this.y = y
    }
    
    // 반환값이 없는 함수를 정의할 때에는 void 지정
    moveX(n: number): void {
        this.x += n
    }

    moveY(n: number): void {
        this.y += n
    }
}

const point = new Point5()
point.moveX(10)
console.log(`${point.x}, ${point.y}`) // 10, 0

// Point5를 상속하는 예시
class Point3D extends Point5 {
    z: number;

    constructor( x: number = 0, y: number = 0, z: number = 0) {
        super(x,y)
        this.z = z;
    }

    moveZ(n:number): void {
        this.z += n
    }
}

const point3D = new Point3D()
point3D.moveX(10)
point3D.moveY(20)
console.log(`${point3D.x}, ${point3D.y}, ${point3D.z}`) //10, 0, 20


// 인터페이스에 implements를 사용해 클래스에 대한 구현 강제.
interface IUser { //I는 Interface임을 나타내기 위함
    name: string;
    age: number;
    sayHello: () => string; // 인수 없이 문자열 반환
}

class User implements IUser {
    name: string;
    age: number;

    constructor() {
        this.name = ''
        this.age = 0
    }

    sayHello(): string {
        return `안녕하세요. 저는 ${this.name}이며, ${this.age}살입니다.`
    }
}

const user = new User()
user.name = 'Hana'
user.age = 36
console.log(user.sayHello()) // 안녕하세요. 저는 Hana이며, 36살입니다.


/** 
 * 접근 수정자(Access Modifier) 
 * public, private, protected 제공
 */

class BasePoint3D {
    public x: number;
    private y: number;
    protected z: number;
}

const basePoint = new BasePoint3D()
basePoint.x // OK
// basePoint.y // 컴파일 시 에러 발생, private이므로 접근 x
// basePoint.z // 해당 클래스와 서브 클래스에서만 접근 가능