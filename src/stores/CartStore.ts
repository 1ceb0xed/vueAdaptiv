import { defineStore } from 'pinia'
import axios from 'axios'
import { useFetchStore } from './SneakerStore'
import { Item } from './SneakerStore'

export const useCartStore = defineStore('Cart', {
  state: () => ({
    cartOpen: false as boolean,
    isMakeOrder: false as boolean,
  }),
  getters: {
    cartAddedItems(): Item[] {
      const fetchStore = useFetchStore()
      return fetchStore.addedItems
        .map((addeditem) => {
          const item = fetchStore.items.find((Item) => Item.id === addeditem.parentId)
          return item || null
        })
        .filter((item) => item !== null)
    }, // тут жаловался типо find может выдать undefind пришлось дописывать этот фильтр и условие
    totalSummCart(): number {
      const fetchStore = useFetchStore()
      return fetchStore.items
        .filter((item) => item.isAdded)
        .reduce((sum, item) => sum + item.price, 0)
    },
  },
  actions: {
    openCart(): void {
      this.cartOpen = true
      document.body.classList.toggle('overflow-hidden', true)
    },
    closeCart(): void {
      this.cartOpen = false
      this.isMakeOrder = false
      document.body.classList.toggle('overflow-hidden', false)
    },
    async removeFromCart(event: MouseEvent): Promise<void> {
      const fetchStore = useFetchStore()
      try {
        const target = event.target as HTMLElement
        const DeleteId = Number(target.dataset.parentId)
        await axios.delete(`https://a3ca5502346e0c49.mokky.dev/cartadded/${target.dataset.id}`)
        const ItemFetchId = fetchStore.items.find((obj) => obj.id === DeleteId)
        if (ItemFetchId) {
          ItemFetchId.isAdded = false
        }
        fetchStore.fetchAdded()
      } catch (err) {
        console.log(err)
      }
    },
    async makeOrder(): Promise<void> {
      const fetchStore = useFetchStore()
      fetchStore.addedItems.forEach(async (addedItem) => {
        const itemsId = fetchStore.items.find((Item) => Item.id === addedItem.parentId)
        if (itemsId) {
          itemsId.isAdded = false
        }
      })
      const itemsToDelete = [...fetchStore.addedItems]
      fetchStore.addedItems.splice(0, fetchStore.addedItems.length)
      this.isMakeOrder = true
      try {
        for (const addedItem of itemsToDelete) {
          try {
            await axios.delete(`https://a3ca5502346e0c49.mokky.dev/cartadded/${addedItem.id}`)
            fetchStore.addedItems
          } catch (err) {
            console.log(err)
          }
        }
      } catch (err) {
        console.log(err)
      }
    },
    async addToCart(item: Item): Promise<void> {
      const fetchStore = useFetchStore()
      try {
        if (!item.isAdded) {
          const obj = {
            parentId: item.id,
          }
          item.isAdded = true
          const { data } = await axios.post('https://a3ca5502346e0c49.mokky.dev/cartadded', obj)
          item.addedId = data.id
        } else {
          item.isAdded = false
          await axios.delete(`https://a3ca5502346e0c49.mokky.dev/cartadded/${item.addedId}`)
          item.addedId = null
        }
      } catch (err) {
        console.log(err)
      }
      fetchStore.fetchAdded()
    },
    async addToFavorite(item: Item): Promise<void> {
      const fetchStore = useFetchStore()
      try {
        if (!item.isFavorite) {
          const obj = {
            parentId: item.id,
          }
          item.isFavorite = true
          const { data } = await axios.post('https://a3ca5502346e0c49.mokky.dev/favorites', obj)
          item.favoriteId = data.id
        } else {
          item.isFavorite = false
          await axios.delete(`https://a3ca5502346e0c49.mokky.dev/favorites/${item.favoriteId}`)
          item.favoriteId = null
        }
      } catch (err) {
        console.log(err)
      }
      fetchStore.fetchFavorites()
    },
  },
})
