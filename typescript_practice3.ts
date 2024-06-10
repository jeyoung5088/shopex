/**
 * 옵셔널 체이닝
 * 중첩된 객체의 속성이 존재하는가에 관한 조건 분기 간단한게 기술 가능
 * 속성 접근 시 옵셔널 체이닝 기능의 ?를 사용하면
 * null 또는 undefined가 될 수 있는 객체에 대해 안전하게 처리 기술
 */

// null이 될 수 있는 social 이라는 속성의 타입을 정의
interface User2 {
    name: string
    social?: {
        facebook: boolean
        twitter: boolean
    }
}

let user2: User2

user2 = { name: 'Hana', social: { facebook: true, twitter: true}}
// true가 출력됨
console.log(user2.social?.facebook)

user2 = {name: 'Hana'}
// social이 존재하지 않는 경우에도 다음 코드는 실행 시 에러가 되지 않음
console.log(user2.social?.facebook)


/**
 * 논-널 어서션 연산자
 * 컴파일 옵션 --strictNullChecks 를 지정해 컴파일하면
 * 일반적으로 null일 가능성이 있는 객체에 대한 접근을 에러로 취급
 * null이 아님을 나타내고 싶을 떄 논-넌 어선셜 이라는 기능 사용
 * -> 명시적으로 컴파일러에게 문제가 없음을 전달
 * 논-널로 나타낼 변수 등에 !을 붙임
 */

// user가 null이면, 실행 시 에러가 될 수 있는 가능성이 있는 속성에 접근하면 컴파일 에러
// !을 사용해 명시적으로 지정, 컴파일 에러를 억제
function processUser(user?: User2) {
    let s  = user!.name
}
// 에러를 발생시키지 않아도 된다고 타입스크립트에서 컴파일러에 알려줄 뿐,
// 실행 시 에러가 발생할 가능성이 있음.

/**
 * 타입 가드
 * if문이나 switch문의 조건 분기에서 타입 체크 수행 할 때
 * 해당 조건 분기 블록 이후는 변수의 타입이 필터링 되는 추론 수행
 */

// number와 string의 Union 타입으로 정의된 인수를 typeof를 사용해 string 타입의 판정을 하는 if문
// if 블록 이후의 인수인 변수는 자동으로 number 타입으로 취급

function addOne(value: number | string) {
    if( typeof value === 'string') {
        return Number(value) +1
    }
    return value +1
}

console.log(addOne(10)) // 11
console.log(addOne('20')) //21

// 타입 가드 사용 
// -> 에러 발생시키기 쉬운 as를 사용하는 타입 어서션보다 안전하게 타입을 위한 코드 작성 가능

// 옵셔널 속성으로 info 정의
type User3 = {
    info?: {
        name: string;
        age: number;
    }
}

let response = {}
// response는 JSON 형식의 API 응답이 대입됐다고 가정, User에 타입 어서션
const user3 = (response as any) as User3

// 옵셔널 속성에 대한 타입 가드 수행
if (user3.info) {
    // 옵셔널 하위 속성인 user.info.name에 접근해도 에러 발생 x
    // 만약 if의 조건이 없을 때는 Object is possibly 'undefined'. 라는 에러가 발생
    console.log(user3.info.name)
}

/**
 * keyof 연산자
 * 해당 타입이 가진 각 속성의 타입의 Union 타입을 반환,
 * 결과는 리터럴 타입의 Union 타입으로 취급,
 * 객체에 존재하는 키를 사용해 무언가의 함수 처리를 수행하고자 할 때 안전하게 구현 가능
 */

interface User4 {
    name: string;
    age: number;
    email: string;
}

type UserKey = keyof User4 // 'name' | 'age' | 'email' 이라는 Union 타입이 됨

const key1: UserKey = 'name' //대입 가능
// const key2: UserKey = 'phone' // 컴파일 시 에러 발생


// 첫 번째 인수에 전달한 객체 타입의 속성명의 Union 타입과, 두 번째 인수로 전달한 값의 타입이 일치하지 않으면 타입 에러
// T[K]에 따라 키에 대응하는 타입이 반환값의 타입이 됨 (ex. 위 User4의 age를 key로 전달하면, 반환값 쪽은 number)
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key]
}

const user4: User4 = {
    name: 'Hana',
    age: 36,
    email: 'test@example.com'
}

// name은 타입의 키로 존재하기 때문에 올바르게 string 타입의 값을 반환
const userName = getProperty(user4, 'name')

// gender는 객체의 키로 존재하지 않으므로, 컴파일 시 에러
// const userGender = getProperty(user4, 'gender')


/**
 * 인덱스 타입
 * 객체의 속성이 변할 때, 모아서 타입 정의 가능
 */

// 속성명은 임의의 number로서 다루는 타입을 정의한 예
type SupportVersions = {
    [env: number]: boolean;
}

// string의 속성에 정의한 경우 에러가 발생
let versions: SupportVersions = {
    102: false,
    103: false,
    104: true,
    // 'v105': true // -> error
}


/**
 * readonly
 * 타입 앨리어스, 인터페이스, 클래스에 대해 readonly 속성 지정 가능
 * readonly가 지정된 속성은 변경 불가능
 */

