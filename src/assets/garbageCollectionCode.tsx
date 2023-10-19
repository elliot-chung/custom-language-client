const garbageCollectionCode = `(fun (grow arr) 
    (let ((copy (make-vec (vec-len arr) nil)) (i 0)) 
        (loop (if (< i (vec-len arr)) (block 
            (vec-set! copy i (add1 (vec-get arr i)))
            (set! i (add1 i))
        ) (break copy)))
    )
)

(let ((arr (vec 0 1 2 3 4 5 6 7 8 9))) (block
    (print arr)
    (snek-printheap)
    (let ((i 0)) (loop (if (< i 1000000) 
        (block
            (set! arr (grow arr))
            (set! i (add1 i))
        )
        (block 
            (snek-printheap)
            (break arr)
        )
    )))
))`

export default garbageCollectionCode