import { useState } from 'react'

type InputProps = JSX.IntrinsicElements['input'] & {
    label: string
}

export const Input = (props: InputProps) => {
    const { label, ...rest } = props

    const [text, setText] = useState('')

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value)
    }

    const resetInputField = () => {
        console.log('Reset button clicked')
        setText('')
    }

    return (
        <div>
            <input {...rest} type="text" onChange={onInputChange} aria-label={label}/>
            <button onClick={resetInputField}>Reset</button>
        </div>
    )
}