import { useState, useEffect } from 'react'

interface ModalProps {
    isOpen: boolean
    onClose?: () => void
}

function Modal ({ isOpen, onClose }: ModalProps) {
    const [open, setOpen] = useState(isOpen)

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
            <div className="bg-white bg-opacity-100 flex flex-row-reverse h-1/2 w-1/2 mx-auto my-10 rounded-lg" onKeyDown={handleKeyDown}>
                <button className="bg-red-600 text-white hover:bg-red-500 h-6 w-6 m-2 border rounded text-center" onClick={handleClose}>X</button>
            </div> 
        </div>
    )
}

export default Modal