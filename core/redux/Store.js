/** === IMPORT PACKAGE === */
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import { createLogger } from 'redux-logger';
/** === IMPORT EXTERNAL FUNCTION === */
import { rootReducer } from '@reducers';
import sagas from '@sagas';
/** === SET PERSISTS === */
const config = {
  key: 'root',
  storage: AsyncStorage,
};
/** === SET LOGGER === */
const logger = createLogger({
  duration: true,
  timestamp: true,
  whitelist: ['permanent'],
  // diff: true,
  logErrors: true,
});
/** === VARIABLE === */
const reducers = persistReducer(config, rootReducer);
const sagaMiddleware = createSagaMiddleware();
const middleware = [];
middleware.push(sagaMiddleware);
/** === SET LOG IF DEV === */
if (__DEV__) {
  middleware.push(logger);
}
/** === SET MIDDLEWARE TO REDUX === */
const enhancers = [applyMiddleware(...middleware)];
const Store = createStore(reducers, undefined, compose(...enhancers));
const persistConfig = { enhancers };
const Persistor = persistStore(Store, persistConfig, () => {});
/** === RUN SAGA AFTER SET TO REDUX === */
sagaMiddleware.run(sagas);

export { Store, Persistor };
/**
 * ================================================================
 * NOTES
 * ================================================================
 * createdBy: hasapu (team)
 * createDate: 01022021
 * updatedBy: -
 * updatedDate: -
 * updatedFunction/Component:
 * -> NaN (no desc)
 * -> NaN (no desc)
 */
