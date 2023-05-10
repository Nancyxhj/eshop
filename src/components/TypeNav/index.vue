<template>
    <div class="type-nav">
        <div class="container">
            <div @mouseover="enterShow" @mouseleave="leaveShow">
                <h2 class="all">全部商品分类</h2>
                <!-- 过度动画 -->
                <transition>

                </transition>
                <div class="sort" v-show="show">
                    <div class="all-sort-list2" @click="goSearch">
                        <div class="item" v-for="c1 in categoryList" :key="c1.categoryId">
                            <h3>
                                <a :data-categoryName="c1.categoryName" :data-category1Id="c1.categoryId">{{ c1.categoryName
                                }}</a>
                            </h3>
                            <div class="item-list clearfix">
                                <div class="subitem" v-for="c2 in c1.categoryChild" :key="c2.categoryId">
                                    <dl class="fore">
                                        <dt>
                                            <a :data-categoryName="c2.categoryName" :data-category2Id="c2.categoryId">{{
                                                c2.categoryName }}</a>
                                        </dt>
                                        <dd>
                                            <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                                                <a :data-categoryName="c3.categoryName" :data-category3Id="c3.categoryId">{{
                                                    c3.categoryName }}</a>
                                            </em>

                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <nav class="nav">
                <a href="###">服装城</a>
                <a href="###">美妆馆</a>
                <a href="###">尚品汇超市</a>
                <a href="###">全球购</a>
                <a href="###">闪购</a>
                <a href="###">团购</a>
                <a href="###">有趣</a>
                <a href="###">秒杀</a>
            </nav>

        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
    name: "TypeNav",
    data() {
        return {
            show: "true"
        }
    },
    methods: {
        goSearch(event) {

            let { categoryname, category1id, category2id, category3id } = event.target.dataset
            // 点击的是a 标签
            if (categoryname) {
                let location = { name: 'search' }
                let query = { categoryName: categoryname }
                // 如何区分是几级分类
                if (category1id) {
                    query.category1Id = category1id

                } else if (category2id) {
                    query.category2Id = category2id
                } else {
                    query.category3Id = category3id
                }
                if (this.$route.params) {
                    location.params = this.$route.params

                }
                location.query = query
                // 触发usp事件，把query参数传出去
                this.$router.push(location)
              
            }



        },
        enterShow() {
            this.show = true
        },
        leaveShow() {
            if (this.$route.path != '/home') {
                this.show = false
            }
        }
    },

    // 组件挂载完毕，向服务器发请求
    mounted() {
        //不是home的情况下，跳转其他页面，分类信息不展示
        if (this.$route.path != '/home') {
            this.show = false
        }



    },
    computed: {
        ...mapState({
            categoryList: state => state.home.categoryList.data
        })


    }
}
</script>

<style scoped lang="less">
.type-nav {
    border-bottom: 2px solid #e1251b;

    .container {
        width: 1200px;
        margin: 0 auto;
        display: flex;
        position: relative;

        .all {
            width: 210px;
            height: 45px;
            background-color: #e1251b;
            line-height: 45px;
            text-align: center;
            color: #fff;
            font-size: 14px;
            font-weight: bold;
        }

        .nav {
            a {
                height: 45px;
                margin: 0 22px;
                line-height: 45px;
                font-size: 16px;
                color: #333;
            }
        }

        .sort {
            position: absolute;
            left: 0;
            top: 45px;
            width: 210px;
            height: 461px;
            position: absolute;
            background: #fafafa;
            z-index: 999;

            .all-sort-list2 {
                .item:hover {
                    background-color: skyblue;
                }

                .item {
                    h3 {
                        line-height: 30px;
                        font-size: 14px;
                        font-weight: 400;
                        overflow: hidden;
                        padding: 0 20px;
                        margin: 0;

                        a {
                            color: #333;
                        }
                    }

                    .item-list {
                        display: none;
                        position: absolute;
                        width: 734px;
                        min-height: 460px;
                        background: #f7f7f7;
                        left: 210px;
                        border: 1px solid #ddd;
                        top: 0;
                        z-index: 9999 !important;

                        .subitem {
                            float: left;
                            width: 650px;
                            padding: 0 4px 0 8px;

                            dl {
                                border-top: 1px solid #eee;
                                padding: 6px 0;
                                overflow: hidden;
                                zoom: 1;

                                &.fore {
                                    border-top: 0;
                                }

                                dt {
                                    float: left;
                                    width: 54px;
                                    line-height: 22px;
                                    text-align: right;
                                    padding: 3px 6px 0 0;
                                    font-weight: 700;
                                }

                                dd {
                                    float: left;
                                    width: 415px;
                                    padding: 3px 0 0;
                                    overflow: hidden;

                                    em {
                                        float: left;
                                        height: 14px;
                                        line-height: 14px;
                                        padding: 0 8px;
                                        margin-top: 5px;
                                        border-left: 1px solid #ccc;
                                    }
                                }
                            }
                        }
                    }

                    &:hover {
                        .item-list {
                            display: block;
                        }
                    }
                }
            }
        }
    }
}
</style>