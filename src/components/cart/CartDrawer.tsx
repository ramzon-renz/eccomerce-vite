import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, X, Trash2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
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

interface CartDrawerProps {
  triggerClassName?: string;
}

const CartDrawer = ({ triggerClassName = "" }: CartDrawerProps) => {
  const { cart, removeFromCart, updateQuantity, clearCart, itemCount } =
    useCart();

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={`relative ${triggerClassName}`}
          aria-label="Open cart"
        >
          <ShoppingCart className="h-5 w-5" />
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
            <ShoppingCart className="mr-2 h-5 w-5" />
            Your Cart ({itemCount})
          </SheetTitle>
        </SheetHeader>

        {cart.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-6">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
              <ShoppingCart className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="font-medium text-lg mb-1">Your cart is empty</h3>
            <p className="text-gray-500 text-sm mb-6">
              Looks like you haven't added any doors to your cart yet.
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
                {cart.map((item) => (
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
                            onClick={() => removeFromCart(item.id)}
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
                          <div className="flex border rounded-md">
                            <button
                              className="px-2 py-0.5 text-sm border-r"
                              onClick={() =>
                                updateQuantity(
                                  item.id,
                                  Math.max(1, item.quantity - 1),
                                )
                              }
                              disabled={item.quantity <= 1}
                            >
                              -
                            </button>
                            <span className="px-3 py-0.5 text-sm">
                              {item.quantity}
                            </span>
                            <button
                              className="px-2 py-0.5 text-sm border-l"
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                            >
                              +
                            </button>
                          </div>
                          <span className="font-medium">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Separator className="my-4" />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <div className="mt-auto pt-4 border-t">
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span>
                    {subtotal >= 1000 ? (
                      <span className="text-green-600">Free</span>
                    ) : (
                      "Calculated at checkout"
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
              </div>

              <div className="bg-blue-50 p-3 rounded-md mb-4 flex items-start">
                <AlertCircle className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
                <p className="text-blue-800 text-xs">
                  This is a request for quotation only. Final pricing will be
                  confirmed by our team.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  className="flex items-center justify-center"
                  onClick={clearCart}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Clear Cart
                </Button>
                <SheetClose asChild>
                  <Link to="/quote">
                    <Button className="bg-amber-600 hover:bg-amber-700 text-white w-full">
                      Request Quote
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

export default CartDrawer;
