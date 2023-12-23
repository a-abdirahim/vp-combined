import { lazy, Suspense } from "react"
import { createBrowserRouter, RouterProvider } from "react-router-dom"

import RootLayout from "./pages/RootLayout"
const HomePage = lazy(() => {
  return new Promise(resolve => {
    setTimeout(() => resolve(import("./pages/HomePage")), 1000);
  });
})

import ProductsPage from "./pages/ProductsPage";

const ContactPage = lazy(() => {
  return new Promise(resolve => {
    setTimeout(() => resolve(import("./pages/ContactPage")), 1000);
  });
})
const AboutPage = lazy(() => {
  return new Promise(resolve => {
    setTimeout(() => resolve(import("./pages/AboutPage")), 1000);
  });
})
const Faq = lazy(() => {
  return new Promise(resolve => {
    setTimeout(() => resolve(import("./Components/Faq/Faq")), 1000);
  });
}
)

// actions and loaders
import { loader as productLoader } from "./pages/ProductsPage"
import { action as ProductUpdate } from "./Components/Admin panel/features/SingleProductEdit"
import { action as AddProductAction } from "./Components/Admin panel/features/AddProducts"
import { action as AddCategoryAction } from "./Components/Admin panel/features/AddCategories"
import { action as AddSubCategoryAction } from "./Components/Admin panel/features/AddSubCategories"

// all product components
import ProductDetails from "./Components/Products/SingleProducts/ProductDetails";
import AllProducts from "./Components/Products/AllProducts";
import AllSubcategories from "./Components/Products/AllSubcategories";
import AllSubCategoryProducts from "./Components/Products/AllSubCategoryProducts";
import AddCategories from "./Components/Admin panel/features/AddCategories";
import AllCategoryProducts from "./Components/Products/AllCategoryProucts";
import AllHospitalProducts from "./Components/Products/AllHospitalProducts";
import NoSubDetails from "./Components/Products/SingleProducts/NoSubDetails";
import AllSchoolsProducts from "./Components/Products/AllSchoolsProducts";
import Services from "./Components/Products/Services";


// all admin compnents
const AdminPage = lazy(() => import("./pages/Admin/AdminPage"))
const AddProducts = lazy(() => import("./Components/Admin panel/features/AddProducts"))
const AddSubCategories = lazy(() => import("./Components/Admin panel/features/AddSubCategories"))
const EditProducts = lazy(() => import("./Components/Admin panel/features/EditProducts"))
const EditProductPage = lazy(() => import("./pages/Admin/EditProductPage"))

import ScaleLoader from "react-spinners/ScaleLoader";



const router = createBrowserRouter([
  {
    path: "/admin",
    element: <AdminPage />,
    id: "product-loader",
    loader: productLoader,
    children: [
      {
        index: true,
        element: <AddProducts />,
        action: AddProductAction
      },
      {
        path: "/admin/add-categories",
        element: <AddCategories />,
        action: AddCategoryAction
      },
      {
        path: "/admin/add-sub-categories",
        element: <AddSubCategories />,
        action: AddSubCategoryAction
      },
      {
        path: "/admin/edit",
        element: <EditProducts />,
      },
      {
        path: "/admin/edit/:id",
        element: <EditProductPage />,
        action: ProductUpdate
      }
    ]
  },
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
        loader: productLoader
      },
      {
        path: "/allProducts",
        element: <ProductsPage />,
        id: "root",
        loader: productLoader,
        children: [
          {
            index: true,
            element: <AllProducts />,
            loader: productLoader,
          },
          {
            path: "/allProducts/services-&-maitenance",
            element: <Services />
          },
          {
            path: "/allProducts/:category",
            element: <AllSubcategories />,
          },
          {
            path: "/allProducts/:category/all",
            element: <AllCategoryProducts />,
          },
          {
            path: "/allProducts/:category/all/:name",
            element: <NoSubDetails />,
          },
          {
            path: "/allProducts/:category/:subCategory",
            element: <AllSubCategoryProducts />,
          },
          {
            path: "/allProducts/Hospitality",
            element: <AllHospitalProducts />,
          },
          {
            path: "/allProducts/schools&universities",
            element: <AllSchoolsProducts />,
            loader: productLoader,
          },
          {
            path: "/allProducts/:category/:subCategory/:name",
            element: <ProductDetails />,
            loader: productLoader
          },
        ]
      },
      {
        path: "/contact-us",
        element: <ContactPage />
      },
      {
        path: "/about",
        element: <AboutPage />
      },
      {
        path: "/Faqs",
        element: <Faq />
      },
    ]
  }
])
function App() {

  return (
    <Suspense fallback={<ScaleLoader
      className="loader"
      color={"#1d9b47"}
      size={800}
      aria-label="Loading Spinner"
      data-testid="loader"
    />}>
      <RouterProvider router={router} />
    </Suspense >
  )
}

export default App


