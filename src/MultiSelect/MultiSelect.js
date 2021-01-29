import React, { useState, useEffect } from 'react'
import './MultiSelect.scss'

// this is a stub for you to develop the following

/*
    PART 2 - OPTIONAL 
    
    Develop a component similar to the single select that allows multiple options to be selected. 

    This will include an ability to toggle each option, and then click a submit button for grading.

    Grading will indicate visually on each option if it was correct or not. This implies 4 states for each button - selected and correct, selected and incorrect, not selected and correct, not selected and incorrect.

    The generic feedback shown in the data is binary - either you got it 100% correct and get the correct feedback, or you don't. 
*/

const MultiSelect = props => {
    const [selected, setSelected] = useState({ 0: false, 1: false, 2: false, 3: false });
    const [correct, setCorrect] = useState(null);
    const [modal, setModal] = useState(false);

    const handleSelect = (i, boolean) => {
        setSelected(prevState => ({ ...prevState, [i]: boolean }))
    }

    const handleSubmit = (event) => {
        for(let option in props.data.options){
            if(props.data.options[option].correct == undefined){
                if(selected[option] === false){
                    setCorrect(true)
                }
            }else if(props.data.options[option].correct == selected[option]){
                setCorrect(true)
            }else{
                console.log(option)
                setCorrect(false)
                break
            }
        }
        setModal(true)
    }

    return (
        <div className={`MultiSelect`}>
            <h1>
                {props.data.questionText}
            </h1>
            {props.data.options.map((option, optionIndex) => {
                let letter = ['A.', 'B.', 'C.', 'D.']
                return <button className={`answerBtn ${selected[optionIndex] ? `selected` : 'deselected'}`} onClick={() => { handleSelect(optionIndex, !selected[optionIndex]) }}>
                    {`${letter[optionIndex]} ${option.text}`}
                </button>
            })
            }
            <button className="submitBtn" onClick={handleSubmit}>Submit</button>
            {modal &&
                <div className={`feedback ${correct? 'correct': 'incorrect'}`}>
                    <div className={`feedbackContent`}>
                        <h1>
                            {correct ?
                                props.data.feedback.correct.header
                                :
                                props.data.feedback.incorrect.header
                            }
                        </h1>
                        {props.data.options.map((option, optionIndex) => {
                            let letter = ['A.', 'B.', 'C.', 'D.'];
                            let showCorrect;
                            if(option.correct == undefined){
                                if(selected[optionIndex] === false){
                                    showCorrect = true;
                                }
                            }else if(option.correct == selected[optionIndex]){
                                showCorrect = true;
                            }else{
                                showCorrect = false;
                            }

                            return <p className={`${showCorrect ? 'optionCorrect' : 'optionIncorrect'}`}>
                                {`${showCorrect ? `Correct` : 'Incorrect'} ${letter[optionIndex]} ${option.text}`}
                            </p>
                        })
                        }
                        <button onClick={props.onComplete}>OK</button>
                    </div>
                </div>
            }
        </div>
    )
}

export default MultiSelect