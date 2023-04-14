export interface Pizza {
    name: string;
    price: number;
    description?: string;
    image?: string;
  }
  
  export interface PizzaDocument extends Pizza {
    _id: string;
    __v: number;
  }