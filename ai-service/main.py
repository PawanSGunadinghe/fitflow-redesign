import time
import uuid
from typing import List
# pyrefly: ignore [missing-import]
from fastapi import FastAPI, HTTPException, UploadFile, File
from models.schemas import (
    WorkoutRecommendationRequest,
    WorkoutRecommendationResponse,
    ExerciseItem,
    MealAnalysisResponse,
    FoodItemDetection
)

app = FastAPI(
    title="FitFlow AI & Vision Microservice",
    version="2.0.0",
    description="Microservice providing adaptive workout recommendations and instant computer vision meal recognition."
)

@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "fitflow-ai-service", "timestamp": time.time()}

@app.post("/api/v1/recommend-workout", response_model=WorkoutRecommendationResponse)
async def recommend_workout(request: WorkoutRecommendationRequest):
    """
    Adaptive Workout Generation Engine.
    Adjusts workout complexity, duration, and exercise selection based on user energy,
    time constraints, and physical soreness.
    """
    plan_title = "Adaptive Mobility & Conditioning"
    notes = f"Plan adapted for {request.available_time_minutes} mins at energy level {request.energy_level}/5."

    exercises: List[ExerciseItem] = []

    # Dynamic adaptation logic
    if "lower_back" in [area.lower() for area in request.soreness_areas]:
        notes += " De-emphasized heavy spinal loading; added targeted posterior chain mobility."
        exercises.append(
            ExerciseItem(
                id="ex_mob_01",
                name="Bird-Dog & Cat-Cow Flow",
                category="mobility",
                duration_seconds=180,
                target_muscle_group="core_spine"
            )
        )
    else:
        exercises.append(
            ExerciseItem(
                id="ex_hiit_01",
                name="Dynamic Jumping Jacks & High Knees",
                category="warmup",
                duration_seconds=120,
                target_muscle_group="full_body"
            )
        )

    if request.available_time_minutes <= 25:
        exercises.append(
            ExerciseItem(
                id="ex_cir_01",
                name="Bodyweight Squat to Reverse Lunge",
                category="strength",
                sets=3,
                reps=12,
                target_muscle_group="quads_glutes"
            )
        )
        exercises.append(
            ExerciseItem(
                id="ex_cir_02",
                name="Incline Push-ups to Plank Hold",
                category="strength",
                sets=3,
                reps=10,
                target_muscle_group="chest_core"
            )
        )
    else:
        exercises.append(
            ExerciseItem(
                id="ex_str_01",
                name="Goblet Squats",
                category="strength",
                sets=4,
                reps=10,
                target_muscle_group="lower_body"
            )
        )
        exercises.append(
            ExerciseItem(
                id="ex_str_02",
                name="Dumbbell Shoulder Press",
                category="strength",
                sets=4,
                reps=10,
                target_muscle_group="deltoids"
            )
        )

    burn_estimate = int(request.available_time_minutes * 9.5 * (request.energy_level / 3.0))

    return WorkoutRecommendationResponse(
        plan_id=f"plan_{uuid.uuid4().hex[:8]}",
        title=plan_title,
        estimated_duration_min=request.available_time_minutes,
        target_calories_burn=burn_estimate,
        adaptation_notes=notes,
        exercises=exercises
    )

@app.post("/api/v1/analyze-meal", response_model=MealAnalysisResponse)
async def analyze_meal_image(file: UploadFile = File(...)):
    """
    Computer Vision Meal Recognition.
    Processes food photo, detects dish segments, and returns macro estimations.
    """
    start_time = time.time()
    
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="Uploaded file must be a valid image format.")

    # Simulating inference execution (production models: YOLOv8-food / ResNet50)
    detected: List[FoodItemDetection] = [
        FoodItemDetection(
            name="Grilled Atlantic Salmon",
            confidence_score=0.96,
            estimated_weight_grams=180.0,
            calories=360.0,
            protein_g=34.0,
            carbs_g=0.0,
            fat_g=22.0
        ),
        FoodItemDetection(
            name="Steamed Quinoa",
            confidence_score=0.91,
            estimated_weight_grams=150.0,
            calories=180.0,
            protein_g=6.0,
            carbs_g=32.0,
            fat_g=3.0
        ),
        FoodItemDetection(
            name="Tenderstem Broccoli & Asparagus",
            confidence_score=0.88,
            estimated_weight_grams=90.0,
            calories=30.0,
            protein_g=2.5,
            carbs_g=4.0,
            fat_g=0.5
        )
    ]

    total_cals = sum(item.calories for item in detected)
    total_p = sum(item.protein_g for item in detected)
    total_c = sum(item.carbs_g for item in detected)
    total_f = sum(item.fat_g for item in detected)

    elapsed_ms = round((time.time() - start_time) * 1000, 2) + 245.0 # realistic latency simulation

    return MealAnalysisResponse(
        inference_time_ms=elapsed_ms,
        detected_items=detected,
        total_calories=total_cals,
        total_protein_g=total_p,
        total_carbs_g=total_c,
        total_fat_g=total_f
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
