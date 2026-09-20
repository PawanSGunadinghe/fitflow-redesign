from pydantic import BaseModel, Field
from typing import List, Optional

class WorkoutRecommendationRequest(BaseModel):
    user_id: str
    available_time_minutes: int = Field(default=30, ge=10, le=120)
    energy_level: int = Field(default=3, ge=1, le=5) # 1=exhausted, 5=high energy
    soreness_areas: List[str] = Field(default_factory=list)
    fitness_goal: str = Field(default="general_fitness")

class ExerciseItem(BaseModel):
    id: str
    name: str
    category: str
    duration_seconds: Optional[int] = None
    sets: Optional[int] = None
    reps: Optional[int] = None
    target_muscle_group: str

class WorkoutRecommendationResponse(BaseModel):
    plan_id: str
    title: str
    estimated_duration_min: int
    target_calories_burn: int
    adaptation_notes: str
    exercises: List[ExerciseItem]

class FoodItemDetection(BaseModel):
    name: str
    confidence_score: float
    estimated_weight_grams: float
    calories: float
    protein_g: float
    carbs_g: float
    fat_g: float

class MealAnalysisResponse(BaseModel):
    inference_time_ms: float
    detected_items: List[FoodItemDetection]
    total_calories: float
    total_protein_g: float
    total_carbs_g: float
    total_fat_g: float
