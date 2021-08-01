import { FunctionComponent, ReactElement, useCallback, useRef, useState, useEffect } from "react";
import Soundfont, { InstrumentName, Player } from "soundfont-player"
import { MidiValue } from "../../domain/note";
import { AudioNodesRegistry, DEFAULT_INSTRUMENT } from "../../domain/sounds";
import { Optional } from "../../domain/types";

/**
 * you can use this file if you want to use React Pattern like Render Props.
 * and change the file code of /Keyboard/WithInstrument.tsx
 *  render (
 *    <SoundfontProvider
        AudioContext={AudioContext}
        instrument={instrument}
        render={(props) => <Keyboard {...props} />}
      />
 *  )

    remove effect 
 */

export type ProvidedProps = {
  loading: boolean;
  play(note: MidiValue): Promise<void>;
  stop(note: MidiValue): Promise<void>
}

type ProviderProps = {
  instrument?: InstrumentName;
  AudioContext: AudioContextType;
  render(props: ProvidedProps): ReactElement
}

export const SoundfontProvider: FunctionComponent<ProviderProps> = ({ AudioContext, instrument, render}) => {
  let activeNodes: AudioNodesRegistry = {};
  const [current, setCurrent] = useState<Optional<InstrumentName>> (null);
  const [loading, setLoading] = useState<boolean>(false);
  const [player, setPlayer] = useState<Optional<Player>>(null);
  const audio = useRef(new AudioContext());
  
  const loadInstrument = useCallback(() => load(instrument), [
    instrument
  ])
  
  useEffect(() => {
    if (!loading && instrument !== current) loadInstrument()
  }, [loadInstrument, loading, instrument, current])

  async function load(
    instrument: InstrumentName = DEFAULT_INSTRUMENT
  ) {
    setLoading(true);
    const player = await Soundfont.instrument(
      audio.current,
      instrument
    )

    setLoading(false);
    setCurrent(instrument);
    setPlayer(player);
  }

  async function resume() {
    /** This function checks what state audio is in right now. If it is suspended¹⁰⁸ that means that AudioContext is halting audio    
     * already hardware access and reducing CPU/battery usage in the process.
     */
    return audio.current.state === "suspended" 
      ? await audio.current.resume()
      : Promise.resolve();
  }

  async function play(note: MidiValue) {
    await resume();
    if (!player) return;

    const node = player.play(note.toString());
    activeNodes = {
      ...activeNodes,
      [note]: node
    }
  }

  async function stop(note: MidiValue) {
    await resume();
    if (!activeNodes[note]) return;

    activeNodes[note]!.stop();
    activeNodes = {
      ...activeNodes,
      [note]: null
    }
  }
  
  return render({
    loading,
    play,
    stop
  })
}