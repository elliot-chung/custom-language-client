import { useEffect, useState, useRef } from "react";
import axios from "axios";

import Modal from "./components/Modal";
import factorialCode from "./assets/factorialCode";
import garbageCollectionCode from "./assets/garbageCollectionCode";
import bstCode from "./assets/bstCode";
import quicksortCode from "./assets/quicksortCode";
import bfsCode from "./assets/bfsCode";

function App() {
  const editorRef = useRef<HTMLTextAreaElement>(null);
  const memRef = useRef<HTMLInputElement>(null);

  const [modalState, setModalState] = useState(false);

  const [invalid, setInvalid] = useState(true);
  const [output, setOutput] = useState("");
  const [error, setError] = useState(false);

  const [memory, setMemory] = useState(10000);
  const [input, setInput] = useState("false");
  const [code, setCode] = useState("");

  const [enableDropdown, setEnableDropdown] = useState(false);

  const setExample1 = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    editorRef.current!.value = factorialCode;
    setCode(factorialCode);
  };

  const setExample2 = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    editorRef.current!.value = bstCode;
    setCode(bstCode);
  };

  const setExample3 = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    editorRef.current!.value = quicksortCode;
    setCode(quicksortCode);
  };

  const setExample4 = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    editorRef.current!.value = bfsCode;
    setCode(bfsCode);
  };

  const setExample5 = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    editorRef.current!.value = garbageCollectionCode;
    setCode(garbageCollectionCode);
    memRef.current!.value = "50";
    setMemory(50);
  };

  const handleOpenModal = () => {
    setModalState(true);
  };

  const handleCloseModal = () => {
    setModalState(false);
  };

  const handleMemChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value == "") {
      setMemory(10000);
      return;
    }
    let value = parseInt(e.target.value);
    if (isNaN(value)) {
      setMemory(-1);
    } else if (value < 0) {
      setMemory(-1);
    } else {
      setMemory(value);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value == "") {
      setInput("false");
    } else {
      setInput(e.target.value);
    }
  };

  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCode(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(false);
    setOutput("loading...");
    try {
      let res = await axios.post("https://custom-language-server.fly.dev/", {
        memory: memory,
        input: input,
        code: code,
      });
      setError(!res.data.success);
      setOutput(res.data.output);
    } catch (err) {
      setError(true);
      setOutput("Error occurred");
    }
  };

  const toggleDropdown = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setEnableDropdown((prev) => !prev);
  };

  useEffect(() => {
    if (memory == -1) {
      setInvalid(true);
    } else if (code == "") {
      setInvalid(true);
    } else {
      setInvalid(false);
    }
  }, [memory, code]);

  return (
    <div className="w-screen min-h-screen h-fit relative overflow-x-hidden bg-cyan-800 text-white">
      <div className="mx-auto w-11/12 max-w-4xl">
        <h1 className="uppercase p-2 text-lg sm:text-2xl md:text-3xl font-bold text-center whitespace-nowrap">
          Custom Language Client
        </h1>
        <div className="flex flex-row-reverse absolute sm:static right-0 top-0 m-2">
          <button
            className=" bg-cyan-700 hover:bg-cyan-900 border rounded-full w-6 h-6 sm:w-8 sm:h-8"
            onClick={handleOpenModal}
          >
            ?
          </button>
        </div>
        <form
          className="bg-cyan-700 rounded-md p-4 shadow-lg"
          onSubmit={handleSubmit}
        >
          <div className="flex my-2 h-6">
            <label className="my-auto" htmlFor="memory">
              Memory:
            </label>
            <input
              ref={memRef}
              placeholder="10000"
              className="my-auto text-black px-2 ml-4 w-full rounded border"
              onChange={handleMemChange}
              type="text"
              id="memory"
              name="memory"
            />
          </div>
          {memory == -1 && (
            <p className="text-red-600 text-sm">Invalid Memory</p>
          )}

          <div className="flex my-2 h-6">
            <label className="my-auto" htmlFor="input">
              Input:
            </label>
            <input
              placeholder="false"
              className="my-auto text-black px-2 ml-4 w-full rounded border"
              onChange={handleInputChange}
              type="text"
              id="input"
              name="input"
            />
          </div>
          <div className="flex flex-col md:flex-row">
            <p className="hidden md:block">Examples: </p>
            <button
              className="md:hidden bg-cyan-700 hover:bg-cyan-900 p-2 border rounded"
              onClick={toggleDropdown}
            >
              {enableDropdown ? "Hide Examples" : "Show Examples"}
            </button>
            <div
              className={`flex flex-col md:flex-row w-full justify-evenly md:flex ${
                enableDropdown ? "hidden" : "flex"
              }`}
            >
              <button
                onClick={setExample1}
                className="bg-slate-600 hover:bg-cyan-900 p-2 border rounded"
              >
                Factorial
              </button>
              <button
                onClick={setExample2}
                className="bg-slate-600 hover:bg-cyan-900 p-2 border rounded"
              >
                Binary Search Tree
              </button>
              <button
                onClick={setExample3}
                className="bg-slate-600 hover:bg-cyan-900 p-2 border rounded"
              >
                Quicksort
              </button>
              <button
                onClick={setExample4}
                className="bg-slate-600 hover:bg-cyan-900 p-2 border rounded"
              >
                Pathfinding
              </button>
              <button
                onClick={setExample5}
                className="bg-slate-600 hover:bg-cyan-900 p-2 border rounded"
              >
                Garbage Collection
              </button>
            </div>
          </div>

          <textarea
            ref={editorRef}
            className="whitespace-nowrap text-black font-mono my-2 p-2 h-96 w-full rounded border"
            onChange={handleCodeChange}
            id="code"
            name="code"
          />

          <div className="flex justify-center">
            <button
              disabled={invalid}
              className={
                invalid
                  ? "bg-slate-200 p-2 border rounded"
                  : "hover:bg-cyan-900 p-2 border rounded"
              }
              type="submit"
            >
              {" "}
              Submit{" "}
            </button>
          </div>
        </form>
        <div className="overflow-auto whitespace-pre font-mono shadow my-2 p-2 bg-cyan-700 rounded-md w-full h-96">
          <div className={error ? "text-red-600" : "text-white"}>
            <p className="w-fit">{output}</p>
          </div>
        </div>
      </div>
      <Modal isOpen={modalState} onClose={handleCloseModal} />
    </div>
  );
}

export default App;
