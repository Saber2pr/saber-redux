/*
 * @Author: saber2pr
 * @Date: 2019-06-06 20:01:03
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-06-06 21:00:35
 */
export interface Action<T = any> {
  type: T
}

export interface AnyAction extends Action {
  [extraProps: string]: any
}

export interface Reducer<S, A extends Action = AnyAction> {
  (state: S, action: A): S
}

export type ReducersMapObject<S, A extends Action = AnyAction> = {
  [K in keyof S]: Reducer<S[K], A>
}

export interface MiddlewareAPI<S> {
  dispatch<A extends AnyAction>(action: A): A
  dispatch(action: (api: MiddlewareAPI<S>) => void): void

  getState(): S

  subscribe(listener: () => void): () => void
}

export type Middleware = <S>(
  api: MiddlewareAPI<S>
) => (next: MiddlewareAPI<S>['dispatch']) => MiddlewareAPI<S>['dispatch']

export type ApplyMiddleware = <S>(
  ...middlewares: Middleware[]
) => (store: MiddlewareAPI<S>) => MiddlewareAPI<S>

export type Thunk = <S>(
  api: MiddlewareAPI<S>
) => (next: MiddlewareAPI<S>['dispatch']) => MiddlewareAPI<S>['dispatch']