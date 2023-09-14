export const Dice = (props) => {
    const styles = {
        backgroundColor : props.isHeld ? "#59E391" : "#FFF",
    }

    return (
        <div className="w-[35.84px] h-[35.84px] rounded-sm inline-flex justify-center items-center shadow-md shadow-black cursor-pointer text-2xl font-bold" style={styles} onClick={props.holdDice}>
        {props.value}
        </div>
    )
}