// 타입을 사용하기 위한 임포트
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router' // next/router에서 useRouter라는 훅을 삽입
import { ParsedUrlQuery } from 'querystring'

type PostProps = {
    id: string
}

const Post: NextPage<PostProps> = (props) => {
    const {id} = props
    const router = useRouter()

    if (router.isFallback) {
        //폴백 페이지용 표시 반환
        return <div>Loading...</div>
    }

    return <div>
        <Head>
            <title>Create Next App</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <main>
            <p> 이 페이지는 정적 사이트 생성을 통해 빌드 시 생성된 페이지</p>
            <p>{`/posts/${id}에 대응하는 페이지입니다`}</p>
        </main>
    </div>
}

// getStaticPaths는 생성한 페이지의 경로 파라미터의 조합을 반환
// 이 파일은 pages/posts/[id].tsx이므로, 경로 파라미터로서의 id의 값을 반환해야 함
export const getStaticPaths: GetStaticPaths = async () => {
    // 각 페이지의 경로 파라미터를 몽느 것
    const paths = [
        {
            params: {
                id: '1',
            },
        },
        {
            params: {
                id: '2',
            },
        },
        {
            params: {
                id: '3',
            },
        },
    ]
    
    // fallback을 false로 설정하면, paths에 정의된 페이지 외에는 404를 표시
    // fallback을 true로 지정하면 최초 요청과 그 뒤의 요청에서 작동 달라짐
    return { paths, fallback: false }
}

// 파라미터 타입을 정의
interface PostParams extends ParsedUrlQuery {
    id: string
}

// getStaticPaths 실행 휘에 각 경로에 대해 getStaticProps가 실행
export const getStaticProps: GetStaticProps<PostProps, PostParams> = async (context) => {
    return {
        props: {
            id: context.params!['id'],
        },
    }
}

export default Post