import React from 'react'
import { InstrumentContextProvider } from '../../state/instrument'
import { InstrumentSelector } from '../InstrumentSelector'
import { KeyboardWithInstrument } from '../Keyboard'

export const Playground = () => {
  return (
    <InstrumentContextProvider >
      <div className="playground">
        <KeyboardWithInstrument />
        <InstrumentSelector />
      </div>
    </InstrumentContextProvider>
  )
}
