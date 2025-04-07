import { IsOptional, MaxLength } from "class-validator";

class GetAllProductsDto {
  @IsOptional()
  title: string;
  @IsOptional()
  start_price: number;
  @IsOptional()
  end_price: number;
  @IsOptional()
  tags: string[];
  @IsOptional()
  page: number;
  @IsOptional()
  per_page: number;
}

export default GetAllProductsDto;
