import axios from 'axios'
import conf from './conf.json'
import { ImgProps } from './context/context'

const API_URL = conf.API_URL
const IMG_URL = conf.IMG_URL

export const fetchPlacesList = async (latitude: number, longitude: number, distance: number, search: string) => {
    const result = await axios.get(`${API_URL}/places/${latitude || 0}/${longitude || 0}/${distance || 0}/${search || ''}`)
    return result.data
}

export const fetchPlaceImg = async (id: number) => {
    const result = await axios.get(`${API_URL}/place/${id}/img`)
    return result.data.map((img: ImgProps) => {
        return {
            id: img.id,
            path: `${IMG_URL}/${img.path}`
        }
    })
}