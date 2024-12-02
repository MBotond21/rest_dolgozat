import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

export class CreateChildDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    location: string;

    @IsBoolean()
    good: boolean;
}
