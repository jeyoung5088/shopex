import { NextPage } from 'next'
import Link, { LinkProps } from 'next/link'
import styled from 'styled-components'

type BaseLinkProps = React.PropsWithChildren<LinkProps> & {
    className?: string
    children: React.ReactNode
}

// Next.js의 링크에 스타일을 적용하기 위한 헬퍼 컴포넌트
// 이 컴포넌트를 스타일드 컴포넌트에서 사용하면,
// 정의한 스타일에 대응하는 className이 props로서 전달
// 이 className을 a 요소에 전달
const BaseLink = (props: BaseLinkProps) => {
    const { className, children, ...rest} = props
    return(
        <Link {... rest}>
            <a className = {className}>{children}</a>
        </Link>
    )
}

const StyledLink = styled(BaseLink)`
    color: #1e90ff;
    font-size: 2em;
`

const Page: NextPage = () => {
    return (
        <div>
            {/* 파란색 링크를 표시 */}
            <StyledLink href="/">Go to Index</StyledLink>
        </div>
    )
}

export default Page