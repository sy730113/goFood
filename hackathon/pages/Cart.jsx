import DeleteIcon from '@mui/icons-material/Delete';
import { useCart, useDispatchCart } from '../src/components/contextReducer';

export default function Cart() {
  let data = useCart();
  let dispatch = useDispatchCart();

  if (data.length === 0) {
    return (
      <div>
        <div className='m-5 w-100 text-center fs-3'>The Cart is Empty!</div>
      </div>
    );
  }

  let totalPrice = data.reduce((total, food) => total + food.price, 0);

const handleCheckOut=async()=>{
    let userName=localStorage.getItem("USERNAME");
    const response = await fetch('http://localhost:5000/api/orderData', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        order_data: data,
        userName: userName,
        order_date: new Date().toDateString()
      })
    });
    console.log("Order Response:",response)
   if(response.status===200){
    dispatch({ type: "DROP" })
   }
  
}



  return (
    <div className='container m-auto mt-5'>
      <div className='table-responsive-sm table-responsive-md' style={{ maxHeight: '410px', overflowY:"scroll" }}>
        <table className='table table-hover'>
          <thead className='text-success fs-4' style={{  
 position:"sticky",top:"0"}}>
            <tr>
              <th scope='col' style={{color:"green"}}>#</th>
              <th scope='col'style={{color:"green"}}>Name</th>
              <th scope='col'style={{color:"green"}}>Quantity</th>
              <th scope='col'style={{color:"green"}}>Option</th>
              <th scope='col'style={{color:"green"}}>Amount</th>
              <th scope='col'style={{color:"green"}}></th>
            </tr>
          </thead>
         
          <tbody >
          
            {data.map((food, index) => (
              <tr key={index}>
                <th scope='row'>{index + 1}</th>
                <td>{food.name}</td>
                <td>{food.qty}</td>
                <td>{food.size}</td>
                <td>{food.price}</td>
                <td><button type="button" className="btn p-0"><DeleteIcon onClick={() => { dispatch({ type: "REMOVE", index: index }) }}/></button></td>
              </tr>
            ))}
           
          </tbody>
         
        </table>
        <div><h1 className='fs-2'>Total Price: {totalPrice}/-</h1></div>
      <div>
        <button className='btn bg-success mt-5' onClick={handleCheckOut} >Check Out</button>
      </div>
      </div>
      
    </div>
  );
}
