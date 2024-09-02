import React from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from 'react';



function GuesssingGame() {

    const [chances, updateGuess] = useState(null);
    const [luckyNumber, setLuckyNumber] = useState(null);
    const [message, setMessage] = useState('');
    const [guess, setGuess] = useState("");
    



    useEffect(() => {
        if (luckyNumber === null) {
            setLuckyNumber(JSON.parse(localStorage.getItem("luckyNumber")) || getRandomNum())

        }


        if (chances === null) {
            updateGuess(JSON.parse(localStorage.getItem("timesGuessed")) || 0)

        }
    }, [])

    function submitHandler(event) {
        event.preventDefault();
        let parsedNum = parseInt(guess)

        if (parsedNum === luckyNumber) {
            setMessage(" Congratulations Your Right!")
        } else if (luckyNumber > parsedNum) {
            setMessage(" Too Low!")
        } else if (luckyNumber < parsedNum) {
            setMessage(" Too High!")
        }
        updateGuess(chances + 1);


    }


    function getRandomNum() {
        let randomNum = Math.floor(Math.random() * 100);

        localStorage.setItem("luckyNumber", JSON.stringify(randomNum));

        return randomNum;
    }

    function handleChange(e) {

        if (isNaN(e.target.value)) {
            alert('hey we need a number')
        } else {
            setGuess(e.target.value)
        }

    }


    function resetGame() {

        localStorage.removeItem('chances');
    }


    return (
        <>
            <h3 className='header'> I am thinking of a number between 1 and 100. Guess the Lucky Number!</h3>
            <p className='para'>You have made {chances} guesses</p>


            <div className='info'>
                <Form>
                    <input onChange={handleChange} type="text" placeholder>

                    </input>
                </Form>
                <br></br>
                <Button className='btn1' onClick={submitHandler}>Guess</Button> <br></br>
                <br></br>
                <Button onClick={resetGame}>Reset</Button>

            </div>
            <br></br>

            <p className='para2'>Start Guessing</p>
            <p className='para2'>{message}</p>


        </>
    )
}

export default GuesssingGame;