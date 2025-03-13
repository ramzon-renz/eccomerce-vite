import React from "react";
import { motion } from "framer-motion";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Eye, ShoppingCart, Heart } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/components/ui/use-toast";

interface ProductCardProps {
  id?: string;
  name?: string;
  price?: number;
  description?: string;
  image?: string;
  material?: string;
  style?: string;
  category?: string;
  type?: string;
  onView?: () => void;
  onAddToCart?: () => void;
}

const ProductCard = ({
  id = "1",
  name = "Classic Oak Door",
  price = 899.99,
  description = "Handcrafted solid oak door with premium finish and elegant design.",
  image = "https://images.unsplash.com/photo-1517142089942-ba376ce32a2e?w=800&q=80",
  material = "Oak",
  style = "Classic",
  category = "interior",
  type = "panel",
  onView = () => console.log("View product"),
  onAddToCart = () => console.log("Add to cart"),
}: ProductCardProps) => {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleWishlistToggle = () => {
    if (isInWishlist(id)) {
      removeFromWishlist(id);
      toast({
        title: "Removed from wishlist",
        description: `${name} has been removed from your wishlist`,
      });
    } else {
      addToWishlist({
        id,
        name,
        price,
        image,
        material,
        style,
        category,
        type,
      });
      toast({
        title: "Added to wishlist",
        description: `${name} has been added to your wishlist`,
      });
    }
  };

  return (
    <motion.div
      whileHover={{ y: -10 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="h-full"
    >
      <Card className="h-full flex flex-col overflow-hidden bg-white border border-gray-200">
        <div className="relative overflow-hidden pt-[75%]">
          <img
            src={image}
            alt={name}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
          <div className="absolute top-2 right-2 flex flex-wrap gap-1">
            <Badge variant="secondary" className="bg-amber-100 text-amber-800">
              {material}
            </Badge>
            <Badge variant="outline" className="bg-white/80">
              {style}
            </Badge>
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              {category}
            </Badge>
            <Badge variant="outline" className="bg-white/80">
              {type}
            </Badge>
          </div>
          <button
            className="absolute top-2 left-2 bg-white/80 p-1.5 rounded-full hover:bg-white transition-colors"
            onClick={handleWishlistToggle}
          >
            <Heart
              className={`h-4 w-4 ${isInWishlist(id) ? "text-red-500 fill-red-500" : "text-gray-600"}`}
            />
          </button>
        </div>

        <CardHeader className="pb-2">
          <h3 className="font-semibold text-lg truncate">{name}</h3>
          <p className="text-xl font-bold text-primary">${price.toFixed(2)}</p>
        </CardHeader>

        <CardContent className="flex-grow">
          <p className="text-sm text-gray-600 line-clamp-3">{description}</p>
        </CardContent>

        <CardFooter className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={onView}
          >
            <Eye className="h-4 w-4 mr-2" />
            View
          </Button>
          <Button
            size="sm"
            className="flex-1"
            onClick={() => {
              addToCart({
                id: id,
                name: name,
                price: price,
                image: image,
                quantity: 1,
                material: material,
                style: style,
                category: category,
                type: type,
              });
              toast({
                title: "Added to cart",
                description: `${name} has been added to your cart`,
              });
            }}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add to Cart
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default ProductCard;
