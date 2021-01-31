import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'
import Input from '../src/components/Input'
import Widget from '../src/components/Widget'
import Footer from '../src/components/Footer'
import GithubCorner from '../src/components/GithubCorner'
import Button from '../src/components/Button'
import QuizBackground from '../src/components/QuizBackground'
import QuizContainer from '../src/components/QuizContainer'
import QuizLogo from '../src/components/QuizLogo'
import db from '../db.json'
import Link from '../src/components/Link'

export default function Home() {
  const router = useRouter()

  const [name, setName] = useState('')

  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <QuizLogo />
        <Widget
          as={motion.section}
          variants={{
            show: { opacity: 1, y: '0' },
            hidden: { opacity: 0, y: '100%' },
          }}
          initial="hidden"
          animate="show"
          transition={{ duration: 0.5, delay: 0 }}
        >
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

        <Widget
          as={motion.section}
          variants={{
            show: { opacity: 1 },
            hidden: { opacity: 0 },
          }}
          initial="hidden"
          animate="show"
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Widget.Content>
            <h1>Quizes de Galera</h1>
            <ul>
              {db.external.map((link) => {
                const [projectName, githubUser] = link
                  .replace(/\//g, '')
                  .replace('https:', '')
                  .replace('.vercel.app', '')
                  .split('.')
                return (
                  <li key={link}>
                    <Widget.Topic
                      as={Link}
                      href={`/quiz/${projectName}___${githubUser}`}
                    >
                      {`${githubUser}/${projectName}`}
                    </Widget.Topic>
                  </li>
                )
              })}
            </ul>
          </Widget.Content>
        </Widget>

        <Footer
          as={motion.footer}
          variants={{
            show: { opacity: 1 },
            hidden: { opacity: 0 },
          }}
          initial="hidden"
          animate="show"
          transition={{ duration: 0.5, delay: 1 }}
        />
      </QuizContainer>
      <GithubCorner projectUrl="https://github.com/BrunoLucena99" />
    </QuizBackground>
  )
}
