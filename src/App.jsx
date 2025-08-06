import { createBrowserRouter, RouterProvider } from "react-router"

const routes = [{
    path: '/',
    element: <h1 className="text-3xl font-bold underline">Hello World</h1>
  }]

const router = createBrowserRouter(routes,
  {
  future: {
    v7_relativeSplatPath: true,
  }},
)

function App() {
  return <RouterProvider router={router}
          future={{
          v7_startTransition: true,
          v7_fetcherPersist: true,
          v7_normalizeFormMethod: true,
          v7_partialHydration: true,
          v7_skipActionErrorRevalidation: true,
          }}
        />
}

export default App