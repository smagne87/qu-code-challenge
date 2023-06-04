<script lang="ts">
import ColumnHeader from '@/components/ColumnHeader/ColumnHeader.vue';
import { usePlanetStore } from '@/stores/planets';
import { mapState, storeToRefs } from 'pinia';
import { defineComponent } from 'vue';


export default defineComponent({
  setup() {
    const store = usePlanetStore();
    store.getPlanets();
    const { planetsSorted } = storeToRefs(store);

    const handleColumnSortChange = (sortBy: string) => {
      store.updateSortKey(sortBy);
    };

    return {
      planetsSorted,
      handleColumnSortChange
    };
  },
  computed: {
    ...mapState(usePlanetStore, ['sortDirection', 'sortKey']),
  },
  components: { ColumnHeader }
});
</script>

<template>
  <main class="container">
    <table class="table">
      <thead class="table-headers">
        <tr>
          <ColumnHeader :show-column-icon="sortKey === 'name'" column-name="Name" column-key="name"
            :on-click="handleColumnSortChange"
            :column-icon="sortDirection === 'asc' ? 'arrow-up-a-z' : 'arrow-down-a-z'" />
          <ColumnHeader :show-column-icon="sortKey === 'climate'" column-name="Climate" column-key="climate"
            :on-click="handleColumnSortChange"
            :column-icon="sortDirection === 'asc' ? 'arrow-up-a-z' : 'arrow-down-a-z'" />
          <ColumnHeader :show-column-icon="sortKey === 'diameter'" column-name="Diameter" column-key="diameter"
            :on-click="handleColumnSortChange"
            :column-icon="sortDirection === 'asc' ? 'arrow-up-a-z' : 'arrow-down-a-z'" />
          <ColumnHeader :show-column-icon="sortKey === 'population'" column-name="Population" column-key="population"
            :on-click="handleColumnSortChange"
            :column-icon="sortDirection === 'asc' ? 'arrow-up-a-z' : 'arrow-down-a-z'" />
        </tr>
      </thead>
      <tbody>
        <tr class="table-rows" v-for="item in planetsSorted()" :key="item.name">
          <td class="special-column">{{ item.name }}</td>
          <td class="px-6 py-4">{{ item.climate }}</td>
          <td class="px-6 py-4">{{ item.diameter }}</td>
          <td class="px-6 py-4">{{ item.population }}</td>
        </tr>
      </tbody>
    </table>
  </main>
</template>

<style scoped>

.table {
  @apply w-full text-sm text-left text-gray-500 dark:text-gray-400;
}

.table-headers {
  @apply text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400;
}
.table-rows {
  @apply bg-white border-b dark:bg-gray-800 dark:border-gray-700;
}
.special-column {
  @apply px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white;
}
.container {
  @apply p-3 bg-gray-500 min-w-full;
  height: calc(100vh - 45px);
}
</style>