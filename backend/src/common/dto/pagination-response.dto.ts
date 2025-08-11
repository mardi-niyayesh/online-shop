import { ApiProperty } from '@nestjs/swagger';
import { PaginationLinkDto } from './pagination-link.dto';
import { PaginationMetaDto } from './pagination-meta.dto';

export class PaginationResponse {
  @ApiProperty({ type: PaginationMetaDto })
  meta: PaginationMetaDto;

  @ApiProperty({ type: PaginationLinkDto })
  links: PaginationLinkDto;
}
