/// <reference types="react-scripts" />

type AudioContextType = typeof AudioContext;

interface Window extends Window {
  webkitAudioContext: audioContextType,
}

type SoundfontType = typeof Soundfont