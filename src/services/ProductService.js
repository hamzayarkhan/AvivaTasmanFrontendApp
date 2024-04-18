import { _apiService } from './APIService'; // Assuming _apiService includes generic post, get, etc.
import { CATALOGUE_API_BASE_URL } from './APIConfig';


const ENDPOINTS = {
    fetchproducts: 'Product/FetchProducts',
};
  
export const ProductService = {
    async FetchProducts() {
        return await _apiService.get(CATALOGUE_API_BASE_URL,ENDPOINTS.fetchproducts);
      },
}


