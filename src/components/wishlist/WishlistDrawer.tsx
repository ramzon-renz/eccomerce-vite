import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, X, Trash2, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { Link } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";

interface WishlistDrawerProps {
  triggerClassName?: string;
}

const WishlistDrawer = ({ triggerClassName = "" }: WishlistDrawerProps) => {
  const { wishlist, removeFromWishlist, clearWishlist, itemCount } =
    useWishlist();
  const { addToCart } = useCart();

  const handleAddToCart = (item: any) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      quantity: 1,
      material: item.material,
      style: item.style,
    });
    // Optionally remove from wishlist after adding to cart
    // removeFromWishlist(item.id);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={`relative ${triggerClassName}`}
          aria-label="Open wishlist"
        >
          <Heart className="h-5 w-5" />
          {itemCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {itemCount}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md flex flex-col">
        <SheetHeader className="space-y-2 pb-4">
          <SheetTitle className="text-xl flex items-center">
            <Heart className="mr-2 h-5 w-5" />
            Your Wishlist ({itemCount})
          </SheetTitle>
        </SheetHeader>

        {wishlist.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-6">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
              <Heart className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="font-medium text-lg mb-1">Your wishlist is empty</h3>
            <p className="text-gray-500 text-sm mb-6">
              Save your favorite doors to come back to them later.
            </p>
            <SheetClose asChild>
              <Button className="bg-amber-600 hover:bg-amber-700 text-white">
                Browse Products
              </Button>
            </SheetClose>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-auto py-2">
              <AnimatePresence initial={false}>
                {wishlist.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="mb-4"
                  >
                    <div className="flex gap-4">
                      <div className="w-20 h-20 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between">
                          <h4 className="font-medium text-sm truncate">
                            {item.name}
                          </h4>
                          <button
                            onClick={() => removeFromWishlist(item.id)}
                            className="text-gray-400 hover:text-red-500 transition-colors"
                            aria-label="Remove item"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="flex items-center mt-1 text-sm text-gray-500">
                          {item.material && (
                            <span className="mr-2">{item.material}</span>
                          )}
                          {item.style && (
                            <>
                              <span className="mx-1">•</span>
                              <span>{item.style}</span>
                            </>
                          )}
                        </div>
                        <div className="flex justify-between items-center mt-2">
                          <span className="font-medium">
                            ${item.price.toFixed(2)}
                          </span>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 px-2 text-xs"
                            onClick={() => handleAddToCart(item)}
                          >
                            <ShoppingCart className="h-3 w-3 mr-1" />
                            Add to Cart
                          </Button>
                        </div>
                      </div>
                    </div>
                    <Separator className="my-4" />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <div className="mt-auto pt-4 border-t">
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  className="flex items-center justify-center"
                  onClick={clearWishlist}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Clear Wishlist
                </Button>
                <SheetClose asChild>
                  <Link to="/products">
                    <Button className="bg-amber-600 hover:bg-amber-700 text-white w-full">
                      Browse More
                    </Button>
                  </Link>
                </SheetClose>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default WishlistDrawer;
