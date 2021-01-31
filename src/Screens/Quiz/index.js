/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import Widget from '../../components/Widget'
import Footer from '../../components/Footer'
import GithubCorner from '../../components/GithubCorner'
import QuizBackground from '../../components/QuizBackground'
import QuizContainer from '../../components/QuizContainer'
import QuizLogo from '../../components/QuizLogo'
import AlternativesForm from '../../components/AlternativesForm'
import BackLinkArrow from '../../components/BackLinkArrow'
// import db from '../../../db.json'
import Button from '../../components/Button'
import Loading from '../../components/Loading'

function ResultWidget({ results }) {
  return (
    <Widget>
      <Widget.Header>
        Resultado
      </Widget.Header>
      <Widget.Content>
        <p>
          Você Acertou
          {' '}
          {
            results.filter((x) => x).length
          }
          {' '}
          Questões
        </p>
        <ul>
          {results.map((result, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <li key={index}>
              {`${index < 9 ? '#0' : '#'}${index + 1} Resultado: `}
              {
              result === true
                ? 'Acertou'
                : 'Errou'
              }
            </li>
          ))}
        </ul>
      </Widget.Content>
    </Widget>
  )
}

function LoadingScreen() {
  return (
    <Widget>
      <Widget.Header>
        Carregando
      </Widget.Header>
      <Widget.Content>
        <Loading />
      </Widget.Content>
    </Widget>
  )
}

function QuestionWidget({
  question,
  totalQuestions,
  questionIndex,
  onSubmit,
  addResult,
}) {
  const questionId = `question__${questionIndex}`
  const [selectedAlternative, setSelectedAlternative] = useState(undefined)
  const [isFormSubmited, setIsFormSubmited] = useState(false)
  const isCorrect = selectedAlternative === question.answer
  const hasAlternativeSelected = selectedAlternative !== undefined

  return (
    <Widget>
      <Widget.Header>
        <BackLinkArrow href="/" />
        <h3>
          {`Pergunta ${questionIndex + 1} de ${totalQuestions}`}
        </h3>
      </Widget.Header>

      <img
        alt="Descrição"
        style={{
          width: '100%',
          height: '150px',
          objectFit: 'cover',
        }}
        src={question.image}
      />
      <Widget.Content>
        <h2>
          {question.title}
        </h2>
        <p>
          {question.description}
        </p>

        <AlternativesForm
          onSubmit={(e) => {
            e.preventDefault()
            setIsFormSubmited(true)
            setTimeout(() => {
              addResult(isCorrect)
              onSubmit()
              setIsFormSubmited(false)
              setSelectedAlternative(undefined)
            }, 3 * 1000)
          }}
        >
          {question.alternatives.map((alternative, index) => {
            const alternativeId = `alternative__${index}`
            const alternativeStatus = isCorrect ? 'SUCCESS' : 'ERROR';
            const isSelected = selectedAlternative === index;

            return (
              <Widget.Topic
                key={alternativeId}
                as="label"
                htmlFor={alternativeId}
                data-selected={isSelected}
                data-status={isFormSubmited && alternativeStatus}
              >
                <input
                  style={{ display: 'none' }}
                  id={alternativeId}
                  name={questionId}
                  type="radio"
                  onChange={() => setSelectedAlternative(index)}
                />
                {alternative}
              </Widget.Topic>
            )
          })}
          <Button type="submit" disabled={!hasAlternativeSelected}>
            Confirmar
          </Button>

          <p>
            {isCorrect && isFormSubmited && 'Você Acertou =)'}
          </p>

          <p>
            {!isCorrect && isFormSubmited && 'Você Errou =('}
          </p>

        </AlternativesForm>

      </Widget.Content>
    </Widget>
  )
}

const screenStates = {
  LOADING: 'LOADING',
  RESULT: 'RESULT',
  QUIZ: 'QUIZ',
}

export default function QuizPage({ externalQuestions, externalBg }) {
  const questions = externalQuestions
  const totalQuestions = questions.length
  const [results, setResults] = useState([])
  const [screenState, setScreenState] = useState(screenStates.LOADING)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const questionIndex = currentQuestion
  const question = questions[questionIndex]

  function addResult(result) {
    setResults([
      ...results,
      result,
    ])
  }

  useEffect(() => {
    setTimeout(() => {
      setScreenState(screenStates.QUIZ)
    }, 1 * 1000)
  }, [])

  function handleSubmit() {
    const nextQuestion = questionIndex + 1
    if (nextQuestion < totalQuestions) {
      setCurrentQuestion(questionIndex + 1)
    } else {
      setScreenState(screenStates.RESULT)
    }
  }

  return (
    <QuizBackground backgroundImage={externalBg}>
      <QuizContainer>

        <QuizLogo />

        {screenState === screenStates.QUIZ && (
          <QuestionWidget
            question={question}
            totalQuestions={totalQuestions}
            questionIndex={questionIndex}
            onSubmit={handleSubmit}
            addResult={addResult}
          />
        )}

        {screenState === screenStates.RESULT && (
          <ResultWidget results={results} />
        )}

        {screenState === screenStates.LOADING && (
          <LoadingScreen />
        )}

        <Footer />

      </QuizContainer>
      <GithubCorner projectUrl="https://github.com/BrunoLucena99" />
    </QuizBackground>
  )
}
