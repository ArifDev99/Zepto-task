// import React from 'react'
import { useEffect, useRef, useState } from "react";
import avtar from "../src/assets/avtar.jpg";
const data = [
  { id: 1, name: "Arif Rahaman", email: "arif@gmai.com" },
  {
    id: 2,
    name: "Raji gupta",
    email: "gupta@gmai.com",
  },
  {
    id: 3,
    name: "Supriko karmakar",
    email: "karmakar@gmai.com",
  },
  {
    id: 4,
    name: "Ayan mandol",
    email: "Ayan@gmai.com",
  },
  {
    id: 5,
    name: "Rahul sarkar",
    email: "Rahul@gmai.com",
  },
];

export default function Chip() {
  const [chips, setChips] = useState([]);
  const [currInput, setCurrInput] = useState();
  //   const [userData,setUserdata]=useState(data);
  const [avilabelChips, setAvilabelChips] = useState(data);

  const inputRef = useRef(null);

  const handelInputchange = (e) => {
    setCurrInput(e.target.value);
  };

  const handleChipAdd = (selectedchip) => {
    setChips((prevChips) => [...prevChips, selectedchip]);
    setAvilabelChips((prevItems) =>
      prevItems.filter((item) => item.id !== selectedchip.id)
    );
  };
  const handleChipRemove = (id) => {
    const removedchip = data.find((item) => item.id === id);
    setChips((prevChips) => prevChips.filter((item) => item.id !== id));
    setAvilabelChips((prev) => [...prev, removedchip]);
  };

  const handleInputKeyDown = (e) => {
    if (e.key === "Backspace" && currInput === "" && chips.length > 0) {
      handleChipRemove(chips[chips.length - 1].id);
    }
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [chips]);

  return (
    <div className="w-[50%] flex justify-center items-center">
      <div className=" w-full p-4">
        <div className="flex flex-wrap border p-3 gap-4">
          <ul className="flex flex-wrap justify-center gap-2">
            {chips?.map((chip) => (
              <li
                key={chip.id}
                className="flex justify-center items-center pr-1  text-xs border rounded-xl bg-gray-200"
              >
                <img
                  className="w-6 h-6 rounded-lg object-cover mr-1"
                  src={avtar}
                  alt="Avart"
                />
                <div>{chip.name}</div>
                <button onClick={() => handleChipRemove(chip.id)}>
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="100%"
                      height="100%"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-x cursor-pointer hover:text-indigo-400 rounded-full w-4 h-4 ml-2"
                    >
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </div>
                </button>
              </li>
            ))}
          </ul>
          <input
            type="text"
            className="text-sm rounded border-none focus:border-none bg-transparent outline-none "
            ref={inputRef}
            placeholder="Type here"
            value={currInput}
            onChange={handelInputchange}
            onKeyDown={handleInputKeyDown}
          />
        </div>
        <div className="max-w-72 max-h-60 border  rounded-lg overflow-y-auto">
          <div className="w-full flex flex-col gap-3 justify-center items-center ">
            {avilabelChips
              ?.filter((item) =>
                item.name.toLowerCase().includes(currInput?.toLowerCase())
              )
              .map((item) => (
                <div
                  className=" w-full py-2 rounded-md flex gap-1 justify-around items-center hover:bg-gray-200"
                  key={item.id}
                  onClick={() => handleChipAdd(item)}
                >
                  <img
                    className="w-8 h-8 rounded-lg object-cover"
                    src={avtar}
                    alt="Avtar"
                  />
                  <div className="text-xs">{item.name}</div>
                  <div className="text-xs opacity-50">{item.email}</div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
