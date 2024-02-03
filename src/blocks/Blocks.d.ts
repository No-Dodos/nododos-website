import { 
  EmbedBlockFragment,
  ImageBlockFragment,
  InternalLinkBlockFragment,
  OrganisationsBlockFragment,
  PagePartialBlockFragment,
  PeopleBlockFragment,
  QuoteBlockFragment,
  TableBlockFragment,
  TextBlockFragment,
  TextImageBlockFragment,
  VideoBlockFragment,
  VideoEmbedBlockFragment,
} from '@lib/types/datocms';

export type AnyBlock =
  | EmbedBlockFragment
  | ImageBlockFragment
  | InternalLinkBlockFragment
  | OrganisationsBlockFragment
  | PagePartialBlockFragment
  | PeopleBlockFragment
  | QuoteBlockFragment
  | TableBlockFragment
  | TextBlockFragment
  | TextImageBlockFragment
  | VideoBlockFragment
  | VideoEmbedBlockFragment;
