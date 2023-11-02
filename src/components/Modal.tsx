import { useState, useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose?: () => void;
}

function Modal({ isOpen, onClose }: ModalProps) {
  const [open, setOpen] = useState(isOpen);

  const textContent = `<prog> := <defn>* <expr>
    <defn> := (fun (<name> <name>*) <expr>)
    <expr> :=
      | <number>
      | true
      | false
      | nil
      | input
      | <identifier>
      | (let (<binding>+) <expr>)
      | (<op1> <expr>)
      | (<op2> <expr> <expr>)
      | (set! <name> <expr>)
      | (if <expr> <expr> <expr>)
      | (block <expr>+)
      | (loop <expr>)
      | (break <expr>)
      | (vec <expr>*)
      | (make-vec <expr> <expr>)
      | (vec-get <expr> <expr>)
      | (vec-set! <expr> <expr> <expr>)
      | (vec-len <expr>)
      | (<fun-name> <expr>*)
      | (gc)
      | (snek-printheap)
      | (snek-printstack)
    
    <op1> := add1 | sub1 | isnum | isbool | isvec | print
    <op2> := + | - | * | / | < | > | >= | <= | =
    
    <binding> := (<identifier> <expr>)`;

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  const handleClose = () => {
    setOpen(false);
    if (onClose) {
      onClose();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") {
      handleClose();
    }
  };

  return (
    open && (
      <div className="bg-black bg-opacity-40 fixed inset-0">
        <div
          className="bg-white relative bg-opacity-100 h-5/6 max-h-[55rem] w-fit max-w-[95%] mx-auto mt-10 rounded-lg"
          onKeyDown={handleKeyDown}
        >
          <button
            className="bg-red-600 absolute top-0 right-0 text-white hover:bg-red-500 h-6 w-6 m-2 border rounded text-center"
            onClick={handleClose}
          >
            X
          </button>
          <h1 className="font-medium text-center text-black text-bold text-xl m-4">
            Quickstart
          </h1>
          <div className="text-black max-h-[90%] rounded-lg text-xs sm:px-4 md:px-8 sm:text-sm md:text-base font-mono overflow-auto whitespace-pre px-2 pb-5">
            {textContent}
          </div>
        </div>
      </div>
    )
  );
}

export default Modal;
