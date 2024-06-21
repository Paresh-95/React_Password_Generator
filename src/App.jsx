import { useState, useCallback, useEffect,useRef } from "react";
import "./App.css";

function App() {
  const [length, setlength] = useState(8);
  const [numAllowed, setnumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [pass, setpass] = useState("");

  //ref hook

  const passwordRef = useRef(null)

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
  }, [length, numAllowed, charAllowed, setpass]);

    const copyPasswordToClipboard = useCallback(()=>{
      passwordRef.current?.select()
      // passwordRef.current?.setSelectionRange(0,99)
      window.navigator.clipboard.writeText(pass)
    },[pass])
   


  //used useEffect Hook
  useEffect(() => {
    passwordGenerator();
  }, [length, numAllowed, charAllowed, passwordGenerator]);

  return (
    <>
      <div className="w-full max-w-md h-32 mx-auto shadow-md rounded-lg px-4 my-5 text-orange-500 bg-gray-700 ">
        <h1 className="text-white text-center pt-3 my-3">Password Generator</h1>
        <div className="flex-shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={pass}
            className="outline-none w-5/6 py-1 px-3 rounded-lg"
            placeholder="password"
            ref={passwordRef}
            readOnly
          />
          <button onClick={copyPasswordToClipboard} className=" focus:ring-4 shadow-lg transform active:scale-x-75 transition-transform  outline-none bg-blue-700 text-white shrink-0 py-1 ml-2 px-3 rounded-lg">
            copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
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
            <div className="flex items-center ml-2 gap-x-1">
              <input
                type="checkbox"
                defaultChecked={numAllowed}
                id="numberInput"
                //if we do it like this setnumAllowed(true) then it can be used only once to use it again and again we do it like below
                onChange={() => {
                  setnumAllowed((prev) => !prev);
                }}
              />
              <label htmlFor="numberInput">Numbers</label>
              <div className="flex items-center ml-2 gap-x-1">
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
      </div>
    </>
  );
}

export default App;
