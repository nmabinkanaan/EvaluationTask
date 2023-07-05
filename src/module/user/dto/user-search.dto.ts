import { ApiPropertyOptional } from "@nestjs/swagger";


export class FilterUserByNameDto {
    @ApiPropertyOptional({
        type: 'string',
        example: 'nouf',
        description: 'You can search by name, case insenstive'
    })
    search?: string;
}