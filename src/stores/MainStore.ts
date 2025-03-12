import { defineStore } from 'pinia'
import { useFetchStore } from './SneakerStore'
import { Item } from './SneakerStore'

export const useMainStore = defineStore('main', {
  state: () => ({
    filter: 'name' as 'name' | 'priceUp' | 'priceDown',
    searchQuery: '' as string,
  }),
  getters: {
    favoriteAddedItems: (): Item[] => {
      const fetchStore = useFetchStore()
      return fetchStore.favoriteItems
        .map((favoriteItem) => {
          const item = fetchStore.items.find((item) => item.id === favoriteItem.parentId)
          return item || null
        })
        .filter((item) => item !== null) // тут жаловался типо find может выдать undefind пришлось дописывать этот фильтр и условие
    },
    searchedItems(): Item[] {
      const fetchStore = useFetchStore()
      let result = fetchStore.items.filter((item) =>
        item.title.toLowerCase().includes(this.searchQuery.toLowerCase()),
      )
      switch (
        this.filter //из условия получаем ответ и сравниваем его с case, default - не совпало ни одно
      ) {
        case 'priceUp':
          return result.sort((a, b) => a.price - b.price)
        case 'priceDown':
          return result.sort((a, b) => b.price - a.price)
        case 'name':
          return result.sort((a, b) => a.title.localeCompare(b.title))
        default:
          return result
      }
    },
  },
})
