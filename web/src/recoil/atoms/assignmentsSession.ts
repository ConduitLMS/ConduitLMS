import { atom, selector } from 'recoil'

const assignmentsSessionAtom = atom({
  default: null,
  key: 'assignmentsSession',
})

const assignmentsListFilterState = atom({
  key: 'AssignmentsListFilter',
  default: 'Show All',
})

const filteredAssingmentsListState = selector({
  key: 'filteredAssingmentsState',
  get: ({ get }) => {
    const filter = get(assignmentsListFilterState)
    const list = get(assignmentsSessionAtom)

    switch (filter) {
      case 'Show Completed':
        return list.filter((item) => (item.progress = 100))
      case 'Show Uncompleted':
        return list.filter((item) => item.progress < 100)
      default:
        return list
    }
  },
})

export default {
  assignmentsSessionAtom,
  assignmentsListFilterState,
  filteredAssingmentsListState,
}
