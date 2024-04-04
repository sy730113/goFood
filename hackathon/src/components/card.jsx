import { useEffect } from "react";
import { useDispatchCart, useCart } from "./contextReducer";
import { useState, useRef } from "react";
export default function Card(props) {
  let dispatch = useDispatchCart();
  const [qty, setqty] = useState(1);
  const [size, setSize] = useState("");
  let options = props.options;
  let data = useCart();

  let priceRef = useRef();
  let priceOptions = Object.keys(options);
  const handleAddToCart = async () => {
    let food = [];
    for (const item of data) {
      if (item.id === props.foodItem._id) {
        food = item;

        break;
      }
    }

    if (food !== []) {
      if (food.size === size) {
        await dispatch({
          type: "UPDATE",
          id: props.foodItem._id,
          price: finalPrice,
          qty: qty,
        });
        return;
      } else if (food.size !== size) {
        await dispatch({
          type: "ADD",
          id: props.foodItem._id,
          name: props.foodItem.name,
          price: finalPrice,
          qty: qty,
          size: size,
          img: props.ImgSrc,
        });
        return;
      }
      await dispatch({
        type: "ADD",
        id: props.foodItem._id,
        name: props.foodItem.name,
        price: finalPrice,
        qty: qty,
        size: size,
        img: props.ImgSrc,
      });
      return;
    }

    await dispatch({
      type: "ADD",
      id: props.foodItem._id,
      name: props.foodItem.name,
      price: finalPrice,
      qty: qty,
      size: size,
    });
  };
  let finalPrice = qty * parseInt(options[size]);
  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);
  return (
    <div>
      <div className="card m-2" style={{ width: "15rem", maxHeight: "350px" }}>
        <img
          className="rounded"
          src={props.foodItem.img}
          alt="Card image cap"
          style={{ height: "170px", width: "100%", objectFit: "fill" }}
        />
        <div className="card-body">
          <h5 className="card-title">{props.foodItem.name}</h5>

          <div className="container w-100">
            <select
              className="m-2 h-100  bg-success rounded"
              onChange={(e) => setqty(e.target.value)}
            >
              {Array.from(Array(6), (e, i) => {
                return (
                  <option key={i + 1} value={i + 1}>
                    {" "}
                    {i + 1}
                  </option>
                );
              })}
            </select>
            <select
              className="h-100  bg-success rounded"
              ref={priceRef}
              onChange={(e) => setSize(e.target.value)}
            >
              {priceOptions.map((data) => {
                return (
                  <option key={data} value={data}>
                    {data}
                  </option>
                );
              })}
            </select>
            {/* Apply left margin to Total Price */}
            <div
              className="d-inline h-100 fs-6 ml-2 text-secondary"
              style={{ paddingLeft: "12px" }}
            >
              {finalPrice} Rs
            </div>
          </div>
          <hr />
          <button
            className="btn btn-success justify-center "
            style={{ marginBottom: "60px" }}
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
