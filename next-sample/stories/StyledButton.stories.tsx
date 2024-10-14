import { Meta, StoryObj } from '@storybook/react';
import { StyledButton } from '../components/StyledButton'

// 파일 안의 스토리 설정(메타데이터 객체)
export default {
    // 그룹명
    title: 'StyledButton',
    // 사용하는 컴포넌트
    component: StyledButton,
    // onCLick이 호출됐을 때 clicked라는 액션을 출력한다. 
    argTypes: {onClick: {action: 'clicked'}},
} as Meta<typeof StyledButton>;

type Story = StoryObj<typeof StyledButton>;

export const Primary: Story = {
    args: {
        variant: 'primary',
        children: 'Primary',
    },
};

export const Success: Story = {
    args: {
        variant: 'success',
        children: 'Success',
    },
};

export const Transparent: Story = {
    args: {
        variant: 'transparent',
        children: 'Transparent',
    },
};
