import { ROUTER_UTILS } from '@shared/utils/router.utils';

export const SidebarConstant = [
  {
    path: ROUTER_UTILS.base.dashboard,
    title: 'sidebar.dashboard',
    icon: 'appstore',
    root: true,
  },
  {
    path: ROUTER_UTILS.social.root,
    title: 'Quản lý mạng xã hội',
    icon: 'book',
    submenu: [
      {
        path: `${ROUTER_UTILS.social.root}/${ROUTER_UTILS.social.reddit}`,
        title: 'Reddit',
        root: true,
      },
      {
        path: `${ROUTER_UTILS.social.root}/${ROUTER_UTILS.social.redditGroup}`,
        title: 'Reddit Group',
        root: true,
      }
    ]
  },
  {
    path: ROUTER_UTILS.posts.root,
    title: 'Quản lý bài viết',
    icon: 'file-text',
    root: true
  },
  {
    path: ROUTER_UTILS.emailInfo.root,
    title: 'Quản lý email',
    icon: 'file-text',
    root: true
  },
  {
    path: ROUTER_UTILS.userInfo.root,
    title: 'Quản lý người dùng',
    icon: 'user',
    root: true
  },
];
