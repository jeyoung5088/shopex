import { NextPage } from 'next'
import Image from 'next/image'
// 이미지 파일을 임포트한다
import BibleImage from '../public/images/bible.jpg'

const ImageSample: NextPage<void> = (props) => {
    return (
        <div>
            <h1>이미지 표시 비교</h1>
            <p>img 태그로 표시한 경우</p>
            {/* 일반적인 img 태그를 사용해서 이미지를 표시한다 */}
            <img src="/images/bible.jpg" />
            <p>Image 컴포넌트로 표시한 경우</p>
            {/* Image 컴포넌트를 사용해서 표시한다 */}
            {/* 경로를 지정하는 대신, 임포트한 이미지를 지정 */}
            <Image src={BibleImage} alt={'bibleimage'} />
            <p>Image로 표시한 경우에는 사전에 그리기 영역이 확보됨.</p>
        </div>
    )
}

export default ImageSample