// utils/frontEndConstant.ts
const API = "/api";
const AUTH = "/auth";
const NAV_BAR = "/nav-bar";
const GALLERY = "/gallery";
const BLOGS = "/blogs";
const PRODUCTS = "/products";

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