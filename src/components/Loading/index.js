/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-tabs */
import React from 'react'
import styled from 'styled-components'
import { css } from '@emotion/core'
import ClipLoader from 'react-spinners/ClipLoader'

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const LoadingBase = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
`

export default function Input() {
  return (
    <LoadingBase>
      <ClipLoader color="#FFF" loading css={override} size={100} />
    </LoadingBase>
  )
}
