import { useContext } from "react";
import Modal from "./UI/Modal";
import CartContext from "../store/CartContext";
import { currencyFormatter } from "../util/formatting";
import UserProgressContext from "../store/UserProgressContext";
import Input from "./UI/Input";
import Button from "./UI/Button";

export default function Checkout() {
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);

    const cartTotal = cartCtx.items.reduce(
        (totalPrice, item) => totalPrice + item.quantity * item.price,
        0
    )

    function handleClose() {
        userProgressCtx.hideCheckout();
    }

    function handleSubmit(event) {
        event.preventDefault()  //새로고침 방지

        const fd = new FormData(event.target)
        const customerData = Object.fromEntries(fd.entries()) // {email : ettes@naver.com }

        fetch('http://localhost:3000/orders' , {
            method: 'POST',
            headers:{
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                order: {
                    items: cartCtx.items,
                    customer: customerData
                }
            })
        })
    }

    return <Modal open={userProgressCtx.progress === 'checkout'} onClose={handleClose}>
        <form onSubmit={handleSubmit}>
            <h2>CheckOut</h2>
            <p> Total Amount: {currencyFormatter.format(cartTotal)}</p>
            <Input label="FullName" type="text" id="name"></Input>
            <Input label="E-mail" type="email" id="email"></Input>
            <Input label="Street" type="text" id="street"></Input>
            <div className="control-row">
                <Input label="PostalCode" type="text" id="postal-code"></Input>
                <Input label="City" type="text" id="city"></Input>
            </div>

            <p className="modal-actions">
                <Button type="button" textOnly onClick={handleClose}>Close</Button>
                <Button>Submit Order</Button>
            </p>
        </form>
    </Modal>
}