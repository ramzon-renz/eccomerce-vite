import React, { useState } from "react";
import { Filter, SlidersHorizontal, X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

interface FilterBarProps {
  onFilterChange?: (filters: FilterOptions) => void;
}

interface FilterOptions {
  material: string;
  style: string;
  priceRange: string;
}

const FilterBar: React.FC<FilterBarProps> = ({ onFilterChange = () => {} }) => {
  const [filters, setFilters] = useState<FilterOptions>({
    material: "",
    style: "",
    priceRange: "",
  });

  const handleFilterChange = (type: keyof FilterOptions, value: string) => {
    const newFilters = { ...filters, [type]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleReset = () => {
    const resetFilters = {
      material: "",
      style: "",
      priceRange: "",
    };
    setFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  const FilterContent = () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <SlidersHorizontal className="h-5 w-5 text-gray-500" />
        <h3 className="text-lg font-medium">Filter Products</h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Select
          onValueChange={(value) => handleFilterChange("material", value)}
          value={filters.material}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Material" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="oak">Oak</SelectItem>
            <SelectItem value="mahogany">Mahogany</SelectItem>
            <SelectItem value="pine">Pine</SelectItem>
            <SelectItem value="walnut">Walnut</SelectItem>
            <SelectItem value="cherry">Cherry</SelectItem>
          </SelectContent>
        </Select>

        <Select
          onValueChange={(value) => handleFilterChange("style", value)}
          value={filters.style}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Style" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="traditional">Traditional</SelectItem>
            <SelectItem value="modern">Modern</SelectItem>
            <SelectItem value="rustic">Rustic</SelectItem>
            <SelectItem value="craftsman">Craftsman</SelectItem>
            <SelectItem value="contemporary">Contemporary</SelectItem>
          </SelectContent>
        </Select>

        <Select
          onValueChange={(value) => handleFilterChange("priceRange", value)}
          value={filters.priceRange}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Price Range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="budget">$500 - $1,000</SelectItem>
            <SelectItem value="mid">$1,000 - $2,500</SelectItem>
            <SelectItem value="premium">$2,500 - $5,000</SelectItem>
            <SelectItem value="luxury">$5,000+</SelectItem>
          </SelectContent>
        </Select>

        <Button
          variant="outline"
          onClick={handleReset}
          className="w-full"
        >
          Reset Filters
        </Button>
      </div>
    </div>
  );

  return (
    <div className="w-full bg-white shadow-sm rounded-md mb-6">
      {/* Desktop View */}
      <div className="hidden md:block p-4">
        <FilterContent />
      </div>

      {/* Mobile View */}
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="w-full rounded-none rounded-t-md">
              <Filter className="h-4 w-4 mr-2" />
              Filters
              {Object.values(filters).some(Boolean) && (
                <span className="ml-2 bg-primary text-primary-foreground rounded-full px-2 py-0.5 text-xs">
                  {Object.values(filters).filter(Boolean).length}
                </span>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[80vh]">
            <SheetHeader>
              <SheetTitle>Filter Products</SheetTitle>
            </SheetHeader>
            <div className="mt-6">
              <FilterContent />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default FilterBar;
