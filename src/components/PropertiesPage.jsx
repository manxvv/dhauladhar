import React, { useState } from 'react';
import { Search, MapPin, Filter } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Urls from '../../config/urls';
import Layout from '../layout';
import { Button } from './ui/button';

export default function PropertiesPage() {
  const { data: propertiesData, isLoading } = useQuery({
    queryKey: ['properties'],
    queryFn: async () => {
      const response = await axios.get(`${Urls.baseURL}${Urls.properties}`);
      return response.data;
    }
  });

  const [filters, setFilters] = useState({
    location: '',
    type: '',
    minPrice: '',
    maxPrice: ''
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const filteredProperties = propertiesData ? propertiesData.filter((property) => {
    return (
      (!filters.location || property.location.toLowerCase().includes(filters.location.toLowerCase())) &&
      (!filters.type || property.propertyType.toLowerCase() === filters.type.toLowerCase()) &&
      (!filters.minPrice || property.price >= parseInt(filters.minPrice)) &&
      (!filters.maxPrice || property.price <= parseInt(filters.maxPrice))
    );
  }) : [];

  return (
    <Layout>
      <div className='container mt-16 mx-auto px-4 py-8'>
        <div className='bg-white shadow-md rounded-lg p-6 mb-8'>
          <h1 className='text-3xl font-bold mb-6 text-emerald-800'>Property Search</h1>
          <div className='grid md:grid-cols-4 gap-4 mb-6'>
            <div className='relative'>
              <select 
                name='location'
                value={filters.location}
                onChange={handleFilterChange}
                className='w-full p-2 border rounded'
              >
                <option value=''>All Locations</option>
                <option value='Bir'>Bir</option>
                <option value='Palampur'>Palampur</option>
                <option value='Dharamshala'>Dharamshala</option>

              </select>
              <MapPin className='absolute right-3 top-3 text-emerald-500' size={20} />
            </div>
            <div className='relative'>
              <select 
                name='type'
                value={filters.type}
                onChange={handleFilterChange}
                className='w-full p-2 border rounded'
              >
                <option value=''>Property Type</option>
                <option value='House'>House</option>
              </select>
              <Filter className='absolute right-3 top-3 text-emerald-500' size={20} />
            </div>
            <div>
              <input 
                type='number'
                name='minPrice'
                value={filters.minPrice}
                onChange={handleFilterChange}
                placeholder='Min Price'
                className='w-full p-2 border rounded'
              />
            </div>
            <div>
              <input 
                type='number'
                name='maxPrice'
                value={filters.maxPrice}
                onChange={handleFilterChange}
                placeholder='Max Price'
                className='w-full p-2 border rounded'
              />
            </div>
          </div>

        </div>

        {isLoading ? (
          <div className='text-center text-emerald-600 py-8'>Loading properties...</div>
        ) : (
          <div className='grid md:grid-cols-3 gap-6'>
            {filteredProperties.map((property) => (
              <div 
                key={property.id} 
                className='bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition'
              >
                <img src={`${Urls.baseURL}${property.images[0]}`} alt={property.title} className='w-full h-48 object-cover' />
                <div className='p-6'>
                  <h2 className='text-xl font-semibold mb-2'>{property.title}</h2>
                  <p className='text-emerald-600 mb-4'>{property.location} | {property.propertyType}</p>
                  <p>Area: {property.area} sqft</p>
                  <p className='font-bold text-emerald-600'>₹ {property.price.toLocaleString()}</p>
                  <p className='text-emerald-700 mt-2'>{property.description}</p>
                </div>
                  
                <div className=''>
            <Button>View Details</Button>
                </div>
              </div>
            ))}

          </div>
        )}
        {filteredProperties.length === 0 && !isLoading && (
          <div className='text-center text-emerald-600 py-8'>No properties found matching your search criteria.</div>
        )}
      </div>
    </Layout>
  );
}