import React, { useState } from 'react';
import { Volume2, Loader2 } from 'lucide-react';
import { generateSpeech } from '../utils/tts';

interface AudioButtonProps {
  text: string;
}

export function AudioButton({ text }: AudioButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    if (isLoading) return;
    
    try {
      setIsLoading(true);
      const audioUrl = await generateSpeech(text);
      const audio = new Audio(audioUrl);
      
      await audio.play();
      
      // Cleanup after playback
      audio.onended = () => {
        URL.revokeObjectURL(audioUrl);
      };
    } catch (error) {
      console.error('Error playing audio:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      className="flex items-center justify-center w-10 h-10 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:bg-indigo-400"
      aria-label="Play audio"
    >
      {isLoading ? <Loader2 size={20} className="animate-spin" /> : <Volume2 size={20} />}
    </button>
  );
}