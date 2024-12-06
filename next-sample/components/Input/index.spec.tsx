import { render, screen, RenderResult, fireEvent } from '@testing-library/react'
import { Input } from './index'


// describe로 처리를 모음
describe('Input', () => {
    let renderResult: RenderResult;

    // 각 테스트 케이스 전에 컴포넌트를 화면에 그리고, renderResult에 설정
    beforeEach(() => {
        renderResult = render(<Input id="username" label="Username" />)
    })

    // 테스트 케이스 실행 후에 화면에 그려진 컴포넌트 릴리스
    afterEach(() => {
        renderResult.unmount()
    })

    it('should empty in input on initial render', () => {
        // label이 Username인 컴포넌트에 대응하는 input 요소를 얻음
        const inputNode = screen.getByLabelText('Username') as HTMLInputElement

        // input 요소의 표시가 비어있는지 확인
        expect(inputNode).toHaveValue('')
    })

    // 문자를 입력했을 때, 입력한 내용이 표시되는지 테스트
    it('shoud show input text', () => {
        const inputText = 'Test Input Text'
        const inputNode = screen.getByLabelText('Username') as HTMLInputElement

        // fireEvent를 사용해, input 요소의 onChange 이벤트를 트리거
        fireEvent.change(inputNode, { target: { value: inputText } })

        // input 요소에 입력한 텍스트가 표시되는지 확인
        expect(inputNode).toHaveValue(inputText)
    })

    // 버튼이 클릭되면 입력 텍스트가 클리어하는지 체크
    it('should reset when user clicks button', () => {
        // 먼저 input에 텍스트를 입력
        const inputText = 'Test Input Text'
        const inputNode = screen.getByLabelText('Username') as HTMLInputElement;
        fireEvent.change(inputNode, { target: { value: inputText } })

        // 버튼을 얻는다
        const buttonNode = screen.getByRole('button', {
            name: 'Reset',
        }) as HTMLButtonElement;
        // 버튼을 클릭
        console.log('Before click: ', inputNode.value) // 버튼 클릭 전 로그
        fireEvent.click(buttonNode);
        console.log('After click: ', inputNode.value) // 버튼 클릭 후 로그

        // input 요소의 표시가 비었는지 확인
        expect(inputNode).toHaveTextContent('')
    })
})