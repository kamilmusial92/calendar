export const routes = {
  home: '/',
  calendar:'/calendar',
  statistics:'/statistics',
  notifications: '/notifications',
  settings:{
    home:'/settings',
    avatar:'/settings/avatar',
    person:'/settings/person',
    users:{
      home:'/settings/users',
      edituser: '/settings/users/:id',
      edituserform: '/settings/users/:id/edit',
      adduserform: '/settings/users/:id/create',
      //changestatus: '/settings/users/:id/changestatus'
    },
    customers:{
      home:'/settings/customers',
      
      create:'/settings/customers/create',
    },
    company:{
      
      info:'/settings/company/:id',
      logotype:'/settings/company/:id/logotype',
      maincolor:'/settings/company/:id/maincolor',
      workplaces:{
        home: '/settings/company/:id/workplaces',
        edit: '/settings/company/:id/workplaces/edit/:workplaceid',
        create: '/settings/company/:id/workplaces/create',
        permissions:'/settings/company/:id/workplaces/permissions/:workplaceid'
      }
      
    }

  },
   

  login: '/login',
  register: '/register',
  logout:'/logout',
  logoutsuccess:'/logoutsuccess',
  error404:'/404'
};
