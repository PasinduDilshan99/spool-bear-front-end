// utils/backEndConstant.ts
// Development
const PROTOCOL = "http";
const DOMAIN = "localhost";
const PORT = "8081";
const CONTEXT_ROOT = "3d";
const VERSION = "/v0";
const API = "/api";
export const BASE_PATH = `${PROTOCOL}://${DOMAIN}:${PORT}/${CONTEXT_ROOT}`;

// Staging (commented out)
// const PROTOCOL = "http";
// const DOMAIN = "staging-api.felicitatrips.com";
// const PORT = "443";
// const CONTEXT_ROOT = "felicita";
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
