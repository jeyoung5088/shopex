/**
 * Enum 타입
 * 
 * 특별히 지정하지 않는 경우 Enum은 정의된 순서대로 0부터 숫자가 자동으로 증가하면서 설정됨.
 */

// js에서의 정의
// const Direction = {
//     'Up' : 0,
//     'Down' : 1,
//     'Left' : 2,
//     'Right' : 3
// }

// ts enum을 사용한 상수 정의., 열거한 값 이외에는 대입할 수 없는 타입 정의 가능.
enum Direction {
    Up,
    Down,
    Left,
    Right
}

// enum Direction을 참조
let direction: Direction = Direction.Left
// 2라는 숫자가 출력됨.
console.log(direction)

// enu을 대입한 변수에 다른 타입의 값을 대입하려고 하면 에러
//direction = 'Left' // string을 넣으려 하면 에러


/**
 * 문자열 기반의 Enum 타입.
 * 각 멤버를 특정한 문자열의 상수로 초기화해야 함
 */
enum Direction2 {
    Up = 'UP',
    Down = 'DOWN',
    Left = 'LEFT',
    Right = 'RIGHT'
}

// 예를 들어, API의 파라미터로 문자열이 전달된 경우를 가정
const value = 'DOWN'
// 문자열에서 Enum 타입으로 변환
const enumValue = value as Direction2

if (enumValue === Direction2.Down) {
    console.log('Down is selected')
}
// Enum과 비슷한 기능으로 Union 타입이 있음.


/**
 * 제네릭 타입
 * 클래스와 함수에 대해 그 안에서 사용하는 타입 추상화
 * 외부로부터 구체적인 타입 지정할 수 있는 기능
 */

// T는 클래스 안에서 사용하는 임시 타입 이름
class Queue<T> {
    // 내부에서 T 타입의 배열 초기화
    private array: T[] = []


    // T 타입의 값을 배열에 추가
    push(item: T) {
        this.array.push(item)
    }

    // T 타입의 배열의 첫 번째 값을 꺼냄
    pop() : T | undefined {
        return this.array.shift()
    }
}

const queue = new Queue<number>()
queue.push(111)
queue.push(112)
// queue.push('foo') // number 타입이 아니므로 컴파일 시 에러

let str = 'bar'
// str = queue.pop() // str은 number 타입이 아니므로 컴파일 시 에러


/**
 * Union 타입, Intersection 타입
 * 다소 복잡한 타입 표현하고 싶을 때
 * 지정한 여러 타입의 합집합 Union -- |
 * 교집합 Intersection -- &
 * 함수나 반환값 타입, 또는 타입 앨리어스에 대해 지정
 */

// 변수나 인수 선언 시 Union 타입 지정, number 또는 string을 받을 수 있음
function printId(id: number | string) {
    console.log(id)
}

// number라도 정상 작동
printId(11)
// string이라도 정상 작동
printId('22')

//타입 앨리어스로도 정의 가능
type Id = number | string

function printId2(id: Id) {
    console.log(id)
}

//타입 앨리어스 사이에 새로운 타입 정의 가능
type Identity = {
    id: number | string;
    name: string;
}

type Contact = {
    name: string;
    email: string;
    phone: string;
}

// 합집합을 통한 새로운 Union 타입을 정의
// Identity 또는 Contct 타입 받을 수 있음
type IdentityOrContact = Identity | Contact

// OK
const id: IdentityOrContact = {
    id: '111',
    name: 'Hana'
}

// OK
const contact: IdentityOrContact = {
    name: 'Hana',
    email: 'test@example.com',
    phone: '012345678'
}

// Intersection은 타입 병합해서 하나로 만든 타입 생성

// 교집합을 통한 새로운 Intersection 타입 정의
// Identity와 Contact 양쪽의 모든 속성이 병합된 타입으로 다룸
type Employee = Identity & Contact

// OK
const employee: Employee = {
    id: '111',
    name: 'Hana',
    email: 'test@example.com',
    phone: '012345678'
}

// 에러: Contact 정보만으로 변수 정의 x, id 필요
// const employeeContact: Employee = {
//     name: 'Hana',
//     email: 'test@example.com',
//     phone: '012345678'
// }


/**
 * 리터럴 타입
 * |로 데이터 구분하는 리터럴 타입 
 * => 정해진 문자열이나 수치만 대입할 수 있는 타입으로 제어
 */

let postStatus: 'draft' | 'published' | 'deleted'
postStatus = 'draft' // OK
// postStatus = 'drafts' // 타입 선언에 없는 문자열 할당, 컴파일 시 에러

//숫자에도 리터럴 타입 가능
// -1, 0, 1 중 하나만 반환하는 타입 정보 정의
function compare(a: string, b: string): -1 | 0 | 1 {
    return a === b ? 0 : a < b ? 1 : -1
}


/**
 * never 타입
 * 절대로 발생하지 않는 값의 종류
 */

// 에러가 항상 반환되는 함수로 절대로 값이 정상적으로 반환되지 않을 때 never 타입을 지정
function error(message: string) : never {
    throw new Error(message)
}

function foo(x: string | number | number[]): boolean {
    if (typeof x === 'string') {
        return true
    } else if ( typeof x === 'number') {
        return false
    }
    // never를 사용해서 명시적으로 값이 반환되지 않는 것을 컴파일러에 전달
    // never를 사용하지 않으면 타입스크립트는 컴퍼일 에러 일으
    return error('Never happens')
}

// 미래에 상수가 추가될 가능성이 있는 enum 타입을 정의
enum PageType {
    ViewProfile,
    EditProfile,
    ChangePassword,
}

const getTitleText = (type: PageType) => {
    switch (type) {
        case PageType.ViewProfile:
            return 'Setting'
        case PageType.EditProfile:
            return 'Edit Profile'
        case PageType.ChangePassword:
            return 'Change Password'
        default:
            // 결코 일어나지 않는 일을 컴파일러에 전달하는 never 타입에 대입
            // 이로 인해 만약 미래 PageType의 enum 타입에 상수가 새롭게 추가됐을 때
            // 컴파일 시에 에러가 발생, 버그를 미연에 방지해서 대응 가능
            const wrongType: never = type
            throw new Error( `${wrongType} is not in PageType`)
    }
}