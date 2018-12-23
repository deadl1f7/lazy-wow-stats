
export default interface Handler<T>{
  handle(param:T[]):Promise<void>;
}
