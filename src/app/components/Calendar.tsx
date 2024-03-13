'use client'

import styled from "styled-components"
import Week, { weekInfo } from "../interfaces/week.interface"
import { useEffect, useState } from "react"
import bookingDate from "../interfaces/bookingDate.interface"
import Hour from "../interfaces/hour.interface"

const Container = styled.div`
  display: inline-flex;
  width: 54.5rem;
  height: 20.563rem;
  font-family: Montserrat;
  font-weight: 600;
  text-align: center;
`
  
const BookingContainer = styled.div`
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
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 5.063rem max-content max-content;
  width: 100%;
  border-radius: 0 2.813rem 2.813rem 0;
  background-color: white;
  font-size: var(--medium-text);
  > h3 {
    font-size: var(--large-text);
    align-self: end;
  }
  > div {
    display: inline-flex;
    gap: 0.875rem;
    justify-content: center;
    padding: 1.875rem 0 4.813rem 0;
    div:first-child, div:last-child {
      width: 0.886rem;
      align-self: center;
    }
  }
  button {
    cursor: pointer;
    background-color: unset;
    font-family: Montserrat;
    font-weight: 600;
    font-size: var(--medium-text);
  }
  button:disabled {
    cursor: not-allowed;
  }
  > select {
    font-size: 1.25rem;
    font-weight: 600;
    width: max-content;
    border-bottom: 1px solid black;
    align-self: center;
    justify-self: center;
  }
`


export default function Calendar(props: {onClick?: MouseEvent}) {
  const [ month, setMonth ] = useState<string>("")
  const [ week, setWeek ] = useState<Week>({index: 0})
  const [ hours, setHours ] = useState<number[]>([])
  const [ minutes, setMinutes ] = useState<number[]>([0, 30])

  const [ bookingDate, setBookingDate ] = useState<bookingDate>()

  const weekNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]


  useEffect(() => {
      getWeek(0)
  }, [])

  function letBusinessHours() {
    let hours: number[] = []

    for(let i = 1; i <= 12; i++) {
      hours.push(i)
    }

    return hours
  }
  
  function getWeek(index: number) {
    let date = new Date()
    let weekDays: weekInfo[] = []

    // get 7 days
    if(index > 0) {
      date.setDate(date.getDate() + 7 * index)
    }

    // first day must be sunday (0)
    while(date.getDay() > 0) {
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
    setWeek({index: index, dateInfo: weekDays})
    setHours(letBusinessHours())
  }
    
  function hourOptions() {
    const hourDisplayAm: Hour[] | null = []
    const hourDisplayPm: Hour[] | null = []
    let index = 0
    
    minutes.forEach((m) => {
      hours.forEach((h) => {

        // just AM values 8AM to 11:59AM
        if(h >= 8 && h <= 11) {
          const hour: Hour = {hour: h, minute: m}
          hourDisplayAm?.push(hour)
        }

        // just PM values 12PM to 10PM
        if(h >= 1 && h <= 10 || h === 12) {
          const hour: Hour = {hour: h, minute: m}

          if(hour.hour === 10 && hour.minute > 0) {
            return null
          }
          hourDisplayPm?.push(hour)
        }
        index++
      })
    })

    // Ascendent hours sort
    hourDisplayAm.sort((a: Hour, b: Hour) => a.hour-b.hour)
    hourDisplayPm.sort((a: Hour, b: Hour) => a.hour-b.hour)

    // 12 must be the first ones
    hourDisplayPm.forEach((hour, i) => {
      if(hour.hour === 12 ){
        const values = hourDisplayPm.slice(i).reverse()
        hourDisplayPm.splice(i)
        values.map(value => hourDisplayPm.unshift(value))
      }
    })

    return {hourDisplayAm, hourDisplayPm}
  }

  function minusWeekIndex() {
    // week index must be equal or greater than 0
    if(week.index <= 0) {
      return null
    }
    getWeek(week.index - 1)
  }

  function plusWeekIndex() {
    // shows 4 weeks maximum
    if(week.index === 3) {
      return null
    }
    getWeek(week.index + 1)
  }
  
  return (
    <Container>
      <BookingContainer>
        <h2>{bookingDate?.day}</h2>
        <h3>{bookingDate?.dayName}</h3>
        <p>{bookingDate?.hour.map(d => String(d).padStart(2, '0'))}</p>
      </BookingContainer>
      <WeekSelector>
        <h3>{month.toUpperCase()}</h3>
        <div>
          <div>
            { week.index !== 0 && <button type="button" onClick={minusWeekIndex}>&lt;</button> }
          </div>
          { 
            week?.dateInfo?.map((w, i) => {
              return (
                <div key={i}>
                  <p>{weekNames[w.day].toUpperCase().substring(0, 3)}</p>
                  <button type="button" onClick={() => setBookingDate({month: month, dayName: weekNames[w.day], day: w.day, hour: [12, 0]})} disabled={w.date < new Date().getDate() && month.toUpperCase() === new Date().toLocaleString('en-US', { month: 'long' }).toUpperCase()}>{w.date}</button>
                </div>
              )
            })
          }
          <div>
           { week.index !== 3 && <button type="button" onClick={plusWeekIndex}>&gt;</button> }
          </div>
        </div>
        <select>
          { hourOptions().hourDisplayAm.map((h, i) => <option key={i}>{String(h.hour).padStart(2, '0')}:{String(h.minute).padStart(2, '0')} AM</option>) }
          { hourOptions().hourDisplayPm.map((h, i) => <option key={i}>{String(h.hour).padStart(2, '0')}:{String(h.minute).padStart(2, '0')} PM</option>) }
        </select>
      </WeekSelector>
    </Container>
  )
}