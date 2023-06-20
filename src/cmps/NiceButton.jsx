import React from 'react'

export function NiceButton({ children, Icon, ...restOfProps }) {
    
    return (
        <button {...restOfProps}>
            {Icon && <><Icon />&nbsp;</>}
            {children}
        </button>
    )
}
