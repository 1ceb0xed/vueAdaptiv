import { defineStore } from 'pinia'
import axios from 'axios'
import { useFetchStore } from './FetchStore'
import { Item } from './FetchStore'

export const useDrawerStore = defineStore('drawer', {
  state: () => ({
    drawerOpen: false as boolean,
    isMakeOrder: false as boolean,
  }),
  getters: {
    drawerAddedItems(): Item[] {
      const fetchStore = useFetchStore()
      return fetchStore.addedItems
        .map((addeditem) => {
          const item = fetchStore.items.find((Item) => Item.id === addeditem.parentId)
          return item || null
        })
        .filter((item) => item !== null)
    }, // тут жаловался типо find может выдать undefind пришлось дописывать этот фильтр и условие
  },
  actions: {
    openDrawer(): void {
      this.drawerOpen = true
      document.body.classList.toggle('overflow-hidden', true)
    },
    closeDrawer(): void {
      this.drawerOpen = false
      this.isMakeOrder = false
      document.body.classList.toggle('overflow-hidden', false)
    },
    async removeFromDrawer(event: MouseEvent): Promise<void> {
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
  },
})
