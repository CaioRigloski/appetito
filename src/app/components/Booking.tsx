import styled from "styled-components"
import VerticalRedBar from "./VerticalRedBar"
import { useInView } from "framer-motion"
import { useRef } from "react"
import Calendar from "./Calendar"


const Section = styled.section`
  display: grid;
  grid-template-columns: 100vw;
  grid-template-rows: 1fr 1fr;
  position: relative;
  height: 100vh;
  background-color: var(--pallete-light-brown-color);
  align-items: center;
  justify-items: center;
  position: relative;
`
const VerticalBlackBar = styled.div`
  width: 3.75rem;  
  height: 100%;
  background-color: var(--pallete-black-color-90);
  justify-self: end;
  position: absolute;
  top: 0;
  left: 6.938rem;
`

const Form = styled.form`
  display: grid;
  grid-template-columns: max-content 30.688rem;
  grid-template-rows: 1fr 1fr 1fr 1fr;
  grid-template-areas:
  "nameLabel name"
  "emailLabel email"
  "phoneLabel phone"
  "btn btn"
  ;
  gap: 1.688rem;
  > label {
    font-size: var(--large-text);
  }
  > input {
    height: 2.188rem;
  }
  > button {
    grid-area: btn;
    width: 7.313rem;
    height: 100%;
    list-style: none;
    border: none;
    background-color: var(--green-flag-color);
    font-family: inherit;
    font-size: var(--medium-text);
    text-align: center;
    cursor: pointer;
    justify-self: center;
    color: white;
  }
  > button:hover {
    transition: 0.5s;
    transform: scale(95%);
  }
`

export default function Booking() {
  const ref = useRef<Element | null>(null)
  const isInView = useInView(ref, { once: false })
  

  return (
    <Section ref={ref} id="booking">
      <VerticalRedBar isInView={isInView}/>
      <VerticalBlackBar/>
      <Calendar/>
      <Form>
        <label htmlFor="name">name</label>
        <input id="name" type="text"/>
        <label htmlFor="email">email</label>
        <input id="email" type="email"/>
        <label htmlFor="phone">phone</label>
        <input id="phone" type="tel"/>
        <button type="submit">send</button>
      </Form>
    </Section>
  )
}