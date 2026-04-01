// utils/backEndConstant.ts
// Development
const PROTOCOL = "http";
const DOMAIN = "localhost";
const PORT = "8080";
const CONTEXT_ROOT = "spool-bear";
const VERSION = "/v0";
const API = "/api";
export const BASE_PATH = `${PROTOCOL}://${DOMAIN}:${PORT}/${CONTEXT_ROOT}`;

// Staging (commented out)
// const PROTOCOL = "http";
// const DOMAIN = "staging-api.spoolbear.com";
// const PORT = "443";
// const CONTEXT_ROOT = "3d";
// const VERSION = "/v0";
// const API = "/api";
// export const BASE_PATH = `${PROTOCOL}://${DOMAIN}/${CONTEXT_ROOT}`;

// Production (commented out)
// const PROTOCOL = "https";
// const DOMAIN = "api.felicitatrips.com";
// const PORT = "443";
// const CONTEXT_ROOT = "felicita";
// const VERSION = "/v0";
// const API = "/api";
// export const BASE_PATH = `${PROTOCOL}://${DOMAIN}/${CONTEXT_ROOT}`;

const AUTH = "/auth";
const NAV_BAR = "/nav-bar";
const GALLERY = "/gallery";
const BLOG = "/blog";
const PRODUCTS = "/products";
const USER_PROFILE = "/user-profile";
const USER_NOTIFICATION_PERMISSIONS = "/user-notification-permissions";
const ACCOUNT_SECURITY = "/account-security";
const WISH_LIST = "/wish-list";
const BROWSER_HISTORY = "/browser-history";
const OTHERS = "/others";
const REVIEWS = "/reviews";
const ORDERS = "/orders";
const CONTACT_US = "/contact-us";
const MATERIAL = "/material";

// Auth endpoints
export const LOGIN = `${BASE_PATH}${API}${VERSION}${AUTH}/login`;
export const LOGOUT = `${BASE_PATH}${API}${VERSION}${AUTH}/logout`;
export const SIGNUP = `${BASE_PATH}${API}${VERSION}${AUTH}/signup`;
export const GET_USER_DETAILS_FOR_LOGIN_DATA = `${BASE_PATH}${API}${VERSION}${AUTH}/me`;
export const UPDATE_PASSWORD_DATA = `${BASE_PATH}${API}${VERSION}${AUTH}/change-password`;
export const RESET_PASSWORD_DATA = `${BASE_PATH}${API}${VERSION}${AUTH}/reset-password`;
export const UPDATE_SECRET_QUESTIONS_DATA = `${BASE_PATH}${API}${VERSION}${AUTH}/update-secret-questions`;
export const USERNAME_PASSWORD_VALIDATION_DATA = `${BASE_PATH}${API}${VERSION}${AUTH}/username-password-validation`;
export const GET_ACTIVE_SECRET_QUESTIONS_DATA = `${BASE_PATH}${API}${VERSION}${AUTH}/secret-questions`;
export const GET_SECRET_QUESTIONS_BY_USER_DATA = `${BASE_PATH}${API}${VERSION}${AUTH}/secret-questions-by-user`;

// User Profile
export const UPDATE_USER_PROFILE_DETAILS_DATA = `${BASE_PATH}${API}${VERSION}${USER_PROFILE}/update-account`;
export const GET_USER_PROFILE_SIDE_BAR_DATA = `${BASE_PATH}${API}${VERSION}${USER_PROFILE}/side-bar`;
export const GET_USER_PROFILE_USER_DETAILS_DATA = `${BASE_PATH}${API}${VERSION}${USER_PROFILE}/user`;

// User Notification Permissions
export const GET_USER_NOTIFICATION_DETAILS_DATA = `${BASE_PATH}${API}${VERSION}${USER_NOTIFICATION_PERMISSIONS}/details`;
export const UPDATE_USER_NOTIFICATION_DETAILS_DATA = `${BASE_PATH}${API}${VERSION}${USER_NOTIFICATION_PERMISSIONS}/update`;

// Account Security
export const GET_ACCOUNT_SECURITY_DETAILS = `${BASE_PATH}${API}${VERSION}${ACCOUNT_SECURITY}/details`;
export const REQUEST_MOBILE_VERIFY_SECURITY_DETAILS = `${BASE_PATH}${API}${VERSION}${ACCOUNT_SECURITY}/mobile-verify`;
export const UPDATE_MOBILE_VERIFY_SECURITY_DETAILS = `${BASE_PATH}${API}${VERSION}${ACCOUNT_SECURITY}/mobile-update`;
export const REQUEST_EMAIL_VERIFY_SECURITY_DETAILS = `${BASE_PATH}${API}${VERSION}${ACCOUNT_SECURITY}/email-verify`;
export const UPDATE_EMAIL_VERIFY_SECURITY_DETAILS = `${BASE_PATH}${API}${VERSION}${ACCOUNT_SECURITY}/email-update`;

// Wish List
export const ADD_WISH_LIST_DATA = `${BASE_PATH}${API}${VERSION}${WISH_LIST}/add-wish-list`;
export const GET_WIS_LIST_DETAILS_DATA = `${BASE_PATH}${API}${VERSION}${WISH_LIST}/details`;

// Nav Bar
export const GET_ACTIVE_NAV_BAR_DATA = `${BASE_PATH}${API}${VERSION}${NAV_BAR}/active`;

// Gallery
export const GET_ACTIVE_GALLERY_IMAGES_DATA = `${BASE_PATH}${API}${VERSION}${GALLERY}/active`;

