import { ADD_TODO, DELETE_TODO, EDIT_TODO, SET_TASK, COMPLETE_TODO, SELECT_TODO } from "./action"

const initialState = {
    todoData: [],
    tasks: {title: '', dis: ''},
    complete: [],
    select: {},
}

 const todos = (state=initialState, action) => {
     
    console.log(state)
    switch(action.type) {

        case ADD_TODO:
            return{
                ...state,
                tasks: initialState.tasks,
                todoData: [...state.todoData, action.payload],
            }

        case SET_TASK:
            return {
                ...state,
                tasks: { ...state.tasks, ...action.payload },
            }

        case EDIT_TODO:
            return{
               ...state,
                tasks: initialState.tasks,
                todoData: state.todoData.map((match) => {
                    if (match.id === action.payload.id) {
                    return { ...match, ...action.payload };
                 }
            return match;
            }),
            }

        case DELETE_TODO: 
            return {
                ...state,
                todoData: state.todoData.filter((data) => data.id !== action.payload),
            }
            
        case SELECT_TODO: 
            console.log('sel', action)
            return {
                ...state,
                select: action.payload
            }
        
        case COMPLETE_TODO: 
            console.log('comple', action)
            return {
                ...state,
                complete:  action.payload.comD,
            }

        default:
            return state;
    }
    
}

export default todos