import { renderHook, act } from '@testing-library/react-hooks';
import { useTodos, getTodos } from './useTodos'
import Axios from 'axios'

describe('useTodos', () => {
    it('al inicializar, las tareas están vacías y add, delete y update son funciones', () => {        
        const { result } = renderHook(() => useTodos())

        expect(result.current.todos).toEqual([])
        expect(result.current.addTodo).toEqual(expect.any(Function))
        expect(result.current.deleteTodo).toEqual(expect.any(Function))
        expect(result.current.updateTodo).toEqual(expect.any(Function))
    })

    // it('Se realiza la llamada correctamente a la api', async () => {
    //     const setTodos =  jest.fn()
    //     const todosData = [
    //         { userId: 1, id: 1, title: 'Comprar', completed: true },
    //         { userId: 1, id: 2, title: 'Tirar la basura', completed: false },
    //         { userId: 1, id: 3, title: 'Ir al gimnasio', completed: false },
    //     ]

    //     const getTodosData = jest.spyOn(Axios, 'get').mockResolvedValue({
    //         data: todosData,
    //     })        

    //     await getTodos(setTodos)

    //     expect(getTodosData).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/todos?userId=1')
    //     expect(setTodos).toHaveBeenCalled()
    // })

    it('debe actualizarse cuando llamamos a setTodos', () => {
        const todosData = [
            { userId: 1, id: 1, title: 'Comprar', completed: true },
            { userId: 1, id: 2, title: 'Tirar la basura', completed: false },
            { userId: 1, id: 3, title: 'Ir al gimnasio', completed: false },
        ]

        const { result } = renderHook(() => useTodos())

        act(() => {
            result.current.setTodos(todosData)
        })

        expect(result.current.todos).toEqual(todosData)        
    })

    it('debe agregarse correctamente el nuevo elemento cuando llamamos a addTodo', () => {
        const todosData = [
            { userId: 1, id: 1, title: 'Comprar', completed: true },
        ]
        const newTodo = { userId: 1, id: null, title: 'Tirar la basura', completed: false }
        const newTodosData = [
            { userId: 1, id: 1, title: 'Comprar', completed: true },
            { userId: 1, id: 2, title: 'Tirar la basura', completed: false }
        ]

        const { result } = renderHook(() => useTodos(todosData))

        act(() => {
            result.current.addTodo(newTodo)
        })

        expect(result.current.todos).toEqual(newTodosData)        
    })

    it('debe eliminarse correctamente el elemento indicado cuando llamamos a deleteTodo', () => {
        const todosData = [
            { userId: 1, id: 1, title: 'Comprar', completed: true },
            { userId: 1, id: 2, title: 'Tirar la basura', completed: false }
        ]
        const idToDelete = 1
        const newTodosData = [
            { userId: 1, id: 2, title: 'Tirar la basura', completed: false }
        ]

        const { result } = renderHook(() => useTodos(todosData))

        act(() => {
            result.current.deleteTodo(idToDelete)
        })

        expect(result.current.todos).toEqual(newTodosData)        
    })

    it('debe actualizarse correctamente el elemento indicado cuando llamamos a updateTodo', () => {
        const todosData = [
            { userId: 1, id: 1, title: 'Comprar', completed: true },
            { userId: 1, id: 2, title: 'Tirar la basura', completed: false }
        ]
        const idToUpdate = 2
        const newTodo = { userId: 1, id: 2, title: 'Tirar la basura a las 20.00', completed: false }
        const newTodosData = [
            { userId: 1, id: 1, title: 'Comprar', completed: true },
            { userId: 1, id: 2, title: 'Tirar la basura a las 20.00', completed: false }
        ]

        const { result } = renderHook(() => useTodos(todosData))

        act(() => {
            result.current.updateTodo(idToUpdate, newTodo)
        })

        expect(result.current.todos).toEqual(newTodosData)        
    })
})