// export interface File extends Blob {
//     readonly lastModified: number
//     readonly name: string
//   }

export interface PROPS_AUTHEN {
    email: string
    password: string
    isLogin: boolean
}

export interface PROFILE {
    id: number
    userProfile: number
    name: string
    statusMessage: string
    description: string
    img: string
}
  
export interface USER {
    id: number
    userProfile: number
    name: string
    statusMessage: string
    description: string
    img: string
}
  
export interface POST {
    id: number
    userPost: number
    title: string
    description: string
    img: string
}

export interface COMMENT {
    id: number
    sentence: string
    comment?: number | undefined
    post?: number | undefined
    create_at?: number | undefined
}

export interface LIKE {
    id: number
    userLike: number
    postLike: number
  }

export interface NEW_POST {
    id: number
    userPost: number
    title: string
    description: string
    img: FILE
}