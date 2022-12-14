export const ROUTER_ACTIONS = {
  create: 'create',
  update: 'update',
  detail: 'detail',
  view: 'view',
  delete: 'delete',
};

export const ROUTER_UTILS = {
  base: {
    home: '',
    dashboard: 'dashboard',
    freeRoute: '**',
  },
  authentication: {
    root: 'authentication',
    login: 'login',
  },
  emailInfo: {
    root: 'email-info',
    list: '',
    emailCreate: 'create',
    emailUpdate: ':emailId/update',
    emailDetail: ':emailId/detail'
  },
  statistical: {
    root: 'statistical',
    list: ''
  },
  social: {
    root: 'social',
    reddit: 'reddit',
    redditCreate: 'reddit/create',
    redditUpdate: 'reddit/:redditId/update',
    redditDetail: 'reddit/:redditId/detail',
    redditGroup: 'reddit-group',
    redditGroupCreate: 'reddit-group/create',
    redditGroupUpdate: 'reddit-group/:redditGroupId/update',
    redditGroupDetail: 'reddit-group/:redditGroupId/detail',
    line: 'line',
    lineCreate: 'line/create',
    lineUpdate: 'line/:lineId/update',
    lineDetail: 'line/:lineId/detail',
    twitter: 'twitter',
    twitterCreate: 'twitter/create',
    twitterUpdate: 'twitter/:twitterId/update',
    twitterDetail: 'twitter/:twitterId/detail'
  },
  send: {
    root: 'send',
    sendReddit: ":postId/push-reddit",
    sendEmail: ":postId/push-email",
    sendSms: ":postId/push-sms",
    sendLine: ":postId/push-line",
    sendTwitter: ":postId/push-twitter"
  },
  posts: {
    root: 'posts',
    list: "",
    postscreate: 'create',
    postsupdate: ':postId/update',
    postsdetial: ':postId/detail',
  },
  userInfo: {
    root: 'user-info',
    list: "",
    create: 'create',
    update: ':infoId/update',
    detail: ':infoId/detail',
  },
  ticket: {
    root: 'ticket',
    create: 'create',
    createByComplaint: 'create-by-complaint/:id',
    detail: ':ticketId/detail',
  },
  survey: {
    root: 'survey',
    list: 'list',
    result: 'result',
    detailResult: 'result/:surveyId/detail/:type',
    create: 'create',
    update: ':id/update',
    detail: ':id/detail',
  },
  building: {
    root: 'building',
    list: 'list',
    detail: ':id/detail',
    create: 'create',
    unit: 'unit',
    unitCreate: 'unit/create',
    unitUpdate: 'unit/:unitId/update',
    unitDetail: 'unit/:unitId/detail',
  },
  partnerContract: {
    root: 'partner-contract',
  },
  customer: {
    list: 'list',
    root: 'customer',
    create: 'create',
    update: ':customerId/update',
    detail: ':id/detail',
  },
  notification: {
    root: 'notification',
    create: 'create/:type',
    update: ':notificationId/update/:type',
    detail: ':notificationId/detail/:type',
    me: 'me',
    list: 'list',
  },
  scheduler:  {
    root: 'scheduler',
    listCourse: 'listCourse',
    update: ':scheduler/update/:type',
    tkb: 'detail',
    list: 'list',
  },
  vendor: {
    root: 'vendor',
    detail: ':id/detail',
    list: 'list',
  },
  employee: {
    root: 'employee',
    list: 'list',
    detail: ':id',
  },

  department: {
    root: 'department',
    detail: `:id/${ROUTER_ACTIONS.detail}`,
  },
  contract: {
    root: 'contract',
    list: 'list',
    category: 'category',
    detail: `:id/${ROUTER_ACTIONS.detail}`,
    contractUpdate: ':id/update',
    contractCreate: 'create',
  },
  order: {
    root: 'order',
    orderList: 'list',
    orderUpdate: 'order/:id/update',
    orderDetail: 'order/:id/detail',
    orderCreate: 'order/create',
    refun:"refun"
  },
  user:{
    root:"user",
    list:"list",
    employee:'employee',
    customer:'customer',
    userCreate: 'create',
  },
  setting: {
    root: 'setting',
    user: 'user',
    userCreate: 'user/create',
    userUpdate: 'user/:id/update',
    myProfile: 'my-profile',
    groupUser: 'group-user',
    groupUserDetail: 'group-user/:id/detail',
    role: 'role',
    department: 'department',
    client: 'client',
    detail: 'department/:id/detail',
    actionLog: 'action-log',
    actionLogDetail: 'action-log/:id/detail',
    configuration: {
      root: 'parameter',
      list: 'parameter/list',
    },
  },
  product: {
    root: 'product',
    productList: 'list',
    material:'material',
    category: 'category',
    categoryUpdate: 'category/:id/update',
    categoryDetail: 'category/:id/detail',
    categoryCreate: 'category/create',
    accessory:'accessory',
    vendor:'vendor'
  },
  room: {
    root: 'room',
    roomCalendar: 'room/:id/calendar',
    calendar: 'calendar',
  },
  privacyPolicy: {
    root: 'privacy-policy',
  },
  report: {
    root: 'report',
  },
  feedback: {
    public: 'feedback-public',
  },
  home: {
    root: 'home',
  },
  complaint: {
    root: 'complaint',
    list: 'list',
    detail: ':id/complaint-detail',
    qrCreate: 'create-qr',
    qrUpdate: ':id/qr-update',
    qrList: 'qr-list',
    report: 'report',
  },
  error: {
    notFound: '404',
    permissionDenied: '403',
    systemError: '500',
  },
  guest: {
    root: 'guest',
    list: 'list',
    detail: ':id/detail',
    register: 'register',
    registerCreate: 'create-register',
    registerUpdate: ':id/update-register',
    registerDetail: ':id/detail-register',
  },
};
