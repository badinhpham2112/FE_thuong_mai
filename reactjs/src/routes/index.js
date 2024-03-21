import HomePage from "../pages/HomePage/HomePage";
import OrderPage from "../pages/OrderPage/OrderPage";
import ProductsPage from "../pages/ProductsPage/ProductsPage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";

import TypeProductPage from "../pages/TypeProductPage/TypeProductPage";
import SignInPage from "../pages/SignInPage/SignInPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";
import ProductDetailPage from "../pages/ProductDetailPage/ProductDetailPage";
import profilePage from "../pages/profilePage/profilePage";
import AdminPage from "../pages/AdminPage/AdminPage"
import PaymentPage from "../pages/PaymentPage/PaymentPage";
import OrderSuccess from "../pages/OrderSuccess/OrderSuccess";
import MyOrderPage from "../pages/MyOrderPage/MyOrderPage";
import DetailsOrderPage from "../pages/DetailsOrderPage/DetailsOrderPage";

export const routes = [{
        path: '/',
        page: HomePage,
        isShowHeader: true,
        isShowHeaderBottom: true
    },
    {
        path: '/products',
        page: ProductsPage,
        isShowHeader: true,
        isShowHeaderBottom: true
    },
    {
        path: '/order',
        page: OrderPage,
        isShowHeader: true,
        isShowHeaderBottom: true
    },

    {
        path: `/my-order`,
        page: MyOrderPage,
        isShowHeader: true,
        isShowHeaderBottom: true
    },

    {
        path: `/details-order/:id`,
        page: DetailsOrderPage,
        isShowHeader: true,
        isShowHeaderBottom: true
    },

    {
        path: '/payment',
        page: PaymentPage,
        isShowHeader: true,
        isShowHeaderBottom: true
    },

    {
        path: '/orderSuccess',
        page: OrderSuccess,
        isShowHeader: true,
        isShowHeaderBottom: true
    },

    {
        path: '/product/:type',
        page: TypeProductPage,
        isShowHeader: true,
        isShowHeaderBottom: true
    },
    {
        path: '/sign-in',
        page: SignInPage,
        isShowHeader: false,
        isShowHeaderBottom: false
    },
    {
        path: '/sign-up',
        page: SignUpPage,
        isShowHeader: false,
        isShowHeaderBottom: false
    },
    {
        path: '/Product-details/:id',
        page: ProductDetailPage,
        isShowHeader: true,
        isShowHeaderBottom: true
    },
    {
        path: '/profile-user',
        page: profilePage,
        isShowHeader: true,
        isShowHeaderBottom: true
    },
    {
        path: '/system/admin',
        page: AdminPage,
        isShowHeader: false,
        isPrivate: true,
        isShowHeaderBottom: true
    },
    {
        path: '*',
        page: NotFoundPage,

    }
]