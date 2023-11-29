import React from 'react'
import './Question.scss'

const checkStatus = (quesStatus) => {
    if(quesStatus === 0){
        return <span>unsolved</span>
    }
    else if(quesStatus === 1){
        return <span>solved</span>
    }
    else{
        return <span>revisit</span>
    }
}

const Question = ({question}) => {
  return (
    <h2 className='question'>{question.question} <span><b>{checkStatus(question.status)}</b></span></h2>
  )
}

export default Question