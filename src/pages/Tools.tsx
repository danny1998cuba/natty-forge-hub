import { Navigation } from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calculator, Activity } from "lucide-react";
import { useState } from "react";

const Tools = () => {
  const [calorieData, setCalorieData] = useState({
    weight: "",
    height: "",
    age: "",
    activity: "moderate"
  });
  
  const [bodyFatData, setBodyFatData] = useState({
    weight: "",
    waist: "",
    neck: "",
    height: ""
  });

  const calculateCalories = () => {
    // Basic calculation placeholder
    const bmr = 10 * parseFloat(calorieData.weight) + 6.25 * parseFloat(calorieData.height) - 5 * parseFloat(calorieData.age) + 5;
    return Math.round(bmr * 1.5);
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="pt-28 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto mb-12 text-center">
            <h1 className="mb-4">Fitness Tools</h1>
            <p className="text-xl text-muted-foreground">
              Calculate your calorie needs and track your body composition
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Calorie Calculator */}
            <Card className="gradient-card border-border p-6">
              <div className="flex items-center gap-3 mb-6">
                <Calculator className="h-8 w-8 text-primary" />
                <h2 className="text-2xl">Calorie Calculator</h2>
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="weight">Weight (kg)</Label>
                  <Input 
                    id="weight"
                    type="number"
                    placeholder="75"
                    value={calorieData.weight}
                    onChange={(e) => setCalorieData({...calorieData, weight: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="height">Height (cm)</Label>
                  <Input 
                    id="height"
                    type="number"
                    placeholder="180"
                    value={calorieData.height}
                    onChange={(e) => setCalorieData({...calorieData, height: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="age">Age</Label>
                  <Input 
                    id="age"
                    type="number"
                    placeholder="25"
                    value={calorieData.age}
                    onChange={(e) => setCalorieData({...calorieData, age: e.target.value})}
                  />
                </div>
                <Button 
                  variant="hero" 
                  className="w-full"
                  onClick={() => {
                    if (calorieData.weight && calorieData.height && calorieData.age) {
                      alert(`Estimated daily calories: ${calculateCalories()}`);
                    }
                  }}
                >
                  Calculate Calories
                </Button>
              </div>
            </Card>

            {/* Body Fat Tracker */}
            <Card className="gradient-card border-border p-6">
              <div className="flex items-center gap-3 mb-6">
                <Activity className="h-8 w-8 text-secondary" />
                <h2 className="text-2xl">Body Fat Tracker</h2>
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="bf-weight">Weight (kg)</Label>
                  <Input 
                    id="bf-weight"
                    type="number"
                    placeholder="75"
                    value={bodyFatData.weight}
                    onChange={(e) => setBodyFatData({...bodyFatData, weight: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="waist">Waist (cm)</Label>
                  <Input 
                    id="waist"
                    type="number"
                    placeholder="85"
                    value={bodyFatData.waist}
                    onChange={(e) => setBodyFatData({...bodyFatData, waist: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="neck">Neck (cm)</Label>
                  <Input 
                    id="neck"
                    type="number"
                    placeholder="38"
                    value={bodyFatData.neck}
                    onChange={(e) => setBodyFatData({...bodyFatData, neck: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="bf-height">Height (cm)</Label>
                  <Input 
                    id="bf-height"
                    type="number"
                    placeholder="180"
                    value={bodyFatData.height}
                    onChange={(e) => setBodyFatData({...bodyFatData, height: e.target.value})}
                  />
                </div>
                <Button 
                  variant="hero" 
                  className="w-full"
                  onClick={() => {
                    if (bodyFatData.weight && bodyFatData.waist && bodyFatData.neck && bodyFatData.height) {
                      alert('Body fat calculation: Feature coming soon!');
                    }
                  }}
                >
                  Calculate Body Fat
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tools;
