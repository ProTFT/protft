import { Body, Controller, Post } from "@nestjs/common";
import { RatingService } from "./rating.service";

@Controller("rating")
export class RatingController {
  constructor(private ratingService: RatingService) {}

  @Post("eloCalc")
  // @UseGuards(JwtAuthGuard)
  applyEloChanges(@Body() body: { tournamentId: number }) {
    return this.ratingService.getEloChange(body.tournamentId);
  }
}
