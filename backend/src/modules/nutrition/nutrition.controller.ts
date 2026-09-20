import { Controller, Post, Body, Get, Param } from '@nestjs/common';

@Controller('nutrition')
export class NutritionController {
  @Post('scan-meal')
  async scanMeal(@Body() payload: { imageUrl?: string; base64Image?: string }) {
    // Delegates to Python AI microservice in production
    return {
      status: 'success',
      latencyMs: 340,
      detectedItems: [
        { name: 'Grilled Atlantic Salmon', weightGrams: 180, calories: 360, proteinG: 34, carbsG: 0, fatG: 22 },
        { name: 'Cooked Quinoa', weightGrams: 150, calories: 180, proteinG: 6, carbsG: 32, fatG: 3 },
        { name: 'Steamed Green Asparagus', weightGrams: 80, calories: 20, proteinG: 2, carbsG: 3, fatG: 0 }
      ],
      totalMacros: {
        calories: 560,
        proteinG: 42,
        carbsG: 35,
        fatG: 25
      }
    };
  }

  @Get('daily-summary/:userId')
  async getDailySummary(@Param('userId') userId: string) {
    return {
      userId,
      date: new Date().toISOString().split('T')[0],
      consumedCalories: 1450,
      targetCalories: 2100,
      consumedProteinG: 115,
      targetProteinG: 140
    };
  }
}
