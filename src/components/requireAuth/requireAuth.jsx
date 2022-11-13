import { useEffect } from "react"
import { Navigate, Outlet } from "react-router"
import { useDispatch, useSelector } from "react-redux"

export const RequireAuth = ({allowedRoles}) => {

const {user}=useSelector(state=>state.user)

  return (
    user.filter(e=>e.id===allowedRoles)    ?
    <Outlet/>
    :
    <Navigate to="/"/>

  )
}
