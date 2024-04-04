import { createContext,useContext,useReducer } from "react"

const CartStateContext = createContext();

const CartDispatchContext = createContext();
const reducer=(state,action)=>{
  switch(action.type){
    case 'ADD':
      return [...state,{id: action.id, name: action.name,qty:action.qty,size:action.size,price:action.price,img:action.img}]
      case 'REMOVE':
        let newArr=[...state]
        newArr.splice(action.index,1)
        return newArr;

        case 'UPDATE':
          case "UPDATE":
            let arr = [...state]
            arr.find((food, index) => {
                if (food.id === action.id) {
                    console.log(food.qty, parseInt(action.qty), action.price + food.price)
                    arr[index] = { ...food, qty: parseInt(action.qty) + food.qty, price: action.price + food.price }
                }
                return arr
            })
            return arr

            case "DROP":
              let emptyArr=[]
              return emptyArr;
    // case 'REMOVE_ITEM':
    //   return {
    //    ...state,
    //     cartItems:state.cartItems.filter(item=>item.id!==action.payload)
    //   }
    // case 'UPDATE_QUANTITY':
    //   return {
    //    ...state,
    //     cartItems:state.cartItems.map(item=>item.id===action.payload.id?action.payload:item)
    //   }
    default:
      return state;
  }
}

export const CartProvider=({children})=> {
const [state,dispatch]=useReducer(reducer,[])
return (
  <CartDispatchContext.Provider value={dispatch} >
<CartStateContext.Provider value={state} >
{children}
  </CartStateContext.Provider>
  </CartDispatchContext.Provider>
)
}

export const useCart=()=>useContext(CartStateContext);

export const useDispatchCart=()=>useContext(CartDispatchContext);