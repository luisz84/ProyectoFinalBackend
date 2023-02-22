import {promises as fs} from 'fs';
import  {nanoid}  from 'nanoid';

 class ProductManager {
    constructor(){
        this.path= "./src/controllers/models/products.json"
    }

    readProducts=async()=>{
        let products=  await fs.readFile(this.path, "utf-8")
        return JSON.parse(products)     
    }
    
    writeProducts= async(product)=>{
        await fs.writeFile(this.path, JSON.stringify(product))
    }
    exist= async(id)=>{
        let products= await this.readProducts();
        return  products.find(product=> product.id=== id)
    }
    
    addProducts= async(product) =>{
        let productsOld= await this.readProducts()
        product.id= nanoid(10)  
        let productAll = [...productsOld, product]
        await this.writeProducts(productAll)
        return "producto Agregado"
        
        return "producto agregado";
    }
    getProducts= async() =>{
        return await this.readProducts()
    }

    getProductsById= async(id) =>{
         
        let productById= await this.exist(id)
        if (!productById) return "producto no encontrado"
        return productById
    }

    updateProducts= async(id,product)=>{
        let productById= await this.exist(id)
        await this.deleteProducts(id)
        let productOld= await this.readProducts()
        let products= [{...product,id:id}, ...productOld]
        await this.readProducts(products)
    }
    deleteProducts= async(id) =>{
        let products= await this.readProducts()
        let existeProducts= products.some(prod => prod.id=== id)
        if(existeProducts){
        let filterProducts= products.filter(prod=> prod.id != id)
        await this.writeProducts(filterProducts)
        return "producto eliminado"
        }
        return "Producto a eliminar no existe"
    }
}

export default ProductManager



