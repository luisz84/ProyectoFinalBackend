import {promises as fs} from 'fs';
import  {nanoid}  from 'nanoid';
import ProductManager from './ProductManager.js';

const productAll= new ProductManager 

class CartManager 
{
    
     constructor(){
        this.path = "./src/controllers/models/carts.json"
     } 
     
     readCarts=async()=>{
        let carts=  await fs.readFile(this.path, "utf-8")
        return JSON.parse(carts)     
    }
    
    writeCarts= async(carts)=>{
        await fs.writeFile(this.path, JSON.stringify(carts))
    }
    exist= async(id)=>{
        let carts= await this.readCarts();
        return  carts.find(cart => cart.id=== id)
    }

    addCarts = async (carts)=>{
        let cartsOld = await this.readCarts(carts); 
        let id = nanoid()
        let cartsConcat= [{id:id, product:[]},...cartsOld]
        await this.writeCarts(cartsConcat)
        return "Carrito Agregado"
    }
    getCartsById= async(id) =>{
        let cartById= await this.exist(id)
        if (!cartById)  return "Carrito no encontrado"
        return cartById
        console.log(cartById)
       
    }
    addProductInCart= async(cartId, productId) => {
        let cartById= await this.exist(cartId)
        if (!cartById)  return "Carrito no encontrado"
        let productById= await productAll.exist(productId)
        if (!cartById)  return "Producto no encontrado"

        let cartsAll= await this.readCarts()
        let cartFilter= cartsAll.filter(cart=> cart.id !=cartId)

        if(cartById.products.some((prod) => prod.id === productId)){
            let productInCart =cartById.products.find(prod=> prod.id === productId);
            productInCart.cantidad++
            let cartsConcat= [productInCart,...cartFilter]
            await this.writeCarts(cartsConcat)
            return "producto sumado al carrito"

        }
        
        cartById.products.push({id:productById.id, cantidad: 1 })
        let cartsConcat= [cartById,...cartFilter]
        await this.writeCarts(cartsConcat)
        return "producto agregado al carrito"
        
        }
}
        export default CartManager
         
                 
        

       
        // }



        // let carFilter= cartsAll.filter(prod => prod.id != productId)

        //  let carConcat= [{id:cartId,products:[{id:productById.id, cantidad: 1 }]},...carFilter]   

        //  await this.writeCarts(cartsConcat)
        //  return "producto agregado al carrito"
