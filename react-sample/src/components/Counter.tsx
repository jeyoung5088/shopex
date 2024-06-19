// const [상태, 업데이트 함수] = userState(초기 상태)
import { useState } from 'react'
/*
 * reducer(현재 상태, action) {
 *      return 다음 상태
 * }
 * const [현재 상태, dispatch] = useReducer(reducer, reducer에 전달되는 초기 상태)
 */
import { useReducer } from 'react'


// reducer가 받은 action 타입을 정의
type Action = 'DECREMENT' | 'INCREMENT' | 'DOUBLE' | 'RESET'

// 현재 상태와 action에 기반해 다음 상태 반환
const reducer = (currentCount:number, action: Action) => {
    switch (action) {
        case 'INCREMENT':
            return currentCount +1
        case 'DECREMENT':
            return currentCount -1
        case 'DOUBLE':
            return currentCount *2
        case 'RESET':
            return 0
        default:
            return currentCount
    }
}


type CounterProps = {
    initialValue: number
}

const Counter = (props: CounterProps) => {
    const { initialValue } = props
    // 카운트를 유지하는 첫 번째 상태를 useState()로 선언. 인수에는 초깃값을 지정
    // count가 현재 상태, setCount가 상태를 업데이트 하는 함수
    const [count, dispatch] = useReducer(reducer, initialValue)

    return (
        <div>
            <p>Count: {count}</p>
            {/* setCount를 호출해서 상태를 업데이트 */}
            <button onClick ={() => dispatch('DECREMENT')}>-</button>
            <button onClick ={() => dispatch('INCREMENT')}>+</button>
            <button onClick ={() => dispatch('DOUBLE')}>x2</button>
            <button onClick ={() => dispatch('RESET')}>Reset</button>
        </div>
    )
}

export default Counter