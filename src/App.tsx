import { useEffect, useState } from 'react'
import axios from 'axios'

function App() {
  const [invalid, setInvalid] = useState(true)
  const [output, setOutput] = useState("")
  const [error, setError] = useState(false)

  const [memory, setMemory] = useState(-1)
  const [input, setInput] = useState("")
  const [code, setCode] = useState("")

  function handleMemChange(e: React.ChangeEvent<HTMLInputElement>) {
    let value = parseInt(e.target.value)
    if (isNaN(value)) {
      setMemory(-1)
    } else {
      setMemory(value)
    }
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInput(e.target.value)
  }

  function handleCodeChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setCode(e.target.value)
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(false)
    setOutput("loading...")
    try {
      let res = await axios.post('http://localhost:8080/compile', {
        memory: memory,
        input: input,
        code: code
      }) 
      setError(!res.data.success)
      setOutput(res.data.output)
    } catch (err) {
      setError(true)
      setOutput("Error occurred")
    }
  }

  useEffect(() => {
    if (memory == -1) {
      setInvalid(true)
    } else if (code == "") {
      setInvalid(true)
    } else {
      setInvalid(false)
    }
  }, [memory, input, code])

  return (
    <div className="w-screen h-screen bg-cyan-800 text-white">
      <div className="mx-auto w-3/4 max-w-4xl">
        <h1 className="uppercase p-2 text-3xl font-bold text-center">Custom Language Client</h1>
        <form className="bg-cyan-700 rounded-md p-4 shadow-lg" onSubmit={handleSubmit}>
          <div className="flex my-2 h-6">
            <label className="my-auto" htmlFor="memory">Memory:</label>
            <input className="my-auto text-black px-2 ml-4 w-full rounded border" onChange={handleMemChange} type="text" id="memory" name="memory"/>
          </div>
          {memory == -1 && <p className="text-red-600 text-sm">Invalid Memory</p>}

          <div className="flex my-2 h-6">
            <label className="my-auto" htmlFor="input">Input:</label>
            <input className="my-auto text-black px-2 ml-4 w-full rounded border" onChange={handleInputChange} type="text" id="input" name="input" />
          </div>

          <label htmlFor="code">Code:</label>
          <textarea className="whitespace-nowrap text-black font-mono my-2 p-2 h-96 w-full rounded border" onChange={handleCodeChange} id="code" name="code" />
          {code == "" && <p className="text-red-600 text-sm">Invalid Code</p>}

          <div className="flex justify-center">
            <button disabled={invalid} className={invalid ? "bg-slate-200 p-2 border rounded" : "hover:bg-cyan-900 p-2 border rounded"} type="submit"> Submit </button>
          </div>
        </form>
        <div className='overflow-auto whitespace-pre font-mono shadow my-2 p-2 bg-cyan-700 rounded-md w-full h-96'> 
          <div className={error ? "text-red-600" : "text-white"}>
            <p className="w-fit">{output}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
