import React, { useState } from 'react'
import { useRouter } from 'next/router'

import Input from '../src/components/Input'
import Widget from '../src/components/Widget'
import Footer from '../src/components/Footer'
import GithubCorner from '../src/components/GithubCorner'
import Button from '../src/components/Button'
import QuizBackground from '../src/components/QuizBackground'
import QuizContainer from '../src/components/QuizContainer'
import QuizLogo from '../src/components/QuizLogo'
import db from '../db.json'

export default function Home() {
  const router = useRouter()

  const [name, setName] = useState('')

  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <QuizLogo />
        <Widget>
          <Widget.Header>
            <h1>Breaking Bad</h1>
          </Widget.Header>
          <Widget.Content>
            <form onSubmit={(event) => {
              event.preventDefault()
              router.push(`quiz/?name=${name}`)
            }}
            >
              <Input
                name="nomeDoUsuario"
                placeholder="Insira seu nome aqui"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
              <Button type="submit" disabled={name.length === 0}>
                {`Jogar ${name}`}
              </Button>
            </form>
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
      <GithubCorner projectUrl="https://github.com/BrunoLucena99" />
    </QuizBackground>
  )
}
