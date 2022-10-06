import { IsEnum, IsNotEmpty } from "class-validator";
import { Gender } from "../challenge.model";


export class updateChallangeStatusDto{

    @IsEnum(Gender)
    gender : Gender;

    @IsNotEmpty()
    fullname : string;

    @IsNotEmpty()
    moto : string;

    @IsNotEmpty()
    cv : string;
}