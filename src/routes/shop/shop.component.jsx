import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Route, Routes } from 'react-router-dom'

import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils.js'

import { setCategoriesMap } from '../../store/categories/categories.actions'

import CategoriesPreview from '../categories-preview/categories-preview.component'

import Category from '../category/category.component'

const Shop = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoryMap = await getCategoriesAndDocuments()
      dispatch(setCategoriesMap(categoryMap))
    }

    getCategoriesMap()
  }, [dispatch])
  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=':category' element={<Category />} />
    </Routes>
  )
}

export default Shop
