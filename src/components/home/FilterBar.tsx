import React, { useState } from "react";
import { Filter, SlidersHorizontal } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

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

  return (
    <div className="w-full bg-white p-4 shadow-sm rounded-md mb-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-5 w-5 text-gray-500" />
          <h3 className="text-lg font-medium">Filter Products</h3>
        </div>

        <div className="flex flex-col sm:flex-row w-full md:w-auto gap-3">
          <Select
            onValueChange={(value) => handleFilterChange("material", value)}
            value={filters.material}
          >
            <SelectTrigger className="w-full sm:w-[180px]">
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
            <SelectTrigger className="w-full sm:w-[180px]">
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
            <SelectTrigger className="w-full sm:w-[180px]">
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
            className="w-full sm:w-auto"
          >
            Reset Filters
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
