<div
    class="relative bg-white border border-slate-100 rounded-3xl transition p-8 cursor-pointer hover:-translate-y-2 hover:shadow-xl"
  >
    <img
      :src="!isFavorite ? '/like-1.svg' : '/like-2.svg'"
      alt="Like"
      class="absolute top-4 right-4"
      @click="onClickFavorite"
    />
    <div>
      <img :src="imageUrl" alt="sneakers" class="w-full h-auto" />
    </div>
    <p class="mt-2">{{ title }}</p>
    <div class="flex justify-between mt-5">
      <div class="flex flex-col">
        <span class="text-slate-400">Цена:</span>
        <b>{{ price }}</b>
      </div>
      <img :src="!isAdded ? '/plus.svg' : '/checked.svg'" alt="Plus" @click="onClickAdd" />
    </div>
  </div>
