// utils/frontEndConstant.ts
const API = "/api";
const AUTH = "/auth";
const NAV_BAR = "/nav-bar";
const GALLERY = "/gallery";
const BLOGS = "/blogs";
const PRODUCTS = "/products";
const USER_PROFILE = "/user-profile";
const USER_NOTIFICATION_PERMISSIONS = "/user-notification-permissions";
const ACCOUNT_SECURITY = "/account-security";
const WISH_LIST = "/wish-list";
const OTHERS = "/others";
const BROWSER_HISTORY = "/browser-history";
const REVIEWS = "/reviews";
const ORDERS = "/orders";
const CONTACT_US = "/contact-us";

// Auth endpoints for frontend (relative paths for proxy)
export const LOGIN_FE = `${API}${AUTH}/login`;
export const LOGOUT_FE = `${API}${AUTH}/logout`;
export const SIGNUP_FE = `${API}${AUTH}/signup`;
export const GET_USER_DETAILS_FOR_LOGIN_DATA_FE = `${API}${AUTH}/me`;
export const UPDATE_PASSWORD_DATA_FE = `${API}${AUTH}/change-password`;
export const RESET_PASSWORD_DATA_FE = `${API}${AUTH}/reset-password`;
export const UPDATE_SECRET_QUESTIONS_DATA_FE = `${API}${AUTH}/update-secret-questions`;
export const USERNAME_PASSWORD_VALIDATION_DATA_FE = `${API}${AUTH}/username-password-validation`;
export const GET_ACTIVE_SECRET_QUESTIONS_DATA_FE = `${API}${AUTH}/secret-questions`;
export const GET_SECRET_QUESTIONS_BY_USER_DATA_FE = `${API}${AUTH}/secret-questions-by-user`;

// User Profile
export const UPDATE_USER_PROFILE_DETAILS_DATA_FE = `${API}${USER_PROFILE}/update-user-details`;
export const GET_USER_PROFILE_SIDE_BAR_DATA_FE = `${API}${USER_PROFILE}/side-bar`;
export const GET_USER_PROFILE_USER_DETAILS_DATA_FE = `${API}${USER_PROFILE}/user`;

// User Notification Permissions
export const GET_USER_NOTIFICATION_DETAILS_DATA_FE = `${API}${USER_NOTIFICATION_PERMISSIONS}/details`;
export const UPDATE_USER_NOTIFICATION_DETAILS_DATA_FE = `${API}${USER_NOTIFICATION_PERMISSIONS}/update`;

// Account Security
export const GET_ACCOUNT_SECURITY_DETAILS_FE = `${API}${ACCOUNT_SECURITY}/details`;
export const REQUEST_MOBILE_VERIFY_SECURITY_DETAILS_FE = `${API}${ACCOUNT_SECURITY}/mobile-verify`;
export const UPDATE_MOBILE_VERIFY_SECURITY_DETAILS_FE = `${API}${ACCOUNT_SECURITY}/mobile-update`;
export const REQUEST_EMAIL_VERIFY_SECURITY_DETAILS_FE = `${API}${ACCOUNT_SECURITY}/email-verify`;
export const UPDATE_EMAIL_VERIFY_SECURITY_DETAILS_FE = `${API}${ACCOUNT_SECURITY}/email-update`;

// Wish List
export const ADD_WISH_LIST_DATA_FE = `${API}${WISH_LIST}/insert-wish-list`;
export const GET_WIS_LIST_DETAILS_DATA_FE = `${API}${WISH_LIST}/details`;

// Nav Bar
export const GET_ALL_NAV_BAR_DATA = `${API}${NAV_BAR}`;

// Gallery
export const GET_ACTIVE_GALLERY_IMAGES_DATA_FE = `${API}${GALLERY}/active-images`;

// Blogs
export const GET_ALL_BLOGS_DETAILS_DATA_FE = `${API}${BLOGS}`;
export const GET_ACTIVE_BLOGS_DETAILS_DATA_FE = `${API}${BLOGS}/active-blogs`;
export const GET_BLOGS_TAG_DETAILS_DATA_FE = `${API}${BLOGS}/blog-tags`;
export const GET_BLOGS_TAG_BY_BLOG_ID_DATA_FE = `${API}${BLOGS}/blog-tags`;
export const GET_BLOGS_DERAILS_BY_WRITER_NAME_DATA_FE = `${API}${BLOGS}/writer`;
export const GET_BLOGS_DERAILS_BY_TAG_NAME_DATA_FE = `${API}${BLOGS}/blog-by-tag-name`;
export const GET_BLOGS_DERAILS_BY_BLOG_ID_DATA_FE = `${API}${BLOGS}/blog-details-by-blog-id`;
export const ADD_BLOG_DATA_FE = `${API}${BLOGS}/add-blog`;
export const ADD_BLOG_BOOKMARK_DATA_FE = `${API}${BLOGS}/add-blog-bookmark`;
export const ADD_BLOG_REACT_DATA_FE = `${API}${BLOGS}/add-react`;
export const ADD_BLOG_COMMENT_REACT_DATA_FE = `${API}${BLOGS}/add-blog-comment-react`;
export const ADD_BLOG_COMMENT_DATA_FE = `${API}${BLOGS}/add-comment-to-blog`;

// PRODUCTS
export const GET_ACTIVE_PRODUCTS_BY_GIVEN_FILTER_PARAMS_FE = `${API}${PRODUCTS}/active-products-by-filter`;
export const GET_PRODUCT_DETAILS_BY_ID_DATA_FE = `${API}${PRODUCTS}/product-details`;

// Browser History
export const ADD_BROWSER_HISTORY_REQUEST_DATA_FE = `${API}${BROWSER_HISTORY}/add`;
export const GET_BROWSER_HISTORY_DATA_FE = `${API}${BROWSER_HISTORY}/history-data`;

// Others
export const UPLOAD_IMAGE_TO_CLOUDINARY_FE = `${API}${OTHERS}/save-images`;
export const UPLOAD_FILE_TO_CLOUDINARY_FE = `${API}${OTHERS}/save-images`;

// Reviews
export const GET_USER_REVIEWS_DATA_FE = `${API}${REVIEWS}/reviews-by-user`;

// Orders
export const GET_ORDERS_DETAILS_BY_USER_ID_DATA_FE = `${API}${ORDERS}/orders-by-user`;
export const ADD_PRINTING_ORDER_DATA_FE = `${API}${ORDERS}/add-printing-order`;
export const ADD_DESIGN_ORDER_DATA_FE = `${API}${ORDERS}/add-design-order`;

// Orders
export const ADD_INQUIRY_DATA_FE = `${API}${CONTACT_US}/inquiry`;
