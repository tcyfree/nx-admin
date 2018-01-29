import Customers from '../components/Customers'
import Login from '../components/Login'
import Report from '../components/Report'
import CommunityList from '../components/CommunityList'
import UserList from '../components/UserList'
import Page from '../components/Pagination'
import TestDemo from '../components/TestDemo'
import About from '../components/About'
import Add from '../components/Add'
import CustomerDetails from '../components/CustomerDetails'
import Edit from '../components/Edit'

export default {
  mode:"history",
  base:__dirname,
	routes:[
    {path:"/report",component:Report},
    {path:"/community_list",component:CommunityList},
    {path:"/",component:Login},
    {path:"/user_list",component:UserList},
    {path:"/page",component:Page},
    {path:"/customer",component:Customers},
    {path:"/test_demo",component:TestDemo},
    {path:"/about",component:About},
    {path:"/add",component:Add},
    {path:"/customer/:id",component:CustomerDetails},
    {path:"/edit/:id",component:Edit},
	]
}
