import React from 'react'

const PrimaryButton = (props) => {
    const { text, onclick } = props
    return (
        <button className='btn btn-primary' onClick={onclick}>
            {text}
        </button>
    )
}

const PrimaryOutlineButton = (props) => {
    const { text, onclick } = props
    return (
        <button className='btn btn-primary-outline' onClick={onclick}>
            {text}
        </button>
    )
}

export { PrimaryButton, PrimaryOutlineButton }