import { useEffect, useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer"

function App() {
  const word = "epäjärjestelmällistyttämättömyydellänsäkäänköhän"
  const [completion, setCompletion] = useState(0)
  const [locked, setLocked] = useState(false)
  const [offendingCharacter, setOffendingCharacter] = useState('')

  useEffect(() => {
    const handleDocumentKeydown = (event) => {
      if (completion >= word.length) return;
      if (locked) return;

      const key = event.key.toLowerCase()
      if (key.length !== 1) {
        return;
      }
  
      if (key >= "a" && key <= "ö") {
        const shouldBe = word.charAt(completion);

        if (key === shouldBe) {
          setCompletion(completion + 1)
        } else {
          setOffendingCharacter(key)
          setLocked(true)
          setTimeout(() => {
            setLocked(false)
          }, 10_000)
        }
      }
    }

    document.addEventListener("keydown", handleDocumentKeydown)

    return () => {
      document.removeEventListener("keydown", handleDocumentKeydown)
    }
  }, [completion, locked, offendingCharacter]);

  return (
    <div className="grid grid-rows-3 grid-cols-1 h-screen">
      <Header className="p-2"/>
      <div className="row-start-2 flex-col items-center hidden md:flex">
        <p className="text-xl">Type the following to prove you are human:</p>
        <p className="font-semibold text-3xl">
          <span className="text-green-600">{word.substring(0, completion)}</span>
          { locked 
            ? <span className="font-bold underline text-red-600">{offendingCharacter}</span> 
            : <span className="font-bold underline">{word.substring(completion, completion + 1)}</span>
          }
          <span>{word.substring(completion + 1)}</span>
        </p>
        {locked && <em className="mt-2 text-xl">locked for 10 seconds for crimes against Finns</em>}
        {completion >= word.length && <p className="mt-4 text-xl">congratulations, you are now Finnish</p>}
      </div>
      <div className="flex-col items-center flex md:hidden">
        <p className="text-2xl">your mobile device is not a Nokia</p>
        <p className="text-xl">therefore you can't be Finnish :(</p>
      </div>
      <Footer className="p-2 self-end justify-self-end"/>
    </div>
  );
}

export default App;
