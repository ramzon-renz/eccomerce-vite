import React, { createContext, useContext, useState, useEffect } from "react";

interface WishlistItem {
  id: string;
  name: string;
  price: number;
  image: string;
  material?: string;
  style?: string;
  category?: string;
  type?: string;
}

interface WishlistContextType {
  wishlist: WishlistItem[];
  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (id: string) => void;
  clearWishlist: () => void;
  isInWishlist: (id: string) => boolean;
  itemCount: number;
}

const WishlistContext = createContext<WishlistContextType>({
  wishlist: [],
  addToWishlist: () => {},
  removeFromWishlist: () => {},
  clearWishlist: () => {},
  isInWishlist: () => false,
  itemCount: 0,
});

export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Initialize state with data from localStorage if it exists
  const [wishlist, setWishlist] = useState<WishlistItem[]>(() => {
    try {
      const savedWishlist = localStorage.getItem("wishlist");
      return savedWishlist ? JSON.parse(savedWishlist) : [];
    } catch (error) {
      console.error("Failed to load initial wishlist state:", error);
      return [];
    }
  });
  const [itemCount, setItemCount] = useState(() => wishlist.length);

  // Update localStorage whenever wishlist changes
  useEffect(() => {
    try {
      const wishlistToSave = wishlist.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        material: item.material,
        style: item.style,
        category: item.category,
        type: item.type
      }));
      console.log("Saving wishlist to localStorage:", wishlistToSave);
      localStorage.setItem("wishlist", JSON.stringify(wishlistToSave));
      setItemCount(wishlist.length);
    } catch (error) {
      console.error("Failed to save wishlist to localStorage:", error);
    }
  }, [wishlist]);

  const addToWishlist = (item: WishlistItem) => {
    setWishlist((prevWishlist) => {
      // Check if item already exists in wishlist
      if (prevWishlist.some((i) => i.id === item.id)) {
        return prevWishlist; // Item already exists, don't add it again
      }
      return [...prevWishlist, item];
    });
  };

  const removeFromWishlist = (id: string) => {
    setWishlist((prevWishlist) =>
      prevWishlist.filter((item) => item.id !== id),
    );
  };

  const clearWishlist = () => {
    setWishlist([]);
    localStorage.removeItem("wishlist");
  };

  const isInWishlist = (id: string) => {
    return wishlist.some((item) => item.id === id);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        clearWishlist,
        isInWishlist,
        itemCount,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
