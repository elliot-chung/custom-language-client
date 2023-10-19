const dfsCode = `
(fun (or a b) (if a true b))

(fun (and a b) (if a b false))

(fun (not a) (if a false true))

(fun (prepend arr elem)
    (let ((i 0) (len (vec-len arr)) (output (make-vec (add1 len) elem))) (loop (if (< i len) (block
        (vec-set! output (add1 i) (vec-get arr i))
        (set! i (add1 i))
    ) (break output))))
)

(fun (clone2d arr)
    (let ((j 0) (output (make-vec (vec-len arr) 0))) 
        (loop (if (< j (vec-len arr)) (block
            (vec-set! output j 
                (let ((i 0) (row (make-vec (vec-len (vec-get arr j)) 0))) 
                    (loop (if (< i (vec-len (vec-get arr j))) (block
                        (vec-set! row i (vec-get (vec-get arr j) i))
                        (set! i (add1 i))
                    ) (break row)))
                )
            )
            (set! j (add1 j))
        ) (break output)))
    )
)



(fun (createboard size) 
    (let ((i 0) (board (make-vec size 0))) (loop (if (< i size) (block
        (vec-set! board i (make-vec size 0))
        (set! i (add1 i))
    ) (break board))))
)

(fun (createvisited size) 
    (let ((i 0) (board (make-vec size 0))) (loop (if (< i size) (block
        (vec-set! board i (make-vec size false))
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

(fun (visit visited r c) (vec-set! (vec-get visited r) c true))

(fun (placepath board r c) (vec-set! (vec-get board r) c 8))

(fun (drawpath board path) 
    (let ((i 0) (len (vec-len path))) (loop (if (< i len) (block
        (placepath board (vec-get (vec-get path i) 0) (vec-get (vec-get path i) 1))
        (set! i (add1 i))
    ) (break nil))))
)

(fun (read board r c def) (if (or (or (< r 0) (>= r (vec-len board))) (or (< c 0) (>= c (vec-len board)))) def
    (vec-get (vec-get board r) c)
))

(fun (checkvalid board visited r c) 
    (and (not (= (read board r c 1) 1)) (not (read visited r c true)))
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

(fun (dfs board visited r c) (block
    (if (= (vec-len visited) 0) 
        (set! visited (createvisited (vec-len board))) 
        (set! visited (clone2d visited))
    )
    (visit visited r c)
    (if (= (read board r c 1) 2) 
        (vec (vec r c))
        (let ((path false)) (block
            (if (checkvalid board visited r (add1 c)) (block
                (set! path (dfs board visited r (add1 c)))
                (if path (set! path (prepend path (vec r c))) nil)
            ) nil)
    
            (if (and (not path) (checkvalid board visited (add1 r) c)) (block
                (set! path (dfs board visited (add1 r) c))
                (if path (set! path (prepend path (vec r c))) nil)
            ) nil)
    
            (if (and (not path) (checkvalid board visited r (sub1 c))) (block
                (set! path (dfs board visited r (sub1 c)))
                (if path (set! path (prepend path (vec r c))) nil)
            ) nil)
    
            (if (and (not path) (checkvalid board visited (sub1 r) c)) (block
                (set! path (dfs board visited (sub1 r) c)
                (if path (set! path (prepend path (vec r c))) nil)
            ) nil)
                    
            path
        ))  
    )        
))

(let ( (board (createboard 8)) ) (block
    (placegoal board 7 7)
    (placehwall board 1 0 4)
    (placevwall board 0 4 6)
    (placehwall board 4 2 6)
    (printboard board)
    (print nil)
    (vec-len (dfs board (vec) 0 0))
    
))
`
export default dfsCode;