export default [
	{
	  path: '/user',
	  layout: false,
	  routes: [
		{
		  path: '/user/login',
		  layout: false,
		  name: 'login',
		  component: './user/Login',
		},
		{
		  path: '/user',
		  redirect: '/user/login',
		},
	  ],
	},
  
	//////////////////////// DEFAULT MENU ////////////////////////
	{
	  path: '/dashboard',
	  name: 'Dashboard',
	  component: './TrangChu',
	  icon: 'HomeOutlined',
	},
  
	{
	  name: 'Quản lý Phòng học',
	  icon: 'CalendarOutlined',
	  routes: [
		{
		  path: '/phong-hoc',
		  name: 'Danh sách phòng học',
		  component: './PhongHoc/DanhSach',  // pages/PhongHoc/DanhSach/index.tsx
		  icon: 'UnorderedListOutlined',
		},
		{
		  path: '/phong-hoc/them-moi',
		  name: 'Thêm phòng học',
		  component: './PhongHoc/ThemChinhSua', // pages/PhongHoc/ThemChinhSua/index.tsx
		  icon: 'FormOutlined',
		  hideInMenu: true,
		},
		{
		  path: '/phong-hoc/chinh-sua/:id',
		  name: 'Chỉnh sửa phòng học',
		  component: './PhongHoc/ThemChinhSua', // Tái sử dụng form thêm/sửa
		  hideInMenu: true,
		},
	  ],
	},
  
	//////////////////////// OTHER ////////////////////////
	{
	  path: '/gioi-thieu',
	  name: 'About',
	  component: './TienIch/GioiThieu',
	  hideInMenu: true,
	},
	{
	  path: '/random-user',
	  name: 'RandomUser',
	  component: './RandomUser',
	  icon: 'ArrowsAltOutlined',
	},
	{
	  path: '/todo-list',
	  name: 'TodoList',
	  icon: 'OrderedListOutlined',
	  component: './TodoList',
	},
  
	//////////////////////// NOTIFICATION ////////////////////////
	{
	  path: '/notification',
	  routes: [
		{
		  path: './subscribe',
		  exact: true,
		  component: './ThongBao/Subscribe',
		},
		{
		  path: './check',
		  exact: true,
		  component: './ThongBao/Check',
		},
		{
		  path: './',
		  exact: true,
		  component: './ThongBao/NotifOneSignal',
		},
	  ],
	  layout: false,
	  hideInMenu: true,
	},
  
	//////////////////////// EXCEPTIONS ////////////////////////
	{
	  path: '/403',
	  component: './exception/403/403Page',
	  layout: false,
	},
	{
	  path: '/hold-on',
	  component: './exception/DangCapNhat',
	  layout: false,
	},
	{
	  component: './exception/404',
	},
  ];
  