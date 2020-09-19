class AxiosConfig {

    headers: any

    constructor() {
        this.headers = {}
    }


    addAuthorizationHeader(token?: string): AxiosConfig {

        this.headers.Authorization = `Bearer ${token}`

        return this

    }
}

export default AxiosConfig