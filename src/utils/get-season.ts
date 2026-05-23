type Season = 'verão' | 'outono' | 'inverno' | 'primavera';

export function getSeason(date: Date): Season {
  const month = date.getMonth() + 1;
  const day = date.getDate();

  if ((month === 12 && day >= 21) || (month <= 2) || (month === 3 && day < 20)) {
    return 'verão';
  } else if ((month === 3 && day >= 20) || (month <= 5) || (month === 6 && day < 21)) {
    return 'outono';
  } else if ((month === 6 && day >= 21) || (month <= 8) || (month === 9 && day < 23)) {
    return 'inverno';
  } else {
    return 'primavera';
  }
}
