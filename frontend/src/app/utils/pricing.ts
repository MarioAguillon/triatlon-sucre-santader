export function isEarlyBirdActive(): boolean {
  // Fecha límite: 30 de abril de 2026 a las 23:59:59 (hora de Colombia -05:00)
  const deadline = new Date('2026-04-30T23:59:59-05:00');
  const now = new Date();
  return now <= deadline;
}

export function isPromo48hActive(): boolean {
  // Promoción 48 horas: hasta el 20 de mayo de 2026 a las 23:59:59 (hora de Colombia -05:00)
  const deadline = new Date('2026-05-20T23:59:59-05:00');
  const now = new Date();
  // Solo activa si early bird ya pasó
  return !isEarlyBirdActive() && now <= deadline;
}
