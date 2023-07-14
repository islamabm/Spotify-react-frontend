import { memo, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router'
import { StationPreview } from './StationPreview'
import { setCurrCategoryBy } from '../store/actions/station.actions'
import { useSelector } from 'react-redux'

function _StationList({ stations }) {
  const [stationsCategory, setStationsCategory] = useState([])

  const category = useSelector(
    (storeState) => storeState.stationModule.categoryBy
  )

  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  function categorizedStations() {
    const category = stations?.reduce((acc, station) => {
      station?.tags.forEach((tag) => {
        if (!acc[tag]) {
          acc[tag] = []
        }
        acc[tag].push(station)
      })
      return acc
    }, {})
    return Object.entries(category)
  }

  useEffect(() => {
    setStationsCategory(categorizedStations())
  }, [])

  function goToTagList(tag) {
    dispatch(setCurrCategoryBy(tag))
    navigate('/search/category')
  }

  return (
    <section className={`station-list-container`}>
      {stationsCategory.map(([tag, stationTag]) => (
        <>
          <h3 className="category-tag pointer" onClick={() => goToTagList(tag)}>
            {tag}
          </h3>
          <section className={`station-list`}>
            {stationTag.map((station, idx) => (
              <StationPreview key={idx} station={station} />
            ))}
          </section>
        </>
      ))}
    </section>
  )
}

export const StationList = memo(_StationList)
