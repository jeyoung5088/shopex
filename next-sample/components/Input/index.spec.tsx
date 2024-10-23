import { render, screen, RenderResult } from '@testing-library/react'
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

    // 처음 화면에 그릴 때 input 요소가 비어있는지 테스트
    it('should empty in input on initial render' , () => {
        // label이 Username인 컴포넌트에 대응하는 input 요소를 얻음
        const inputNode = screen.getByLabelText('Username') as HTMLInputElement


        // input 요소의 표시가 비어있는지 확인
        expect(inputNode).toHaveValue('')
    })
})