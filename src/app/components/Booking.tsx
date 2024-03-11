import styled from "styled-components"
import VerticalRedBar from "./VerticalRedBar"
import { useInView } from "framer-motion"
import { useRef } from "react"
import Calendar from "./Calendar"


const Section = styled.section`
  display: grid;
  grid-template-columns: 10.688rem 1fr;
  grid-template-rows: 1fr;
  position: relative;
  height: 100vh;
  background-color: var(--pallete-light-brown-color);
  align-items: center;
  justify-items: center;
`
const VerticalBlackBar = styled.div`
  width: 3.75rem;  
  height: 100%;
  background-color: var(--pallete-black-color-90);
  justify-self: end;
`

export default function Booking() {
  const ref = useRef<Element | null>(null)
  const isInView = useInView(ref, { once: false })
  

  return (
    <Section ref={ref}>
      <VerticalRedBar isInView={isInView}/>
      <VerticalBlackBar/>
      <Calendar/>
    </Section>
  )
}