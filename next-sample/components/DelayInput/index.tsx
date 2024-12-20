import React, { useState, useCallback, useRef } from 'react'

type DelayButtonProps = {
    onChange: React.ChangeEventHandler<HTMLInputElement>
}

export const DelayInput = ( props: DelayButtonProps) => {
    const { onChange } = props

    // 입력 중 여부를 유지하는 상태
    const [isTyping, setIsTyping] = useState(false)
    // input에 표시하는 텍스트를 유지하는 상태
    const [inputValue, setInputValue] = useState('')
    // span에 표시할 텍스트를 유지하는 상태
    const [viewValue, setViewValue] = useState('')
    // 타이머를 유지하는 Ref
    const timeRef = useRef<ReturnType<typeof setTimeout> | null>(null)

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        // 입력 중인 플래그 설정
        setIsTyping(true)
        // input에 표시할 텍스트를 업데이트
        setInputValue(e.target.value)

        //만약 timeRef에 이전 설정한 타이머가 있다면 먼저 해제함
        if (timeRef.current !== null) {
            clearTimeout(timeRef.current)
        }

        // 1초 후에 실행하는 타이머를 설정
        timeRef.current = setTimeout(() => {
            timeRef.current = null

            // 입력 중 플래그를 해제
            setIsTyping(false)
            // span에 표시할 텍스트를 업데이트
            setViewValue(e.target.value)
            // onChange 콜백을 호출
            onChange(e)
        }, 1000)
    }, [onChange])

    // span에 표시하는 텍스트
    const text = isTyping ? '입력 중...' : `입력한 텍스트: ${viewValue}`

    return (
        <div>
            {/* data-testid는 테스트 안에서만 사용하는 ID */}
            <input data-testid="input-text" value={inputValue} onChange={handleChange} />
            <span data-testid="display-text">{text}</span>
        </div>
    )
}