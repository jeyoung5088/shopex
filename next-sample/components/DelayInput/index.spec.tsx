import { render, screen, RenderResult, fireEvent, act } from '@testing-library/react'
import { DelayInput } from './index'

// DelayInput 컴포넌트에 관한 테스트
describe('DelayInput', () => {
    let renderResult: RenderResult
    let handleChange:jest.Mock

    beforeEach(() => {
        // 타이머를 jest의 타이머로 대체
        jest.useFakeTimers()
        // 목 함수 작성
        handleChange = jest.fn()

        // 목 함수를 DelayButton에 전달해서 화면을 그림
        renderResult = render(<DelayInput onChange={handleChange} />)
    })

    afterEach(() => {
        renderResult.unmount()

        // 타이머를 원래의 타이머로 되돌림
        jest.useFakeTimers()
    })

    // span 요소의 텍스트가 비어있음을 테스트
    it('should display empty in span on initial render' , () => {
        const spanNode = screen.getByTestId('display-text') as HTMLSpanElement

        // 초기 표시는 비어 있음
        expect(spanNode).toHaveTextContent('입력한 텍스트:')
    }) 

    it(`should isplay '입력 중...' immediately after onChange event occurs`, () => {
        const inputText = 'Test Input Text'
        const inputNode = screen.getByTestId('input-text') as HTMLInputElement

        // input의 onChange 이벤트를 출력
        fireEvent.change(inputNode, { target: {value: inputText } })

        const spanNode = screen.getByTestId('display-text') as HTMLSpanElement

        // '입력 중...' 표시 여부 확인
        expect(spanNode).toHaveTextContent('입력 중...')
    })

    // 입력하고 1초 뒤에 텍스트가 표시되는지 테스트
    it('shoud display input text 1second after onChange event occurs', async() => {
        const inputText = 'Test Input Text'
        const inputNode = screen.getByTestId('input-text') as HTMLInputElement
        
        // input의 onChange 이벤트를 호출
        fireEvent.change(inputNode, { target: { value: inputText } })

        // act 함수에서 실행되므로 타이머의 콜백 안에서 발생하는 상태 변경이 반영됨을 보증
        await act(() => {
            // 타이머에 설정된 timeout을 모두 실행
            jest.runAllTimers()
        })

        const spanNode = screen.getByTestId('display-text') as HTMLSpanElement
        
        // 입력한 텍스트가 표시되는지 확인
        expect(spanNode).toHaveTextContent(`입력한 텍스트: ${inputText}`)
    })

    it('should call onChange 1second after onChange event occurs', async () => {
        const inputText = 'Test Input Text'
        const inputNode = screen.getByTestId('input-text') as HTMLInputElement

        // input의 onChange 이벤트를 호추
        fireEvent.change(inputNode, { target: { value: inputText } })

        // 타이머 실행
        await act(() => {
            jest.runAllTimers()
        })

        // 목 함수를 전달, 호출 여부 확인
        expect(handleChange).toHaveBeenCalled()
    })
})