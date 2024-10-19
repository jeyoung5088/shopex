import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { StyledButton } from '../components/StyledButton'
// 새롭게 action을 임포트
import { action } from '@storybook/addon-actions';

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
const incrementAction = action('increment');

const PrimaryButton = () => {
    const [count, setCount] = useState(0);
    const onClick = (e: React.MouseEvent) => {
        // 현재 카운트를 전달하고 Action을 호출
        incrementAction(e, count);
        setCount((c) => c+1);
    }

    return (
        <StyledButton variant = "primary" onClick = {onClick}>
            Count: {count}
        </StyledButton>
    );
};

export const Primary: Story = {
    render: () => <PrimaryButton />,
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
