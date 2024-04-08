import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";

const ThankYouModal = forwardRef(({ props }, ref) => {
  const dialog = useRef();
  const navigate = useNavigate();
  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      },
    };
  });

  function handleClick() {
    navigate("/");
    // dialog.current.close();
  }

  return createPortal(
    <dialog ref={dialog} className="result-modal">
      <h1>Thank you for shopping with us</h1>
      <button onClick={handleClick}>Home</button>
    </dialog>,
    document.getElementById("modal")
  );
});
export default ThankYouModal;
