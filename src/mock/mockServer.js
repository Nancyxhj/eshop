import Mock from 'mockjs'

import banner from './banner'
import floor from './floor.json'




// 模拟首页大的轮播图
Mock.mock("/mock/banner", { code: 200, data: banner })

Mock.mock("/mock/floor", { code: 200, data: floor })

