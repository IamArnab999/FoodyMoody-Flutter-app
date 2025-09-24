'use client';

import { useState, useEffect } from 'react';
import type { Bloc } from '@/lib/bloc/bloc.base';

export function useBloc<T>(bloc: Bloc<T>): T {
  const [state, setState] = useState(bloc.currentState);

  useEffect(() => {
    const subscription = (newState: T) => {
      setState(newState);
    };
    bloc.subscribe(subscription);
    return () => {
      bloc.unsubscribe(subscription);
    };
  }, [bloc]);

  return state;
}
