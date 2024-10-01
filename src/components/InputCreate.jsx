import React from 'react'

function InputCreate({accion, placeholder}) {
    return (
 
            <label htmlFor='addtask-text' className='bg-neutral-700 p-2 flex items-center gap-2 w-full cursor-text absolute bottom-0.5  '>
                +
                <input type="text"  name="addtask-text" id="addtask-text" className='w-full bg-transparent border-none px-2 py-2' placeholder={placeholder} />
            </label>

    )
}

export default InputCreate