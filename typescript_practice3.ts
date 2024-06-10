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