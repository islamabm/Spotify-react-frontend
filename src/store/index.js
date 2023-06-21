import thunk from 'redux-thunk'
import {
  applyMiddleware,
  combineReducers,
  compose,
  legacy_createStore as createStore,
} from 'redux'
import { stationReducer } from './reducers/station.reducer'
import { songReducer } from './reducers/song.reducer'
import { userReducer } from './reducers/user.reducer'
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const rootReducer = combineReducers({
  stationModule: stationReducer,
  userModule: userReducer,
  songReducer: songReducer,
})

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
)

window.gStore = store
