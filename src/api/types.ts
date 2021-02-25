export type ResponseData = {
    confirmed: {
        value: number
    }

    recovered: {
        value: number
    }

    deaths: {
        value: number
    }
    lastUpdate?: Date
    country?: string
}