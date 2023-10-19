const quicksortCode = `(fun (or arg1 arg2) (if arg1 true arg2))

(fun (swap arr i1 i2) (if (= i1 i2) nil (let ((tmp (vec-get arr i1))) (block
    (vec-set! arr i1 (vec-get arr i2))
    (vec-set! arr i2 tmp)
))))

(fun (partition arr lo hi) 
    (let ((pivot (vec-get arr hi)) (i (sub1 lo)) (j lo)) (block
        (loop (if (< j hi) (block
            (if (<= (vec-get arr j) pivot) (block
                (set! i (add1 i))
                (swap arr i j)
            ) nil)
            (set! j (add1 j))
        ) (break nil)))
        (set! i (add1 i))
        (swap arr i hi)
        i
    ))
)

(fun (quicksort arr lo hi) 
    (if (or (>= lo hi) (< lo 0)) 
        nil
        (let ((p (partition arr lo hi))) (block
            (quicksort arr lo (sub1 p))
            (quicksort arr (add1 p) hi)
        ))
    )
)

(let ((arr (vec 14666 84792 98981 31191 82457 67981 76943 17415 25156 52005 66219 70974 91144 98739 12513 3016 99446 73007 87144 10801 30018 11711 81098 74201 83359 62202 13549 50157 46339 40819 15778 8926 50437 47659 48742 48191 22369 98381 67707 49265 57629 9274 47382 24532 55589 27513 2861 29930 39717 51476 85102 40421 72302 25882 23102 4563 17716 28088 89142 9093 57881 78179 98809 17630 97986 24773 35996 90352 34877 22696 92444 86953 94481 86695 94575 74299 67985 71877 88631 93420 69689 83931 79327 47793 53158 71807 29080 51150 29659 544 34024 33236 8155 46581 37399 45969 64010 4865 74210 9245))) (block 
    (print arr)
    (quicksort arr 0 (sub1 (vec-len arr)))
    arr
))`

export default quicksortCode