'use client'

import styled from "styled-components"

import brodettoImg from "../../../public/images/brodetto.jpg"
import tortelliniImg from "../../../public/images/tortellini.jpg"
import trofieImg from "../../../public/images/trofieAlPesto.jpg"
import rigatoniImg from "../../../public/images/rigatoniAllaCarbonara.jpg"
import bacallaImg from "../../../public/images/baccalaAllaVicentina.jpg"
import taglialetteImg from "../../../public/images/taglialetteAlRaggu.jpg"
import MenuItem from "./MenuItem"
import Item from "../interfaces/item.interface"
import { useInView } from "framer-motion"
import { useRef } from "react"
import VerticalRedBar from "./VerticalRedBar"


const Section = styled.section`
  display: grid;
  width: 100vw;
  height: 100vh;
  max-height: 100vh;
  position: relative;
  left: 0;
  background-color: var(--pallete-medium-brown-color);
`

const MenuBanner = styled.div`
  display: inline-flex;
  align-items: flex-end;
  justify-content: center;
  position: absolute;
  bottom: 0;
  width: 52.563rem;
  height: 14.5rem;
  background-color: var(--pallete-white-color-90);
  box-shadow: 4px 2px 10px var(--black-shadow);
  top: calc(-14.5rem / 2);
  left: calc((100vw - 52.563rem) / 2);
  z-index: 999;
  > h3 {
    font-size: var(--title);
    font-weight: inherit;
    margin-bottom: 2.813rem;
  }
`

const ItemsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  width: 41.438rem;
  height: 38.75rem;
  background-color: var(--pallete-white-color);
  align-self: center;
  justify-self: center;
  align-items: center;
  justify-items: center;
`



export default function Menu() {
  const ref = useRef<Element | null>(null)
  const isInView = useInView(ref, { once: false })


  const items: Item[] = [
    {
      name: "Brodetto",
      description: "A delicious selection of fish and shellfish cooked in a tomato broth flavored with wine and garlic.",
      image: brodettoImg
    },
    {
      name: "Tortellini",
      description: "A healthy, colourful pasta dish, with melt-in-the-mouth tomatoes",
      image: tortelliniImg
    },
    { 
      name: "Trofie al Pesto",
      description: "Pasta with Pesto, Potatoes and Green Beans",
      image: trofieImg
    },
    {
      name: "Rigatoni alla Carbonara",
      description: "Rigatoni alla Carbonara is a traditional Roman pasta dish prepared with pancetta, eggs, cream, cheese, and fresh black pepper.",
      image: rigatoniImg
    },
    {
      name: "Bacallà alla Vicentina",
      description: "Baccala alla Vicentina is much loved traditional Italian food for Christmas from Northern Italy. Stockfish is battered and fried in olive oil.",
      image: bacallaImg
    },
    {
      name: "Taglialette al Raggu",
      description: "This Tagliatelle al Ragù recipe combines authentic tagliatelle pasta with a homemade Italian ragù that will delight your taste buds!",
      image: taglialetteImg
    }
  ]

  return (
    <Section>
      <MenuBanner>
        <h3>Menu</h3>
      </MenuBanner>
      <VerticalRedBar isInView={isInView}/>
      <ItemsContainer ref={ref}>
        {
          items.map((item, i) => {
            return <MenuItem key={i} name={item.name} description={item.description} image={item.image}/>
          })
        }
      </ItemsContainer>
    </Section>
  )
}