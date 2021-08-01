import { useAudioContext } from '../AudioContextProvider';
import { useSoundfont } from '../../adapters/Soundfont';
import { useMount } from "../../utils/useMount";
import { Keyboard } from '../Keyboard';
import { useInstrument } from '../../state/instrument';
import { ReactElement, useEffect } from 'react';
import { SoundfontProvider, ProvidedProps } from '../../adapters/Soundfont/SoundfontProvider';
import { withInstrument } from '../../adapters/Soundfont/WithInstrument';

// export const KeyboardWithInstrument = () => {
//   const AudioContext = useAudioContext()!;
//   const { instrument } = useInstrument();
//   // comment this line if we want to use pattern React Props.
//   const { loading, current, play, stop, load } = useSoundfont({ AudioContext });

//   useEffect(() => {
//     if (!loading && instrument !== current) load(instrument); 
//   }, [load, loading, current, instrument]);

//   return (
//     // <Keyboard loading={loading} play={play} stop={stop} />
//     <SoundfontProvider
//       AudioContext={AudioContext}
//       instrument={instrument}
//       render={(props) => <Keyboard {...props} />}
//     />
//   )
// }

/**
 * HOC component can be used to enhance our keyboard component to connect it to Soundfont.
 */
const WrappedKeyboard = withInstrument(Keyboard);

export const KeyboardWithInstrument = () => {
  const AudioContext = useAudioContext()!
  const { instrument } = useInstrument()

  return ( 
    <WrappedKeyboard AudioContext={AudioContext} instrument={instrument} />
  )
}