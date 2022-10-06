import { IsNotEmpty } from "class-validator";

export class CreateChallengeDto{


    @IsNotEmpty()
    fullname : string;

    @IsNotEmpty()
    moto : string;

    @IsNotEmpty()
    cv : string;


}