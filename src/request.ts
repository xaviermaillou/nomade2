import axios from 'axios'

const API_URL = 'http://localhost:8000'

export const fetchPlacesList = async (latitude?: number, longitude?: number, distance?: number, search?: string) => {
    const result = await axios.get(`${API_URL}/places/${latitude || 0}/${longitude || 0}/${distance || 0}/${search || ''}`)
    return result.data
}