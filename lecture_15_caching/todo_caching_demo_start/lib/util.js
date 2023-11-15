export function calculateCompleted(items) {
  if (items.length === 0) {
    return 0;
  }

  const completed = items.filter((i) => i.completed);
  return completed.length / items.length;
}
