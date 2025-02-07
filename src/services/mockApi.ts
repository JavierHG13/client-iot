interface User {
    id: string
    name: string
    email: string
    role: 'user' | 'admin' | 'employee' | 'owner'
    password: string
    avatar?: string
    deviceId?: string
  }
  
  interface Product {
    id: string
    name: string
    description: string
    price: number
    stock: number
    category: string
    image: string
  }
  
  interface AquariumData {
    temperature: number
    pH: number
    waterLevel: number
    status: 'connected' | 'disconnected'
  }
  
  const mockUsers: User[] = [
    {
      id: '1',
      name: 'Jaier Hernandez',
      email: '20230077@uthh.edu.mx',
      role: 'user',
      password: '123456',
      avatar: 'https://www.shutterstock.com/image-vector/astronaut-dancing-showing-victory-gesture-600nw-2406465085.jpg',
      deviceId: 'iot-123'
    },
    // Más usuarios...
  ]
  
  const mockProducts: Product[] = [
    {
      id: 'p1',
      name: 'Sensor de Temperatura',
      description: 'Sensor preciso para acuarios',
      price: 29.99,
      stock: 50,
      category: 'sensores',
      image: 'https://via.placeholder.com/150'
    },
    // Más productos...
  ]
  
  const mockAquariumData: AquariumData = {
    temperature: 26.5,
    pH: 7.2,
    waterLevel: 80,
    status: 'connected'
  }
  
  const mockApi = {
    auth: {
      login: (credentials: { email: string; password: string }): Promise<{ token: string; user: User }> => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            // Buscar usuario por email
            const user = mockUsers.find(u => u.email === credentials.email)
            
            // Simular validación de contraseña
            if (user && credentials.password === '123456') {
              resolve({
                token: 'mock-token',
                user
              })
            } else {
              reject(new Error('Credenciales inválidas'))
            }
          }, 1000) // Simular delay de red
        })
      },
  
      me: (): Promise<User> => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3YTAzZjQ0NTVmODg1ZGY4MTU0Y2QwYyIsImlhdCI6MTczODU2MjQ1NSwiZXhwIjoxNzM4NjQ4ODU1fQ.pCEsBINJyyRgbDt0WuP8uJmmujbJ8f-ZMs521BA1jts"
            if (token) {
              const user = mockUsers[0] // Simular usuario logueado
              resolve(user)
            } else {
              reject(new Error('No autenticado'))
            }
          }, 800)
        })
      }
    },
  
    products: {
      getAll: (): Promise<Product[]> => {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(mockProducts)
          }, 1200)
        })
      },
      getById: (id: string): Promise<Product> => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            const product = mockProducts.find(p => p.id === id)
            if (product) {
              resolve(product)
            } else {
              reject(new Error('Producto no encontrado'))
            }
          }, 800)
        })
      }
    },
  
    iot: {
      getStatus: (deviceId: string): Promise<AquariumData> => {

        console.log(deviceId)

        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(mockAquariumData)
          }, 500)
        })
      },
      updateSettings: (settings: { temperature?: number }): Promise<void> => {
        return new Promise((resolve) => {
          setTimeout(() => {
            if (settings.temperature) {
              mockAquariumData.temperature = settings.temperature
            }
            resolve()
          }, 800)
        })
      }
    }
  }
  
  export default mockApi