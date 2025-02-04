import { HttpError } from '@infrastructure/api/HttpError.ts';
import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query';

export type Refetch<T> = (
  options?: RefetchOptions | undefined,
) => Promise<QueryObserverResult<T, HttpError>>;
