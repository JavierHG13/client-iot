import { useState, useEffect } from 'react'
import mockApi from '../services/mockApi'

interface Product {
    id: string
    name: string
    description: string
    price: number
    stock: number
    category: string
    image: string
}

const useProducts = () => {
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await mockApi.products.getAll()
                
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
            return await mockApi.products.getById(id)
        } catch (err) {
            console.log("Error al cargar el producto:", err)
            setError('Producto no encontrado')
            return null
        }
    }

    return { products, loading, error, getProductById }
}

export default useProducts