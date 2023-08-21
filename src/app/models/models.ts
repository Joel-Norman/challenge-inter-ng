export interface Rubro{
    id?:number
    codigo?:string
    nombre?:string
}

export interface Producto{
    id?:number
   nombre?:string
   codigo?:string
   precio?:number
   rubro_id?:number
}

export interface Cliente{
    id?:number
    nombre?:string
    cuit?:string
    email?:string
    domicilio?:string
    telefono?:string
}

export interface Ventas{
    id?:number
    fecha?:string
    cliente_id?:number
    importe_total?:number
    observaciones?:string
    items?:Producto[]
}