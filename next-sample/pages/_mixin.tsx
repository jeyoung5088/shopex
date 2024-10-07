import { NextPage } from 'next'
import styled, { css } from 'styled-components'

// 빨간색 경계선을 표시하는 스타일
const redBox = css`
    padding: 0.25em 1em;
    border: 3px solid #ff0000;
    border-radius: 10px;
`

// 파란색 문자를 표시하는 스타일
const font = css`
    color: #1e90ff;
    font-size: 2em;
`

// 빨간색 경계선과 파란색 문자 스타일을 각각 적용, 배경이 투명한 버튼 컴포넌트
const Button = styled.button`
    background: transparent;
    margin: 1em
    cursor: pointer;
    ${redBox}
    ${font}
`

// 파란색 문자 스타일을 상속하면서, 굵은 텍스트를 표시하는 컴포넌트
const Text = styled.p`
    font-weight: bold;
    ${font}
`

const BorderedText = styled(Text)`
    padding: 8px 16px;
    border: 3px solid blue;
    border-radius: 8px;    
`

const Page: NextPage = () => {
    return(
        <div>
            {/* 파란색 문자, 빨간색 경계선의 버튼을 표시 */}
            <Button>Hello</Button>
            {/* 파란색 문자의 텍스트 표시 */}
            <Text>World</Text>
            <BorderedText>Hello World!</BorderedText>
            <Text as="a" href ="/">
                Go to index
            </Text>
        </div>
    )
}

export default Page