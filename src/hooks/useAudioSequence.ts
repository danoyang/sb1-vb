import { useState, useCallback, useRef } from 'react';
import { Word } from '../data/types';
import { generateSpeech } from '../utils/tts';

export function useAudioSequence(words: Word[]) {
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const playbackRef = useRef(false);

  const playWord = useCallback(async (word: Word) => {
    try {
      // Play word
      const wordUrl = await generateSpeech(word.spanish);
      const wordAudio = new Audio(wordUrl);
      await wordAudio.play();
      await new Promise(resolve => wordAudio.onended = resolve);
      URL.revokeObjectURL(wordUrl);

      if (!playbackRef.current) return;

      // Add pause
      await new Promise(resolve => setTimeout(resolve, 500));

      if (!playbackRef.current) return;

      // Play phrase
      const phraseUrl = await generateSpeech(word.phrase.text);
      const phraseAudio = new Audio(phraseUrl);
      await phraseAudio.play();
      await new Promise(resolve => phraseAudio.onended = resolve);
      URL.revokeObjectURL(phraseUrl);

      if (!playbackRef.current) return;

      // Add pause between words
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error('Error playing audio:', error);
    }
  }, []);

  const startPlayback = useCallback(async () => {
    if (isPlaying) return;
    
    setIsPlaying(true);
    setIsLoading(true);
    playbackRef.current = true;

    try {
      for (let i = 0; i < words.length; i++) {
        if (!playbackRef.current) break;
        setCurrentIndex(i);
        await playWord(words[i]);
      }
    } finally {
      playbackRef.current = false;
      setIsPlaying(false);
      setCurrentIndex(-1);
      setIsLoading(false);
    }
  }, [words, playWord, isPlaying]);

  const stopPlayback = useCallback(() => {
    playbackRef.current = false;
    setIsPlaying(false);
    setCurrentIndex(-1);
  }, []);

  return {
    currentIndex,
    isPlaying,
    isLoading,
    startPlayback,
    stopPlayback
  };
}