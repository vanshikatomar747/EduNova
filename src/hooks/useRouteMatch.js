// Custom hook to check if the current route matches a given path
import { useLocation, matchPath } from "react-router-dom"

export default function useRouteMatch(path) {
  // Get the current URL location
  const location = useLocation()

  // Match the current pathname with the provided path
  return matchPath({ path }, location.pathname)
}
