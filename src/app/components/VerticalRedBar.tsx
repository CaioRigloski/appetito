import { motion } from "framer-motion"
import styled from "styled-components"

const Bar = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 6.938rem;
  height: 100vh;
  background-color: var(--pallete-red-wine-color);
  box-shadow: 0 5px 10px var(--black-shadow);
`

export default function VerticalRedBar(props: { isInView: boolean }) {
  return (
    <Bar
        variants={{
          shrunked: { height: 0},
          expanded: { height: "100%"}
        }}
        initial="shrunked"
        animate={props.isInView ? "expanded" : "shrunked"}
        transition={{ duration: 1, delay: 0.10}}
      />
  )
}