export interface File extends Blob {
    readonly lastModified: number
    readonly name: string
  }
  /*authSlice.ts*/
export interface PROPS_AUTHEN {
    email: string
    password: string
    isLogin: boolean
}
  
export interface USER {
    id: number
    name: string
    statusMessage: string
    description: string
    img: string
}
  
export interface PROPS_NAME {
    name: string
}
  
export interface POST {
    id: number
    title: string
    description: string
    img: string
}