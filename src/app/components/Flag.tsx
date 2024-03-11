'use client'

import { CSSProperties } from "react"
import styled, { css, keyframes } from "styled-components"

const expandFlag = keyframes`
  0% {
    height: 0;
  }
  100% {
    height: 100%;
  }
`

const FlagWrap = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr;
  width: ${props => props.$width};
  height: ${props => props.$height};
  background-color: var(--green-flag-color);
  :nth-child(2) {
    background-color: var(--pallete-white-color);
  }
  :nth-child(3) {
    background-color: var(--red-flag-color);
  }
  animation: ${props => props.$isAnimated && css`${expandFlag} 0.8s ease-in`}
`

export default function Flag(props: {width: string, height: string, isAnimated?: boolean, style?: CSSProperties}) {
  return (
    <FlagWrap $width={props.width} $height={props.height} $isAnimated={props.isAnimated} style={props.style}>
      <div/>
      <div/>
      <div/>
    </FlagWrap>
  )
}