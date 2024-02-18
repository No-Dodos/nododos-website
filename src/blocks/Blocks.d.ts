import { 
  ContactBlockFragment,
  EmbedBlockFragment,
  ImageBlockFragment,
  ImageCardsBlockFragment,
  InternalLinkBlockFragment,
  OrganisationsBlockFragment,
  PagePartialBlockFragment,
  PeopleBlockFragment,
  PivotBlockFragment,
  QuoteBlockFragment,
  TableBlockFragment,
  TextBlockFragment,
  TextCardsBlockFragment,
  TextImageBlockFragment,
  VideoBlockFragment,
  VideoEmbedBlockFragment,
} from '@lib/types/datocms';

export type AnyBlock =
  | ContactBlockFragment
  | EmbedBlockFragment
  | ImageBlockFragment
  | ImageCardsBlockFragment
  | InternalLinkBlockFragment
  | OrganisationsBlockFragment
  | PagePartialBlockFragment
  | PeopleBlockFragment
  | PivotBlockFragment
  | QuoteBlockFragment
  | TableBlockFragment
  | TextBlockFragment
  | TextCardsBlockFragment
  | TextImageBlockFragment
  | VideoBlockFragment
  | VideoEmbedBlockFragment;
