import { useLocalStorage } from '@/hooks/useLocalStorage';

export function useSoundEffects() {
  const [isMuted, setIsMuted] = useLocalStorage('sound_effects_muted', false);
  const [volume, setVolume] = useLocalStorage('sound_effects_volume', 0.7);
  
  const playSound = (url: string) => {
    if (isMuted || typeof window === 'undefined') return;
    
    const audio = new Audio(url);
    audio.volume = volume;
    audio.play().catch(error => {
      console.error('Error playing sound effect:', error);
    });
  };
  
  const toggleMute = () => {
    setIsMuted(!isMuted);
  };
  
  const setEffectsVolume = (newVolume: number) => {
    const clampedVolume = Math.max(0, Math.min(1, newVolume));
    setVolume(clampedVolume);
  };
  
  return {
    isMuted,
    volume,
    playSound,
    toggleMute,
    setVolume: setEffectsVolume
  };
}