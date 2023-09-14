import { useState } from 'react'; 
import { nanoid } from 'nanoid'

import { Dice } from "./components/dice";

export const App = () => {


  const allNewDice = () => {
    let newDice = []
    for (let i = 0 ;i < 10 ; i++ ){
      newDice.push({
       value : Math.floor(Math.random() * 6) + 1,
       isHeld: false,
       key : nanoid()
      })
    }
   return newDice;
  }


  const rollDice = () => {
    setDice(allNewDice())
  }



  
    
  
  const [dice, setDice] = useState(allNewDice());

  
  const diceElements =  dice.map(roll => <Dice value={roll.value}></Dice>)
  

 return <main className=" bg-gray-100 h-[400px] w-[500px] mx-auto rounded-md flex flex-col items-center ">
    <h1>Tenzies</h1>
    <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
    <div className="my-10">
    <div className=" grid grid-cols-5 gap-5">
    {diceElements}
    </div>
    </div>
    <button onClick={rollDice} className=' w-24 h-9 bg-[#5035FF] text-white rounded-sm text-xl'>Roll</button>
  </main>
};
