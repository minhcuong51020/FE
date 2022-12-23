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
    icon: 'dribbble',
    submenu: [
      {
        path: `${ROUTER_UTILS.social.root}/${ROUTER_UTILS.social.twitter}`,
        title: 'twitter.management',
        root: true,
      },
      {
        path: `${ROUTER_UTILS.social.root}/${ROUTER_UTILS.social.line}`,
        title: 'line.management',
        root: true,
      },
      {
        path: `${ROUTER_UTILS.social.root}/${ROUTER_UTILS.social.reddit}`,
        title: 'reddit.management',
        root: true,
      },
      {
        path: `${ROUTER_UTILS.social.root}/${ROUTER_UTILS.social.redditGroup}`,
        title: 'reddit.group.management',
        root: true,
      }
    ]
  },
  {
    path: ROUTER_UTILS.posts.root,
    title: 'post.management',
    icon: 'read',
    root: true
  },
  {
    path: ROUTER_UTILS.emailInfo.root,
    title: 'email.management',
    icon: 'mail',
    root: true
  },
  {
    path: ROUTER_UTILS.userInfo.root,
    title: 'clientInfo.management',
    icon: 'user',
    root: true
  },
  {
    path: ROUTER_UTILS.statistical.root,
    title: 'statistical.management',
    icon: 'bar-chart',
    root: true
  },
];
