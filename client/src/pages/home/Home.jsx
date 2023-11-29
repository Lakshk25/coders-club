import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllQuestions } from '../../redux/slices/questionsSlice';
import Question from '../../components/Questions/Question';
import './Home.scss'

const Home = () => {
  const dispatch = useDispatch();
  const questions = useSelector(state => state.questionsReducer.questions);
  console.log(questions);
  useEffect(() => {
  dispatch(getAllQuestions());
  }, [dispatch]);

  const renderQuestions = (questions, questionType) => {
    return (<>
      <h1 className='ques-head'>{questionType}</h1>
      {questions?.map((question) => (
        <Question key={question._id} question={question} />
      ))}
    </>)
  }

  return (
    <>
      <div className='home'>
        {renderQuestions(questions?.arrayQuestions, 'array questions')}
        {renderQuestions(questions?.lLQuestions, 'll questions')}
      </div>
    </>
  )
}

export default Home