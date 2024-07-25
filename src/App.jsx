import { useState, useCallback, useEffect, useRef } from "react";
import "./App.css";
import img1 from "./assets/img1.jpg";
import toast from "react-hot-toast";

function App() {
  const [length, setlength] = useState(8);
  const [numAllowed, setnumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [pass, setpass] = useState("");

  //ref hook
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numAllowed) str += "1234567890";
    if (charAllowed) str += "-=!@#$%^&*_+";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setpass(pass);
  }, [length, numAllowed, charAllowed]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(pass);
    toast.success("Copied");
  }, [pass]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numAllowed, charAllowed, passwordGenerator]);

  return (
    <div className="bg-[#F0F0F0] h-screen flex flex-col md:flex-row items-center justify-center">
      <div className="flex w-full md:w-1/2 h-full items-center justify-center p-4">
        <div className="w-full max-w-md h-auto mx-auto shadow-md rounded-lg p-6 text-white bg-[#F87474]">
          <h1 className="text-white text-center pt-2">Password Generator</h1>
          <div className="flex items-center justify-between shadow rounded-lg overflow-hidden mb-4">
            <input
              type="text"
              value={pass}
              className="outline-none w-4/5 py-1 px-3 text-black rounded-lg"
              placeholder="password"
              ref={passwordRef}
              readOnly
            />
            <button
              onClick={copyPasswordToClipboard}
              className="focus:ring-4 shadow-lg transform active:scale-95 transition-transform outline-none bg-blue-700 text-white shrink-0 py-1 px-3 rounded-lg"
            >
              Copy
            </button>
          </div>
          <div className="flex flex-col md:flex-row text-sm gap-2 p-2 items-center">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setlength(e.target.value);
              }}
            />
            <label>Length: {length}</label>
            <div className="flex items-center gap-2 mt-2 md:mt-0">
              <input
                type="checkbox"
                defaultChecked={numAllowed}
                id="numberInput"
                onChange={() => {
                  setnumAllowed((prev) => !prev);
                }}
              />
              <label htmlFor="numberInput">Numbers</label>
              <input
                type="checkbox"
                defaultChecked={charAllowed}
                id="characterInput"
                onChange={() => {
                  setCharAllowed((prev) => !prev);
                }}
              />
              <label htmlFor="characterInput">Characters</label>
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full md:w-1/2 h-full justify-center items-center p-4">
        <img
          src={img1}
          alt="bg-img"
          className="h-full w-full object-cover rounded-lg"
        />
      </div>
    </div>
  );
}

export default App;
