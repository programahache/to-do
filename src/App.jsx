import { useState, useReducer, useEffect } from 'react'
import { reducer } from './reducer';
import { v4 as uid } from 'uuid';
import './App.css'
import LeftAside from './components/LeftAside'

import Pencil from './Icons/Pencil';
import Trash from './Icons/Trash';
import RightAside from './components/RightAside';
import PuntosTotales from './components/PuntosTotales';

import { playSound } from './utils';
import cr7 from '../src/assets/siu.mp3'





function App() {

  // const [categorias, setCategorias] = useState([])


  const [catName, setCatName] = useState()
  const [categorias, dispatch] = useReducer(reducer, [], () => {
    const savedCategorias = localStorage.getItem('categorias');
    return savedCategorias ? JSON.parse(savedCategorias) : [];
  })


  //OBJETO DE REFERENCIA
  const cat = {
    nombre: "",
    subCategoria: [

    ],
    puntos: 300,
    puntosActuales: 0,
    id: 1,
    done: Boolean

  }

  const [current, setCurrent] = useState()
  const [modalAside, setModalAside] = useState(false)
  const [isEdit, setIsEdit] = useState(false)





  const createCategory = (event) => {
    event.preventDefault()

    setCatName("")

    const newCategory = {
      ...cat, nombre: catName, done: false, id: uid(), puntosMaximos: cat.subCategoria.reduce((acc, sub) => acc + parseFloat(sub.puntos), 0) // Suma los puntos de las subcategorías
    }

    // setCategorias([...categorias, newCategory])

    // console.log(categorias)
    dispatch({ type: 'add_task', payload: newCategory })



  }

  const completeTodo = (id) => {

    const categoria = categorias.find(cat => cat.id === id);

    // Verifica si la tarea estaba incompleta antes de marcarla como completa
    if (!categoria.done) {
      playSound(cr7); // Reproduce el sonido solo si la tarea estaba incompleta
      dispatch({ type: 'complete_task', payload: id });
    } else {
      dispatch({ type: 'complete_task', payload: id });
    }

  }

  const selectCategory = (categoria) => {
    setModalAside(!modalAside)
    setCurrent(categoria)


  }

  const handlerDeleteCat = (categoria) => {

    dispatch({ type: "delete_task", payload: categoria })
    setModalAside(false)
  }

  useEffect(() => {
    categorias.length <= 0 ? setModalAside(false) : null
    localStorage.setItem('categorias', JSON.stringify(categorias));
  }, [categorias])



  return (
    <>

      {/* <LeftAside categorias={categorias} /> */}


      <main className='relative text-white w-full p-3  overflow-x-hidden flex flex-col h-screen '>
        <PuntosTotales categorias={categorias} />

        <div className='task-list flex flex-col gap-1  w-full mt-3 '>

          {
            categorias.map((categoria, index) => (
              <div className='flex relative'>

                <div key={index} className='task-item flex gap-3 p-2 bg-neutral-800 hover:bg-neutral-700 cursor-pointer w-full items-center rounded-md' onClick={() => selectCategory(categoria)}>
                  <label >
                    <input onChange={() => completeTodo(categoria.id)} type="checkbox" name="" id="checkbox" className='checkbox' checked={categoria.done} />
                    <span className='checkbox-span'></span>
                  </label>
                  <div className='w-full'>
                    <p className='text-base leading-none w-full '>{categoria.nombre}</p>
                    <span className='text-sm truncate'>{categoria.puntosActuales} de {categoria.puntos}</span>
                  </div>
                </div>

                <div className='flex absolute  h-full items-center justify-end gap-3 z-10 right-2'>
                  <button className='hover:bg-red-500 py-1 px-2 rounded-md  ' onClick={() => handlerDeleteCat(categoria)}><Trash /></button>
                </div>

              </div>

            ))
          }

        </div>

        <form onSubmit={createCategory} className='absolute bottom-0.5 flex bg-neutral-700 w-full left-0 p-3 cursor-text'>
          <button className='p-2 text-white font-bold' type='submit'>+</button>
          <label htmlFor='addtask-text' className=' p-2 flex items-center gap-2 w-full cursor-text '>

            <input type="text" onChange={(e) => { setCatName(e.target.value) }} value={catName} name="addtask-text" id="addtask-text" className='w-full bg-transparent border-none px-2 py-2' placeholder='Agregar una categoria' />
          </label>
        </form>


      </main>

      <RightAside modalAside={modalAside} setModalAside={setModalAside} setIsEdit={setIsEdit} isEdit={isEdit} current={current} dispatch={dispatch} categorias={categorias} setCurrent={setCurrent} uid={uid} />
    </>
  )
}

export default App
