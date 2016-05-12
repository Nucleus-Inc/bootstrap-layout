// STYLING
import './sass/style'

// COMPONENTS
import { sidebar } from './js/sidebar'
import { sidebarToggle } from './js/sidebar-toggle'
import { sidebarMenuCollapse } from './js/sidebar-menu-collapse'

// EXPORT LIBRARIES
export { sidebar, Sidebar } from './js/sidebar'
export { sidebarToggle, SidebarToggle } from './js/sidebar-toggle'
export { sidebarMenuCollapse, SidebarMenuCollapse } from './js/sidebar-menu-collapse'

// EXPORT DEFAULT
export default { sidebar, sidebarToggle, sidebarMenuCollapse }