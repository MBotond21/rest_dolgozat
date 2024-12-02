import { IsNotEmpty, IsNumber, IsString, Min } from "class-validator";

export class CreateToyDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    material: string;
    
    @IsNumber()
    @Min(0)
    weight: number;
}
