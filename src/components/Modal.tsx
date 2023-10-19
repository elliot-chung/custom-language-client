import { useState, useEffect } from 'react'

interface ModalProps {
    isOpen: boolean
    onClose?: () => void
}

function Modal ({ isOpen, onClose }: ModalProps) {
    const [open, setOpen] = useState(isOpen)

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
      | (gc)
      | (vec <expr>*)
      | (make-vec <expr> <expr>)
      | (vec-get <expr> <expr>)
      | (vec-set! <expr> <expr> <expr>)
      | (vec-len <expr>)
      | (<name> <expr>*)
    optionally:
      | (snek-<name> <expr>*)
    
    <op1> := add1 | sub1 | isnum | isbool | isvec | print
    <op2> := + | - | * | / | < | > | >= | <= | =
    
    <binding> := (<identifier> <expr>)`

    useEffect(() => {
        setOpen(isOpen)
    }, [isOpen])

    const handleClose = () => {
        setOpen(false)
        if (onClose) {
            onClose()
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "Escape") {
            handleClose()
        }
    }

    return (
        open &&
        <div className="bg-black bg-opacity-40 fixed inset-0">
            <div className="bg-white bg-opacity-100 h-fit w-1/2 min-w-fit mx-auto my-10 rounded-lg" onKeyDown={handleKeyDown}>
                <div className="flex flex-row-reverse">
                    <button className="bg-red-600 text-white hover:bg-red-500 h-6 w-6 m-2 border rounded text-center" onClick={handleClose}>X</button>
                </div>
                <h1 className=" font-medium text-center text-black text-bold text-2xl">Quickstart</h1> 
                <div className="text-black font-mono whitespace-pre-wrap p-10">
                    {textContent}
                </div>
            </div> 
        </div>
    )
}

export default Modal