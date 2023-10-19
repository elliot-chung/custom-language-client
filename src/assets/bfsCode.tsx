const bfsCode = `(fun (or a b) (if a true b))

(fun (and a b) (if a b false))

(fun (not a) (if a false true))

(fun (make-queue) (vec 0 0 (make-vec 16 nil)))

(fun (compact queue) 
    (let ((data (vec-get queue 2)) 
        (output (make-vec (vec-len data) nil)) 
        (i (vec-get queue 0))
        (offset (vec-get queue 0))
        )
        (loop (if (< i (vec-get queue 1)) (block
            (vec-set! output (- i offset) (vec-get data i))
            (set! i (add1 i))
        ) (block
            (vec-set! queue 0 0)
            (vec-set! queue 1 (- i offset))
            (vec-set! queue 2 output)
            (break queue)
        )))
    )
)

(fun (expand queue) (block 
    (compact queue)
    (if (= (vec-get queue 1) (vec-len (vec-get queue 2)))
        (let ((data (vec-get queue 2))
            (output (make-vec (* 2 (vec-len data)) nil))
            (i 0)
            )
            (loop (if (< i (vec-len data)) (block
                (vec-set! output i (vec-get data i))
                (set! i (add1 i))
            ) (block
                (vec-set! queue 2 output)
                (break queue)
            )))
        )
        nil
    )
))

(fun (enqueue queue elem)
    (let ((i (vec-get queue 1))) (block
        (if (= i (vec-len (vec-get queue 2))) 
            (block
                (expand queue) 
                (set! i (vec-get queue 1))
            )
            nil
        )
        (vec-set! (vec-get queue 2) i elem)
        (vec-set! queue 1 (add1 i))
        queue
    ))
)

(fun (dequeue queue)
    (let ((i (vec-get queue 0)) (output (vec-get (vec-get queue 2) i))) (block
        (vec-set! queue 0 (add1 i))
        (if (= i (vec-get queue 1)) (compact queue) nil)
        output
    ))
)

(fun (queue-len queue) (- (vec-get queue 1) (vec-get queue 0)))
     

(fun (createboard size) 
    (let ((i 0) (board (make-vec size 0))) (loop (if (< i size) (block
        (vec-set! board i (make-vec size 0))
        (set! i (add1 i))
    ) (break board))))
)

(fun (createparents size) 
    (let ((i 0) (board (make-vec size 0))) (loop (if (< i size) (block
        (vec-set! board i (make-vec size 0))
        (set! i (add1 i))
    ) (break board))))
)

(fun (printboard board)
    (let ((i 0) (size (vec-len board))) (loop (if (< i size) (block
        (print (vec-get board i))
        (set! i (add1 i))
    ) (break nil))))
)

(fun (placegoal board r c) (vec-set! (vec-get board r) c 2))

(fun (setParent parents r c code) (vec-set! (vec-get parents r) c code))

(fun (placepath board r c) (vec-set! (vec-get board r) c 7))

(fun (placestart board r c) (vec-set! (vec-get board r) c 3))

(fun (drawpath board parents sRow sCol eRow eCol) 
    (let ((r eRow) (c eCol)) 
        (loop (if (and (= r sRow) (= c sCol)) 
            (break (placestart board r c)) 
            (block
                (placepath board r c)
                (loop (block
                    (if (= (read parents r c 9) 1) (break (set! r (add1 r))) nil)
                    (if (= (read parents r c 9) 2) (break (set! c (sub1 c))) nil)
                    (if (= (read parents r c 9) 3) (break (set! r (sub1 r))) nil)
                    (if (= (read parents r c 9) 4) (break (set! c (add1 c))) nil)
                    (break nil)
                ))
            )
        ))
    )
)

(fun (read board r c def) 
    (if (or (or (< r 0) (>= r (vec-len board))) 
            (or (< c 0) (>= c (vec-len (vec-get board 0))))) 
        def
        (vec-get (vec-get board r) c)
))

(fun (checkvalid board parents r c) 
    (and (not (= (read board r c 1) 1)) (= (read parents r c 9) 0))
)

(fun (placehwall board r c1 c2) 
    (let ((i c1)) (loop (if (<= i c2) (block
        (vec-set! (vec-get board r) i 1)
        (set! i (add1 i))
    ) (break nil))))
)

(fun (placevwall board r1 r2 c)
    (let ((i r1)) (loop (if (<= i r2) (block
        (vec-set! (vec-get board i) c 1)
        (set! i (add1 i))
    ) (break nil))))
)

(fun (bfs board row col) 
    (let ((size (vec-len board)) (queue (make-queue)) (parents (createparents size))) (block
        (enqueue queue (vec row col))
        (setParent parents row col 9)
        (loop (if (not (= (queue-len queue) 0)) (block
            (let ((current (dequeue queue)) (r (vec-get current 0)) (c (vec-get current 1))) (block
                (if (= (read board r c 1) 2) 
                    (block (drawpath board parents row col r c) (break nil))
                    (block
                        (if (checkvalid board parents (add1 r) c) (block
                            (enqueue queue (vec (add1 r) c))
                            (setParent parents (add1 r) c 3)
                        ) nil)
                        (if (checkvalid board parents r (add1 c)) (block
                            (enqueue queue (vec r (add1 c)))
                            (setParent parents r (add1 c) 2)
                        ) nil)
                        (if (checkvalid board parents (sub1 r) c) (block
                            (enqueue queue (vec (sub1 r) c))
                            (setParent parents (sub1 r) c 1)
                        ) nil)
                        (if (checkvalid board parents r (sub1 c)) (block
                            (enqueue queue (vec r (sub1 c)))
                            (setParent parents r (sub1 c) 4)
                        ) nil)
                    )
                )
            ))
        ) (break false)))
    ))
)

(let ( (board (createboard 8)) ) (block
    (placegoal board 7 7)
    (placehwall board 1 0 4)
    (placevwall board 0 4 6)
    (placehwall board 4 2 6)
    (printboard board)
    (print nil)
    (if (bfs board 0 0)
        (printboard board)
        (print false)
    )
))
`
export default bfsCode;