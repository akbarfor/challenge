import { Challenge, Gender } from "../challenge.model";
import { IsOptional, IsEnum, IsString } from "class-validator";

export class GetChallengeStatusFilterDto{

    @IsOptional()
    @IsEnum(Gender)
    gender? :  Gender;

    @IsOptional()
    @IsString()
    search? : string;
}