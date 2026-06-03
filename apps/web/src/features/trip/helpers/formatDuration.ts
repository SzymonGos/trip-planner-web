export const formatDuration = (duration: string | undefined): string => {
  if (!duration) return '';

  const hoursMatch = duration.match(/(\d+)\s*hours?/i);
  const minutesMatch = duration.match(/(\d+)\s*mins?/i);

  const hours = hoursMatch ? parseInt(hoursMatch[1], 10) : 0;
  const minutes = minutesMatch ? parseInt(minutesMatch[1], 10) : 0;

  if (hours > 0) {
    return `${hours}h${minutes > 0 ? ` ${minutes}m` : ''}`;
  } else {
    return `${minutes}m`;
  }
};
