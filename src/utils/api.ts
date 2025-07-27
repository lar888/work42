import axios from 'axios'
import type { UserInterface } from '../types/user.interface'

const API_URL = 'https://jsonplaceholder.typicode.com/users'

export const fetchData = async (): Promise<UserInterface[]> => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 2000))
    const response = await axios.get(API_URL)
    return response.data
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Error fetching data: ${error.message}`)
    }
    throw new Error('Unknown error occurred')
  }
}

export const fetchUserById = async (id: number): Promise<UserInterface> => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 2000))
    const response = await axios.get(`${API_URL}/${id}`)
    return response.data
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Error fetching user: ${error.message}`)
    }
    throw new Error('Unknown error occurred')
  }
}
