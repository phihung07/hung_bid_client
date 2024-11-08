const ApiUrl = {
    // HOST: 'http://192.168.1.5:3000/api/',
    HOST: 'https://hung-bid-server.onrender.com/api/',
    PRODUCT: {
        LIST: 'product/list',
        DETAIL: 'product/detail/',
    },
    USER: {
        VIEW_PROFILE: 'user/view-profile-user',
        UPDATE: 'user/update-user',
        UPDATE_AVATAR: 'user/update-avatar',
    },
    CUSTOMER: {
        MAKE_BID: 'customer/make-bid',
        CHECK_OUT: 'customer/checkout-card/',
    },
    SECURITY: {
        REGISTER: 'security/register',
        LOGIN: 'security/login',
    },
    OWNER: {
        MY_ACTIVITY: 'store-owner/my-activity-statistics',
        MY_BID: 'store-owner/my-bid-statistics',
        CREATE_PRODUCT: 'store-owner/product/create',
        PUBLISH_PRODUCT: 'store-owner/product/publish',
        UPDATE_PRODUCT: 'store-owner/product/update/',
        DELETE_PRODUCT: 'store-owner/product/delete/',
        LIST_ORDER: 'store-owner/winning-bid-statistics',
        WINNING_BID_ORDER: 'store-owner/winning-bid-order',
        UPDATE_ORDER_STATUS: 'store-owner/update-order-status/',
    },
    CATEGORY: {
        CREATE: 'store-owner/category/create',
        LIST: 'store-owner/category/view',
        DELETE: 'store-owner/category/delete/',
        UPDATE: 'store-owner/category/update/',
    },
}

export default ApiUrl
