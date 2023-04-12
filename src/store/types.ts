import { IRootState } from './modules/user'
import { ThemeState } from './modules/theme'
import { AppState } from './modules/app'

// 根状态
export interface RootState {
  user: IRootState
  theme: ThemeState
  app: AppState
}
