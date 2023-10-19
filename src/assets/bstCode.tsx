const bstCode = `(fun (createbst val) (vec (vec) val (vec)))

(fun (bstadd bst val) 
    (if (= (vec-len bst) 0)
        (createbst val)
        (if (= (vec-get bst 1) val) 
            bst
            (if (< (vec-get bst 1) val)
                (block (vec-set! bst 0 (bstadd (vec-get bst 0) val)) bst)
                (block (vec-set! bst 2 (bstadd (vec-get bst 2) val)) bst)
            )
        )
    )
)

(fun (find bst val) 
    (if (= (vec-len bst) 3)
        (if (= (vec-get bst 1) val)
            true
            (if (< (vec-get bst 1) val)
                (find (vec-get bst 0) val)
                (find (vec-get bst 2) val)
            )
        )
        false
    )
)

(let ((bst (createbst 8))) (block
    (bstadd bst 3)
    (bstadd bst 7)
    (bstadd bst 2)
    (bstadd bst 4)
    (find bst input)
))`

export default bstCode