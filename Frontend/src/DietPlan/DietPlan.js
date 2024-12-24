import React, { useState } from "react";
import "./DietPlan.css";
import Hero1 from './hero1.jpg';
import Hero2 from './hero2.jpg';
import Hero3 from './hero3.jpg';
import Hero4 from './hero4.jpg';

const DietPlan = () => {
  // State to manage selected sport and category
  const [selectedSport, setSelectedSport] = useState("Martial Arts");
  const [selectedCategory, setSelectedCategory] = useState("Diet");

  const dietPlans = {
    "Martial Arts": {
      men: {
        Breakfast: "Scrambled eggs, whole-grain toast, avocado slices, orange juice.",
        Lunch: "Grilled chicken breast, quinoa, steamed broccoli and carrots.",
        Dinner: "Baked salmon, sweet potato, spinach salad (Iron, Vitamin K).",
        Snacks: "Almonds, Greek yogurt, banana.",
      },
      women: {
        Breakfast: "Greek yogurt with berries, chia seeds, green tea .",
        Lunch: "Grilled tofu , brown rice , mixed greens .",
        Dinner: "Grilled fish, roasted zucchini and peppers, quinoa .",
        Snacks: "Carrot sticks, peanut butter on whole-grain crackers .",
      },
    },
    "Cricket": {
      men: {
        Breakfast: "Egg omelette, whole-grain toast, avocado slices .",
        Lunch: "Grilled chicken sandwich, mixed greens.",
        Dinner: "Grilled turkey, steamed broccoli, brown rice.",
        Snacks: "Protein bars, mixed nuts.",
      },
      women: {
        Breakfast: "Smoothie with protein powder, banana, spinach.",
        Lunch: "Quinoa salad with chickpeas and veggies .",
        Dinner: "Baked chicken, sweet potato, green beans.",
        Snacks: "Carrot sticks with hummus, almonds.",
      },
    },
    "Basketball": {
      men: {
        Breakfast: "Protein pancakes with peanut butter, apple slices.",
        Lunch: "Grilled chicken wrap, side of sweet potato fries.",
        Dinner: "Baked salmon, brown rice, steamed broccoli.",
        Snacks: "Trail mix with nuts and dried fruits, protein bar.",
      },
      women: {
        Breakfast: "Oatmeal with almond butter and berries.",
        Lunch: "Quinoa salad with chickpeas and mixed greens.",
        Dinner: "Grilled tofu stir-fry with vegetables and brown rice.",
        Snacks: "Greek yogurt with granola, carrot sticks with hummus.",
      },
    },
    "1000m Race": {
      men: {
        Breakfast: "Smoothie with whey protein, oats, and banana.",
        Lunch: "Grilled turkey sandwich, side of mixed salad.",
        Dinner: "Grilled cod, roasted vegetables, quinoa.",
        Snacks: "Protein shake, handful of almonds.",
      },
      women: {
        Breakfast: "Chia pudding with almond milk and fresh strawberries.",
        Lunch: "Grilled chicken bowl with quinoa and kale.",
        Dinner: "Baked shrimp, roasted sweet potato, sautéed green beans.",
        Snacks: "Hummus with cucumber slices, mixed nuts.",
      },
    },
    "Relay": {
      men: {
        Breakfast: "Whole-grain cereal with milk, a banana.",
        Lunch: "Chicken and avocado wrap, steamed spinach on the side.",
        Dinner: "Grilled fish, roasted veggies, wild rice.",
        Snacks: "Energy bar, mixed nuts.",
      },
      women: {
        Breakfast: "Scrambled egg whites with avocado, whole-grain toast.",
        Lunch: "Tofu stir-fry with brown rice and fresh salad.",
        Dinner: "Baked salmon, roasted asparagus, couscous.",
        Snacks: "Trail mix with nuts and dried fruits, Greek yogurt.",
      },
    },
    "Shotput": {
      men: {
        Breakfast: "Egg omelette with spinach, toast, avocado.",
        Lunch: "Chicken curry with brown rice, green beans.",
        Dinner: "Grilled steak, mashed potatoes, spinach salad.",
        Snacks: "Protein shake, almonds.",
      },
      women: {
        Breakfast: "Greek yogurt with granola and fresh blueberries.",
        Lunch: "Grilled chicken with quinoa and kale.",
        Dinner: "Roasted tofu with sweet potato and mixed greens.",
        Snacks: "Hard-boiled eggs, mixed nuts.",
      },
    },
    "Swimming": {
      men: {
        Breakfast: "Oatmeal with milk, banana, and walnuts.",
        Lunch: "Grilled chicken sandwich, side of steamed veggies.",
        Dinner: "Baked salmon, couscous, fresh green salad.",
        Snacks: "Protein bar, mixed nuts.",
      },
      women: {
        Breakfast: "Smoothie with protein powder, spinach, and berries.",
        Lunch: "Grilled turkey salad with quinoa and veggies.",
        Dinner: "Baked cod with sweet potato and sautéed spinach.",
        Snacks: "Low-fat yogurt with granola, fruit slices.",
      },
    },
    "Table Tennis": {
      men: {
        Breakfast: "Egg and veggie omelette, whole-grain toast.",
        Lunch: "Grilled fish, rice, and a fresh salad.",
        Dinner: "Roasted chicken, mashed potatoes, green beans.",
        Snacks: "Protein shake, mixed nuts.",
      },
      women: {
        Breakfast: "Oatmeal with almond butter and sliced banana.",
        Lunch: "Grilled tofu with couscous and roasted veggies.",
        Dinner: "Baked salmon with quinoa and a side salad.",
        Snacks: "Greek yogurt with fresh fruit.",
      },
    },
    "Weight Lifting": {
      men: {
        Breakfast: "Scrambled eggs, bacon, whole-grain toast.",
        Lunch: "Grilled chicken breast with brown rice and broccoli.",
        Dinner: "Steak, sweet potato, spinach salad.",
        Snacks: "Protein shake, peanut butter with toast.",
      },
      women: {
        Breakfast: "Egg whites, oatmeal, avocado slices.",
        Lunch: "Grilled salmon with quinoa and kale salad.",
        Dinner: "Baked chicken with mashed potatoes and green beans.",
        Snacks: "Protein shake, mixed nuts.",
      },
    },
    "Taekwondo": {
  men: {
    Breakfast: "Boiled eggs, whole-grain toast, banana, and almond butter.",
    Lunch: "Grilled chicken wrap with mixed greens and hummus.",
    Dinner: "Grilled salmon with sweet potato and steamed broccoli.",
    Snacks: "Greek yogurt with honey and berries, mixed nuts.",
  },
  women: {
    Breakfast: "Avocado toast with poached eggs and cherry tomatoes.",
    Lunch: "Quinoa salad with grilled chicken and a lemon vinaigrette.",
    Dinner: "Stir-fried tofu with mixed vegetables and brown rice.",
    Snacks: "Protein smoothie with almond milk, spinach, and banana.",
  },
},
  
  };
  
  const weightPlans = {
    "Martial Arts": {
      men: [
        "Push-ups (3 sets of 20 reps)",
        "Pull-ups (3 sets of 10 reps)",
        "Shadow boxing with dumbbells (3 sets of 2 minutes)",
        "Squats (3 sets of 15 reps)",
      ],
      women: [
        "Bodyweight squats (3 sets of 15 reps)",
        "Dumbbell punches (3 sets of 2 minutes)",
        "Plank hold (3 sets of 1 minute)",
        "Lunges (3 sets of 12 reps per leg)",
      ],
    },
    "Cricket": {
      men: [
        "Dumbbell bench press (3 sets of 12 reps)",
        "Plank hold (3 sets of 1 minute)",
        "Deadlifts (3 sets of 10 reps)",
        "Overhead press (3 sets of 10 reps)",
      ],
      women: [
        "Bodyweight lunges (3 sets of 10 reps per leg)",
        "Plank hold (3 sets of 30 seconds)",
        "Kettlebell swings (3 sets of 12 reps)",
        "Seated dumbbell shoulder press (3 sets of 10 reps)",
      ],
    },
    "Basketball": {
      men: [
        "Jump squats (3 sets of 12 reps)",
        "Bench press (3 sets of 10 reps)",
        "Deadlifts (3 sets of 10 reps)",
        "Lateral lunges (3 sets of 12 reps per leg)",
      ],
      women: [
        "Bodyweight squats (3 sets of 15 reps)",
        "Step-ups with dumbbells (3 sets of 12 reps per leg)",
        "Seated dumbbell shoulder press (3 sets of 10 reps)",
        "Plank with shoulder taps (3 sets of 1 minute)",
      ],
    },
    "1000m Race": {
      men: [
        "Interval sprints (5 sets of 200 meters)",
        "Leg press (3 sets of 12 reps)",
        "Hamstring curls (3 sets of 10 reps)",
        "Core twists with medicine ball (3 sets of 20 reps)",
      ],
      women: [
        "Incline treadmill walking (3 sets of 5 minutes)",
        "Bodyweight squats (3 sets of 15 reps)",
        "Plank with knee tucks (3 sets of 1 minute)",
        "Calf raises (3 sets of 15 reps)",
      ],
    },
    "Relay": {
      men: [
        "Sprint intervals (5 sets of 100 meters)",
        "Box jumps (3 sets of 12 reps)",
        "Push-ups with clap (3 sets of 10 reps)",
        "Weighted lunges (3 sets of 12 reps per leg)",
      ],
      women: [
        "Jogging with high knees (3 sets of 2 minutes)",
        "Step-ups on bench (3 sets of 10 reps per leg)",
        "Plank with side taps (3 sets of 1 minute)",
        "Bodyweight lateral lunges (3 sets of 12 reps per leg)",
      ],
    },
    "Shotput": {
      men: [
        "Overhead dumbbell presses (3 sets of 12 reps)",
        "Deadlifts (3 sets of 10 reps)",
        "Incline bench press (3 sets of 12 reps)",
        "Medicine ball throws (3 sets of 10 reps)",
      ],
      women: [
        "Seated shoulder press with dumbbells (3 sets of 10 reps)",
        "Weighted step-ups (3 sets of 12 reps per leg)",
        "Wall sits (3 sets of 1 minute)",
        "Overhead medicine ball throws (3 sets of 10 reps)",
      ],
    },
    "Swimming": {
      men: [
        "Lat pulldowns (3 sets of 10 reps)",
        "Dumbbell rows (3 sets of 12 reps per arm)",
        "Plank hold (3 sets of 1 minute)",
        "Kettlebell swings (3 sets of 12 reps)",
      ],
      women: [
        "Pull-ups (3 sets of 8 reps)",
        "Dumbbell side raises (3 sets of 10 reps)",
        "Flutter kicks (3 sets of 1 minute)",
        "Bodyweight push-ups (3 sets of 10 reps)",
      ],
    },
    "Table Tennis": {
      men: [
        "Wrist curls (3 sets of 15 reps per hand)",
        "Forearm planks (3 sets of 1 minute)",
        "Overhead presses (3 sets of 12 reps)",
        "Side lunges (3 sets of 12 reps per leg)",
      ],
      women: [
        "Bodyweight lunges (3 sets of 12 reps per leg)",
        "Wrist extensions (3 sets of 15 reps per hand)",
        "Plank with side dips (3 sets of 1 minute)",
        "Kettlebell deadlifts (3 sets of 12 reps)",
      ],
    },
    "Weight Lifting": {
      men: [
        "Barbell squats (3 sets of 10 reps)",
        "Deadlifts (3 sets of 10 reps)",
        "Overhead presses (3 sets of 12 reps)",
        "Pull-ups (3 sets of 10 reps)",
      ],
      women: [
        "Dumbbell squats (3 sets of 15 reps)",
        "Dumbbell deadlifts (3 sets of 12 reps)",
        "Push-ups (3 sets of 10 reps)",
        "Seated dumbbell rows (3 sets of 12 reps)",
      ],
    },
    "Taekwondo": {
  men: [
    "Shadow sparring (3 rounds of 2 minutes)",
    "High-kick drills (4 sets of 15 reps each leg)",
    "Plyometric box jumps (3 sets of 12 reps)",
    "Core strengthening exercises (plank holds and sit-ups, 3 sets of 1 minute each)",
  ],
  women: [
    "Kicking combinations (3 rounds of 2 minutes)",
    "Lateral bounds for agility (4 sets of 15 reps)",
    "Push-up variations (3 sets of 10 reps)",
    "Dynamic stretching and core work (3 sets of 1 minute each)",
  ],
},
    
  
  };

  const getPlans = () => {
    if (selectedCategory === "Diet") {
      return dietPlans[selectedSport];
    }
    return weightPlans[selectedSport];
  };
  
  const plans = getPlans();
  
  return (
    <div className="diet-plan-wrapper">
      {/* Hero Section */}
      <div className="hero1-section">
        <div className="hero1-content">
          {/* Left Side Text */}
          <div className="left-message">
            <h1 className="head-h1">
              Personalized Plans <span>for Athletes</span>
            </h1>
            <p className="p-1">Unlock peak performance with tailored plans for your sport!</p>
          </div>

          {/* Vertical Line */}
          <div className="vertical-line"></div>

          {/* Right Side Text */}
          <div className="right-message">
            <h1 className="head-h1">
              Reach Your Goals <span>with Guidance</span>
            </h1>
            <p>Achieve excellence with expert guidance and structured plans!</p>
          </div>
        </div>
      </div>

      {/* Hero Section Images Below Text */}
      <div className="hero1-images">
        <img src={Hero1} alt="Hero 1" />
        <img src={Hero2} alt="Hero 2" />
        <img src={Hero3} alt="Hero 3" />
        <img src={Hero4} alt="Hero 4" />
      </div>

      {/* Tab Selector */}
      <div className="tab-container">
        <div className="tabs">
          <button
            className={`tab ${selectedCategory === "Diet" ? "active-tab" : ""}`}
            onClick={() => setSelectedCategory("Diet")}
          >
            Diet Plans
          </button>
          <button
            className={`tab ${selectedCategory === "Weight" ? "active-tab" : ""}`}
            onClick={() => setSelectedCategory("Weight")}
          >
            Weight Plans
          </button>
        </div>
        <div className="sport-selector">
          {Object.keys(dietPlans || {}).map((sport) => (
            <button
              key={sport}
              className={`sport ${selectedSport === sport ? "active-sport" : ""}`}
              onClick={() => setSelectedSport(sport)}
            >
              {sport}
            </button>
          ))}
        </div>
      </div>

      {/* Display Selected Plans */}
      <div className="plans-container">
        <h2 className={selectedCategory === "Weight" ? "weight-plan" : ""}>
          {selectedCategory} Plans for {selectedSport}
        </h2>
        <div className="plans">
          {selectedCategory === "Diet" && (
            <>
              <h3>Men</h3>
              <ul>
                {Object.entries(plans.men).map(([meal, details]) => (
                  <li key={meal}>
                    <strong>{meal}:</strong> {details}
                  </li>
                ))}
              </ul>
              <h3>Women</h3>
              <ul>
                {Object.entries(plans.women).map(([meal, details]) => (
                  <li key={meal}>
                    <strong>{meal}:</strong> {details}
                  </li>
                ))}
              </ul>
            </>
          )}
          {selectedCategory === "Weight" && (
            <>
              <h3>Men</h3>
              <ul>
                {plans.men.map((exercise, index) => (
                  <li key={index}>{exercise}</li>
                ))}
              </ul>
              <h3>Women</h3>
              <ul>
                {plans.women.map((exercise, index) => (
                  <li key={index}>{exercise}</li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DietPlan;
  