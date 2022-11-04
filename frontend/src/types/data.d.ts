export interface File extends Blob {
    readonly lastModified: number
    readonly name: string
  }

export interface PROPS_AUTHEN {
    email: string
    password: string
    isLogin: boolean
}

export interface PROFILE {
    id: number
    userProfile: string
    name: string
    statusMessage: string
    description: string
    img: string
}
  
export interface USER {
    id: number
    userProfile: string
    name: string
    statusMessage: string
    description: string
    img: string
}
  
export interface POST {
    id: number
    userPost: string
    title: string
    description: string
    img: string
}