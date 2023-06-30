import React, { useEffect } from 'react'
import { SearchCategorieList } from '../cmps/SearchCategorieList'
import { useDispatch, useSelector } from 'react-redux'
import { loadSearchStations } from '../store/actions/station.actions'
export default function Search() {
  const categories = useSelector(
    (storeState) => storeState.stationModule.searchStations
  )

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadSearchStations())
  }, [])

  if (!categories) return <div className="loader"></div>
  return (
    <div className="categories-index">
      <h2 className="search-header">Browse all</h2>
      <SearchCategorieList categories={categories} />
    </div>
  )
}
