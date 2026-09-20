import { Module } from '@nestjs/common';
import { WorkoutsController } from './modules/workouts/workouts.controller';
import { NutritionController } from './modules/nutrition/nutrition.controller';
import { SocialController } from './modules/social/social.controller';

@Module({
  imports: [],
  controllers: [
    WorkoutsController,
    NutritionController,
    SocialController
  ],
  providers: [],
})
export class AppModule {}
