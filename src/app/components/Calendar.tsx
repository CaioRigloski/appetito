'use client'

import styled from "styled-components"
import Week from "../interfaces/week.interface"
import { useEffect, useState } from "react"

const Container = styled.div`
  display: inline-flex;
  width: 54.5rem;
  height: 20.563rem;
  font-family: Montserrat;
  font-weight: 600;
  text-align: center;
`
  
const BookingDate = styled.div`
  Display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 16.063rem;
  height: 100%;
  border-radius: 2.813rem 0 0 2.813rem;
  background-color: var(--green-flag-color);
`
  
const WeekSelector = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-radius: 0 2.813rem 2.813rem 0;
  background-color: white;
  font-size: var(--medium-text);
  > h3 {
    font-size: var(--large-text);
  }
  > div {
    display: inline-flex;
    gap: 0.875rem;
    justify-content: center;
    
  }
  button {
    cursor: pointer;
    background-color: unset;
    font-family: Montserrat;
    font-weight: 600;
    font-size: var(--medium-text);
  }
`

export default function Calendar(props: {onClick?: MouseEvent}) {
  const weekNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  const [ daysOfMonth, setDaysOfMonth ] = useState<number>(0)
  const [ month, setMonth ] = useState<string>("")
  const [ week, setWeek ] = useState<Week[]>([])

  function getDaysofMonth() {
    const date = new Date()
    const days = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()

    return days
  }

  function getWeek(index: number) {
    let date = new Date()
    let weekDays: Week[] = []

    if(index > 0) {
      date.setDate(date.getDate() + 7 * index)
    }

    if(date.getDate() > 0) {
      date.setDate(date.getDate() - 1)
    }

    for(let i = 0; i < 7; i++) {
      weekDays.push({
        day: date.getDay(),
        date: date.getDate()
      })
      date.setDate(date.getDate() + 1); 
    }
    
    setMonth(date.toLocaleString('en-US', { month: 'long' }))

    return weekDays
  }

  useEffect(() => {
    setWeek(getWeek(0))
  }, [])


  return (
    <Container>
      <BookingDate>

      </BookingDate>
      <WeekSelector>
        <h3>{month.toUpperCase()}</h3>
        <div>
          { 
            week.map((w, i) => {
              return (
                <div key={i}>
                  <p>{weekNames[w.day].toUpperCase().substring(0, 3)}</p>
                  <button type="button" disabled={w.date < new Date().getDate() && month.toUpperCase() === new Date().toLocaleString('en-US', { month: 'long' }).toUpperCase()}>{w.date}</button>
                </div>
              )
            })
          }
        </div>
        <input type="time"></input>
      </WeekSelector>
    </Container>
  )
}