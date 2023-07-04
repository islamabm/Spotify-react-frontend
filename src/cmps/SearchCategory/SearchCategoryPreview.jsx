import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import {
  setCurrCategoryBy,
  loadStations,
} from '../../store/actions/station.actions'

export function SearchCategoryPreview({ category }) {
  const navigate = useNavigate()

  const dispatch = useDispatch()

  function filterStationCategories(categoryName) {
    dispatch(setCurrCategoryBy(categoryName))
    navigate('/')
  }

  return (
    <article
      className="category-container"
      style={{ backgroundColor: category.color }}
      onClick={() => filterStationCategories(category.title)}
    >
      <img className="image" src={category.img} alt={category.title} />
      <h2>{category.title}</h2>
    </article>
  )
}
