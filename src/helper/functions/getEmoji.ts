export default function getEmoji(num: number) {
  if (num === 1) {
    return '😢';
  } else if (num <= 3) {
    return '😐';
  } else if (num <= 10) {
    return '🙂';
    // }else if (num < 20) {
    // return "🙂"
  } else {
    return '😄';
  }
}
