export function withDate(systemPrompt: string): string {
  const now = new Date();
  const date = `${now.getFullYear()}년 ${now.getMonth() + 1}월 ${now.getDate()}일`;
  return `현재 날짜: ${date}\n\n${systemPrompt}`;
}
