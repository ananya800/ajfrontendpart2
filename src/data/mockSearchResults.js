// Mock search results data for testing
export const mockSearchResults = {
  "laptop": [
    {
      id: 1,
      title: "Dell Inspiron 15 3000 Laptop",
      price: "45,999",
      original_price: "52,999",
      discount: "13",
      image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop",
      rating: "4.2",
      seller: "Dell Store"
    },
    {
      id: 2,
      title: "HP Pavilion 14-inch Laptop",
      price: "38,499",
      original_price: "42,999",
      discount: "10",
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop",
      rating: "4.0",
      seller: "HP Store"
    },
    {
      id: 3,
      title: "Lenovo IdeaPad 3 15.6-inch Laptop",
      price: "32,999",
      original_price: "36,999",
      discount: "11",
      image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&h=300&fit=crop",
      rating: "4.1",
      seller: "Lenovo Store"
    }
  ],
  "mobile": [
    {
      id: 4,
      title: "Samsung Galaxy M34 5G",
      price: "18,999",
      original_price: "22,999",
      discount: "17",
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop",
      rating: "4.3",
      seller: "Samsung Store"
    },
    {
      id: 5,
      title: "OnePlus Nord CE 3 Lite",
      price: "19,999",
      original_price: "21,999",
      discount: "9",
      image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=300&fit=crop",
      rating: "4.4",
      seller: "OnePlus Store"
    },
    {
      id: 6,
      title: "Redmi Note 12 Pro",
      price: "24,999",
      original_price: "27,999",
      discount: "11",
      image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400&h=300&fit=crop",
      rating: "4.2",
      seller: "Xiaomi Store"
    }
  ],
  "headphone": [
    {
      id: 7,
      title: "Sony WH-1000XM4 Wireless Headphones",
      price: "24,999",
      original_price: "29,999",
      discount: "17",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop",
      rating: "4.6",
      seller: "Sony Store"
    },
    {
      id: 8,
      title: "Bose QuietComfort 45",
      price: "28,999",
      original_price: "32,999",
      discount: "12",
      image: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&h=300&fit=crop",
      rating: "4.5",
      seller: "Bose Store"
    },
    {
      id: 9,
      title: "JBL Tune 760NC",
      price: "8,999",
      original_price: "11,999",
      discount: "25",
      image: "https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=400&h=300&fit=crop",
      rating: "4.1",
      seller: "JBL Store"
    }
  ]
};

// Generic search results for any other search term
export const getMockSearchResults = (searchTerm) => {
  const term = searchTerm.toLowerCase();
  
  // Check if we have specific results for this term
  if (mockSearchResults[term]) {
    return mockSearchResults[term];
  }
  
  // Return generic results for any other search
  return [
    {
      id: 10,
      title: `${searchTerm} - Premium Product`,
      price: "15,999",
      original_price: "19,999",
      discount: "20",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop",
      rating: "4.3",
      seller: "Premium Store"
    },
    {
      id: 11,
      title: `${searchTerm} - Best Value`,
      price: "9,999",
      original_price: "12,999",
      discount: "23",
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop",
      rating: "4.1",
      seller: "Value Store"
    },
    {
      id: 12,
      title: `${searchTerm} - Popular Choice`,
      price: "12,499",
      original_price: "14,999",
      discount: "17",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop",
      rating: "4.4",
      seller: "Popular Store"
    }
  ];
}; 