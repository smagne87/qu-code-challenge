<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    props: {
        columnName: {
            type: String,
            required: true,
        },
        columnKey: {
            type: String,
            required: true,
        },
        columnIcon: {
            type: String,
            required: true,
        },
        showColumnIcon: {
            type: Boolean,
            required: true,
        },
        onClick: {
            type: Function,
            required: true,
        },
    },
    setup(props) {
        const handleColumnClick = () => {
            props.onClick(props.columnKey);
        };
        return {
            handleColumnClick
        };
    },
    computed: {
        showIcon: function (): boolean {
            return this.showColumnIcon;
        },
        icon: function (): string {
            return this.columnIcon;
        },
    }
});

</script>
<template>
    <th class="px-6 py-3">
        <div class="table-header-text" @click="handleColumnClick">{{ columnName }}
            <font-awesome-icon v-show="showIcon" :icon="icon" />
        </div>
    </th>
</template>

<style scoped>
.table-header-text {
    @apply flex gap-1 items-center justify-center cursor-pointer;
}
</style>
  