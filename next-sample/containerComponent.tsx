import {useState, useCallback } from 'react'
import { Button } from './button'

// 팝업을 표시하기 위한 훅
const usePopup = () => {

    // 주어진 텍스트를 표시하는 팝업을 표시하는 함수
    const cb = useCallback((text: string) => {
        prompt(text)
    },[])

    return cb
}

type CountButtonProps = {
    label: string
    maximum: number
}

// 클릭된 횟수를 표시하는 버튼을 표시하는 컴포넌트
export const CountButton = (props: CountButtonProps) => {
    const { label, maximum } = props

    // 얼럿을 표시하기 위한 훅을 사용
    const displayPopup = usePopup()

    // 카운트를 저장하는 상태를 정의
    const [count, setCount] = useState(0)

    // 버튼이 클릭됐을 때의 작동을 정의
    const onClick = useCallback(() => {
        // 카운트를 업데이트
        const newCount = count +1
        setCount(newCount)

        if (newCount >= maximum) {
            // 얼럿을 낸다
            displayPopup (`You've clicked ${newCount} times`)
        }
    }, [count, maximum])

    // 상태를 기반으로 표시에 필요한 데이터를 구한다
    const disabled = count >= maximum
    const text = disabled
    ? 'Can \'t click any more'
    : `You've clicked ${count} times`

    // 프레젠테이션 컴포넌트를 반환한다
    return (
        <Button disabled={disabled} onClick={onClick} label={label} text={text} />
    )
}