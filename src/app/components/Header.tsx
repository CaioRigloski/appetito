'use client'

import styled from "styled-components"
import Flag from "./Flag"

const HeaderWrap = styled.header`
  display: grid;
  grid-template-rows: auto auto;
  grid-template-columns: max-content;
  justify-items: center;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 999;
`

const LogoWrap = styled.div`
  display: inline-flex;
  width: 100vw;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  height: 4.688rem;
  background-color: var(--pallete-black-color-90);
`

const Logo = styled.h1`
  font-size: 3rem;
  color: white;
  font-weight: inherit;
  height: 100%;
`

const Menu = styled.menu`
  display: inline-flex;
  height: 1.875rem;
  text-align: center;
  align-items: center;
  color: black;
  > a {
    position: relative;
  }
  > a > div {
    width: 7.313rem;
    height: 100%;
    list-style: none;
    border: none;
    background-color: white;
    font-family: inherit;
    font-size: var(--medium-text);
    text-align: center;
  }
  > a:first-child::after {
    content: "";
    position: absolute;
    width: 1px;
    height: 1rem;
    background-color: var(--pallete-white-color);
    bottom: 0.4rem;
    right: 0;
  }
  > a:last-child::before {
    content: "";
    position: absolute;
    width: 1px;
    height: 1rem;
    background-color: var(--pallete-white-color);
    bottom: 0.4rem;
    left: 0;
  }
`

export default function Header() {
  return (
    <HeaderWrap>
      <LogoWrap>
        <Logo>Appetito</Logo>
        <Flag width="5.25rem" height="0.533rem"/>
      </LogoWrap>
      <Menu>
        <a href="home"><div>home</div></a>
        <a href="menu"><div>menu</div></a>
        <a href="booking"><div>booking</div></a>
      </Menu>
    </HeaderWrap>
  )
}