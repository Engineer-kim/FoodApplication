import CartContext from "../store/CartContext"
import Modal from "./UI/Modal"

export default function Cart() {

    const cartCtx = useContext(CartContext)

    return (
        <Modal className='cart'>
            <h2>Your Cart</h2>
            <ul>

            </ul>
        </Modal>
    )
}