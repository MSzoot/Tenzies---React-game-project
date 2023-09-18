import { useState, useEffect } from 'react'; 
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'

import { Dice } from "./components/dice";

export const App = () => {

  const generateNewDie = () => {
    return {
      value : Math.ceil(Math.random() * 6),
      isHeld: false,
      id : nanoid()
     }
  }

  const allNewDice = () => {
    let newDice = []
    for (let i = 0 ;i < 10 ; i++ ){
      newDice.push(generateNewDie())
    }
   return newDice;
  }
  
  const rollDice = () => {
    setDice(oldDice => oldDice.map(roll =>{
      return roll.isHeld ? roll
            : generateNewDie()
    }))
    setRolls(old => old+1)
  }

  const holdDice = (id) => {
    setDice(oldDice =>oldDice.map(roll => {
      return roll.id === id ? {...roll, isHeld : !roll.isHeld} 
            : roll 
    }))
  }
  const [dice, setDice] = useState(allNewDice());

  const [tenzies, setTenzies] = useState(false)

  const [rolls,setRolls] = useState(0)
  
useEffect(()=>{
 const isHeld = dice.every(roll => roll.isHeld)
 const firstValue = dice[0].value
 const hasSameValue = dice.every(roll => roll.value === firstValue)
  if(isHeld && hasSameValue){
    setTenzies(true)
    localStorage.setItem("best",rolls)
  }
},[dice])


const reset = () =>{
  setDice(allNewDice)
  setTenzies(false)
  setRolls(0)
}

  
  const diceElements =  dice.map(roll => (
     <Dice
        holdDice={() =>holdDice(roll.id)}
        isHeld={roll.isHeld}
        value={roll.value}
        key={roll.id}
        />
       ))
  

 return <main className=" bg-gray-100 h-[400px] w-[500px] mx-auto rounded-md flex flex-col items-center ">
    <h1>Tenzies</h1>
    <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
    <div className="my-10">
    <div className=" grid grid-cols-5 gap-5">
    {diceElements}
    </div>
    </div>
    <div className='flex justify-center items-center gap-10'>
    <h1>{"Rolls: "}{rolls}</h1>
    <button onClick={tenzies ? reset : rollDice } className='w-[150px] h-9 bg-[#5035FF] text-white rounded-sm text-xl'>{tenzies ? "New Game" : "Roll"}</button>
    {tenzies && <Confetti/>}
    <h1>{"Best: "}{localStorage.getItem("best")}</h1>

    </div>
    
  </main>
};
