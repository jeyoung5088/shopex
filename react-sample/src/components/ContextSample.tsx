import React from 'react'

// Title을 전달하기 위해 Context 작성
const TitleContext = React.createContext('')

// Title 컴포넌트 안에서 Context 값을 참조
const Title = () => {
    // Consumer를 사용해, Context 값을 참조
    return (
        <TitleContext.Consumer>
            {/* Consumer 바로 아래 함수를 두고, Context 값을 참조 */}
            {
                (title) => {
                    return <h1>{title}</h1>
                }
            }
        </TitleContext.Consumer>
    )
}

const Header = () => {
    return (
        <div>
            {/* Header에서 Title로는 아무런 데이터를 전달하지 않음 */}
            <Title />
        </div>
    )
}

// Page 컴포넌트 안에서 Context에 값 전달
const Page = () => {
    const title = 'React Book'

    // Provider를 사용해 Context.에 값 설정
    // Provider 이하의 컴포넌트로부터 값 참조 가능
    return (
        <TitleContext.Provider value= {title}>
            <Header />
        </TitleContext.Provider>
    )
}

export default Page