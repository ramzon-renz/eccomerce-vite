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
import { useToast } from "@/components/ui/use-toast";

interface ProductCardProps {
  id?: string;
  name?: string;
  price?: number;
  description?: string;
  image?: string;
  material?: string;
  style?: string;
  onView?: () => void;
  onAddToCart?: () => void;
}

const ProductCard = ({
  id = "1",
  name = "Classic Oak Door",
  price = 599.99,
  description = "Handcrafted solid oak door with premium finish and elegant design.",
  image = "https://images.unsplash.com/photo-1517142089942-ba376ce32a2e?w=500&q=80",
  material = "Oak",
  style = "Classic",
  onView = () => console.log("View product"),
  onAddToCart = () => console.log("Add to cart"),
}: ProductCardProps) => {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { toast } = useToast();

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.stopPropagation();

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
      });
      toast({
        title: "Added to wishlist",
        description: `${name} has been added to your wishlist`,
      });
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart();
    toast({
      title: "Added to cart",
      description: `${name} has been added to your cart`,
    });
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
          <div className="absolute top-2 right-2 flex gap-1">
            <Badge variant="secondary" className="bg-amber-100 text-amber-800">
              {material}
            </Badge>
            <Badge variant="outline" className="bg-white/80">
              {style}
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

        <CardFooter className="pt-2 flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 gap-1"
            onClick={onView}
          >
            <Eye size={16} />
            <span>View</span>
          </Button>
          <Button size="sm" className="flex-1 gap-1" onClick={handleAddToCart}>
            <ShoppingCart size={16} />
            <span>Add</span>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default ProductCard;
