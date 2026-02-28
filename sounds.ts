// Base64 encoded Win95 sounds
const SOUNDS = {
  startup: 'data:audio/wav;base64,UklGRiYAAABXQVZFZm10IBAAAAABAAEAQB8AAAB9AAACABAAZGF0YQIAAAAAAA==',
  click: 'data:audio/wav;base64,UklGRiYAAABXQVZFZm10IBAAAAABAAEAQB8AAAB9AAACABAAZGF0YQIAAAAAAA==',
  error: 'data:audio/wav;base64,UklGRiYAAABXQVZFZm10IBAAAAABAAEAQB8AAAB9AAACABAAZGF0YQIAAAAAAA==',
};

export function playSound(type: 'startup' | 'click' | 'error', audioContext: AudioContext | null) {
  if (!audioContext) return;

  try {
    // Create simple beep tones instead of using base64 audio
    const now = audioContext.currentTime;
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    switch (type) {
      case 'click':
        oscillator.frequency.value = 800;
        gainNode.gain.setValueAtTime(0.1, now);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.05);
        oscillator.start(now);
        oscillator.stop(now + 0.05);
        break;
      case 'error':
        oscillator.frequency.value = 400;
        gainNode.gain.setValueAtTime(0.15, now);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
        oscillator.start(now);
        oscillator.stop(now + 0.1);
        break;
      case 'startup':
        // Startup sound: ascending tones
        const osc1 = audioContext.createOscillator();
        const osc2 = audioContext.createOscillator();
        const gain1 = audioContext.createGain();
        const gain2 = audioContext.createGain();

        osc1.connect(gain1);
        osc2.connect(gain2);
        gain1.connect(audioContext.destination);
        gain2.connect(audioContext.destination);

        osc1.frequency.value = 523;
        osc2.frequency.value = 659;

        gain1.gain.setValueAtTime(0.1, now);
        gain1.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
        gain2.gain.setValueAtTime(0.1, now + 0.15);
        gain2.gain.exponentialRampToValueAtTime(0.01, now + 0.45);

        osc1.start(now);
        osc1.stop(now + 0.3);
        osc2.start(now + 0.15);
        osc2.stop(now + 0.45);
        break;
    }
  } catch (e) {
    console.error('Error playing sound:', e);
  }
}
