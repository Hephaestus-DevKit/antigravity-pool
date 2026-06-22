export function statusColor(status: string) {
  switch (status) {
    case 'active':
      return '#10b981';
    case 'exhausted':
      return '#f59e0b';
    case 'invalid':
      return '#ef4444';
    default:
      return '#9ca3af';
  }
}

export function formatDate(value: string | null | undefined) {
  if (!value) return 'Unknown';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'Unknown';

  return new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}
