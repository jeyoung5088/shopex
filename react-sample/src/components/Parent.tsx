import React, {memo, useState} from 'react'

type FizzProps = {
    isFizz: boolean
}

// Fizz는 보통의 함수 컴포넌트
// isFizz true이면 Fizz라고 표시, 그 이외에는 표시 x
// isFizz의 변화에 관계없이, 부모가 다시 그려지면 Fizz도 다시 그려짐
const Fizz = (props: FizzProps) => {
    const {isFizz} = props
    console.log(`Fizz가 다시 그려졌습니다. isFizz = ${isFizz}`)
    return <span> {isFizz? 'Fizz' : ''}</span>
}

type BuzzProps = {
    isBuzz: boolean
    // props에 onCLick을 추가
    onClick: () => void
}

// Buzz는 메모이제이션한 함수 컴포넌트
// isBuzz가 true이면 Buzz라고 표시, 그 이외에는 표시 x
// 부모 컴포넌트가 다시 그려져도 isBuzz가 변화하지 않는 한 Buzz는 다시 그려지지 않음
const Buzz = memo<BuzzProps>((props) => {
    const {isBuzz, onClick} = props
    console.log(`Buzz가 다시 그려졌습니다. isBuzz = ${isBuzz}`)
    return (
        <span onClick={onClick}>
            {isBuzz? 'Buzz': ''}
        </span>
    )
})

// 이 형식으로 export했을 때는 import { Parent } from ...로 읽음.
export const Parent = () => {
    const [count, setCount] = useState(1)
    const isFizz = count % 3 === 0
    const isBuzz = count % 5 === 0
    
    // 이 함수는 Parent가 다시 그려질 대마다 작성됨.
    const onBuzzClick =() => {
        console.log(`Buzz가 클릭됐습니다. isBUzz = ${isBuzz}`)
    }
    console.log(`Parent가 다시 그려졌습니다. count = ${count}`)
    return (
        <div>
            <button onClick = {() => setCount((c) => c+1)}>+1</button>
            <p>{`현재 카운트: ${count}`}</p>
            <p>
                <Fizz isFizz = {isFizz} />
                <Buzz isBuzz = {isBuzz} onClick ={onBuzzClick}/>
            </p>
        </div>
    )
}

export default Parent