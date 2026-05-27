"use client"

import { useMemo, useRef } from "react"
import { motion } from "framer-motion"

type SpinningNumberProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  value: number
  animationDuration?: number
}

export const SpinningNumber = ({
  value,
  animationDuration = 500,
  className,
  ...props
}: SpinningNumberProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const splitted = useMemo(() => value.toString().split(""), [value])
  const lineHeight = 24

  return (
    <div className={className} {...props}>
      <div className="flex items-center justify-center">
        <div
          ref={ref}
          className="relative flex items-center justify-center overflow-hidden"
          style={{
            width: splitted.length * lineHeight - 15,
            height: lineHeight,
          }}
        >
          {splitted.map((num, i) => (
            <SingleNumber
              key={i}
              index={i}
              number={Number(num)}
              lineHeight={lineHeight}
              animationDuration={animationDuration}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

type SingleNumberProps = {
  number: number
  index: number
  lineHeight: number
  animationDuration: number
}

export const SingleNumber = ({
  number,
  index,
  lineHeight,
  animationDuration,
}: SingleNumberProps) => {
  const nums = useMemo(() => [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], [])
  const y = -1 * nums.indexOf(number) * lineHeight

  return (
    <motion.div
      data-testid="single-number"
      className="absolute flex select-none flex-col"
      style={{ left: index * lineHeight }}
      animate={{ top: y }}
      transition={{ ease: "backInOut", duration: animationDuration / 1000 }}
    >
      {nums.map((digit) => (
        <span data-testid="single-rotation-number" key={digit}>
          {digit}
        </span>
      ))}
    </motion.div>
  )
}
