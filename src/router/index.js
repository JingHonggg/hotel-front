import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [{
        path: '/',
        redirect: '/login'
    },
        {
            path: '/',
            component: () => import ( /* webpackChunkName: "home" */ '../components/common/Home.vue'),
            meta: { title: '自述文件' },
            children: [
                {
                    path: '/room',
                    component: () => import ( /* webpackChunkName: "table" */ '../components/page/Room.vue'),
                    meta: { title: '房间列表' }
                },
                {
                    // 权限页面
                    path: '/permission',
                    component: () => import ( /* webpackChunkName: "permission" */ '../components/page/FrontManage.vue'),
                    meta: { title: '前台管理', permission: true }
                },
                {
                    path: '/modifyUser',
                    component: () => import ('../components/page/ModifyUser.vue'),
                    meta: { title: '修改信息' }
                },
                {
                    path: '/checkIn',
                    name: 'CheckIn',
                    component: () => import('../components/page/CheckIn.vue'),
                    meta: { title: '入住信息' }
                },
                {
                    path: '/staff',
                    component: () => import('../components/page/staff.vue'),
                    meta: { title: '酒店员工信息' }
                },
                {
                    path: '/sauna',
                    component: () => import('../components/page/sauna.vue'),
                    meta: { title: '桑拿洗浴中心' }
                },
                {
                    path: '/facilities',
                    name: 'facilities',
                    component: () => import('../components/page/facilities.vue'),
                    meta: { title: '酒店设施' }
                }
            ]
        },
        {
            path: '/login',
            component: () =>
                import ( /* webpackChunkName: "login" */ '../components/page/Login.vue'),
            meta: { title: '登录' }
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
});
