import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Check, Info, Ruler, Palette, Grid3X3 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

interface CustomizationFormProps {
  productName?: string;
  productImage?: string;
  onSubmit?: (customizations: ProductCustomization) => void;
}

interface ProductCustomization {
  material: string;
  finish: string;
  glassType: string;
  width: number;
  height: number;
  hardware: string;
  additionalNotes: string;
}

const CustomizationForm = ({
  productName = "Classic Oak Door",
  productImage = "https://images.unsplash.com/photo-1517142089942-ba376ce32a2e?w=500&q=80",
  onSubmit = () => {},
}: CustomizationFormProps) => {
  const { addToCart } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [customization, setCustomization] = useState<ProductCustomization>({
    material: "oak",
    finish: "natural",
    glassType: "none",
    width: 36,
    height: 80,
    hardware: "brass",
    additionalNotes: "",
  });

  const handleChange = (field: keyof ProductCustomization, value: any) => {
    setCustomization((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(customization);
  };

  // Materials data
  const materials = [
    { id: "oak", name: "Oak", description: "Durable and classic", price: 0 },
    {
      id: "mahogany",
      name: "Mahogany",
      description: "Rich and elegant",
      price: 250,
    },
    {
      id: "walnut",
      name: "Walnut",
      description: "Dark and sophisticated",
      price: 300,
    },
    {
      id: "pine",
      name: "Pine",
      description: "Light and affordable",
      price: -100,
    },
    {
      id: "cherry",
      name: "Cherry",
      description: "Warm and refined",
      price: 200,
    },
  ];

  // Finishes data
  const finishes = [
    {
      id: "natural",
      name: "Natural",
      description: "Enhances wood grain",
      price: 0,
    },
    {
      id: "stained",
      name: "Stained",
      description: "Rich color depth",
      price: 100,
    },
    {
      id: "painted",
      name: "Painted",
      description: "Solid color finish",
      price: 150,
    },
    {
      id: "distressed",
      name: "Distressed",
      description: "Rustic appearance",
      price: 200,
    },
    {
      id: "glazed",
      name: "Glazed",
      description: "Subtle highlights",
      price: 250,
    },
  ];

  // Glass types data
  const glassTypes = [
    { id: "none", name: "No Glass", description: "Solid door", price: 0 },
    {
      id: "clear",
      name: "Clear Glass",
      description: "Transparent panels",
      price: 150,
    },
    {
      id: "frosted",
      name: "Frosted Glass",
      description: "Privacy with light",
      price: 200,
    },
    {
      id: "stained",
      name: "Stained Glass",
      description: "Decorative patterns",
      price: 350,
    },
    {
      id: "textured",
      name: "Textured Glass",
      description: "Unique patterns",
      price: 250,
    },
  ];

  // Hardware options
  const hardwareOptions = [
    { id: "brass", name: "Brass", description: "Classic look", price: 0 },
    {
      id: "stainless",
      name: "Stainless Steel",
      description: "Modern finish",
      price: 50,
    },
    {
      id: "bronze",
      name: "Oil-Rubbed Bronze",
      description: "Traditional style",
      price: 75,
    },
    {
      id: "black",
      name: "Matte Black",
      description: "Contemporary design",
      price: 100,
    },
    { id: "copper", name: "Copper", description: "Unique patina", price: 125 },
  ];

  // Calculate base price and additional costs
  const basePrice = 899.99;
  const materialPrice =
    materials.find((m) => m.id === customization.material)?.price || 0;
  const finishPrice =
    finishes.find((f) => f.id === customization.finish)?.price || 0;
  const glassPrice =
    glassTypes.find((g) => g.id === customization.glassType)?.price || 0;
  const hardwarePrice =
    hardwareOptions.find((h) => h.id === customization.hardware)?.price || 0;

  // Size adjustments (simplified)
  const standardSize =
    customization.width === 36 && customization.height === 80;
  const sizeAdjustment = standardSize ? 0 : 200;

  const totalPrice =
    basePrice +
    materialPrice +
    finishPrice +
    glassPrice +
    hardwarePrice +
    sizeAdjustment;

  const handleAddToCart = () => {
    addToCart({
      id: Math.random().toString(36).substr(2, 9),
      name: `${productName} (Custom)`,
      price: totalPrice,
      image: productImage,
      quantity: 1,
      material: materials.find((m) => m.id === customization.material)?.name || "",
      style: "Custom",
    });

    toast({
      title: "Added to cart",
      description: `Custom ${productName} added to your cart`,
    });
  };

  const handleRequestQuote = () => {
    addToCart({
      id: Math.random().toString(36).substr(2, 9),
      name: `${productName} (Custom)`,
      price: totalPrice,
      image: productImage,
      quantity: 1,
      material: materials.find((m) => m.id === customization.material)?.name || "",
      style: "Custom",
    });

    navigate("/quote");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Preview Section */}
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Your Custom Door
            </h2>
            <div className="rounded-lg overflow-hidden border border-gray-200 mb-6">
              <img
                src={productImage}
                alt={productName}
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h3 className="font-medium text-lg mb-2">
                {productName} (Custom)
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Base Price:</span>
                  <span>${basePrice.toFixed(2)}</span>
                </div>
                {materialPrice !== 0 && (
                  <div className="flex justify-between">
                    <span>
                      Material (
                      {
                        materials.find((m) => m.id === customization.material)
                          ?.name
                      }
                      ):
                    </span>
                    <span>
                      {materialPrice > 0
                        ? `+$${materialPrice.toFixed(2)}`
                        : `-$${Math.abs(materialPrice).toFixed(2)}`}
                    </span>
                  </div>
                )}
                {finishPrice !== 0 && (
                  <div className="flex justify-between">
                    <span>
                      Finish (
                      {
                        finishes.find((f) => f.id === customization.finish)
                          ?.name
                      }
                      ):
                    </span>
                    <span>+${finishPrice.toFixed(2)}</span>
                  </div>
                )}
                {glassPrice !== 0 && (
                  <div className="flex justify-between">
                    <span>
                      Glass (
                      {
                        glassTypes.find((g) => g.id === customization.glassType)
                          ?.name
                      }
                      ):
                    </span>
                    <span>+${glassPrice.toFixed(2)}</span>
                  </div>
                )}
                {hardwarePrice !== 0 && (
                  <div className="flex justify-between">
                    <span>
                      Hardware (
                      {
                        hardwareOptions.find(
                          (h) => h.id === customization.hardware,
                        )?.name
                      }
                      ):
                    </span>
                    <span>+${hardwarePrice.toFixed(2)}</span>
                  </div>
                )}
                {sizeAdjustment !== 0 && (
                  <div className="flex justify-between">
                    <span>
                      Custom Size ({customization.width}" ×{" "}
                      {customization.height}"):
                    </span>
                    <span>+${sizeAdjustment.toFixed(2)}</span>
                  </div>
                )}
                <Separator />
                <div className="flex justify-between font-bold">
                  <span>Total Price:</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
              </div>
            </div>
            <div className="flex gap-4">
              <Button
                className="flex-1 bg-amber-600 hover:bg-amber-700 text-white"
                onClick={handleAddToCart}
              >
                Add to Cart
              </Button>
              <Button
                variant="outline"
                className="flex-1"
                onClick={handleRequestQuote}
              >
                Request Quote
              </Button>
            </div>
          </div>
        </div>

        {/* Customization Form */}
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Customize Your Door
          </h2>
          <form onSubmit={handleSubmit}>
            <Tabs defaultValue="material" className="mb-8">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger
                  value="material"
                  className="flex items-center gap-1"
                >
                  <Grid3X3 className="h-4 w-4" />
                  <span className="hidden sm:inline">Material</span>
                </TabsTrigger>
                <TabsTrigger value="finish" className="flex items-center gap-1">
                  <Palette className="h-4 w-4" />
                  <span className="hidden sm:inline">Finish</span>
                </TabsTrigger>
                <TabsTrigger value="glass" className="flex items-center gap-1">
                  <Grid3X3 className="h-4 w-4" />
                  <span className="hidden sm:inline">Glass</span>
                </TabsTrigger>
                <TabsTrigger
                  value="dimensions"
                  className="flex items-center gap-1"
                >
                  <Ruler className="h-4 w-4" />
                  <span className="hidden sm:inline">Dimensions</span>
                </TabsTrigger>
              </TabsList>

              {/* Material Selection */}
              <TabsContent value="material" className="pt-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Select Material</h3>
                  <p className="text-gray-600 text-sm">
                    Choose the wood type for your door. Different woods offer
                    varying levels of durability, grain patterns, and natural
                    colors.
                  </p>

                  <RadioGroup
                    value={customization.material}
                    onValueChange={(value) => handleChange("material", value)}
                    className="grid grid-cols-1 gap-4 mt-4"
                  >
                    {materials.map((material) => (
                      <Label
                        key={material.id}
                        htmlFor={`material-${material.id}`}
                        className={`flex items-start p-4 border rounded-lg cursor-pointer transition-all ${customization.material === material.id ? "border-amber-600 bg-amber-50" : "border-gray-200 hover:border-gray-300"}`}
                      >
                        <RadioGroupItem
                          value={material.id}
                          id={`material-${material.id}`}
                          className="mt-1"
                        />
                        <div className="ml-3">
                          <div className="font-medium">{material.name}</div>
                          <div className="text-sm text-gray-600">
                            {material.description}
                          </div>
                          <div className="text-sm font-medium mt-1">
                            {material.price === 0
                              ? "Included in base price"
                              : material.price > 0
                                ? `+$${material.price.toFixed(2)}`
                                : `-$${Math.abs(material.price).toFixed(2)}`}
                          </div>
                        </div>
                      </Label>
                    ))}
                  </RadioGroup>
                </div>
              </TabsContent>

              {/* Finish Selection */}
              <TabsContent value="finish" className="pt-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Select Finish</h3>
                  <p className="text-gray-600 text-sm">
                    Choose the finish for your door. The finish affects both the
                    appearance and durability of your door.
                  </p>

                  <RadioGroup
                    value={customization.finish}
                    onValueChange={(value) => handleChange("finish", value)}
                    className="grid grid-cols-1 gap-4 mt-4"
                  >
                    {finishes.map((finish) => (
                      <Label
                        key={finish.id}
                        htmlFor={`finish-${finish.id}`}
                        className={`flex items-start p-4 border rounded-lg cursor-pointer transition-all ${customization.finish === finish.id ? "border-amber-600 bg-amber-50" : "border-gray-200 hover:border-gray-300"}`}
                      >
                        <RadioGroupItem
                          value={finish.id}
                          id={`finish-${finish.id}`}
                          className="mt-1"
                        />
                        <div className="ml-3">
                          <div className="font-medium">{finish.name}</div>
                          <div className="text-sm text-gray-600">
                            {finish.description}
                          </div>
                          <div className="text-sm font-medium mt-1">
                            {finish.price === 0
                              ? "Included in base price"
                              : `+$${finish.price.toFixed(2)}`}
                          </div>
                        </div>
                      </Label>
                    ))}
                  </RadioGroup>
                </div>
              </TabsContent>

              {/* Glass Selection */}
              <TabsContent value="glass" className="pt-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Select Glass Type</h3>
                  <p className="text-gray-600 text-sm">
                    Choose the type of glass for your door, if desired. Glass
                    panels can add light and visual interest to your door.
                  </p>

                  <RadioGroup
                    value={customization.glassType}
                    onValueChange={(value) => handleChange("glassType", value)}
                    className="grid grid-cols-1 gap-4 mt-4"
                  >
                    {glassTypes.map((glass) => (
                      <Label
                        key={glass.id}
                        htmlFor={`glass-${glass.id}`}
                        className={`flex items-start p-4 border rounded-lg cursor-pointer transition-all ${customization.glassType === glass.id ? "border-amber-600 bg-amber-50" : "border-gray-200 hover:border-gray-300"}`}
                      >
                        <RadioGroupItem
                          value={glass.id}
                          id={`glass-${glass.id}`}
                          className="mt-1"
                        />
                        <div className="ml-3">
                          <div className="font-medium">{glass.name}</div>
                          <div className="text-sm text-gray-600">
                            {glass.description}
                          </div>
                          <div className="text-sm font-medium mt-1">
                            {glass.price === 0
                              ? "Included in base price"
                              : `+$${glass.price.toFixed(2)}`}
                          </div>
                        </div>
                      </Label>
                    ))}
                  </RadioGroup>
                </div>
              </TabsContent>

              {/* Dimensions */}
              <TabsContent value="dimensions" className="pt-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-2">
                      Door Dimensions
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      Adjust the width and height of your door. Custom sizes
                      incur an additional charge of $200.
                    </p>

                    <div className="bg-blue-50 p-3 rounded-md mb-6 flex items-start">
                      <Info className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
                      <p className="text-blue-800 text-xs">
                        Standard door size is 36" × 80". Any deviation from this
                        size is considered a custom door and will incur
                        additional charges.
                      </p>
                    </div>

                    <div className="space-y-6">
                      {/* Width Slider */}
                      <div>
                        <div className="flex justify-between mb-2">
                          <Label
                            htmlFor="width"
                            className="text-sm font-medium"
                          >
                            Width: {customization.width}"
                          </Label>
                          <span className="text-xs text-gray-500">
                            Standard: 36"
                          </span>
                        </div>
                        <Slider
                          id="width"
                          min={24}
                          max={48}
                          step={1}
                          value={[customization.width]}
                          onValueChange={(value) =>
                            handleChange("width", value[0])
                          }
                          className="mb-6"
                        />
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>24"</span>
                          <span>36"</span>
                          <span>48"</span>
                        </div>
                      </div>

                      {/* Height Slider */}
                      <div>
                        <div className="flex justify-between mb-2">
                          <Label
                            htmlFor="height"
                            className="text-sm font-medium"
                          >
                            Height: {customization.height}"
                          </Label>
                          <span className="text-xs text-gray-500">
                            Standard: 80"
                          </span>
                        </div>
                        <Slider
                          id="height"
                          min={68}
                          max={96}
                          step={1}
                          value={[customization.height]}
                          onValueChange={(value) =>
                            handleChange("height", value[0])
                          }
                          className="mb-6"
                        />
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>68"</span>
                          <span>80"</span>
                          <span>96"</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Hardware Selection */}
                  <div>
                    <h3 className="text-lg font-medium mb-4">
                      Hardware Finish
                    </h3>
                    <RadioGroup
                      value={customization.hardware}
                      onValueChange={(value) => handleChange("hardware", value)}
                      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                    >
                      {hardwareOptions.map((hardware) => (
                        <Label
                          key={hardware.id}
                          htmlFor={`hardware-${hardware.id}`}
                          className={`flex items-start p-3 border rounded-lg cursor-pointer transition-all ${customization.hardware === hardware.id ? "border-amber-600 bg-amber-50" : "border-gray-200 hover:border-gray-300"}`}
                        >
                          <RadioGroupItem
                            value={hardware.id}
                            id={`hardware-${hardware.id}`}
                            className="mt-1"
                          />
                          <div className="ml-3">
                            <div className="font-medium text-sm">
                              {hardware.name}
                            </div>
                            <div className="text-xs text-gray-600">
                              {hardware.price === 0
                                ? "Included"
                                : `+$${hardware.price.toFixed(2)}`}
                            </div>
                          </div>
                        </Label>
                      ))}
                    </RadioGroup>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            {/* Additional Notes */}
            <div className="mb-8">
              <Label htmlFor="notes" className="block text-sm font-medium mb-2">
                Additional Notes or Requirements
              </Label>
              <textarea
                id="notes"
                rows={4}
                className="w-full border border-gray-300 rounded-md p-3 text-sm focus:ring-amber-500 focus:border-amber-500"
                placeholder="Please include any special instructions or questions here..."
                value={customization.additionalNotes}
                onChange={(e) =>
                  handleChange("additionalNotes", e.target.value)
                }
              />
            </div>

            {/* Submit Buttons (Mobile Only) */}
            <div className="lg:hidden flex gap-4 mt-8">
              <Button
                type="button"
                className="flex-1 bg-amber-600 hover:bg-amber-700 text-white"
                onClick={handleAddToCart}
              >
                Add to Cart
              </Button>
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={handleRequestQuote}
              >
                Request Quote
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CustomizationForm;
