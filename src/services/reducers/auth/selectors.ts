import { RootStore } from '../../../models'
import { name } from './actions'

export const authSelector = (state: RootStore) => state[name]
export const userSelector = (state: RootStore) => state[name].user
