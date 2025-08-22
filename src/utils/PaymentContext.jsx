import axios from "./axios";
import { createContext, use } from "react";
import { useNavigate } from "react-router-dom";

export let PaymentContext = createContext()
export let PaymentProvider = (props) => {
    let navigate=useNavigate()

    const pay = async (amountInRupees) => {
        // 1) Ask server for public key and create order
        const [{ data: { key } }, { data: { order } }] = await Promise.all([
            axios.get("api/payments/key"),
            axios.post("api/payments/order", {
                amountInRupees,
                receiptId: "order_rcptid_11",
                notes: { purpose: "Pro Plan" }
            })
        ]);
        console.log(order)
        // 2) Open Razorpay Checkout
        const options = {
            key,
            amount: order.amount,              // in paise
            currency: order.currency,
            name: "Your Company",
            description: "Pro Plan Payment",
            order_id: order.id,                // REQUIRED
            prefill: { name: "ABHISHEK", email: "user@example.com", contact: "9999999999" },
            notes: order.notes,
            handler: async function (response) {
                // 3) Verify signature on server
                const verifyRes = await axios.post("api/payments/verify", response);
                if (verifyRes.data.verified) {
                    alert("Payment successful ✅")
                    navigate("/test")
                    
                }
                else alert("Verification failed ❌");
            },
            theme: { color: "#3399cc" }
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
    };

    return (
        <PaymentContext.Provider value={{pay}}>
            {props.children}
        </PaymentContext.Provider>
    )
}