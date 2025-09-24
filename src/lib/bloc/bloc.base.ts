export abstract class Bloc<T> {
  private _state: T;
  private _listeners: Set<(state: T) => void> = new Set();

  constructor(initialState: T) {
    this._state = initialState;
  }

  public get currentState(): T {
    return this._state;
  }

  protected emit(newState: T) {
    this._state = newState;
    this._listeners.forEach(listener => listener(newState));
  }

  public subscribe(listener: (state: T) => void): void {
    this._listeners.add(listener);
    listener(this._state);
  }

  public unsubscribe(listener: (state: T) => void): void {
    this._listeners.delete(listener);
  }

  public dispose(): void {
    this._listeners.clear();
  }
}
