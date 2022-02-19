import {
    HomeOutlined,
    AreaChartOutlined,
    BarsOutlined,
    ToolOutlined,
    UserOutlined,
    SafetyCertificateOutlined,
    AppstoreOutlined,
    BarChartOutlined,
    LineChartOutlined,
    PieChartOutlined,
    FormOutlined
} from '@ant-design/icons';

const menuConfig= [
    {
        title: '首页', // 菜单标题名称
        key: '/home', // 对应的path
        icon: function icon(){
            return <HomeOutlined />
        }, // 图标名称
        isPublic: true, // 公开的
    },
    {
        title: '商品',
        key: '/goods',
        icon: function icon(){
            return <AppstoreOutlined />
        },
        children: [ // 子菜单列表
            {
                title: '品类管理',
                key: '/category',
                icon: function icon(){
                    return <BarsOutlined />
                },
            },
            {
                title: '商品管理',
                key: '/product',
                icon: function icon(){
                    return <ToolOutlined />
                },
            },
        ]
    },

    {
        title: '用户管理',
        key: '/user',
        icon: function icon(){
            return <UserOutlined />
        },
    },
    {
        title: '角色管理',
        key: '/role',
        icon: function icon(){
            return <SafetyCertificateOutlined />
        },
    },

    {
        title: '图形图表',
        key: '/charts',
        icon: function icon(){
            return <AreaChartOutlined />
        },
        children: [
            {
                title: '柱形图',
                key: '/charts/bar',
                icon: function icon(){
                    return <BarChartOutlined />
                },
            },
            {
                title: '折线图',
                key: '/charts/line',
                icon: function icon(){
                    return <LineChartOutlined />
                },
            },
            {
                title: '饼图',
                key: '/charts/pie',
                icon: function icon(){
                    return <PieChartOutlined />
                },
            },
        ]
    },
    {
        title: '测试',
        key: '/test',
        icon: function icon(){
            return <FormOutlined />
        },
    },
    {
        title: '订单管理',
        key: '/order',
        icon: function icon(){
            return <AppstoreOutlined />
        },
    },
]

export default menuConfig