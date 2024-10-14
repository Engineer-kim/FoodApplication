import { useContext } from "react";
import Modal from "./UI/Modal";
import CartContext from "../store/CartContext";
import { currencyFormatter } from "../util/formatting";
import UserProgressContext from "../store/UserProgressContext";
import Input from "./UI/Input";
import Button from "./UI/Button";
import useHttp from "../hooks/useHttp.js"


const requestCongfig = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
}

export default function Checkout() {
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);


    const { data, isLoading: isSending, error, sendRequest ,clearData } = useHttp(
        "http://localhost:3000/orders",
        requestCongfig
    )




    const cartTotal = cartCtx.items.reduce(
        (totalPrice, item) => totalPrice + item.quantity * item.price,
        0
    )

    function handleClose() {
        userProgressCtx.hideCheckout();
    }

    function handleFinish() {
        userProgressCtx.hideCheckout();
        cartCtx.clearCart()
        clearData();
    }


    function handleSubmit(event) {
        event.preventDefault()  //새로고침 방지

        const fd = new FormData(event.target)
        const customerData = Object.fromEntries(fd.entries()) // {email : ettes@naver.com }

        sendRequest(
            JSON.stringify({
                order: {
                    items: cartCtx.items,
                    customer: customerData
                }
            })
        );
    }


    let actions = (
        <>
            <Button type="button" textOnly onClick={handleClose}>Close</Button>
            <Button>Submit Order</Button>
        </>
    )
    if (isSending) {
        actions = <span>Seding Order data ...</span>
    }

    if (data && !error) {
        return <Modal open={userProgressCtx.progress === 'checkout'} onClose={handleFinish}>
            <h2>Success!</h2>
            <p>U Are Order Submit</p>
            <p className="modal-actions">
                <Button onClick={handleFinish}>Okay</Button>
            </p>
        </Modal>
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
            {error && <Error title="failed to Submit order" message={error} />}
            <p className="modal-actions">
                {actions}
            </p>
        </form>
    </Modal>
}