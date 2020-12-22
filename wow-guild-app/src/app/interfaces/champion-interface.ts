export interface Champion {
    name: string,
    race: string,
    class: string,
    spec: string,
    level: number,
    gender: string,
    primaryProfs?: object,
    secondaryProfs?: object,
    userId: string,
    id: string,
    guild?: string,
    role: string
}