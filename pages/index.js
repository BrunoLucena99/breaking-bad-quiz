import styled from 'styled-components'
import Widget from '../src/components/Widget'
import Footer from '../src/components/Footer'
import GithubCorner from '../src/components/GithubCorner'
import QuizBackground from '../src/components/QuizBackground'
import db from '../db.json'

export const QuizContainer = styled.div`
  width: 100%;
  max-width: 350px;
  padding-top: 45px;
  margin: auto 10%;
  @media screen and (max-width: 500px) {
    margin: auto;
    padding: 15px;
  }
`

export default function Home() {
  return (
    <QuizBackground backgroundImage={db.bg} >
      <QuizContainer>
        <Widget>
          <Widget.Header>
              <h1>Breaking Bad</h1>
            </Widget.Header>
            <Widget.Content>
              <p>Lorem ipsum dolor sit amet</p>
            </Widget.Content>
        </Widget>

        <Widget>
          <Widget.Content>
            <h1>Quizes de Galera</h1>
            <p>Lorem ipsum dolor sit amet</p>
          </Widget.Content>
        </Widget>

        <Footer />
      </QuizContainer>
      <GithubCorner projectUrl={"https://github.com/BrunoLucena99"} />
    </QuizBackground>
  )
}
