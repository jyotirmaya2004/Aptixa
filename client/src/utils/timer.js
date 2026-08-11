export const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

export const getTimerColor = (remainingSeconds, totalSeconds) => {
  const percentage = (remainingSeconds / totalSeconds) * 100;
  if (percentage <= 20) return '#ef4444'; // Red alert
  if (percentage <= 50) return '#f59e0b'; // Orange warning
  return '#10b981'; // Green normal
};
