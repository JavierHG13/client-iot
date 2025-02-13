import { useState, useEffect } from 'react'
import api from '../services/axios'

interface Product {
    _id: string
    nombre: string
    descripcion: string
    precio: number
    stock: number
    categoria: string
    imagen: string[]
    disponible: boolean
} 

const useProducts = () => {
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {

        const fetchProducts = async () => {
            try {
                const response = await api.get('/productos');

                const data = response.data;
                //console.log(data);

                setProducts(data)
            } catch (err) {
                console.log('Error al cargar los productos:', err)
                setError('Error al cargar los productos')
            } finally {
                setLoading(false)
            }
        }

        fetchProducts()
    }, [])

    const getProductById = async (id: string): Promise<Product | null> => {
        try {
            return await api.get(`/productos/${id}`)

        } catch (err) {
            console.log("Error al cargar el producto:", err)
            setError('Producto no encontrado')
            return null
        }
    }

    return { products, loading, error, getProductById }
}

export default useProducts