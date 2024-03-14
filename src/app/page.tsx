'use client'

import styled, { keyframes } from "styled-components"
import Header from "./components/Header"
import Flag from "./components/Flag"
import Image from "next/image"
import homeFood from "../../public/images/homeFood.png"
import Menu from "./components/Menu"
import Booking from "./components/Booking"


const rotateText = keyframes`
  0% {
    transform: rotate(90deg) translate(-373px, -572px);
  }
  100% {
    transform: unset;
  }
`

const rotateImage = keyframes`
  0% {
    transform: rotate(90deg);
  }
  100% {
    transform: unset;
  }
`

const expandBackground = keyframes`
0% {
  width: 0;;
}
100% {
  width: 100%;
}
`

const Section = styled.section`
  display: grid;
  grid-template-columns: max-content 1fr;
  grid-template-rows: 1fr 1fr;
  grid-template-areas:
    "flag black"
    "light light"
  ;
  height: 100vh;
  max-height: 100vh;
  overflow: hidden;
  position: relative;
  & > :nth-child(2) {
    grid-area: black;
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    width: 100%;
    height: calc(100% - 4.688rem);
    align-self: self-end;
    background-color: var(--pallete-black-color-90);
    color: var(--pallete-white-color);
    font-size: var(--large-text);
    animation: ${expandBackground} 0.5s ease-in;
    justify-self: self-end;
    > p {
      position: relative;
      right: 23.625rem;
      animation: ${rotateText} 1s linear;
    }
  }
  &::after {
    grid-area: light;
    content: "";
    width: 100%;
    height: 100%;
    background-color: var(--pallete-light-brown-color);
    animation: ${expandBackground} 0.5s ease-in;
  }
`

const ImageWrap = styled.div`
  position: absolute;
  right: -23.625rem;
  bottom: calc((100vh - 46.813rem) / 2);
  animation: ${rotateImage} 1s linear;
`

export default function Home() {
  return (
    <>
      <Header/>
      <main id="home">
        <Section>
          <Flag width="24.063rem" height="100%" isAnimated style={{gridArea: "flag", alignSelf: "self-end"}}/>
          <div>
            <p>Discover the flavor of a real italian food!</p>
          </div>
          <ImageWrap>
            <Image src={homeFood} alt="Italian Dish" sizes="47.25rem, 46.813rem" priority/>
          </ImageWrap>
        </Section>
        <Menu/>
        <Booking/>
      </main>
    </>
  )
}
