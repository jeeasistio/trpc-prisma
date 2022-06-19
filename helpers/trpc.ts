import { createReactQueryHooks } from '@trpc/react'
import { inferProcedureInput, inferProcedureOutput } from '@trpc/server';
import type { AppRouter } from '../pages/api/trpc/[trpc]'

export const trpc = createReactQueryHooks<AppRouter>()

export type TQuery = keyof AppRouter['_def']['queries'];

export type InferQueryInput<TRouteKey extends TQuery> = inferProcedureInput<AppRouter['_def']['queries'][TRouteKey]>;

export type InferQueryOutput<TRouteKey extends TQuery> = inferProcedureOutput<AppRouter['_def']['queries'][TRouteKey]>;