export class User{
    constructor(public email: string, 
                public id: string, 
                private _token: string, 
                private _tokenExpirationDate: Date){

    }

    // UN GETTER PARECE UNA FUNCIÓN PERO REALMENTE FUNCIONA DE FORMA QUE SE ACCEDE COMO UNA PROPIEDAD
    // ES IGUAL A HACER POR EJEMPLO: user.token 
    // EL VALOR NO PUEDE SER MODIFICADO
    get token(){
        if(!this._tokenExpirationDate || new Date() > this._tokenExpirationDate){
            return;
        }
        return this._token;
    }
}