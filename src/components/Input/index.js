/* eslint-disable no-tabs */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import styled from 'styled-components'
import propTypes from 'prop-types'

const InputBase = styled.input`
	width: 100%;
	padding: 15px;
	font-size: 14px;
	border: 1px solid ${({ theme }) => theme.colors.primary};
	color: ${({ theme }) => theme.colors.contrastText};
	background-color: ${({ theme }) => theme.colors.mainBg};
	border-radius: ${({ theme }) => theme.borderRadius};
	outline: 0;
	margin-bottom: 25px;
`

export default function Input({ placeholder, onChange, ...props }) {
  return (
    <div>
      <InputBase placeholder={placeholder} onChange={onChange} {...props} />
    </div>
  )
}

Input.propTypes = {
  onChange: propTypes.func.isRequired,
  placeholder: propTypes.string.isRequired,
  name: propTypes.string.isRequired,
  value: propTypes.string.isRequired,
}
