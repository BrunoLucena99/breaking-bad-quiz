/* eslint-disable react/prop-types */
import React from 'react';
import { ThemeProvider } from 'styled-components';
import QuizPage from '../../src/Screens/Quiz';

export default function QuizDaGalera({ externalDb }) {
  return (
    <ThemeProvider theme={externalDb.theme}>
      <QuizPage
        externalQuestions={externalDb.questions}
        externalBg={externalDb.bg}
      />
    </ThemeProvider>
  )
}

export async function getServerSideProps(context) {
  const [projectName, githubUser] = context.query.id.split('___');

  try {
    const externalDb = await fetch(`https://${projectName}.${githubUser}.vercel.app/api/db`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Falha em pegar os dados');
      })
      .then((responseParsed) => responseParsed)
      // .catch((err) => {
      //   // console.error(err);
      // });

    // console.log('externalDb', externalDb);
    // console.log('Infos que o Next da para nós', context.query.id);
    return {
      props: {
        externalDb,
      },
    };
  } catch (err) {
    throw new Error(err);
  }
}
