import { useState, useEffect } from 'react'
import Pencil from '../Icons/Pencil'
import Trash from '../Icons/Trash'

//COMPONENTE DEL CREATE
import InputCreate from './InputCreate'

//Icons 
import { IoExitOutline } from "react-icons/io5";

function RightAside({ modalAside, categorias, current, dispatch, setCurrent, uid,setModalAside }) {


    const [catName, setCatName] = useState()
    const [editActivity, setEditActivity] = useState({
        nombreSub: '',
        puntos: 0,
        done: false
    })

    const [newActivity, setNewActivity] = useState({
        nombreSub: "",
        puntos: 0,
        done: false,
        id: uid()
    })
    const [isEdit, setIsEdit] = useState(false)



    const handleCatNameSubmit = () => {
        // Aquí puedes hacer un dispatch o cualquier lógica para actualizar el nombre en tu backend o estado global
        dispatch({ type: 'update_category_name', payload: { catName, id: current.id } });
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleCatNameSubmit(); // Guardamos si se presiona Enter
        }
    };

    const handlerAddActivity = (event) => {
        event.preventDefault()
        if (newActivity.nombreSub.trim() !== "") {
            dispatch({ type: 'add_activity', payload: { newActivity, id: current.id } });
            setNewActivity({ ...newActivity, nombreSub: "", puntos: 0, done: false, id: uid() }); // Limpiar input después de agregar
        }
        else {
            alert("Debes añadir un nombre")
        }


    }

    const handlerDeleteActivity = (activity) => {
        dispatch({ type: 'delete_activity', payload: { id: current.id, subId: activity.id } });
        console.log(activity)
        setIsEdit(false)

    }

    const handlerEditActivity = (activity) => {

        const updateActivity = { ...activity }
        console.log(activity)

        //Verifico si el nombre ha cambio y no esta vacio
        if (activity.nombreSub !== editActivity.nombreSub) {

            updateActivity.nombreSub = editActivity.nombreSub

        }

        if (activity.puntos !== editActivity.puntos) {
            updateActivity.puntos = editActivity.puntos
        }

        setIsEdit(false)


        if (updateActivity.nombreSub.trim() !== "") {

            console.log({ id: current.id, updatedSub: updateActivity, subId: updateActivity.id })
            dispatch({
                type: 'change_activity',
                payload: {
                    id: current.id,
                    updatedSub: updateActivity,
                    subId: updateActivity.id
                }
            })
            setEditActivity({ ...editActivity, nombreSub: "", puntos: 0, done: false })
        } else {
            alert("Esta vacio")
        }

    }

    const completeActivity = (subId) => {

        dispatch({ type: 'complete_Activity', payload: { id: current.id, subId: subId } });

        // const categoria = categorias.find(cat => cat.id === id);

        // // Verifica si la tarea estaba incompleta antes de marcarla como completa
        // if (!categoria.done) {
        //   playSound(cr7); // Reproduce el sonido solo si la tarea estaba incompleta
        //   dispatch({ type: 'complete_task', payload: id });
        // } else {
        //   dispatch({ type: 'complete_task', payload: id });
        // }

    }

    const handlerIsEdit = (activity) => {
        setIsEdit(!isEdit)
        setEditActivity(activity)
    }

    useEffect(() => {
        if (current) {
            const updatedCategory = categorias.find(cat => cat.id === current.id);
            if (updatedCategory) {
                setCurrent(updatedCategory);
            }
        }
    }, [categorias, current, setCurrent]);



    return (
        <aside className={`${modalAside ? "block" : "hidden"} md:relative absolute z-10 gap-5 h-screen overflow-y-auto overflow-x-hidden p-1 md:p-2 w-screen md:w-1/2  bg-neutral-800 transition-all ease-linear duration-500`}>
            {modalAside ? (
                <div className='flex flex-col gap-1'>
                    <div className='flex flex-row-reverse items-center '>
                        <input type='text'
                            className='text-3xl w-full p-2 leading-none truncate text-white border-none bg-transparent focus:border-b-2 text-center'
                            placeholder={current.nombre}
                            onChange={e => setCatName(e.target.value)}
                            onBlur={handleCatNameSubmit}
                            onKeyDown={handleKeyDown}
                        />
                        <button className='text-white size-6 h-fit  ' onClick={()=> setModalAside(false)}><IoExitOutline /></button>
                    </div>
                    {
                        current.subCategoria.length > 0 ? current.subCategoria.map((ca, index) => (
                            <div key={index}
                                className='flex  items-center bg-neutral-700 hover:bg-neutral-600 py-2 px-2 text-white gap-3 rounded-md '>
                                <label >
                                    <input type="checkbox" name="" className='checkbox' onChange={() => completeActivity(ca.id)} checked={ca.done} />
                                    <span className='checkbox-span'></span>
                                </label>
                                <div className='w-10/12'>
                                    {isEdit ? (

                                        <input type='text' className='leading-none text-lg truncate text-white  border-none bg-transparent focus:border-b-2 w-full'
                                            onChange={(e) => { setEditActivity({ ...editActivity, nombreSub: e.target.value }) }}
                                            value={editActivity.nombreSub}

                                        />


                                    ) : <p>{ca.nombreSub}</p>}

                                    {isEdit ? (
                                        <input
                                            type='number'
                                            placeholder='0'
                                            onChange={(e) => { setEditActivity({ ...editActivity, puntos: parseInt(e.target.value) }) }}
                                            className='leading-none text-lg truncate text-white  border-none bg-transparent focus:border-b-2 w-1/3'
                                        />

                                    ) : <span className='text-sm'>{ca.puntos} pts</span>

                                    }

                                </div>
                                <div className='flex  justify-end gap-3'>
                                    <button className='hover:bg-neutral-500 py-1 px-2 rounded-md text-white' onClick={() => handlerIsEdit(ca)} ><Pencil className="size-6 text-blue-500" /></button>
                                    <button className='bg-red-500 py-1 px-2 rounded-md ' onClick={() => handlerDeleteActivity(ca)} ><Trash /></button>
                                </div>

                                {isEdit && <button onClick={() => handlerEditActivity(ca)} className='bg-red-300 p-4 w-full'>Agregar</button>}
                            </div>


                        )) : <h1 className='text-center text-white font-bold text-lg'>No hay actividades disponibles</h1>
                    }
                </div>) : null}
            <form action="" onSubmit={handlerAddActivity} className='absolute bg-neutral-700 flex bottom-0.5 w-full'>
            <button className='p-2 text-white font-bold' type='submit'>+</button>
                <label htmlFor='addtask-text' className='text-white  p-2 flex items-center gap-2 w-full cursor-text   '> 
                    <input type="text"
                        className='w-full bg-transparent border-none px-2 py-2 focus:border-none'
                        placeholder={"Agregar una actividad"}
                        value={newActivity.nombreSub}
                        onChange={(e) => setNewActivity({ ...newActivity, nombreSub: e.target.value })}

                    />
                </label>

            </form>

        </aside>
    )
}

export default RightAside