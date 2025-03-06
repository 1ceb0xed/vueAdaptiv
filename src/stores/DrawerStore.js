import { defineStore } from 'pinia'
import axios from 'axios'
import { useFetchAll } from './FetchStore'

const apiStore = useFetchAll()
export const useDrawer = defineStore('drawer', {
  state: () => ({
    drawerOpen: false,
    isMakeOrder: false,
  }),
  getters: {
    drawerAddedItems: () => {
      return apiStore.addedItems.map((addeditem) => {
        return apiStore.items.find((item) => item.id === addeditem.parentId)
      })
    },
  },
  actions: {
    openDrawer() {
      this.drawerOpen = true
      document.body.classList.toggle('overflow-hidden', true)
    },
    closeDrawer() {
      this.drawerOpen = false
      this.isMakeOrder = false
      document.body.classList.toggle('overflow-hidden', false)
    },
    async removeFromDrawer(item) {
      try {
        const DeleteId = Number(item.target.dataset.parentId)
        await axios.delete(`https://a3ca5502346e0c49.mokky.dev/cartadded/${item.target.dataset.id}`)
        const ItemFetchId = apiStore.items.find((obj) => obj.id === DeleteId)
        if (ItemFetchId) {
          ItemFetchId.isAdded = false
        }
        apiStore.fetchAdded()
      } catch (err) {
        console.log(err)
      }
    },
    async makeOrder() {
      apiStore.AddedItems.forEach(async (addedItem) => {
        const itemsId = apiStore.items.find((item) => item.id === addedItem.parentId)
        if (itemsId) {
          itemsId.isAdded = false
        }
      })
      const itemsToDelete = [...apiStore.AddedItems]
      apiStore.AddedItems.splice(0, apiStore.AddedItems.length)
      this.isMakeOrder = true
      try {
        for (const addedItem of itemsToDelete) {
          try {
            await axios.delete(`https://a3ca5502346e0c49.mokky.dev/cartadded/${addedItem.id}`)
            apiStore.AddedItems
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