// Blogs
export const GET_ALL_BLOGS_DETAILS_DATA = `${BASE_PATH}${API}${VERSION}${BLOG}/all`;
export const GET_ACTIVE_BLOGS_DETAILS_DATA = `${BASE_PATH}${API}${VERSION}${BLOG}/active`;
export const GET_BLOGS_TAG_DETAILS_DATA = `${BASE_PATH}${API}${VERSION}${BLOG}/tags`;
export const GET_BLOGS_TAG_BY_BLOG_ID_DATA = `${BASE_PATH}${API}${VERSION}${BLOG}/tags`;
export const GET_BLOGS_DERAILS_BY_WRITER_NAME_DATA = `${BASE_PATH}${API}${VERSION}${BLOG}/writer`;
export const GET_BLOGS_DERAILS_BY_TAG_NAME_DATA = `${BASE_PATH}${API}${VERSION}${BLOG}/tag`;
export const GET_BLOGS_DERAILS_BY_BLOG_ID_DATA = `${BASE_PATH}${API}${VERSION}${BLOG}/blog-details`;
export const ADD_BLOG_DATA = `${BASE_PATH}${API}${VERSION}${BLOG}/add-blog`;
export const ADD_BLOG_BOOKMARK_DATA = `${BASE_PATH}${API}${VERSION}${BLOG}/add-bookmark`;
export const ADD_BLOG_REACT_DATA = `${BASE_PATH}${API}${VERSION}${BLOG}/add-react`;
export const ADD_BLOG_COMMENT_REACT_DATA = `${BASE_PATH}${API}${VERSION}${BLOG}/add-comment-react`;
export const ADD_BLOG_COMMENT_DATA = `${BASE_PATH}${API}${VERSION}${BLOG}/add-comment`;

// PRODUCTS
export const GET_ACTIVE_PRODUCTS_BY_GIVEN_FILTER_PARAMS_DATA = `${BASE_PATH}${API}${VERSION}${PRODUCTS}/active-products`;
export const GET_PRODUCT_DETAILS_BY_ID_DATA = `${BASE_PATH}${API}${VERSION}${PRODUCTS}/product-details`;

// Browser History
export const ADD_BROWSER_HISTORY_REQUEST_DATA = `${BASE_PATH}${API}${VERSION}${BROWSER_HISTORY}/add`;
export const GET_BROWSER_HISTORY_DATA = `${BASE_PATH}${API}${VERSION}${BROWSER_HISTORY}/history-data`;
export const REMOVE_BROWSER_HISTORY_BY_ID_DATA = `${BASE_PATH}${API}${VERSION}${BROWSER_HISTORY}/remove`;
export const REMOVE_ALL_BROWSER_HISTORY_DATA = `${BASE_PATH}${API}${VERSION}${BROWSER_HISTORY}/remove-all`;
export const REMOVE_LIST_OF_BROWSER_HISTORY_DATA = `${BASE_PATH}${API}${VERSION}${BROWSER_HISTORY}/remove-list`;

// Others
export const UPLOAD_IMAGE_TO_CLOUDINARY =
  "https://api.cloudinary.com/v1_1/dkfonkmwr/image/upload";

// Reviews
export const GET_USER_REVIEWS_DATA = `${BASE_PATH}${API}${VERSION}${REVIEWS}/reviews-by-user`;
export const GET_ALL_REVIEWS_DATA = `${BASE_PATH}${API}${VERSION}${REVIEWS}/all`;
export const ADD_REVIEW_DATA = `${BASE_PATH}${API}${VERSION}${REVIEWS}/add-review`;
export const ADD_REVIEW_REACTION_DATA = `${BASE_PATH}${API}${VERSION}${REVIEWS}/add-react`;
export const ADD_REVIEW_COMMENT_REACTION_DATA = `${BASE_PATH}${API}${VERSION}${REVIEWS}/add-comment-react`;
export const ADD_REVIEW_COMMENT_DATA = `${BASE_PATH}${API}${VERSION}${REVIEWS}/add-comment`;
export const GET_REVIEW_BY_REVIEW_ID_DATA = `${BASE_PATH}${API}${VERSION}${REVIEWS}/review-by-id`;
export const GET_REVIEW_BY_PRODUCT_ID_DATA = `${BASE_PATH}${API}${VERSION}${REVIEWS}/reviews-by-product-id`;

// Orders
export const GET_ORDERS_DETAILS_BY_USER_ID_DATA = `${BASE_PATH}${API}${VERSION}${ORDERS}/orders-by-user`;
export const GET_ORDERS_DETAILS_BY_USER_ID_FOR_ADD_REVIEW_DATA = `${BASE_PATH}${API}${VERSION}${ORDERS}/orders-by-user-for-review`;
export const ADD_PRINTING_ORDER_DATA = `${BASE_PATH}${API}${VERSION}${ORDERS}/add-printing-order`;
export const ADD_DESIGN_ORDER_DATA = `${BASE_PATH}${API}${VERSION}${ORDERS}/add-design-order`;
export const ADD_PRODUCT_ORDER_DATA = `${BASE_PATH}${API}${VERSION}${ORDERS}/add-product-order`;

// Contact
export const ADD_INQUIRY_DATA = `${BASE_PATH}${API}${VERSION}${CONTACT_US}/inquiry`;

// Materials
export const GET_ALL_MATERIALS_DETAILS_DATA = `${BASE_PATH}${API}${VERSION}${MATERIAL}/all`;
export const GET_MATERIAL_DETAILS_BY_ID_DATA = `${BASE_PATH}${API}${VERSION}${MATERIAL}/material-details-by-id`;

