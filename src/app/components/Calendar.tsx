'use client'

import styled from "styled-components"
import Week, { weekInfo } from "../interfaces/week.interface"
import { ChangeEvent, useEffect, useState } from "react"
import BookingDate from "../interfaces/bookingDate.interface"
import Hour from "../interfaces/hour.interface"

const Container = styled.div`
  display: inline-flex;
  width: 54.5rem;
  height: 20.563rem;
  font-family: Montserrat;
  font-weight: 600;
  text-align: center;
  align-self: self-end;
`
  
const BookingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 16.063rem;
  height: 100%;
  border-radius: 2.813rem 0 0 2.813rem;
  background-color: var(--green-flag-color);
  color: white;
  font-size: var(--medium-text);
  font-weight: 400;
  h1, h2, h3 {
    font-weight: 400;
  }
  > h1 {
    font-size: var(--large-text);
    margin-top: 3rem;
  }
  > h2 {
    font-size: 6rem;
    margin: -1rem;
  }
  > h3 {
    font-size: var(--medium-text);
  }
  > p {
    margin-top: 2.313rem;
  }
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
    width: 2.688rem;
    height: 2.688rem;
    border-radius: 50%;
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
  .upcoming-month {
    background-color: var(--pallete-white-color);
    color: black;
  }
  .selected {
    background-color: var(--green-flag-color);
    color: white;
  }
`

export default function Calendar(props: {onClick?: MouseEvent}) {
  const [ month, setMonth ] = useState<string>(getMonth())
  const [ week, setWeek ] = useState<Week>(getWeek(0))
  const [ hours, setHours ] = useState<number[]>(getBusinessHours())
  const [ minutes, setMinutes ] = useState<number[]>([0, 30])

  const weekNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  const [ bookingDate, setBookingDate ] = useState<BookingDate>(getDefaultBookingDate())


  function getMonth() {
    const date = new Date()
    return date.toLocaleString('en-US', { month: 'long' })
  }

  function getWeek(index: number) {
    const date = new Date()
    let weekDays: weekInfo[] = []
    
    // Get 7 days and set current month displayed.
    if(index > 0) {
      date.setDate(date.getDate() + 7 * index)
      setMonth(date.toLocaleString('en-US', { month: 'long' }))
    }

    // First day must be sunday (0).
    while(date.getDay() > 0) {
      date.setDate(date.getDate() - 1)
    }

    for(let i = 0; i < 7; i++) {
      weekDays.push({
        day: date.getDay(),
        date: date.getDate(),
        monthNumber: date.getMonth(),
        monthName: date.toLocaleDateString('en-US', { month: 'long' })
      })
      date.setDate(date.getDate() + 1); 
    }

    return {index: index, dateInfo: weekDays}
  }

  function getBusinessHours() {
    let hours: number[] = []

    // Range numbers for 8AM to 10PM.
    for(let i = 1; i <= 12; i++) {
      hours.push(i)
    }

    return hours
  }
    
  function getDefaultBookingDate() {
    const defaultBookingDate: BookingDate = {
      month: new Date().toLocaleString('en-US', { month: 'long' }),
      day: new Date().getDate(),
      dayName: weekNames[new Date().getDay()],
      hour: hourOptions().hourDisplayAm.length > 0 ? hourOptions().hourDisplayAm[0] : hourOptions().hourDisplayPm[0],
      period: hourOptions().hourDisplayAm.length > 0 ? "AM" : "PM"
    }

    return defaultBookingDate
  }

  function hourOptions() {
    const hourDisplayAm: Hour[] | null = []
    const hourDisplayPm: Hour[] | null = []
    let index = 0
    
    minutes.forEach((m) => {
      hours.forEach((h) => {

        // Just AM values 8AM to 11:59AM.
        if(h >= 8 && h <= 11) {
          const hour: Hour = {hour: h, minute: m}
          hourDisplayAm?.push(hour)
        }

        // Just PM values 12PM to 10PM.
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

    // Ascendent hours sort.
    hourDisplayAm.sort((a: Hour, b: Hour) => a.hour-b.hour)
    hourDisplayPm.sort((a: Hour, b: Hour) => a.hour-b.hour)

    // 12 must be the first ones.
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
    // Week index must be equal or greater than 0.
    if(week.index <= 0) {
      return null
    }
    setWeek(getWeek(week.index - 1))
  }

  function plusWeekIndex() {
    // Shows 4 weeks maximum.
    if(week.index === 3) {
      return null
    }
    setWeek(getWeek(week.index + 1))
  }
  
  function formatHour(e: ChangeEvent<HTMLSelectElement>) {
    // Split value into 3 = hour, minutes and period. Indexes 0, 1 , 2 respectively.
    const values = e.target.value.split(/[: ]/)
    setBookingDate(prevProps => ({
      ...prevProps,
      hour: {hour: Number(values[0]), minute: Number(values[1])},
      period: values[2] === "AM" ? "AM" : "PM"
    }))
  }

  function checkButtonClassNames(week: weekInfo) {
    let classes: string = ""

    if(week.date === bookingDate.day && week.monthName === bookingDate.month) {
      classes = "selected"
    }

    if(week.monthNumber && week.monthNumber > new Date().getMonth()) {
      classes = classes + " upcoming-month"
    }

    return classes
  }
 
  return (
    <Container>
      <BookingContainer>
        <h1>{bookingDate?.month?.toUpperCase()}</h1>
        <h2>{bookingDate?.day}</h2>
        <h3>{bookingDate?.dayName?.toUpperCase()}</h3>
        <p>{String(bookingDate?.hour?.hour).padStart(2, '0')}:{String(bookingDate?.hour?.minute).padStart(2, '0')} {bookingDate?.period}</p>
      </BookingContainer>
      <WeekSelector>
        <h3>{month?.toUpperCase()}</h3>
        <div>
          <div>
            { week.index !== 0 && <button type="button" onClick={minusWeekIndex}>&lt;</button> }
          </div>
          { 
            week?.dateInfo?.map((w, i) => {
              return (
                <div key={i}>
                  <p>{weekNames[w.day].toUpperCase().substring(0, 3)}</p>
                  <button type="button"
                    className={checkButtonClassNames(w)}
                    onClick={
                      // Check if day is less than current day in the month and disable it.
                      () => setBookingDate(prevProps => ({...prevProps, month: w.monthName, dayName: weekNames[w.day], day: w.date}))} disabled={w.date < new Date().getDate() && w.monthNumber === new Date().getMonth()}>{w.date}</button>
                </div>
              )
            })
          }
          <div>
           { week.index !== 3 && <button type="button" onClick={plusWeekIndex}>&gt;</button> }
          </div>
        </div>
        <select onChange={e => formatHour(e)}>
          { hourOptions().hourDisplayAm.map((h, i) => <option key={i}>{String(h.hour).padStart(2, '0')}:{String(h.minute).padStart(2, '0')} AM</option>) }
          { hourOptions().hourDisplayPm.map((h, i) => <option key={i}>{String(h.hour).padStart(2, '0')}:{String(h.minute).padStart(2, '0')} PM</option>) }
        </select>
      </WeekSelector>
    </Container>
  )
}