import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Edit, Expand, Trash2 } from 'lucide-react';
import Urls from "../../config/urls";
import { Checkbox } from './ui/checkbox';
import { Button } from './ui/button';
import http from '../lib/http';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const PropertyImageGallery = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showFullGallery, setShowFullGallery] = useState(false);
  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const toggleGallery = () => {
    setShowFullGallery(!showFullGallery);
  };

  return (
    <div className="relative group">
      <div className="relative w-16 h-16">
        <img
          src={`${Urls.baseURL}${images[currentImageIndex]}`}
          alt={`Property ${currentImageIndex + 1}`}
          className="w-16 h-16 object-cover rounded"
        />

        <div className="absolute bottom-0 right-0 bg-black bg-opacity-60 text-white text-xs px-1 rounded-bl rounded-tr">
          {currentImageIndex + 1}/{images.length}
        </div>

        <button
          onClick={toggleGallery}
          className="absolute top-0 right-0 bg-black bg-opacity-60 p-1 rounded-bl rounded-tr opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Expand size={12} className="text-white" />
        </button>
      </div>

      {images.length > 1 && (
        <>
          <button
            onClick={prevImage}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 p-1 rounded-r opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ChevronLeft size={12} className="text-white" />
          </button>

          <button
            onClick={nextImage}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 p-1 rounded-l opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ChevronRight size={12} className="text-white" />
          </button>
        </>
      )}

      {showFullGallery && (
        <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center" onClick={toggleGallery}>
          <div className="relative max-w-4xl max-h-screen p-4" onClick={e => e.stopPropagation()}>
            <img
              src={`${Urls.baseURL}${images[currentImageIndex]}`}
              alt={`Property ${currentImageIndex + 1}`}
              className="max-h-screen max-w-full object-contain"
            />

            <div className="flex mt-4 overflow-x-auto gap-2">
              {images.map((img, idx) => (
                <img
                  key={idx}
                  src={`${Urls.baseURL}${img}`}
                  alt={`Thumbnail ${idx + 1}`}
                  className={`w-16 h-16 object-cover cursor-pointer rounded ${idx === currentImageIndex ? 'ring-2 ring-blue-500' : ''}`}
                  onClick={() => setCurrentImageIndex(idx)}
                />
              ))}
            </div>

            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 p-2 rounded-full"
                >
                  <ChevronLeft size={24} className="text-white" />
                </button>

                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 p-2 rounded-full"
                >
                  <ChevronRight size={24} className="text-white" />
                </button>
              </>
            )}

            <button
              onClick={toggleGallery}
              className="absolute top-2 right-2 bg-black bg-opacity-70 p-2 rounded-full"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18M6 6L18 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <div className="absolute bottom-20 right-4 bg-black bg-opacity-60 text-white py-1 px-3 rounded">
              {currentImageIndex + 1} / {images.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Change to function that accepts handlers
export const columns = ({ onEdit }) => [
  // {
  //   id: "select",
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={table.getIsAllRowsSelected()}
  //       onCheckedChange={(value) => table.toggleAllRowsSelected(!!value)}
  //       aria-label="Select all"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => <div className="capitalize">{row.getValue("title")}</div>,
  },
  {
    accessorKey: "location",
    header: "Location",
    cell: ({ row }) => <div>{row.getValue("location")}</div>,
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => <div>₹{row.getValue("price").toLocaleString()}</div>,
  },
  {
    accessorKey: "area",
    header: "Area (sqft)",
    cell: ({ row }) => <div>{row.getValue("area")} sqft</div>,
  },
  {
    accessorKey: "bedrooms",
    header: "Bedrooms",
    cell: ({ row }) => <div>{row.getValue("bedrooms")}</div>,
  },
  {
    accessorKey: "bathrooms",
    header: "Bathrooms",
    cell: ({ row }) => <div>{row.getValue("bathrooms")}</div>,
  },
  {
    accessorKey: "propertyType",
    header: "Type",
    cell: ({ row }) => <div>{row.getValue("propertyType")}</div>,
  },
  {
    accessorKey: "images",
    header: "Images",
    cell: ({ row }) => (
      <PropertyImageGallery images={row.getValue("images")} />
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const queryClient = useQueryClient();

      const mutation = useMutation({
        mutationFn: async (id) => {
          try {
            const response = await http.delete(`${Urls.properties}/${id}`);
            return response.data;
          } catch (error) {
            console.error("Error deleting property:", error);
            throw error;
          }
        },
        onSuccess: (res) => {
          queryClient.invalidateQueries(["properties"]);
          alert("Property deleted successfully!");
        },
        onError: (error) => {
          console.error("Error deleting property:", error);
          alert("Failed to delete property. Please try again.");
        }
      });

      const handleEdit = () => {
        // Call the edit handler passed from the parent component
        if (onEdit) {
          onEdit(row.original);
        } else {
          console.warn("Edit handler not provided to columns");
        }
      };

      const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete this property?")) {
          console.log("Deleting property:", row.original._id);
          mutation.mutate(row.original._id);
        }
      };

      return (
        <div className="flex space-x-2">
          <Button size="sm" variant="outline" onClick={handleEdit}>
            <Edit size={16} />
          </Button>
          <Button size="sm" variant="destructive" onClick={handleDelete}>
            <Trash2 size={16} />
          </Button>
        </div>
      );
    },
  }
];

export default columns;