import * as React from 'react'

const Ok = props => {
    return (
        <svg
            aria-hidden='true'
            data-prefix='fas'
            data-icon='check'
            className='prefix__svg-inline--fa prefix__fa-check prefix__fa-w-16'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 512 512'
            width='25px'
            height='25px'
            color='#19B21E'
            {...props}
        >
            <path
                fill='currentColor'
                d='M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z'
            />
        </svg>
    )
}

export default Ok
