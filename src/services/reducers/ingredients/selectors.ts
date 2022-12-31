import { RootStore } from '../../../models'
import { name } from './actions'

export const loadingSelector = (state: RootStore) => state[name].isLoading
export const errorSelector = (state: RootStore) => state[name].hasError
export const ingredientsSelector = (state: RootStore) => state[name].data

export const getBun = (state: RootStore) => state[name].data.filter(item => item.type === 'bun')
export const getSauce = (state: RootStore) => state[name].data.filter(item => item.type === 'sauce')
export const getMain = (state: RootStore) => state[name].data.filter(item => item.type === 'main')
