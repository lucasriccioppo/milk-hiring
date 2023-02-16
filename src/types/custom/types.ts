export interface IFarmer {
    firstName: string,
    lastName: string,
    email: string,
    password: string
}

export interface IFarm {
    name: string,
    owner: string
}

export interface IProduction {
    quantity: number,
    farm: string
}