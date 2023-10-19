const factorialCode = `(fun (fac arg1)
    (if (= arg1 0)
        1
        (* arg1 (fac (- arg1 1)))
    )
)

(fac input)`

export default factorialCode