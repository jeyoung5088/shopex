import { NextPage } from 'next'
import styled from 'styled-components'

type ButtonProps = { 
    color: string
    backgroundColor: string
}

// 문자 색상과 배경 색상을 props를 통해 변경할 수 있는 버튼 컴포넌트
// 타입 인수에 props 타입을 전달
const Button = styled.button<ButtonProps>`
    /* color, background, border-color는 props에서 전달 */
    color: ${(props) => props.color};
    background: ${(props) => props.backgroundColor};
    border: 2px solid ${(props) => props.color};
    font-size: 2em;
    margin: 1em;
    padding: 0.25em 1em;
    border-radiius: 8pxl;
    cursor: pointer;
`

const Page: NextPage = () => {
    return (
        <div>
            {/* 빨간색 문자, 투명한 배경의 버튼을 표시 */}
            <Button backgroundColor="transparent" color="#FFF000">
                Hello
            </Button>
            {/* 하얀색 문자, 파란색 배경의 버튼을 표시 */}
            <Button backgroundColor="#1E90FF" color ="white">
                World
            </Button>
        </div>
    )
}

export default Page