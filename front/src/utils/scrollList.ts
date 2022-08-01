import { emptyAlternative } from '@/components/Admin/ChallengesEdit/data'

export default function scrollList(e: any, i: number, array: any, listRef: any) {
  if (!['Enter', 'ArrowUp', 'ArrowDown'].includes(e.key)) return
  e.preventDefault()
  if (e.key === 'Enter') {
    array.insert(i + 1, { ...emptyAlternative })
    setTimeout(() => listRef.current[i + 1].querySelector('input').focus())
  } else {
    const itemRef = listRef.current[i + (e.key === 'ArrowDown' ? 1 : -1)]
    if (itemRef) setTimeout(() => itemRef?.querySelector?.('input')?.focus())
  }
}