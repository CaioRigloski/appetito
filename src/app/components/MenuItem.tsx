'use client'

import styled from "styled-components"
import Item from "../interfaces/item.interface"
import Image from "next/image"
import { motion } from "framer-motion"

const ItemBox = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 3.188rem 1fr;
  align-items: start;
  justify-content: center;
  justify-items: center;
  width: 16.188rem;
  height: 8.5rem;
  background-color: white;
  border-radius: 1.875rem;
  position: relative;
  > h4 {
    font-size: var(--medium-text);
    font-weight: inherit;
    align-self: center;
  }
  > p {
    font-size: var(--small-text);
    margin: 0 1.375rem 0 1.375rem;
  }
  &:nth-child(odd) > div {
    top: calc(180px / 2);
    right: calc(6.375rem * 2);
  }
  &:nth-child(even) > div {
    top: calc(180px / 2);
    left: calc(6.375rem * 2);
  }
`

const ImageWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 6.375rem;
  height: 6.375rem;
  border-radius: 50%;
  overflow: hidden;
  position: absolute;
  box-shadow: 4px 4px 10px var(--black-shadow);
  > img {
    object-fit: contain;
  }
`

export default function MenuItem(props: Item) {
  return (
    <ItemBox
      variants={{
        hidden: { opacity: 0, y: 75 },
        visible: { opacity: 1, y: 0 }
      }}
      initial="hidden"
      whileInView="visible"
      transition={{ duration: 0.5, delay: 0.10}}
    >
      <h4>{props.name}</h4>
      <p>{props.description}</p>
      <ImageWrap>
        <Image src={props.image} alt={props.name + " picture"} width={180} height={180}/>
      </ImageWrap>
    </ItemBox>
  )
}