type User5 = {
    readonly name: string;
    readonly gender: string;
}

let user5: User5 = { name: 'Hana', gender: 'Male'}

// 아래 대입을 수행했을 때 컴파일 시 에러 발생
// user5.gender = 'Female'

// 자바스크립트의 재대입 불가 기능으로 const가 있으나 용도는 다름
// const는 변수에 대입에 대해 수행, readonly는 객체나 클래스의 속성에 대해 수행

// Readonly 타입이라는 제네릭 타입도 있음
// Readonly 타입에 타입 앨리어스 지정 => 모든 속성 변경 불가능한 타입
type User6 = {
    name: string;
    gender: string;
}

type UserReadonly = Readonly<User6>

let user6: User6 = { name: 'Hana', gender: 'Male'}
let userReadonly: UserReadonly = { name: 'Hana', gender: 'Male'}

user6.name = 'Jinho' // OK
// userReadonly.name = 'Jinho' // 컴파일 시 에러 발생


/**
 * unknown
 * any와 마찬가지로 몯ㄴ 값을 대입할 수 있는 타입
 * any와 달리 대입된 값 상태 그대로는 임의의 함수나 속성으로 접근 할 수 없음
 * 
 * typeof나 instanceof 등을 사용해 타입 안전한 상태 만든 뒤 변숫값에 접근하는 함수 등의 처리 실행 가능
 */

// any와 마찬가지로 어떤 값에도 unknown으로 대입할 수 있음
const x: unknown = 123
const y: unknown = 'Hello'

// 함수나 속성에 접근했을 때, unknown 타입 그대로는 컴파일 시 에러 발생
// error TS2339: Property 'toFixed' does not exist on type 'unknown'
// console.log(x.toFixed(1))
// error TS2339: Property 'toLowCase' does not exist on type 'unknwon'
// console.log(y.toLowCase())

// 타입 안전한 상태에서 함수나 속성에 접근해서 실행 가능
if (typeof x === 'number') {
    console.log(x.toFixed(1)) // 123.0
}

if ( typeof y === 'string') {
    console.log(y.toLowerCase()) // hello
}

// any와 같은 특성을 가지면서 보다 타입이 불명확한 값을 나타내는 기능 강조
// 컴파일 시 에러 사전에 감지 가능 -> any를 사용하는 것보다 안전한 코드 작성 가능


/**
 * 비동기 Async/Await
 * Promise의 간략한 구문에 ㄷ해당하는 Async/Await
 * ECMAScript 사양 범위에 해당
 */

// 비동기 함수를 정의
function fetchFromServer(id: string): Promise<{success: boolean}> {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({success: true})
        }, 100)
    })
}

// 비동기 처리를 포함하는 async function의 반환값의 타입은 Promise
async function asyncFunc(): Promise<string> {
    // Promise한 값을 await 하면 내용을 추출할 수 있다.(그렇게 보인다.)
    const result = await fetchFromServer('111')
    return `The result: ${result.success}`
}

// await 구문을 사용하기 위해서는 async function 안에서 호출해야 한다
(async () => {
    const result = await asyncFunc()
    console.log(result)
})()

// Promise로서 다룰 때는 다음과 같이 기술
asyncFunc().then(result => console.log(result))


/**
 * 타입 정의 파일
 * 타입스크립트에서는 자바스크립트 라이브러리를 로딩해서 실행할 수 있지만
 * 타입 정의 정보가 없을 때는 타입 안전한 코드 작성 불가능
 * 
 * 타입 정의 파일 도입 방법
 * 1. @types 로 대표되는 공개된 타입 정의 파일 도입
 * 2. 타입 정의 파일 직접 작성
 */

/**
 * 1. 타입 정의 파일 도입
 * @types/[라이브러리 명]으로 공개된 타입 정의 파일 설치.
 * ex. 제이쿼리를 사용할 때 npm에서 @types/jquery를 로딩 -> 타입 정보를 부여한 제이쿼리
 * ( npm install --save-dev @types/jquery )
 * 
 * 2. 타입 정의 파일 작성
 * 타입 정의 파일을 포함하고 있지 않거나, 공개돼 있지 않을 때
 * .d.ts라는 확장자를 가진 타입 정의 파일 설치, 로딩.
 * 
 * 프로젝트에 자바스크립트 코드가 있을 때 .d.ts를 정의해 해당 코드를 타입스크립트에서 사용 예시
 * ex->
 * 1) ./lib/hello.js (자바스크립트 유틸리티 함수) 존재
 * exports.hello = function(name) {
 *   console.log(`Hello, ${name}')
 * }
 * 2) ./lib/hello.d.ts (타입 정의 파일) 작성
 * export function hello(name: string): void
 * 위와 같이 정의 파일 설치 -> 자바 스크립트 유틸리티 함수가 타입 정보를 가진 타입스크립트 코드로 작동
 * 3) import {hello} from './lib/hello'
 * 
 * // 에러: name 의 인수를 전달하지 않으므로, 컴파일러 에러 발생
 * hello()
 */