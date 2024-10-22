import { Meta } from '@storybook/react';
import { StyledButton } from '../components/StyledButton'
import { linkTo } from '@storybook/addon-links';

// 파일 안의 스토리 설정(메타데이터 객체)
export default {
    // 그룹명
    title: 'StyledButton',
    // 사용하는 컴포넌트
    component: StyledButton,
    // onCLick이 호출됐을 때 clicked라는 액션을 출력한다.
} as Meta<typeof StyledButton>;


// 기본 props 설정
export const Primary: Meta = {
    // 클릭하면 StyledButton/Success의 스토리로 이동
    args: {
        variant: 'primary',
        children: 'Primary',
        onClick: linkTo('StyledButton', 'Success')
    }
    
}

export const Success: Meta = {
    args: {
        variant: 'success',
        children: 'Success',
        onClick: linkTo('StyledButton', 'Transparent')
    }
}

export const Transparent: Meta = {
    args: {
        variant: 'transparent',
        children: 'Transparent',
        onClick: linkTo('StyledButton', 'Primary')
    }
}