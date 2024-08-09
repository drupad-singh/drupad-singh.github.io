export type maybe<a> = a | undefined | null

export class Maybe {
  static fromMaybe<a>(maybe: maybe<a>, defaultV: a): a{
    if(maybe == null || maybe == undefined){
      return defaultV
    }
    return maybe
  }
  static isEmpty<a>(maybe: maybe<a>): boolean {
    if(maybe == null || maybe == undefined){
      return true
    }
    return false
  }
  static isNotEmpty<a>(a: maybe<a>) {
    return !this.isEmpty(a)
  } 
  static map<a>(maybe: maybe<a>, fn: (a: a) => a){
    if(maybe == null || maybe == undefined){
      return maybe
    }else{
      return fn(maybe)
    }
  }
}


