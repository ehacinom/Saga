import { createStore, applyMiddleware, compose } from 'redux'
import { autoRehydrate } from 'redux-persist'
import Config from '../Config/DebugConfig'
import RehydrationServices from '../Utils/RehydrationServices'
import ReduxPersist from '../Config/ReduxPersist'
import thunkMiddleWare from 'redux-thunk'

// creates the store
export default (rootReducer, rootSaga) => {
  /* ------------- Redux Configuration ------------- */

  const middleware = []
  const enhancers = []

  /* ------------- thunkMiddleWare ------------- */

  middleware.push(thunkMiddleWare)

  // /* ------------- Saga Middleware ------------- */
  //
  // const sagaMonitor = Config.useReactotron ? console.tron.createSagaMonitor() : null
  // const sagaMiddleware = createSagaMiddleware({ sagaMonitor })
  // middleware.push(sagaMiddleware)

  /* ------------- Assemble Middleware ------------- */

  enhancers.push(applyMiddleware(...middleware))

  /* ------------- AutoRehydrate Enhancer ------------- */

  // add the autoRehydrate enhancer
  if (ReduxPersist.active) {
    enhancers.push(autoRehydrate())
  }

  // if Reactotron is enabled (default for __DEV__), we'll create the store through Reactotron
  const createAppropriateStore = Config.useReactotron ? console.tron.createStore : createStore
  const store = createAppropriateStore(rootReducer, compose(...enhancers))

  // configure persistStore and check reducer version number
  if (ReduxPersist.active) {
    RehydrationServices.updateReducers(store)
  }

  // // kick off root saga
  // sagaMiddleware.run(rootSaga)

  return store
}
