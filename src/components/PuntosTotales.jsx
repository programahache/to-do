import React from 'react'

function PuntosTotales({ categorias }) {
    // Calcular el total de puntos actuales
    const totalPuntos = categorias.reduce((acc, categoria) => acc + categoria.puntosActuales, 0);

    return (
        <div className=' w-fit bg-neutral-700 border-none p-2'>Puntos Totales: {totalPuntos}</div>
    )
}

export default PuntosTotales