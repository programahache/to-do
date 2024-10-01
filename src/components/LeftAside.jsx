import React, { useEffect, useState } from 'react'

function LeftAside({ categorias }) {




    return (
        <aside className='relative p-2 bg-zinc-800 text-white h-full w-2/11'>
            {/* HEADER ASIDE */}
            <div className='header-aside flex gap-4 h-40'>
                {/* <div className='header-aside-logo'>
        Img
      </div> */}
                <div className='header-aside-name'>
                    Harold Andres Palacios
                </div>
            </div>
            <div className='h-1/2 flex flex-col text-center items-center justify-center '>
                <p>Que no suceda dos veces</p>
                <p>Tareas Totales: {categorias.length}</p>
                <p>Tareas Pendientes: {categorias.filter(t => !categorias.done).length}</p>
            </div>
        </aside>
    )
}

export default LeftAside