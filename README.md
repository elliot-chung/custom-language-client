# [App Link](https://custom-language-client.vercel.app/)

# Overview

This is a React app that allows the user to write programs in a custom programming language I wrote for a university compilers course. The web app communicates with a backend server that compiles the instructions written in the text area.

# Language Specifics

## Memory

Memory allocation refers to the heap size allocated for the program and is done in 8 byte units. The default allocation is 10,000 (80,000 bytes).

## Input

The input field is used to specify a value to use as input during the program's execution. It can be accessed using the "input" keyword as you would use a variable. More information on variables below.

## Program

⚠️WARNING⚠️ Extra parentheses will cause compilation errors

### Functions

Functions allow for an expression (explained below) to be saved and called with inputs later during the program's main execution. The function header is defined by the names used in the parentheses. The entire function evaluates to the value of the function body expression that follows the header.

```
(fun (<Name> <Arguments>*) <Expression>)
```

The function can be called later like this:

```
(<Name> <Arguments>*)
```

### Expression

Each program must contain at least one expression following all the function definitions. This expression is considered to be the main body of the program. An expression can be a primitive value like a number or boolean but it can also be a more complex structures like an if-statement. In any case, expressions always evaluate down to value and since some expression can take expression as input this allows for the composition of expression into complex programs. This also means every program will evaluate to a single value upon completion, this value is printed to the standard output upon a successful program exit. The following is a list of every expression:

#### Number

An integer can be used as an expression

```
23
```

#### Boolean

Either boolean value can be written out and used as an expression

```
true
```

```
false
```

#### Nil

An empty Nil value can be used as an expression

```
nil
```

#### Input

A special variable reserved for the input value that available anywhere in the main expression

```
input
```

#### Variable Identifier

A variable identifier that's been defined in a parent let-statement can be used as an expression. Trying to use an unbound identifier results in a compilation error.

```
foo
```

#### Increment/Decrement

These expressions evaluate to a number one greater or one less than its input.

```
(add1 41)   # Evaluates to 42
```

```
(sub1 41)   # Evaluates to 40
```

#### Arithmetic Operations

The four basic arithmetic operations can be used on two numbers with the entire expression equalling the result of the operation. Note, the division operation is only capable of integer division.

```
(+ 30 4)    # Evaluates to 34
```

```
(- 30 4)    # Evaluates to 26
```

```
(* 30 4)    # Evaluates to 120
```

```
(/ 30 4)    # Evaluates to 7
```

#### Comparison Operations

4 operations can be used to compare number values. These expression evaluate to a boolean depending on the output of the comparison.

```
(< 12 23)    # Evaluates true
```

```
(<= 12 12)   # Evaluates true
```

```
(> 12 23)    # Evaluates false
```

```
(>= -23 0)   # Evaluates false
```

The equals operator can be used to compare two values of matching types. Numbers and booleans will evaluate true if their values are equivalent, vectors will only evaluate as equal if the variable refers to the same vector in memory.

```
(= false false)            # Evaluates true
```

```
(= 23 3)                   # Evaluates false
```

```
(= (vec) (vec))            # Evaluates false
```

```
(let ((a (vec))) (= a a))  # Evaluates true
```

#### Type Check

These expressions check the type of their input and return a boolean if it matches the type of the checking expression.

```
(isnum 23)      # Evaluates to true
```

```
(isbool 23)     # Evaluates to false
```

```
(isvec (vec))   # Evaluates to true
```

#### Print

This expression prints its input to the standard output and evaluates the value of its input statement.

```
(print 23)
```

#### Variable Assignment

A let statement can be used to define a number of variables to be used in an expression. Pairs of variable identifiers and expression between the first set of parentheses define the variables that can be accessed in the statement's body. The body expression follows the definitions and the entire let statement evaluates to the value of the body.

```
(let ((foo 23) (bar false)) (if bar 0 foo))    # Evaluates to 23
```

#### Variable Reassignment

A variable can be reassigned inside the body of the let-statement using a set!-statement. The value of the set! expression is equal the expression used for reassignment.

```
(let ((a 12)) (block
   (set! a (+ a 15))
   (+ a 20)
))                  # Evaluates to 47
```

#### If-Statement

A If expression takes three inputs: the condition, the then expression, and the else expression. The first expression is the conditon and is use to decide if the then or else expression will be evaluated.

```
(if true 30 40)    # Evaluates to 30
```

```
(if false 30 40)   # Evaluates to 40
```

#### Chaining Instructions

A block expression can take an arbitrary number of expressions as input and will evaluate them on after another. The entire block expression evaluates to the value of the last expression in the block statement.

```
(block (print 20) (print 30)) # Print 20 followed by 30
```

#### Looping and Breaking

A loop expression can be used to repeat the body expression until a break expression is called. The loop expression evaluates to the expression called alongside the break statement.

```
(let ((i 0) (acc 0)) (loop (block
   (set! i (add1 i))
   (if (< i 10)
      (set! acc (+ acc i))
      (break acc)
   )
)))                              # Evaluates to 45
```

#### Making Vectors

Vectors are data structures that can hold multiple values and they're stored on the heap. This means that allocating too many vectors in scope could cause the program to run out of memory (although garbage collection helps avoids this). A vector can hold any type including references to other vectors and is not limited to a single type per vector. A vector can be initialized in two ways. In either case, the expression evaluates to the memory address new vector.

First a vec expression can be used to initialize a vector with a predetermined set of values.

```
(vec 1 2 3 true false)   # Creates a vector [1, 2, 3, true, false]
```

Or a make-vec expression can be used to initialize a vector of certain size filled with the given value. The first argument is for the size and the second argument is the fill value.

```
(make-vec 5 false) # Creates a vector [false, false, false, false, false]
```

#### Accessing Vectors

Vector elements can be accessed using a vec-get expression which evaluates to the value of the input vector at the given index.

```
(vec-get (vec 5 10 15 20) 2)  # Evaluates to 15
```

#### Writing to Vectors

Vector elements can be changed using a vec-set! expression which evaluates to the vector after being changed.

```
(vec-set! (vec 5 10 15 20) 2 3)  # Evaluates to [5, 10, 3, 20]
```

#### Vector Length

A vec-len expression will evaluate to a number equal to the length of the given vector.

```
(vec-len (vec 1 2 3))   # Evaluates to 3
```

#### Function Calls

If a function is defined before the main body expression, it can be used inside the main expression by invoking the function header that it was defined under.

```
(fun (add25 arg) (+ arg 25))  # Function definition for add25 which adds 25 to its only input

(add25 50) # Call the function in the main body, Evaluates to 75
```

#### Internal Functions

The following three expressions are used to showcase the functionality the custom language but are not meant to evaluate to useful values.

The first expression is used to manually invoke the garbage collector before the program reaches the end of the heap.

```
(gc)
```

The next two expression are used to print the contents of the stack or the heap to the standard output

```
(snek-printstack)
```

```
(snek-printheap)
```
