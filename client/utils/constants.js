export const KINDEEM_BASE_URL = 'http://143.110.177.168'

export const BASE_URL = process.env.NODE_ENV === 'production' ? 'http://143.110.177.168:3001' : process.env.SERVER_BASE_URL

export const USER_AUTH_BASE_URL = `${BASE_URL}/api/user-auth`
export const SUPER_AUTH_BASE_URL = `${BASE_URL}/api/superadmin`
export const USER_BASE_URL = `${BASE_URL}/api/user`
export const CART_BASE_URL = `${BASE_URL}/api/cart-wishlist`
export const ORDER_BASE_URL = `${BASE_URL}/api/order`
export const PRODUCT_BASE_URL = `${BASE_URL}/api/product`
export const REVIEW_BASE_URL = `${BASE_URL}/api/review-qna`
export const WISHLIST_BASE_URL = `${BASE_URL}/api/cart-wishlist`
export const IMAGE_BASE_URL = `${BASE_URL}/uploads`