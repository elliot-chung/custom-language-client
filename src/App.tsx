import { useEffect, useState } from 'react'
import axios from 'axios'

function App() {
  const [invalid, setInvalid] = useState(true)
  const [output, setOutput] = useState("")
  const [error, setError] = useState(false)

  const [memory, setMemory] = useState(10000)
  const [input, setInput] = useState("false")
  const [code, setCode] = useState("")

  function handleMemChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.value == "") {
      setMemory(10000)
      return
    }
    let value = parseInt(e.target.value)
    if (isNaN(value)) {
      setMemory(-1)
    } else if (value < 0) {
      setMemory(-1)
    } else {
      setMemory(value)
    }
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.value == "") {
      setInput("false")
    } else {
      setInput(e.target.value)
    }
  }

  function handleCodeChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setCode(e.target.value)
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(false)
    setOutput("loading...")
    try {
      let res = await axios.post("https://custom-language-server.fly.dev/", {
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
  }, [memory, code])

  return (
    <div className="w-screen min-h-screen h-fit overflow-x-hidden bg-cyan-800 text-white">
      <div className="mx-auto w-3/4 max-w-4xl">
        <h1 className="uppercase p-2 text-3xl font-bold text-center">Custom Language Client</h1>
        <form className="bg-cyan-700 rounded-md p-4 shadow-lg" onSubmit={handleSubmit}>
          <div className="flex my-2 h-6">
            <label className="my-auto" htmlFor="memory">Memory:</label>
            <input placeholder="10000" className="my-auto text-black px-2 ml-4 w-full rounded border" onChange={handleMemChange} type="text" id="memory" name="memory"/>
          </div>
          {memory == -1 && <p className="text-red-600 text-sm">Invalid Memory</p>}

          <div className="flex my-2 h-6">
            <label className="my-auto" htmlFor="input">Input:</label>
            <input placeholder="false" className="my-auto text-black px-2 ml-4 w-full rounded border" onChange={handleInputChange} type="text" id="input" name="input" />
          </div>

          <label htmlFor="code">Code:</label>
          <textarea className="whitespace-nowrap text-black font-mono my-2 p-2 h-96 w-full rounded border" onChange={handleCodeChange} id="code" name="code" />

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
