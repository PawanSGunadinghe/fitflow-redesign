import { Controller, Get, Post, Body, Param } from '@nestjs/common';

@Controller('social')
export class SocialController {
  @Get('circles/:circleId/feed')
  async getCircleFeed(@Param('circleId') circleId: string) {
    return {
      circleId,
      circleName: 'Sunrise Striders',
      memberCount: 4,
      feedItems: [
        {
          id: 'post_101',
          authorName: 'Priya Singh',
          activity: 'Completed Morning 5K Jog',
          timestamp: new Date().toISOString(),
          highFives: 3
        }
      ]
    };
  }

  @Post('circles/:circleId/reaction')
  async sendReaction(
    @Param('circleId') circleId: string,
    @Body() payload: { targetPostId: string; reactionType: string }
  ) {
    return {
      status: 'success',
      circleId,
      message: `Reaction '${payload.reactionType}' broadcast via WebSockets.`
    };
  }
}
