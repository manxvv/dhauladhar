import React, { useState, useRef, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import DataTable from "../components/DataTable";
import { columns } from "../components/column";
import Modal from './Modal';
import { Button } from './ui/button';
import { useForm } from 'react-hook-form';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from './ui/textarea';
import { PlusCircle, Home, MapPin, DollarSign, Square, Bed, Bath, Image, X, Upload } from 'lucide-react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import http from '../lib/http';
import Urls from '../../config/urls';

export default function ListProperties() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);   
  const [isUploading, setIsUploading] = useState(false);
  const [editingProperty, setEditingProperty] = useState(null);
  const fileInputRef = useRef(null);
  
  const queryClient = useQueryClient();
  const { data: prop } = useQuery({
    queryKey: ['properties'],
    queryFn: async () => {
      const response = await http.get(`${Urls.baseURL}${Urls.properties}`)
      return response.data
    }
  });
  
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset, setValue } = useForm();
  
  useEffect(() => {
    if (editingProperty) {
      setValue("title", editingProperty.title);
      setValue("description", editingProperty.description);
      setValue("price", editingProperty.price);
      setValue("location", editingProperty.location);
      setValue("area", editingProperty.area);
      setValue("bedrooms", editingProperty.bedrooms);
      setValue("bathrooms", editingProperty.bathrooms);
      setValue("propertyType", editingProperty.propertyType);
      
      if (editingProperty.images && editingProperty.images.length > 0) {
        const existingImages = editingProperty.images.map((imagePath, index) => ({
          file: null, 
          preview: `${Urls.baseURL}${imagePath}`,
          existingPath: imagePath, 
          name: `existing-image-${index}`
        }));
        setSelectedImages(existingImages);
      } else {
        setSelectedImages([]);
      }
    }
  }, [editingProperty, setValue]);
  const PropertyMutation = useMutation({
    mutationFn: async (data) => {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (!['imageFiles', 'existingImages'].includes(key)) {
          formData.append(key, value);
        }
      });
      data.imageFiles?.forEach((file) => formData.append('images', file));
      if (data.existingImages?.length) {
        formData.append('existingImages', JSON.stringify(data.existingImages));
      }
      console.log("coming3");
      for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }
      const url = editingProperty 
        ? `${Urls.properties}/${editingProperty._id}` 
        : `${Urls.properties}`;
  
      const response = await (editingProperty ? http.put(url, formData) : http.post(url, formData));
  console.log(response,"response");
  
      console.log("API Response:", response);
      return response.data;
    },
    onSuccess: (data) => {
      console.log(data,"dddddddd");
      
      queryClient.invalidateQueries(["properties"]);
      alert(editingProperty ? "Property updated successfully!" : "Property added successfully!");
    },
    onError: (error) => {
      console.error(editingProperty ? "Error updating property:" : "Error adding property:", error);
      alert(editingProperty ? "Failed to update property. Please try again." : "Failed to add property. Please try again.");
    }
  });
  
  
  const handleFileSelect = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      const files = Array.from(event.target.files);
      
      const newImages = files.map(file => ({
        file,
        preview: URL.createObjectURL(file),
        name: file.name 
      }));
      
      setSelectedImages(prev => [...prev, ...newImages]);
    }
  };

  const removeImage = (index) => {
    setSelectedImages(prev => {
      const newImages = [...prev];
      // Revoke the object URL to avoid memory leaks
      if (!newImages[index].existingPath) {
        URL.revokeObjectURL(newImages[index].preview);
      }
      newImages.splice(index, 1);
      return newImages;
    });
    
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  
  const onSubmit = (data) => {
    console.log("coming4", data);
    const propertyData = {
      ...data,
      description: data.description || "no description",
      imageFiles: selectedImages.map(img => img.file).filter(Boolean),
      existingImages: selectedImages.map(img => img.existingPath).filter(Boolean),
    };
  
    console.log("coming5", propertyData);
    setIsUploading(true);
  
    PropertyMutation.mutate(propertyData, {
      onSuccess: (updatedData) => {
        console.log("coming6 - API Response:", updatedData);
        setIsModalOpen(false);
        setSelectedImages([]);
        reset();
        setIsUploading(false);
        setEditingProperty(null);
        queryClient.invalidateQueries(["properties"]);
      },
      onError: (error) => {
        console.error(editingProperty ? "Error updating property:" : "Error adding property:", error);
        alert(editingProperty ? "Failed to update property." : "Failed to add property.");
      },

    });
  };
  
  
  const closeModal = () => {
    selectedImages.forEach(img => {
      if (!img.existingPath && img.preview) {
        URL.revokeObjectURL(img.preview);
      }
    });
    setSelectedImages([]);
    
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    
    reset();
    setIsModalOpen(false);
    setEditingProperty(null); 
  };
  
  const handleEditProperty = (property) => {
    setEditingProperty(property);
    setIsModalOpen(true);
  };

  const columnsWithHandlers = columns({ onEdit: handleEditProperty });

  return (
    <div className="flex flex-1">
      <div className="p-2 md:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-4 flex-1 w-full h-full">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-3xl font-bold">List Properties</h1>
          <Button
            onClick={() => {
              setEditingProperty(null); // Ensure we're not in edit mode
              setIsModalOpen(true);
            }}
            className="bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-2"
          >
            <PlusCircle size={18} />
            Add Property
          </Button>
        </div>
        <Outlet />
        <DataTable data={prop || []} columns={columnsWithHandlers} />
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Home className="h-5 w-5 text-emerald-500" />
              <Label htmlFor="title" className="text-lg font-medium">
                {editingProperty ? 'Edit Property' : 'Property Title'}
              </Label>
            </div>
            <Input
              id="title"
              {...register("title", { required: "Title is required" })}
              placeholder="E.g., Luxury Villa with Ocean View"
              className="border-emerald-300 focus:border-emerald-500 focus:ring-emerald-500"
            />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-lg font-medium">Description</Label>
            <textarea
              id="description"
              {...register("description")}
              placeholder="Provide a detailed description of the property..."
              rows={4}
              className="w-full min-h-[100px] resize-none rounded-md border-2 border-emerald-300 bg-white p-3 text-base shadow-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-300 dark:border-emerald-600 dark:bg-emerald-800 dark:text-white dark:focus:border-emerald-400"
            />
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-emerald-500" />
                <Label htmlFor="price" className="text-lg font-medium">Price</Label>
              </div>
              <Input
                id="price"
                type="number"
                {...register("price", {
                  required: "Price is required",
                  min: { value: 1, message: "Price must be positive" }
                })}
                placeholder="Price in ₹"
                className="border-emerald-300 focus:border-emerald-500 focus:ring-emerald-500"
              />
              {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>}
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-emerald-500" />
                <Label htmlFor="location" className="text-lg font-medium">Location</Label>
              </div>
              <Input
                id="location"
                {...register("location", { required: "Location is required" })}
                placeholder="City, State or Region"
                className="border-emerald-300 focus:border-emerald-500 focus:ring-emerald-500"
              />
              {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location.message}</p>}
            </div>
          </div>

          <div className="bg-emerald-50 dark:bg-neutral-800 p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-4">Property Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Square className="h-5 w-5 text-emerald-500" />
                  <Label htmlFor="area" className="font-medium">Area (sq ft)</Label>
                </div>
                <Input
                  id="area"
                  type="number"
                  {...register("area", {
                    required: "Area is required",
                    min: { value: 1, message: "Area must be positive" }
                  })}
                  placeholder="Total area"
                  className="border-emerald-300 focus:border-emerald-500 focus:ring-emerald-500"
                />
                {errors.area && <p className="text-red-500 text-sm mt-1">{errors.area.message}</p>}
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Bed className="h-5 w-5 text-emerald-500" />
                  <Label htmlFor="bedrooms" className="font-medium">Bedrooms</Label>
                </div>
                <Input
                  id="bedrooms"
                  type="number"
                  {...register("bedrooms", {
                    required: "Number of bedrooms is required",
                    min: { value: 0, message: "Must be 0 or more" }
                  })}
                  className="border-emerald-300 focus:border-emerald-500 focus:ring-emerald-500"
                />
                {errors.bedrooms && <p className="text-red-500 text-sm mt-1">{errors.bedrooms.message}</p>}
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Bath className="h-5 w-5 text-emerald-500" />
                  <Label htmlFor="bathrooms" className="font-medium">Bathrooms</Label>
                </div>
                <Input
                  id="bathrooms"
                  type="number"
                  {...register("bathrooms", {
                    required: "Number of bathrooms is required",
                    min: { value: 0, message: "Must be 0 or more" }
                  })}
                  className="border-emerald-300 focus:border-emerald-500 focus:ring-emerald-500"
                />
                {errors.bathrooms && <p className="text-red-500 text-sm mt-1">{errors.bathrooms.message}</p>}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Home className="h-5 w-5 text-emerald-500" />
              <Label htmlFor="propertyType" className="text-lg font-medium">Property Type</Label>
            </div>
            <select
              id="propertyType"
              className="w-full p-2 border border-emerald-300 rounded-md focus:border-emerald-500 focus:ring-emerald-500"
              {...register("propertyType", { required: "Property type is required" })}
            >
              <option value="">Select property type</option>
              <option value="Apartment">Apartment</option>
              <option value="House">House</option>
              <option value="Villa">Villa</option>
              <option value="Plot">Plot</option>
              <option value="Commercial">Commercial</option>
              <option value="Land">Land</option>
            </select>
            {errors.propertyType && <p className="text-red-500 text-sm mt-1">{errors.propertyType.message}</p>}
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Image className="h-5 w-5 text-emerald-500" />
              <Label htmlFor="images" className="text-lg font-medium">Property Images</Label>
            </div>
            
            <div className="border-2 border-dashed border-emerald-300 rounded-lg p-6 text-center hover:border-emerald-500 transition cursor-pointer bg-emerald-50 dark:bg-emerald-800 dark:border-emerald-700"
                 onClick={() => fileInputRef.current.click()}>
              <Upload className="h-10 w-10 text-emerald-500 mx-auto mb-2" />
              <p className="text-emerald-700 dark:text-emerald-300">Click to upload images or drag and drop</p>
              <p className="text-emerald-500 dark:text-emerald-400 text-sm mt-1">Supported formats: JPG, PNG, WEBP</p>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/jpeg,image/png,image/webp"
                onChange={handleFileSelect}
                className="hidden"
                key={selectedImages.length} // This forces React to recreate the input when images change
              />
            </div>
            
            {selectedImages.length > 0 && (
              <div className="mt-4">
                <p className="font-medium mb-2">Selected Images ({selectedImages.length})</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {selectedImages.map((img, index) => (
                    <div key={index} className="relative group">
                      <div className="aspect-square rounded-md overflow-hidden border border-emerald-300">
                        <img 
                          src={img.preview} 
                          alt={`Property image ${index + 1}`} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md opacity-90 hover:opacity-100"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t border-emerald-200 dark:border-emerald-700 mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={closeModal}
              className="border-emerald-300 text-emerald-700 hover:bg-emerald-50 dark:border-emerald-600 dark:text-emerald-300 dark:hover:bg-emerald-800"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
              disabled={isSubmitting || isUploading}
            >
              {isSubmitting || isUploading ? (editingProperty ? "Updating..." : "Saving...") : (editingProperty ? "Update Property" : "Save Property")}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}