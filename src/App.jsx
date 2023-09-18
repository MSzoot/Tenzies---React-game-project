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
  }

  const holdDice = (id) => {
    setDice(oldDice =>oldDice.map(roll => {
      return roll.id === id ? {...roll, isHeld : !roll.isHeld} 
            : roll 
    }))
  }
  const [dice, setDice] = useState(allNewDice());

  const [tenzies, setTenzies] = useState(false)
  
useEffect(()=>{
 const isHeld = dice.every(roll => roll.isHeld)
 const firstValue = dice[0].value
 const hasSameValue = dice.every(roll => roll.value === firstValue)
  if(isHeld && hasSameValue){
    setTenzies(true)
  }
},[dice])



  // useEffect(()=>{
  //   let arr =[]
  //   let arr2 = []
  //   dice.map(roll => roll.isHeld && arr.push(roll) )
  //   if(arr.length === 10 ) {
  //     for(let i = 0 ; i < 9 ; i++){
  //       if (arr[i].value === arr[i+1].value){
  //         arr2.push(arr[i])
  //       }
  //     }
  //   }
  //   if(arr2.length === 9){
  //     setTenzies(true)  
  //   }
  // },[dice, tenzies])
const reset = () =>{
  setDice(allNewDice)
  setTenzies(false)
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
    <button onClick={tenzies ? reset : rollDice } className='px-4 h-9 bg-[#5035FF] text-white rounded-sm text-xl'>{tenzies ? "New Game" : "Roll"}</button>
    {tenzies && <Confetti/>}
  </main>
};
