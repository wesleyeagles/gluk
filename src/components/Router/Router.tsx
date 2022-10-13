import { Routes, Route } from "react-router-dom"
import { Categories } from "../../pages/Categories"
import { Category } from "../../pages/Category"
import { Clients } from "../../pages/Clients"
import { CreateCategory } from "../../pages/CreateCategory"
import { Home } from "../../pages/Home"
import { PDV } from "../../pages/PDV"
import { Product } from "../../pages/Product"
import { Products } from "../../pages/Products"

export const Router = () => {
    return (
        <Routes>
            <Route element={<Home />} path='/' />
            <Route element={<PDV />} path='/pdv' />
            <Route element={<Clients />} path='/clientes' />
            <Route element={<Categories />} path='/categorias' />
            <Route element={<CreateCategory />} path='/categorias/criar-categoria' />
            <Route element={<Category />} path='/categorias/:name' />
            <Route element={<Product />} path='/produtos/:name' />
            <Route element={<Products />} path='/produtos' />
        </Routes>
    )
}