import React from "react";
import { Card, Button } from "flowbite-react"; // Flowbite components for styling

const HeroSection = () => {
  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Customers Card */}
        <Card className="bg-purple-500 text-white">
          <h3 className="text-xl font-bold">Customers</h3>
          <p className="text-2xl">45,679</p>
          <p>Increase by 20%</p>
        </Card>

        {/* Orders Card */}
        <Card className="bg-orange-500 text-white">
          <h3 className="text-xl font-bold">Orders</h3>
          <p className="text-2xl">80,927</p>
          <p>Increase by 60%</p>
        </Card>

        {/* Delivery Card */}
        <Card className="bg-blue-500 text-white">
          <h3 className="text-xl font-bold">Delivery</h3>
          <p className="text-2xl">22,339</p>
          <p>Decrease by 2%</p>
        </Card>

        {/* Users Card */}
        <Card className="bg-teal-500 text-white">
          <h3 className="text-xl font-bold">Users</h3>
          <p className="text-2xl">+1,900</p>
          <p>Steady Growth</p>
        </Card>

        {/* Revenue Card */}
        <Card className="bg-gray-800 text-white">
          <h3 className="text-xl font-bold">Revenue</h3>
          <p className="text-2xl">36,568</p>
          <p>Total revenue</p>
          <p className="text-sm">+40% Growth | 2.5% Refund | 23.6% Online</p>
        </Card>

        {/* Product Categories Pie Chart Card */}
        <Card className="bg-white border">
          <h3 className="text-xl font-bold">Product Categories</h3>
          {/* Pie chart goes here */}
          <div className="h-40 bg-gray-300 rounded-lg">
            {/* You can add a pie chart here (using Chart.js or another library) */}
          </div>
        </Card>

        {/* Product Visits Line Chart Card */}
        <Card className="bg-white border">
          <h3 className="text-xl font-bold">Product Visits</h3>
          {/* Line chart goes here */}
          <div className="h-40 bg-gray-300 rounded-lg">
            {/* You can add a line chart here (using Chart.js or another library) */}
          </div>
        </Card>
      </div>

      <div className="mt-6 text-center">
        <Button className="bg-purple-500 hover:bg-purple-700 text-white">
          View Full Report
        </Button>
      </div>
    </div>
  );
};

export default HeroSection;
