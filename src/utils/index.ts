export const msToHms = (ms: number): string => {
  const duration = Math.abs(ms);
  const milliseconds = parseInt(String((duration % 1000)));
  const seconds = parseInt(String((duration / 1000) % 60));
  const minutes = parseInt(String((duration / (1000 * 60)) % 60));
  const hours = parseInt(String((duration / (1000 * 60 * 60)) % 24));

  const hoursStr = (hours < 10) ? "0" + hours : hours;
  const minutesStr = (minutes < 10) ? "0" + minutes : minutes;
  const secondsStr = (seconds < 10) ? "0" + seconds : seconds;
  let millisecondsStr = milliseconds.toString();
  if (milliseconds < 100) {
    millisecondsStr = "0" + milliseconds;
  }
  if (milliseconds < 10) {
    millisecondsStr = "00" + milliseconds;
  }
  if(milliseconds === 0) {
    millisecondsStr = "000";
  }
  return hoursStr + ":" + minutesStr + ":" + secondsStr + "." + millisecondsStr;
}

export const hmsToMs = (hms: string): number => {
  const split = hms.split(':');
  return 1000 * (3600 * Number(split[0]) + 60 * Number(split[1]) + Number(split[2]));
}
