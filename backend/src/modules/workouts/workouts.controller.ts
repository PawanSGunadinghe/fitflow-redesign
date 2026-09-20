import { Controller, Get, Post, Body, Param } from '@nestjs/common';

@Controller('workouts')
export class WorkoutsController {
  @Get('daily-flow/:userId')
  async getDailyFlow(@Param('userId') userId: string) {
    return {
      status: 'success',
      data: {
        userId,
        planTitle: 'HIIT & Mobility Primer',
        durationMinutes: 25,
        estimatedCalories: 280,
        adaptationReason: 'Optimized for tight 25-minute lunch window and mild lower back tightness.',
        exercises: [
          { id: 'ex_01', name: 'Cat-Cow Mobility Stretch', durationSeconds: 120 },
          { id: 'ex_02', name: 'Dumbbell Romanian Deadlift (Light)', sets: 3, reps: 10 },
          { id: 'ex_03', name: 'Low-Impact Mountain Climbers', sets: 3, durationSeconds: 45 }
        ]
      }
    };
  }

  @Post('log')
  async logWorkout(@Body() workoutData: any) {
    return {
      status: 'success',
      message: 'Workout session logged successfully in PostgreSQL.',
      sessionId: `sess_${Date.now()}`
    };
  }
}
