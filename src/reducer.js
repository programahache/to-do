export const reducer = (tareas, action) => {

    if (action.type === 'add_task') {
        return [...tareas, action.payload]

    }

    if (action.type === 'change_task') {
        return tareas.map(t => {
            if (t.id === action.payload.id) {
                return action.payload
            } else {
                return t
            }
        })

    }

    if (action.type === 'update_category_name') {
        return tareas.map(t => {
            if (t.id === action.payload.id) {
                console.log(action.payload.id)
                return { ...t, nombre: action.payload.catName }
            }
            else {
                return t
            }
        })
    }

    if (action.type === 'complete_task') {

        return tareas.map(t => {
            if (t.id === action.payload) {
                return { ...t, done: !t.done }
            }
            return t
        })
    }


    if (action.type === 'delete_task') {
        console.log(action.payload)
        return tareas.filter(t => t.id !== action.payload.id)
    }


    if (action.type === 'add_activity') {
        return tareas.map(t => {
            if (t.id === action.payload.id) {
                console.log({ ...t, subCategoria: [...t.subCategoria, action.payload.newActivity] })
                return { ...t, subCategoria: [...t.subCategoria, action.payload.newActivity] }
            }
            return t
        })


    }


    if (action.type === 'delete_activity') {
        return tareas.map(t => {
            // Si es la categoría a la que pertenece la actividad que se va a eliminar
            if (t.id === action.payload.id) {
                // Filtra las subcategorías para eliminar la que coincide
                const updatedSubCategorias = t.subCategoria.filter(sub => sub.id !== action.payload.subId);

                // Calcula los nuevos puntos actuales
                const newPuntosActuales = updatedSubCategorias.reduce((acc, sub) => {
                    return acc + (sub.done ? parseFloat(sub.puntos) : 0); // Solo suma puntos de las subcategorías completadas
                }, 0);

                return {
                    ...t,
                    subCategoria: updatedSubCategorias, // Actualiza las subcategorías
                    puntosActuales: newPuntosActuales // Actualiza los puntos actuales
                };
            }
            return t; // Mantiene las demás categorías sin cambios
        });
    }


    if (action.type === 'change_activity') {
        return tareas.map(t =>
            t.id === action.payload.id
                ? {
                    ...t,
                    subCategoria: t.subCategoria.map(sub =>
                        sub.id === action.payload.subId
                            ? { ...action.payload.updatedSub } // Actualiza la subcategoría específica
                            : sub // Mantiene las demás subcategorías sin cambios
                    )
                }
                : t // Mantiene las demás categorías sin cambios
        );

    }

    if (action.type === 'complete_Activity') {
        console.log(action.payload)
        
        return tareas.map(t => {
            if (t.id === action.payload.id) {

                // Encuentra la subcategoría que se está actualizando
                const subCategory = t.subCategoria.find(sub => sub.id === action.payload.subId);


                // Calcula los puntos actuales
                const updatedPuntosActuales = subCategory.done
                    ? t.puntosActuales - parseFloat(subCategory.puntos) // Si estaba completada, resta
                    : t.puntosActuales + parseFloat(subCategory.puntos); // Si no estaba completada, suma

                return {
                    ...t,
                    puntosActuales: Math.max(updatedPuntosActuales, 0), // Asegúrate de no tener puntos negativos
                    subCategoria: t.subCategoria.map(sub =>
                        sub.id === action.payload.subId
                            ? { ...sub, done: !sub.done } // Actualiza el estado de la subcategoría
                            : sub // Mantiene las demás subcategorías sin cambios
                    )
                };

            }

            return t

        });
    }




    return console.error("No se encontro la accion ")

}