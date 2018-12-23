export default interface Task<T>{
  perform():Promise<T>;
}
