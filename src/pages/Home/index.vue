<template>
    <div>
        首页 HOME
        <!-- 三级联动全局组件，无需引入 -->
        <TypeNav />
        <ListContainer />
        <Recommend />
        <Rank />
        <Like />
        <Floor v-for="floor in floorList" :key="floor.id" :list="floor" />

        <Brand />

    </div>
</template>

<script>
import { mapState } from 'vuex'
import ListContainer from './ListContainer/index.vue'
import Recommend from './Recommend/index.vue'
import Rank from './Rank/index.vue'
import Like from './Like/index.vue'
import Floor from './Floor/index.vue'
import Brand from './Brand/index.vue'


export default {
    name: 'Home',
    components: { ListContainer, Recommend, Rank, Like, Floor, Brand },
    mounted() {
        // 这里发请求拿floor数据，因为要渲染两组v-for 
        this.$store.dispatch('getFloorList')
        // 获取用户信息
        this.$store.dispatch('getUserInfo')

    },
    computed: {
        ...mapState({
            floorList: (state) => state.home.floorList
        })
    },

}

</script>

<style scoped></style>